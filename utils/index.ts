import { Topic, CaseStudy, Category } from '../types';

/**
 * Filter items based on category and search query
 */
export const filterItems = (
  items: (Topic | CaseStudy)[],
  category: Category,
  searchQuery: string
): (Topic | CaseStudy)[] => {
  return items.filter(item => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};

/**
 * Check if an item is a case study
 */
export const isCaseStudy = (item: Topic | CaseStudy): item is CaseStudy => {
  return 'difficulty' in item;
};

/**
 * Get difficulty color classes
 */
export const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard'): string => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-500/20 text-green-400';
    case 'Medium':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'Hard':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

/**
 * Get difficulty badge color for modals
 */
export const getDifficultyBadgeColor = (difficulty: 'Easy' | 'Medium' | 'Hard'): string => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-500/30 text-green-200';
    case 'Medium':
      return 'bg-yellow-500/30 text-yellow-200';
    case 'Hard':
      return 'bg-red-500/30 text-red-200';
    default:
      return 'bg-gray-500/30 text-gray-200';
  }
};
