import { Brain, Cpu, Zap, Target, Shield, Users, Code, Database } from 'lucide-react';
import { Topic } from '../../types';

export const genaiTopics: Topic[] = [
  {
    id: 'transformer-architecture',
    title: 'Transformer Architecture',
    category: 'GenAI & LLM',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
    description: 'Core architecture of modern LLMs including attention mechanisms',
    content: {
      overview: 'The Transformer architecture, introduced in "Attention Is All You Need," is the foundational building block for nearly all state-of-the-art Large Language Models (LLMs).',
      keyPoints: [
        'Self-attention mechanism weighs importance of different words regardless of position',
        'Multi-head attention captures diverse patterns through parallel attention heads',
        'Positional encodings provide sequence order information to permutation-invariant attention',
        'Query (Q), Key (K), and Value (V) vectors enable contextual relationship modeling',
        'Encoder-decoder architecture with residual connections and layer normalization',
        'Parallel processing enables faster training compared to RNNs',
        'Can model long-range dependencies effectively'
      ],
      example: 'In "The cat sat on the mat because it was tired," self-attention helps the model understand that "it" refers to "the cat" by assigning high attention scores between these words.',
      detailedExplanation: 'The Transformer revolutionized NLP by replacing sequential RNN processing with parallelizable self-attention. Each layer contains multi-head self-attention and feed-forward networks with residual connections. The self-attention mechanism computes attention scores by taking dot products of Query vectors with Key vectors, then uses these scores to weight Value vectors. This allows the model to focus on relevant parts of the input when encoding each word.',
      diagrams: [],
      realWorldExamples: [
        'GPT series: Decoder-only transformers for text generation',
        'BERT: Encoder-only transformers for understanding tasks',
        'T5: Encoder-decoder transformers for sequence-to-sequence tasks',
        'ChatGPT: Uses transformer architecture for conversational AI',
        'Google Translate: Transformer-based neural machine translation'
      ],
      commonMistakes: [
        'Confusing self-attention with cross-attention mechanisms',
        'Not understanding why positional encodings are necessary',
        'Assuming all transformers use the same attention pattern',
        'Ignoring the computational complexity of attention mechanisms',
        'Not considering memory requirements for long sequences'
      ],
      interviewTips: [
        'Explain the three vectors (Q, K, V) and their roles clearly',
        'Discuss why transformers replaced RNNs for many tasks',
        'Mention the parallel processing advantages',
        'Explain positional encoding necessity and methods',
        'Compare different transformer variants (encoder-only, decoder-only, encoder-decoder)'
      ],
      relatedTopics: ['attention-mechanisms', 'positional-encodings', 'model-architectures', 'tokenization'],
      tradeoffs: {
        considerations: [
          'Computational complexity scales quadratically with sequence length',
          'Memory requirements increase significantly for long sequences',
          'Parallel training vs sequential inference trade-offs',
          'Model size vs performance trade-offs'
        ],
        prosAndCons: {
          pros: [
            'Parallel processing enables faster training',
            'Effective modeling of long-range dependencies',
            'Superior performance on many NLP tasks',
            'Flexible architecture adaptable to various tasks',
            'Strong transfer learning capabilities'
          ],
          cons: [
            'Quadratic complexity with sequence length',
            'High memory requirements for long sequences',
            'Requires large amounts of training data',
            'Computationally expensive for inference',
            'Black box nature makes interpretability challenging'
          ]
        }
      },
      implementation: {
        technologies: ['PyTorch', 'TensorFlow', 'Hugging Face Transformers', 'JAX', 'CUDA'],
        algorithms: ['Scaled Dot-Product Attention', 'Multi-Head Attention', 'Layer Normalization'],
        protocols: ['HTTP/REST APIs', 'gRPC', 'WebSocket']
      },
      benchmarks: [
        { metric: 'Attention Complexity', value: 'O(n²)', context: 'Quadratic with sequence length' },
        { metric: 'Training Speed', value: '10x faster than RNNs', context: 'Due to parallelization' },
        { metric: 'Context Window', value: '2K-10M tokens', context: 'Varies by model implementation' }
      ]
    }
  },
  {
    id: 'attention-mechanisms',
    title: 'Attention Mechanisms',
    category: 'GenAI & LLM',
    icon: Target,
    color: 'from-purple-500 to-pink-500',
    description: 'Self-attention, multi-head attention, and positional encodings',
    content: {
      overview: 'Attention mechanisms allow models to focus on relevant parts of input sequences, forming the core of transformer architectures.',
      keyPoints: [
        'Self-attention computes relationships between all positions in a sequence',
        'Query, Key, Value matrices enable flexible attention computation',
        'Multi-head attention captures different types of relationships in parallel',
        'Scaled dot-product attention prevents gradient vanishing in large dimensions',
        'Causal masking in decoders prevents attending to future tokens',
        'Cross-attention connects encoder and decoder in seq2seq models',
        'Attention weights provide interpretability into model focus'
      ],
      example: 'In machine translation, attention helps the model focus on relevant source words when generating each target word, improving translation quality.',
      detailedExplanation: 'Attention mechanisms compute a weighted sum of values based on the compatibility between queries and keys. The attention function maps queries and key-value pairs to outputs. Multi-head attention runs multiple attention functions in parallel, allowing the model to attend to information from different representation subspaces.',
      diagrams: [],
      realWorldExamples: [
        'Google Translate: Cross-attention between source and target languages',
        'BERT: Self-attention for bidirectional context understanding',
        'GPT: Causal self-attention for autoregressive generation',
        'Vision Transformers: Self-attention applied to image patches',
        'Speech recognition: Attention over audio features for transcription'
      ],
      commonMistakes: [
        'Confusing self-attention with cross-attention',
        'Not understanding the role of scaling in dot-product attention',
        'Ignoring the importance of attention masking patterns',
        'Assuming attention weights directly indicate importance',
        'Not considering computational complexity of attention'
      ],
      interviewTips: [
        'Clearly explain the Q, K, V computation process',
        'Discuss different attention patterns (self, cross, causal)',
        'Mention attention complexity and optimization techniques',
        'Explain how multi-head attention captures diverse patterns',
        'Consider attention visualization and interpretability'
      ],
      relatedTopics: ['transformer-architecture', 'positional-encodings', 'model-architectures'],
      tradeoffs: {
        considerations: [
          'Attention complexity vs sequence length',
          'Number of attention heads vs computational cost',
          'Attention dropout vs model capacity',
          'Local vs global attention patterns'
        ],
        prosAndCons: {
          pros: [
            'Captures long-range dependencies effectively',
            'Enables parallel computation during training',
            'Provides interpretability through attention weights',
            'Flexible mechanism adaptable to various tasks',
            'Superior to RNN/CNN for many sequence tasks'
          ],
          cons: [
            'Quadratic complexity with sequence length',
            'High memory requirements for long sequences',
            'Attention weights may not reflect true importance',
            'Requires careful initialization and training',
            'Can suffer from attention collapse in some cases'
          ]
        }
      },
      implementation: {
        technologies: ['PyTorch', 'TensorFlow', 'JAX', 'Triton', 'Flash Attention'],
        algorithms: ['Scaled Dot-Product Attention', 'Multi-Head Attention', 'Sparse Attention'],
        protocols: ['CUDA kernels', 'Memory-efficient attention']
      },
      benchmarks: [
        { metric: 'Attention Heads', value: '8-32', context: 'Typical range for transformer models' },
        { metric: 'Head Dimension', value: '64-128', context: 'Common attention head sizes' },
        { metric: 'Memory Usage', value: 'O(n² × d)', context: 'Attention memory complexity' }
      ]
    }
  },
  {
    id: 'tokenization-embeddings',
    title: 'Tokenization & Embeddings',
    category: 'GenAI & LLM',
    icon: Code,
    color: 'from-green-500 to-emerald-500',
    description: 'Converting text to numerical representations for model processing',
    content: {
      overview: 'Tokenization breaks text into subword units, while embeddings convert these tokens into dense vector representations that capture semantic meaning.',
      keyPoints: [
        'Byte-Pair Encoding (BPE) iteratively merges frequent character pairs',
        'SentencePiece treats input as Unicode characters, suitable for multiple languages',
        'WordPiece selects merges based on maximizing language model likelihood',
        'Embeddings map tokens to high-dimensional vectors capturing semantic relationships',
        'Positional encodings add sequence order information to token embeddings',
        'Vocabulary size affects model size and tokenization efficiency',
        'Subword tokenization handles out-of-vocabulary words effectively'
      ],
      example: 'The word "unhappiness" might be tokenized as ["un", "happy", "ness"] in BPE, allowing the model to understand morphological structure.',
      detailedExplanation: 'Tokenization is the first step in text processing, converting raw text into discrete units. Modern approaches use subword tokenization to balance vocabulary size with representation capability. Embeddings then map these tokens to dense vectors where semantically similar tokens have similar representations. The combination enables models to process text numerically while preserving meaning.',
      diagrams: [],
      realWorldExamples: [
        'GPT models: BPE tokenization with learned positional embeddings',
        'BERT: WordPiece tokenization with absolute positional encodings',
        'T5: SentencePiece tokenization for multilingual support',
        'Multilingual models: SentencePiece for consistent cross-language tokenization',
        'Code generation models: Specialized tokenization for programming languages'
      ],
      commonMistakes: [
        'Not considering tokenization effects on model performance',
        'Using inappropriate tokenization for specific domains',
        'Ignoring vocabulary size impact on model efficiency',
        'Not handling special tokens properly',
        'Assuming tokenization is language-agnostic'
      ],
      interviewTips: [
        'Explain different tokenization algorithms and their trade-offs',
        'Discuss how embeddings capture semantic relationships',
        'Mention the importance of vocabulary size selection',
        'Consider domain-specific tokenization needs',
        'Explain positional encoding integration with embeddings'
      ],
      relatedTopics: ['transformer-architecture', 'positional-encodings', 'vocabulary-size', 'preprocessing'],
      tradeoffs: {
        considerations: [
          'Vocabulary size vs model size and efficiency',
          'Subword granularity vs semantic preservation',
          'Language-specific vs universal tokenization',
          'Training data requirements vs tokenization complexity'
        ],
        prosAndCons: {
          pros: [
            'BPE: Efficient compression, handles rare words well',
            'SentencePiece: Language-agnostic, no pre-tokenization needed',
            'WordPiece: Optimized for language modeling objectives',
            'Subword tokenization: Handles morphologically rich languages',
            'Dense embeddings: Capture semantic relationships effectively'
          ],
          cons: [
            'BPE: May not respect linguistic boundaries',
            'SentencePiece: More complex implementation',
            'WordPiece: Requires language model for optimization',
            'All methods: Vocabulary size affects model parameters',
            'Embeddings: High-dimensional vectors require significant memory'
          ]
        }
      },
      implementation: {
        technologies: ['Hugging Face Tokenizers', 'SentencePiece', 'tiktoken', 'spaCy', 'NLTK'],
        algorithms: ['Byte-Pair Encoding', 'WordPiece', 'SentencePiece', 'Unigram Language Model'],
        protocols: ['Unicode normalization', 'Text preprocessing pipelines']
      },
      benchmarks: [
        { metric: 'Vocabulary Size', value: '32K-100K tokens', context: 'Common range for modern LLMs' },
        { metric: 'Compression Ratio', value: '3-4 chars/token', context: 'Typical BPE compression' },
        { metric: 'Embedding Dimension', value: '512-4096', context: 'Common embedding sizes' }
      ]
    }
  },
  {
    id: 'sampling-strategies',
    title: 'Sampling Strategies',
    category: 'GenAI & LLM',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    description: 'Controlling LLM output generation through temperature, top-k, and top-p sampling',
    content: {
      overview: 'Sampling strategies control how LLMs select tokens during generation, balancing creativity and coherence in outputs.',
      keyPoints: [
        'Temperature scaling controls randomness in token selection',
        'Top-K sampling limits selection to K most likely tokens',
        'Top-P (nucleus) sampling uses dynamic vocabulary based on cumulative probability',
        'Lower temperature (0.1-0.3) produces more deterministic outputs',
        'Higher temperature (0.7-1.0) increases creativity but may reduce coherence',
        'Top-K with small K (5-10) is more predictable, large K (40-50) more diverse',
        'Top-P around 0.9 often provides good balance of quality and diversity'
      ],
      example: 'For creative writing, use temperature=0.8 with top-p=0.9. For factual Q&A, use temperature=0.2 with top-k=10.',
      detailedExplanation: 'LLMs output probability distributions over vocabulary at each step. Sampling strategies determine how to select the next token from this distribution. Temperature scales logits before softmax, affecting the sharpness of the distribution. Top-K restricts sampling to the most likely tokens, while Top-P dynamically adjusts the sampling pool based on cumulative probability.',
      diagrams: [],
      realWorldExamples: [
        'ChatGPT: Uses temperature and top-p for balanced responses',
        'GitHub Copilot: Lower temperature for more predictable code generation',
        'Creative writing tools: Higher temperature for diverse story generation',
        'Customer service bots: Conservative sampling for consistent responses',
        'Code completion: Top-k sampling to avoid unlikely syntax'
      ],
      commonMistakes: [
        'Using high temperature for factual tasks requiring accuracy',
        'Not adjusting sampling parameters for different use cases',
        'Ignoring the interaction between temperature and top-k/top-p',
        'Not considering repetition penalties for long-form generation',
        'Using deterministic sampling (temperature=0) when diversity is needed'
      ],
      interviewTips: [
        'Explain how each sampling method affects output characteristics',
        'Discuss appropriate parameter ranges for different tasks',
        'Mention the trade-off between creativity and coherence',
        'Consider combining multiple sampling strategies',
        'Explain how to tune parameters based on evaluation metrics'
      ],
      relatedTopics: ['transformer-architecture', 'text-generation', 'model-evaluation', 'hyperparameter-tuning'],
      tradeoffs: {
        considerations: [
          'Creativity vs coherence in generated text',
          'Deterministic vs stochastic generation',
          'Computational cost of different sampling methods',
          'Task-specific optimal parameter ranges'
        ],
        prosAndCons: {
          pros: [
            'Temperature: Simple and effective randomness control',
            'Top-K: Prevents selection of very unlikely tokens',
            'Top-P: Adaptive vocabulary size based on confidence',
            'Combination: Can leverage benefits of multiple strategies',
            'Tunable: Parameters can be adjusted for specific tasks'
          ],
          cons: [
            'Temperature: May still select inappropriate tokens at high values',
            'Top-K: Fixed vocabulary size may be suboptimal',
            'Top-P: Can be too restrictive or permissive depending on distribution',
            'Parameter tuning: Requires experimentation and evaluation',
            'Context dependency: Optimal parameters vary by task and model'
          ]
        }
      },
      implementation: {
        technologies: ['Hugging Face Transformers', 'OpenAI API', 'PyTorch', 'TensorFlow', 'vLLM'],
        algorithms: ['Softmax with temperature', 'Top-K filtering', 'Nucleus sampling', 'Repetition penalty'],
        protocols: ['REST APIs', 'Streaming responses', 'Batch inference']
      },
      benchmarks: [
        { metric: 'Temperature Range', value: '0.1-1.0', context: 'Common range for most tasks' },
        { metric: 'Top-K Range', value: '10-50', context: 'Typical values for balanced generation' },
        { metric: 'Top-P Range', value: '0.8-0.95', context: 'Common nucleus sampling thresholds' }
      ]
    }
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    category: 'GenAI & LLM',
    icon: Target,
    color: 'from-indigo-500 to-purple-500',
    description: 'Techniques for designing effective prompts to guide LLM behavior',
    content: {
      overview: 'Prompt engineering is the practice of designing and refining inputs to guide LLM outputs toward desired results through strategic prompt construction.',
      keyPoints: [
        'Zero-shot: Task description without examples',
        'Few-shot: 2-5 examples demonstrating the desired task',
        'Chain-of-Thought (CoT): Encourages step-by-step reasoning',
        'Role prompting: Instructs model to act as specific persona or expert',
        'System prompts: Set overall behavior and constraints',
        'Prompt versioning: Track and test different prompt iterations',
        'Context optimization: Maximize effective use of context window'
      ],
      example: 'CoT prompt: "What is 15% of 240? Let\'s think step by step. First, convert 15% to decimal: 0.15. Then multiply: 240 × 0.15 = 36."',
      detailedExplanation: 'Prompt engineering leverages the few-shot learning capabilities of LLMs to perform tasks without fine-tuning. The quality and structure of prompts significantly impact output quality. Effective prompts provide clear instructions, relevant examples, and appropriate context while staying within token limits.',
      diagrams: [],
      realWorldExamples: [
        'GitHub Copilot: Code completion prompts with context',
        'ChatGPT: System prompts defining assistant behavior',
        'Customer service: Role-based prompts for consistent responses',
        'Content generation: Style and tone guidance through prompts',
        'Data analysis: Step-by-step reasoning prompts for calculations'
      ],
      commonMistakes: [
        'Providing ambiguous or contradictory instructions',
        'Using too many examples that exceed context limits',
        'Not testing prompts across different inputs',
        'Ignoring the importance of prompt structure and formatting',
        'Not considering prompt injection vulnerabilities'
      ],
      interviewTips: [
        'Explain different prompting techniques and their use cases',
        'Discuss prompt optimization strategies',
        'Mention the importance of prompt testing and iteration',
        'Consider security implications of prompt design',
        'Explain how to measure prompt effectiveness'
      ],
      relatedTopics: ['few-shot-learning', 'chain-of-thought', 'context-management', 'model-evaluation'],
      tradeoffs: {
        considerations: [
          'Prompt length vs context window utilization',
          'Specificity vs generalizability of prompts',
          'Example quality vs quantity in few-shot learning',
          'Prompt complexity vs model understanding'
        ],
        prosAndCons: {
          pros: [
            'No fine-tuning required for task adaptation',
            'Quick iteration and testing of different approaches',
            'Leverages pre-trained model knowledge effectively',
            'Cost-effective compared to model training',
            'Flexible and easily modifiable'
          ],
          cons: [
            'Limited by context window size',
            'May not achieve fine-tuned model performance',
            'Requires careful prompt design and testing',
            'Sensitive to prompt wording and structure',
            'Difficult to version control and manage at scale'
          ]
        }
      },
      implementation: {
        technologies: ['LangChain', 'Prompt templates', 'A/B testing frameworks', 'Version control systems'],
        algorithms: ['Few-shot learning', 'In-context learning', 'Chain-of-thought reasoning'],
        protocols: ['API prompt formatting', 'Template systems', 'Prompt injection prevention']
      },
      benchmarks: [
        { metric: 'Few-shot Examples', value: '2-5', context: 'Optimal range for most tasks' },
        { metric: 'Prompt Length', value: '100-500 tokens', context: 'Effective prompt size range' },
        { metric: 'Performance Gain', value: '20-50%', context: 'Improvement over zero-shot' }
      ]
    }
  },
  {
    id: 'fine-tuning-peft',
    title: 'Fine-Tuning & PEFT',
    category: 'GenAI & LLM',
    icon: Cpu,
    color: 'from-teal-500 to-cyan-500',
    description: 'Parameter-efficient fine-tuning techniques including LoRA and QLoRA',
    content: {
      overview: 'Parameter-Efficient Fine-Tuning (PEFT) adapts pre-trained models to specific tasks while updating only a small subset of parameters.',
      keyPoints: [
        'LoRA injects low-rank matrices into transformer layers',
        'QLoRA combines LoRA with 4-bit quantization for memory efficiency',
        'Adapters add small trainable modules between existing layers',
        'Prefix tuning optimizes continuous prompts prepended to inputs',
        'P-tuning optimizes prompt embeddings for specific tasks',
        'PEFT reduces trainable parameters by 10,000x compared to full fine-tuning',
        'Enables fine-tuning large models on consumer hardware'
      ],
      example: 'LoRA with rank 8 on a 1024×1024 weight matrix reduces trainable parameters from 1M+ to just 16,384 while maintaining performance.',
      detailedExplanation: 'PEFT techniques are based on the hypothesis that model adaptation has low intrinsic dimensionality. LoRA decomposes weight updates into low-rank matrices, QLoRA adds quantization to reduce memory further, and adapters insert small networks between layers. These approaches enable efficient adaptation while preserving pre-trained knowledge.',
      diagrams: [],
      realWorldExamples: [
        'Alpaca: LoRA fine-tuning of LLaMA for instruction following',
        'Code generation: Fine-tuning models for specific programming languages',
        'Domain adaptation: Medical, legal, or scientific text processing',
        'Multilingual models: Language-specific fine-tuning with PEFT',
        'Personalization: User-specific model adaptation'
      ],
      commonMistakes: [
        'Using full fine-tuning when PEFT would suffice',
        'Not choosing appropriate rank for LoRA',
        'Ignoring the base model quality when fine-tuning',
        'Not evaluating catastrophic forgetting',
        'Overfitting on small fine-tuning datasets'
      ],
      interviewTips: [
        'Explain the motivation behind parameter-efficient methods',
        'Compare different PEFT techniques and their trade-offs',
        'Discuss when to use PEFT vs full fine-tuning',
        'Mention memory and computational benefits',
        'Consider evaluation strategies for fine-tuned models'
      ],
      relatedTopics: ['model-adaptation', 'transfer-learning', 'quantization', 'memory-optimization'],
      tradeoffs: {
        considerations: [
          'Parameter efficiency vs adaptation capability',
          'Memory savings vs potential performance loss',
          'Training speed vs final model quality',
          'Rank selection in LoRA vs performance trade-offs'
        ],
        prosAndCons: {
          pros: [
            'Dramatically reduced memory requirements',
            'Faster training compared to full fine-tuning',
            'Preserves pre-trained knowledge better',
            'Enables fine-tuning on consumer hardware',
            'Multiple task-specific adapters can be swapped'
          ],
          cons: [
            'May not achieve full fine-tuning performance',
            'Requires careful hyperparameter tuning',
            'Limited adaptation capability for very different domains',
            'Additional complexity in model serving',
            'May require larger learning rates for effective training'
          ]
        }
      },
      implementation: {
        technologies: ['PEFT library', 'Hugging Face', 'PyTorch', 'bitsandbytes', 'Accelerate'],
        algorithms: ['LoRA', 'QLoRA', 'AdaLoRA', 'Adapters', 'Prefix tuning'],
        protocols: ['Model checkpointing', 'Adapter merging', 'Quantization schemes']
      },
      benchmarks: [
        { metric: 'Memory Reduction', value: '10x with QLoRA', context: 'Compared to full fine-tuning' },
        { metric: 'Parameter Reduction', value: '10,000x with LoRA', context: 'Trainable parameters' },
        { metric: 'Performance Retention', value: '95-99%', context: 'Compared to full fine-tuning' }
      ]
    }
  },
  {
    id: 'rag-systems',
    title: 'RAG Systems',
    category: 'GenAI & LLM',
    icon: Database,
    color: 'from-violet-500 to-purple-500',
    description: 'Retrieval-Augmented Generation for grounding LLMs in external knowledge',
    content: {
      overview: 'RAG combines LLM generative capabilities with information retrieval to provide accurate, up-to-date responses grounded in external knowledge sources.',
      keyPoints: [
        'Retriever fetches relevant documents based on query similarity',
        'Generator (LLM) synthesizes answers using retrieved context',
        'Vector databases store and search document embeddings efficiently',
        'Hybrid search combines semantic (vector) and keyword (BM25) retrieval',
        'Chunking strategies balance context completeness and retrieval precision',
        'RAG reduces hallucinations by up to 71% on average',
        'Enables knowledge updates without model retraining'
      ],
      example: 'A customer service RAG system retrieves relevant documentation based on user queries and generates contextual responses using the retrieved information.',
      detailedExplanation: 'RAG addresses LLM limitations by providing external knowledge access. The system first retrieves relevant documents using embedding similarity, then includes these documents as context for the LLM to generate grounded responses. This approach enables up-to-date information access and reduces factual errors.',
      diagrams: [],
      realWorldExamples: [
        'Microsoft Copilot: RAG over code repositories and documentation',
        'Customer support: RAG over knowledge bases and FAQs',
        'Legal research: RAG over case law and legal documents',
        'Medical diagnosis: RAG over medical literature and guidelines',
        'Enterprise search: RAG over internal company documents'
      ],
      commonMistakes: [
        'Poor chunking strategies that break context',
        'Not optimizing retrieval relevance and ranking',
        'Ignoring the quality of the knowledge base',
        'Not handling retrieval failures gracefully',
        'Overlooking the computational cost of retrieval'
      ],
      interviewTips: [
        'Explain the three main components: retriever, knowledge base, generator',
        'Discuss different retrieval strategies and their trade-offs',
        'Mention vector database options and selection criteria',
        'Consider evaluation metrics for RAG systems',
        'Explain how RAG addresses LLM limitations'
      ],
      relatedTopics: ['vector-databases', 'embeddings', 'information-retrieval', 'knowledge-bases'],
      tradeoffs: {
        considerations: [
          'Retrieval accuracy vs computational cost',
          'Knowledge base size vs retrieval speed',
          'Context length vs retrieval precision',
          'Real-time updates vs system complexity'
        ],
        prosAndCons: {
          pros: [
            'Reduces hallucinations significantly (up to 71%)',
            'Enables access to up-to-date information',
            'No model retraining needed for knowledge updates',
            'Provides source attribution for generated content',
            'Scalable to large knowledge bases'
          ],
          cons: [
            'Additional complexity in system architecture',
            'Retrieval latency adds to response time',
            'Quality depends heavily on knowledge base quality',
            'Requires careful tuning of retrieval parameters',
            'May struggle with complex multi-hop reasoning'
          ]
        }
      },
      implementation: {
        technologies: ['Pinecone', 'Weaviate', 'Chroma', 'FAISS', 'Elasticsearch', 'LangChain'],
        algorithms: ['Dense retrieval', 'BM25', 'Hybrid search', 'Re-ranking', 'Query expansion'],
        protocols: ['Vector similarity search', 'REST APIs', 'Streaming responses']
      },
      benchmarks: [
        { metric: 'Hallucination Reduction', value: '71%', context: 'Average improvement with RAG' },
        { metric: 'Retrieval Latency', value: '<100ms', context: 'Target for real-time applications' },
        { metric: 'Chunk Size', value: '200-500 tokens', context: 'Optimal range for most use cases' }
      ]
    }
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI Systems',
    category: 'GenAI & LLM',
    icon: Users,
    color: 'from-pink-500 to-rose-500',
    description: 'Autonomous AI agents that can reason, plan, and act using tools',
    content: {
      overview: 'Agentic AI systems are autonomous agents that perceive environments, make decisions, and execute actions to achieve goals with minimal human intervention.',
      keyPoints: [
        'Agents combine reasoning, planning, and acting capabilities',
        'ReAct pattern interleaves reasoning and action through thought-action-observation cycles',
        'CodeAct enables agents to generate and execute code dynamically',
        'Multi-agent systems coordinate specialized agents for complex tasks',
        'Tool use allows agents to access external APIs and services',
        'Memory systems maintain context across interactions',
        'Planning components sequence tasks and track progress'
      ],
      example: 'A customer service agent perceives user queries, reasons about intent, plans response steps (retrieve account info, check order status), and acts by providing comprehensive answers.',
      detailedExplanation: 'Agentic AI represents a paradigm shift from reactive to proactive AI systems. These agents operate in continuous perception-action loops, using LLMs as reasoning engines while leveraging external tools for actions. The agent-environment interaction enables autonomous task completion and adaptation to dynamic scenarios.',
      diagrams: [],
      realWorldExamples: [
        'AutoGPT: Autonomous task completion with web browsing and file operations',
        'LangChain agents: Tool-using agents for various domains',
        'Microsoft Copilot: Code generation and debugging assistance',
        'Customer service bots: Multi-step problem resolution',
        'Research assistants: Information gathering and synthesis'
      ],
      commonMistakes: [
        'Not providing clear goals and constraints to agents',
        'Insufficient error handling for tool failures',
        'Poor coordination in multi-agent systems',
        'Not implementing proper safety measures and guardrails',
        'Ignoring the computational cost of agent operations'
      ],
      interviewTips: [
        'Explain the agent perception-action loop clearly',
        'Discuss different agentic design patterns (ReAct, CodeAct)',
        'Mention tool integration and API usage',
        'Consider multi-agent coordination challenges',
        'Explain memory and planning components'
      ],
      relatedTopics: ['multi-agent-systems', 'tool-use', 'planning-algorithms', 'mcp-protocol'],
      tradeoffs: {
        considerations: [
          'Autonomy vs human control and oversight',
          'Single agent vs multi-agent system complexity',
          'Tool diversity vs system reliability',
          'Real-time response vs thorough planning'
        ],
        prosAndCons: {
          pros: [
            'Autonomous task completion with minimal supervision',
            'Can handle complex, multi-step workflows',
            'Adaptable to dynamic and changing environments',
            'Leverages external tools and APIs effectively',
            'Scalable through multi-agent coordination'
          ],
          cons: [
            'Higher complexity compared to simple LLM applications',
            'Potential for unexpected or undesired behaviors',
            'Requires robust error handling and safety measures',
            'Higher computational and operational costs',
            'Challenging to debug and maintain'
          ]
        }
      },
      implementation: {
        technologies: ['LangChain', 'AutoGPT', 'CrewAI', 'LangGraph', 'OpenAI Function Calling'],
        algorithms: ['ReAct', 'Planning algorithms', 'Tool selection', 'Multi-agent coordination'],
        protocols: ['REST APIs', 'WebSocket', 'Message queues', 'Event-driven architecture']
      },
      benchmarks: [
        { metric: 'Task Completion Rate', value: '80-95%', context: 'For well-defined tasks' },
        { metric: 'Tool Call Accuracy', value: '90-98%', context: 'Correct tool selection and usage' },
        { metric: 'Multi-step Success', value: '70-85%', context: 'Complex multi-step task completion' }
      ]
    }
  },
  {
    id: 'model-context-protocol',
    title: 'Model Context Protocol (MCP)',
    category: 'GenAI & LLM',
    icon: Shield,
    color: 'from-emerald-500 to-green-500',
    description: 'Standardized protocol for AI model interaction with external tools and data sources',
    content: {
      overview: 'MCP is an open standard that simplifies and standardizes how AI models interact with external tools and data sources, often described as "USB-C for AI applications."',
      keyPoints: [
        'Standardizes communication between LLMs and external tools',
        'Client-server architecture with host, client, server, and transport components',
        'Supports both local (stdio) and remote (HTTP/SSE) connections',
        'Eliminates need for custom integrations for each tool',
        'Provides universal connector for seamless tool access',
        'Enables interoperability between different models and tools',
        'Supports secure authentication and authorization'
      ],
      example: 'An MCP server wraps a database API, allowing any MCP-compatible LLM to query the database using standardized protocol messages.',
      detailedExplanation: 'MCP abstracts the complexity of tool integration by providing a standardized protocol. The host application contains the LLM, the MCP client manages connections, MCP servers wrap external functionality, and the transport layer handles communication. This architecture enables any MCP-compatible LLM to use any MCP-compatible tool.',
      diagrams: [],
      realWorldExamples: [
        'Claude Desktop: Uses MCP to connect to various data sources',
        'Development tools: MCP servers for code repositories and databases',
        'Enterprise applications: Standardized access to internal systems',
        'Research tools: MCP servers for academic databases and APIs',
        'Productivity apps: Integration with calendars, email, and file systems'
      ],
      commonMistakes: [
        'Not understanding the client-server architecture',
        'Confusing MCP with agent-to-agent protocols',
        'Ignoring security considerations in MCP implementations',
        'Not properly handling connection failures and retries',
        'Assuming all tools need MCP integration'
      ],
      interviewTips: [
        'Explain the four components of MCP architecture',
        'Discuss the benefits of standardized tool integration',
        'Compare MCP with custom integration approaches',
        'Mention security and authentication features',
        'Consider the ecosystem implications of standardization'
      ],
      relatedTopics: ['agentic-ai', 'tool-integration', 'api-design', 'standardization'],
      tradeoffs: {
        considerations: [
          'Standardization vs custom optimization',
          'Protocol overhead vs integration simplicity',
          'Universal compatibility vs specific tool features',
          'Security vs ease of use'
        ],
        prosAndCons: {
          pros: [
            'Eliminates custom integration development',
            'Enables interoperability between models and tools',
            'Reduces maintenance overhead for tool connections',
            'Provides standardized security and authentication',
            'Facilitates ecosystem growth and tool sharing'
          ],
          cons: [
            'Protocol overhead may impact performance',
            'May not support all tool-specific features',
            'Requires adoption by tool providers',
            'Additional abstraction layer complexity',
            'Potential vendor lock-in to MCP ecosystem'
          ]
        }
      },
      implementation: {
        technologies: ['MCP SDK', 'JSON-RPC', 'Server-Sent Events', 'WebSocket', 'stdio transport'],
        algorithms: ['Protocol negotiation', 'Message routing', 'Error handling'],
        protocols: ['MCP specification', 'HTTP/SSE', 'stdio', 'Authentication protocols']
      },
      benchmarks: [
        { metric: 'Integration Time', value: '90% reduction', context: 'Compared to custom integrations' },
        { metric: 'Protocol Overhead', value: '<10ms', context: 'Additional latency per request' },
        { metric: 'Tool Compatibility', value: 'Universal', context: 'Any MCP-compatible tool works with any MCP client' }
      ]
    }
  }
];
