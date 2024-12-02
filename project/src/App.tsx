import React from 'react';
import { Brain } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { PredictionResult } from './components/PredictionResult';
import { ErrorMessage } from './components/ErrorMessage';
import { useImageClassification } from './hooks/useImageClassification';
import { Header } from './components/Header';
import { ImageHistory } from './components/ImageHistory';

function App() {
  const { 
    handleImageFile, 
    predictions, 
    isLoading, 
    error,
    history,
    clearHistory 
  } = useImageClassification();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Image Recognition
            </h1>
            <p className="text-lg text-gray-600">
              Upload an image and let AI identify what's in it
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ImageUpload onImageSelect={handleImageFile} isLoading={isLoading} />
              <ErrorMessage message={error} />
              <PredictionResult predictions={predictions} />
            </div>
            
            <div className="space-y-6">
              <ImageHistory history={history} onClear={clearHistory} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;