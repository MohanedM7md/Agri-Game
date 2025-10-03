import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-green-600 p-4 relative pixel-perfect overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 scanline" />

      {/* Stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Title Screen */}
        <Card className="retro-border bg-card p-8 md:p-12 retro-shadow pixelate-in max-w-2xl w-full">
          {/* Game Logo */}
          <div className="text-center mb-8">
            {/* Pixel art style logo placeholder */}
            <div className="mb-6 flex justify-center">
              <div className="grid grid-cols-8 gap-1">
                {/* Simple pixel art tractor icon */}
                {[
                  [0, 0, 1, 1, 1, 1, 0, 0],
                  [0, 1, 1, 1, 1, 1, 1, 0],
                  [1, 1, 0, 1, 1, 0, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1],
                  [0, 1, 1, 1, 1, 1, 1, 0],
                  [1, 0, 1, 0, 0, 1, 0, 1],
                  [1, 1, 1, 0, 0, 1, 1, 1],
                  [1, 1, 1, 0, 0, 1, 1, 1],
                ].map((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${x}-${y}`}
                      className={`w-3 h-3 ${
                        cell ? "bg-primary" : "bg-transparent"
                      }`}
                    />
                  ))
                )}
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-2 uppercase tracking-wider retro-text-shadow text-primary">
              AgriGame
            </h1>
          </div>

          {/* Menu */}
          <div className="space-y-4 mt-12">
            <Button
              onClick={() => navigate("/map")}
              className="w-full retro-border bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-2xl uppercase tracking-wider py-8 retro-shadow hover:translate-y-[-2px] active:translate-y-[2px] transition-transform">
              <span className="mr-3">▶</span> START GAME
            </Button>

            <Button
              variant="secondary"
              className="w-full retro-border bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-xl uppercase tracking-wider py-6 retro-shadow hover:translate-y-[-2px] active:translate-y-[2px] transition-transform"
              onClick={() => {}}>
              HOW TO PLAY
            </Button>

            <Button
              variant="outline"
              className="w-full retro-border bg-muted hover:bg-muted/80 text-muted-foreground font-bold text-xl uppercase tracking-wider py-6 retro-shadow hover:translate-y-[-2px] active:translate-y-[2px] transition-transform"
              onClick={() => {}}>
              CREDITS
            </Button>
          </div>

          {/* Version info */}
          <div className="text-center mt-12 text-sm font-bold text-muted-foreground uppercase tracking-wider">
            <p className="blink">PRESS START</p>
            <p className="mt-2">VERSION 1.0</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Landing;
