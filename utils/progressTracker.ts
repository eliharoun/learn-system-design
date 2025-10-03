export interface ProgressData {
  completedTopics: string[];
  completedCaseStudies: string[];
  timeSpent: number; // in minutes
  currentStreak: number; // days
  lastActiveDate: string;
  achievements: string[];
  startDate: string;
}

export class ProgressTracker {
  private static readonly STORAGE_KEY = 'system-design-progress';

  static getProgress(): ProgressData {
    if (typeof window === 'undefined') {
      return this.getDefaultProgress();
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return {
          ...this.getDefaultProgress(),
          ...data
        };
      }
    } catch (error) {
      console.error('Error loading progress data:', error);
    }

    return this.getDefaultProgress();
  }

  static saveProgress(progress: ProgressData): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress data:', error);
    }
  }

  static markTopicCompleted(topicId: string): void {
    const progress = this.getProgress();
    if (!progress.completedTopics.includes(topicId)) {
      progress.completedTopics.push(topicId);
      progress.achievements.push(`Completed topic: ${topicId.replace(/-/g, ' ')}`);
      this.updateStreak(progress);
      this.saveProgress(progress);
    }
  }

  static markCaseStudyCompleted(caseStudyId: string): void {
    const progress = this.getProgress();
    if (!progress.completedCaseStudies.includes(caseStudyId)) {
      progress.completedCaseStudies.push(caseStudyId);
      progress.achievements.push(`Completed case study: ${caseStudyId.replace(/-/g, ' ')}`);
      this.updateStreak(progress);
      this.saveProgress(progress);
    }
  }

  static addTimeSpent(minutes: number): void {
    const progress = this.getProgress();
    progress.timeSpent += minutes;
    this.updateStreak(progress);
    this.saveProgress(progress);
  }

  static resetProgress(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static getAchievements(progress: ProgressData): string[] {
    const achievements: string[] = [...progress.achievements];
    
    // Milestone achievements
    const totalCompleted = progress.completedTopics.length + progress.completedCaseStudies.length;
    
    if (totalCompleted >= 5 && !achievements.some(a => a.includes('First 5'))) {
      achievements.push('🎯 Completed your first 5 items!');
    }
    
    if (totalCompleted >= 10 && !achievements.some(a => a.includes('First 10'))) {
      achievements.push('🚀 Completed 10 items - you\'re on fire!');
    }
    
    if (totalCompleted >= 25 && !achievements.some(a => a.includes('Quarter'))) {
      achievements.push('⭐ Quarter way there - 25 items completed!');
    }
    
    if (progress.completedTopics.length >= 10 && !achievements.some(a => a.includes('Topic Master'))) {
      achievements.push('📚 Topic Master - 10 topics completed!');
    }
    
    if (progress.completedCaseStudies.length >= 5 && !achievements.some(a => a.includes('Case Study Expert'))) {
      achievements.push('🏗️ Case Study Expert - 5 case studies completed!');
    }
    
    if (progress.currentStreak >= 7 && !achievements.some(a => a.includes('Week Streak'))) {
      achievements.push('🔥 Week Streak - 7 days in a row!');
    }
    
    if (progress.timeSpent >= 300 && !achievements.some(a => a.includes('5 Hours'))) {
      achievements.push('⏰ Dedicated Learner - 5 hours of study time!');
    }

    return achievements.slice(-10); // Keep only recent achievements
  }

  private static getDefaultProgress(): ProgressData {
    return {
      completedTopics: [],
      completedCaseStudies: [],
      timeSpent: 0,
      currentStreak: 0,
      lastActiveDate: '',
      achievements: [],
      startDate: new Date().toISOString()
    };
  }

  private static updateStreak(progress: ProgressData): void {
    const today = new Date().toDateString();
    const lastActive = progress.lastActiveDate ? new Date(progress.lastActiveDate).toDateString() : '';
    
    if (lastActive === today) {
      // Already active today, no change to streak
      return;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (lastActive === yesterdayStr) {
      // Continuing streak
      progress.currentStreak += 1;
    } else if (lastActive === '') {
      // First day
      progress.currentStreak = 1;
    } else {
      // Streak broken, start new
      progress.currentStreak = 1;
    }
    
    progress.lastActiveDate = new Date().toISOString();
  }
}
