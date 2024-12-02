import React from 'react';
import { Trash2 } from 'lucide-react';
import { HistoryItem } from '../types';

interface ImageHistoryProps {
  history: HistoryItem[];
  onClear: () => void;
}

export function ImageHistory({ history, onClear }: ImageHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Analyses</h2>
        <button
          onClick={onClear}
          className="text-red-600 hover:text-red-700 transition-colors"
          title="Clear history"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        {history.map((item, index) => (
          <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <div className="flex items-start gap-4">
              <img
                src={item.imageUrl}
                alt="Analyzed"
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-medium text-gray-900">
                  {item.topPrediction.className.split(',')[0]}
                </p>
                <p className="text-sm text-gray-500">
                  Confidence: {(item.topPrediction.probability * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}