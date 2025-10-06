import React from 'react';
import { Filter } from 'lucide-react';
import { CaseStudyCategory } from '../types';

interface CaseStudyFilterProps {
  selectedCaseStudyCategory: CaseStudyCategory | 'All';
  onCaseStudyCategoryChange: (category: CaseStudyCategory | 'All') => void;
  caseStudyCategories: readonly (CaseStudyCategory | 'All')[];
}

export const CaseStudyFilter: React.FC<CaseStudyFilterProps> = ({
  selectedCaseStudyCategory,
  onCaseStudyCategoryChange,
  caseStudyCategories
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center mb-4">
        <Filter className="w-5 h-5 text-gray-400 mr-2" />
        <h3 className="text-lg font-semibold text-white">Filter Case Studies</h3>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {caseStudyCategories.map((category) => (
          <button
            key={category}
            onClick={() => onCaseStudyCategoryChange(category)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
              selectedCaseStudyCategory === category
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
