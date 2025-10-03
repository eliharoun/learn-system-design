import React, { useState } from 'react';
import { CheckCircle, Clock, BookOpen, Target, ChevronRight, ChevronDown } from 'lucide-react';
import { LearningPath } from '../types';
import { useAnalytics } from '../hooks/useAnalytics';

interface LearningPathProps {
  learningPath: LearningPath;
  completedTopics: string[];
  completedCaseStudies: string[];
  onTopicClick: (topicId: string) => void;
  onCaseStudyClick: (caseStudyId: string) => void;
}

export const LearningPathComponent: React.FC<LearningPathProps> = ({
  learningPath,
  completedTopics,
  completedCaseStudies,
  onTopicClick,
  onCaseStudyClick
}) => {
  const { trackEvent } = useAnalytics();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    const newExpanded = !isExpanded;
    trackEvent(newExpanded ? 'learning_path_expand' : 'learning_path_collapse', 'learning_path', learningPath.title);
    setIsExpanded(newExpanded);
  };

  const handleTopicClick = (topicId: string) => {
    trackEvent('learning_path_topic_click', 'learning_path', `${learningPath.title} - ${topicId}`);
    onTopicClick(topicId);
  };

  const handleCaseStudyClick = (caseStudyId: string) => {
    trackEvent('learning_path_case_study_click', 'learning_path', `${learningPath.title} - ${caseStudyId}`);
    onCaseStudyClick(caseStudyId);
  };
  
  const completedTopicsCount = learningPath.topics.filter(id => completedTopics.includes(id)).length;
  const completedCaseStudiesCount = learningPath.caseStudies.filter(id => completedCaseStudies.includes(id)).length;
  const totalItems = learningPath.topics.length + learningPath.caseStudies.length;
  const completedItems = completedTopicsCount + completedCaseStudiesCount;
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'from-green-500 to-emerald-500';
      case 'Intermediate': return 'from-yellow-500 to-orange-500';
      case 'Advanced': return 'from-red-500 to-pink-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getDifficultyColor(learningPath.difficulty)} p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{learningPath.title}</h3>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-white/80 text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {learningPath.estimatedWeeks} weeks
                </span>
                <span className="text-white/80 text-sm">
                  {learningPath.difficulty}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleExpand}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-white" />
            ) : (
              <ChevronRight className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-300 mb-4">{learningPath.description}</p>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-400">Progress</span>
            <span className="text-sm font-medium text-white">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${getDifficultyColor(learningPath.difficulty)} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>{completedItems} of {totalItems} completed</span>
            <span>{totalItems - completedItems} remaining</span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-white">{learningPath.topics.length}</div>
                <div className="text-sm text-gray-400">Topics</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-lg font-bold text-white">{learningPath.caseStudies.length}</div>
                <div className="text-sm text-gray-400">Case Studies</div>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-6">
            {/* Topics Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                Topics ({completedTopicsCount}/{learningPath.topics.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {learningPath.topics.map((topicId, index) => {
                  const isCompleted = completedTopics.includes(topicId);
                  return (
                    <button
                      key={topicId}
                      onClick={() => handleTopicClick(topicId)}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                        isCompleted 
                          ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                          : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <span className="text-xs font-medium w-6 text-center">
                          {index + 1}
                        </span>
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-500 rounded-full" />
                        )}
                        <span className="text-sm font-medium capitalize">
                          {topicId.replace(/-/g, ' ')}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Case Studies Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-400" />
                Case Studies ({completedCaseStudiesCount}/{learningPath.caseStudies.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {learningPath.caseStudies.map((caseStudyId, index) => {
                  const isCompleted = completedCaseStudies.includes(caseStudyId);
                  return (
                    <button
                      key={caseStudyId}
                      onClick={() => handleCaseStudyClick(caseStudyId)}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                        isCompleted 
                          ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                          : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <span className="text-xs font-medium w-6 text-center">
                          {index + 1}
                        </span>
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-500 rounded-full" />
                        )}
                        <span className="text-sm font-medium capitalize">
                          {caseStudyId.replace(/-/g, ' ')}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
