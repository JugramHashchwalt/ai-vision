import { useState, useCallback, useEffect } from 'react';
import { initializeModel } from '../lib/tensorflow';
import { createImageElement, validateImageFile } from '../lib/imageProcessor';
import type { Prediction, HistoryItem } from '../types';

const HISTORY_STORAGE_KEY = 'image-analysis-history';

export function useImageClassification() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const handleImageFile = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setPredictions(null);

    try {
      validateImageFile(file);
      const model = await initializeModel();
      const imageElement = await createImageElement(file);
      const results = await model.classify(imageElement);
      setPredictions(results);

      // Add to history
      const imageUrl = URL.createObjectURL(file);
      setHistory(prev => [{
        imageUrl,
        topPrediction: results[0],
        timestamp: Date.now()
      }, ...prev.slice(0, 9)]); // Keep last 10 items

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Image classification error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    handleImageFile,
    predictions,
    isLoading,
    error,
    history,
    clearHistory
  };
}