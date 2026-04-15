/**
 * 资源中心配置
 * 
 * 用于 /resources 页面
 * 包含博客、白皮书、网络研讨会、视频、电子书等内容分类
 */

// =====================================================
// 类型定义
// =====================================================

export interface ResourceItem {
  id: string;
  type: ResourceType;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  
  // 发布信息
  publishedAt: string;
  author?: string;
  
  // 分类标签
  tags: string[];
  category: ResourceCategory;
  
  // 媒体信息
  thumbnail: string;
  mediaUrl?: string;       // 视频/音频链接
  downloadUrl?: string;    // PDF 等下载链接
  
  // 阅读时长/观看时长
  duration?: string;
  readTime?: string;
  
  // SEO 元数据
  slug: string;
  
  // 是否精选
  featured?: boolean;
  
  // 内容片段（用于预览）
  excerpt?: {
    en: string;
    zh: string;
  };
}

export type ResourceType = 
  | 'blog' 
  | 'whitepaper' 
  | 'webinar' 
  | 'video' 
  | 'ebook'
  | 'case-study'
  | 'infographic';

export type ResourceCategory = 
  | 'product-updates'
  | 'industry-insights'
  | 'best-practices'
  | 'customer-success'
  | 'technical-guides'
  | 'tutorials';

export interface ResourceCategoryConfig {
  id: ResourceCategory;
  label: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  icon: string;
}

export interface ResourceTypeConfig {
  id: ResourceType;
  label: {
    en: string;
    zh: string;
  };
  icon: string;
  color: string;
}

// =====================================================
// 资源类型配置
// =====================================================

export const resourceTypes: ResourceTypeConfig[] = [
  {
    id: 'blog',
    label: { en: 'Blog Posts', zh: '博客文章' },
    icon: 'FileText',
    color: '#0066FF'
  },
  {
    id: 'whitepaper',
    label: { en: 'Whitepapers', zh: '白皮书' },
    icon: 'Book',
    color: '#10B981'
  },
  {
    id: 'webinar',
    label: { en: 'Webinars', zh: '网络研讨会' },
    icon: 'Video',
    color: '#F59E0B'
  },
  {
    id: 'video',
    label: { en: 'Videos', zh: '视频' },
    icon: 'PlayCircle',
    color: '#EF4444'
  },
  {
    id: 'ebook',
    label: { en: 'E-Books', zh: '电子书' },
    icon: 'BookOpen',
    color: '#8B5CF6'
  },
  {
    id: 'case-study',
    label: { en: 'Case Studies', zh: '客户案例' },
    icon: 'Award',
    color: '#EC4899'
  },
  {
    id: 'infographic',
    label: { en: 'Infographics', zh: '信息图' },
    icon: 'BarChart',
    color: '#06B6D4'
  }
];

// =====================================================
// 资源分类配置
// =====================================================

export const resourceCategories: ResourceCategoryConfig[] = [
  {
    id: 'product-updates',
    label: { en: 'Product Updates', zh: '产品更新' },
    description: {
      en: 'Latest features, improvements, and release announcements',
      zh: '最新功能、改进和发布公告'
    },
    icon: 'Rocket'
  },
  {
    id: 'industry-insights',
    label: { en: 'Industry Insights', zh: '行业洞察' },
    description: {
      en: 'AI voice technology trends, market analysis, and predictions',
      zh: 'AI 语音技术趋势、市场分析和预测'
    },
    icon: 'TrendingUp'
  },
  {
    id: 'best-practices',
    label: { en: 'Best Practices', zh: '最佳实践' },
    description: {
      en: 'Tips and strategies for successful AI voice deployments',
      zh: 'AI 语音部署成功技巧和策略'
    },
    icon: 'Lightbulb'
  },
  {
    id: 'customer-success',
    label: { en: 'Customer Success', zh: '客户成功' },
    description: {
      en: 'Real-world success stories and ROI case studies',
      zh: '真实成功故事和投资回报案例'
    },
    icon: 'Star'
  },
  {
    id: 'technical-guides',
    label: { en: 'Technical Guides', zh: '技术指南' },
    description: {
      en: 'Deep dives into features, architecture, and integration',
      zh: '深入探讨功能、架构和集成'
    },
    icon: 'Code'
  },
  {
    id: 'tutorials',
    label: { en: 'Tutorials', zh: '教程' },
    description: {
      en: 'Step-by-step guides for setup, configuration, and usage',
      zh: '设置、配置和使用的逐步指南'
    },
    icon: 'GraduationCap'
  }
];

// =====================================================
// 资源内容数据
// =====================================================

export const resources: ResourceItem[] = [
  // -----------------------------------------------------
  // 博客文章
  // -----------------------------------------------------
  {
    id: 'blog-001',
    type: 'blog',
    title: {
      en: '5 Ways AI Voice Agents Transform Customer Service',
      zh: 'AI 语音智能体变革客服的 5 种方式'
    },
    description: {
      en: 'Discover how AI voice technology is revolutionizing customer support operations.',
      zh: '了解 AI 语音技术如何革命性地改变客服运营。'
    },
    publishedAt: '2024-03-15',
    author: 'Sarah Chen',
    tags: ['customer-service', 'ai', 'automation'],
    category: 'industry-insights',
    thumbnail: '/images/resources/blog-001.jpg',
    readTime: '8 min',
    slug: '5-ways-ai-voice-transform-customer-service',
    featured: true,
    excerpt: {
      en: 'Customer service is undergoing a transformation. AI voice agents can handle 80% of routine inquiries while maintaining human-like conversations...',
      zh: '客服正在经历变革。AI 语音智能体可以处理 80% 的日常咨询，同时保持拟人化对话...'
    }
  },
  {
    id: 'blog-002',
    type: 'blog',
    title: {
      en: 'Introducing Custom Voice Cloning Feature',
      zh: '推出自定义语音克隆功能'
    },
    description: {
      en: 'Learn about our new custom voice feature that lets you create branded AI voices.',
      zh: '了解我们的新自定义语音功能，让您创建品牌专属 AI 语音。'
    },
    publishedAt: '2024-03-10',
    author: 'James Wilson',
    tags: ['product-update', 'voice', 'customization'],
    category: 'product-updates',
    thumbnail: '/images/resources/blog-002.jpg',
    readTime: '5 min',
    slug: 'custom-voice-cloning-feature',
    featured: true,
    excerpt: {
      en: 'We\'re excited to announce our new custom voice cloning feature. Now you can create AI voices that match your brand identity...',
      zh: '我们很高兴宣布新的自定义语音克隆功能。现在您可以创建与品牌形象匹配的 AI 语音...'
    }
  },
  {
    id: 'blog-003',
    type: 'blog',
    title: {
      en: 'Best Practices for Call Recording Compliance',
      zh: '通话录音合规最佳实践'
    },
    description: {
      en: 'Navigate the complex landscape of call recording regulations across different regions.',
      zh: '了解不同地区通话录音法规的复杂环境。'
    },
    publishedAt: '2024-02-28',
    author: 'Legal Team',
    tags: ['compliance', 'recording', 'gdpr'],
    category: 'best-practices',
    thumbnail: '/images/resources/blog-003.jpg',
    readTime: '12 min',
    slug: 'call-recording-compliance-best-practices',
    excerpt: {
      en: 'Call recording compliance varies significantly across jurisdictions. This guide covers US, EU, and APAC regulations...',
      zh: '通话录音合规在不同司法管辖区差异显著。本指南涵盖美国、欧盟和亚太法规...'
    }
  },

  // -----------------------------------------------------
  // 白皮书
  // -----------------------------------------------------
  {
    id: 'whitepaper-001',
    type: 'whitepaper',
    title: {
      en: 'The Future of AI Voice Technology 2024',
      zh: '2024 AI 语音技术未来趋势'
    },
    description: {
      en: 'Industry report on AI voice trends, adoption rates, and future predictions.',
      zh: 'AI 语音趋势、采用率和未来预测的行业报告。'
    },
    publishedAt: '2024-03-01',
    tags: ['trends', 'industry-report', '2024'],
    category: 'industry-insights',
    thumbnail: '/images/resources/whitepaper-001.jpg',
    downloadUrl: '/downloads/whitepaper-ai-voice-2024.pdf',
    readTime: '25 pages',
    slug: 'future-of-ai-voice-2024',
    featured: true,
    excerpt: {
      en: 'This comprehensive report analyzes the current state of AI voice technology, market trends, and predicts the future direction...',
      zh: '这份综合报告分析了 AI 语音技术的现状、市场趋势，并预测未来方向...'
    }
  },
  {
    id: 'whitepaper-002',
    type: 'whitepaper',
    title: {
      en: 'ROI Calculator: AI Voice vs Human Agents',
      zh: 'ROI 计算：AI 语音 vs 人工客服'
    },
    description: {
      en: 'Detailed cost analysis framework for evaluating AI voice agent investments.',
      zh: '评估 AI 语音智能体投资的详细成本分析框架。'
    },
    publishedAt: '2024-02-15',
    tags: ['roi', 'cost-analysis', 'comparison'],
    category: 'best-practices',
    thumbnail: '/images/resources/whitepaper-002.jpg',
    downloadUrl: '/downloads/whitepaper-roi-calculator.pdf',
    readTime: '15 pages',
    slug: 'roi-ai-voice-vs-human-agents',
    excerpt: {
      en: 'Calculate the true ROI of AI voice agents. This whitepaper provides a framework for comparing costs, efficiency, and quality...',
      zh: '计算 AI 语音智能体的真实 ROI。本白皮书提供成本、效率和质量的对比框架...'
    }
  },

  // -----------------------------------------------------
  // 网络研讨会
  // -----------------------------------------------------
  {
    id: 'webinar-001',
    type: 'webinar',
    title: {
      en: 'Live Demo: AI Voice Agent Platform',
      zh: '实时演示：AI 语音智能体平台'
    },
    description: {
      en: 'Watch our product demo showcasing AI voice capabilities in real customer scenarios.',
      zh: '观看我们的产品演示，展示真实客户场景中的 AI 语音能力。'
    },
    publishedAt: '2024-03-20',
    tags: ['demo', 'product', 'live'],
    category: 'tutorials',
    thumbnail: '/images/resources/webinar-001.jpg',
    mediaUrl: 'https://youtube.com/watch?v=xxx',
    duration: '45 min',
    slug: 'live-demo-ai-voice-platform',
    featured: true,
    excerpt: {
      en: 'Join our product team for a live demonstration of AI voice agents handling customer service, sales, and survey calls...',
      zh: '加入我们的产品团队，观看 AI 语音智能体处理客服、销售和调研通话的实时演示...'
    }
  },
  {
    id: 'webinar-002',
    type: 'webinar',
    title: {
      en: 'Customer Panel: Voice AI Success Stories',
      zh: '客户座谈：语音 AI 成功故事'
    },
    description: {
      en: 'Real customers share their experiences and results from AI voice deployments.',
      zh: '真实客户分享 AI 语音部署的经验和成果。'
    },
    publishedAt: '2024-02-20',
    tags: ['customer', 'success', 'panel'],
    category: 'customer-success',
    thumbnail: '/images/resources/webinar-002.jpg',
    mediaUrl: 'https://youtube.com/watch?v=yyy',
    duration: '60 min',
    slug: 'customer-panel-voice-ai-success',
    excerpt: {
      en: 'Three enterprise customers discuss their AI voice journey: challenges, implementation, and measurable results...',
      zh: '三位企业客户讨论他们的 AI 语音之旅：挑战、实施和可衡量的成果...'
    }
  },

  // -----------------------------------------------------
  // 视频
  // -----------------------------------------------------
  {
    id: 'video-001',
    type: 'video',
    title: {
      en: 'Getting Started Tutorial',
      zh: '快速入门教程'
    },
    description: {
      en: 'Step-by-step guide to setting up your first AI voice agent.',
      zh: '设置您的第一个 AI 语音智能体的逐步指南。'
    },
    publishedAt: '2024-03-05',
    tags: ['tutorial', 'setup', 'beginner'],
    category: 'tutorials',
    thumbnail: '/images/resources/video-001.jpg',
    mediaUrl: 'https://youtube.com/watch?v=aaa',
    duration: '15 min',
    slug: 'getting-started-tutorial',
    excerpt: {
      en: 'Learn how to set up your first AI voice agent in under 15 minutes. Covers account setup, voice selection, and deployment...',
      zh: '学习如何在 15 分钟内设置您的第一个 AI 语音智能体。涵盖账户设置、语音选择和部署...'
    }
  },
  {
    id: 'video-002',
    type: 'video',
    title: {
      en: 'Integration with Salesforce',
      zh: 'Salesforce 集成教程'
    },
    description: {
      en: 'Technical walkthrough of Salesforce CRM integration.',
      zh: 'Salesforce CRM 集成的技术演示。'
    },
    publishedAt: '2024-02-10',
    tags: ['integration', 'salesforce', 'crm'],
    category: 'technical-guides',
    thumbnail: '/images/resources/video-002.jpg',
    mediaUrl: 'https://youtube.com/watch?v=bbb',
    duration: '20 min',
    slug: 'salesforce-integration-tutorial',
    excerpt: {
      en: 'Detailed technical guide on integrating AI voice agents with Salesforce. Covers API setup, data sync, and workflow triggers...',
      zh: '详细技术指南，介绍 AI 语音智能体与 Salesforce 的集成。涵盖 API 设置、数据同步和工作流触发...'
    }
  },

  // -----------------------------------------------------
  // 电子书
  // -----------------------------------------------------
  {
    id: 'ebook-001',
    type: 'ebook',
    title: {
      en: 'Complete Guide to AI Voice Technology',
      zh: 'AI 语音技术完整指南'
    },
    description: {
      en: 'Comprehensive introduction to AI voice for beginners and practitioners.',
      zh: '面向初学者和实践者的 AI 语音综合入门指南。'
    },
    publishedAt: '2024-01-15',
    tags: ['guide', 'introduction', 'comprehensive'],
    category: 'technical-guides',
    thumbnail: '/images/resources/ebook-001.jpg',
    downloadUrl: '/downloads/ebook-ai-voice-guide.pdf',
    readTime: '50 pages',
    slug: 'complete-guide-ai-voice',
    featured: true,
    excerpt: {
      en: 'From fundamentals to advanced applications, this ebook covers everything you need to know about AI voice technology...',
      zh: '从基础到高级应用，这本电子书涵盖关于 AI 语音技术您需要了解的所有内容...'
    }
  },
  {
    id: 'ebook-002',
    type: 'ebook',
    title: {
      en: 'Voice UX Design Best Practices',
      zh: '语音用户体验设计最佳实践'
    },
    description: {
      en: 'Design guidelines for creating natural and effective voice interactions.',
      zh: '创建自然有效语音交互的设计指南。'
    },
    publishedAt: '2024-02-01',
    tags: ['design', 'ux', 'best-practices'],
    category: 'best-practices',
    thumbnail: '/images/resources/ebook-002.jpg',
    downloadUrl: '/downloads/ebook-voice-ux-design.pdf',
    readTime: '35 pages',
    slug: 'voice-ux-design-best-practices',
    excerpt: {
      en: 'Learn the principles of voice UX design. Covers conversation flow, persona design, and error handling...',
      zh: '学习语音用户体验设计原则。涵盖对话流程、角色设计和错误处理...'
    }
  },

  // -----------------------------------------------------
  // 信息图
  // -----------------------------------------------------
  {
    id: 'infographic-001',
    type: 'infographic',
    title: {
      en: 'AI Voice Agent ROI Statistics',
      zh: 'AI 语音智能体 ROI 统计数据'
    },
    description: {
      en: 'Visual overview of key metrics and ROI data from AI voice deployments.',
      zh: 'AI 语音部署的关键指标和 ROI 数据可视化概览。'
    },
    publishedAt: '2024-03-01',
    tags: ['stats', 'roi', 'infographic'],
    category: 'industry-insights',
    thumbnail: '/images/resources/infographic-001.jpg',
    downloadUrl: '/downloads/infographic-roi-stats.pdf',
    slug: 'ai-voice-roi-infographic',
    excerpt: {
      en: 'Key statistics: 60% cost reduction, 80% faster response time, 35% higher satisfaction...',
      zh: '关键统计数据：60% 成本降低、80% 更快响应时间、35% 更高满意度...'
    }
  }
];

// =====================================================
// 查询函数
// =====================================================

export function getResourceById(id: string): ResourceItem | undefined {
  return resources.find(r => r.id === id);
}

export function getResourceBySlug(slug: string): ResourceItem | undefined {
  return resources.find(r => r.slug === slug);
}

export function getResourcesByType(type: ResourceType): ResourceItem[] {
  return resources.filter(r => r.type === type);
}

export function getResourcesByCategory(category: ResourceCategory): ResourceItem[] {
  return resources.filter(r => r.category === category);
}

export function getFeaturedResources(): ResourceItem[] {
  return resources.filter(r => r.featured);
}

export function getRecentResources(limit: number = 10): ResourceItem[] {
  return resources
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getResourcesByTag(tag: string): ResourceItem[] {
  return resources.filter(r => r.tags.includes(tag));
}

export function searchResources(query: string): ResourceItem[] {
  const lowerQuery = query.toLowerCase();
  return resources.filter(r => 
    r.title.en.toLowerCase().includes(lowerQuery) ||
    r.title.zh.toLowerCase().includes(lowerQuery) ||
    r.description.en.toLowerCase().includes(lowerQuery) ||
    r.description.zh.toLowerCase().includes(lowerQuery) ||
    r.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

// =====================================================
// 统计信息
// =====================================================

export const resourceStats = {
  total: resources.length,
  byType: resourceTypes.map(t => ({
    type: t.id,
    count: resources.filter(r => r.type === t.id).length
  })),
  byCategory: resourceCategories.map(c => ({
    category: c.id,
    count: resources.filter(r => r.category === c.id).length
  })),
  featured: resources.filter(r => r.featured).length
};