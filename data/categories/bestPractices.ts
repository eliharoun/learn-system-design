import { Lock, Cloud, Shield, Code2, Key, UserCheck, AlertTriangle, Award, Zap, ShieldCheck } from 'lucide-react';
import { Topic } from '../../types';

export const bestPracticesTopics: Topic[] = [
  {
    id: 'security',
    title: 'Security Basics',
    category: 'Best Practices',
    icon: Lock,
    color: 'from-red-500 to-orange-500',
    description: 'Essential security considerations',
    content: {
      overview: 'Security must be considered at every layer of your system to protect data and users.',
      keyPoints: [
        'Encrypt in transit (HTTPS/TLS) and at rest',
        'Sanitize all user inputs (prevent XSS, SQL injection)',
        'Use parameterized queries',
        'Principle of least privilege',
        'Rate limiting to prevent abuse',
        'Authentication (who you are) and Authorization (what you can do)',
        'Regular security audits and penetration testing',
        'Keep dependencies updated'
      ],
      example: 'OAuth2 for authentication, JWT for stateless sessions, bcrypt for password hashing, CORS for API security.',
      tradeoffs: {
        considerations: ['Security vs convenience trade-offs', 'Performance impact of encryption', 'Complexity of security measures', 'Compliance requirements (GDPR, HIPAA)']
      }
    }
  },
  {
    id: 'api-design',
    title: 'REST, GraphQL, gRPC',
    category: 'Best Practices',
    icon: Code2,
    color: 'from-amber-500 to-yellow-500',
    description: 'API technologies for different use cases and requirements',
    content: {
      overview: 'REST, GraphQL, and gRPC are different API technologies. REST is resource-oriented, GraphQL allows flexible queries, and gRPC provides high-performance RPC communication.',
      keyPoints: [
        'REST: Resource-oriented, stateless, cacheable, uses HTTP verbs',
        'REST constraints: Uniform interface, client-server, stateless, cacheable',
        'GraphQL: Query language, schema-driven, client specifies exact data needs',
        'GraphQL: Single endpoint, strongly typed schema, real-time subscriptions',
        'gRPC: High-performance RPC framework, Protocol Buffers, bi-directional streaming',
        'gRPC: Language-neutral, built-in code generation, efficient binary protocol',
        'HTTP response codes: 1xx Informational, 2xx Success, 3xx Redirection, 4xx Client Error, 5xx Server Error',
        'API versioning: URL versioning, header versioning, query parameter versioning'
      ],
      example: 'REST: GET /users/123 returns user object. GraphQL: query { user(id: 123) { name email } } returns only requested fields. gRPC: service.GetUser(UserRequest) with binary protocol.',
      detailedExplanation: 'Each API technology serves different needs: REST is simple and widely adopted for web APIs, GraphQL eliminates over-fetching and provides flexible queries, gRPC offers high performance for microservice communication. The choice depends on use case, performance requirements, and team expertise.',
      diagrams: [],
      realWorldExamples: [
        'REST: Twitter API, GitHub API, most public web APIs',
        'GraphQL: Facebook, GitHub v4 API, Shopify, Netflix (internal)',
        'gRPC: Google internal services, Uber microservices, Netflix (internal)',
        'Hybrid: Netflix uses REST for public APIs, gRPC for internal services',
        'Evolution: Many companies started with REST, added GraphQL for mobile'
      ],
      commonMistakes: [
        'Using GraphQL for simple CRUD operations where REST suffices',
        'Not implementing proper caching strategies for GraphQL',
        'Using gRPC for public APIs without considering browser support',
        'Over-engineering API design without understanding requirements',
        'Not considering API versioning strategy from the beginning'
      ],
      interviewTips: [
        'Compare the three technologies based on use case requirements',
        'Discuss when to use each technology (public vs internal APIs)',
        'Consider performance, caching, and complexity trade-offs',
        'Mention specific examples of companies using each approach',
        'Compare coupling, chattiness, performance, and complexity'
      ],
      relatedTopics: ['microservices', 'api-gateway', 'caching', 'performance'],
      tradeoffs: {
        considerations: [
          'REST: Simple and cacheable vs verbose and multiple round trips',
          'GraphQL: Flexible queries vs complex backend and caching challenges',
          'gRPC: High performance vs limited browser support and complexity',
          'API complexity vs client simplicity'
        ],
        prosAndCons: {
          pros: [
            'REST: Simple, cacheable, widely supported, stateless',
            'GraphQL: Eliminates over-fetching, strongly typed, flexible queries',
            'gRPC: High performance, bi-directional streaming, code generation',
            'All: Well-defined contracts and documentation capabilities'
          ],
          cons: [
            'REST: Over-fetching, multiple round trips, versioning challenges',
            'GraphQL: Complex backend, caching difficulties, N+1 problem',
            'gRPC: Limited browser support, binary protocol complexity',
            'All: API design complexity and maintenance overhead'
          ]
        }
      },
      implementation: {
        technologies: ['REST: Express.js, Spring Boot, Django', 'GraphQL: Apollo, Relay, GraphQL Yoga', 'gRPC: Protocol Buffers, gRPC libraries'],
        algorithms: ['REST: HTTP methods, HATEOAS', 'GraphQL: Query resolution, Schema stitching', 'gRPC: Protocol Buffers serialization'],
        protocols: ['HTTP/HTTPS', 'GraphQL over HTTP', 'gRPC over HTTP/2', 'WebSocket for subscriptions']
      },
      benchmarks: [
        { metric: 'REST Performance', value: '1K-10K RPS', context: 'Typical REST API throughput' },
        { metric: 'GraphQL Overhead', value: '10-50ms', context: 'Query parsing and resolution time' },
        { metric: 'gRPC Performance', value: '10K-100K RPS', context: 'High-performance binary protocol' }
      ]
    }
  },
  {
    id: 'circuit-breaker',
    title: 'Circuit Breaker Pattern',
    category: 'Best Practices',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    description: 'Preventing cascading failures in distributed systems',
    content: {
      overview: 'Circuit breaker pattern prevents cascading failures by monitoring service calls and failing fast when a service is unavailable.',
      keyPoints: [
        'Three states: Closed (normal), Open (failing fast), Half-Open (testing recovery)',
        'Failure threshold: Number of failures before opening circuit',
        'Timeout period: How long to wait before testing recovery',
        'Success threshold: Successful calls needed to close circuit',
        'Fail fast: Immediate failure response instead of waiting',
        'Fallback mechanisms: Alternative responses when circuit is open',
        'Monitoring: Track circuit state and failure rates',
        'Bulkhead pattern: Isolate critical resources'
      ],
      example: 'Netflix Hystrix: If payment service fails 50% of requests in 10 seconds, open circuit for 60 seconds, return cached user data instead.',
      detailedExplanation: 'The circuit breaker pattern acts like an electrical circuit breaker - it monitors for failures and "trips" to prevent further damage. When a service is failing, the circuit breaker opens and fails fast instead of waiting for timeouts, preventing cascading failures and allowing the failing service time to recover.',
      diagrams: ['circuit-breaker'],
      realWorldExamples: [
        'Netflix: Hystrix library for circuit breaking across microservices',
        'Amazon: Circuit breakers in AWS Lambda and API Gateway',
        'Uber: Circuit breakers for ride matching and payment services',
        'Twitter: Circuit breakers for timeline generation services',
        'Microsoft: Circuit breaker pattern in Azure Service Fabric'
      ],
      commonMistakes: [
        'Not implementing proper fallback mechanisms',
        'Setting failure thresholds too high or too low',
        'Not monitoring circuit breaker state and metrics',
        'Ignoring the half-open state testing logic',
        'Not considering different failure types (timeout vs error)'
      ],
      interviewTips: [
        'Explain the three states and transitions between them',
        'Discuss failure detection and threshold configuration',
        'Consider fallback strategies and graceful degradation',
        'Mention monitoring and alerting for circuit breaker state',
        'Compare with other resilience patterns like bulkhead and timeout'
      ],
      relatedTopics: ['microservices', 'reliability-availability', 'monitoring', 'fault-tolerance'],
      tradeoffs: {
        considerations: [
          'Fail fast vs retry mechanisms',
          'Circuit sensitivity vs stability',
          'Fallback complexity vs user experience',
          'Monitoring overhead vs system insight'
        ],
        prosAndCons: {
          pros: [
            'Prevents cascading failures in distributed systems',
            'Improves system resilience and fault tolerance',
            'Provides fast failure response instead of timeouts',
            'Allows failing services time to recover'
          ],
          cons: [
            'Additional complexity in service communication',
            'Risk of false positives opening circuits unnecessarily',
            'Requires careful tuning of thresholds and timeouts',
            'Fallback mechanisms may provide degraded functionality'
          ]
        }
      },
      implementation: {
        technologies: ['Netflix Hystrix', 'Resilience4j', 'Polly (.NET)', 'Istio', 'Envoy Proxy'],
        algorithms: ['Failure rate calculation', 'Exponential backoff', 'Sliding window', 'State machine'],
        protocols: ['HTTP circuit breaking', 'gRPC circuit breaking', 'Message queue circuit breaking']
      },
      benchmarks: [
        { metric: 'Failure Threshold', value: '50-70%', context: 'Typical failure rate to open circuit' },
        { metric: 'Timeout Period', value: '30-60 seconds', context: 'Time before testing recovery' },
        { metric: 'Response Time', value: '<10ms', context: 'Fast failure response when circuit open' }
      ]
    }
  },
  {
    id: 'oauth-openid-connect',
    title: 'OAuth 2.0 and OpenID Connect',
    category: 'Best Practices',
    icon: Key,
    color: 'from-blue-500 to-indigo-500',
    description: 'Modern authentication and authorization protocols',
    content: {
      overview: 'OAuth 2.0 is an authorization protocol that provides consented access to resources without sharing credentials. OpenID Connect adds an authentication layer on top of OAuth 2.0.',
      keyPoints: [
        'OAuth 2.0: Authorization protocol, not authentication',
        'Resource Owner: User or system that owns protected resources',
        'Client: System that requires access to protected resources',
        'Authorization Server: Issues access tokens after authentication',
        'Resource Server: Protects resources and validates access tokens',
        'OpenID Connect: Authentication layer on top of OAuth 2.0',
        'JWT tokens: JSON Web Tokens for stateless authentication',
        'Scopes: Specify exact reason for resource access'
      ],
      example: 'Login with Google: User authorizes app → Google returns authorization code → App exchanges code for access token → App accesses user data with token.',
      detailedExplanation: 'OAuth 2.0 enables applications to obtain limited access to user accounts without exposing passwords. OpenID Connect extends OAuth 2.0 to provide identity information about the user, making it suitable for both authorization and authentication use cases.',
      diagrams: ['oauth2'],
      realWorldExamples: [
        'Google OAuth: Login with Google for third-party applications',
        'Facebook Login: Social authentication for web and mobile apps',
        'GitHub OAuth: Developer tool authentication and API access',
        'Microsoft Azure AD: Enterprise identity and access management',
        'Auth0: Identity-as-a-Service platform using OAuth 2.0 and OIDC'
      ],
      commonMistakes: [
        'Using OAuth 2.0 for authentication instead of authorization',
        'Not properly validating and securing access tokens',
        'Storing sensitive data in JWT tokens',
        'Not implementing proper token refresh mechanisms',
        'Ignoring security best practices for client credentials'
      ],
      interviewTips: [
        'Explain the difference between OAuth 2.0 and OpenID Connect',
        'Discuss the OAuth 2.0 flow and different grant types',
        'Consider JWT token structure and validation',
        'Mention security considerations and best practices',
        'Compare with other authentication methods'
      ],
      relatedTopics: ['authentication', 'jwt-tokens', 'single-sign-on', 'api-security'],
      tradeoffs: {
        considerations: [
          'OAuth complexity vs security benefits',
          'Token-based vs session-based authentication',
          'Centralized vs distributed authentication',
          'Security vs user experience'
        ],
        prosAndCons: {
          pros: [
            'No password sharing between applications',
            'Granular access control with scopes',
            'Standardized protocol with wide industry adoption',
            'Supports multiple client types and use cases'
          ],
          cons: [
            'Complex implementation and configuration',
            'Token management and refresh complexity',
            'Potential security vulnerabilities if not implemented correctly',
            'Dependency on authorization server availability'
          ]
        }
      },
      implementation: {
        technologies: ['Auth0', 'Okta', 'Google OAuth', 'Microsoft Azure AD', 'Amazon Cognito'],
        algorithms: ['JWT signing and validation', 'PKCE for mobile apps', 'Token refresh'],
        protocols: ['OAuth 2.0', 'OpenID Connect', 'JWT', 'HTTPS']
      },
      benchmarks: [
        { metric: 'Token Validation', value: '<10ms', context: 'JWT token validation time' },
        { metric: 'Authorization Flow', value: '<2 seconds', context: 'Complete OAuth flow time' },
        { metric: 'Token Lifetime', value: '1-24 hours', context: 'Typical access token expiration' }
      ]
    }
  },
  {
    id: 'single-sign-on',
    title: 'Single Sign-On (SSO)',
    category: 'Best Practices',
    icon: UserCheck,
    color: 'from-purple-500 to-blue-500',
    description: 'Unified authentication across multiple applications',
    content: {
      overview: 'Single Sign-On (SSO) is an authentication process that allows users to access multiple applications with one set of login credentials, eliminating the need to log into each application separately.',
      keyPoints: [
        'Identity Provider (IdP): Centralized system managing user identities',
        'Service Provider: Applications that rely on IdP for authentication',
        'Identity Broker: Intermediary connecting multiple service providers with IdPs',
        'SAML: Security Assertion Markup Language for sharing security information',
        'SSO working process: Request resource → Redirect to IdP → Authenticate → Return to application',
        'Federation: Enable SSO across different organizations and domains',
        'Session management: Maintain authentication state across applications',
        'Single logout: Terminate sessions across all connected applications'
      ],
      example: 'Corporate SSO: Employee logs into company portal once, automatically authenticated for email, CRM, HR system, and other internal applications.',
      detailedExplanation: 'SSO improves user experience by reducing password fatigue and improves security by centralizing authentication. It\'s commonly used in enterprise environments where employees need access to multiple applications.',
      diagrams: ['sso'],
      realWorldExamples: [
        'Google Workspace: SSO for Gmail, Drive, Calendar, and other Google services',
        'Microsoft 365: Single sign-on across Office applications and services',
        'Okta: Enterprise SSO platform for thousands of applications',
        'Auth0: Identity platform with SSO capabilities',
        'SAML-based SSO: Many enterprise applications support SAML SSO'
      ],
      commonMistakes: [
        'Not implementing proper session timeout and management',
        'Single point of failure if SSO provider goes down',
        'Not handling SSO provider failures gracefully',
        'Poor user experience during SSO authentication flow',
        'Not implementing single logout functionality'
      ],
      interviewTips: [
        'Explain the components of SSO architecture (IdP, SP, Broker)',
        'Discuss SAML vs OAuth/OIDC for SSO implementation',
        'Consider security implications and single point of failure',
        'Mention enterprise vs consumer SSO use cases',
        'Compare SSO benefits with potential security risks'
      ],
      relatedTopics: ['oauth-openid-connect', 'authentication', 'enterprise-security', 'saml'],
      tradeoffs: {
        considerations: [
          'User convenience vs security complexity',
          'Centralized authentication vs distributed risk',
          'SSO provider dependency vs authentication autonomy',
          'Enterprise integration vs implementation complexity'
        ],
        prosAndCons: {
          pros: [
            'Improved user experience with single login',
            'Centralized security policy enforcement',
            'Reduced password fatigue and support costs',
            'Better compliance and audit capabilities'
          ],
          cons: [
            'Single point of failure for authentication',
            'Vendor lock-in with SSO provider',
            'Complex implementation and integration',
            'Security risk if SSO credentials are compromised'
          ]
        }
      },
      implementation: {
        technologies: ['Okta', 'Auth0', 'Microsoft Azure AD', 'Google Identity', 'OneLogin'],
        algorithms: ['SAML assertion processing', 'JWT token validation', 'Session management'],
        protocols: ['SAML 2.0', 'OAuth 2.0', 'OpenID Connect', 'LDAP']
      },
      benchmarks: [
        { metric: 'SSO Login Time', value: '<3 seconds', context: 'Complete SSO authentication flow' },
        { metric: 'Session Duration', value: '8-24 hours', context: 'Typical SSO session lifetime' },
        { metric: 'Application Count', value: '10-1000+', context: 'Applications per SSO deployment' }
      ]
    }
  },
  {
    id: 'disaster-recovery',
    title: 'Disaster Recovery',
    category: 'Best Practices',
    icon: AlertTriangle,
    color: 'from-red-500 to-pink-500',
    description: 'Planning and implementing system recovery strategies',
    content: {
      overview: 'Disaster recovery (DR) is a process of regaining access and functionality of infrastructure after events like natural disasters, cyber attacks, or business disruptions.',
      keyPoints: [
        'RTO (Recovery Time Objective): Maximum acceptable delay between interruption and restoration',
        'RPO (Recovery Point Objective): Maximum acceptable data loss time since last recovery point',
        'Backup strategy: Regular data backups stored off-site or on removable drives',
        'Cold site: Basic infrastructure setup in secondary location',
        'Hot site: Up-to-date copies of data maintained at all times',
        'Disaster recovery plan: Documented procedures for various failure scenarios',
        'Testing: Regular DR drills to validate recovery procedures',
        'Business continuity: Minimize interruption and maintain operations'
      ],
      example: 'Banking system: RTO of 4 hours (must restore within 4 hours), RPO of 1 hour (maximum 1 hour of data loss acceptable).',
      detailedExplanation: 'Disaster recovery planning involves identifying potential risks, defining recovery objectives, implementing backup and recovery procedures, and regularly testing the disaster recovery plan. The goal is to minimize downtime and data loss during various disaster scenarios.',
      diagrams: ['disaster-recovery'],
      realWorldExamples: [
        'Netflix: Multi-region deployment with automatic failover',
        'Amazon: Multiple availability zones and cross-region replication',
        'Google: Global infrastructure with disaster recovery capabilities',
        'Banking systems: Strict DR requirements with hot sites and real-time replication',
        'Healthcare: HIPAA compliance requires comprehensive DR planning'
      ],
      commonMistakes: [
        'Not regularly testing disaster recovery procedures',
        'Setting unrealistic RTO and RPO objectives',
        'Not considering all types of disasters (natural, cyber, human error)',
        'Poor documentation of recovery procedures',
        'Not training staff on disaster recovery processes'
      ],
      interviewTips: [
        'Explain RTO and RPO concepts with specific examples',
        'Discuss different disaster recovery strategies and their costs',
        'Consider various disaster scenarios and appropriate responses',
        'Mention compliance requirements and business impact',
        'Compare disaster recovery vs high availability approaches'
      ],
      relatedTopics: ['high-availability', 'backup-strategies', 'business-continuity', 'compliance'],
      tradeoffs: {
        considerations: [
          'Recovery speed vs cost of DR infrastructure',
          'Data protection vs operational complexity',
          'Automated vs manual recovery procedures',
          'Local vs geographic disaster recovery scope'
        ],
        prosAndCons: {
          pros: [
            'Business continuity during disasters and outages',
            'Data protection and compliance with regulations',
            'Reduced financial impact of system downtime',
            'Improved customer trust and reputation'
          ],
          cons: [
            'High cost of DR infrastructure and maintenance',
            'Complexity of implementing and testing DR procedures',
            'Potential performance impact of replication and backups',
            'Risk of DR systems becoming outdated or untested'
          ]
        }
      },
      implementation: {
        technologies: ['AWS Disaster Recovery', 'Azure Site Recovery', 'VMware vSphere Replication', 'Veeam Backup'],
        algorithms: ['Data replication', 'Backup scheduling', 'Failover automation', 'Recovery orchestration'],
        protocols: ['Database replication protocols', 'File synchronization', 'Network failover']
      },
      benchmarks: [
        { metric: 'RTO Target', value: '1-24 hours', context: 'Depending on business criticality' },
        { metric: 'RPO Target', value: '15 minutes-4 hours', context: 'Acceptable data loss window' },
        { metric: 'DR Test Frequency', value: 'Quarterly-Annually', context: 'Regular DR procedure validation' }
      ]
    }
  },
  {
    id: 'rate-limiting',
    title: 'Rate Limiting',
    category: 'Best Practices',
    icon: Zap,
    color: 'from-yellow-500 to-red-500',
    description: 'Controlling request frequency to protect system resources',
    content: {
      overview: 'Rate limiting refers to preventing the frequency of an operation from exceeding a defined limit. It\'s commonly used to protect underlying services and resources from overuse.',
      keyPoints: [
        'Leaky Bucket: Fixed rate processing with queue, excess requests discarded',
        'Token Bucket: Tokens added at fixed rate, requests consume tokens',
        'Fixed Window: Counter resets at fixed intervals',
        'Sliding Log: Time-stamped log of requests, old entries discarded',
        'Sliding Window: Hybrid approach combining fixed window and sliding log',
        'Distributed rate limiting: Challenges with consistency and race conditions',
        'Backpressure: Limit queue size to maintain performance',
        'Rate limiting headers: Communicate limits to clients'
      ],
      example: 'API rate limiting: 1000 requests per hour per user. If exceeded, return HTTP 429 (Too Many Requests) with retry-after header.',
      detailedExplanation: 'Rate limiting is essential for protecting APIs from abuse, controlling operational costs, and ensuring fair resource usage. Different algorithms suit different use cases - token bucket for burst traffic, sliding window for smooth rate limiting.',
      diagrams: ['rate-limiting'],
      realWorldExamples: [
        'Twitter API: Rate limits per user and application for different endpoints',
        'GitHub API: Rate limiting with different limits for authenticated vs anonymous',
        'Stripe API: Rate limiting to prevent payment processing abuse',
        'Google APIs: Quota and rate limiting across all Google services',
        'AWS API Gateway: Built-in rate limiting and throttling capabilities'
      ],
      commonMistakes: [
        'Not implementing rate limiting until after abuse occurs',
        'Using inappropriate algorithm for traffic patterns',
        'Not providing clear error messages and retry guidance',
        'Implementing rate limiting without proper monitoring',
        'Not considering legitimate burst traffic patterns'
      ],
      interviewTips: [
        'Explain different rate limiting algorithms and their use cases',
        'Discuss distributed rate limiting challenges and solutions',
        'Consider rate limiting placement in system architecture',
        'Mention rate limiting headers and client communication',
        'Compare rate limiting with other traffic control mechanisms'
      ],
      relatedTopics: ['api-gateway', 'load-balancing', 'ddos-protection', 'system-abuse'],
      tradeoffs: {
        considerations: [
          'Algorithm choice: Simplicity vs accuracy for different traffic patterns',
          'Distributed consistency vs performance overhead',
          'Rate limit granularity vs implementation complexity',
          'User experience vs system protection'
        ],
        prosAndCons: {
          pros: [
            'Protects system resources from abuse and overload',
            'Ensures fair usage among different users and applications',
            'Helps control operational costs and resource consumption',
            'Improves system stability and reliability'
          ],
          cons: [
            'Can impact legitimate users during traffic spikes',
            'Implementation complexity for distributed systems',
            'Requires careful tuning and monitoring',
            'May need different limits for different user tiers'
          ]
        }
      },
      implementation: {
        technologies: ['Redis for counters', 'API Gateway rate limiting', 'Nginx rate limiting', 'Application-level limiters'],
        algorithms: ['Token bucket', 'Leaky bucket', 'Fixed window', 'Sliding window', 'Sliding log'],
        protocols: ['HTTP rate limiting headers', 'Distributed counter protocols']
      },
      benchmarks: [
        { metric: 'Rate Check Latency', value: '<1ms', context: 'Time to check rate limit' },
        { metric: 'Accuracy', value: '95-99%', context: 'Rate limiting accuracy in distributed systems' },
        { metric: 'Overhead', value: '<5%', context: 'Performance overhead of rate limiting' }
      ]
    }
  },
  {
    id: 'sla-slo-sli',
    title: 'SLA, SLO, SLI',
    category: 'Best Practices',
    icon: Award,
    color: 'from-green-500 to-blue-500',
    description: 'Service level definitions for reliability and performance',
    content: {
      overview: 'SLA, SLO, and SLI are important concepts for defining, tracking, and monitoring service reliability and performance promises made to users.',
      keyPoints: [
        'SLA (Service Level Agreement): Contract between company and users',
        'SLO (Service Level Objective): Specific promises within the SLA',
        'SLI (Service Level Indicator): Measured values to determine SLO compliance',
        'SLA: Written by business/legal team, defines user expectations',
        'SLO: Technical targets that must be met to comply with SLA',
        'SLI: Metrics like response time, availability, error rate',
        'Error budget: Amount of unreliability allowed within SLO',
        'Monitoring: Continuous measurement of SLIs against SLOs'
      ],
      example: 'SLA: 99.9% uptime guarantee. SLO: API response time <200ms for 95% of requests. SLI: Actual measured response times and availability.',
      detailedExplanation: 'SLAs, SLOs, and SLIs work together to define and measure service reliability. SLAs set user expectations, SLOs define technical targets, and SLIs provide the measurements to verify compliance. This framework helps teams balance reliability with development velocity.',
      diagrams: [],
      realWorldExamples: [
        'Google Cloud: 99.95% monthly uptime SLA for Compute Engine',
        'AWS: Various SLAs for different services (99.99% for S3)',
        'Netflix: Internal SLOs for streaming quality and availability',
        'Uber: SLOs for ride matching time and driver arrival estimates',
        'Stripe: Payment processing SLAs with uptime and response time guarantees'
      ],
      commonMistakes: [
        'Setting unrealistic SLOs that are impossible to achieve',
        'Not aligning SLOs with actual user experience and business needs',
        'Measuring SLIs that don\'t reflect user-facing service quality',
        'Not using error budgets to balance reliability and feature development',
        'Creating SLAs without proper SLO and SLI foundation'
      ],
      interviewTips: [
        'Explain the relationship and differences between SLA, SLO, and SLI',
        'Discuss how to choose appropriate SLIs for different services',
        'Consider error budgets and their role in development processes',
        'Mention specific examples of SLAs from major cloud providers',
        'Compare internal SLOs with external SLAs'
      ],
      relatedTopics: ['monitoring', 'reliability', 'performance', 'site-reliability-engineering'],
      tradeoffs: {
        considerations: [
          'Ambitious SLOs vs achievable targets',
          'User-facing vs internal service metrics',
          'Error budget consumption vs feature development velocity',
          'Monitoring overhead vs service reliability insight'
        ],
        prosAndCons: {
          pros: [
            'Clear expectations and accountability for service reliability',
            'Data-driven approach to reliability and performance',
            'Balance between reliability and feature development',
            'Improved user trust through transparent service commitments'
          ],
          cons: [
            'Additional complexity in monitoring and measurement',
            'Potential conflict between reliability and development speed',
            'Risk of gaming metrics instead of improving user experience',
            'Overhead of maintaining comprehensive monitoring systems'
          ]
        }
      },
      implementation: {
        technologies: ['Prometheus', 'Grafana', 'Datadog', 'New Relic', 'Google Cloud Monitoring'],
        algorithms: ['Statistical analysis', 'Percentile calculations', 'Error budget tracking'],
        protocols: ['Metrics collection protocols', 'Alerting protocols', 'Dashboard APIs']
      },
      benchmarks: [
        { metric: 'Availability SLO', value: '99.9-99.99%', context: 'Typical service availability targets' },
        { metric: 'Response Time SLO', value: '<200ms p95', context: 'API response time objectives' },
        { metric: 'Error Rate SLO', value: '<0.1%', context: 'Acceptable error rate for most services' }
      ]
    }
  },
  {
    id: 'ssl-tls-mtls',
    title: 'SSL, TLS, mTLS',
    category: 'Best Practices',
    icon: ShieldCheck,
    color: 'from-green-500 to-teal-500',
    description: 'Security protocols for encrypted communication',
    content: {
      overview: 'SSL, TLS, and mTLS are security protocols designed to facilitate privacy and data security for communications over the internet. TLS is the modern successor to SSL, and mTLS provides mutual authentication.',
      keyPoints: [
        'SSL (Secure Sockets Layer): Deprecated encryption protocol, first developed in 1995',
        'TLS (Transport Layer Security): Modern encryption protocol, evolved from SSL',
        'TLS components: Encryption (hide data), Authentication (verify parties), Integrity (prevent tampering)',
        'mTLS (Mutual TLS): Both client and server authenticate each other',
        'Certificate management: Digital certificates for identity verification',
        'Handshake process: Establish secure connection before data exchange',
        'Zero trust security: mTLS used in zero trust network architectures',
        'Microservices: mTLS commonly used for service-to-service communication'
      ],
      example: 'HTTPS websites use TLS for secure communication. Microservices use mTLS for mutual authentication between services.',
      detailedExplanation: 'SSL is deprecated in favor of TLS, though certificates are still called "SSL certificates" for historical reasons. TLS provides encryption, authentication, and integrity for internet communications. mTLS extends TLS to require both parties to authenticate, commonly used in microservices and zero trust architectures.',
      diagrams: [],
      realWorldExamples: [
        'HTTPS websites: TLS 1.3 for secure web communication',
        'Microservices: mTLS for service-to-service authentication',
        'API security: TLS for encrypting API communications',
        'IoT devices: mTLS for device authentication and communication',
        'Zero trust networks: mTLS for all internal communications'
      ],
      commonMistakes: [
        'Using outdated SSL/TLS versions with known vulnerabilities',
        'Poor certificate management and renewal processes',
        'Not implementing proper certificate validation',
        'Using self-signed certificates in production',
        'Not considering performance impact of encryption overhead'
      ],
      interviewTips: [
        'Explain the evolution from SSL to TLS and why SSL is deprecated',
        'Discuss the three main components of TLS (encryption, authentication, integrity)',
        'Consider mTLS use cases in microservices and zero trust architectures',
        'Mention certificate management and PKI infrastructure',
        'Compare TLS versions and their security improvements'
      ],
      relatedTopics: ['https', 'certificates', 'microservices-security', 'zero-trust'],
      tradeoffs: {
        considerations: [
          'Security vs performance overhead from encryption',
          'Certificate management complexity vs security benefits',
          'mTLS mutual authentication vs implementation complexity',
          'TLS version: Security improvements vs compatibility'
        ],
        prosAndCons: {
          pros: [
            'Strong encryption protects data in transit',
            'Authentication prevents man-in-the-middle attacks',
            'Integrity verification prevents data tampering',
            'mTLS provides mutual authentication for zero trust'
          ],
          cons: [
            'Performance overhead from encryption and handshake',
            'Certificate management complexity and renewal',
            'mTLS increases implementation and operational complexity',
            'Potential compatibility issues with older systems'
          ]
        }
      },
      implementation: {
        technologies: ['OpenSSL', 'Let\'s Encrypt', 'Certificate Authorities', 'Istio Service Mesh', 'Consul Connect'],
        algorithms: ['RSA', 'ECDSA', 'AES encryption', 'SHA hashing', 'Diffie-Hellman key exchange'],
        protocols: ['TLS 1.2', 'TLS 1.3', 'X.509 certificates', 'OCSP']
      },
      benchmarks: [
        { metric: 'TLS Handshake', value: '1-2 RTT', context: 'Connection establishment overhead' },
        { metric: 'Encryption Overhead', value: '1-10%', context: 'CPU overhead for encryption' },
        { metric: 'Certificate Lifetime', value: '90 days-2 years', context: 'Typical certificate validity period' }
      ]
    }
  }
];
