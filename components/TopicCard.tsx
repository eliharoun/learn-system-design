import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Topic, CaseStudy } from '../types';
import { isCaseStudy, getDifficultyColor } from '../utils';
import { useAnalytics } from '../hooks/useAnalytics';

interface TopicCardProps {
  item: Topic | CaseStudy;
  index: number;
  isVisible: boolean;
  onClick: (item: Topic | CaseStudy) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ 
  item, 
  index, 
  isVisible, 
  onClick 
}) => {
  const { trackTopicView } = useAnalytics();
  const Icon = item.icon;
  const isCase = 'difficulty' in item;

  const handleClick = () => {
    trackTopicView(item.title);
    onClick(item);
  };
  
  return (
    <div
      className={`group relative bg-gradient-to-br ${item.color} p-[1px] rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
      onClick={handleClick}
    >
      <div className="bg-gray-900 rounded-xl p-6 h-full">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-20`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-medium text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
              {item.category}
            </span>
            {isCase && (
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                (item as CaseStudy).difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                (item as CaseStudy).difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {(item as CaseStudy).difficulty}
              </span>
            )}
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300">
          {item.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {item.description}
        </p>
        <div className="flex items-center text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          Learn more
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
