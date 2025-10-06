import Head from 'next/head';
import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'InterviewPro Club - System Design & AI/ML Learning Platform',
  description = 'Master system design, AI theory, and machine learning with comprehensive topics, real-world case studies, and interactive diagrams. Learn everything from distributed systems to transformer architecture, RAG systems, LLMOps, and AI deployment strategies. Perfect for interview preparation and professional development.',
  keywords = [
    'system design',
    'software architecture',
    'scalability',
    'distributed systems',
    'microservices',
    'database design',
    'system design interview',
    'software engineering',
    'tech interview prep',
    'system architecture',
    'machine learning',
    'ml theory',
    'deep learning',
    'neural networks',
    'artificial intelligence',
    'generative ai',
    'large language models',
    'llm',
    'transformer architecture',
    'attention mechanisms',
    'prompt engineering',
    'rag systems',
    'retrieval augmented generation',
    'fine tuning',
    'llmops',
    'model deployment',
    'ai safety',
    'hallucination detection',
    'vector databases',
    'agentic ai',
    'model context protocol',
    'mcp',
    'ai monitoring',
    'model optimization',
    'quantization',
    'peft',
    'lora',
    'backpropagation',
    'gradient descent',
    'overfitting',
    'regularization',
    'cross validation',
    'feature engineering',
    'model evaluation',
    'supervised learning',
    'unsupervised learning',
    'reinforcement learning'
  ],
  ogImage = '/og-image.png',
  ogType = 'website',
  canonicalUrl,
  structuredData
}) => {
  const siteUrl = 'https://www.interviewpro.club';
  const fullTitle = title.includes('InterviewPro Club') ? title : `${title} | InterviewPro Club`;
  const fullCanonicalUrl = canonicalUrl || siteUrl;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="InterviewPro Club" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="InterviewPro Club" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      <meta name="twitter:creator" content="@systemdesign" />
      <meta name="twitter:site" content="@systemdesign" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1f2937" />
      <meta name="msapplication-TileColor" content="#1f2937" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
};

// Structured data generators
export const generateTopicStructuredData = (topic: any) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": topic.title,
  "description": topic.description,
  "author": {
    "@type": "Organization",
    "name": "InterviewPro Club"
  },
  "publisher": {
    "@type": "Organization",
    "name": "InterviewPro Club"
  },
  "datePublished": new Date().toISOString(),
  "dateModified": new Date().toISOString(),
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://www.interviewpro.club/topics/${topic.id}`
  }
});

export const generateCaseStudyStructuredData = (caseStudy: any) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": caseStudy.title,
  "description": caseStudy.description,
  "author": {
    "@type": "Organization",
    "name": "InterviewPro Club"
  },
  "publisher": {
    "@type": "Organization",
    "name": "InterviewPro Club"
  },
  "datePublished": new Date().toISOString(),
  "dateModified": new Date().toISOString(),
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://www.interviewpro.club/case-studies/${caseStudy.id}`
  }
});

export const generateWebsiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "InterviewPro Club",
  "description": "System design and AI/ML learning platform. Master distributed systems, machine learning theory, GenAI, and LLMOps with comprehensive topics, real-world case studies, and interactive diagrams. Perfect for interview preparation and professional development.",
  "url": "https://www.interviewpro.club",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.interviewpro.club/?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});
