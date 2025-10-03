import { Code, Layers, Users, Network, Zap, Globe, Search, Building, Bus } from 'lucide-react';
import { Topic } from '../../types';

export const architectureTopics: Topic[] = [
  {
    id: 'monoliths-microservices',
    title: 'Monoliths vs Microservices',
    category: 'Architecture & Communication',
    icon: Code,
    color: 'from-indigo-500 to-blue-500',
    description: 'Architectural patterns for structuring applications',
    content: {
      overview: 'Monoliths are single deployable units while microservices are independently deployable services that communicate via APIs.',
      keyPoints: [
        'Monolith: Single codebase, shared database, unified deployment',
        'Microservices: Multiple services, service-specific databases, independent deployment',
        'Monolith benefits: Simple development, testing, deployment initially',
        'Microservices benefits: Independent scaling, technology diversity, fault isolation',
        'Conway\'s Law: System design mirrors organizational structure',
        'Two-pizza team rule: Teams should be small enough to feed with two pizzas',
        'Service boundaries: Domain-driven design principles',
        'API contracts: Well-defined interfaces between services'
      ],
      example: 'Netflix: 500+ microservices for different functions (user management, recommendations, streaming). Traditional e-commerce: Single monolith handling all operations.',
      detailedExplanation: 'The choice between monoliths and microservices depends on team size, system complexity, and organizational maturity. Monoliths are simpler to start with but can become difficult to maintain as they grow. Microservices offer better scalability and team autonomy but introduce distributed system complexity.',
      diagrams: ['monolith', 'microservices', 'architecture-range'],
      realWorldExamples: [
        'Netflix: Evolved from monolith to 500+ microservices',
        'Amazon: Two-pizza teams owning individual services',
        'Uber: Microservices for riders, drivers, payments, routing',
        'Shopify: Modular monolith approach with service extraction',
        'Twitter: Migrated from Ruby monolith to JVM microservices'
      ],
      commonMistakes: [
        'Starting with microservices for small teams/simple applications',
        'Creating too many small services (nano-services)',
        'Not defining clear service boundaries',
        'Ignoring data consistency challenges in microservices',
        'Underestimating operational complexity of distributed systems'
      ],
      interviewTips: [
        'Discuss when to choose monoliths vs microservices',
        'Explain service decomposition strategies',
        'Consider team structure and Conway\'s Law',
        'Mention distributed system challenges',
        'Discuss migration strategies from monolith to microservices'
      ],
      relatedTopics: ['service-discovery', 'api-gateway', 'distributed-transactions', 'event-driven-architecture'],
      tradeoffs: {
        considerations: [
          'Development complexity vs operational complexity',
          'Team autonomy vs system coordination',
          'Technology diversity vs standardization',
          'Independent scaling vs resource efficiency'
        ],
        prosAndCons: {
          pros: [
            'Monolith: Simple development, easy testing, straightforward deployment',
            'Microservices: Independent scaling, technology diversity, fault isolation, team autonomy'
          ],
          cons: [
            'Monolith: Difficult to scale specific components, technology lock-in, large team coordination',
            'Microservices: Distributed system complexity, network latency, data consistency challenges'
          ]
        }
      },
      implementation: {
        technologies: ['Spring Boot', 'Docker', 'Kubernetes', 'Service Mesh', 'API Gateway'],
        algorithms: ['Service decomposition', 'Circuit breaker', 'Bulkhead pattern'],
        protocols: ['HTTP/REST', 'gRPC', 'Message queues', 'Event streaming']
      },
      benchmarks: [
        { metric: 'Service Count', value: '5-50 services', context: 'Typical microservices architecture' },
        { metric: 'Team Size', value: '2-8 people', context: 'Two-pizza team rule' },
        { metric: 'Deployment Frequency', value: 'Multiple per day', context: 'Independent service deployments' }
      ]
    }
  },
  {
    id: 'api-gateway',
    title: 'API Gateway',
    category: 'Architecture & Communication',
    icon: Globe,
    color: 'from-blue-500 to-teal-500',
    description: 'Single entry point for managing and routing API requests',
    content: {
      overview: 'API Gateway acts as a single entry point for all client requests, providing routing, authentication, rate limiting, and other cross-cutting concerns.',
      keyPoints: [
        'Single entry point: Unified interface for multiple backend services',
        'Request routing: Direct requests to appropriate backend services',
        'Authentication & authorization: Centralized security enforcement',
        'Rate limiting: Protect backend services from overload',
        'Request/response transformation: Modify data format as needed',
        'Caching: Store frequently requested data for faster responses',
        'Monitoring & analytics: Track API usage and performance',
        'Load balancing: Distribute requests across service instances'
      ],
      example: 'Mobile app makes single API call to gateway, which routes to user service, product service, and payment service, then aggregates responses.',
      detailedExplanation: 'API Gateway serves as a reverse proxy that sits between clients and backend services. It handles cross-cutting concerns like authentication, rate limiting, and monitoring, while routing requests to appropriate services. This pattern is essential in microservices architectures to avoid client complexity.',
      diagrams: ['api-gateway', 'backend-for-frontend'],
      realWorldExamples: [
        'Netflix: Zuul gateway for routing to hundreds of microservices',
        'Amazon: API Gateway for AWS services and Lambda functions',
        'Uber: Gateway for mobile app API requests',
        'Twitter: API gateway for rate limiting and authentication',
        'Spotify: Gateway for music streaming and user management APIs'
      ],
      commonMistakes: [
        'Creating a monolithic gateway that becomes a bottleneck',
        'Not implementing proper circuit breakers for backend failures',
        'Ignoring gateway high availability and redundancy',
        'Over-complicating request/response transformations',
        'Not monitoring gateway performance and error rates'
      ],
      interviewTips: [
        'Explain the benefits of centralized API management',
        'Discuss potential bottleneck and single point of failure issues',
        'Consider gateway patterns like Backend for Frontend (BFF)',
        'Mention specific gateway technologies and their features',
        'Discuss security and rate limiting strategies'
      ],
      relatedTopics: ['microservices', 'load-balancing', 'authentication', 'rate-limiting'],
      tradeoffs: {
        considerations: [
          'Centralized management vs potential bottleneck',
          'Single point of failure vs simplified client logic',
          'Gateway complexity vs backend service simplicity',
          'Performance overhead vs cross-cutting concerns'
        ],
        prosAndCons: {
          pros: [
            'Simplified client logic and reduced coupling',
            'Centralized cross-cutting concerns (auth, rate limiting)',
            'Protocol translation and request aggregation',
            'Better monitoring and analytics capabilities'
          ],
          cons: [
            'Potential single point of failure and bottleneck',
            'Additional network hop adds latency',
            'Gateway complexity can become difficult to manage',
            'Risk of creating a distributed monolith'
          ]
        }
      },
      implementation: {
        technologies: ['Kong', 'Zuul', 'Ambassador', 'AWS API Gateway', 'Istio', 'Envoy'],
        algorithms: ['Request routing', 'Load balancing', 'Circuit breaker', 'Rate limiting'],
        protocols: ['HTTP/HTTPS', 'WebSocket', 'gRPC', 'GraphQL']
      },
      benchmarks: [
        { metric: 'Request Latency', value: '<10ms overhead', context: 'Gateway processing time' },
        { metric: 'Throughput', value: '10K+ RPS', context: 'High-performance gateways' },
        { metric: 'Availability', value: '99.99%', context: 'With proper redundancy' }
      ]
    }
  },
  {
    id: 'service-discovery',
    title: 'Service Discovery',
    category: 'Architecture & Communication',
    icon: Search,
    color: 'from-green-500 to-teal-500',
    description: 'Locating services in distributed systems',
    content: {
      overview: 'Service discovery enables services to find and communicate with each other in dynamic distributed environments.',
      keyPoints: [
        'Client-side discovery: Client queries service registry directly',
        'Server-side discovery: Load balancer queries service registry',
        'Service registry: Central database of available services',
        'Health checking: Monitor service availability and remove unhealthy instances',
        'Load balancing: Distribute requests among discovered services',
        'Service mesh: Infrastructure layer for service communication',
        'DNS-based discovery: Use DNS for service location',
        'Configuration management: Dynamic service configuration'
      ],
      example: 'Microservices: User service discovers payment service location from Consul registry, establishes connection for payment processing.',
      detailedExplanation: 'Service discovery solves the problem of how services find each other in dynamic environments where service instances can start, stop, or move. It typically involves a service registry that maintains a database of available services and their locations, along with health checking to ensure only healthy services are discoverable.',
      diagrams: ['client-side-service-discovery', 'server-side-service-discovery'],
      realWorldExamples: [
        'Netflix: Eureka for service registry and discovery',
        'Consul: HashiCorp service mesh with discovery and health checking',
        'Kubernetes: Built-in service discovery with DNS and service objects',
        'AWS: ELB and Route53 for service discovery and load balancing',
        'Istio: Service mesh with advanced service discovery features'
      ],
      commonMistakes: [
        'Not implementing health checks for service instances',
        'Single point of failure in service registry',
        'Not handling service registry failures gracefully',
        'Caching service locations without proper TTL',
        'Not considering network partitions in service discovery'
      ],
      interviewTips: [
        'Explain client-side vs server-side discovery patterns',
        'Discuss service registry design and availability',
        'Consider health checking and failure detection',
        'Mention service mesh and its benefits',
        'Compare DNS-based vs dedicated service discovery'
      ],
      relatedTopics: ['microservices', 'load-balancing', 'dns', 'service-mesh'],
      tradeoffs: {
        considerations: [
          'Client-side vs server-side discovery complexity',
          'Service registry availability vs system resilience',
          'Discovery latency vs accuracy',
          'Configuration complexity vs automation'
        ],
        prosAndCons: {
          pros: [
            'Dynamic service location in changing environments',
            'Automatic load balancing and failover',
            'Health checking and automatic service removal',
            'Enables microservices architecture scalability'
          ],
          cons: [
            'Additional infrastructure complexity',
            'Service registry becomes critical dependency',
            'Network overhead for service discovery calls',
            'Potential for service discovery failures'
          ]
        }
      },
      implementation: {
        technologies: ['Consul', 'Eureka', 'Zookeeper', 'etcd', 'Kubernetes DNS'],
        algorithms: ['Consistent hashing', 'Health checking', 'Gossip protocol', 'Leader election'],
        protocols: ['HTTP/REST', 'DNS', 'gRPC', 'Gossip protocol']
      },
      benchmarks: [
        { metric: 'Discovery Latency', value: '<50ms', context: 'Time to discover service location' },
        { metric: 'Health Check Interval', value: '10-30 seconds', context: 'Service health monitoring frequency' },
        { metric: 'Registry Availability', value: '99.99%', context: 'Service registry uptime requirement' }
      ]
    }
  },
  {
    id: 'n-tier-architecture',
    title: 'N-tier Architecture',
    category: 'Architecture & Communication',
    icon: Building,
    color: 'from-purple-500 to-indigo-500',
    description: 'Layered architecture pattern for application design',
    content: {
      overview: 'N-tier architecture divides an application into logical layers and physical tiers. Layers are a way to separate responsibilities and manage dependencies.',
      keyPoints: [
        'Layers: Logical separation of responsibilities and dependencies',
        'Tiers: Physical separation, running on separate machines',
        'Presentation layer: Handles user interactions with the application',
        'Business Logic layer: Validates data as per business logic',
        'Data Access layer: Performs necessary operations on the database',
        'Closed layer: Layer can only call the next layer immediately down',
        'Open layer: Layer can call any of the layers below it',
        'Physical separation improves scalability and resiliency'
      ],
      example: '3-tier web application: Web browser (presentation) → Application server (business logic) → Database server (data access).',
      detailedExplanation: 'N-tier architecture provides a systematic way to organize application components into layers with specific responsibilities. Each layer serves the layer above it and is served by the layer below it. Physical separation into tiers allows for independent scaling and improved fault tolerance, though it adds network communication overhead.',
      diagrams: ['n-tier-architecture'],
      realWorldExamples: [
        'Traditional web applications: Browser → Web server → Application server → Database',
        'Enterprise applications: Client → Business logic → Data access → Database',
        'E-commerce platforms: Frontend → API layer → Business services → Data layer',
        'Banking systems: ATM/Web → Transaction processing → Core banking → Database',
        'Content management: CMS interface → Content engine → Storage layer'
      ],
      commonMistakes: [
        'Creating too many layers leading to unnecessary complexity',
        'Not properly defining layer boundaries and responsibilities',
        'Allowing layers to bypass intermediate layers (breaking architecture)',
        'Not considering network latency between physical tiers',
        'Mixing presentation logic with business logic'
      ],
      interviewTips: [
        'Explain the difference between logical layers and physical tiers',
        'Discuss the benefits of separation of concerns',
        'Consider scalability implications of tier separation',
        'Mention specific examples of layer responsibilities',
        'Compare with other architectural patterns (microservices, monolith)'
      ],
      relatedTopics: ['monoliths-microservices', 'api-gateway', 'load-balancing', 'separation-of-concerns'],
      tradeoffs: {
        considerations: [
          'Closed vs open layer architecture complexity',
          'Physical tier separation vs network latency',
          'Layer granularity vs system complexity',
          'Scalability benefits vs operational overhead'
        ],
        prosAndCons: {
          pros: [
            'Clear separation of concerns and responsibilities',
            'Independent scaling of different tiers',
            'Better security through layer isolation',
            'Easier maintenance and testing of individual layers'
          ],
          cons: [
            'Increased network latency with more tiers',
            'Higher infrastructure and operational costs',
            'More complex deployment and configuration',
            'Potential performance bottlenecks between layers'
          ]
        }
      },
      implementation: {
        technologies: ['Spring Framework', '.NET Framework', 'Java EE', 'Node.js', 'Django'],
        algorithms: ['Layer communication patterns', 'Data transfer objects', 'Service locator'],
        protocols: ['HTTP/HTTPS', 'RPC', 'Message queues', 'Database protocols']
      },
      benchmarks: [
        { metric: 'Layer Communication', value: '<50ms', context: 'Inter-layer communication time' },
        { metric: 'Tier Scalability', value: '10x capacity', context: 'Independent tier scaling capability' },
        { metric: 'Deployment Time', value: '<30 minutes', context: 'Multi-tier application deployment' }
      ]
    }
  },
  {
    id: 'enterprise-service-bus',
    title: 'Enterprise Service Bus (ESB)',
    category: 'Architecture & Communication',
    icon: Bus,
    color: 'from-yellow-500 to-orange-500',
    description: 'Centralized integration pattern for enterprise applications',
    content: {
      overview: 'An Enterprise Service Bus (ESB) is an architectural pattern whereby a centralized software component performs integrations between applications. It performs transformations, handles connectivity, and manages message routing.',
      keyPoints: [
        'Centralized integration: Single component handles all service integrations',
        'Message transformation: Convert data models between different services',
        'Protocol conversion: Handle different communication protocols',
        'Message routing: Direct messages to appropriate destinations',
        'Service composition: Combine multiple requests into single interface',
        'Connectivity management: Handle various connection types and formats',
        'Reusable integrations: Make integrations available as service interfaces',
        'Legacy system integration: Connect older systems with modern applications'
      ],
      example: 'Enterprise ESB: CRM system → ESB → ERP system, with ESB handling data transformation, routing, and protocol conversion between systems.',
      detailedExplanation: 'ESBs were designed to standardize and simplify communication, messaging, and integration between services across the enterprise. However, they often became bottlenecks and single points of failure, leading to the rise of more distributed integration patterns like microservices and message brokers.',
      diagrams: ['enterprise-service-bus'],
      realWorldExamples: [
        'IBM App Connect: Enterprise integration platform with ESB capabilities',
        'MuleSoft Anypoint: ESB for connecting applications and data sources',
        'Apache Camel: Open-source integration framework with ESB patterns',
        'Microsoft BizTalk: Enterprise application integration with ESB',
        'Oracle Service Bus: Enterprise service bus for SOA implementations'
      ],
      commonMistakes: [
        'Creating a monolithic ESB that becomes a bottleneck',
        'Not considering ESB as potential single point of failure',
        'Over-complicating integrations through centralized ESB',
        'Not planning for ESB scalability and performance limits',
        'Using ESB for simple point-to-point integrations'
      ],
      interviewTips: [
        'Explain the difference between ESB and modern message brokers',
        'Discuss when ESB patterns are appropriate vs microservices',
        'Consider the evolution from ESB to distributed integration',
        'Mention specific ESB technologies and their use cases',
        'Compare centralized vs distributed integration approaches'
      ],
      relatedTopics: ['message-brokers', 'microservices', 'api-gateway', 'integration-patterns'],
      tradeoffs: {
        considerations: [
          'Centralized integration vs distributed complexity',
          'Single point of failure vs simplified management',
          'ESB bottleneck vs integration standardization',
          'Legacy system support vs modern architecture patterns'
        ],
        prosAndCons: {
          pros: [
            'Standardized integration patterns and reusable components',
            'Centralized management and monitoring of integrations',
            'Protocol and data transformation capabilities',
            'Good for legacy system integration and enterprise environments'
          ],
          cons: [
            'Single point of failure and potential bottleneck',
            'High configuration and maintenance complexity',
            'Difficult to scale and update without impacting integrations',
            'Can become a distributed monolith with tight coupling'
          ]
        }
      },
      implementation: {
        technologies: ['Apache Camel', 'MuleSoft', 'IBM App Connect', 'Microsoft BizTalk', 'Oracle Service Bus'],
        algorithms: ['Message routing', 'Data transformation', 'Protocol conversion', 'Service orchestration'],
        protocols: ['SOAP', 'REST', 'JMS', 'AMQP', 'HTTP/HTTPS']
      },
      benchmarks: [
        { metric: 'Message Throughput', value: '1K-10K msg/sec', context: 'Typical ESB message processing' },
        { metric: 'Transformation Latency', value: '10-100ms', context: 'Data transformation overhead' },
        { metric: 'Integration Count', value: '10-100 systems', context: 'Typical enterprise ESB connections' }
      ]
    }
  }
];
