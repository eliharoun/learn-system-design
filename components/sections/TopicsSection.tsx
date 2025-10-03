import React from 'react';
import { TopicCard } from '../TopicCard';
import { Topic, CaseStudy, Category } from '../../types';

interface TopicsSectionProps {
  filteredItems: (Topic | CaseStudy)[];
  isVisible: boolean;
  selectedCategory: Category;
  onTopicClick: (item: Topic) => void;
  onCaseClick: (item: CaseStudy) => void;
}

export const TopicsSection: React.FC<TopicsSectionProps> = ({
  filteredItems,
  isVisible,
  selectedCategory,
  onTopicClick,
  onCaseClick
}) => {
  // TopicsSection is now always shown when needed
  const handleItemClick = (item: Topic | CaseStudy) => {
    if ('difficulty' in item) {
      onCaseClick(item as CaseStudy);
    } else {
      onTopicClick(item as Topic);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-white mb-4">System Design Topics & Case Studies</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Comprehensive coverage of system design fundamentals and real-world case studies from industry experts
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <TopicCard 
            key={item.id} 
            item={item} 
            index={index} 
            isVisible={isVisible}
            onClick={handleItemClick}
          />
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">No topics found</h3>
          <p className="text-gray-400">Try adjusting your search or filter</p>
        </div>
      )}
    </section>
  );
};
