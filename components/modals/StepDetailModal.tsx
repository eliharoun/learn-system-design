import React from 'react';
import { X } from 'lucide-react';
import { InterviewStep } from '../../types';

interface StepDetailModalProps {
  step: InterviewStep;
  onClose: () => void;
}

export const StepDetailModal: React.FC<StepDetailModalProps> = ({ step, onClose }) => {
  const Icon = step.icon;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl">
        <div className={`bg-gradient-to-br ${step.color} p-8 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <span className="text-3xl font-bold text-white mr-3">Step {step.step}</span>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">{step.title}</h2>
              <p className="text-white text-opacity-80 mt-2">{step.description}</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">What to Do</h3>
            <ul className="space-y-2">
              {step.details.map((detail, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${step.color} mt-2`} />
                  <span className="text-gray-300">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-2">Example</h3>
            <p className="text-gray-300 leading-relaxed">{step.example}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
