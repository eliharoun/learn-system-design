import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { ResourceCategory } from '../../data/resources';
import { Category } from '../../types';

interface ResourcesSectionProps {
  resourceCategories: ResourceCategory[];
  isVisible: boolean;
  selectedCategory: Category;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  resourceCategories,
  isVisible,
  selectedCategory
}) => {
  // Only show resources section when Resources category is selected
  if (selectedCategory !== 'Resources') {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-white mb-4">Additional Learning Resources</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Curated collection of free resources for all types of technical interviews
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {resourceCategories.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className={`group relative bg-gradient-to-br ${category.color} p-[1px] rounded-xl overflow-hidden transform transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${categoryIndex * 100}ms` }}
            >
              <div className="bg-gray-900 rounded-xl p-6 h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-20`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{category.title}</h4>
                    <p className="text-gray-400 text-sm">{category.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {category.resources.map((resource, resourceIndex) => (
                    <a
                      key={resourceIndex}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-800 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all duration-200 group/resource"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="font-semibold text-white group-hover/resource:text-cyan-400 transition-colors">
                              {resource.title}
                            </h5>
                            {resource.stars && (
                              <div className="flex items-center space-x-1 text-yellow-400">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="text-xs font-medium">{resource.stars}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {resource.description}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-500 group-hover/resource:text-cyan-400 transition-colors flex-shrink-0 ml-3" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
