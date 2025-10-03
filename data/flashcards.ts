export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  category: string;
}

export const flashcards: Flashcard[] = [
  // Cache Category
  { id: 'cache-1', term: 'Cache aside', definition: 'Application is responsible for reading and writing to the DB (using write-through or write-back policy). The cache doesn\'t interact with the storage directly.', category: 'Cache' },
  { id: 'cache-2', term: 'Cache aside vs. read-through', definition: 'Cache aside: Data model can be different from DB. Read-through: Same data model as DB, and can use the refresh-ahead pattern.', category: 'Cache' },
  { id: 'cache-3', term: 'Cache eviction policy', definition: 'LRU (Least Recently Used), LFU (Least Frequently Used), FIFO (First-In, First-Out).', category: 'Cache' },
  { id: 'cache-4', term: 'Cache locations', definition: 'Client caching, CDN, in-memory, distributed cache, database caching (query or object).', category: 'Cache' },
  { id: 'cache-5', term: 'Cache: refresh-ahead', definition: 'Cache to automatically refresh any recently accessed entry prior to its expiration. Used with read-through cache. Pro: reduced latency. Con: not accurately predicting which items are likely to be needed.', category: 'Cache' },
  { id: 'cache-6', term: 'Cache: write through vs. write back', definition: 'Main difference is consistency. Write through: Write to cache and DB in a single DB transaction, then return. Write back: Write to cache, return, and asynchronously store in DB.', category: 'Cache' },
  { id: 'cache-7', term: 'Four main distributed cache benefits', definition: 'Improve read latency, can improve availability (e.g., DB unavailable), save computation time, independently scalable.', category: 'Cache' },
  { id: 'cache-8', term: 'Main metric for cache', definition: 'Cache hit ratio: hits / total accesses.', category: 'Cache' },
  { id: 'cache-9', term: 'Read-through cache', definition: 'Sits in-line with the DB and acts as a single entry point.', category: 'Cache' },
  { id: 'cache-10', term: 'When to use a cache', definition: 'To speed up reads, or when the response is complex to compute.', category: 'Cache' },

  // Cloud Category
  { id: 'cloud-1', term: 'CDN (Content Delivery Network)', definition: 'Network of geographically dispersed servers used to deliver static content (images, CSS, Javascript files, etc.). Push CDN: we provide content. Pull CDN: CDN pulls content (easier to handle).', category: 'Cloud' },

  // Database Category
  { id: 'db-1', term: '3 main reasons to partition data', definition: 'Scalability, improve performance of write-heavy systems (usually), dataset doesn\'t fit into a single node.', category: 'DB' },
  { id: 'db-2', term: 'ACID property', definition: 'Atomic: all transaction succeeds or none does. Consistency: from one valid state to another. Isolation: concurrent transactions appear to execute sequentially. Durability: once committed, changes are permanent.', category: 'DB' },
  { id: 'db-3', term: 'CAP theorem', definition: 'A distributed system can satisfy at most two of the three properties: Consistency, Availability, and Partition Tolerance.', category: 'DB' },
  { id: 'db-4', term: 'Consensus', definition: 'Agreement among a group of distributed processes on a single data value or state (e.g., Raft, Paxos).', category: 'DB' },
  { id: 'db-5', term: 'CQRS', definition: 'Command Query Responsibility Segregation: separates the model for updating information (Command) from the model for reading information (Query).', category: 'DB' },
  { id: 'db-6', term: 'Event sourcing', definition: 'Storing all changes to the application state as a sequence of immutable events. The current state is derived by replaying the events.', category: 'DB' },
  { id: 'db-7', term: 'Partitioning (sharding)', definition: 'Splitting a large database into smaller, more manageable pieces (shards) across multiple machines.', category: 'DB' },
  { id: 'db-8', term: 'Quorum', definition: 'The minimum number of nodes that must participate in a read or write operation to guarantee consistency.', category: 'DB' },
  { id: 'db-9', term: 'Replication vs. partition: impacts', definition: 'Replication: Increases availability and read throughput. Partition: Increases write throughput and allows for larger datasets (scalability).', category: 'DB' },
  { id: 'db-10', term: 'Transaction', definition: 'A single logical unit of work that accesses and potentially modifies data, usually adhering to ACID properties.', category: 'DB' },

  // Design Category
  { id: 'design-1', term: 'Bloom filter', definition: 'Probabilistic, memory-efficient data structure for approximating the content of a set. Can definitively tell if a key is not in the set (false positives possible, false negatives impossible).', category: 'Design' },
  { id: 'design-2', term: 'Consistent hashing', definition: 'A hashing scheme that minimizes data movement when nodes (servers/shards) are added or removed (only 1/n percent of keys are rebalanced). Solutions: ring hash with virtual nodes, or jump hash.', category: 'Design' },
  { id: 'design-3', term: 'Exactly-once delivery', definition: 'Impossible to achieve in a general, failure-prone distributed system. Can achieve exactly-once processing using deduplication or idempotent consumers.', category: 'Design' },
  { id: 'design-4', term: 'Idempotent', definition: 'The property of an operation where executing it multiple times has the same effect as executing it once (essential for safe retries).', category: 'Design' },
  { id: 'design-5', term: 'Load balancing', definition: 'Distributes incoming network traffic across multiple backend servers to maximize throughput and ensure high availability.', category: 'Design' },
  { id: 'design-6', term: 'Microservices: pros and cons', definition: 'Pros: Independent deployment, technology diversity, better fault isolation. Cons: Distributed transactions are hard, operational overhead, complex debugging.', category: 'Design' },
  { id: 'design-7', term: 'Scalability', definition: 'The ability of a system to handle an increasing amount of work (e.g., increased load, data size) by adding resources.', category: 'Design' },
  { id: 'design-8', term: 'Throughput', definition: 'The rate at which the system can process work (e.g., requests per second, data processed per hour).', category: 'Design' },

  // HTTP Category
  { id: 'http-1', term: '301 vs. 302', definition: '301: Redirect permanently (search engines update link). 302: Redirect temporarily (search engines do not update link).', category: 'HTTP' },
  { id: 'http-2', term: 'HTTP', definition: 'Request/response protocol used to encode and transport information between a client and a server. Stateless (each request is executed independently).', category: 'HTTP' },
  { id: 'http-3', term: 'HTTP keep-alive', definition: 'Allows a single TCP connection to remain open for multiple HTTP requests, reducing latency for subsequent requests (default in HTTP/1.1).', category: 'HTTP' },

  // Kafka Category
  { id: 'kafka-1', term: 'Offset (Kafka)', definition: 'A strictly increasing, unique identifier assigned to each message per partition.', category: 'Kafka' },
  { id: 'kafka-2', term: 'Partition (Kafka)', definition: 'Topics are divided into partitions. A partition is an ordered, immutable log of messages. Ordering is guaranteed per partition, not per topic.', category: 'Kafka' },

  // Network Category
  { id: 'network-1', term: 'Bandwidth', definition: 'The maximum amount of data that can be transmitted over a network connection in a given amount of time (bits per second).', category: 'Network' },
  { id: 'network-2', term: 'DNS (Domain Name System)', definition: 'A hierarchical, decentralized naming system for computers, services, or any resource connected to the Internet.', category: 'Network' },
  { id: 'network-3', term: 'Layer 4 vs. layer 7 load balancer', definition: 'Layer 4 (Transport): Bases routing decisions on IP address and port (fastest, simplest). Layer 7 (Application): Bases routing on application-level data (e.g., HTTP headers, URL path, cookies) (more complex, supports SSL termination).', category: 'Network' },
  { id: 'network-4', term: 'Websocket', definition: 'A persistent, two-way (full-duplex) communication protocol over a single, long-lived TCP connection. Used for real-time applications.', category: 'Network' },

  // Reliability Category
  { id: 'reliability-1', term: 'Circuit breaker', definition: 'A pattern that prevents an application from repeatedly trying to execute an operation that is likely to fail (e.g., a connection to a downed service), allowing it to recover and preventing resource exhaustion.', category: 'Reliability' },
  { id: 'reliability-2', term: 'Exponential backoff', definition: 'An algorithm that gradually increases the wait time between retries after repeated failures, reducing the load on a struggling service.', category: 'Reliability' },
  { id: 'reliability-3', term: 'Cascading failure', definition: 'A failure in one part of a system triggers failures in other dependent parts, leading to a widespread or total system outage.', category: 'Reliability' },

  // Security Category
  { id: 'security-1', term: 'Authentication', definition: 'Process of determining whether someone or something is who or what it declares itself to be (e.g., checking a password).', category: 'Security' },
  { id: 'security-2', term: 'OAuth 2', definition: 'A standard for access delegation (not authentication). The client gets a token from an authorization server, then uses that token to access a resource server.', category: 'Security' },
  { id: 'security-3', term: 'What does digital signature provide', definition: 'Integrity (data has not been tampered with) and Authentication (proves the sender\'s identity).', category: 'Security' }
];

export const flashcardCategories = [
  'All',
  'Cache',
  'Cloud', 
  'DB',
  'Design',
  'HTTP',
  'Kafka',
  'Network',
  'Reliability',
  'Security'
];
