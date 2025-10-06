import React, { useState } from 'react';
import { Topic, CaseStudy, Category, CaseStudyCategory } from '../types';
import { TopicCard } from './TopicCard';
import { CaseStudyFilter } from './CaseStudyFilter';
import { categories } from '../data';
import { caseStudyCategories } from '../data/categories/caseStudies';

interface TabbedTopicsSectionProps {
  topics: Topic[];
  caseStudies: CaseStudy[];
  searchQuery: string;
  selectedCategory: Category;
  onTopicClick: (topic: Topic) => void;
  onCaseClick: (caseStudy: CaseStudy) => void;
  isVisible: boolean;
}

export const TabbedTopicsSection: React.FC<TabbedTopicsSectionProps> = ({
  topics,
  caseStudies,
  searchQuery,
  selectedCategory,
  onTopicClick,
  onCaseClick,
  isVisible
}) => {
  const [selectedCaseStudyCategory, setSelectedCaseStudyCategory] = useState<CaseStudyCategory | 'All'>('All');

  // Filter items based on selected category from HeroSection and search query
  const allItems = [...topics, ...caseStudies];
  const filteredItems = allItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Additional filtering for case studies by case study category
    const matchesCaseStudyCategory = !('caseStudyCategory' in item) || 
                                   selectedCaseStudyCategory === 'All' || 
                                   item.caseStudyCategory === selectedCaseStudyCategory;
    
    return matchesCategory && matchesSearch && matchesCaseStudyCategory;
  });

  // Show case study filter only when Case Studies category is selected
  const showCaseStudyFilter = selectedCategory === 'Case Studies';

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Search Results Info */}
          {searchQuery && (
            <div className="mb-6 text-center">
              <p className="text-gray-400">
                Found {filteredItems.length} results for "{searchQuery}"
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>
            </div>
          )}

          {/* Case Study Filter */}
          {showCaseStudyFilter && (
            <CaseStudyFilter
              selectedCaseStudyCategory={selectedCaseStudyCategory}
              onCaseStudyCategoryChange={setSelectedCaseStudyCategory}
              caseStudyCategories={caseStudyCategories}
            />
          )}

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <TopicCard
                key={item.id}
                item={item}
                index={index}
                isVisible={isVisible}
                onClick={(clickedItem) => {
                  if ('difficulty' in clickedItem) {
                    onCaseClick(clickedItem as CaseStudy);
                  } else {
                    onTopicClick(clickedItem as Topic);
                  }
                }}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">
                {searchQuery 
                  ? `No topics found matching "${searchQuery}"${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}`
                  : `No topics available in ${selectedCategory}`
                }
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

// Helper function to get category descriptions
const getCategoryDescription = (category: Category): string => {
  const descriptions: Record<Category, string> = {
    'All': 'All system design topics and case studies',
    'Fundamentals': 'Core concepts every system designer should understand, including performance, scalability, and reliability principles.',
    'Networking & Infrastructure': 'Network protocols, load balancing, DNS, clustering, and infrastructure components that form the backbone of distributed systems.',
    'Databases & Data Management': 'Database design, transactions, replication, sharding, and data consistency patterns for scalable data storage.',
    'Architecture & Communication': 'Architectural patterns, microservices, messaging systems, and communication protocols for building distributed applications.',
    'Components': 'Reusable system components like caches, proxies, and data structures that solve common scalability challenges.',
    'Patterns': 'Design patterns and architectural approaches for building robust, scalable systems.',
    'Best Practices': 'Industry best practices for security, API design, and system reliability.',
    'GenAI & LLM': 'Generative AI and Large Language Model concepts including transformer architecture, attention mechanisms, RAG systems, and prompt engineering.',
    'LLMOps': 'LLM Operations covering deployment strategies, monitoring, optimization, safety, and production best practices for AI systems.',
    'Interview Process': 'Strategies and methodologies for succeeding in system design interviews.',
    'Case Studies': 'Real-world system design examples and implementations',
    'Study Plans': 'Structured learning journeys to master system design at your own pace',
    'Resources': 'Additional learning materials and external references',
    'Flashcards': 'Interactive flashcards for quick review and memorization'
  };
  
  return descriptions[category] || 'System design concepts and patterns.';
};
