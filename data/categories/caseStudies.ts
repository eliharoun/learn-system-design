import { Link, FileText, Image, MessageSquare, Video, Search, Zap, Globe, Car, Phone, Shield, ShoppingCart, TrendingUp, Brain, Eye, Target, Settings, Linkedin, CreditCard, Truck, Users, Utensils, Home, DollarSign } from 'lucide-react';
import { CaseStudy } from '../../types';

export const caseStudies: CaseStudy[] = [
  // System Design Case Studies
  {
    id: 'pastebin',
    title: 'Design Pastebin',
    category: 'Case Studies',
    caseStudyCategory: 'System Design',
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
    caseStudyCategory: 'System Design',
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
    caseStudyCategory: 'System Design',
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
    caseStudyCategory: 'System Design',
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
    caseStudyCategory: 'System Design',
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
    caseStudyCategory: 'System Design',
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
    caseStudyCategory: 'System Design',
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
    caseStudyCategory: 'System Design',
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
    caseStudyCategory: 'System Design',
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
    caseStudyCategory: 'System Design',
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
    caseStudyCategory: 'System Design',
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
  },
  
  // Machine Learning Case Studies
  {
    id: 'stripe-radar-fraud-detection',
    title: 'Stripe Radar: Real-Time Fraud Prevention',
    category: 'Case Studies',
    caseStudyCategory: 'Machine Learning',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    difficulty: 'Hard',
    description: 'Design a real-time fraud detection system with sub-100ms response time',
    content: {
      overview: 'Design a real-time fraud detection system that can detect fraudulent transactions in under 100ms while maintaining extremely low false positive rates (0.1%)',
      requirements: [
        'Detect fraudulent transactions in real-time (<100ms)',
        'Maintain extremely low false positive rates (0.1%)',
        'Handle billions of transactions globally',
        'Process 1000+ features per transaction',
        'Severe class imbalance (~1 in 1000 transactions are fraud)',
        'Continuous learning from new fraud patterns'
      ],
      estimations: 'Data: Billions of transactions with 1000+ features each. Model Training: Reduced from >12 hours to <2 hours. Inference: Sub-100ms per transaction',
      components: [
        'Transaction Input Service: Receive payment requests',
        'Feature Extraction Service: Generate 1000+ transaction characteristics',
        'Multi-branch DNN Model: ResNeXt-inspired architecture',
        'Real-time Scoring Service: Generate fraud probability',
        'Decision Engine: Convert scores to accept/decline decisions',
        'Feedback Loop: Collect fraud confirmations for retraining',
        'Model Training Pipeline: Automated retraining system',
        'Analytics Service: Monitor model performance and drift'
      ],
      keyDecisions: [
        'Evolution from XGBoost + DNN ensemble to pure DNN architecture',
        'Multi-branch DNN: Split computation into distinct threads, sum outputs',
        'Trade-off: 1.5% recall drop for 85% training time reduction',
        'Single national-scale model vs thousands of regional models',
        'Continuous feature engineering through dark web monitoring',
        'Risk Insights feature for explainable fraud decisions'
      ]
    }
  },
  {
    id: 'walmart-fashion-recommendations',
    title: 'Walmart: Complete the Look Fashion Recommendations',
    category: 'Case Studies',
    caseStudyCategory: 'Machine Learning',
    icon: ShoppingCart,
    color: 'from-purple-500 to-pink-500',
    difficulty: 'Hard',
    description: 'Design a fashion recommendation system for complete outfit suggestions',
    content: {
      overview: 'Design a recommendation system that helps customers discover complete outfits rather than individual items, addressing choice fatigue and increasing basket size',
      requirements: [
        'Generate coherent, stylish outfit combinations',
        'Handle millions of fashion items',
        'Ensure bidirectional recommendations (A→B and B→A)',
        'Maintain style coherence across outfit components',
        'Support real-time outfit generation during browsing',
        'Handle seasonal and trending fashion patterns'
      ],
      estimations: 'Data: Millions of fashion items with hierarchical product types. Processing: Real-time outfit generation with style matching. Storage: Product embeddings and style vectors',
      components: [
        'Candidate Selection Service: Use existing complementary item recommendations',
        'Look Definition Service: Define outfits as 4-5 distinct Super Product Types (SPTs)',
        'Look Generation Service: Create multiple outfit combinations',
        'Style Matching Service: Enhance coherence using visual similarity',
        'Variant Expansion Service: Generate additional variations through permutation',
        'CLIP Image Processing: Generate visual embeddings for style matching',
        'Triplet Learning Network: Train style embeddings with triplet loss',
        'Feedback Collection: Track user interactions for improvement'
      ],
      keyDecisions: [
        'Five-step architecture: Candidate Selection → Look Definition → Generation → Style Matching → Variant Expansion',
        'Hierarchical Super Product Types (SPTs) for managing complexity',
        'Triplet learning with CLIP embeddings for visual coherence',
        'Feed-forward network with triplet loss for style matching',
        'Bidirectional recommendation permutation strategy',
        'Real-time generation with user feedback loops'
      ]
    }
  },
  {
    id: 'uber-airport-forecasting',
    title: 'Uber: Airport Demand & ETR Forecasting',
    category: 'Case Studies',
    caseStudyCategory: 'Machine Learning',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-500',
    difficulty: 'Hard',
    description: 'Design a forecasting system for airport demand and driver wait times',
    content: {
      overview: 'Design a system to forecast airport demand and estimate driver wait times to optimize supply-demand balance at airports',
      requirements: [
        'Forecast airport demand up to 1 hour ahead',
        'Estimate driver wait times (ETR) in real-time',
        'Handle complex queue dynamics and external factors',
        'Process flight schedules, weather data, and app engagement',
        'Provide minute-level predictions for driver app',
        'Support multiple airports with different characteristics'
      ],
      estimations: 'Data: Flight schedules, weather data, queue dynamics, app engagement metrics. Processing: 15-minute intervals up to 1 hour ahead. Updates: Minute-level predictions',
      components: [
        'Data Ingestion Service: Flight schedules, weather, app engagement',
        'Supply Model: Gradient boosted tree for true queue position estimation',
        'Demand Model: Gradient boosted tree for queue consumption rate forecasting',
        'Queue Simulation Engine: Combine supply and demand predictions',
        'ETR Classification Service: Short/Medium/Long wait time categories',
        'Real-time Feature Pipeline: Process queue dynamics and driver behavior',
        'Driver App Integration: Display ETR estimates in venue markers',
        'Analytics Service: Monitor prediction accuracy and driver satisfaction'
      ],
      keyDecisions: [
        'Three-model architecture: Supply Model + Demand Model + Queue Simulation',
        'Gradient boosted trees for both supply and demand forecasting',
        'Real-time signals: Queue positions, abandonment rates, priority passes',
        'Time horizon: 15-minute intervals up to 1 hour ahead',
        'ETR classification: Short (0-15min), Medium (15-30min), Long (>30min)',
        'Modular architecture for component reuse across use cases'
      ]
    }
  },
  {
    id: 'pinterest-advertiser-churn',
    title: 'Pinterest: Advertiser Churn Prevention',
    category: 'Case Studies',
    caseStudyCategory: 'Machine Learning',
    icon: Target,
    color: 'from-pink-500 to-red-500',
    difficulty: 'Medium',
    description: 'Design a system to predict advertiser churn 14 days in advance',
    content: {
      overview: 'Design a machine learning system to predict advertiser churn 14 days in advance to enable proactive retention efforts',
      requirements: [
        'Predict advertiser churn 14 days in advance',
        'Handle cold start problem for new advertisers',
        'Provide explainable predictions for sales teams',
        'Support different risk categorizations (High/Medium/Low)',
        'Process 200+ features across multiple dimensions',
        'Enable proactive retention campaigns'
      ],
      estimations: 'Data: Advertiser performance metrics, campaign configurations, budget data. Features: 200+ across performance, goals, budget, activities. Target: Active vs Churned classification',
      components: [
        'Data Collection Service: Advertiser metrics, campaign data, budget information',
        'Feature Engineering Pipeline: Generate 200+ features across multiple dimensions',
        'LightGBM Model: Gradient boosting for churn prediction',
        'SHAP Explainer: Feature contribution analysis for interpretability',
        'Risk Categorization Service: High/Medium/Low risk segmentation',
        'Sales Integration API: Provide insights to account managers',
        'Model Training Pipeline: Automated retraining and validation',
        'Monitoring Service: Track model performance and business impact'
      ],
      keyDecisions: [
        'GBDT (LightGBM) for binary classification with explainability',
        'Feature categories: Performance, goals, budget, activities, properties',
        'Target definition: Active (spent in last 7 days) vs Churned',
        'SHAP for feature contribution analysis and sales insights',
        'Risk categorization based on precision/recall trade-offs',
        'Daily inference pipeline for updated churn probabilities'
      ]
    }
  },
  {
    id: 'swiggy-food-recommendations',
    title: 'Swiggy: Mind Reader Food Recommendations',
    category: 'Case Studies',
    caseStudyCategory: 'Machine Learning',
    icon: Utensils,
    color: 'from-orange-500 to-red-500',
    difficulty: 'Hard',
    description: 'Design a food recommendation system to solve "what to order?" paralysis',
    content: {
      overview: 'Design a recommendation system to solve "what to order?" paralysis by recommending personalized food carts at massive scale while ensuring coherence and freshness',
      requirements: [
        'Handle millions of food items across multiple regions',
        'Provide coherent cart recommendations (not random items)',
        'Ensure geographic relevance and freshness',
        'Support micro-personalization (dietary preferences)',
        'Maintain sub-second response times',
        'Handle seasonal and trending items'
      ],
      estimations: 'Data: Millions of items across geographic regions. Processing: Sub-second cart recommendations. Storage: Item embeddings, customer preferences, geographic indexes',
      components: [
        'Food Intelligence Service: Hierarchical dish classification system',
        'Cart Embedding Service: Generate weighted embeddings based on price',
        'ANN Retrieval Service: Approximate Nearest Neighbors with geographic partitioning',
        'Ranking Service: Score carts using similarity, price, vegness, distance',
        'Vegness Scoring Service: Impute vegetarian preference scores',
        'Geographic Indexing: Separate ANN indexes per geohash region',
        'Rule-based Filter: Use FI taxonomy for coherence filtering',
        'Real-time Update Service: Daily freshness and trending updates'
      ],
      keyDecisions: [
        'Two-phase approach: Retrieval (ANN) + Ranking (weighted scoring)',
        'Cart embeddings as weighted sum of item embeddings by price',
        'Geographic partitioning with separate ANN indexes per geohash',
        'Vegness score for micro-personalization of dietary preferences',
        'Food Intelligence taxonomy for coherence filtering',
        'Daily updates for seasonal and trending item capture'
      ]
    }
  },
  {
    id: 'lyft-recommendation-evolution',
    title: 'Lyft: Recommendation System Evolution',
    category: 'Case Studies',
    caseStudyCategory: 'Machine Learning',
    icon: Car,
    color: 'from-purple-500 to-blue-500',
    difficulty: 'Medium',
    description: 'Design a ride mode recommendation system balancing business goals',
    content: {
      overview: 'Design a recommendation system to suggest the right ride mode (standard, shared, premium) to users while balancing business goals including conversion, reliability, and supply/demand',
      requirements: [
        'Recommend optimal ride modes for different user contexts',
        'Balance business goals: conversion, reliability, supply/demand',
        'Handle cold start problem for new ride modes',
        'Support real-time ranking with marketplace conditions',
        'Provide explainable recommendations for business decisions',
        'Enable one-tap preselection for high-frequency destinations'
      ],
      estimations: 'Data: User ride history, marketplace conditions, temporal features. Processing: Real-time mode ranking. Interface: Above-the-fold limit of 3-4 modes for mobile UX',
      components: [
        'User History Service: Track ride patterns and preferences',
        'Marketplace Conditions Service: Supply/demand signals and temporal features',
        'LightGBM Model: Multi-class classification for propensity prediction',
        'Post-Processing Service: Strategic adjustments for business goals',
        'Preselection Service: Model-based mode selection for one-tap requests',
        'SHAP Explainer: Feature contribution analysis for interpretability',
        'A/B Testing Framework: Compare different ranking approaches',
        'Cross-sell Service: Post-request upgrade opportunities'
      ],
      keyDecisions: [
        'Multi-layer architecture: Base model + Post-processing + Preselection',
        'LightGBM for gradient boosting with explainability through SHAP',
        'Feature engineering: Performance metrics, goal attainment, temporal changes',
        'Post-processor to mitigate cold start bias for new modes',
        'Above-the-fold optimization: Limit to 3-4 modes for mobile UX',
        'Future exploration: Reinforcement learning for dynamic interactions'
      ]
    }
  },
  {
    id: 'zalando-fashion-forecasting',
    title: 'Zalando: Fashion Demand Forecasting',
    category: 'Case Studies',
    caseStudyCategory: 'Machine Learning',
    icon: TrendingUp,
    color: 'from-pink-500 to-purple-500',
    difficulty: 'Medium',
    description: 'Design a demand forecasting system for fast-moving fashion industry',
    content: {
      overview: 'Design a demand forecasting system for the fast-moving fashion industry with unique challenges including irregular demand patterns, high catalog turnover, and fixed inventory assumptions',
      requirements: [
        'Handle irregular demand patterns in fashion',
        'Manage high catalog turnover with new products',
        'Control price-demand relationships with fixed inventory',
        'Process large volumes of historical sales data',
        'Support global fashion categories and seasonal patterns',
        'Enable real-time inventory management integration'
      ],
      estimations: 'Data: Historical sales data, product attributes, seasonal patterns. Challenge: Volume, irregularity, high catalog turnover. Approach: Global deep learning models',
      components: [
        'Sales Data Ingestion: Historical sales, product attributes, seasonal patterns',
        'Global Deep Learning Model: Single model for all fashion categories',
        'Price-Demand Controller: Special handling of price-demand relationships',
        'Seasonal Pattern Service: Capture fashion trends and cyclical patterns',
        'Catalog Turnover Handler: Manage high product churn rates',
        'Inventory Integration: Close coupling with inventory management systems',
        'Real-time Retraining: Continuous model updates for fashion trends',
        'Performance Monitoring: Track forecast accuracy vs traditional methods'
      ],
      keyDecisions: [
        'Global deep learning approach vs category-specific models',
        'Special handling of price-demand relationships for fixed inventory',
        'Single model advantages: Better handling of volume, irregularity, turnover',
        'Deep learning advantages scale with data volume and complexity',
        'Continuous retraining to capture fast-moving fashion trends',
        'Global model easier to maintain than multiple category models'
      ]
    }
  },
  {
    id: 'linkedin-payment-routing',
    title: 'LinkedIn: ML-Driven Payment Routing',
    category: 'Case Studies',
    caseStudyCategory: 'Machine Learning',
    icon: CreditCard,
    color: 'from-blue-500 to-indigo-500',
    difficulty: 'Medium',
    description: 'Design a machine learning system to optimize payment gateway selection',
    content: {
      overview: 'Design a machine learning system to optimize payment gateway selection to maximize approval rates and improve customer experience for subscription renewals',
      requirements: [
        'Optimize payment gateway selection for maximum approval rates',
        'Handle sample imbalance from existing routing strategies',
        'Support real-time routing decisions with low latency',
        'Process multiple currencies, countries, and transaction types',
        'Enable A/B testing against rule-based approaches',
        'Support periodic model retraining on recent data'
      ],
      estimations: 'Training: J* = 2,000,000 samples per gateway. Model: Multi-class softmax logistic regression. Performance: Statistically significant improvement over rule-based routing',
      components: [
        'Transaction Data Collection: Currency, country, transaction type, product family',
        'Inverse Probability Weighting Service: Bootstrap sampling to overcome imbalance',
        'Multi-class Classification Model: K+1 classes (K gateways + failure state)',
        'Real-time Routing Service: Model predictions integrated into payment processing',
        'A/B Testing Framework: Model-based vs rule-based routing comparison',
        'Model Retraining Pipeline: Periodic refresh on recent routing data',
        'Performance Monitoring: Track approval rates and customer experience',
        'Gateway Integration API: Interface with multiple payment providers'
      ],
      keyDecisions: [
        'Inverse Probability Weighting (IPW) to handle sample imbalance',
        'Multi-class softmax logistic regression for low latency serving',
        'Bootstrap sampling with IPW for optimal routing strategy learning',
        'A/B testing validation against existing rule-based systems',
        'Feature engineering: Currency, country, transaction type, card network',
        'Periodic model refresh to adapt to changing payment landscape'
      ]
    }
  },
  {
    id: 'wayfair-delivery-prediction',
    title: 'Wayfair: Delivery Date Prediction',
    category: 'Case Studies',
    caseStudyCategory: 'Machine Learning',
    icon: Truck,
    color: 'from-brown-500 to-orange-500',
    difficulty: 'Medium',
    description: 'Design a system to predict accurate delivery dates balancing speed and reliability',
    content: {
      overview: 'Design a delivery date prediction system to balance speed and reliability, cutting the gap between promised and actual delivery times in half while maintaining delivery rates',
      requirements: [
        'Predict accurate delivery dates for furniture and home goods',
        'Balance speed promises with reliability requirements',
        'Handle supplier lead times and geographic distances',
        'Support sub-100ms response times for product pages',
        'Maintain 99.99% reliability for customer-facing predictions',
        'Achieve 50% reduction in promise-to-actual delivery gap'
      ],
      estimations: 'Data: Historical delivery times, supplier performance, geographic distances. Performance: Sub-100ms response times, 99.99% reliability. Impact: 50% reduction in delivery gap',
      components: [
        'Historical Data Service: Delivery times, supplier performance, geographic data',
        'Feature Engineering Pipeline: Supplier lead times, distances, temporal patterns',
        'CatBoost Model: Gradient boosted trees with quantile regression',
        'Quantile Regression Service: Target delivery rates for different speed groups',
        'Real-time Inference API: Sub-100ms predictions for product page loads',
        'High Availability Infrastructure: 99.99% reliability requirement',
        'Performance Optimization: C++ custom loss function implementation',
        'Continuous Monitoring: Track promise vs actual delivery performance'
      ],
      keyDecisions: [
        'Quantile regression with CatBoost for speed-reliability balance',
        'Custom quantile loss function for different delivery speed groups',
        'Categorical feature handling: Supplier IDs, warehouse IDs',
        'Temporal feature engineering: Seasonal patterns and holiday effects',
        'Recency weighting: Balance stability and reactivity in training',
        'End-to-end modeling outperforming component-based approaches'
      ]
    }
  },
  {
    id: 'linkedin-viral-spam-detection',
    title: 'LinkedIn: Viral Spam Content Detection',
    category: 'Case Studies',
    caseStudyCategory: 'Machine Learning',
    icon: Shield,
    color: 'from-red-500 to-pink-500',
    difficulty: 'Hard',
    description: 'Design a system to detect viral spam content before it spreads widely',
    content: {
      overview: 'Design a viral spam detection system to identify and prevent spam content from spreading across the LinkedIn platform before it reaches wide audiences',
      requirements: [
        'Detect viral spam content before wide distribution',
        'Handle diverse content types and evolving spam patterns',
        'Balance early detection accuracy with broad input acceptance',
        'Process post content, engagement patterns, and network features',
        'Support real-time monitoring every few hours',
        'Coordinate multiple defense layers'
      ],
      estimations: 'Impact: 7.3% overall spam views reduction, 12% reduction in policy violations. Processing: Real-time monitoring every few hours. Coverage: Platform-wide content analysis',
      components: [
        'Content Analysis Service: Process post features, polarity, spamminess scores',
        'Member Network Service: Analyze network influence and activity patterns',
        'Engagement Pattern Service: Track temporal sequences of interactions',
        'Proactive Defense System: Deep neural networks for early detection',
        'Reactive Defense System: Boosted trees combining behavior and content patterns',
        'Real-time Monitoring Service: Run models every few hours on new content',
        'Human Review Interface: Manual review for edge cases',
        'Coordination Service: Manage multi-model defense layers'
      ],
      keyDecisions: [
        'Two-defense architecture: Proactive (early detection) + Reactive (behavior-based)',
        'Feature categories: Post features, member features, engagement features',
        'Deep neural networks for proactive defenses on post features',
        'Boosted trees for reactive defenses combining multiple signal types',
        'Multi-model coordination without chaining for latency management',
        'Continuous monitoring as spam patterns evolve over time'
      ]
    }
  },
  {
    id: 'zillow-neural-zestimate',
    title: 'Zillow: Neural Zestimate',
    category: 'Case Studies',
    caseStudyCategory: 'Machine Learning',
    icon: Home,
    color: 'from-blue-500 to-purple-500',
    difficulty: 'Hard',
    description: 'Design a neural network system for automated home valuation at national scale',
    content: {
      overview: 'Design a neural network-based home valuation system that can react quickly to market trends while handling the complexity of real estate markets across the entire US',
      requirements: [
        'Value 100+ million homes across the entire US',
        'React quickly to market trends and seasonal patterns',
        'Handle geographic variations in real estate markets',
        'Provide uncertainty quantification for predictions',
        'Support frequent model updates (multiple times per week)',
        'Replace thousands of county-specific models with single national model'
      ],
      estimations: 'Scale: 100+ million homes nationwide. Updates: Multiple times per week vs monthly. Performance: 15%+ improvement in relative error rates',
      components: [
        'Data Ingestion Service: Sales transactions, tax assessments, property details',
        'Geographic Tiling Service: Multi-scale discretized tiles (S2, H3)',
        'Temporal Decomposition Service: Trend + seasonal components',
        'Feature Engineering Pipeline: 200+ features across multiple dimensions',
        'Deep Neural Network: Multi-layer architecture with embeddings',
        'Quantile Regression Service: Prediction intervals for uncertainty',
        'Model Training Pipeline: Automated retraining on Zillow ML platform',
        'Inference Service: Real-time home valuation API'
      ],
      keyDecisions: [
        'Neural network architecture replacing pipeline of separate models',
        'Geographic representation: Multi-scale discretized tiles as categorical features',
        'Temporal representation: Separate trend and seasonal cyclical features',
        'Quantile regression for uncertainty quantification and prediction intervals',
        'Embedding learning for high-cardinality categorical features',
        'Single national model vs thousands of county-specific models'
      ]
    }
  },
  {
    id: 'etsy-multi-task-ranker',
    title: 'Etsy: Multi-Task Canonical Ranker',
    category: 'Case Studies',
    caseStudyCategory: 'Machine Learning',
    icon: ShoppingCart,
    color: 'from-orange-500 to-pink-500',
    difficulty: 'Hard',
    description: 'Design a multi-task learning system to consolidate hundreds of recommendation rankers',
    content: {
      overview: 'Design a multi-task learning system to consolidate hundreds of module-specific recommendation rankers into canonical rankers to reduce maintenance costs while improving quality',
      requirements: [
        'Consolidate hundreds of module-specific rankers',
        'Handle different interaction patterns across modules and platforms',
        'Support multiple objectives (favorites and purchases)',
        'Ensure consistent recommendations across web and mobile',
        'Reduce engineering overhead while improving quality',
        'Handle unknown modules during inference'
      ],
      estimations: 'Scale: Hundreds of daily pipelines consolidated to single canonical ranker. Performance: 12.5% improvement in favorite NDCG. Coverage: Cross-platform consistency',
      components: [
        'Data Collection Service: User interactions across hundreds of modules',
        'Balanced Sampling Service: Representative sampling across user segments',
        'Multi-Task Neural Network: Shared-bottom architecture with MMOE',
        'Module Feature Service: Critical module name feature for generalization',
        'Task Balancing Service: Manual weight tuning for favorites vs purchases',
        'Unknown Module Handler: Dummy name sampling for inference coverage',
        'Cross-Platform Deployment: Consistent recommendations across web and mobile',
        'Performance Monitoring: NDCG improvements and engagement metrics'
      ],
      keyDecisions: [
        'Multi-task learning: Shared-bottom neural network with MMOE',
        'Module name feature critical for generalization across modules',
        'Balanced training data ensures performance across diverse user segments',
        'Task balancing through manual weight tuning for multiple objectives',
        'Unknown module handling via dummy name sampling',
        'Gradual rollout starting with item page and homepage modules'
      ]
    }
  },
  {
    id: 'instacart-item-availability',
    title: 'Instacart: Real-Time Item Availability',
    category: 'Case Studies',
    caseStudyCategory: 'Machine Learning',
    icon: ShoppingCart,
    color: 'from-green-500 to-blue-500',
    difficulty: 'Hard',
    description: 'Design a system to predict real-time item availability across millions of items',
    content: {
      overview: 'Design a system to predict real-time item availability for hundreds of millions of items across thousands of stores, addressing sparsity, interpretability, and evolving business needs',
      requirements: [
        'Predict availability for hundreds of millions of items',
        'Support thousands of stores with different inventory patterns',
        'Handle sparse data for tail items',
        'Provide interpretable predictions for business decisions',
        'Support multiple use cases (instant vs scheduled delivery)',
        'Maintain sub-minute latency for score updates'
      ],
      estimations: 'Scale: Hundreds of millions of items across thousands of stores. Latency: Sub-minute score updates. Context: Multiple use cases with different requirements',
      components: [
        'Shopper Event Service: Collect scanning events and inventory data',
        'General Pattern Service: Typical availability over 7-180 days',
        'Trending Analysis Service: Deviations from baseline over 0.5-30 days',
        'Real-time Inference Service: Latest observations and restocking patterns',
        'Relevant Sample Algorithm: Find local, recent data for general patterns',
        'XGBoost Trending Model: Quantify deviations from general baseline',
        'Restocking CDF Service: Convert restocking distributions to real-time features',
        'Griffin MLOps Platform: Modern infrastructure for reduced costs and freshness'
      ],
      keyDecisions: [
        'Hierarchical G-T-R architecture: General + Trending + Real-Time',
        'Relevant Sample Algorithm for finding local, recent patterns',
        'XGBoost for trending analysis and deviation quantification',
        'Restocking CDF conversion for real-time feature engineering',
        'Context awareness with multiple score versions for different use cases',
        'Modern MLOps platform for reduced costs and improved freshness'
      ]
    }
  },
  
  // AI/LLM Case Studies
  {
    id: 'stitch-fix-generative-ai',
    title: 'Stitch Fix: Expert-in-the-Loop Generative AI',
    category: 'Case Studies',
    caseStudyCategory: 'AI/LLM',
    icon: Brain,
    color: 'from-purple-500 to-blue-500',
    difficulty: 'Hard',
    description: 'Design a generative AI system for automated content creation with human oversight',
    content: {
      overview: 'Design a generative AI system to automate content creation (ad headlines, product descriptions) at scale while maintaining brand voice and quality through expert-in-the-loop approach',
      requirements: [
        'Generate ad headlines and product descriptions at scale',
        'Maintain consistent brand voice and style',
        'Support expert review and editing workflow',
        'Handle hundreds of thousands of products',
        'Integrate with existing content management systems',
        'Provide quality scoring and feedback mechanisms'
      ],
      estimations: 'Data: Product images, style keywords, brand guidelines, expert-written examples. Processing: All Facebook and Instagram ad headlines. Quality: AI descriptions scored higher than human-written in blind tests',
      components: [
        'Content Input Service: Product images, style keywords, brand guidelines',
        'Style Understanding Service: Map outfits to style keywords in latent space',
        'GPT-3 Few-shot Service: Generate ad headlines with minimal examples',
        'Fine-tuned GPT-3 Service: Generate product descriptions with brand voice',
        'Expert Review Interface: Human review and editing workflow',
        'Quality Scoring Service: Evaluate generated content quality',
        'Content Management Integration: Deploy approved content to platforms',
        'Feedback Loop Service: Collect expert feedback for model improvement'
      ],
      keyDecisions: [
        'Two-use-case architecture: Few-shot for headlines, fine-tuning for descriptions',
        'Latent style understanding for outfit-to-keyword mapping',
        'Expert-in-the-loop approach balancing efficiency with quality',
        'Fine-tuning on expert-written examples for brand voice preservation',
        'Human-AI collaboration workflow for content refinement',
        'Continuous improvement through expert feedback integration'
      ]
    }
  },
  {
    id: 'microsoft-llm-incident-management',
    title: 'Microsoft: LLMs for Cloud Incident Management',
    category: 'Case Studies',
    caseStudyCategory: 'AI/LLM',
    icon: Settings,
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'Hard',
    description: 'Design an LLM system for automated root cause analysis and incident resolution',
    content: {
      overview: 'Design an LLM-powered system to automate root cause analysis and mitigation step generation for cloud incidents to reduce resolution time and improve system reliability',
      requirements: [
        'Analyze 40,000+ incidents from 1000+ services',
        'Generate root cause analysis and mitigation steps',
        'Handle both machine-reported and customer-reported incidents',
        'Provide real-time assistance to on-call engineers',
        'Support multiple evaluation metrics for quality assessment',
        'Enable rapid model iteration and improvement'
      ],
      estimations: 'Data: 40,000+ incidents with titles and summaries. Models: GPT-3 and GPT-3.5 variants. Performance: 45.5% lexical similarity improvement with fine-tuning',
      components: [
        'Incident Data Ingestion: Collect incident titles and summaries',
        'Data Preprocessing Service: Clean and structure incident data',
        'LLM Fine-tuning Pipeline: Train models on incident-specific data',
        'Multi-task Learning Service: Joint training on root cause and mitigation',
        'Real-time Inference Service: Generate recommendations for active incidents',
        'Evaluation Service: BLEU-4, ROUGE-L, METEOR, BERTScore metrics',
        'Human Feedback Collection: Gather engineer ratings and feedback',
        'Model Versioning Service: Manage model updates and rollbacks'
      ],
      keyDecisions: [
        'LLM architecture evolution: GPT-3 → GPT-3.5 (Codex variants)',
        'Training approaches: Zero-shot → Fine-tuned → Multi-task learning',
        'Multi-task learning: Joint training on root cause and mitigation generation',
        'Evaluation metrics: Multiple automated metrics plus human evaluation',
        'Fine-tuning benefits: 45.5% improvement over zero-shot approaches',
        'Future direction: Retrieval-augmented approaches with conversational interface'
      ]
    }
  },
  {
    id: 'github-copilot',
    title: 'GitHub Copilot: LLMs for Code Generation',
    category: 'Case Studies',
    caseStudyCategory: 'AI/LLM',
    icon: Brain,
    color: 'from-gray-500 to-blue-500',
    difficulty: 'Hard',
    description: 'Design an AI pair programmer for real-time code generation in IDEs',
    content: {
      overview: 'Design an AI pair programmer that generates code suggestions in real-time within IDEs, transforming how developers write code through advanced prompt engineering',
      requirements: [
        'Generate code suggestions in real-time within IDEs',
        'Support multiple programming languages',
        'Provide contextually relevant completions',
        'Handle multi-file context and dependencies',
        'Maintain low latency for developer productivity',
        'Support iterative model improvements from OpenAI'
      ],
      estimations: 'Data: Billions of lines of public code and documentation. Evolution: Python-only → JavaScript → Multilingual Codex models. Context: Multi-file IDE integration',
      components: [
        'IDE Integration Service: Real-time code completion within development environments',
        'Context Assembly Service: Create "pseudo-documents" for desired completions',
        'Multi-file Context Service: Pull similar text from neighboring editor tabs',
        'Language Identification Service: Explicit language specification for disambiguation',
        'Prompt Engineering Pipeline: Few-shot learning with minimal examples',
        'Model Serving Infrastructure: Real-time inference from OpenAI models',
        'Acceptance Metrics Service: Monitor completion acceptance rates',
        'Continuous Improvement Pipeline: Model updates and capability expansion'
      ],
      keyDecisions: [
        'Code completion as document completion task approach',
        'Prompt engineering techniques: Context assembly, multi-file context, file paths',
        'Few-shot learning with minimal examples for task adaptation',
        'IDE context integration for better suggestion quality',
        'Language identification for disambiguation and boilerplate generation',
        'Iterative model improvements through OpenAI partnership'
      ]
    }
  },
  {
    id: 'honeycomb-query-generation',
    title: 'Honeycomb: LLMs for Query Generation',
    category: 'Case Studies',
    caseStudyCategory: 'AI/LLM',
    icon: Search,
    color: 'from-yellow-500 to-orange-500',
    difficulty: 'Medium',
    description: 'Design an LLM system to generate observability queries from natural language',
    content: {
      overview: 'Design a Query Assistant system that allows users to express complex observability queries in natural language, bridging the gap between user intent and technical query syntax',
      requirements: [
        'Convert natural language to Honeycomb query syntax',
        'Handle large schemas with 5000+ fields',
        'Manage context window limitations effectively',
        'Provide 2-15 second response times',
        'Balance correctness with broad input acceptance',
        'Support graceful fallback for unparseable outputs'
      ],
      estimations: 'Schema: 5000+ fields requiring context window management. Response Time: 2-15 seconds depending on model and input complexity. Context: Schema fields used in past 7 days',
      components: [
        'Natural Language Input Service: Accept user queries in natural language',
        'Schema Management Service: Handle 5000+ field schemas with context window limits',
        'Context Window Optimizer: Time-based filtering (past 7 days) for schema relevance',
        'LLM Query Generator: Convert natural language to Honeycomb query syntax',
        'Output Parser: Parse and validate LLM-generated queries',
        'Error Handler: Graceful fallback for unparseable outputs',
        'Query Execution Service: Execute validated queries against Honeycomb',
        'Response Formatter: Present results in user-friendly format'
      ],
      keyDecisions: [
        'Schema truncation using time-based filtering (past 7 days usage)',
        'Few-shot prompting more effective than zero-shot approaches',
        'Avoid chaining LLM calls due to latency and compound probability issues',
        'Output parsing and correction before query execution',
        'Balance correctness vs usefulness for broad input acceptance',
        'Future: Embedding-based schema selection for improved relevance'
      ]
    }
  },
  {
    id: 'yelp-content-organization',
    title: 'Yelp: Content Organization with Embeddings',
    category: 'Case Studies',
    caseStudyCategory: 'AI/LLM',
    icon: Eye,
    color: 'from-yellow-500 to-red-500',
    difficulty: 'Medium',
    description: 'Design a system to organize massive content using multi-modal embeddings',
    content: {
      overview: 'Design a system to organize and tag massive amounts of content (reviews, businesses, photos) using embeddings to improve search, recommendations, and content understanding',
      requirements: [
        'Create universal representations for diverse content types',
        'Handle reviews, business information, and photos at scale',
        'Support semantic search across content types',
        'Enable zero-shot image classification',
        'Provide business-to-business recommendations',
        'Support multi-language content processing'
      ],
      estimations: 'Data: Reviews, business information, photos, user interactions. Processing: Universal representations for diverse content types. Scale: Millions of businesses and reviews',
      components: [
        'Text Processing Service: Universal Sentence Encoder for reviews and text',
        'Business Embedding Service: Weighted averaging of review embeddings',
        'Photo Processing Service: CLIP model for zero-shot image classification',
        'Semantic Search Service: Embedding-based similarity search',
        'Recommendation Engine: Business-to-business and user-to-business recommendations',
        'Content Tagging Service: Automatic categorization using embeddings',
        'Multi-language Support: Universal embeddings across languages',
        'Quality Assurance: Label engineering for zero-shot performance'
      ],
      keyDecisions: [
        'Multi-modal embedding architecture: Text (USE) + Images (CLIP)',
        'Universal Sentence Encoder with Deep Averaging Network (DAN)',
        'Business representation through weighted averaging of recent reviews',
        'CLIP integration for zero-shot image classification',
        'Label engineering crucial for effective zero-shot performance',
        'Universal embeddings outperform domain-specific models in diverse domains'
      ]
    }
  },
  {
    id: 'airbnb-guest-interest-prioritization',
    title: 'Airbnb: Guest Interest Prioritization',
    category: 'Case Studies',
    caseStudyCategory: 'AI/LLM',
    icon: Home,
    color: 'from-pink-500 to-purple-500',
    difficulty: 'Hard',
    description: 'Design a system to extract and prioritize guest interests from unstructured text',
    content: {
      overview: 'Design a system to understand and prioritize guest interests from unstructured text data (messages, reviews, support tickets) to provide personalized recommendations to hosts',
      requirements: [
        'Extract structured interests from unstructured text at scale',
        'Process reviews, messages, and support tickets',
        'Map extracted entities to home attributes',
        'Provide confidence scoring for recommendations',
        'Support multi-language content processing',
        'Enable host optimization recommendations'
      ],
      estimations: 'Data: Review text, business information, photos, user interactions. Processing: Universal representations for diverse content types. Scale: Millions of reviews and interactions',
      components: [
        'Text Processing Service: Handle reviews, messages, support tickets',
        'NER Module: TextCNN for extracting key phrases from unstructured text',
        'Entity Mapping Service: Unsupervised mapping to home attributes using cosine similarity',
        'Universal Sentence Encoder: Deep Averaging Network (DAN) architecture',
        'Frequency Analysis Service: Aggregate normalized frequencies across text sources',
        'Inference Model: Predict expected frequencies for home segments',
        'Bayesian Scoring Service: Confidence scoring for attribute existence',
        'Host Recommendation API: Personalized attribute suggestions'
      ],
      keyDecisions: [
        'LATEX system architecture with NER + entity mapping',
        'TextCNN trained on human-labeled text data for entity recognition',
        'Universal Sentence Encoder for text embeddings',
        'Cosine distance for entity-to-attribute mapping',
        'Business representation through weighted averaging of review embeddings',
        'Bayesian inference for confidence scoring and recommendations'
      ]
    }
  },
  
  // MLOps Case Studies
  {
    id: 'foodpanda-menu-ranking',
    title: 'Foodpanda: Menu Ranking A/B Testing',
    category: 'Case Studies',
    caseStudyCategory: 'MLOps',
    icon: Settings,
    color: 'from-green-500 to-teal-500',
    difficulty: 'Medium',
    description: 'Design an A/B testing system for optimizing menu ranking across multiple countries',
    content: {
      overview: 'Design an A/B testing infrastructure to optimize menu ranking (category and product order) through systematic experimentation, scaling across multiple countries',
      requirements: [
        'Optimize menu ranking through systematic A/B testing',
        'Scale experiments across multiple countries',
        'Handle menu changes during testing windows',
        'Reduce experiment failure rates',
        'Support concurrent processing for faster execution',
        'Prioritize high-volume countries for processing'
      ],
      estimations: 'Processing: Reduced from 9 hours to 3h45m execution time. Failure Rate: Reduced from 4% to 2.2%. Scale: Multiple countries with varying data volumes',
      components: [
        'Apache Airflow DAG: Orchestrate experiment execution workflow',
        'BigQuery Analysis Service: Determine suitable B versions through data analysis',
        'Pagination Service: OFFSET/LIMIT processing for concurrent execution',
        'Concurrent Task Manager: Parallel processing for different data pages',
        'Country Prioritization Service: Process high-volume countries first',
        'Resource Management Service: Dedicated DAG pools and CPU allocation',
        'Error Handling Service: Manage menu change failures during experiments',
        'Performance Monitoring: Track execution times and failure rates'
      ],
      keyDecisions: [
        'Apache Airflow DAG for systematic experiment workflow',
        'Pagination with OFFSET/LIMIT for concurrent BigQuery processing',
        'Country prioritization to process high-volume markets first',
        'Resource management with dedicated DAG pools and increased CPU allocation',
        'Error handling for menu changes during experiment windows',
        'Performance optimization: 2x faster execution through concurrency'
      ]
    }
  }
];

// Case study categories for filtering
export const caseStudyCategories = [
  'All',
  'System Design',
  'Machine Learning',
  'AI/LLM',
  'MLOps'
] as const;
