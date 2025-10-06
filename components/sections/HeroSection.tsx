import React from 'react';
import { Search } from 'lucide-react';
import { Category } from '../../types';
import { useAnalytics } from '../../hooks/useAnalytics';
import { CategoryGroupSelector } from '../CategoryGroupSelector';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  categories: Category[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories
}) => {
  const { trackEvent } = useAnalytics();

  const handleCategoryChange = (category: Category) => {
    trackEvent('category_filter', 'navigation', category);
    setSelectedCategory(category);
  };

  const handleSearchChange = (query: string) => {
    if (query.length > 2) {
      trackEvent('search', 'navigation', query);
    }
    setSearchQuery(query);
  };
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Master System Design & GenAI
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn essential concepts for distributed systems, LLM architectures, prompt engineering, RAG systems, and production-ready GenAI deployment.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search topics and case studies..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Category Group Selector */}
        <div className="-mb-16">
          <CategoryGroupSelector
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategoryChange}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </section>
  );
};
