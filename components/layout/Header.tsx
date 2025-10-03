import React from 'react';
import { Menu, X, Code } from 'lucide-react';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <header className="sticky top-0 z-40 bg-gray-900 bg-opacity-90 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  InterviewPro Club
                </h1>
              <p className="text-xs text-gray-400">Learn to build scalable systems</p>
            </div>
          </div>
          
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};
