import { Link, FileText, Image, MessageSquare, Video, Search, Zap, Globe, Car, Phone } from 'lucide-react';
import { CaseStudy } from '../../types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'pastebin',
    title: 'Design Pastebin',
    category: 'Case Studies',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'Medium',
    description: 'Design a service like Pastebin where users can store and share text',
    content: {
      overview: 'Design a service like Pastebin where users can store and share text',
      requirements: [
        'Users can upload text and get a unique URL',
        'Users can access text via the URL',
        'Links expire after a period (optional)',
        '10M users, 1M writes/day, 10:1 read/write ratio',
        'Text size: avg 10KB, max 10MB'
      ],
      estimations: 'Storage: 1M writes/day * 10KB * 365 days * 5 years = 18TB. Bandwidth: Write 120KB/s, Read 1.2MB/s. Memory: Cache 20GB',
      components: [
        'Client to Load Balancer to Web Servers to Application Servers',
        'Application Servers to Write API / Read API',
        'SQL Database: Store metadata (paste_id, user_id, expire_time, created_at)',
        'Object Store (S3): Store actual paste content',
        'Cache (Redis): Cache popular pastes',
        'Analytics Service: Track views, user behavior'
      ],
      keyDecisions: [
        'Generate unique ID: Base62 encoding of auto-increment counter',
        'Use SQL for metadata (structured, relationships)',
        'Use Object Store for content (cheap, scalable)',
        'Cache hot pastes in Redis (20% of pastes get 80% of traffic)',
        'CDN for serving popular public pastes'
      ],
      diagrams: []
    }
  },
  {
    id: 'twitter',
    title: 'Design Twitter',
    category: 'Case Studies',
    icon: MessageSquare,
    color: 'from-sky-500 to-blue-500',
    difficulty: 'Hard',
    description: 'Design a social media platform like Twitter',
    content: {
      overview: 'Design a social media platform like Twitter',
      requirements: [
        'Users can post tweets (280 chars)',
        'Users can follow other users',
        'Users see timeline of tweets from people they follow',
        'Users can like, retweet, reply',
        '300M users, 150M DAU',
        '5000 tweets/sec, 50k read/sec'
      ],
      estimations: 'Storage: 5000 tweets/s * 280 bytes * 5 years = 22TB. Bandwidth: Write 1.4MB/s, Read 14MB/s. Memory: Timeline cache 4.2TB (distributed)',
      components: [
        'Client to CDN to Load Balancer to API Gateway',
        'Write API: Post tweet, Follow user, Like',
        'Read API: Timeline, User profile, Search',
        'User Service: Manage users, followers (SQL)',
        'Tweet Service: Store tweets (Cassandra)',
        'Timeline Service: Pre-compute timelines (Redis)',
        'Fanout Service: Distribute tweets to followers',
        'Search Service: Tweet search (Elasticsearch)',
        'Media Service: Store images/videos (S3 + CDN)'
      ],
      keyDecisions: [
        'Fanout on write: Pre-compute timelines when tweet is posted',
        'Fanout on read: Compute timeline when user requests (for celebrities)',
        'Hybrid: Fanout for regular users, on-read for celebrities',
        'Use Redis for timeline cache (sorted set by timestamp)',
        'Use Cassandra for tweet storage (write-optimized)',
        'Separate service for media (images/videos) with CDN'
      ],
      diagrams: ['twitter-datamodel', 'newsfeed-pull-model', 'newsfeed-push-model', 'twitter-advanced-design']
    }
  },
  {
    id: 'url-shortener',
    title: 'Design URL Shortener',
    category: 'Case Studies',
    icon: Link,
    color: 'from-green-500 to-emerald-500',
    difficulty: 'Medium',
    description: 'Design a service like bit.ly that shortens URLs',
    content: {
      overview: 'Design a service like bit.ly that shortens URLs',
      requirements: [
        'Given long URL, return short URL',
        'Given short URL, redirect to original URL',
        'Custom short URLs (optional)',
        '100M URLs shortened per month',
        '100:1 read/write ratio',
        'URLs do not expire by default'
      ],
      estimations: 'Storage: 100M URLs/month * 500 bytes * 5 years = 300GB. Bandwidth: Write 40 req/s, Read 4000 req/s. Memory: Cache 1GB',
      components: [
        'Client to Load Balancer to Web Servers',
        'Write API: POST /shorten with long_url returns short_url',
        'Read API: GET /short_code returns 302 redirect',
        'SQL Database: Store mappings (short_code, long_url, user_id, created_at)',
        'Cache (Redis): Cache hot short codes',
        'Analytics Service: Track clicks, referrers, locations'
      ],
      keyDecisions: [
        'Base62 encoding: 0-9, a-z, A-Z (62 chars)',
        '7 chars = 62^7 = 3.5 trillion combinations',
        'Auto-increment ID + Base62 conversion',
        'Cache hot URLs (80/20 rule)',
        'Use 302 (temporary redirect) vs 301 (permanent) for analytics'
      ],
      diagrams: ['url-shortener-datamodel', 'url-shortener-basic-design', 'url-shortener-advanced-design']
    }
  },
  {
    id: 'instagram',
    title: 'Design Instagram',
    category: 'Case Studies',
    icon: Image,
    color: 'from-pink-500 to-rose-500',
    difficulty: 'Hard',
    description: 'Design a photo sharing service like Instagram',
    content: {
      overview: 'Design a photo sharing service like Instagram',
      requirements: [
        'Users can upload and view photos',
        'Users can follow other users',
        'Users see feed of photos from people they follow',
        'Users can like and comment on photos',
        '500M users, 300M DAU',
        'Average photo size: 200KB'
      ],
      estimations: 'Storage: 2M photos/day * 200KB * 5 years = 730TB. Bandwidth: Upload 4.6GB/s, View 230GB/s (CDN). Memory: Feed cache 6TB',
      components: [
        'Client to CDN to Load Balancer',
        'Upload Service: Handle photo uploads',
        'Image Processing Service: Resize, compress, generate thumbnails',
        'Object Store (S3): Store original and processed images',
        'CDN: Serve images globally',
        'Metadata DB (Cassandra): Store photo metadata',
        'Feed Service: Generate user feeds',
        'Cache (Redis): Cache feeds and hot photos',
        'Graph DB: Store follower relationships'
      ],
      keyDecisions: [
        'Store images in object store, not DB',
        'Generate multiple sizes (thumbnail, medium, full)',
        'Use CDN for global distribution',
        'Fanout on write for feed generation',
        'Use Cassandra for photo metadata (write-heavy)',
        'Separate read/write paths for performance'
      ]
    }
  },
  {
    id: 'youtube',
    title: 'Design YouTube',
    category: 'Case Studies',
    icon: Video,
    color: 'from-red-500 to-orange-500',
    difficulty: 'Hard',
    description: 'Design a video sharing platform like YouTube',
    content: {
      overview: 'Design a video sharing platform like YouTube',
      requirements: [
        'Users can upload and watch videos',
        'Users can like, comment, subscribe',
        'Video recommendations',
        '2B users, 1B hours watched daily',
        'Average video: 100MB, 1080p'
      ],
      estimations: 'Storage: 500 hours/min * 100MB * 525,600 min/year = 2.6PB/year. Bandwidth: 1B hours/day * 5Mbps = 5PB/day. CDN handles most traffic',
      components: [
        'Client to CDN to Load Balancer',
        'Upload Service: Handle video uploads',
        'Transcoding Service: Convert to multiple formats/resolutions',
        'Object Store (S3): Store video files',
        'CDN: Serve videos globally',
        'Metadata DB (SQL): Store video metadata, user data',
        'Search Service (Elasticsearch): Video search',
        'Recommendation Service (ML): Suggest videos',
        'Comment Service: Handle comments',
        'Analytics Service: Track views, watch time'
      ],
      keyDecisions: [
        'Adaptive bitrate streaming (HLS, DASH)',
        'Transcode videos to multiple resolutions async',
        'Use CDN for 95% of video traffic',
        'Lazy transcoding: Start with popular resolutions',
        'Thumbnail generation for preview',
        'Separate cold storage for old/unpopular videos'
      ]
    }
  },
  {
    id: 'typeahead-suggestion',
    title: 'Design Typeahead Suggestion',
    category: 'Case Studies',
    icon: Search,
    color: 'from-purple-500 to-pink-500',
    difficulty: 'Medium',
    description: 'Design a real-time suggestion service for search',
    content: {
      overview: 'Design a real-time suggestion service that recommends terms as users type',
      requirements: [
        'Suggest top 10 terms starting with user input',
        'Suggestions appear in real-time (within 200ms)',
        'Handle 5B searches per day (~60K QPS)',
        'Support personalization based on user history',
        'Case insensitive matching'
      ],
      estimations: 'Storage: 100M unique terms * 30 bytes = 3GB. With growth: 25GB total. Memory: Trie structure in memory for fast access',
      components: [
        'Client to Load Balancer to Application Servers',
        'Trie Data Structure: Store terms with frequencies',
        'Trie Servers: Distributed trie storage',
        'Aggregator Servers: Merge results from multiple tries',
        'Cache: Hot suggestions and personalized data',
        'Analytics Service: Track search frequencies'
      ],
      keyDecisions: [
        'Use Trie data structure for prefix matching',
        'Store top suggestions at each node for fast retrieval',
        'Update trie offline periodically (not real-time)',
        'Partition trie by server capacity or hash of terms',
        'Client optimizations: debouncing, caching, pre-fetching'
      ]
    }
  },
  {
    id: 'api-rate-limiter',
    title: 'Design API Rate Limiter',
    category: 'Case Studies',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    difficulty: 'Medium',
    description: 'Design a rate limiting system to throttle API requests',
    content: {
      overview: 'Design a rate limiter to control the number of requests an entity can send to APIs',
      requirements: [
        'Limit requests per entity within time window (e.g., 15 req/sec)',
        'Work across distributed servers',
        'Return HTTP 429 when limit exceeded',
        'Support different throttling types (hard, soft, elastic)',
        'High availability and low latency'
      ],
      estimations: 'Memory: 32MB for 1M users with simple counters. Distributed across multiple servers for scale',
      components: [
        'Client to Rate Limiter to API Servers',
        'Rate Limiter: Check and update request counts',
        'Redis/Memcached: Store user request counters',
        'Hash Table: UserID -> {Count, StartTime}',
        'Load Balancer: Distribute rate limiting load'
      ],
      keyDecisions: [
        'Fixed Window vs Sliding Window algorithms',
        'Sliding Window with Counters for memory efficiency',
        'Use Redis for distributed counter storage',
        'Hash-based partitioning by UserID',
        'Cache recent active users for performance'
      ]
    }
  },
  {
    id: 'web-crawler',
    title: 'Design Web Crawler',
    category: 'Case Studies',
    icon: Globe,
    color: 'from-green-500 to-teal-500',
    difficulty: 'Hard',
    description: 'Design a web crawler that systematically browses the web',
    content: {
      overview: 'Design a web crawler to systematically browse and download the World Wide Web',
      requirements: [
        'Crawl and download web pages systematically',
        'Handle billions of web pages',
        'Extensible to support new document types',
        'Respect robots.txt and politeness policies',
        'Crawl 15B pages within 4 weeks (~6200 pages/sec)',
        'Handle duplicate content detection'
      ],
      estimations: 'Storage: 15B pages * 100KB = 1.5PB (with 70% capacity = 2.14PB). Bandwidth: Fetch 6200 pages/sec',
      components: [
        'URL Frontier: Queue of URLs to crawl',
        'HTTP Fetcher: Download web pages',
        'DNS Resolver: Convert hostnames to IP addresses',
        'Content Parser: Extract links from HTML',
        'Duplicate Eliminator: Avoid processing same content',
        'Datastore: Store crawled pages and metadata'
      ],
      keyDecisions: [
        'Use breadth-first search for crawling',
        'Distributed URL frontier with politeness constraints',
        'Checksum-based duplicate detection (MD5/SHA)',
        'Regular checkpointing for fault tolerance',
        'Respect crawl delays and robots.txt'
      ]
    }
  },
  {
    id: 'whatsapp',
    title: 'Design WhatsApp',
    category: 'Case Studies',
    icon: Phone,
    color: 'from-green-500 to-emerald-500',
    difficulty: 'Hard',
    description: 'Design a real-time messaging service like WhatsApp',
    content: {
      overview: 'Design a real-time messaging service that supports text messages, media sharing, group chats, and online presence indicators',
      requirements: [
        'Send and receive text messages in real-time',
        'Support media messages (images, videos, documents)',
        'Group messaging with up to 256 participants',
        'Online/offline status and last seen indicators',
        'Message delivery status (sent, delivered, read)',
        'End-to-end encryption for privacy',
        '2B users worldwide, 100B messages per day',
        'Support for multiple devices per user'
      ],
      estimations: 'Storage: 100B messages/day * 100 bytes * 365 days * 5 years = 1.8PB. Bandwidth: Peak 2M messages/sec. Memory: Active user sessions 200GB',
      components: [
        'Client Apps (iOS, Android, Web) to Load Balancer',
        'WebSocket Servers: Handle real-time connections',
        'Message Service: Process and route messages',
        'User Service: Manage user profiles and contacts',
        'Group Service: Handle group chat operations',
        'Presence Service: Track online/offline status',
        'Media Service: Handle file uploads and downloads',
        'Push Notification Service: Deliver notifications',
        'Message Database (Cassandra): Store message history',
        'User Database (MySQL): Store user data and relationships',
        'Redis Cache: Active sessions and recent messages',
        'Object Store (S3): Store media files',
        'CDN: Distribute media content globally'
      ],
      keyDecisions: [
        'WebSocket connections for real-time messaging',
        'Message queues for reliable delivery when users offline',
        'Cassandra for message storage (write-heavy, time-series)',
        'Redis for caching active conversations and presence',
        'Separate media service with CDN for file sharing',
        'Push notifications for offline message delivery',
        'Horizontal partitioning by user_id for scalability',
        'End-to-end encryption with Signal Protocol'
      ],
      diagrams: ['whatsapp-datamodel', 'whatsapp-basic-design', 'whatsapp-advanced-design']
    }
  },
  {
    id: 'netflix',
    title: 'Design Netflix',
    category: 'Case Studies',
    icon: Video,
    color: 'from-red-500 to-pink-500',
    difficulty: 'Hard',
    description: 'Design a video streaming service like Netflix',
    content: {
      overview: 'Design a global video streaming platform that serves millions of users with personalized content recommendations and adaptive streaming',
      requirements: [
        'Stream videos to millions of concurrent users',
        'Support multiple video qualities (480p, 720p, 1080p, 4K)',
        'Personalized content recommendations',
        'Global content delivery with low latency',
        'User profiles and viewing history',
        'Content management for creators and studios',
        '200M subscribers, 1B hours watched daily',
        'Support for multiple devices and offline viewing'
      ],
      estimations: 'Storage: 15,000 titles * 100GB avg * 5 qualities = 7.5PB. Bandwidth: 1B hours/day * 5Mbps avg = 5PB/day. CDN: 95% traffic served from edge',
      components: [
        'Client Apps to CDN Edge Servers',
        'API Gateway: Route requests to microservices',
        'User Service: Manage profiles and authentication',
        'Content Service: Manage video catalog and metadata',
        'Recommendation Service: ML-based content suggestions',
        'Streaming Service: Handle video playback requests',
        'Transcoding Service: Convert videos to multiple formats',
        'Search Service: Content discovery and search',
        'Billing Service: Handle subscriptions and payments',
        'Analytics Service: Track viewing patterns and metrics',
        'Content Database (MySQL): Store metadata and user data',
        'Video Storage (S3): Store original and transcoded videos',
        'CDN (Custom): Global video distribution network',
        'Cache (Redis): Hot content metadata and user sessions',
        'Message Queue (Kafka): Event streaming for analytics'
      ],
      keyDecisions: [
        'Custom CDN with global edge servers for video delivery',
        'Adaptive bitrate streaming (ABR) for quality optimization',
        'Microservices architecture with 500+ services',
        'Machine learning for personalized recommendations',
        'Async video transcoding pipeline with multiple qualities',
        'Chaos engineering for resilience testing',
        'A/B testing platform for feature experimentation',
        'Real-time analytics for content performance tracking'
      ],
      diagrams: ['netflix-datamodel', 'video-processing-pipeline', 'file-chunking', 'netflix-advanced-design']
    }
  },
  {
    id: 'uber',
    title: 'Design Uber',
    category: 'Case Studies',
    icon: Car,
    color: 'from-blue-500 to-indigo-500',
    difficulty: 'Hard',
    description: 'Design a ride-sharing service like Uber',
    content: {
      overview: 'Design a location-based ride-sharing platform that matches riders with drivers in real-time',
      requirements: [
        'Riders can request rides and see nearby drivers',
        'Drivers can accept ride requests and navigate to pickup',
        'Real-time location tracking and ETA calculations',
        'Dynamic pricing based on supply and demand',
        'Payment processing and trip history',
        'Rating system for drivers and riders',
        '100M users (riders + drivers), 15M rides per day',
        'Support for multiple ride types (UberX, Pool, Black)'
      ],
      estimations: 'Storage: 15M rides/day * 2KB * 365 days * 5 years = 55TB. Location updates: 1M drivers * 4 updates/min = 67K updates/sec. Memory: Active sessions 50GB',
      components: [
        'Rider App and Driver App to Load Balancer',
        'API Gateway: Route requests to microservices',
        'User Service: Manage rider and driver profiles',
        'Location Service: Track real-time driver locations',
        'Matching Service: Match riders with nearby drivers',
        'Trip Service: Manage ride lifecycle and state',
        'Routing Service: Calculate routes and ETAs',
        'Pricing Service: Calculate dynamic pricing',
        'Payment Service: Handle payments and billing',
        'Notification Service: Send push notifications',
        'Analytics Service: Track metrics and performance',
        'User Database (MySQL): Store user profiles and trip history',
        'Location Database (Cassandra): Store location updates',
        'Cache (Redis): Active driver locations and trip states',
        'Message Queue (Kafka): Event streaming for real-time updates',
        'Maps API: External service for routing and geocoding'
      ],
      keyDecisions: [
        'Geospatial indexing with QuadTree for driver location queries',
        'WebSocket connections for real-time location updates',
        'Event-driven architecture for trip state management',
        'Microservices with separate databases per service',
        'Cassandra for high-write location data storage',
        'Redis for caching active driver locations and trip states',
        'Machine learning for demand prediction and pricing',
        'Separate matching algorithms for different ride types'
      ],
      diagrams: ['uber-datamodel', 'uber-working', 'uber-advanced-design']
    }
  }
];
