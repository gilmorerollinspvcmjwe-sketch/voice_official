/**
 * 客户案例数据配置
 * 
 * 添加完整的客户成功案例
 * 结构: 问题 → 方案 → 结果 → 客户引用
 */

export interface CaseStudyResult {
  metric: string;
  value: string;
  description: string;
}

export interface CaseStudyQuote {
  text: string;
  author: string;
  title: string;
  avatar: string;
}

export interface CaseStudy {
  id: string;
  slug: string;        // URL 路径: /customers/case-studies/[slug]
  
  customer: {
    name: string;
    logo: string;      // Logo 路径: /images/customers/[name].svg
    industry: string;
    size: string;      // 如 "500-1000 employees"
    location: string;  // 如 "United States"
  };
  
  title: {
    en: string;
    zh: string;
  };
  summary: {
    en: string;
    zh: string;
  };
  
  // 三段式内容结构
  challenge: {
    en: string;        // 支持 Markdown 格式
    zh: string;
  };
  solution: {
    en: string;
    zh: string;
  };
  results: CaseStudyResult[];
  
  // 多媒体
  images: string[];    // 图片路径数组
  video?: string;      // 可选视频链接
  
  // 客户引用
  quote?: CaseStudyQuote;
  
  // SEO
  tags?: string[];
}

export const caseStudies: CaseStudy[] = [
  // =====================================================
  // 📋 添加真实客户案例
  // =====================================================
  
  // 示例案例 1 - 请替换为真实案例
  {
    id: 'case-001',
    slug: 'techcorp-customer-service',
    
    customer: {
      name: 'TechCorp',
      logo: '/images/customers/customer-techcorp.svg',  // ← 添加 Logo 文件
      industry: 'Technology',
      size: '500-1000 employees',
      location: 'United States'
    },
    
    title: {
      en: 'How TechCorp Reduced Support Costs by 60%',
      zh: 'TechCorp 如何降低 60% 客服成本'
    },
    summary: {
      en: 'TechCorp deployed AI voice agents to handle 80% of customer inquiries, achieving dramatic cost reduction.',
      zh: 'TechCorp 使用 AI 语音智能体处理 80% 客户咨询，实现显著的成本降低。'
    },
    
    challenge: {
      en: `TechCorp's customer service team was overwhelmed. With 500+ employees handling thousands of daily calls, they faced:

- **High Costs**: $40,000+ per agent annually
- **Long Wait Times**: Average 15-minute hold
- **Inconsistent Quality**: Service varied by agent
- **Night/Weekend Gaps**: No 24/7 coverage`,
      zh: `TechCorp 的客服团队面临巨大压力。500+ 名客服每天处理数千通话，主要挑战包括：

- **高昂成本**: 每位客服年成本超 $40,000
- **漫长等待**: 平均等待时间 15 分钟
- **质量不稳定**: 服务质量因人而异
- **夜间断档**: 无 24/7 服务覆盖`
    },
    
    solution: {
      en: `TechCorp implemented our AI Voice Agent platform:

1. **Voice Agents Deployment**: 5 AI agents handling inbound inquiries
2. **CRM Integration**: Real-time customer data access
3. **Multi-language Support**: English, Spanish, Mandarin
4. **Smart Routing**: Seamless handoff to human agents when needed`,
      zh: `TechCorp 部署了我们的 AI 语音智能体平台：

1. **智能体部署**: 5 个 AI 智能体处理来电咨询
2. **CRM 集成**: 实时访问客户数据
3. **多语言支持**: 英语、西班牙语、中文
4. **智能路由**: 需要时无缝转接人工客服`
    },
    
    results: [
      {
        metric: 'Cost Reduction',
        value: '60%',
        description: 'Annual support costs decreased'
      },
      {
        metric: 'Wait Time',
        value: '-80%',
        description: 'Average hold time reduced to 3 minutes'
      },
      {
        metric: 'Coverage',
        value: '24/7',
        description: 'Round-the-clock service availability'
      },
      {
        metric: 'Resolution Rate',
        value: '85%',
        description: 'AI-first resolution without human handoff'
      }
    ],
    
    images: [
      '/images/case-studies/techcorp-dashboard.png',  // ← 添加案例图片
      '/images/case-studies/techcorp-analytics.png'
    ],
    
    quote: {
      text: 'The ROI was immediate. Within 3 months, we saw dramatic improvements across all metrics. Our customers are happier, and our team can focus on complex issues.',
      author: 'Sarah Chen',
      title: 'VP of Customer Service, TechCorp',
      avatar: '/images/avatars/sarah-chen.jpg'
    },
    
    tags: ['customer-service', 'technology', 'cost-reduction']
  },

  // 示例案例 2 - 请替换为真实案例
  {
    id: 'case-002',
    slug: 'financehub-collections',
    
    customer: {
      name: 'FinanceHub',
      logo: '/images/customers/customer-financehub.svg',
      industry: 'Financial Services',
      size: '1000+ employees',
      location: 'United States'
    },
    
    title: {
      en: 'FinanceHub Improves Collection Recovery by 40%',
      zh: 'FinanceHub 提升催收回收率 40%'
    },
    summary: {
      en: 'FinanceHub deployed AI voice agents for collection calls, achieving 40% higher recovery rates.',
      zh: 'FinanceHub 使用 AI 语音智能体进行催收电话，回收率提升 40%。'
    },
    
    challenge: {
      en: `FinanceHub's collection team struggled with:

- **Low Contact Rates**: Only 30% of calls reached customers
- **High Agent Burnout**: Emotional stress from difficult conversations
- **Inconsistent Messaging**: Different approaches by different agents
- **Compliance Risks**: Regulatory requirements hard to track`,
      zh: `FinanceHub 的催收团队面临以下挑战：

- **低触达率**: 仅 30% 的电话能联系到客户
- **员工倦怠**: 困难对话带来的情绪压力
- **话术不一致**: 不同智能体采用不同方式
- **合规风险**: 监管要求难以追踪`
    },
    
    solution: {
      en: `FinanceHub implemented AI voice agents:

1. **Optimized Timing**: AI calls at best times for each customer
2. **Empathetic Scripts**: Consistent, compliant messaging
3. **Payment Integration**: Direct payment capture during calls
4. **Escalation Logic**: Smart handoff to specialists for complex cases`,
      zh: `FinanceHub 部署 AI 语音智能体：

1. **优化时机**: AI 在最佳时间拨打每个客户
2. **同理心话术**: 一致、合规的沟通内容
3. **支付集成**: 通话中直接收款
4. **升级逻辑**: 复杂情况智能转接专家`
    },
    
    results: [
      {
        metric: 'Recovery Rate',
        value: '+40%',
        description: 'Improved collection recovery'
      },
      {
        metric: 'Contact Rate',
        value: '65%',
        description: 'Increased customer reach'
      },
      {
        metric: 'Agent Productivity',
        value: '+200%',
        description: 'AI handles 3x more calls'
      },
      {
        metric: 'Compliance',
        value: '100%',
        description: 'All calls recorded and compliant'
      }
    ],
    
    images: [
      '/images/case-studies/financehub-metrics.png'
    ],
    
    quote: {
      text: 'The AI agents handle the routine calls perfectly, letting our team focus on complex negotiations. Recovery rates jumped immediately.',
      author: 'Michael Johnson',
      title: 'Director of Operations, FinanceHub',
      avatar: '/images/avatars/michael-johnson.jpg'
    },
    
    tags: ['collections', 'finance', 'recovery-rate']
  },

  // =====================================================
  // 添加更多案例...
  // 图片放置位置: public/images/case-studies/
  // 推荐尺寸: 800x600px 或更高
  // =====================================================
];

/**
 * 根据行业筛选案例
 */
export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
  return caseStudies.filter(c => c.customer.industry === industry);
}

/**
 * 根据标签筛选案例
 */
export function getCaseStudiesByTag(tag: string): CaseStudy[] {
  return caseStudies.filter(c => c.tags && c.tags.includes(tag));
}

/**
 * 根据 slug 获取单个案例
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(c => c.slug === slug);
}