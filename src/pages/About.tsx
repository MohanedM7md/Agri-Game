import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import farmBackground from "@/assets/farm-background.png";

const About = () => {
  const navigate = useNavigate();

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
      {/* Space overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/90 to-purple-950/90" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 pt-8 max-w-4xl mx-auto">
          <Button 
            className="bg-amber-100 hover:bg-amber-200 border-4 border-amber-900 font-bold shadow-[0_4px_0_0] shadow-amber-950 hover:translate-y-[-2px] active:translate-y-[2px] rounded-sm"
            style={{ fontFamily: "monospace" }}
            onClick={() => navigate("/")}
          >
            ← BACK
          </Button>
        </header>

        <div className="max-w-4xl mx-auto space-y-8 pb-12">
          {/* Title */}
          <div className="text-center mb-12 bg-amber-50/95 p-8 rounded-lg border-4 border-amber-900 shadow-2xl">
            <div className="text-6xl mb-4">🚀</div>
            <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "monospace" }}>
              ABOUT AGRIGAME
            </h1>
            <p className="text-xl font-bold text-amber-800" style={{ fontFamily: "monospace" }}>
              SUSTAINABLE FARMING EDUCATION
            </p>
          </div>

          {/* Mission */}
          <Card className="p-8 bg-amber-50/95 backdrop-blur border-4 border-amber-900 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 uppercase" style={{ fontFamily: "monospace" }}>
              🎯 OUR MISSION
            </h2>
            <p className="text-lg leading-relaxed">
              Agrigame is an educational simulation game that teaches sustainable farming practices
              using real NASA satellite data. We empower players to make data-driven agricultural
              decisions, understanding the delicate balance between resource management and crop productivity.
            </p>
          </Card>

          {/* Data Sources */}
          <Card className="p-8 bg-amber-50/95 backdrop-blur border-4 border-amber-900 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 uppercase" style={{ fontFamily: "monospace" }}>
              🛰️ POWERED BY NASA DATA
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-100 border-4 border-blue-600 rounded-lg hover:scale-105 transition-transform">
                <div className="text-5xl mb-3">🛰️</div>
                <h3 className="font-bold mb-2 uppercase text-sm" style={{ fontFamily: "monospace" }}>
                  NASA POWER
                </h3>
                <p className="text-xs">
                  Solar and meteorological data for agriculture
                </p>
              </div>
              <div className="text-center p-4 bg-green-100 border-4 border-green-600 rounded-lg hover:scale-105 transition-transform">
                <div className="text-5xl mb-3">🌍</div>
                <h3 className="font-bold mb-2 uppercase text-sm" style={{ fontFamily: "monospace" }}>
                  SMAP
                </h3>
                <p className="text-xs">
                  Soil moisture measurements from space
                </p>
              </div>
              <div className="text-center p-4 bg-purple-100 border-4 border-purple-600 rounded-lg hover:scale-105 transition-transform">
                <div className="text-5xl mb-3">📡</div>
                <h3 className="font-bold mb-2 uppercase text-sm" style={{ fontFamily: "monospace" }}>
                  MODIS
                </h3>
                <p className="text-xs">
                  Vegetation health monitoring
                </p>
              </div>
            </div>
          </Card>

          {/* Features */}
          <Card className="p-8 bg-amber-50/95 backdrop-blur border-4 border-amber-900 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 uppercase" style={{ fontFamily: "monospace" }}>
              📚 WHAT YOU'LL LEARN
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 border-2 border-blue-600 rounded-lg">
                <span className="text-3xl">💧</span>
                <div>
                  <h3 className="font-bold mb-1 uppercase text-sm" style={{ fontFamily: "monospace" }}>
                    SMART IRRIGATION
                  </h3>
                  <p className="text-sm">
                    Understand optimal watering schedules based on soil moisture and weather patterns
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 border-2 border-green-600 rounded-lg">
                <span className="text-3xl">🌱</span>
                <div>
                  <h3 className="font-bold mb-1 uppercase text-sm" style={{ fontFamily: "monospace" }}>
                    SOIL MANAGEMENT
                  </h3>
                  <p className="text-sm">
                    Learn how fertilizers and organic matter affect long-term soil health
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-yellow-50 border-2 border-yellow-600 rounded-lg">
                <span className="text-3xl">🐛</span>
                <div>
                  <h3 className="font-bold mb-1 uppercase text-sm" style={{ fontFamily: "monospace" }}>
                    PEST CONTROL
                  </h3>
                  <p className="text-sm">
                    Master integrated pest management techniques for sustainable farming
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-purple-50 border-2 border-purple-600 rounded-lg">
                <span className="text-3xl">📊</span>
                <div>
                  <h3 className="font-bold mb-1 uppercase text-sm" style={{ fontFamily: "monospace" }}>
                    DATA-DRIVEN
                  </h3>
                  <p className="text-sm">
                    Use real-time data to make informed choices about crop management
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Team Credits */}
          <Card className="p-8 bg-amber-50/95 backdrop-blur text-center border-4 border-amber-900 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 uppercase" style={{ fontFamily: "monospace" }}>
              🏅 CREDITS
            </h2>
            <p className="mb-4 font-semibold">
              Built for educational purposes with NASA's open data initiative
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <span className="px-6 py-3 bg-blue-600 text-white rounded-sm font-bold border-4 border-blue-800 shadow-[0_4px_0_0] shadow-blue-900 uppercase" style={{ fontFamily: "monospace" }}>
                NASA POWER
              </span>
              <span className="px-6 py-3 bg-green-600 text-white rounded-sm font-bold border-4 border-green-800 shadow-[0_4px_0_0] shadow-green-900 uppercase" style={{ fontFamily: "monospace" }}>
                OPEN SOURCE
              </span>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button 
              className="bg-green-500 hover:bg-green-600 border-4 border-green-700 shadow-[0_6px_0_0] shadow-green-900 hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-[0_4px_0_0] text-white text-2xl px-10 py-6 font-bold uppercase tracking-wider rounded-sm"
              style={{ fontFamily: "monospace" }}
              onClick={() => navigate("/game")}
            >
              🌱 START LEARNING
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
