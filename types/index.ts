import { LucideIcon } from 'lucide-react';

export interface InterviewStep {
  step: number;
  title: string;
  icon: LucideIcon;
  color: string;
  description: string;
  details: string[];
  example: string;
}

export interface TopicContent {
  overview: string;
  keyPoints: string[];
  example: string;
  tradeoffs: {
    considerations: string[];
  };
}

export interface EnhancedTopicContent extends TopicContent {
  detailedExplanation: string;
  diagrams: string[];
  realWorldExamples: string[];
  commonMistakes: string[];
  interviewTips: string[];
  relatedTopics: string[];
  
  tradeoffs: {
    considerations: string[];
    prosAndCons: {
      pros: string[];
      cons: string[];
    };
  };
  
  implementation: {
    algorithms?: string[];
    dataStructures?: string[];
    protocols?: string[];
    technologies: string[];
  };
  
  benchmarks?: {
    metric: string;
    value: string;
    context: string;
  }[];
}

export interface Topic {
  id: string;
  title: string;
  category: string;
  icon: LucideIcon;
  color: string;
  description: string;
  content: TopicContent | EnhancedTopicContent;
}

export interface CaseStudyContent {
  overview: string;
  requirements: string[];
  estimations: string;
  components: string[];
  keyDecisions: string[];
  diagrams?: string[];
}

export interface EnhancedCaseStudyContent {
  overview: string;
  requirements: string[];
  components: string[];
  keyDecisions: string[];
  
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  extendedRequirements: string[];
  
  estimations: {
    summary: string; // Keep backward compatibility
    traffic: {
      dailyActiveUsers: string;
      requestsPerSecond: string;
      readWriteRatio: string;
    };
    storage: {
      perDay: string;
      perYear: string;
      total: string;
    };
    bandwidth: {
      incoming: string;
      outgoing: string;
    };
    cache: {
      size: string;
      hitRatio: string;
    };
  };
  
  apiDesign: {
    endpoint: string;
    method: string;
    description: string;
    parameters: string[];
    response: string;
  }[];
  
  dataModel: {
    tables: {
      name: string;
      fields: string[];
      relationships: string[];
    }[];
    databaseChoice: string;
    reasoning: string;
  };
  
  bottlenecks: {
    problem: string;
    solution: string;
    tradeoffs: string[];
  }[];
  
  diagrams: string[];
  relatedTopics: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  icon: LucideIcon;
  color: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  content: CaseStudyContent;
}

export type Category = 'All' | 'Fundamentals' | 'Networking & Infrastructure' | 'Databases & Data Management' | 'Architecture & Communication' | 'Components' | 'Patterns' | 'Best Practices' | 'GenAI & LLM' | 'LLMOps' | 'Interview Process' | 'Case Studies' | 'Study Plans' | 'Flashcards' | 'Resources';

export interface CategoryGroup {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  subcategories: Category[];
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// New interfaces for enhanced functionality
export interface DiagramInfo {
  id: string;
  title: string;
  filename: string;
  category: string;
  relatedTopics: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedWeeks: number;
  topics: string[];
  caseStudies: string[];
}
