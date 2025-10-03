import { Code, Users, Archive, GitBranch } from 'lucide-react';
import { Topic } from '../../types';

export const patternsTopics: Topic[] = [
  {
    id: 'microservices',
    title: 'Microservices',
    category: 'Patterns',
    icon: Code,
    color: 'from-indigo-500 to-blue-500',
    description: 'Breaking monoliths into independent services',
    content: {
      overview: 'Microservices are independently deployable services that communicate via well-defined APIs.',
      keyPoints: [
        'Single responsibility principle per service',
        'Independent deployment and scaling',
        'Technology diversity (polyglot)',
        'Resilience through isolation',
        'Service discovery (Consul, Etcd, Zookeeper)',
        'API Gateway for unified entry point',
        'Challenges: Distributed debugging, data consistency'
      ],
      example: 'Netflix: 500+ microservices. Amazon: Two-pizza team rule. Uber: Separate services for riders, drivers, payments, routing.',
      tradeoffs: {
        considerations: ['Operational complexity increases', 'Network latency between services', 'Data consistency challenges', 'Deployment coordination', 'Better scalability and team autonomy']
      }
    }
  },
  {
    id: 'message-queues',
    title: 'Message Queues',
    category: 'Patterns',
    icon: Users,
    color: 'from-teal-500 to-green-500',
    description: 'Asynchronous communication between services',
    content: {
      overview: 'Message queues enable asynchronous workflows and decouple services for better scalability and reliability.',
      keyPoints: [
        'Decouple producers and consumers',
        'Enable async processing',
        'Buffer during traffic spikes',
        'Retry failed operations',
        'RabbitMQ: Full-featured AMQP broker',
        'Kafka: High-throughput event streaming',
        'Amazon SQS: Managed, simple queue service',
        'Pattern: Producer to Queue to Consumer'
      ],
      example: 'Order processing: Order placed, Queue, Email sent, Inventory updated, Analytics logged (all async).',
      diagrams: ['message-queue'],
      tradeoffs: {
        considerations: ['Eventual consistency vs immediate', 'Message ordering guarantees', 'At-least-once vs exactly-once delivery', 'Queue size and back-pressure handling']
      }
    }
  },
  {
    id: 'event-sourcing',
    title: 'Event Sourcing',
    category: 'Patterns',
    icon: Archive,
    color: 'from-purple-500 to-pink-500',
    description: 'Storing data as a sequence of events rather than current state',
    content: {
      overview: 'Instead of storing just the current state of data, use an append-only store to record the full series of actions taken on that data. The store acts as the system of record and can be used to materialize domain objects.',
      keyPoints: [
        'Append-only event store: Record full series of actions on data',
        'Event stream: Sequence of events that represent state changes',
        'Event replay: Reconstruct current state by replaying events',
        'Temporal queries: Query system state at any point in time',
        'Audit trail: Complete history of all changes for compliance',
        'Event versioning: Handle schema evolution over time',
        'Snapshots: Periodic state snapshots for performance optimization',
        'Event sourcing vs Event-driven architecture: Different concepts'
      ],
      example: 'Banking system: Instead of storing account balance, store events (deposit $100, withdraw $50, deposit $200) and calculate balance by replaying events.',
      detailedExplanation: 'Event sourcing is seemingly constantly confused with Event-driven Architecture (EDA). Event-driven architecture is about using events to communicate between service boundaries. Event sourcing is about using events as state, storing events rather than current state. Event sourcing can be one of several patterns to implement an event-driven architecture.',
      diagrams: ['event-sourcing'],
      realWorldExamples: [
        'Banking systems: Transaction history for audit and compliance',
        'E-commerce: Order processing with complete audit trail',
        'Version control: Git stores commits (events) rather than file snapshots',
        'Accounting systems: Journal entries as events for financial reporting',
        'Gaming: Player actions stored as events for replay and analysis'
      ],
      commonMistakes: [
        'Confusing event sourcing with event-driven architecture',
        'Not implementing proper event versioning strategies',
        'Storing too much data in events leading to performance issues',
        'Not considering snapshot strategies for large event streams',
        'Ignoring eventual consistency implications'
      ],
      interviewTips: [
        'Clearly distinguish event sourcing from event-driven architecture',
        'Explain the benefits of having complete audit trails',
        'Discuss event replay and temporal query capabilities',
        'Consider snapshot strategies for performance optimization',
        'Mention challenges with event schema evolution'
      ],
      relatedTopics: ['cqrs', 'event-driven-architecture', 'databases', 'audit-logging'],
      tradeoffs: {
        considerations: [
          'Complete audit trail vs storage overhead',
          'Temporal queries vs query complexity',
          'Event replay vs snapshot performance',
          'Schema evolution vs backward compatibility'
        ],
        prosAndCons: {
          pros: [
            'Complete audit trail and compliance capabilities',
            'Temporal queries and point-in-time reconstruction',
            'Natural fit for event-driven architectures',
            'Excellent for debugging and system analysis'
          ],
          cons: [
            'Increased storage requirements for event history',
            'Query complexity for current state reconstruction',
            'Eventual consistency challenges',
            'Event schema evolution and versioning complexity'
          ]
        }
      },
      implementation: {
        technologies: ['EventStore', 'Apache Kafka', 'Amazon Kinesis', 'Azure Event Hubs', 'Apache Pulsar'],
        algorithms: ['Event replay', 'Snapshot creation', 'Event compaction', 'Schema evolution'],
        protocols: ['Event streaming protocols', 'HTTP/REST for queries', 'Message queues']
      },
      benchmarks: [
        { metric: 'Event Write Rate', value: '10K+ events/sec', context: 'High-throughput event store' },
        { metric: 'Replay Performance', value: '1M events/sec', context: 'Event stream replay speed' },
        { metric: 'Storage Growth', value: '10-100x', context: 'vs traditional state storage' }
      ]
    }
  },
  {
    id: 'cqrs',
    title: 'CQRS (Command Query Responsibility Segregation)',
    category: 'Patterns',
    icon: GitBranch,
    color: 'from-blue-500 to-purple-500',
    description: 'Separating read and write operations for optimal performance',
    content: {
      overview: 'Command Query Responsibility Segregation (CQRS) is an architectural pattern that divides a system\'s actions into commands and queries, using separate read and write data models.',
      keyPoints: [
        'Commands: Instructions to change system state, don\'t return values',
        'Queries: Requests for information, don\'t change system state',
        'Separate read and write models: Optimized for different purposes',
        'Command side: Optimized for writes, business logic, validation',
        'Query side: Optimized for reads, denormalized views, fast queries',
        'Event sourcing integration: Commands generate events, queries use projections',
        'Materialized views: Pre-computed read models for complex queries',
        'Eventual consistency: Read models updated asynchronously'
      ],
      example: 'E-commerce: Write model handles orders/inventory updates. Read model provides product catalogs, search results, and analytics dashboards.',
      detailedExplanation: 'CQRS separates the responsibility of handling commands (writes) from queries (reads). This allows each side to be optimized independently - the write side focuses on business logic and data consistency, while the read side focuses on query performance and user experience. Often used with event sourcing for complete audit trails.',
      diagrams: ['command-and-query-responsibility-segregation'],
      realWorldExamples: [
        'Netflix: Separate write services for content management, read services for recommendations',
        'Amazon: Order processing (write) separate from product catalog (read)',
        'Banking: Transaction processing (write) separate from account reporting (read)',
        'Social media: Post creation (write) separate from timeline generation (read)',
        'E-commerce: Inventory management (write) separate from product search (read)'
      ],
      commonMistakes: [
        'Applying CQRS to simple CRUD applications unnecessarily',
        'Not properly handling eventual consistency between read/write models',
        'Over-complicating the system without clear performance benefits',
        'Not implementing proper error handling for command failures',
        'Ignoring the operational complexity of maintaining separate models'
      ],
      interviewTips: [
        'Explain the clear separation between commands and queries',
        'Discuss when CQRS provides benefits vs added complexity',
        'Consider CQRS with event sourcing integration',
        'Mention eventual consistency implications',
        'Compare with traditional CRUD operations'
      ],
      relatedTopics: ['event-sourcing', 'microservices', 'databases', 'eventual-consistency'],
      tradeoffs: {
        considerations: [
          'Read/write optimization vs system complexity',
          'Eventual consistency vs immediate consistency',
          'Independent scaling vs operational overhead',
          'Query performance vs data synchronization complexity'
        ],
        prosAndCons: {
          pros: [
            'Independent scaling of read and write workloads',
            'Optimized data models for specific use cases',
            'Better performance for complex read scenarios',
            'Clear separation of business logic and query logic'
          ],
          cons: [
            'Increased system complexity and operational overhead',
            'Eventual consistency challenges between models',
            'More complex error handling and debugging',
            'Not suitable for simple CRUD applications'
          ]
        }
      },
      implementation: {
        technologies: ['Axon Framework', 'EventStore', 'Apache Kafka', 'Redis', 'Elasticsearch'],
        algorithms: ['Command handling', 'Event projection', 'Materialized view updates', 'Eventual consistency'],
        protocols: ['HTTP/REST for commands', 'Event streaming', 'Message queues']
      },
      benchmarks: [
        { metric: 'Command Processing', value: '<100ms', context: 'Typical command execution time' },
        { metric: 'Read Model Update', value: '<1 second', context: 'Eventual consistency delay' },
        { metric: 'Query Performance', value: '<10ms', context: 'Optimized read model queries' }
      ]
    }
  }
];
