import { Card } from "@/components/ui/card";
import { Crop } from "@/types/game";
import { crops } from "@/data/gameData";
import { useNavigate } from "react-router-dom";

interface CropSelectionScreenProps {
  onCropSelect: (crop: Crop) => void;
}

export default function CropSelectionScreen() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 via-background to-primary/10 p-4">
      <div className="max-w-5xl mx-auto space-y-8 pt-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-primary">Select Your Crop</h2>
          <p className="text-muted-foreground">Choose one crop to cultivate</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {crops.map((crop) => (
            <Card
              key={crop.id}
              className="p-8 cursor-pointer transition-all hover:scale-110 hover:shadow-2xl hover:bg-primary/5 group"
              onClick={() => {
                navigate(`/game/${crop.id}`);
              }}>
              <div className="text-center space-y-4">
                <div className="text-7xl group-hover:scale-125 transition-transform">
                  {crop.emoji}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {crop.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {crop.description}
                  </p>
                </div>
                <div className="pt-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to select
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
