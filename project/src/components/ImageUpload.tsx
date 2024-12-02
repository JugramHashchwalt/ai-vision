import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

export function ImageUpload({ onImageSelect, isLoading }: ImageUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full max-w-md p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
    >
      <label className="flex flex-col items-center space-y-4 cursor-pointer">
        <Upload className="w-12 h-12 text-gray-400" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            {isLoading ? 'Analyzing image...' : 'Drop an image here'}
          </p>
          <p className="text-sm text-gray-500">or click to select</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={isLoading}
        />
      </label>
    </div>
  );
}