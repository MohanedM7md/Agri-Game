import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import farmBackground from "@/assets/farm-background.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${farmBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        imageRendering: "pixelated"
      }}
    >
      {/* Pixel overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative z-10 w-full">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-amber-100/90 px-4 py-2 rounded-lg border-4 border-amber-900 shadow-lg">
            <div className="w-10 h-10 rounded-sm bg-green-600 flex items-center justify-center text-2xl border-2 border-green-800">
              🌍
            </div>
            <span className="text-2xl font-bold" style={{ fontFamily: "monospace" }}>AGRIGAME</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center gap-8 max-w-4xl mx-auto text-center">
          <div className="space-y-6 bg-amber-50/95 p-8 rounded-lg border-4 border-amber-900 shadow-2xl">
            <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg" style={{ fontFamily: "monospace" }}>
              🌾 AGRIGAME 🌾
            </h1>
            <p className="text-2xl font-bold text-amber-900" style={{ fontFamily: "monospace" }}>
              FARM SMART WITH NASA DATA
            </p>
            <p className="text-lg text-amber-800">
              Master sustainable farming through data-driven decisions
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button 
              className="bg-green-500 hover:bg-green-600 border-4 border-green-700 shadow-[0_6px_0_0] shadow-green-900 hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-[0_4px_0_0] text-white text-xl px-8 py-6 font-bold uppercase tracking-wider rounded-sm"
              style={{ fontFamily: "monospace" }}
              onClick={() => navigate("/game")}
            >
              🌱 START GAME
            </Button>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 border-4 border-blue-700 shadow-[0_6px_0_0] shadow-blue-900 hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-[0_4px_0_0] text-white text-xl px-8 py-6 font-bold uppercase tracking-wider rounded-sm"
              style={{ fontFamily: "monospace" }}
              onClick={() => navigate("/about")}
            >
              📖 ABOUT
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
            <div className="bg-amber-50/95 backdrop-blur-sm p-6 rounded-lg border-4 border-amber-900 shadow-xl hover:translate-y-[-4px] transition-transform">
              <div className="text-5xl mb-3">💧</div>
              <h3 className="font-bold text-lg mb-2 uppercase" style={{ fontFamily: "monospace" }}>
                SMART IRRIGATION
              </h3>
              <p className="text-sm text-amber-800">
                Make water decisions based on real soil data
              </p>
            </div>
            <div className="bg-amber-50/95 backdrop-blur-sm p-6 rounded-lg border-4 border-amber-900 shadow-xl hover:translate-y-[-4px] transition-transform">
              <div className="text-5xl mb-3">📊</div>
              <h3 className="font-bold text-lg mb-2 uppercase" style={{ fontFamily: "monospace" }}>
                NASA DATA
              </h3>
              <p className="text-sm text-amber-800">
                Powered by POWER API for accurate farming insights
              </p>
            </div>
            <div className="bg-amber-50/95 backdrop-blur-sm p-6 rounded-lg border-4 border-amber-900 shadow-xl hover:translate-y-[-4px] transition-transform">
              <div className="text-5xl mb-3">🏆</div>
              <h3 className="font-bold text-lg mb-2 uppercase" style={{ fontFamily: "monospace" }}>
                LEARN & GROW
              </h3>
              <p className="text-sm text-amber-800">
                Earn badges and improve your farming skills
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 p-4 text-center">
          <div className="bg-amber-900/80 text-white px-4 py-2 rounded-lg inline-block border-2 border-amber-950" style={{ fontFamily: "monospace" }}>
            🚀 POWERED BY NASA POWER API
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
