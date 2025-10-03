import { Database, Globe, Hash, Shuffle, Network, Server, HardDrive } from 'lucide-react';
import { Topic } from '../../types';

export const componentsTopics: Topic[] = [
  {
    id: 'caching',
    title: 'Caching',
    category: 'Components',
    icon: Database,
    color: 'from-cyan-500 to-blue-500',
    description: 'Storing frequently accessed data for quick retrieval',
    content: {
      overview: 'A cache\'s primary purpose is to increase data retrieval performance by reducing the need to access the underlying slower storage layer. Trading off capacity for speed, a cache typically stores a subset of data transiently.',
      keyPoints: [
        'Cache hit: Content successfully served from cache (hot, warm, cold)',
        'Cache miss: Content not found in cache, must be retrieved from storage',
        'Locality of reference: Recently requested data likely to be requested again',
        'Memory hierarchy: L1, L2, L3 caches with different speeds',
        'Write-through cache: Data written to cache and database simultaneously',
        'Write-around cache: Write directly to database, bypassing cache',
        'Write-back cache: Write only to cache, async sync to database',
        'Eviction policies: FIFO, LIFO, LRU, MRU, LFU, Random Replacement'
      ],
      example: 'Database caching, CDN for content delivery, DNS caching, API caching. Redis for session storage, Memcached for computed results.',
      detailedExplanation: 'Caches take advantage of the locality of reference principle - recently requested data is likely to be requested again. Like computer memory, caches store data in a hierarchy starting at L1 and progressing sequentially. Cache invalidation is critical for data consistency but challenging to implement correctly.',
      diagrams: ['caching', 'write-through-cache', 'write-around-cache', 'write-back-cache', 'distributed-cache', 'global-cache'],
      realWorldExamples: [
        'Redis: In-memory data structure store for caching and sessions',
        'Memcached: High-performance distributed memory caching system',
        'Amazon ElastiCache: Managed Redis and Memcached service',
        'Cloudflare: Global CDN with edge caching capabilities',
        'Varnish: HTTP accelerator for web applications'
      ],
      commonMistakes: [
        'Not implementing proper cache invalidation strategies',
        'Caching data that changes frequently',
        'Using cache when access time equals primary storage time',
        'Not considering cache coherence in distributed systems',
        'Over-caching leading to memory pressure and evictions'
      ],
      interviewTips: [
        'Explain different cache invalidation strategies and their trade-offs',
        'Discuss cache eviction policies and when to use each',
        'Consider cache placement at different system layers',
        'Mention cache coherence challenges in distributed systems',
        'Discuss when NOT to use caching'
      ],
      relatedTopics: ['cdn', 'databases', 'performance', 'distributed-systems'],
      tradeoffs: {
        considerations: [
          'Write-through: Fast retrieval, complete consistency, but higher write latency',
          'Write-around: Reduced latency, but cache misses for recently written data',
          'Write-back: Low latency, high throughput, but risk of data loss',
          'Cache size vs hit ratio: Larger cache improves hit ratio but costs more'
        ],
        prosAndCons: {
          pros: [
            'Improves performance and reduces latency significantly',
            'Reduces load on databases and backend systems',
            'Increases read throughput for frequently accessed data',
            'Can reduce network costs and bandwidth usage'
          ],
          cons: [
            'Cache invalidation complexity and potential inconsistency',
            'Additional memory and infrastructure costs',
            'Not helpful for low repetition or frequently changing data',
            'Can become a bottleneck if not properly distributed'
          ]
        }
      },
      implementation: {
        technologies: ['Redis', 'Memcached', 'Amazon ElastiCache', 'Aerospike', 'Hazelcast'],
        algorithms: ['LRU', 'LFU', 'FIFO', 'Random Replacement', 'Clock Algorithm'],
        protocols: ['HTTP caching headers', 'Cache-Control', 'ETag', 'Last-Modified']
      },
      benchmarks: [
        { metric: 'Cache Hit Ratio', value: '80-95%', context: 'Well-configured cache performance' },
        { metric: 'Cache Response Time', value: '<1ms', context: 'In-memory cache access time' },
        { metric: 'Eviction Rate', value: '<5%', context: 'Healthy cache eviction percentage' }
      ]
    }
  },
  {
    id: 'cdn',
    title: 'Content Delivery Network',
    category: 'Components',
    icon: Globe,
    color: 'from-violet-500 to-purple-500',
    description: 'Global distribution of static content',
    content: {
      overview: 'A content delivery network (CDN) is a geographically distributed group of servers that work together to provide fast delivery of internet content, reducing bandwidth costs and improving security.',
      keyPoints: [
        'Edge servers: Geographically distributed servers closer to users',
        'Origin server: Contains original versions of content',
        'Push CDNs: Receive new content when changes occur on server',
        'Pull CDNs: Cache updated based on request from client',
        'Edge locations: Multiple geographical locations for content caching',
        'Content availability: Increased redundancy and fault tolerance',
        'Bandwidth reduction: Reduces load on origin servers',
        'Global distribution: Serves users from nearest edge location'
      ],
      example: 'Netflix uses custom CDN (Open Connect) for 95% of traffic. Amazon CloudFront serves static assets globally. News websites use CDN for images and articles.',
      detailedExplanation: 'CDNs store cached versions of content in multiple geographical locations known as edge locations. When a user requests content, it\'s served from the nearest edge location rather than the origin server, significantly reducing latency and improving user experience while reducing origin server load.',
      diagrams: ['cdn-map', 'cdn'],
      realWorldExamples: [
        'Netflix Open Connect: Custom CDN with 95% traffic served from edge',
        'Amazon CloudFront: Global CDN integrated with AWS services',
        'Cloudflare: CDN with DDoS protection and edge computing',
        'Fastly: Real-time CDN with instant cache purging',
        'Akamai: One of the largest CDN networks globally'
      ],
      commonMistakes: [
        'Not considering CDN costs vs bandwidth savings',
        'Using push CDN for high-traffic, frequently changing content',
        'Using pull CDN for low-traffic, static content',
        'Not implementing proper cache invalidation strategies',
        'Ignoring geographic restrictions and content blocking'
      ],
      interviewTips: [
        'Explain the difference between push and pull CDNs',
        'Discuss edge locations and their impact on performance',
        'Consider CDN selection criteria for different use cases',
        'Mention CDN integration with other system components',
        'Compare CDN costs with bandwidth and performance benefits'
      ],
      relatedTopics: ['caching', 'load-balancing', 'global-distribution', 'performance'],
      tradeoffs: {
        considerations: [
          'Push CDN: Predictable content distribution vs storage costs',
          'Pull CDN: Adaptive caching vs initial request latency',
          'Global distribution: Reduced latency vs increased complexity',
          'CDN costs: Service fees vs reduced bandwidth and server costs'
        ],
        prosAndCons: {
          pros: [
            'Significantly reduced latency for global users',
            'Reduced load and bandwidth costs on origin servers',
            'Improved availability and redundancy',
            'Better user experience with faster content delivery'
          ],
          cons: [
            'Additional costs for CDN services',
            'Cache invalidation complexity across edge locations',
            'Potential geographic restrictions and content blocking',
            'Dependency on CDN provider availability and performance'
          ]
        }
      },
      implementation: {
        technologies: ['Amazon CloudFront', 'Cloudflare', 'Fastly', 'Akamai', 'Google Cloud CDN'],
        algorithms: ['Content routing', 'Cache invalidation', 'Geographic load balancing', 'Edge optimization'],
        protocols: ['HTTP/HTTPS', 'HTTP/2', 'TLS/SSL', 'DNS-based routing']
      },
      benchmarks: [
        { metric: 'Latency Reduction', value: '50-90%', context: 'vs serving from origin server' },
        { metric: 'Cache Hit Ratio', value: '85-95%', context: 'Well-configured CDN performance' },
        { metric: 'Bandwidth Savings', value: '60-80%', context: 'Reduction in origin server bandwidth' }
      ]
    }
  },
  {
    id: 'consistent-hashing',
    title: 'Consistent Hashing',
    category: 'Components',
    icon: Hash,
    color: 'from-indigo-500 to-purple-500',
    description: 'Distributing data across nodes with minimal reorganization',
    content: {
      overview: 'Consistent Hashing is a distributed hashing scheme that operates independently of the number of nodes in a distributed hash table by assigning them a position on an abstract circle, or hash ring.',
      keyPoints: [
        'Traditional hashing problem: key % n servers (all keys remapped when n changes)',
        'Consistent hashing solution: only k/n keys require re-distribution',
        'Hash ring: Output range 0...m-1 represented on circle',
        'Virtual nodes (VNodes): Each physical node mapped to multiple positions',
        'Load distribution: Virtual nodes ensure more even load distribution',
        'Data replication: Each data item replicated on multiple N nodes',
        'Clockwise traversal: Find first server clockwise from key position',
        'Fault tolerance: System continues operating when nodes fail'
      ],
      example: 'Amazon DynamoDB: Uses consistent hashing for data partitioning. Apache Cassandra: Uses virtual nodes for better load distribution.',
      detailedExplanation: 'Virtual nodes are essential for ensuring even load distribution. Instead of assigning a single position to a node, the hash range is divided into multiple smaller ranges, and each physical node is assigned several of these smaller ranges. This minimizes changes to a node\'s assigned range and speeds up re-balancing.',
      diagrams: ['consistent-hashing', 'virtual-nodes'],
      realWorldExamples: [
        'Amazon DynamoDB: Data partitioning across multiple storage hosts',
        'Apache Cassandra: Uses virtual nodes for automatic data distribution',
        'Redis Cluster: Consistent hashing for key distribution',
        'Riak: Distributed key-value store with consistent hashing',
        'Chord DHT: Peer-to-peer distributed hash table implementation'
      ],
      commonMistakes: [
        'Not implementing virtual nodes leading to uneven distribution',
        'Choosing poor hash functions that create hotspots',
        'Not considering replication factor in hash ring design',
        'Ignoring the impact of node failures on data availability',
        'Not planning for hash ring rebalancing during scaling'
      ],
      interviewTips: [
        'Explain the problem with traditional hashing in distributed systems',
        'Describe how virtual nodes improve load distribution',
        'Discuss data replication and fault tolerance benefits',
        'Mention specific systems that use consistent hashing',
        'Consider the trade-offs between simplicity and even distribution'
      ],
      relatedTopics: ['distributed-systems', 'load-balancing', 'data-partitioning', 'replication'],
      tradeoffs: {
        considerations: [
          'Virtual nodes: Better distribution vs increased complexity',
          'Replication factor: Higher availability vs storage overhead',
          'Hash ring size: Granularity vs memory usage',
          'Rebalancing: Minimal data movement vs coordination complexity'
        ],
        prosAndCons: {
          pros: [
            'Minimal data reorganization when nodes added/removed',
            'Facilitates partitioning and replication across nodes',
            'Enables scalability and high availability',
            'Reduces hotspots with proper virtual node implementation'
          ],
          cons: [
            'Increased complexity compared to simple hashing',
            'Potential for cascading failures during rebalancing',
            'Load distribution can still be uneven without virtual nodes',
            'Key management complexity when nodes fail transiently'
          ]
        }
      },
      implementation: {
        technologies: ['Apache Cassandra', 'Amazon DynamoDB', 'Redis Cluster', 'Riak', 'Chord DHT'],
        algorithms: ['SHA-1 hashing', 'Virtual node mapping', 'Ring traversal', 'Data replication'],
        protocols: ['Gossip protocol', 'Anti-entropy repair', 'Merkle trees']
      },
      benchmarks: [
        { metric: 'Key Redistribution', value: '<10%', context: 'When adding/removing nodes' },
        { metric: 'Virtual Nodes', value: '100-500 per node', context: 'Typical VNode configuration' },
        { metric: 'Lookup Time', value: 'O(log N)', context: 'Time complexity for key location' }
      ]
    }
  },
  {
    id: 'data-partitioning',
    title: 'Data Partitioning & Sharding',
    category: 'Components',
    icon: Shuffle,
    color: 'from-teal-500 to-cyan-500',
    description: 'Breaking large databases into smaller, manageable pieces',
    content: {
      overview: 'Data partitioning breaks up large databases into smaller parts to improve manageability, performance, and availability.',
      keyPoints: [
        'Horizontal partitioning: Different rows in different tables (range-based)',
        'Vertical partitioning: Different columns in different tables (feature-based)',
        'Directory-based: Lookup service maps keys to servers',
        'Hash-based: Hash function determines partition',
        'Range-based: Partition by key ranges',
        'Challenges: Joins, referential integrity, rebalancing'
      ],
      example: 'Instagram: Partition photos by UserID. Twitter: Partition tweets by TweetID with timestamp. Uber: Partition by geographic regions.',
      tradeoffs: {
        considerations: ['Hash-based: Good distribution but fixed server count', 'Range-based: Easy range queries but hot spots possible', 'Directory-based: Flexible but adds complexity and SPOF']
      }
    }
  },
  {
    id: 'proxies',
    title: 'Proxies & Reverse Proxies',
    category: 'Components',
    icon: Network,
    color: 'from-slate-500 to-gray-500',
    description: 'Intermediate servers for request handling and caching',
    content: {
      overview: 'Proxy servers act as intermediaries for requests from clients seeking resources from other servers.',
      keyPoints: [
        'Forward proxy: Client-side proxy (hides client identity)',
        'Reverse proxy: Server-side proxy (hides server details)',
        'Benefits: Caching, load balancing, SSL termination',
        'Request filtering and transformation',
        'Anonymous proxy: Hides client IP address',
        'Transparent proxy: Visible to client, used for caching'
      ],
      example: 'Nginx as reverse proxy for load balancing. Cloudflare as CDN proxy. Corporate proxies for content filtering.',
      tradeoffs: {
        considerations: ['Additional network hop adds latency', 'Single point of failure if not redundant', 'Caching benefits vs complexity']
      }
    }
  },
  {
    id: 'geohashing-quadtrees',
    title: 'Geohashing & Quadtrees',
    category: 'Components',
    icon: Hash,
    color: 'from-purple-500 to-blue-500',
    description: 'Spatial data structures for location-based services',
    content: {
      overview: 'Geohashing and quadtrees are spatial data structures used to efficiently store, query, and index location-based data.',
      keyPoints: [
        'Geohashing: Encode latitude/longitude into short alphanumeric strings',
        'Quadtree: Tree data structure for 2D spatial partitioning',
        'Spatial indexing: Efficient range queries for geographic data',
        'Proximity search: Find nearby points efficiently',
        'Hierarchical structure: Quadtrees divide space recursively',
        'Geohash precision: Longer hashes provide higher precision',
        'Load balancing: Distribute geographic data across servers',
        'Caching: Cache results for common geographic queries'
      ],
      example: 'Uber: Uses geohashing to find nearby drivers. Quadtrees partition city into regions for efficient driver-rider matching.',
      detailedExplanation: 'Geohashing converts 2D coordinates into 1D strings that preserve spatial locality - nearby locations have similar hash prefixes. Quadtrees recursively divide 2D space into quadrants, enabling efficient spatial queries. Both are essential for location-based services requiring fast proximity searches.',
      diagrams: ['consistent-hashing', 'virtual-nodes'],
      realWorldExamples: [
        'Uber: Geohashing for driver location indexing and matching',
        'Pokemon Go: Quadtrees for efficient spatial queries of game objects',
        'Foursquare: Geohashing for venue discovery and check-ins',
        'Google Maps: Spatial indexing for points of interest',
        'Yelp: Location-based business search using spatial data structures'
      ],
      commonMistakes: [
        'Choosing wrong geohash precision for use case',
        'Not considering geohash boundary issues',
        'Inefficient quadtree rebalancing strategies',
        'Not caching frequently accessed spatial queries',
        'Ignoring the spherical nature of Earth in calculations'
      ],
      interviewTips: [
        'Explain how geohashing preserves spatial locality',
        'Discuss quadtree construction and query algorithms',
        'Consider precision vs storage trade-offs in geohashing',
        'Mention boundary cases and edge conditions',
        'Compare with other spatial data structures (R-trees, KD-trees)'
      ],
      relatedTopics: ['databases', 'indexing', 'caching', 'location-services'],
      tradeoffs: {
        considerations: [
          'Geohash precision vs storage requirements',
          'Quadtree depth vs query performance',
          'Memory usage vs query speed',
          'Update frequency vs index maintenance cost'
        ],
        prosAndCons: {
          pros: [
            'Efficient proximity searches and range queries',
            'Scalable spatial indexing for large datasets',
            'Hierarchical structure enables multi-resolution queries',
            'Good cache locality for geographic data'
          ],
          cons: [
            'Complex implementation and maintenance',
            'Boundary issues with geohashing',
            'Quadtree rebalancing can be expensive',
            'Not optimal for all types of spatial queries'
          ]
        }
      },
      implementation: {
        technologies: ['PostGIS', 'MongoDB Geospatial', 'Elasticsearch Geo', 'Redis Geo', 'Solr Spatial'],
        algorithms: ['Geohash encoding', 'Quadtree insertion/deletion', 'Spatial range queries', 'Nearest neighbor search'],
        protocols: ['GeoJSON', 'WKT (Well-Known Text)', 'Spatial SQL extensions']
      },
      benchmarks: [
        { metric: 'Geohash Precision', value: '5-12 characters', context: 'Typical precision for location services' },
        { metric: 'Quadtree Query', value: 'O(log n)', context: 'Time complexity for spatial queries' },
        { metric: 'Proximity Search', value: '<10ms', context: 'Response time for nearby location queries' }
      ]
    }
  },
  {
    id: 'virtualization-containerization',
    title: 'Virtual Machines and Containers',
    category: 'Components',
    icon: Server,
    color: 'from-blue-500 to-green-500',
    description: 'Virtualization technologies for resource isolation and efficiency',
    content: {
      overview: 'Virtual Machines (VMs) and Containers are virtualization technologies that enable running multiple isolated environments on shared hardware, with different approaches to resource sharing and isolation.',
      keyPoints: [
        'Virtual Machine: Virtual environment with own CPU, memory, network, storage',
        'Hypervisor: Software that separates machine resources from hardware',
        'Container: Standard unit of software packaging code and dependencies',
        'Shared OS kernel: Containers share host OS, VMs have separate OS',
        'Resource isolation: VMs provide stronger isolation, containers are lightweight',
        'Portability: Containers run consistently across different environments',
        'Orchestration: Kubernetes for containers, vSphere for VMs',
        'Use cases: VMs for legacy apps, containers for cloud-native applications'
      ],
      example: 'VM: Windows application running on Linux host via hypervisor. Container: Microservice packaged with dependencies, runs on any Docker-compatible host.',
      detailedExplanation: 'VMs virtualize hardware and include full operating system, providing strong isolation but higher resource overhead. Containers virtualize the operating system and share the kernel, providing lightweight isolation with better resource efficiency. Choice depends on isolation requirements, resource constraints, and application architecture.',
      diagrams: ['virtualization-vs-containerization'],
      realWorldExamples: [
        'VMware vSphere: Enterprise VM virtualization platform',
        'Docker: Popular containerization platform for applications',
        'Kubernetes: Container orchestration for production deployments',
        'AWS EC2: Virtual machines in the cloud with various instance types',
        'Google Cloud Run: Serverless container platform'
      ],
      commonMistakes: [
        'Using VMs when containers would be more efficient',
        'Not considering security implications of shared kernel in containers',
        'Over-provisioning VMs leading to resource waste',
        'Not implementing proper container orchestration for production',
        'Ignoring networking and storage considerations in virtualized environments'
      ],
      interviewTips: [
        'Explain the key differences between VMs and containers',
        'Discuss when to use VMs vs containers based on requirements',
        'Consider orchestration and management aspects',
        'Mention specific virtualization technologies and platforms',
        'Compare resource efficiency and isolation trade-offs'
      ],
      relatedTopics: ['cloud-computing', 'orchestration', 'microservices', 'resource-management'],
      tradeoffs: {
        considerations: [
          'VM isolation vs container efficiency',
          'Resource overhead vs security isolation',
          'Management complexity vs operational flexibility',
          'Legacy compatibility vs modern architecture'
        ],
        prosAndCons: {
          pros: [
            'VMs: Strong isolation, legacy OS support, mature ecosystem',
            'Containers: Lightweight, fast startup, consistent deployment',
            'Both: Better resource utilization than bare metal',
            'Both: Enable cloud computing and elastic scaling'
          ],
          cons: [
            'VMs: Higher resource overhead, slower startup times',
            'Containers: Shared kernel security concerns, Linux-centric',
            'Both: Additional complexity in management and orchestration',
            'Both: Potential performance overhead from virtualization'
          ]
        }
      },
      implementation: {
        technologies: ['VMware', 'Docker', 'Kubernetes', 'Hyper-V', 'KVM', 'Podman'],
        algorithms: ['Resource scheduling', 'Load balancing', 'Auto-scaling', 'Health checking'],
        protocols: ['Container runtime interfaces', 'VM management protocols', 'Orchestration APIs']
      },
      benchmarks: [
        { metric: 'VM Startup Time', value: '30-300 seconds', context: 'Depending on OS and resources' },
        { metric: 'Container Startup', value: '<5 seconds', context: 'Typical container startup time' },
        { metric: 'Resource Overhead', value: 'VM: 10-30%, Container: 1-5%', context: 'vs bare metal performance' }
      ]
    }
  },
  {
    id: 'storage-systems',
    title: 'Storage Systems',
    category: 'Components',
    icon: HardDrive,
    color: 'from-gray-500 to-slate-500',
    description: 'Data storage technologies and architectures',
    content: {
      overview: 'Storage systems provide mechanisms for retaining data permanently or temporarily. Different storage types serve different use cases with varying performance, durability, and cost characteristics.',
      keyPoints: [
        'RAID 0: Striping for performance, no redundancy',
        'RAID 1: Mirroring for redundancy, 50% capacity utilization',
        'RAID 5: Striping with parity, requires minimum 3 drives',
        'RAID 6: Striping with double parity, tolerates 2 drive failures',
        'RAID 10: Combines striping and mirroring for performance and redundancy',
        'File storage: Hierarchical directory structure, NAS systems',
        'Block storage: Data divided into blocks with unique identifiers',
        'Object storage: Files broken into objects in single repository'
      ],
      example: 'File storage: Network file shares for documents. Block storage: Database storage, VM disks. Object storage: Amazon S3 for web assets, backups.',
      detailedExplanation: 'Storage systems range from traditional RAID configurations for local redundancy to distributed object storage for web-scale applications. The choice depends on performance requirements, durability needs, access patterns, and cost considerations.',
      diagrams: [],
      realWorldExamples: [
        'Amazon S3: Object storage for web applications and backup',
        'Amazon EBS: Block storage for EC2 instances and databases',
        'Google Cloud Storage: Multi-regional object storage',
        'NetApp: Enterprise NAS and SAN storage solutions',
        'Ceph: Open-source distributed storage system'
      ],
      commonMistakes: [
        'Not considering RAID rebuild time and failure probability',
        'Using inappropriate storage type for access patterns',
        'Not implementing proper backup and disaster recovery',
        'Ignoring storage performance characteristics and bottlenecks',
        'Not planning for storage capacity growth and scaling'
      ],
      interviewTips: [
        'Explain different RAID levels and their use cases',
        'Discuss file vs block vs object storage characteristics',
        'Consider storage performance and durability requirements',
        'Mention cloud storage services and their features',
        'Compare storage costs and performance trade-offs'
      ],
      relatedTopics: ['databases', 'backup-strategies', 'cloud-storage', 'performance'],
      tradeoffs: {
        considerations: [
          'Performance vs durability: RAID 0 fast but no redundancy',
          'Capacity vs redundancy: RAID 1 wastes 50% capacity for mirroring',
          'Local vs distributed storage: Performance vs scalability',
          'Storage cost vs access speed: Hot vs cold storage tiers'
        ],
        prosAndCons: {
          pros: [
            'RAID: Local redundancy and performance optimization',
            'Object storage: Massive scalability and durability',
            'Block storage: High performance for databases and applications',
            'File storage: Familiar hierarchical organization'
          ],
          cons: [
            'RAID: Limited to single machine, rebuild time vulnerability',
            'Object storage: Higher latency, eventual consistency',
            'Block storage: More complex management, limited scalability',
            'File storage: Performance limitations, single point of failure'
          ]
        }
      },
      implementation: {
        technologies: ['Amazon S3', 'Amazon EBS', 'Google Cloud Storage', 'Azure Blob Storage', 'NetApp'],
        algorithms: ['RAID algorithms', 'Erasure coding', 'Replication strategies', 'Tiering algorithms'],
        protocols: ['NFS', 'iSCSI', 'S3 API', 'Swift API', 'HDFS']
      },
      benchmarks: [
        { metric: 'RAID 0 Performance', value: '2x single drive', context: 'Striping performance improvement' },
        { metric: 'Object Storage Durability', value: '99.999999999%', context: 'Amazon S3 durability guarantee' },
        { metric: 'Block Storage IOPS', value: '10K-100K IOPS', context: 'High-performance block storage' }
      ]
    }
  }
];
