import { fundamentalsTopics } from './categories/fundamentals';
import { networkingTopics } from './categories/networking';
import { databaseTopics } from './categories/databases';
import { architectureTopics } from './categories/architecture';
import { componentsTopics } from './categories/components';
import { patternsTopics } from './categories/patterns';
import { bestPracticesTopics } from './categories/bestPractices';
import { genaiTopics } from './categories/genai';
import { llmopsTopics } from './categories/llmops';
import { Topic } from '../types';

// Import topics from category-specific files
export const topics: Topic[] = [
  ...fundamentalsTopics,
  ...networkingTopics,
  ...databaseTopics,
  ...architectureTopics,
  ...componentsTopics,
  ...patternsTopics,
  ...bestPracticesTopics,
  ...genaiTopics,
  ...llmopsTopics,
];
