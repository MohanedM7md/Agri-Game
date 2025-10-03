import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { GameState } from "@/types/game";
import farmBackground from "@/assets/farm-background.png";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gameState = location.state?.gameState as GameState | undefined;

  if (!gameState) {
    navigate("/");
    return null;
  }

  const yieldScore = Math.round(gameState.cropGrowth);
  const efficiency = Math.round((gameState.stability + gameState.soilHealth) / 2);

  const getBadge = () => {
    if (yieldScore >= 90) return { emoji: "🏆", title: "Master Farmer", color: "text-accent" };
    if (yieldScore >= 75) return { emoji: "🥇", title: "Expert Farmer", color: "text-warning" };
    if (yieldScore >= 50) return { emoji: "🥈", title: "Skilled Farmer", color: "text-muted-foreground" };
    return { emoji: "🥉", title: "Novice Farmer", color: "text-muted-foreground" };
  };

  const badge = getBadge();

  const resourceData = [
    { name: "Water", value: gameState.totalWatering },
    { name: "Fertilizer", value: gameState.totalFertilizer },
    { name: "Pesticide", value: gameState.totalPesticide },
  ];

  const progressData = Array.from({ length: 10 }, (_, i) => ({
    day: i + 1,
    growth: Math.min(100, (i + 1) * 10),
  }));

  return (
    <div 
      className="min-h-screen p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${farmBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        imageRendering: "pixelated"
      }}
    >
      {/* Dark overlay for night effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 to-purple-950/80" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="text-center mb-8 pt-8">
          <div className="inline-block bg-amber-50/95 px-8 py-6 rounded-lg border-4 border-amber-900 shadow-2xl">
            <h1 className="text-5xl font-bold mb-2 text-amber-900" style={{ fontFamily: "monospace" }}>
              🌾 SEASON COMPLETE! 🌾
            </h1>
            <p className="text-lg font-bold text-amber-700" style={{ fontFamily: "monospace" }}>
              HERE'S YOUR HARVEST
            </p>
          </div>
        </header>

        <div className="max-w-6xl mx-auto space-y-6 pb-12">
          {/* Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center bg-amber-50/95 backdrop-blur border-4 border-amber-900 shadow-2xl hover:scale-105 transition-transform">
              <div className={`text-6xl mb-3 ${badge.color}`}>{badge.emoji}</div>
              <h3 className="text-2xl font-bold mb-1 uppercase" style={{ fontFamily: "monospace" }}>
                {badge.title}
              </h3>
              <p className="text-sm font-bold text-amber-700" style={{ fontFamily: "monospace" }}>
                ACHIEVEMENT UNLOCKED
              </p>
            </Card>

            <Card className="p-6 text-center bg-amber-50/95 backdrop-blur border-4 border-amber-900 shadow-2xl hover:scale-105 transition-transform">
              <div className="text-6xl font-bold text-green-600 mb-2" style={{ fontFamily: "monospace" }}>
                {yieldScore}%
              </div>
              <h3 className="text-xl font-bold mb-1 uppercase" style={{ fontFamily: "monospace" }}>
                CROP YIELD
              </h3>
              <p className="text-sm font-bold text-amber-700" style={{ fontFamily: "monospace" }}>
                FINAL GROWTH SCORE
              </p>
            </Card>

            <Card className="p-6 text-center bg-amber-50/95 backdrop-blur border-4 border-amber-900 shadow-2xl hover:scale-105 transition-transform">
              <div className="text-6xl font-bold text-blue-600 mb-2" style={{ fontFamily: "monospace" }}>
                {efficiency}%
              </div>
              <h3 className="text-xl font-bold mb-1 uppercase" style={{ fontFamily: "monospace" }}>
                EFFICIENCY
              </h3>
              <p className="text-sm font-bold text-amber-700" style={{ fontFamily: "monospace" }}>
                RESOURCE MGMT
              </p>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-amber-50/95 backdrop-blur border-4 border-amber-900 shadow-2xl">
              <h3 className="text-xl font-bold mb-4 uppercase" style={{ fontFamily: "monospace" }}>
                📊 RESOURCE USAGE
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={resourceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" style={{ fontFamily: "monospace" }} />
                  <YAxis style={{ fontFamily: "monospace" }} />
                  <Tooltip contentStyle={{ fontFamily: "monospace" }} />
                  <Bar dataKey="value" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-amber-50/95 backdrop-blur border-4 border-amber-900 shadow-2xl">
              <h3 className="text-xl font-bold mb-4 uppercase" style={{ fontFamily: "monospace" }}>
                📈 GROWTH PROGRESS
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" style={{ fontFamily: "monospace" }} />
                  <YAxis style={{ fontFamily: "monospace" }} />
                  <Tooltip contentStyle={{ fontFamily: "monospace" }} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="growth"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Final Stats */}
          <Card className="p-6 bg-amber-50/95 backdrop-blur border-4 border-amber-900 shadow-2xl">
            <h3 className="text-xl font-bold mb-4 uppercase text-center" style={{ fontFamily: "monospace" }}>
              🎯 FINAL STATISTICS
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-100 border-4 border-green-600 rounded-lg">
                <p className="text-4xl font-bold mb-1">🌱</p>
                <p className="text-xs font-bold uppercase mb-1" style={{ fontFamily: "monospace" }}>
                  SOIL HEALTH
                </p>
                <p className="text-2xl font-bold text-green-800" style={{ fontFamily: "monospace" }}>
                  {gameState.soilHealth}%
                </p>
              </div>
              <div className="text-center p-4 bg-blue-100 border-4 border-blue-600 rounded-lg">
                <p className="text-4xl font-bold mb-1">💧</p>
                <p className="text-xs font-bold uppercase mb-1" style={{ fontFamily: "monospace" }}>
                  WATER LEVEL
                </p>
                <p className="text-2xl font-bold text-blue-800" style={{ fontFamily: "monospace" }}>
                  {gameState.waterLevel}%
                </p>
              </div>
              <div className="text-center p-4 bg-orange-100 border-4 border-orange-600 rounded-lg">
                <p className="text-4xl font-bold mb-1">🌡️</p>
                <p className="text-xs font-bold uppercase mb-1" style={{ fontFamily: "monospace" }}>
                  TEMPERATURE
                </p>
                <p className="text-2xl font-bold text-orange-800" style={{ fontFamily: "monospace" }}>
                  {gameState.temperature}°F
                </p>
              </div>
              <div className="text-center p-4 bg-purple-100 border-4 border-purple-600 rounded-lg">
                <p className="text-4xl font-bold mb-1">⚖️</p>
                <p className="text-xs font-bold uppercase mb-1" style={{ fontFamily: "monospace" }}>
                  STABILITY
                </p>
                <p className="text-2xl font-bold text-purple-800" style={{ fontFamily: "monospace" }}>
                  {gameState.stability}%
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button 
              className="bg-green-500 hover:bg-green-600 border-4 border-green-700 shadow-[0_6px_0_0] shadow-green-900 hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-[0_4px_0_0] text-white text-xl px-8 py-6 font-bold uppercase tracking-wider rounded-sm"
              style={{ fontFamily: "monospace" }}
              onClick={() => navigate("/game")}
            >
              🌄 PLAY AGAIN
            </Button>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 border-4 border-blue-700 shadow-[0_6px_0_0] shadow-blue-900 hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-[0_4px_0_0] text-white text-xl px-8 py-6 font-bold uppercase tracking-wider rounded-sm"
              style={{ fontFamily: "monospace" }}
              onClick={() => navigate("/")}
            >
              🏠 HOME
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
