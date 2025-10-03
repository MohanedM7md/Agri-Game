export interface GameState {
  day: number;
  soilHealth: number;
  waterLevel: number;
  temperature: number;
  stability: number;
  cropGrowth: number;
  totalWatering: number;
  totalFertilizer: number;
  totalPesticide: number;
}
export interface Region {
  id: string;
  name: string;
  description: string;
}

export interface Crop {
  id: string;
  name: string;
  emoji: string;
  description: string;
}
export interface GameEvent {
  title: string;
  description: string;
  options: Array<{
    label: string;
    isCorrect: boolean;
    feedback: string;
  }>;
}

export const OPTIMAL_RANGES = {
  soilHealth: { min: 70, max: 95 },
  waterLevel: { min: 50, max: 80 },
  temperature: { min: 65, max: 85 },
  stability: { min: 80, max: 100 },
};

export const GAME_EVENTS: GameEvent[] = [
  {
    title: "Unexpected Drought!",
    description:
      "The weather forecast shows no rain for the next week. Your crops are showing signs of stress.",
    options: [
      {
        label: "Water heavily every day",
        isCorrect: false,
        feedback:
          "Too much water can lead to root rot and nutrient leaching. Moderation is key!",
      },
      {
        label: "Increase watering moderately and add mulch",
        isCorrect: true,
        feedback:
          "Excellent! Moderate watering with mulch helps retain moisture efficiently.",
      },
      {
        label: "Wait for rain and do nothing",
        isCorrect: false,
        feedback:
          "Your crops need intervention during drought. Waiting will reduce yield significantly.",
      },
    ],
  },
  {
    title: "Pest Infestation Detected!",
    description: "You notice aphids on your crops. They're spreading quickly.",
    options: [
      {
        label: "Apply heavy pesticides immediately",
        isCorrect: false,
        feedback:
          "Over-application harms beneficial insects and soil health. Use targeted treatments!",
      },
      {
        label: "Introduce natural predators (ladybugs)",
        isCorrect: true,
        feedback:
          "Smart choice! Natural pest control maintains ecosystem balance.",
      },
      {
        label: "Ignore it, nature will balance itself",
        isCorrect: false,
        feedback:
          "While natural balance exists, intervention prevents major crop loss.",
      },
    ],
  },
  {
    title: "Soil Nutrient Deficiency",
    description:
      "Your crops show yellowing leaves - a sign of nitrogen deficiency.",
    options: [
      {
        label: "Add excessive chemical fertilizer",
        isCorrect: false,
        feedback:
          "Over-fertilization pollutes groundwater and damages soil structure.",
      },
      {
        label: "Apply balanced organic fertilizer",
        isCorrect: true,
        feedback:
          "Perfect! Organic fertilizers improve soil health while providing nutrients.",
      },
      {
        label: "Do nothing and hope it improves",
        isCorrect: false,
        feedback:
          "Nutrient deficiency requires action to prevent crop failure.",
      },
    ],
  },
  {
    title: "Heavy Rainfall Warning",
    description: "Meteorologists predict intense rainfall for the next 3 days.",
    options: [
      {
        label: "Continue regular watering schedule",
        isCorrect: false,
        feedback:
          "This will cause waterlogging and root damage. Adjust for weather!",
      },
      {
        label: "Stop watering and improve drainage",
        isCorrect: true,
        feedback:
          "Excellent decision! Preventing waterlogging protects crop health.",
      },
      {
        label: "Add extra fertilizer before rain",
        isCorrect: false,
        feedback:
          "Heavy rain will wash away fertilizer, wasting resources and polluting water.",
      },
    ],
  },
];
