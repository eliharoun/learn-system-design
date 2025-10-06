import { Category } from '../types';

export const categories: Category[] = [
  'All', 
  'Interview Process',
  'Fundamentals', 
  'Networking & Infrastructure', 
  'Databases & Data Management', 
  'Architecture & Communication', 
  'Components', 
  'Patterns', 
  'Best Practices',
  'GenAI & LLM',
  'LLMOps',
  'Case Studies',
  'Study Plans',
  'Flashcards',
  'Resources'
];

// Category descriptions for enhanced UI
export const categoryDescriptions: { [key in Category]?: string } = {
  'Fundamentals': 'Core system design concepts and principles',
  'Networking & Infrastructure': 'Network protocols, load balancing, and infrastructure components',
  'Databases & Data Management': 'Database systems, replication, and data storage strategies',
  'Architecture & Communication': 'Architectural patterns, microservices, and communication protocols',
  'Components': 'Reusable system components like caches, proxies, and data structures',
  'Patterns': 'Design patterns and architectural approaches for building robust systems',
  'Best Practices': 'Industry best practices for security, API design, and system reliability',
  'GenAI & LLM': 'Large Language Models, transformers, prompt engineering, and AI agent systems',
  'LLMOps': 'Production deployment, monitoring, and operational practices for LLM systems',
  'Interview Process': 'Strategies and methodologies for succeeding in system design interviews',
  'Case Studies': 'Real-world system design examples and implementations',
  'Study Plans': 'Structured learning journeys to master system design at your own pace',
  'Resources': 'Additional learning materials and external references',
  'Flashcards': 'Interactive flashcards for quick review and memorization'
};

// Category icons mapping for enhanced UI
export const categoryIcons: { [key in Category]?: string } = {
  'Fundamentals': 'foundation',
  'Networking & Infrastructure': 'network',
  'Databases & Data Management': 'database',
  'Architecture & Communication': 'layers',
  'Components': 'puzzle',
  'Patterns': 'grid',
  'Best Practices': 'shield',
  'GenAI & LLM': 'brain',
  'LLMOps': 'settings',
  'Interview Process': 'users',
  'Study Plans': 'map'
};
