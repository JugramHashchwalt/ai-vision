export interface Prediction {
  className: string;
  probability: number;
}

export interface HistoryItem {
  imageUrl: string;
  topPrediction: Prediction;
  timestamp: number;
}

export interface ImageClassificationResult {
  predictions: Prediction[];
  error?: string;
}