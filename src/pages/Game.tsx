import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PixelStatusBar from "../game/RetroStatusBar";
import PixelButton from "../game/RetroButton";
import EventModal from "../game/RetroEventDialog";
import { toast } from "@/hooks/use-toast";
import { GameState, OPTIMAL_RANGES, GAME_EVENTS } from "@/types/game";
import PixelFarmGrid from "../game/RetroFarmGrid";
import PixelPlant from "../game/PixelPlant";
import plant from "@/assets/sprites/plant.png";
const INITIAL_STATE: GameState = {
  day: 1,
  soilHealth: 85,
  waterLevel: 60,
  temperature: 75,
  stability: 90,
  cropGrowth: 0,
  totalWatering: 0,
  totalFertilizer: 0,
  totalPesticide: 0,
};

const Game = () => {
  const navigate = useNavigate();
  const { cropName } = useParams();
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [currentEvent, setCurrentEvent] = useState<
    (typeof GAME_EVENTS)[0] | null
  >(null);
  const [showEvent, setShowEvent] = useState(false);
  const [gamePhase, setGamePhase] = useState<"playing" | "finished">("playing");
  const [spritePath, setSpritePath] = useState<string | null>(null);

  // Trigger random events
  useEffect(() => {
    if (gameState.day > 1 && gameState.day <= 10 && Math.random() < 0.3) {
      const randomEvent =
        GAME_EVENTS[Math.floor(Math.random() * GAME_EVENTS.length)];
      setCurrentEvent(randomEvent);
      setShowEvent(true);
    }
  }, [gameState.day]);

  // Check if game should end
  useEffect(() => {
    if (gameState.day > 10) {
      setGamePhase("finished");
      navigate("/results", { state: { gameState } });
    }
  }, [gameState.day, navigate, gameState]);
  useEffect(() => {
    if (cropName) {
      import(`@/assets/sprites/${cropName}.png`)
        .then((mod) => {
          setSpritePath(mod.default);
        })
        .catch(() => {
          console.warn(`Sprite for ${cropName} not found, using fallback`);
          import("@/assets/sprites/plant.png").then((mod) =>
            setSpritePath(mod.default)
          );
        });
    }
  }, [cropName]);
  const validateAction = (
    waterAmount: number,
    fertilizerAmount: number,
    pesticideAmount: number
  ) => {
    const newWaterLevel = Math.min(100, gameState.waterLevel + waterAmount);
    const newSoilHealth = Math.min(
      100,
      gameState.soilHealth + fertilizerAmount - pesticideAmount * 0.5
    );

    // Check if within 80% of optimal
    const waterOptimal =
      newWaterLevel >= OPTIMAL_RANGES.waterLevel.min * 0.8 &&
      newWaterLevel <= OPTIMAL_RANGES.waterLevel.max * 1.2;
    const soilOptimal =
      newSoilHealth >= OPTIMAL_RANGES.soilHealth.min * 0.8 &&
      newSoilHealth <= OPTIMAL_RANGES.soilHealth.max * 1.2;

    return waterOptimal && soilOptimal;
  };

  const handleAction = (
    action: "water" | "fertilizer" | "pesticide" | "skip"
  ) => {
    let waterChange = 0;
    let soilChange = 0;
    let pesticideChange = 0;

    switch (action) {
      case "water":
        waterChange = 15;
        break;
      case "fertilizer":
        soilChange = 10;
        break;
      case "pesticide":
        pesticideChange = 5;
        break;
    }

    const isValid = validateAction(waterChange, soilChange, pesticideChange);

    if (!isValid && action !== "skip") {
      toast({
        title: "WARNING!",
        description:
          "This action is not optimal. Consider the current conditions!",
        variant: "destructive",
      });
      return;
    }

    // Natural decay
    const waterDecay = 10;
    const soilDecay = 3;
    const tempVariation = Math.floor(Math.random() * 10) - 5;

    setGameState((prev) => ({
      ...prev,
      day: prev.day + 1,
      waterLevel: Math.max(
        0,
        Math.min(100, prev.waterLevel + waterChange - waterDecay)
      ),
      soilHealth: Math.max(
        0,
        Math.min(100, prev.soilHealth + soilChange - soilDecay)
      ),
      temperature: Math.max(60, Math.min(90, prev.temperature + tempVariation)),
      stability: Math.max(
        0,
        Math.min(100, isValid ? prev.stability + 2 : prev.stability - 5)
      ),
      cropGrowth: isValid
        ? Math.min(100, prev.cropGrowth + 10)
        : Math.max(0, prev.cropGrowth - 5),
      totalWatering: prev.totalWatering + (action === "water" ? 1 : 0),
      totalFertilizer: prev.totalFertilizer + (action === "fertilizer" ? 1 : 0),
      totalPesticide: prev.totalPesticide + (action === "pesticide" ? 1 : 0),
    }));

    if (isValid) {
      toast({
        title: "GOOD DECISION!",
        description: "Your crop is growing healthily.",
      });
    }
  };

  const handleEventChoice = (isCorrect: boolean, feedback: string) => {
    setShowEvent(false);
    setCurrentEvent(null);

    if (isCorrect) {
      toast({
        title: "CORRECT DECISION!",
        description: feedback,
      });
      setGameState((prev) => ({
        ...prev,
        stability: Math.min(100, prev.stability + 10),
        cropGrowth: Math.min(100, prev.cropGrowth + 15),
      }));
    } else {
      toast({
        title: "NOT THE BEST CHOICE",
        description: feedback,
        variant: "destructive",
      });
      setGameState((prev) => ({
        ...prev,
        stability: Math.max(0, prev.stability - 15),
        cropGrowth: Math.max(0, prev.cropGrowth - 10),
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-green-600 p-4 relative pixel-perfect">
      {/* Scanline effect for CRT feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, black 2px, black 4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="retro-border bg-card hover:bg-muted font-bold uppercase px-6 py-2 retro-shadow">
            BACK
          </Button>
          <div className="text-center retro-border bg-card px-8 py-4 retro-shadow">
            <h2 className="text-3xl font-bold uppercase tracking-widest">
              DAY {gameState.day} / 10
            </h2>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              SEASON 1
            </p>
          </div>
          <div className="w-24" />
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Status Bars */}
          <Card className="retro-border p-4 space-y-3 lg:col-span-1 bg-card retro-shadow">
            <h3 className="text-xl font-bold mb-4 text-center uppercase tracking-widest border-b-4 border-border pb-2">
              FARM STATUS
            </h3>
            <PixelStatusBar
              label="SOIL"
              value={gameState.soilHealth}
              icon="🌱"
              color="green"
              optimal={OPTIMAL_RANGES.soilHealth}
            />
            <PixelStatusBar
              label="WATER"
              value={gameState.waterLevel}
              icon="💧"
              color="blue"
              optimal={OPTIMAL_RANGES.waterLevel}
            />
            <PixelStatusBar
              label="TEMP"
              value={gameState.temperature}
              icon="🌡️"
              color="orange"
              optimal={OPTIMAL_RANGES.temperature}
            />
            <PixelStatusBar
              label="STABLE"
              value={gameState.stability}
              icon="⚖️"
              color="purple"
              optimal={OPTIMAL_RANGES.stability}
            />
          </Card>

          {/* Center - Farm Visualization */}
          <Card className="retro-border p-6 lg:col-span-2 flex flex-col items-center justify-center bg-gradient-to-b from-sky-300 to-green-400 retro-shadow">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-widest border-b-4 border-border pb-2 bg-card/80 px-6 py-2">
                YOUR FARM
              </h2>
              {spritePath ? (
                <PixelPlant
                  cropGrowth={gameState.cropGrowth}
                  waterLevel={gameState.waterLevel}
                  soilHealth={gameState.soilHealth}
                  spriteSheet={spritePath}
                />
              ) : (
                <p className="italic text-muted-foreground">
                  Loading {cropName} sprite...
                </p>
              )}
            </div>

            <div className="w-full max-w-md mb-6">
              <div className="retro-border bg-card p-4 retro-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm uppercase tracking-wider">
                    CROP GROWTH
                  </span>
                  <span className="font-bold text-lg">
                    {gameState.cropGrowth}%
                  </span>
                </div>
                <div className="h-6 bg-gray-800 border-2 border-black overflow-hidden">
                  <div
                    className="h-full bg-green-600 transition-all duration-500"
                    style={{
                      width: `${gameState.cropGrowth}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <PixelButton
                pixelVariant="water"
                size="lg"
                onClick={() => handleAction("water")}>
                WATER
              </PixelButton>
              <PixelButton
                pixelVariant="fertilizer"
                size="lg"
                onClick={() => handleAction("fertilizer")}>
                FERTILIZE
              </PixelButton>
              <PixelButton
                pixelVariant="pesticide"
                size="lg"
                onClick={() => handleAction("pesticide")}>
                SPRAY
              </PixelButton>
              <PixelButton
                pixelVariant="skip"
                size="lg"
                onClick={() => handleAction("skip")}>
                SKIP DAY
              </PixelButton>
            </div>
          </Card>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        open={showEvent}
        event={currentEvent}
        onChoice={handleEventChoice}
      />
    </div>
  );
};

export default Game;
