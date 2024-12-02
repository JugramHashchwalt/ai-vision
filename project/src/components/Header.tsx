import React from 'react';
import { Github } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold text-gray-900">AI Vision</span>
          </div>
          
          <nav className="flex items-center space-x-4">
            <a
              href="https://github.com/yourusername/ai-vision"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}