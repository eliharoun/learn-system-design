import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import {
  Header,
  Footer,
  HeroSection,
  InterviewProcessSection,
  TopicsSection,
  ResourcesSection,
  FlashcardsSection,
  StepDetailModal,
  TopicDetailModal,
  CaseStudyDetailModal
} from '../components';
import { TabbedTopicsSection } from '../components/enhanced/TabbedTopicsSection';
import { LearningPathComponent } from '../components/enhanced/LearningPath';
import { ProgressTracker } from '../components/enhanced/ProgressTracker';
import { SEO, generateWebsiteStructuredData } from '../components/SEO';
import { interviewSteps, topics, caseStudies, categories, resourceCategories } from '../data';
import { learningPaths } from '../data/learningPaths';
import { useProgress } from '../hooks/useProgress';
import { filterItems } from '../utils';
import { Category, Topic, CaseStudy, InterviewStep } from '../types';

export default function SystemDesignLearning() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [selectedStep, setSelectedStep] = useState<InterviewStep | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showLearningPaths, setShowLearningPaths] = useState(false);

  const progress = useProgress();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTopicClick = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
      setSelectedTopic(topic);
      progress.addTimeSpent(1); // Add 1 minute for opening a topic
    }
  };

  const handleCaseStudyClick = (caseStudyId: string) => {
    const caseStudy = caseStudies.find(cs => cs.id === caseStudyId);
    if (caseStudy) {
      setSelectedCase(caseStudy);
      progress.addTimeSpent(2); // Add 2 minutes for opening a case study
    }
  };

  const allItems = [...topics, ...caseStudies];
  const filteredItems = allItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <SEO 
        structuredData={generateWebsiteStructuredData()}
        keywords={[
          'system design',
          'software architecture',
          'scalability',
          'distributed systems',
          'microservices',
          'database design',
          'system design interview',
          'software engineering',
          'tech interview prep',
          'load balancing',
          'caching',
          'CAP theorem',
          'ACID transactions',
          'NoSQL databases',
          'API design',
          'circuit breaker',
          'rate limiting'
        ]}
      />
      
      <Header 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />


      {/* Study Plans Section */}
      {selectedCategory === 'Study Plans' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Study Plans
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Structured learning journeys to master system design at your own pace
            </p>
          </div>

          {/* Compact Progress Tracker */}
          <div className="mb-8 bg-gray-800/30 rounded-lg border border-gray-700/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                Your Progress
              </h3>
              <span className="text-sm text-gray-400">
                {Math.round(((progress.progress.completedTopics.length + progress.progress.completedCaseStudies.length) / (topics.length + caseStudies.length)) * 100)}% Complete
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">{progress.progress.completedTopics.length}/{topics.length}</div>
                <div className="text-xs text-gray-400">Topics</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{progress.progress.completedCaseStudies.length}/{caseStudies.length}</div>
                <div className="text-xs text-gray-400">Case Studies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">{progress.progress.currentStreak}</div>
                <div className="text-xs text-gray-400">Day Streak</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {learningPaths.map((learningPath) => (
              <LearningPathComponent
                key={learningPath.id}
                learningPath={learningPath}
                completedTopics={progress.progress.completedTopics}
                completedCaseStudies={progress.progress.completedCaseStudies}
                onTopicClick={handleTopicClick}
                onCaseStudyClick={handleCaseStudyClick}
              />
            ))}
          </div>
        </section>
      )}

      {selectedCategory !== 'Resources' && selectedCategory !== 'Flashcards' && selectedCategory !== 'Interview Process' && selectedCategory !== 'Study Plans' && (
        <TabbedTopicsSection
          topics={topics}
          caseStudies={caseStudies}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onTopicClick={setSelectedTopic}
          onCaseClick={setSelectedCase}
          isVisible={isVisible}
        />
      )}

      <InterviewProcessSection
        selectedCategory={selectedCategory}
        interviewSteps={interviewSteps}
        isVisible={isVisible}
        onStepClick={setSelectedStep}
      />

      <ResourcesSection
        resourceCategories={resourceCategories}
        isVisible={isVisible}
        selectedCategory={selectedCategory}
      />

      <FlashcardsSection
        selectedCategory={selectedCategory}
      />

      <Footer />

      {/* Modals */}
      {selectedStep && (
        <StepDetailModal 
          step={selectedStep} 
          onClose={() => setSelectedStep(null)} 
        />
      )}
      
      {selectedTopic && (
        <TopicDetailModal 
          topic={selectedTopic} 
          onClose={() => setSelectedTopic(null)} 
        />
      )}
      
      {selectedCase && (
        <CaseStudyDetailModal 
          caseStudy={selectedCase} 
          onClose={() => setSelectedCase(null)} 
        />
      )}

    </div>
  );
}
