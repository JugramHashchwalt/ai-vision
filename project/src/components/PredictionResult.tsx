import React from 'react';

interface Prediction {
  className: string;
  probability: number;
}

interface PredictionResultProps {
  predictions: Prediction[] | null;
}

export function PredictionResult({ predictions }: PredictionResultProps) {
  if (!predictions || predictions.length === 0) return null;

  return (
    <div className="w-full max-w-md mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Results:</h3>
      <div className="space-y-2">
        {predictions.slice(0, 3).map((prediction, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-800">
                {prediction.className.split(',')[0]}
              </span>
              <span className="text-sm text-gray-500">
                {(prediction.probability * 100).toFixed(1)}%
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${prediction.probability * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}