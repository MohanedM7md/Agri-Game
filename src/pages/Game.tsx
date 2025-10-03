import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PixelStatusBar from "@/components/PixelStatusBar";
import PixelFarmGrid from "@/components/PixelFarmGrid";
import PixelButton from "@/components/PixelButton";
import EventModal from "@/components/EventModal";
import { toast } from "@/hooks/use-toast";
import { GameState, OPTIMAL_RANGES, GAME_EVENTS } from "@/types/game";
import farmBackground from "@/assets/farm-background.png";

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
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [currentEvent, setCurrentEvent] = useState<typeof GAME_EVENTS[0] | null>(null);
  const [showEvent, setShowEvent] = useState(false);
  const [gamePhase, setGamePhase] = useState<"playing" | "finished">("playing");

  const getTimeOfDay = () => {
    if (gameState.day <= 3) return "morning";
    if (gameState.day <= 7) return "day";
    return "night";
  };

  const gradientClass = {
    morning: "bg-gradient-morning",
    day: "bg-gradient-day",
    night: "bg-gradient-night",
  }[getTimeOfDay()];

  // Trigger random events
  useEffect(() => {
    if (gameState.day > 1 && gameState.day <= 10 && Math.random() < 0.3) {
      const randomEvent = GAME_EVENTS[Math.floor(Math.random() * GAME_EVENTS.length)];
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
  }, [gameState.day, navigate]);

  const validateAction = (
    waterAmount: number,
    fertilizerAmount: number,
    pesticideAmount: number
  ) => {
    const newWaterLevel = Math.min(100, gameState.waterLevel + waterAmount);
    const newSoilHealth = Math.min(100, gameState.soilHealth + fertilizerAmount - pesticideAmount * 0.5);

    // Check if within 80% of optimal
    const waterOptimal =
      newWaterLevel >= OPTIMAL_RANGES.waterLevel.min * 0.8 &&
      newWaterLevel <= OPTIMAL_RANGES.waterLevel.max * 1.2;
    const soilOptimal =
      newSoilHealth >= OPTIMAL_RANGES.soilHealth.min * 0.8 &&
      newSoilHealth <= OPTIMAL_RANGES.soilHealth.max * 1.2;

    return waterOptimal && soilOptimal;
  };

  const handleAction = (action: "water" | "fertilizer" | "pesticide" | "skip") => {
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
        title: "⚠️ Warning!",
        description: "This action is not optimal. Consider the current conditions!",
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
      waterLevel: Math.max(0, Math.min(100, prev.waterLevel + waterChange - waterDecay)),
      soilHealth: Math.max(0, Math.min(100, prev.soilHealth + soilChange - soilDecay)),
      temperature: Math.max(60, Math.min(90, prev.temperature + tempVariation)),
      stability: Math.max(0, Math.min(100, isValid ? prev.stability + 2 : prev.stability - 5)),
      cropGrowth: isValid ? Math.min(100, prev.cropGrowth + 10) : Math.max(0, prev.cropGrowth - 5),
      totalWatering: prev.totalWatering + (action === "water" ? 1 : 0),
      totalFertilizer: prev.totalFertilizer + (action === "fertilizer" ? 1 : 0),
      totalPesticide: prev.totalPesticide + (action === "pesticide" ? 1 : 0),
    }));

    if (isValid) {
      toast({
        title: "✅ Good Decision!",
        description: "Your crop is growing healthily.",
      });
    }
  };

  const handleEventChoice = (isCorrect: boolean, feedback: string) => {
    setShowEvent(false);
    setCurrentEvent(null);

    if (isCorrect) {
      toast({
        title: "✅ Correct Decision!",
        description: feedback,
      });
      setGameState((prev) => ({
        ...prev,
        stability: Math.min(100, prev.stability + 10),
        cropGrowth: Math.min(100, prev.cropGrowth + 15),
      }));
    } else {
      toast({
        title: "❌ Not the Best Choice",
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
    <div 
      className="min-h-screen transition-all duration-1000 p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${farmBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        imageRendering: "pixelated"
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="bg-amber-100/90 hover:bg-amber-200 border-2 border-amber-900 font-bold"
            style={{ fontFamily: "monospace" }}
          >
            ← BACK
          </Button>
          <div className="text-center bg-amber-100/90 px-6 py-3 rounded-lg border-4 border-amber-900 shadow-lg">
            <h2 className="text-3xl font-bold" style={{ fontFamily: "monospace" }}>
              DAY {gameState.day} / 10
            </h2>
            <p className="text-sm font-bold text-amber-800" style={{ fontFamily: "monospace" }}>
              SEASON 1
            </p>
          </div>
          <div className="w-20" />
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Status Bars */}
          <Card className="p-4 space-y-3 lg:col-span-1 border-4 border-amber-900 bg-gradient-to-b from-amber-50 to-amber-100 shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-center uppercase tracking-wider border-b-4 border-amber-900 pb-2" style={{ fontFamily: "monospace" }}>
              📊 FARM STATUS
            </h3>
            <PixelStatusBar
              label="Soil"
              value={gameState.soilHealth}
              icon="🌱"
              color="green"
              optimal={OPTIMAL_RANGES.soilHealth}
            />
            <PixelStatusBar
              label="Water"
              value={gameState.waterLevel}
              icon="💧"
              color="blue"
              optimal={OPTIMAL_RANGES.waterLevel}
            />
            <PixelStatusBar
              label="Temp"
              value={gameState.temperature}
              icon="🌡️"
              color="orange"
              optimal={OPTIMAL_RANGES.temperature}
            />
            <PixelStatusBar
              label="Stability"
              value={gameState.stability}
              icon="⚖️"
              color="purple"
              optimal={OPTIMAL_RANGES.stability}
            />
          </Card>

          {/* Center - Farm Visualization */}
          <Card className="p-6 lg:col-span-2 flex flex-col items-center justify-center border-4 border-amber-900 bg-gradient-to-b from-sky-200 to-green-200 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider" style={{ fontFamily: "monospace" }}>
                🌾 YOUR FARM 🌾
              </h2>
              <PixelFarmGrid 
                cropGrowth={gameState.cropGrowth}
                waterLevel={gameState.waterLevel}
                soilHealth={gameState.soilHealth}
              />
            </div>

            <div className="w-full max-w-md mb-6">
              <div className="bg-amber-100 p-4 rounded-lg border-4 border-amber-900 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm uppercase" style={{ fontFamily: "monospace" }}>
                    CROP GROWTH
                  </span>
                  <span className="font-bold text-lg" style={{ fontFamily: "monospace" }}>
                    {gameState.cropGrowth}%
                  </span>
                </div>
                <div className="h-6 bg-amber-900 rounded-sm border-2 border-amber-950 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-500"
                    style={{ 
                      width: `${gameState.cropGrowth}%`,
                      boxShadow: "inset 0 2px 4px rgba(255,255,255,0.3)"
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
                onClick={() => handleAction("water")}
              >
                💧 WATER
              </PixelButton>
              <PixelButton 
                pixelVariant="fertilizer" 
                size="lg" 
                onClick={() => handleAction("fertilizer")}
              >
                🌱 FERTILIZE
              </PixelButton>
              <PixelButton 
                pixelVariant="pesticide" 
                size="lg" 
                onClick={() => handleAction("pesticide")}
              >
                🐛 SPRAY
              </PixelButton>
              <PixelButton 
                pixelVariant="skip" 
                size="lg" 
                onClick={() => handleAction("skip")}
              >
                ⏭️ SKIP DAY
              </PixelButton>
            </div>
          </Card>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal open={showEvent} event={currentEvent} onChoice={handleEventChoice} />
    </div>
  );
};

export default Game;
