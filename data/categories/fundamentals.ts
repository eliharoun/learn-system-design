import { TrendingUp, Shield, Network, Layers, Zap } from 'lucide-react';
import { Topic } from '../../types';

export const fundamentalsTopics: Topic[] = [
  {
    id: 'performance-scalability',
    title: 'Performance vs Scalability',
    category: 'Fundamentals',
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-500',
    description: 'Understanding the difference between performance and scalability',
    content: {
      overview: 'A service is scalable if it results in increased performance proportional to resources added.',
      keyPoints: [
        'Performance problem: system is slow for a single user',
        'Scalability problem: system is fast for one user but slow under heavy load',
        'Aim for maximal throughput with acceptable latency',
        'Vertical scaling: Adding more power to existing machines',
        'Horizontal scaling: Adding more machines to the pool of resources',
        'Performance measures how fast a system responds to requests',
        'Scalability measures how well performance is maintained as load increases'
      ],
      example: 'If adding servers increases request handling capacity proportionally, the system scales well.',
      detailedExplanation: 'Performance measures how fast a system responds to requests under a given workload. Scalability measures how well performance is maintained as load increases. A system can be performant but not scalable (fast for one user, slow for many) or scalable but not performant (consistent but slow response times). The key is finding the right balance for your specific use case.',
      diagrams: ['scalability'],
      realWorldExamples: [
        'Netflix: Horizontal scaling with microservices architecture',
        'Stack Overflow: Vertical scaling with powerful hardware and efficient caching',
        'Facebook: Hybrid approach combining both vertical and horizontal scaling',
        'Twitter: Horizontal scaling to handle massive tweet volumes',
        'Instagram: Scaling photo storage and processing across multiple data centers'
      ],
      commonMistakes: [
        'Premature optimization without measuring actual bottlenecks',
        'Assuming vertical scaling is always cheaper than horizontal',
        'Not considering operational complexity of horizontal scaling',
        'Ignoring the human cost of managing distributed systems',
        'Scaling without understanding the actual performance requirements'
      ],
      interviewTips: [
        'Always clarify if the question is about performance or scalability',
        'Discuss trade-offs between vertical and horizontal scaling',
        'Mention specific bottlenecks and how to identify them',
        'Consider both technical and business implications',
        'Discuss monitoring and measurement strategies'
      ],
      relatedTopics: ['load-balancer', 'caching', 'microservices', 'clustering'],
      tradeoffs: {
        considerations: [
          'Vertical scaling (more powerful hardware) vs Horizontal scaling (more machines)',
          'Cost implications of scaling strategy',
          'Complexity of distributed systems',
          'Single point of failure vs distributed complexity'
        ],
        prosAndCons: {
          pros: [
            'Vertical: Simple to implement, no application changes needed',
            'Vertical: Better for applications requiring shared state',
            'Horizontal: Better fault tolerance and redundancy',
            'Horizontal: Can scale beyond single machine limits',
            'Horizontal: Cost-effective using commodity hardware'
          ],
          cons: [
            'Vertical: Limited by hardware constraints',
            'Vertical: Single point of failure',
            'Vertical: Can become very expensive',
            'Horizontal: Increased complexity in application design',
            'Horizontal: Network latency and consistency challenges'
          ]
        }
      },
      implementation: {
        technologies: ['Load Balancers', 'Auto Scaling Groups', 'Container Orchestration', 'CDN', 'Database Sharding'],
        algorithms: ['Round Robin', 'Least Connections', 'Consistent Hashing'],
        protocols: ['HTTP/2', 'gRPC', 'WebSockets']
      },
      benchmarks: [
        { metric: 'Response Time', value: '<200ms', context: 'Typical web application target' },
        { metric: 'Throughput', value: '1000+ RPS', context: 'High-traffic web service' },
        { metric: 'Availability', value: '99.9%', context: 'Standard SLA requirement' }
      ]
    }
  },
  {
    id: 'latency-throughput',
    title: 'Latency vs Throughput',
    category: 'Fundamentals',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    description: 'Key metrics for system performance',
    content: {
      overview: 'Latency measures time to perform an action. Throughput measures actions per unit time.',
      keyPoints: [
        'Latency: Time to complete a single operation (milliseconds)',
        'Throughput: Number of operations completed per second (requests/sec)',
        'Generally aim for maximal throughput with acceptable latency',
        'Trade-off: Lower latency often means lower throughput and vice versa',
        'Latency is measured from user perspective (end-to-end)',
        'Throughput is measured at system boundaries',
        'Both metrics are crucial for user experience'
      ],
      example: 'A system may have low latency (10ms response) but low throughput (100 req/s), or high latency (100ms) but high throughput (10,000 req/s).',
      detailedExplanation: 'Latency and throughput are often confused but represent different aspects of performance. Latency measures the time it takes to process a single request from start to finish. Throughput measures how many requests can be processed in a given time period. These metrics can be inversely related - optimizing for one may hurt the other.',
      diagrams: [],
      realWorldExamples: [
        'Netflix: High throughput for video streaming, acceptable latency for buffering',
        'Gaming: Ultra-low latency critical, moderate throughput acceptable',
        'Batch processing: High throughput priority, latency less critical',
        'Real-time trading: Both low latency and high throughput required',
        'CDN: Improves both latency (edge locations) and throughput (parallel serving)'
      ],
      commonMistakes: [
        'Optimizing only one metric without considering the other',
        'Not measuring latency from user perspective',
        'Ignoring tail latencies (95th, 99th percentile)',
        'Confusing response time with processing time',
        'Not considering network latency in distributed systems'
      ],
      interviewTips: [
        'Define both metrics clearly before discussing',
        'Ask about acceptable latency and required throughput',
        'Discuss measurement techniques and monitoring',
        'Consider both average and tail latencies',
        'Explain trade-offs between the two metrics'
      ],
      relatedTopics: ['performance-scalability', 'caching', 'load-balancer', 'cdn'],
      tradeoffs: {
        considerations: [
          'Batch processing increases throughput but adds latency',
          'Real-time systems prioritize latency over throughput',
          'CDNs improve both by serving from edge locations',
          'Caching improves both metrics but adds complexity'
        ],
        prosAndCons: {
          pros: [
            'Low latency: Better user experience, real-time capabilities',
            'High throughput: Better resource utilization, cost efficiency',
            'Balanced approach: Optimal for most applications'
          ],
          cons: [
            'Ultra-low latency: Expensive, complex infrastructure required',
            'High throughput focus: May sacrifice individual request speed',
            'Optimization complexity: Difficult to optimize both simultaneously'
          ]
        }
      },
      implementation: {
        technologies: ['CDN', 'Caching', 'Load Balancers', 'Connection Pooling', 'Async Processing'],
        protocols: ['HTTP/2', 'gRPC', 'WebSockets', 'UDP'],
        algorithms: ['Connection Pooling', 'Request Batching', 'Prefetching']
      },
      benchmarks: [
        { metric: 'Web Latency', value: '<100ms', context: 'Acceptable web response time' },
        { metric: 'API Latency', value: '<50ms', context: 'Good API response time' },
        { metric: 'Throughput', value: '1000+ RPS', context: 'High-traffic web service' }
      ]
    }
  },
  {
    id: 'cap-theorem',
    title: 'CAP Theorem',
    category: 'Fundamentals',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
    description: 'Consistency, Availability, and Partition Tolerance',
    content: {
      overview: 'In distributed systems, you can only guarantee two of three: Consistency, Availability, Partition Tolerance.',
      keyPoints: [
        'Consistency: Every read receives the most recent write or error',
        'Availability: Every request receives a response (may not be latest data)',
        'Partition Tolerance: System continues despite network failures',
        'Networks are not reliable, so you must support partition tolerance',
        'CP systems: Prefer consistency (banking, inventory)',
        'AP systems: Prefer availability (social media, caching)',
        'CA systems: Only possible in single-node systems (not distributed)'
      ],
      example: 'CP systems (HBase, MongoDB): Return error if data cannot be guaranteed consistent. AP systems (Cassandra, DynamoDB): Always respond, eventual consistency.',
      detailedExplanation: 'CAP theorem states that in the presence of a network partition, you must choose between consistency and availability. Since network partitions are inevitable in distributed systems, you must choose between CP (consistency + partition tolerance) or AP (availability + partition tolerance). CA systems can only exist when there are no network partitions.',
      diagrams: ['cap-theorem'],
      realWorldExamples: [
        'CP Systems: MongoDB, HBase, Redis Cluster - Sacrifice availability for consistency',
        'AP Systems: Cassandra, DynamoDB, CouchDB - Sacrifice consistency for availability',
        'CA Systems: PostgreSQL, MySQL (single node) - Not partition tolerant',
        'Banking systems: Choose CP to ensure transaction consistency',
        'Social media: Choose AP to ensure users can always post/read'
      ],
      commonMistakes: [
        'Thinking you can have all three properties in a distributed system',
        'Not understanding that partition tolerance is mandatory for distributed systems',
        'Choosing consistency/availability without considering business requirements',
        'Ignoring the PACELC theorem extension',
        'Not planning for network partition scenarios'
      ],
      interviewTips: [
        'Explain why partition tolerance is mandatory in distributed systems',
        'Give concrete examples of CP vs AP systems',
        'Discuss business requirements that drive the choice',
        'Mention PACELC theorem as an extension',
        'Consider consistency models (strong, eventual, weak)'
      ],
      relatedTopics: ['databases', 'distributed-transactions', 'consistency', 'pacelc-theorem'],
      tradeoffs: {
        considerations: [
          'Strong consistency requires coordination (slower)',
          'Eventual consistency is faster but may serve stale data',
          'Choose based on business requirements',
          'Network partitions are inevitable in distributed systems'
        ],
        prosAndCons: {
          pros: [
            'CP: Data consistency guaranteed, suitable for financial systems',
            'AP: High availability, better user experience during failures',
            'Clear framework for making architectural decisions'
          ],
          cons: [
            'CP: System may become unavailable during partitions',
            'AP: Users may see stale or inconsistent data',
            'Oversimplified model - real systems have more nuanced trade-offs'
          ]
        }
      },
      implementation: {
        technologies: ['MongoDB (CP)', 'Cassandra (AP)', 'PostgreSQL (CA)', 'Redis Cluster (CP)', 'DynamoDB (AP)'],
        algorithms: ['Consensus algorithms', 'Vector clocks', 'Merkle trees'],
        protocols: ['Raft', 'Paxos', 'Gossip protocol']
      },
      benchmarks: [
        { metric: 'Consistency Level', value: 'Strong/Eventual', context: 'Based on CAP choice' },
        { metric: 'Availability', value: '99.9% vs 99.99%', context: 'CP vs AP systems' },
        { metric: 'Partition Recovery', value: '<1 minute', context: 'Time to detect and recover' }
      ]
    }
  },
  {
    id: 'reliability-availability',
    title: 'Reliability & Availability',
    category: 'Fundamentals',
    icon: Shield,
    color: 'from-emerald-500 to-green-500',
    description: 'System reliability and availability characteristics',
    content: {
      overview: 'Reliability is the probability a system will fail in a given period. Availability is the time a system remains operational.',
      keyPoints: [
        'Reliability: System keeps delivering services even when components fail',
        'Availability: Percentage of time system remains operational',
        'If system is reliable, it is available (but not vice versa)',
        'Redundancy removes single points of failure',
        'Replication ensures data consistency across nodes',
        '99.9% availability = 8.76 hours downtime/year',
        '99.99% availability = 52.56 minutes downtime/year',
        'Fault tolerance vs high availability are different concepts'
      ],
      example: 'Amazon ensures reliability through redundancy. Netflix achieves high availability through multiple data centers and failover mechanisms.',
      detailedExplanation: 'Reliability and availability are related but distinct concepts. Reliability is the probability that a system will perform correctly during a specific time duration. Availability is the percentage of time a system remains operational. A reliable system is available, but an available system may not be reliable if it frequently fails and recovers quickly.',
      diagrams: [],
      realWorldExamples: [
        'Amazon: 99.99% availability through redundant data centers and services',
        'Netflix: High availability through chaos engineering and fault tolerance',
        'Google: 99.95% availability SLA with automatic failover systems',
        'Banking systems: High reliability requirements for financial transactions',
        'Emergency services: Both high reliability and availability critical'
      ],
      commonMistakes: [
        'Confusing reliability with availability',
        'Not planning for cascading failures',
        'Over-engineering for unnecessary availability levels',
        'Ignoring human factors in system reliability',
        'Not measuring and monitoring actual availability'
      ],
      interviewTips: [
        'Define the difference between reliability and availability',
        'Discuss the nine\'s of availability and their cost implications',
        'Explain redundancy strategies and failover mechanisms',
        'Consider both technical and business requirements',
        'Mention disaster recovery and backup strategies'
      ],
      relatedTopics: ['clustering', 'load-balancer', 'disaster-recovery', 'monitoring'],
      tradeoffs: {
        considerations: [
          'Redundancy has cost implications',
          'Higher availability requires more infrastructure',
          'Balance between cost and reliability requirements',
          'Complexity vs reliability trade-offs'
        ],
        prosAndCons: {
          pros: [
            'High availability: Better user experience, business continuity',
            'Reliability: Predictable system behavior, user trust',
            'Redundancy: Protection against single points of failure'
          ],
          cons: [
            'Cost: Higher availability is expensive to achieve',
            'Complexity: More moving parts can introduce new failure modes',
            'Over-engineering: May not be justified by business requirements'
          ]
        }
      },
      implementation: {
        technologies: ['Load Balancers', 'Auto Scaling', 'Health Checks', 'Circuit Breakers', 'Backup Systems'],
        algorithms: ['Failover algorithms', 'Health checking', 'Circuit breaker patterns'],
        protocols: ['HTTP health checks', 'Heartbeat protocols', 'Consensus protocols']
      },
      benchmarks: [
        { metric: '99.9% Availability', value: '8.76 hours downtime/year', context: 'Standard web service' },
        { metric: '99.99% Availability', value: '52.56 minutes downtime/year', context: 'High availability service' },
        { metric: '99.999% Availability', value: '5.26 minutes downtime/year', context: 'Mission critical systems' }
      ]
    }
  },
  {
    id: 'ip-addressing',
    title: 'IP Addressing',
    category: 'Fundamentals',
    icon: Network,
    color: 'from-blue-500 to-indigo-500',
    description: 'Internet Protocol addressing and network identification',
    content: {
      overview: 'IP addresses are unique identifiers that allow devices to communicate over networks and the internet.',
      keyPoints: [
        'IPv4: 32-bit addresses (4.3 billion possible addresses)',
        'IPv6: 128-bit addresses (340 undecillion possible addresses)',
        'Public IP: Globally unique, routable on internet',
        'Private IP: Local network use, not routable on internet',
        'Static IP: Manually assigned, doesn\'t change',
        'Dynamic IP: Automatically assigned by DHCP, can change',
        'Subnetting: Dividing networks into smaller subnetworks'
      ],
      example: 'IPv4: 192.168.1.1 (private), 8.8.8.8 (Google DNS, public). IPv6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334',
      detailedExplanation: 'IP addresses serve as unique identifiers for devices on networks. IPv4 uses 32-bit addresses but is running out of available addresses, leading to the development of IPv6 with 128-bit addresses. Public IPs are globally unique and routable on the internet, while private IPs are used within local networks and require NAT for internet access.',
      diagrams: [],
      realWorldExamples: [
        'ISP assignment: Your router gets a public IP from your ISP',
        'Home network: Router assigns private IPs (192.168.x.x) to devices',
        'Cloud providers: AWS, Google Cloud assign public IPs to instances',
        'CDN: Multiple IP addresses for global content delivery',
        'Load balancers: Single public IP routes to multiple private IPs'
      ],
      commonMistakes: [
        'Confusing public and private IP address ranges',
        'Not understanding NAT and how private IPs access internet',
        'Hardcoding IP addresses instead of using DNS',
        'Not planning for IPv6 transition',
        'Ignoring IP address exhaustion in network design'
      ],
      interviewTips: [
        'Explain the difference between IPv4 and IPv6',
        'Discuss public vs private IP address usage',
        'Mention CIDR notation for network ranges',
        'Consider NAT and how it enables private networks',
        'Discuss IP address allocation in cloud environments'
      ],
      relatedTopics: ['dns', 'load-balancing', 'networking', 'subnetting'],
      tradeoffs: {
        considerations: [
          'IPv4 vs IPv6: Compatibility vs address space',
          'Static vs Dynamic IPs: Reliability vs flexibility',
          'Public vs Private: Accessibility vs security',
          'Subnetting: Organization vs complexity'
        ],
        prosAndCons: {
          pros: [
            'IPv4: Universal compatibility, well understood',
            'IPv6: Massive address space, built-in security features',
            'Static IPs: Predictable, good for servers',
            'Dynamic IPs: Efficient use of address space, automatic management'
          ],
          cons: [
            'IPv4: Address exhaustion, NAT complexity',
            'IPv6: Slower adoption, complexity for administrators',
            'Static IPs: Manual management, potential conflicts',
            'Dynamic IPs: Unpredictable changes, not suitable for servers'
          ]
        }
      },
      implementation: {
        technologies: ['DHCP', 'NAT', 'DNS', 'CIDR', 'Subnetting'],
        protocols: ['IPv4', 'IPv6', 'ICMP', 'ARP'],
        algorithms: ['Longest prefix matching', 'Subnet calculation']
      },
      benchmarks: [
        { metric: 'IPv4 Addresses', value: '4.3 billion', context: 'Total possible IPv4 addresses' },
        { metric: 'IPv6 Addresses', value: '340 undecillion', context: 'Total possible IPv6 addresses' },
        { metric: 'Private IPv4 Range', value: '16.7 million', context: 'Class A private addresses (10.x.x.x)' }
      ]
    }
  },
  {
    id: 'osi-model',
    title: 'OSI Model',
    category: 'Fundamentals',
    icon: Layers,
    color: 'from-purple-500 to-blue-500',
    description: 'Seven-layer network communication model',
    content: {
      overview: 'The OSI Model is a conceptual framework that describes network communication in seven distinct layers.',
      keyPoints: [
        'Layer 7 - Application: User interface (HTTP, SMTP, FTP)',
        'Layer 6 - Presentation: Data formatting, encryption (SSL/TLS)',
        'Layer 5 - Session: Connection management (NetBIOS, RPC)',
        'Layer 4 - Transport: End-to-end delivery (TCP, UDP)',
        'Layer 3 - Network: Routing between networks (IP, ICMP)',
        'Layer 2 - Data Link: Node-to-node delivery (Ethernet, WiFi)',
        'Layer 1 - Physical: Physical transmission (cables, radio waves)'
      ],
      example: 'Web browsing: HTTP (L7) → TCP (L4) → IP (L3) → Ethernet (L2) → Cable (L1)',
      detailedExplanation: 'The OSI model provides a systematic way to understand network communication by breaking it into seven layers. Each layer has specific responsibilities and communicates only with adjacent layers. This abstraction helps in troubleshooting network issues and designing network protocols.',
      diagrams: ['osi-model'],
      realWorldExamples: [
        'Web traffic: Browser (L7) uses HTTP over TCP/IP stack',
        'Email: SMTP (L7) for sending, POP3/IMAP (L7) for receiving',
        'VPN: Operates at multiple layers for secure communication',
        'Firewalls: Can operate at different layers (L3, L4, L7)',
        'Load balancers: Layer 4 (TCP/UDP) or Layer 7 (HTTP) balancing'
      ],
      commonMistakes: [
        'Thinking all protocols fit neatly into one layer',
        'Not understanding layer interactions and dependencies',
        'Confusing the OSI model with TCP/IP model',
        'Over-engineering solutions by considering all layers',
        'Not using the model for systematic troubleshooting'
      ],
      interviewTips: [
        'Memorize the seven layers and their primary functions',
        'Give examples of protocols at each layer',
        'Explain how layers interact with each other',
        'Use the model to explain network troubleshooting',
        'Discuss how modern protocols may span multiple layers'
      ],
      relatedTopics: ['tcp-udp', 'networking', 'protocols', 'security'],
      tradeoffs: {
        considerations: [
          'Abstraction vs performance overhead',
          'Layer separation vs protocol efficiency',
          'Standardization vs innovation',
          'Theoretical model vs practical implementation'
        ],
        prosAndCons: {
          pros: [
            'Clear separation of concerns and responsibilities',
            'Standardized framework for network communication',
            'Helpful for troubleshooting and education',
            'Enables interoperability between different systems'
          ],
          cons: [
            'Not all protocols fit cleanly into the model',
            'Can be overly complex for simple applications',
            'Real implementations may not follow the model strictly',
            'Performance overhead from layer abstractions'
          ]
        }
      },
      implementation: {
        technologies: ['TCP/IP Stack', 'Ethernet', 'WiFi', 'HTTP/HTTPS', 'SSL/TLS'],
        protocols: ['HTTP', 'TCP', 'IP', 'Ethernet', 'SMTP', 'FTP', 'DNS'],
        algorithms: ['Routing algorithms', 'Error detection', 'Flow control']
      },
      benchmarks: [
        { metric: 'Layer Processing', value: '<1ms per layer', context: 'Typical processing overhead' },
        { metric: 'Protocol Overhead', value: '5-20%', context: 'Header overhead per layer' },
        { metric: 'Troubleshooting Time', value: '50% reduction', context: 'Using systematic layer approach' }
      ]
    }
  },
  {
    id: 'tcp-udp',
    title: 'TCP vs UDP',
    category: 'Fundamentals',
    icon: Network,
    color: 'from-green-500 to-teal-500',
    description: 'Transport layer protocols for reliable and fast communication',
    content: {
      overview: 'TCP provides reliable, ordered delivery while UDP offers fast, connectionless communication.',
      keyPoints: [
        'TCP: Connection-oriented, reliable, ordered delivery',
        'UDP: Connectionless, fast, no delivery guarantees',
        'TCP: Built-in error checking and recovery',
        'UDP: Minimal overhead, suitable for real-time applications',
        'TCP: Flow control and congestion control',
        'UDP: No flow control, application handles reliability',
        'TCP: Higher latency, UDP: Lower latency'
      ],
      example: 'TCP: Web browsing (HTTP), file transfer (FTP), email (SMTP). UDP: Video streaming, DNS queries, online gaming.',
      detailedExplanation: 'TCP and UDP are both transport layer protocols but serve different purposes. TCP is connection-oriented and provides reliable, ordered delivery of data with error checking and recovery. UDP is connectionless and provides fast transmission without guarantees, making it suitable for applications where speed is more important than reliability.',
      diagrams: ['tcp', 'udp'],
      realWorldExamples: [
        'Netflix: Uses TCP for control data, UDP for video streaming',
        'DNS: Uses UDP for fast queries, TCP for large responses',
        'Gaming: UDP for real-time gameplay, TCP for chat/lobby',
        'Web browsing: TCP for reliable page loading',
        'VoIP: UDP for voice data, TCP for signaling'
      ],
      commonMistakes: [
        'Using TCP for all applications without considering UDP benefits',
        'Not understanding when UDP packet loss is acceptable',
        'Ignoring TCP overhead in latency-sensitive applications',
        'Not implementing reliability mechanisms when using UDP',
        'Confusing transport layer with application layer protocols'
      ],
      interviewTips: [
        'Explain the key differences between TCP and UDP',
        'Give examples of when to use each protocol',
        'Discuss the trade-offs between reliability and speed',
        'Mention specific use cases for each protocol',
        'Consider hybrid approaches using both protocols'
      ],
      relatedTopics: ['osi-model', 'networking', 'real-time-systems', 'streaming'],
      tradeoffs: {
        considerations: [
          'Reliability vs Speed: TCP reliable but slower, UDP fast but unreliable',
          'Overhead vs Performance: TCP has more overhead, UDP minimal',
          'Connection management: TCP maintains state, UDP stateless',
          'Error handling: TCP built-in, UDP application responsibility'
        ],
        prosAndCons: {
          pros: [
            'TCP: Reliable delivery, error recovery, flow control, widely supported',
            'UDP: Low latency, minimal overhead, simple implementation, broadcast support'
          ],
          cons: [
            'TCP: Higher latency, more overhead, connection setup cost, head-of-line blocking',
            'UDP: No delivery guarantee, no error recovery, no flow control, packet loss possible'
          ]
        }
      },
      implementation: {
        technologies: ['HTTP/HTTPS (TCP)', 'DNS (UDP/TCP)', 'DHCP (UDP)', 'SMTP (TCP)', 'SNMP (UDP)'],
        protocols: ['TCP', 'UDP', 'SCTP', 'QUIC'],
        algorithms: ['Sliding window', 'Congestion control', 'Checksum validation']
      },
      benchmarks: [
        { metric: 'TCP Overhead', value: '20-60 bytes', context: 'Header size per packet' },
        { metric: 'UDP Overhead', value: '8 bytes', context: 'Header size per packet' },
        { metric: 'Connection Setup', value: '1.5 RTT', context: 'TCP three-way handshake' }
      ]
    }
  },
  {
    id: 'availability-patterns',
    title: 'Availability Patterns',
    category: 'Fundamentals',
    icon: Shield,
    color: 'from-emerald-500 to-teal-500',
    description: 'Patterns for achieving high availability in distributed systems',
    content: {
      overview: 'Availability patterns are architectural approaches to ensure systems remain operational and accessible.',
      keyPoints: [
        'Redundancy: Multiple instances of critical components',
        'Failover: Automatic switching to backup systems',
        'Load balancing: Distribute traffic across multiple servers',
        'Circuit breakers: Prevent cascading failures',
        'Bulkhead pattern: Isolate critical resources',
        'Timeout patterns: Prevent hanging requests',
        'Retry patterns: Handle transient failures gracefully',
        'Health checks: Monitor system component status'
      ],
      example: 'Netflix uses multiple availability zones, auto-scaling, circuit breakers, and chaos engineering to achieve high availability.',
      detailedExplanation: 'Availability patterns are proven architectural approaches for building resilient systems. These patterns help systems continue operating even when individual components fail. The key is to eliminate single points of failure and gracefully handle various failure scenarios.',
      diagrams: [],
      realWorldExamples: [
        'Netflix: Chaos engineering and multi-region deployment',
        'Amazon: Multiple availability zones and auto-scaling',
        'Google: Global load balancing and redundant data centers',
        'Uber: Circuit breakers and graceful degradation',
        'Facebook: Disaster recovery and backup systems'
      ],
      commonMistakes: [
        'Not planning for cascading failures',
        'Over-engineering availability for non-critical systems',
        'Ignoring human factors in system failures',
        'Not testing failure scenarios regularly',
        'Assuming redundancy automatically means high availability'
      ],
      interviewTips: [
        'Discuss specific availability patterns and their use cases',
        'Explain how to calculate system availability',
        'Consider both planned and unplanned downtime',
        'Mention monitoring and alerting strategies',
        'Discuss cost implications of high availability'
      ],
      relatedTopics: ['reliability-availability', 'load-balancer', 'clustering', 'circuit-breaker'],
      tradeoffs: {
        considerations: [
          'Cost vs availability level trade-offs',
          'Complexity vs reliability benefits',
          'Performance impact of redundancy',
          'Operational overhead of high availability systems'
        ],
        prosAndCons: {
          pros: [
            'Redundancy: Protection against single points of failure',
            'Failover: Automatic recovery from failures',
            'Load balancing: Better resource utilization and availability',
            'Circuit breakers: Prevent system-wide failures'
          ],
          cons: [
            'Increased cost: More infrastructure and operational overhead',
            'Added complexity: More components to manage and monitor',
            'Performance impact: Redundancy can add latency',
            'False sense of security: Patterns don\'t guarantee availability'
          ]
        }
      },
      implementation: {
        technologies: ['Load Balancers', 'Auto Scaling Groups', 'Health Checks', 'Circuit Breakers', 'Monitoring Systems'],
        algorithms: ['Failover algorithms', 'Health checking', 'Load balancing algorithms'],
        protocols: ['HTTP health checks', 'Heartbeat protocols', 'Keep-alive']
      },
      benchmarks: [
        { metric: 'Failover Time', value: '<30 seconds', context: 'Typical automatic failover' },
        { metric: 'Health Check Interval', value: '30-60 seconds', context: 'Standard monitoring frequency' },
        { metric: 'Recovery Time', value: '<5 minutes', context: 'Target recovery time objective' }
      ]
    }
  }
];
