import { Target, Code, BarChart3, Database, Layers, Settings, AlertTriangle } from 'lucide-react';
import { InterviewStep } from '../types';

export const interviewSteps: InterviewStep[] = [
  {
    step: 1,
    title: 'Requirements Clarification',
    icon: Target,
    color: 'from-blue-500 to-cyan-500',
    description: 'Define the exact scope and goals of the system',
    details: [
      'Ask clarifying questions about functional requirements',
      'Identify non-functional requirements (scale, performance)',
      'Define what is in scope vs out of scope',
      'Understand the user base and usage patterns'
    ],
    example: 'For Twitter: Will users post tweets? Follow others? Timeline generation? Photo/video support? Search functionality? Push notifications?'
  },
  {
    step: 2,
    title: 'System Interface Definition',
    icon: Code,
    color: 'from-purple-500 to-pink-500',
    description: 'Define the APIs that the system will expose',
    details: [
      'Define REST/GraphQL APIs',
      'Specify request/response formats',
      'Include authentication and rate limiting',
      'Consider API versioning strategy'
    ],
    example: 'postTweet(user_id, tweet_data, location, timestamp), generateTimeline(user_id, current_time), markFavorite(user_id, tweet_id)'
  },
  {
    step: 3,
    title: 'Back-of-Envelope Estimation',
    icon: BarChart3,
    color: 'from-green-500 to-emerald-500',
    description: 'Estimate scale, storage, and bandwidth requirements',
    details: [
      'Calculate read/write ratios',
      'Estimate storage requirements',
      'Calculate bandwidth needs',
      'Determine memory requirements for caching'
    ],
    example: 'URL Shortener: 500M new URLs/month, 100:1 read/write ratio = 50B redirections/month, ~200 URLs/s write, 20K/s read'
  },
  {
    step: 4,
    title: 'Data Model Design',
    icon: Database,
    color: 'from-orange-500 to-red-500',
    description: 'Define data entities and their relationships',
    details: [
      'Identify main entities and their attributes',
      'Define relationships between entities',
      'Choose appropriate database type (SQL vs NoSQL)',
      'Consider data access patterns'
    ],
    example: 'User(UserID, Name, Email), Tweet(TweetID, Content, UserID, Timestamp), UserFollow(UserID1, UserID2)'
  },
  {
    step: 5,
    title: 'High-Level Design',
    icon: Layers,
    color: 'from-cyan-500 to-blue-500',
    description: 'Create a block diagram of core system components',
    details: [
      'Draw 5-6 main components',
      'Show data flow between components',
      'Include load balancers and caches',
      'Separate read and write paths if needed'
    ],
    example: 'Client → Load Balancer → Web Servers → Application Servers → Database + Cache + File Storage'
  },
  {
    step: 6,
    title: 'Detailed Design',
    icon: Settings,
    color: 'from-violet-500 to-purple-500',
    description: 'Deep dive into 2-3 critical components',
    details: [
      'Discuss data partitioning strategies',
      'Handle hot users/data scenarios',
      'Design caching layers',
      'Address consistency and replication'
    ],
    example: 'How to partition Twitter data? Handle celebrity users? Cache timeline generation? Ensure tweet ordering?'
  },
  {
    step: 7,
    title: 'Identify Bottlenecks',
    icon: AlertTriangle,
    color: 'from-red-500 to-orange-500',
    description: 'Find and resolve system bottlenecks and failure points',
    details: [
      'Identify single points of failure',
      'Plan for data replication and backup',
      'Design monitoring and alerting',
      'Consider disaster recovery'
    ],
    example: 'What if load balancer fails? Database goes down? How to monitor performance? Handle traffic spikes?'
  }
];
