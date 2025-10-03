import { Region, Crop, GameEvent } from "@/types/game";

export const regions: Region[] = [
  {
    id: "nile",
    name: "Nile Delta",
    description: "Ancient agricultural heartland of Egypt",
  },
  { id: "sahel", name: "Sahel", description: "Semi-arid region across Africa" },
  { id: "midwest", name: "US Midwest", description: "America's breadbasket" },
  {
    id: "ganges",
    name: "Ganges Basin",
    description: "Densely populated farming region in India",
  },
  {
    id: "amazon",
    name: "Amazon Fringe",
    description: "Frontier agriculture in South America",
  },
];

export const crops: Crop[] = [
  {
    id: "wheat",
    name: "Wheat",
    emoji: "🌾",
    description: "Staple grain crop, moderate water needs",
  },
  {
    id: "rice",
    name: "Rice",
    emoji: "🍚",
    description: "High-yield crop, requires flooding",
  },
  {
    id: "maize",
    name: "Maize",
    emoji: "🌽",
    description: "Versatile corn crop, drought-sensitive",
  },
];
