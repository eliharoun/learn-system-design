import { Code, Database, Layers, Monitor, Users } from 'lucide-react';

export interface Resource {
  title: string;
  url: string;
  description: string;
  stars?: string;
}

export interface ResourceCategory {
  id: string;
  title: string;
  icon: any;
  color: string;
  description: string;
  resources: Resource[];
}

export const resourceCategories: ResourceCategory[] = [
  {
    id: 'coding',
    title: 'Coding Interview',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    description: 'Master coding interviews with algorithms and data structures',
    resources: [
      {
        title: 'Coding Interview University',
        url: 'https://github.com/jwasham/coding-interview-university',
        description: 'Complete computer science study plan to become a software engineer',
        stars: '327k stars'
      },
      {
        title: 'Grind 75 Practice Questions',
        url: 'https://www.techinterviewhandbook.org/grind75',
        description: 'Curated list of 75 coding questions for interview preparation'
      },
      {
        title: 'Awesome Leetcode Resources',
        url: 'https://github.com/ashishps1/awesome-leetcode-resources',
        description: 'Comprehensive collection of LeetCode resources and solutions'
      },
      {
        title: 'Neetcode App and Youtube',
        url: 'https://neetcode.io/',
        description: 'Video explanations and practice problems for coding interviews'
      },
      {
        title: 'The Tech Interview Handbook',
        url: 'https://www.techinterviewhandbook.org/',
        description: 'Comprehensive guide to technical interviews'
      }
    ]
  },
  {
    id: 'system-design',
    title: 'System Design Interview',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    description: 'Learn to design scalable distributed systems',
    resources: [
      {
        title: 'Awesome System Design Resources',
        url: 'https://github.com/ashishps1/awesome-system-design-resources',
        description: 'Curated list of system design resources by Ashish Pratap Singh'
      },
      {
        title: 'System Design 101',
        url: 'https://github.com/ByteByteGoHq/system-design-101',
        description: 'Explain complex systems using visuals and simple terms',
        stars: '76k stars'
      },
      {
        title: 'System Design Basics Playlist',
        url: 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX',
        description: 'YouTube playlist covering system design fundamentals'
      },
      {
        title: 'System Design Github Repo',
        url: 'https://github.com/karanpratapsingh/system-design',
        description: 'Comprehensive system design guide by Neo Kim'
      },
      {
        title: 'The System Design Roadmap',
        url: 'https://roadmap.sh/system-design',
        description: 'Step by step guide to learn system design by roadmap.sh'
      }
    ]
  },
  {
    id: 'object-oriented',
    title: 'Object Oriented Design',
    icon: Layers,
    color: 'from-purple-500 to-pink-500',
    description: 'Master design patterns and low-level system design',
    resources: [
      {
        title: 'Awesome Design Patterns',
        url: 'https://github.com/DovAmir/awesome-design-patterns',
        description: 'Curated list of software and architecture design patterns',
        stars: '44k stars'
      },
      {
        title: 'Design Patterns with Visuals',
        url: 'https://refactoring.guru/design-patterns',
        description: 'Visual explanations of design patterns with examples'
      },
      {
        title: 'Awesome Low-Level Design',
        url: 'https://github.com/prasadgujar/low-level-design-primer',
        description: 'Collection of low-level design interview questions'
      },
      {
        title: 'Design Patterns Youtube Playlist',
        url: 'https://www.youtube.com/playlist?list=PLrhzvIcii6GNjpARdnO4ueTUAVR9eMBpc',
        description: 'Video explanations of common design patterns'
      },
      {
        title: 'System Design Primer',
        url: 'https://github.com/donnemartin/system-design-primer',
        description: 'Learn how to design large-scale systems',
        stars: '259k stars'
      }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Interview',
    icon: Monitor,
    color: 'from-orange-500 to-red-500',
    description: 'Frontend development and JavaScript interview preparation',
    resources: [
      {
        title: 'The Front-End Interview Handbook',
        url: 'https://www.frontendinterviewhandbook.com/',
        description: 'Comprehensive guide to frontend interviews by Yangshun Tay'
      },
      {
        title: 'Javascript Visualized Series',
        url: 'https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif',
        description: 'Visual explanations of JavaScript concepts'
      },
      {
        title: 'BigFrontend Practice Questions',
        url: 'https://bigfrontend.dev/',
        description: 'Practice frontend questions organized by companies'
      },
      {
        title: 'Front-End Developer Interview Questions',
        url: 'https://github.com/h5bp/Front-end-Developer-Interview-Questions',
        description: 'Comprehensive list of frontend interview questions',
        stars: '61k stars'
      },
      {
        title: 'Great Frontend Practice Platform',
        url: 'https://www.greatfrontend.com/',
        description: 'Platform to plan and practice frontend interviews'
      }
    ]
  },
  {
    id: 'behavioral',
    title: 'Behavioral Interview',
    icon: Users,
    color: 'from-teal-500 to-green-500',
    description: 'Behavioral interview techniques and STAR methodology',
    resources: [
      {
        title: 'Awesome Behavioral Interviews',
        url: 'https://github.com/ashishps1/awesome-behavioral-interviews',
        description: 'Comprehensive guide to behavioral interview preparation'
      },
      {
        title: 'Behavioral Interview Youtube Playlist',
        url: 'https://www.youtube.com/playlist?list=PLLucmoeZjtMQK8T111wCvqnfOd0qGFqzZ',
        description: 'Video guide to behavioral interview techniques'
      },
      {
        title: 'The STAR Methodology',
        url: 'https://www.indeed.com/career-advice/interviewing/how-to-use-the-star-interview-response-technique',
        description: 'Learn the STAR method for answering behavioral questions'
      },
      {
        title: 'Behavioral Questions with Example Answers',
        url: 'https://www.themuse.com/advice/30-behavioral-interview-questions-you-should-be-ready-to-answer',
        description: 'Common behavioral questions with detailed example answers'
      },
      {
        title: 'Interview Questions by Company',
        url: 'https://github.com/DopplerHQ/awesome-interview-questions',
        description: 'Interview questions organized by company and role'
      }
    ]
  }
];
