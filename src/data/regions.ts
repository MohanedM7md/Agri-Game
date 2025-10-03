export interface Region {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  zoom: number;
}

export const regions: Region[] = [
  {
    id: "north-america",
    name: "North America",
    description: "The continent stretching from Canada to Mexico.",
    lat: 39.8,
    lng: -98.6,
    zoom: 4,
  },
  {
    id: "europe",
    name: "Europe",
    description: "From the icy north to the sunny Mediterranean.",
    lat: 54.5,
    lng: 15.3,
    zoom: 4,
  },
  {
    id: "asia",
    name: "Asia",
    description:
      "The largest continent, rich in diverse climates and cultures.",
    lat: 34.0,
    lng: 100.6,
    zoom: 3,
  },
  {
    id: "africa",
    name: "Africa",
    description: "Fertile plains, deserts, and the cradle of civilization.",
    lat: 1.5,
    lng: 17.3,
    zoom: 3.5,
  },
  {
    id: "south-america",
    name: "South America",
    description: "Spanning the Andes, Amazon, and rich farmlands.",
    lat: -15.6,
    lng: -57.0,
    zoom: 3.5,
  },
  {
    id: "australia",
    name: "Australia & Oceania",
    description: "A continent of extremes, from desert to tropical rainforest.",
    lat: -25.3,
    lng: 133.8,
    zoom: 4,
  },
];
