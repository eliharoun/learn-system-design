import { Server, Globe, Shield, Wifi } from 'lucide-react';
import { Topic } from '../../types';

export const networkingTopics: Topic[] = [
  {
    id: 'load-balancer',
    title: 'Load Balancing',
    category: 'Networking & Infrastructure',
    icon: Server,
    color: 'from-orange-500 to-red-500',
    description: 'Distributing traffic across multiple servers for optimal performance',
    content: {
      overview: 'Load balancers distribute client requests across computing resources to optimize resource use and prevent overload.',
      keyPoints: [
        'Prevents requests going to unhealthy servers',
        'Prevents resource overloading',
        'Eliminates single points of failure',
        'Layer 4 (TCP/UDP): Fast, works at transport layer',
        'Layer 7 (HTTP): Slower, intelligent routing based on content',
        'Algorithms: Round robin, Least connections, IP hash, Weighted round robin',
        'Health checks: Monitor server availability',
        'Session persistence: Sticky sessions for stateful applications'
      ],
      example: 'Layer 4: Route based on IP/port. Layer 7: Route video traffic to video servers, API requests to API servers.',
      detailedExplanation: 'Load balancing distributes incoming network traffic across multiple servers to ensure no single server becomes overwhelmed. Modern load balancers can operate at different layers of the OSI model and use various algorithms to distribute traffic efficiently while monitoring server health.',
      diagrams: ['load-balancer', 'load-balancer-layers', 'redundant-load-balancer'],
      realWorldExamples: [
        'Netflix: Uses ELB and ALB for distributing traffic across microservices',
        'Google: Global load balancing across multiple data centers',
        'Amazon: Application Load Balancer for HTTP/HTTPS traffic',
        'Cloudflare: Global load balancing with DDoS protection',
        'Uber: Load balancing for real-time location services'
      ],
      commonMistakes: [
        'Not implementing health checks for backend servers',
        'Using only one load balancer (single point of failure)',
        'Ignoring session persistence requirements',
        'Not considering load balancer capacity limits',
        'Poor algorithm choice for specific use cases'
      ],
      interviewTips: [
        'Explain the difference between Layer 4 and Layer 7 load balancing',
        'Discuss various load balancing algorithms and their use cases',
        'Consider load balancer redundancy and failover',
        'Mention health checks and server monitoring',
        'Discuss session persistence and sticky sessions'
      ],
      relatedTopics: ['clustering', 'high-availability', 'dns', 'cdn'],
      tradeoffs: {
        considerations: [
          'Hardware LB (expensive, reliable) vs Software LB (flexible, cheaper)',
          'Active-passive (simple) vs Active-active (better utilization)',
          'Load balancer itself can become bottleneck',
          'Layer 4 (fast) vs Layer 7 (intelligent routing)'
        ],
        prosAndCons: {
          pros: [
            'Improved availability and fault tolerance',
            'Better resource utilization across servers',
            'Scalability through horizontal scaling',
            'Health monitoring and automatic failover'
          ],
          cons: [
            'Additional complexity and potential single point of failure',
            'Network latency from additional hop',
            'Cost of load balancer infrastructure',
            'Configuration and maintenance overhead'
          ]
        }
      },
      implementation: {
        technologies: ['Nginx', 'HAProxy', 'AWS ELB/ALB', 'Google Cloud Load Balancer', 'F5 BIG-IP'],
        algorithms: ['Round Robin', 'Least Connections', 'IP Hash', 'Weighted Round Robin', 'Least Response Time'],
        protocols: ['HTTP/HTTPS', 'TCP', 'UDP', 'SSL/TLS termination']
      },
      benchmarks: [
        { metric: 'Latency Overhead', value: '<5ms', context: 'Additional latency from load balancer' },
        { metric: 'Throughput', value: '100K+ RPS', context: 'High-performance load balancers' },
        { metric: 'Health Check Frequency', value: '5-30 seconds', context: 'Typical health check intervals' }
      ]
    }
  },
  {
    id: 'dns',
    title: 'Domain Name System (DNS)',
    category: 'Networking & Infrastructure',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    description: 'Hierarchical naming system that translates domain names to IP addresses',
    content: {
      overview: 'DNS is a hierarchical and decentralized naming system used for translating human-readable domain names to IP addresses.',
      keyPoints: [
        'Hierarchical structure: Root → TLD → Authoritative servers',
        'Caching at multiple levels for performance',
        'Different record types: A, AAAA, CNAME, MX, TXT',
        'Recursive vs iterative queries',
        'TTL controls cache duration',
        '8-step DNS resolution process',
        'DNS servers: Resolver, Root, TLD, Authoritative'
      ],
      example: 'Resolving google.com: Client → DNS Resolver → Root Server → .com TLD → google.com Authoritative → IP returned',
      detailedExplanation: 'DNS lookup involves 8 steps: 1) Client queries DNS resolver, 2) Resolver queries root nameserver, 3) Root responds with TLD address, 4) Resolver queries TLD, 5) TLD responds with authoritative nameserver, 6) Resolver queries authoritative server, 7) Authoritative server returns IP, 8) Resolver responds to client.',
      diagrams: ['how-dns-works'],
      realWorldExamples: [
        'Cloudflare DNS: 1.1.1.1 public DNS resolver with global anycast',
        'Amazon Route53: Managed DNS service with health checks and failover',
        'Google Public DNS: 8.8.8.8 with global anycast network',
        'Akamai: DNS-based load balancing for content delivery',
        'Netflix: Uses DNS for service discovery in microservices'
      ],
      commonMistakes: [
        'Not considering DNS propagation delays in deployments',
        'Ignoring TTL values in cache planning',
        'Single point of failure with one DNS provider',
        'Not implementing DNS failover for critical services',
        'Hardcoding IP addresses instead of using DNS names'
      ],
      interviewTips: [
        'Explain the full DNS resolution process step by step',
        'Discuss caching at different levels (browser, OS, resolver)',
        'Know different record types and their uses',
        'Consider DNS as a potential bottleneck in system design',
        'Mention DNS load balancing vs dedicated load balancers'
      ],
      relatedTopics: ['ip-addressing', 'load-balancing', 'caching', 'cdn'],
      tradeoffs: {
        considerations: [
          'Lower TTL = fresher data but more queries',
          'DNS load balancing vs dedicated load balancers',
          'Authoritative vs recursive DNS servers',
          'DNS caching vs real-time updates'
        ],
        prosAndCons: {
          pros: [
            'Human-readable names instead of IP addresses',
            'Hierarchical structure scales globally',
            'Caching improves performance and reduces load',
            'Enables load balancing and failover'
          ],
          cons: [
            'Additional network round trips add latency',
            'Single point of failure if not redundant',
            'DNS poisoning and security concerns',
            'Propagation delays for DNS changes'
          ]
        }
      },
      implementation: {
        technologies: ['BIND', 'PowerDNS', 'Route53', 'Cloudflare DNS', 'Consul'],
        protocols: ['UDP (primary)', 'TCP (fallback)', 'DNS over HTTPS (DoH)', 'DNS over TLS (DoT)'],
        algorithms: ['Round-robin DNS', 'Weighted routing', 'Geolocation routing']
      },
      benchmarks: [
        { metric: 'Query Response Time', value: '10-100ms', context: 'Typical DNS resolution time' },
        { metric: 'Cache Hit Ratio', value: '80-95%', context: 'Well-configured DNS cache' },
        { metric: 'TTL Values', value: '300-3600s', context: 'Common TTL ranges' }
      ]
    }
  },
  {
    id: 'clustering',
    title: 'Clustering',
    category: 'Networking & Infrastructure',
    icon: Server,
    color: 'from-indigo-500 to-purple-500',
    description: 'Grouping servers to work together as a single system',
    content: {
      overview: 'Clustering groups multiple servers to work together, providing high availability, load distribution, and fault tolerance.',
      keyPoints: [
        'Active-Active: All nodes actively serve requests',
        'Active-Passive: Primary node serves, secondary on standby',
        'High Availability: Eliminates single points of failure',
        'Load Balancing: Distributes workload across nodes',
        'Fault Tolerance: System continues if nodes fail',
        'Shared Storage: Nodes access common data',
        'Heartbeat: Nodes monitor each other\'s health',
        'Failover: Automatic switching to healthy nodes'
      ],
      example: 'Kubernetes cluster: Multiple worker nodes managed by control plane, with automatic pod scheduling and failover.',
      detailedExplanation: 'Clustering involves connecting multiple servers to work as a single system. Unlike simple load balancing, clustered nodes are aware of each other and coordinate their activities. This provides better fault tolerance and resource utilization than individual servers.',
      diagrams: ['cluster', 'active-active', 'active-passive'],
      realWorldExamples: [
        'Kubernetes: Container orchestration with node clustering',
        'MongoDB Replica Sets: Database clustering for high availability',
        'Redis Cluster: Distributed caching with automatic sharding',
        'Elasticsearch: Search cluster with distributed indexing',
        'Apache Cassandra: Multi-node database cluster'
      ],
      commonMistakes: [
        'Not planning for split-brain scenarios',
        'Ignoring network partitions between cluster nodes',
        'Over-complicating cluster setup for simple applications',
        'Not monitoring cluster health and node status',
        'Assuming clustering automatically provides high availability'
      ],
      interviewTips: [
        'Explain the difference between clustering and load balancing',
        'Discuss active-active vs active-passive configurations',
        'Consider split-brain problems and how to prevent them',
        'Mention specific clustering technologies and their use cases',
        'Discuss the trade-offs between complexity and benefits'
      ],
      relatedTopics: ['load-balancing', 'high-availability', 'distributed-systems', 'failover'],
      tradeoffs: {
        considerations: [
          'Active-Active: Better resource utilization but more complex',
          'Active-Passive: Simpler setup but resource waste',
          'Shared storage: Single point of failure vs performance',
          'Network overhead: Cluster communication costs'
        ],
        prosAndCons: {
          pros: [
            'High availability through redundancy',
            'Better resource utilization across nodes',
            'Automatic failover and recovery',
            'Scalability through adding more nodes'
          ],
          cons: [
            'Increased complexity in setup and management',
            'Network overhead for cluster communication',
            'Potential split-brain scenarios',
            'Higher infrastructure and operational costs'
          ]
        }
      },
      implementation: {
        technologies: ['Kubernetes', 'Docker Swarm', 'Apache Mesos', 'Nomad', 'Pacemaker'],
        algorithms: ['Leader election', 'Consensus algorithms', 'Heartbeat monitoring'],
        protocols: ['Raft', 'Paxos', 'Gossip protocol', 'Cluster membership']
      },
      benchmarks: [
        { metric: 'Failover Time', value: '<30 seconds', context: 'Typical cluster failover' },
        { metric: 'Node Communication', value: '<10ms', context: 'Intra-cluster latency' },
        { metric: 'Cluster Size', value: '3-100 nodes', context: 'Typical cluster configurations' }
      ]
    }
  },
  {
    id: 'proxy-systems',
    title: 'Proxy Systems',
    category: 'Networking & Infrastructure',
    icon: Shield,
    color: 'from-slate-500 to-gray-500',
    description: 'Intermediate servers for request handling and security',
    content: {
      overview: 'A proxy server is an intermediary piece of hardware/software sitting between the client and the backend server. It receives requests from clients and relays them to the origin servers.',
      keyPoints: [
        'Forward Proxy: Sits in front of clients, hides client identity from servers',
        'Reverse Proxy: Sits in front of servers, hides server details from clients',
        'Forward proxy benefits: Content blocking, geo-restriction bypass, anonymity',
        'Reverse proxy benefits: Load balancing, SSL termination, caching, security',
        'Request/response transformation: Adding/removing headers, compression',
        'Protocol translation: HTTP to HTTPS, different API versions',
        'Authentication and authorization: Centralized security enforcement',
        'Monitoring and logging: Request tracking and analytics'
      ],
      example: 'Forward proxy: Corporate firewall filtering employee internet access. Reverse proxy: Nginx distributing requests to multiple backend servers.',
      detailedExplanation: 'Forward proxies sit in front of clients and make requests on their behalf, providing anonymity and content filtering. Reverse proxies sit in front of servers and handle client requests, providing load balancing, SSL termination, and caching. The key difference is perspective - forward proxies serve clients, reverse proxies serve servers.',
      diagrams: ['forward-proxy', 'reverse-proxy'],
      realWorldExamples: [
        'Nginx: Popular reverse proxy for load balancing and SSL termination',
        'HAProxy: High-performance reverse proxy for web applications',
        'Cloudflare: Global reverse proxy with DDoS protection and caching',
        'Corporate proxies: Forward proxies for employee internet access control',
        'Squid: Caching proxy server for web content acceleration'
      ],
      commonMistakes: [
        'Confusing forward and reverse proxy use cases',
        'Not implementing proxy redundancy (single point of failure)',
        'Ignoring proxy performance and capacity limits',
        'Poor SSL certificate management in reverse proxies',
        'Not monitoring proxy health and performance metrics'
      ],
      interviewTips: [
        'Clearly explain the difference between forward and reverse proxies',
        'Discuss specific use cases and benefits for each type',
        'Compare reverse proxy with load balancer functionality',
        'Mention security benefits and SSL termination',
        'Consider proxy placement in system architecture'
      ],
      relatedTopics: ['load-balancing', 'security', 'caching', 'ssl-tls'],
      tradeoffs: {
        considerations: [
          'Forward proxy: Client anonymity vs server visibility',
          'Reverse proxy: Server protection vs additional complexity',
          'Proxy caching: Performance improvement vs stale data risk',
          'SSL termination: Reduced backend load vs security considerations'
        ],
        prosAndCons: {
          pros: [
            'Forward: Anonymity, content filtering, geo-restriction bypass',
            'Reverse: Load balancing, SSL termination, caching, security',
            'Both: Request/response transformation and monitoring capabilities',
            'Centralized policy enforcement and access control'
          ],
          cons: [
            'Additional network hop increases latency',
            'Single point of failure if not properly redundant',
            'Configuration complexity and maintenance overhead',
            'Potential bottleneck under high traffic loads'
          ]
        }
      },
      implementation: {
        technologies: ['Nginx', 'HAProxy', 'Traefik', 'Envoy', 'Apache HTTP Server'],
        algorithms: ['Request routing', 'Load balancing', 'SSL termination', 'Content filtering'],
        protocols: ['HTTP/HTTPS', 'SOCKS', 'SSL/TLS', 'WebSocket']
      },
      benchmarks: [
        { metric: 'Proxy Latency', value: '<10ms', context: 'Additional latency from proxy processing' },
        { metric: 'Throughput', value: '50K+ RPS', context: 'High-performance proxy servers' },
        { metric: 'SSL Termination', value: '<5ms', context: 'SSL processing overhead' }
      ]
    }
  },
  {
    id: 'real-time-communication',
    title: 'Long Polling, WebSockets, Server-Sent Events',
    category: 'Networking & Infrastructure',
    icon: Wifi,
    color: 'from-green-500 to-blue-500',
    description: 'Real-time communication patterns for web applications',
    content: {
      overview: 'Web applications were initially developed around a client-server model where the web client is always the initiator of transactions. These patterns overcome the limitation of server-initiated communication.',
      keyPoints: [
        'Long Polling: Server delays response until data available or timeout',
        'WebSockets: Full-duplex communication over single TCP connection',
        'Server-Sent Events (SSE): Unidirectional server-to-client streaming',
        'Long polling: Client makes request, server holds until data available',
        'WebSocket handshake: HTTP upgrade to WebSocket protocol (ws://)',
        'SSE: Simple HTTP-based server push, automatic reconnection',
        'Use cases: Chat applications, live updates, real-time notifications',
        'Browser support: WebSockets and SSE widely supported'
      ],
      example: 'Chat application: WebSockets for bidirectional messaging. Live sports scores: SSE for server-pushed updates. Notification system: Long polling for immediate delivery.',
      detailedExplanation: 'Traditional HTTP is request-response only. Long polling keeps connections open until data is available. WebSockets provide full-duplex communication after HTTP upgrade handshake. Server-Sent Events enable server-to-client streaming over HTTP. Each pattern suits different real-time communication needs.',
      diagrams: ['long-polling', 'websockets', 'server-sent-events'],
      realWorldExamples: [
        'WhatsApp Web: WebSockets for real-time messaging',
        'Facebook: SSE for live notifications and updates',
        'Slack: WebSockets for real-time chat and presence',
        'Twitter: SSE for live tweet streams and trending topics',
        'Stock trading platforms: WebSockets for real-time price updates'
      ],
      commonMistakes: [
        'Using long polling for high-frequency updates (inefficient)',
        'Not handling WebSocket connection failures and reconnection',
        'Ignoring browser connection limits for SSE',
        'Not implementing proper authentication for WebSocket connections',
        'Using WebSockets for simple request-response patterns'
      ],
      interviewTips: [
        'Explain the differences between all three approaches',
        'Discuss when to use each pattern based on requirements',
        'Consider scalability implications of persistent connections',
        'Mention browser support and fallback strategies',
        'Compare with traditional polling approaches'
      ],
      relatedTopics: ['websockets', 'http', 'real-time-systems', 'chat-applications'],
      tradeoffs: {
        considerations: [
          'Long polling: Simple implementation vs resource usage',
          'WebSockets: Full-duplex capability vs connection management complexity',
          'SSE: Simplicity vs unidirectional limitation',
          'Persistent connections vs server resource consumption'
        ],
        prosAndCons: {
          pros: [
            'Long polling: Easy to implement, universally supported',
            'WebSockets: Full-duplex, low latency, efficient for high-frequency updates',
            'SSE: Simple server push, automatic reconnection, HTTP-based',
            'All: Enable real-time user experiences'
          ],
          cons: [
            'Long polling: Resource intensive, not scalable for many clients',
            'WebSockets: Complex connection management, firewall issues',
            'SSE: Unidirectional only, connection limits per domain',
            'All: Persistent connections consume server resources'
          ]
        }
      },
      implementation: {
        technologies: ['Socket.IO', 'SockJS', 'WebSocket API', 'EventSource API', 'SignalR'],
        algorithms: ['Connection pooling', 'Heartbeat/keepalive', 'Reconnection strategies', 'Message queuing'],
        protocols: ['WebSocket', 'HTTP/2 Server Push', 'EventSource', 'Long polling over HTTP']
      },
      benchmarks: [
        { metric: 'WebSocket Latency', value: '<50ms', context: 'Real-time message delivery' },
        { metric: 'Connection Limit', value: '10K+ concurrent', context: 'Per server WebSocket connections' },
        { metric: 'SSE Throughput', value: '1K+ messages/sec', context: 'Server-sent events rate' }
      ]
    }
  }
];
