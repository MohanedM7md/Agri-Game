import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Region, regions } from "@/data/regions";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Smooth Fly helper
function FlyToRegion({ region }: { region: Region | null }) {
  const map = useMap();
  if (region) map.flyTo([region.lat, region.lng], region.zoom, { duration: 2 });
  return null;
}

export default function WorldMapScreen() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const handleRegionSelect = (regionId: string) => {
    const region = regions.find((r) => r.id === regionId) || null;
    setSelectedRegion(region);
  };
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-primary/10 p-4">
      <div className="max-w-6xl mx-auto space-y-6 pt-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-primary">
            Choose Your Region
          </h2>
          <p className="text-muted-foreground">
            Select where you'll establish your farm
          </p>
        </div>

        {/* Dropdown + Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto relative z-50">
          {/* Dropdown */}
          <div className="w-full sm:flex-1">
            <Select onValueChange={handleRegionSelect}>
              <SelectTrigger className="h-12 text-lg w-full">
                <SelectValue placeholder="Search and select a region..." />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r.id} value={r.id} className="text-lg">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {r.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Start Button */}
          <Button
            disabled={!selectedRegion}
            size="lg"
            onClick={() => navigate("/crops")}
            className={`h-12 px-6 text-lg font-bold transition ${
              selectedRegion
                ? "bg-primary hover:opacity-90"
                : "bg-gray-400 cursor-not-allowed"
            }`}>
            Start Farming
          </Button>
        </div>

        {/* Map Section */}
        <Card className="overflow-hidden z-0">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            minZoom={2}
            scrollWheelZoom={true}
            style={{ height: "600px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {regions.map((r) => (
              <Marker key={r.id} position={[r.lat, r.lng]}>
                <Popup>
                  <div className="space-y-1">
                    <strong>{r.name}</strong>
                    <p className="text-xs">{r.description}</p>
                    <Button
                      size="sm"
                      onClick={() => setSelectedRegion(r)}
                      className="mt-2 text-sm">
                      Select Region
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}

            <FlyToRegion region={selectedRegion} />
          </MapContainer>
        </Card>

        {/* Region Info Display */}
        {selectedRegion && (
          <div className="text-center space-y-2 pt-4">
            <h3 className="text-2xl font-bold text-primary">
              {selectedRegion.name}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {selectedRegion.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
