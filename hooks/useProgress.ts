import { useState, useEffect } from 'react';
import { ProgressTracker, ProgressData } from '../utils/progressTracker';

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressData>(() => ProgressTracker.getProgress());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load progress data on mount
    const loadedProgress = ProgressTracker.getProgress();
    setProgress(loadedProgress);
    setIsLoading(false);

    // Listen for storage changes to sync across components
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'system-design-progress' && e.newValue) {
        try {
          const newProgress = JSON.parse(e.newValue);
          setProgress({ ...newProgress });
        } catch (error) {
          console.error('Error parsing progress update:', error);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  const markTopicCompleted = (topicId: string) => {
    ProgressTracker.markTopicCompleted(topicId);
    const updatedProgress = ProgressTracker.getProgress();
    setProgress({ ...updatedProgress }); // Force new object reference for React re-render
    
    // Trigger storage event to sync across components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'system-design-progress',
        newValue: JSON.stringify(updatedProgress)
      }));
    }
  };

  const markCaseStudyCompleted = (caseStudyId: string) => {
    ProgressTracker.markCaseStudyCompleted(caseStudyId);
    const updatedProgress = ProgressTracker.getProgress();
    setProgress({ ...updatedProgress }); // Force new object reference for React re-render
    
    // Trigger storage event to sync across components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'system-design-progress',
        newValue: JSON.stringify(updatedProgress)
      }));
    }
  };

  const addTimeSpent = (minutes: number) => {
    ProgressTracker.addTimeSpent(minutes);
    const updatedProgress = ProgressTracker.getProgress();
    setProgress(updatedProgress);
  };

  const resetProgress = () => {
    ProgressTracker.resetProgress();
    const defaultProgress = ProgressTracker.getProgress();
    setProgress(defaultProgress);
  };

  const isTopicCompleted = (topicId: string): boolean => {
    return progress.completedTopics.includes(topicId);
  };

  const isCaseStudyCompleted = (caseStudyId: string): boolean => {
    return progress.completedCaseStudies.includes(caseStudyId);
  };

  const getOverallProgress = (totalTopics: number, totalCaseStudies: number): number => {
    const totalItems = totalTopics + totalCaseStudies;
    const completedItems = progress.completedTopics.length + progress.completedCaseStudies.length;
    return Math.round((completedItems / totalItems) * 100);
  };

  const getTopicsProgress = (totalTopics: number): number => {
    return Math.round((progress.completedTopics.length / totalTopics) * 100);
  };

  const getCaseStudiesProgress = (totalCaseStudies: number): number => {
    return Math.round((progress.completedCaseStudies.length / totalCaseStudies) * 100);
  };

  const getLearningPathProgress = (topicIds: string[], caseStudyIds: string[]): number => {
    const totalItems = topicIds.length + caseStudyIds.length;
    const completedTopics = topicIds.filter(id => progress.completedTopics.includes(id)).length;
    const completedCaseStudies = caseStudyIds.filter(id => progress.completedCaseStudies.includes(id)).length;
    const completedItems = completedTopics + completedCaseStudies;
    return Math.round((completedItems / totalItems) * 100);
  };

  const getRecentAchievements = (): string[] => {
    return ProgressTracker.getAchievements(progress);
  };

  return {
    progress,
    isLoading,
    markTopicCompleted,
    markCaseStudyCompleted,
    addTimeSpent,
    resetProgress,
    isTopicCompleted,
    isCaseStudyCompleted,
    getOverallProgress,
    getTopicsProgress,
    getCaseStudiesProgress,
    getLearningPathProgress,
    getRecentAchievements
  };
};
