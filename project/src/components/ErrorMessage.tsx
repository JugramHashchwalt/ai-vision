import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string | null;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="w-full max-w-md p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
}