import React, { useState, useEffect } from 'react';
import { Trophy, Target, Clock, TrendingUp, CheckCircle, BookOpen } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';

interface ProgressTrackerProps {
  completedTopics: string[];
  completedCaseStudies: string[];
  totalTopics: number;
  totalCaseStudies: number;
  timeSpent: number; // in minutes
  currentStreak: number; // days
  achievements: string[];
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  completedTopics,
  completedCaseStudies,
  totalTopics,
  totalCaseStudies,
  timeSpent,
  currentStreak,
  achievements
}) => {
  const { trackEvent } = useAnalytics();
  const [isHydrated, setIsHydrated] = useState(false);

  const handleViewAllAchievements = () => {
    trackEvent('view_all_achievements', 'progress', 'achievements_button');
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Show loading state during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Your Progress</h3>
            <p className="text-gray-400">Loading your learning journey...</p>
          </div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-700/50 rounded-lg p-4">
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
                <div className="h-6 bg-gray-600 rounded mb-1"></div>
                <div className="h-3 bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  const topicsProgress = Math.round((completedTopics.length / totalTopics) * 100);
  const caseStudiesProgress = Math.round((completedCaseStudies.length / totalCaseStudies) * 100);
  const overallProgress = Math.round(((completedTopics.length + completedCaseStudies.length) / (totalTopics + totalCaseStudies)) * 100);
  
  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours < 24) return `${hours}h ${remainingMinutes}m`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h`;
  };

  const getProgressColor = (progress: number): string => {
    if (progress >= 80) return 'from-green-500 to-emerald-500';
    if (progress >= 60) return 'from-blue-500 to-cyan-500';
    if (progress >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Your Progress</h3>
          <p className="text-gray-400">Track your system design learning journey</p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-400">Overall Progress</span>
          <span className="text-lg font-bold text-white">{overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className={`bg-gradient-to-r ${getProgressColor(overallProgress)} h-3 rounded-full transition-all duration-500`}
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Topics Progress */}
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-400">Topics</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {completedTopics.length}/{totalTopics}
          </div>
          <div className="text-xs text-gray-400">{topicsProgress}% complete</div>
        </div>

        {/* Case Studies Progress */}
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-gray-400">Case Studies</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {completedCaseStudies.length}/{totalCaseStudies}
          </div>
          <div className="text-xs text-gray-400">{caseStudiesProgress}% complete</div>
        </div>

        {/* Time Spent */}
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-gray-400">Time Spent</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {formatTime(timeSpent)}
          </div>
          <div className="text-xs text-gray-400">Total study time</div>
        </div>

        {/* Current Streak */}
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-400">Streak</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {currentStreak}
          </div>
          <div className="text-xs text-gray-400">Days in a row</div>
        </div>
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
            Recent Achievements
          </h4>
          <div className="space-y-2">
            {achievements.slice(0, 3).map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-300">{achievement}</span>
              </div>
            ))}
          </div>
          {achievements.length > 3 && (
            <button 
              onClick={handleViewAllAchievements}
              className="text-sm text-blue-400 hover:text-blue-300 mt-2"
            >
              View all {achievements.length} achievements
            </button>
          )}
        </div>
      )}

      {/* Motivational Message */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
        <div className="text-sm text-gray-300">
          {overallProgress === 0 && "Start your system design journey today! 🚀"}
          {overallProgress > 0 && overallProgress < 25 && "Great start! Keep building your foundation. 💪"}
          {overallProgress >= 25 && overallProgress < 50 && "You're making excellent progress! 🎯"}
          {overallProgress >= 50 && overallProgress < 75 && "Halfway there! You're doing amazing! ⭐"}
          {overallProgress >= 75 && overallProgress < 100 && "Almost there! The finish line is in sight! 🏁"}
          {overallProgress === 100 && "Congratulations! You've mastered system design! 🎉"}
        </div>
      </div>
    </div>
  );
};
