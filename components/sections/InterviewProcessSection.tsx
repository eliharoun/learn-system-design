import React from 'react';
import { InterviewStepCard } from '../InterviewStepCard';
import { InterviewStep, Category } from '../../types';

interface InterviewProcessSectionProps {
  selectedCategory: Category;
  interviewSteps: InterviewStep[];
  isVisible: boolean;
  onStepClick: (step: InterviewStep) => void;
}

export const InterviewProcessSection: React.FC<InterviewProcessSectionProps> = ({
  selectedCategory,
  interviewSteps,
  isVisible,
  onStepClick
}) => {
  if (selectedCategory !== 'All' && selectedCategory !== 'Interview Process') {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 pt-16">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-white mb-4">7-Step System Design Interview Process</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Master the structured approach from "Grok System Design Interview" used at top tech companies
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {interviewSteps.map((step, index) => (
          <InterviewStepCard 
            key={step.step} 
            step={step} 
            index={index} 
            isVisible={isVisible}
            onClick={onStepClick}
          />
        ))}
      </div>
    </section>
  );
};
