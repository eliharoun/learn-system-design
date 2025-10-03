import React from 'react';
import { ChevronRight } from 'lucide-react';
import { InterviewStep } from '../types';

interface InterviewStepCardProps {
  step: InterviewStep;
  index: number;
  isVisible: boolean;
  onClick: (step: InterviewStep) => void;
}

export const InterviewStepCard: React.FC<InterviewStepCardProps> = ({ 
  step, 
  index, 
  isVisible, 
  onClick 
}) => {
  const Icon = step.icon;
  
  return (
    <div
      className={`group relative bg-gradient-to-br ${step.color} p-[1px] rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={() => onClick(step)}
    >
      <div className="bg-gray-900 rounded-xl p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${step.color} bg-opacity-20 flex items-center justify-center`}>
            <span className="text-2xl font-bold text-white mr-2">{step.step}</span>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300">
          {step.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {step.description}
        </p>
        <div className="flex items-center text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          Learn more
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
