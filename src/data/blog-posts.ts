/**
 * 博客文章数据配置
 * 
 * 📝 TODO(老徐): 对接 CMS (Contentful/Strapi)
 * 
 * 使用场景: src/pages/Company/Blog.tsx
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: {
    en: string;
    zh: string;
  };
  excerpt: {
    en: string;
    zh: string;
  };
  content: {
    en: string;
    zh: string;
  };
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  publishedAt: string;
  updatedAt: string;
  coverImage?: string;
  tags: string[];
  category: string;
  readTime: number; // minutes
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-001',
    slug: 'future-of-ai-voice-agents',
    title: {
      en: 'The Future of AI Voice Agents in Customer Service',
      zh: 'AI 语音智能体在客户服务中的未来',
    },
    excerpt: {
      en: 'Explore how AI voice agents are transforming customer service with natural conversations and 24/7 availability.',
      zh: '探索 AI 语音智能体如何通过自然对话和 24/7 可用性改变客户服务。',
    },
    content: {
      en: 'The customer service landscape is evolving rapidly...',
      zh: '客户服务领域正在迅速演变...',
    },
    author: {
      name: 'Sarah Chen',
      avatar: '/images/avatars/sarah-chen.jpg', // 📝 TODO(老徐): 添加头像图片
      role: 'VP of Product',
    },
    publishedAt: '2025-03-15',
    updatedAt: '2025-03-15',
    coverImage: '/images/blog/ai-voice-future.jpg', // 📝 TODO(老徐): 添加封面图片
    tags: ['AI', 'Customer Service', 'Voice Technology'],
    category: 'Industry Insights',
    readTime: 8,
    featured: true,
  },
  {
    id: 'blog-002',
    slug: 'how-to-choose-voice-ai-platform',
    title: {
      en: 'How to Choose the Right Voice AI Platform for Your Business',
      zh: '如何为您的企业选择合适的语音 AI 平台',
    },
    excerpt: {
      en: 'A comprehensive guide to evaluating voice AI platforms based on features, pricing, and integration capabilities.',
      zh: '一份基于功能、定价和集成能力评估语音 AI 平台的综合指南。',
    },
    content: {
      en: 'Choosing the right voice AI platform is critical...',
      zh: '选择合适的语音 AI 平台至关重要...',
    },
    author: {
      name: 'Michael Johnson',
      avatar: '/images/avatars/michael-johnson.jpg',
      role: 'Solutions Architect',
    },
    publishedAt: '2025-03-10',
    updatedAt: '2025-03-10',
    coverImage: '/images/blog/platform-selection.jpg',
    tags: ['Buying Guide', 'Platform', 'Enterprise'],
    category: 'Guides',
    readTime: 12,
    featured: true,
  },
  {
    id: 'blog-003',
    slug: 'boost-conversion-with-ai-sales-calls',
    title: {
      en: '5 Ways AI Voice Agents Boost Sales Conversion Rates',
      zh: 'AI 语音智能体提升销售转化率的 5 种方式',
    },
    excerpt: {
      en: 'Learn how AI voice agents can help your sales team close more deals with consistent follow-ups and instant responses.',
      zh: '了解 AI 语音智能体如何通过持续跟进和即时响应帮助您的销售团队完成更多交易。',
    },
    content: {
      en: 'Sales teams face the challenge of following up with every lead...',
      zh: '销售团队面临跟进每个潜在客户的挑战...',
    },
    author: {
      name: 'Emily Wang',
      avatar: '/images/avatars/emily-wang.jpg',
      role: 'Head of Growth',
    },
    publishedAt: '2025-03-05',
    updatedAt: '2025-03-05',
    coverImage: '/images/blog/sales-ai.jpg',
    tags: ['Sales', 'Conversion', 'AI Agents'],
    category: 'Sales',
    readTime: 6,
    featured: false,
  },
  {
    id: 'blog-004',
    slug: 'compliance-voice-ai-healthcare',
    title: {
      en: 'Ensuring HIPAA Compliance in Voice AI for Healthcare',
      zh: '确保医疗保健语音 AI 的 HIPAA 合规性',
    },
    excerpt: {
      en: 'A technical deep-dive into HIPAA requirements and how to implement compliant voice AI solutions in healthcare.',
      zh: '深入技术层面了解 HIPAA 要求以及如何在医疗保健中实施合规的语音 AI 解决方案。',
    },
    content: {
      en: 'Healthcare organizations face strict regulatory requirements...',
      zh: '医疗机构面临严格的监管要求...',
    },
    author: {
      name: 'Dr. James Liu',
      avatar: '/images/avatars/james-liu.jpg',
      role: 'Compliance Officer',
    },
    publishedAt: '2025-02-28',
    updatedAt: '2025-02-28',
    coverImage: '/images/blog/healthcare-compliance.jpg',
    tags: ['Healthcare', 'HIPAA', 'Compliance', 'Security'],
    category: 'Compliance',
    readTime: 15,
    featured: false,
  },
  {
    id: 'blog-005',
    slug: 'building-first-voice-ai-agent',
    title: {
      en: 'Building Your First Voice AI Agent: A Step-by-Step Tutorial',
      zh: '构建您的第一个语音 AI 智能体：分步教程',
    },
    excerpt: {
      en: 'From signup to first live call - everything you need to know to deploy your first AI voice agent in under an hour.',
      zh: '从注册到第一通实时电话 - 了解在不到一小时内部署您的第一个 AI 语音智能体所需的一切。',
    },
    content: {
      en: 'Getting started with voice AI is easier than you think...',
      zh: '开始使用语音 AI 比您想象的要容易...',
    },
    author: {
      name: 'Alex Thompson',
      avatar: '/images/avatars/alex-thompson.jpg',
      role: 'Developer Advocate',
    },
    publishedAt: '2025-02-20',
    updatedAt: '2025-02-20',
    coverImage: '/images/blog/tutorial-voice-ai.jpg',
    tags: ['Tutorial', 'Getting Started', 'Developers'],
    category: 'Tutorials',
    readTime: 20,
    featured: true,
  },
];

/**
 * 根据 slug 获取文章
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

/**
 * 获取精选文章
 */
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

/**
 * 根据标签获取文章
 */
export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag));
}

/**
 * 根据分类获取文章
 */
export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}
