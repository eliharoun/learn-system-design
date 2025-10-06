import React, { useState } from 'react';
import { ChevronDown, Layers, Brain } from 'lucide-react';
import { Category, CategoryGroup } from '../types';
import { categoryGroups, orderedStandaloneCategories, orderedStandaloneCategoriesAfterGroups } from '../data/constants';

interface CategoryGroupSelectorProps {
  selectedCategory: Category;
  onCategorySelect: (category: Category) => void;
  searchQuery: string;
}

const iconMap = {
  'layers': Layers,
  'brain': Brain,
};

export const CategoryGroupSelector: React.FC<CategoryGroupSelectorProps> = ({
  selectedCategory,
  onCategorySelect,
  searchQuery
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set<string>();
    if (!expandedGroups.has(groupId)) {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const isGroupSelected = (group: CategoryGroup) => {
    return group.subcategories.includes(selectedCategory);
  };

  const handleStandaloneCategorySelect = (category: Category) => {
    // Close all expanded groups when selecting a standalone category
    setExpandedGroups(new Set());
    onCategorySelect(category);
  };

  // If there's a search query, show all categories flat
  if (searchQuery.trim()) {
    return (
      <div className="flex flex-wrap justify-center gap-3">
        {[...orderedStandaloneCategories, ...categoryGroups.flatMap(g => g.subcategories), ...orderedStandaloneCategoriesAfterGroups].map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {/* First standalone category (All) */}
        {orderedStandaloneCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleStandaloneCategorySelect(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}

        {/* Category Groups as Main Buttons */}
        {categoryGroups.map((group) => {
          const IconComponent = iconMap[group.icon as keyof typeof iconMap] || Layers;
          const isExpanded = expandedGroups.has(group.id);
          const isSelected = isGroupSelected(group);

          return (
            <button
              key={group.id}
              onClick={() => toggleGroup(group.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                isSelected || isExpanded
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {group.title}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`} />
            </button>
          );
        })}

        {/* Remaining standalone categories */}
        {orderedStandaloneCategoriesAfterGroups.map((category) => (
          <button
            key={category}
            onClick={() => handleStandaloneCategorySelect(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Expanded Subcategories */}
      {categoryGroups.map((group) => {
        const isExpanded = expandedGroups.has(group.id);
        
        if (!isExpanded) return null;

        return (
          <div key={`${group.id}-expanded`} className="max-w-4xl mx-auto">
            <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {group.title} Topics
                </h3>
                <p className="text-gray-400 text-sm">
                  {group.description}
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {group.subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    onClick={() => onCategorySelect(subcategory)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                      selectedCategory === subcategory
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
