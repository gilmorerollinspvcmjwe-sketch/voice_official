/**
 * 定价方案配置
 * 
 * 用于 /pricing 页面
 * 包含方案对比表、价格计算器、功能详情
 */

// =====================================================
// 类型定义
// =====================================================

export interface PricingPlan {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  
  // 价格信息
  price: {
    amount: number | null;    // null 表示 "联系销售"
    currency: string;
    period: string | null;    // 'month', 'year', null
    displayPrice: {
      en: string;
      zh: string;
    };
  };
  
  // 方案标签
  badge?: {
    en: string;
    zh: string;
  };
  
  // 方案特点
  highlights: string[];
  
  // 功能列表
  features: PricingFeature[];
  
  // 推荐指数
  recommended?: boolean;
  
  // CTA 按钮
  cta: {
    en: string;
    zh: string;
  };
  ctaAction: 'signup' | 'contact' | 'demo';
}

export interface PricingFeature {
  key: string;
  label: {
    en: string;
    zh: string;
  };
  value: string | number | boolean | null;
  valueType: 'boolean' | 'number' | 'text' | 'unlimited' | 'custom';
  highlight?: boolean;
  tooltip?: {
    en: string;
    zh: string;
  };
}

export interface PricingCalculatorInput {
  monthlyCallVolume: number;
  concurrentCalls: number;
  customVoice: boolean;
  knowledgeBase: boolean;
  analytics: 'basic' | 'advanced' | 'enterprise';
  supportLevel: 'community' | 'email' | 'phone' | 'dedicated';
}

export interface PricingCalculatorResult {
  recommendedPlan: string;
  basePrice: number;
  addOnsPrice: number;
  totalPrice: number;
  savingsVsHuman?: number;
  breakdown: PriceBreakdownItem[];
}

export interface PriceBreakdownItem {
  item: {
    en: string;
    zh: string;
  };
  quantity?: number;
  unitPrice: number;
  total: number;
}

// =====================================================
// 定价方案配置
// =====================================================

export const pricingPlans: PricingPlan[] = [
  // -----------------------------------------------------
  // Free Plan
  // -----------------------------------------------------
  {
    id: 'free',
    name: {
      en: 'Free',
      zh: '免费版'
    },
    description: {
      en: 'Perfect for testing and small projects',
      zh: '适合测试和小型项目'
    },
    price: {
      amount: 0,
      currency: 'USD',
      period: null,
      displayPrice: {
        en: '$0',
        zh: '$0'
      }
    },
    badge: {
      en: 'Try it free',
      zh: '免费试用'
    },
    highlights: [
      'No credit card required',
      'Full feature access',
      'Perfect for testing'
    ],
    features: [
      {
        key: 'monthly_minutes',
        label: { en: 'Monthly Call Minutes', zh: '月通话分钟' },
        value: 100,
        valueType: 'number',
        tooltip: {
          en: 'Approximately 100 calls of 1-minute duration',
          zh: '约 100 次 1 分钟通话'
        }
      },
      {
        key: 'concurrent_calls',
        label: { en: 'Concurrent Calls', zh: '并发通话数' },
        value: 1,
        valueType: 'number'
      },
      {
        key: 'voice_options',
        label: { en: 'Voice Options', zh: '语音选择' },
        value: '5 preset voices',
        valueType: 'text'
      },
      {
        key: 'custom_voice',
        label: { en: 'Custom Voice', zh: '自定义音色' },
        value: false,
        valueType: 'boolean'
      },
      {
        key: 'knowledge_base',
        label: { en: 'Knowledge Base', zh: '知识库集成' },
        value: false,
        valueType: 'boolean'
      },
      {
        key: 'api_access',
        label: { en: 'API Access', zh: 'API 访问' },
        value: false,
        valueType: 'boolean'
      },
      {
        key: 'analytics',
        label: { en: 'Analytics Dashboard', zh: '分析仪表盘' },
        value: 'Basic',
        valueType: 'text'
      },
      {
        key: 'integrations',
        label: { en: 'Integrations', zh: '系统集成' },
        value: 'Limited',
        valueType: 'text'
      },
      {
        key: 'support',
        label: { en: 'Support', zh: '技术支持' },
        value: 'Community',
        valueType: 'text'
      },
      {
        key: 'sla',
        label: { en: 'SLA Guarantee', zh: 'SLA 保障' },
        value: false,
        valueType: 'boolean'
      },
      {
        key: 'call_recording',
        label: { en: 'Call Recording', zh: '通话录音' },
        value: false,
        valueType: 'boolean'
      },
      {
        key: 'transcripts',
        label: { en: 'Transcripts', zh: '对话转录' },
        value: false,
        valueType: 'boolean'
      }
    ],
    cta: {
      en: 'Start Free Trial',
      zh: '免费试用'
    },
    ctaAction: 'signup'
  },

  // -----------------------------------------------------
  // Starter Plan
  // -----------------------------------------------------
  {
    id: 'starter',
    name: {
      en: 'Starter',
      zh: '入门版'
    },
    description: {
      en: 'For growing teams with regular call volume',
      zh: '适合有稳定通话量的成长团队'
    },
    price: {
      amount: 99,
      currency: 'USD',
      period: 'month',
      displayPrice: {
        en: '$99/month',
        zh: '$99/月'
      }
    },
    highlights: [
      'API access included',
      'CRM integration ready',
      'Call analytics dashboard'
    ],
    features: [
      {
        key: 'monthly_minutes',
        label: { en: 'Monthly Call Minutes', zh: '月通话分钟' },
        value: 1000,
        valueType: 'number',
        tooltip: {
          en: 'Approximately 1,000 calls of 1-minute duration',
          zh: '约 1,000 次 1 分钟通话'
        }
      },
      {
        key: 'concurrent_calls',
        label: { en: 'Concurrent Calls', zh: '并发通话数' },
        value: 5,
        valueType: 'number'
      },
      {
        key: 'voice_options',
        label: { en: 'Voice Options', zh: '语音选择' },
        value: '20 preset voices',
        valueType: 'text'
      },
      {
        key: 'custom_voice',
        label: { en: 'Custom Voice', zh: '自定义音色' },
        value: false,
        valueType: 'boolean'
      },
      {
        key: 'knowledge_base',
        label: { en: 'Knowledge Base', zh: '知识库集成' },
        value: 'Basic',
        valueType: 'text',
        tooltip: {
          en: 'Connect up to 1 knowledge base source',
          zh: '连接最多 1 个知识库来源'
        }
      },
      {
        key: 'api_access',
        label: { en: 'API Access', zh: 'API 访问' },
        value: true,
        valueType: 'boolean',
        highlight: true
      },
      {
        key: 'analytics',
        label: { en: 'Analytics Dashboard', zh: '分析仪表盘' },
        value: 'Standard',
        valueType: 'text'
      },
      {
        key: 'integrations',
        label: { en: 'Integrations', zh: '系统集成' },
        value: '10+ integrations',
        valueType: 'text'
      },
      {
        key: 'support',
        label: { en: 'Support', zh: '技术支持' },
        value: 'Email',
        valueType: 'text'
      },
      {
        key: 'sla',
        label: { en: 'SLA Guarantee', zh: 'SLA 保障' },
        value: false,
        valueType: 'boolean'
      },
      {
        key: 'call_recording',
        label: { en: 'Call Recording', zh: '通话录音' },
        value: true,
        valueType: 'boolean'
      },
      {
        key: 'transcripts',
        label: { en: 'Transcripts', zh: '对话转录' },
        value: true,
        valueType: 'boolean'
      }
    ],
    cta: {
      en: 'Get Started',
      zh: '立即开始'
    },
    ctaAction: 'signup'
  },

  // -----------------------------------------------------
  // Pro Plan
  // -----------------------------------------------------
  {
    id: 'pro',
    name: {
      en: 'Pro',
      zh: '专业版'
    },
    description: {
      en: 'For teams with high call volume and advanced needs',
      zh: '适合高通话量和高级需求的专业团队'
    },
    price: {
      amount: 499,
      currency: 'USD',
      period: 'month',
      displayPrice: {
        en: '$499/month',
        zh: '$499/月'
      }
    },
    badge: {
      en: 'Most Popular',
      zh: '最受欢迎'
    },
    highlights: [
      'Custom voice cloning',
      'Full knowledge base support',
      'Advanced analytics & reports'
    ],
    features: [
      {
        key: 'monthly_minutes',
        label: { en: 'Monthly Call Minutes', zh: '月通话分钟' },
        value: 5000,
        valueType: 'number',
        tooltip: {
          en: 'Approximately 5,000 calls of 1-minute duration',
          zh: '约 5,000 次 1 分钟通话'
        }
      },
      {
        key: 'concurrent_calls',
        label: { en: 'Concurrent Calls', zh: '并发通话数' },
        value: 20,
        valueType: 'number'
      },
      {
        key: 'voice_options',
        label: { en: 'Voice Options', zh: '语音选择' },
        value: '50+ preset voices',
        valueType: 'text'
      },
      {
        key: 'custom_voice',
        label: { en: 'Custom Voice', zh: '自定义音色' },
        value: true,
        valueType: 'boolean',
        highlight: true,
        tooltip: {
          en: 'Clone your brand voice with custom training',
          zh: '通过自定义训练克隆您的品牌语音'
        }
      },
      {
        key: 'knowledge_base',
        label: { en: 'Knowledge Base', zh: '知识库集成' },
        value: true,
        valueType: 'boolean',
        highlight: true,
        tooltip: {
          en: 'Unlimited knowledge base sources with RAG',
          zh: '无限知识库来源，支持 RAG 检索'
        }
      },
      {
        key: 'api_access',
        label: { en: 'API Access', zh: 'API 访问' },
        value: true,
        valueType: 'boolean'
      },
      {
        key: 'analytics',
        label: { en: 'Analytics Dashboard', zh: '分析仪表盘' },
        value: 'Advanced',
        valueType: 'text',
        tooltip: {
          en: 'Sentiment analysis, custom reports, export',
          zh: '情绪分析、自定义报告、数据导出'
        }
      },
      {
        key: 'integrations',
        label: { en: 'Integrations', zh: '系统集成' },
        value: '30+ integrations',
        valueType: 'text'
      },
      {
        key: 'support',
        label: { en: 'Support', zh: '技术支持' },
        value: 'Phone + Email',
        valueType: 'text'
      },
      {
        key: 'sla',
        label: { en: 'SLA Guarantee', zh: 'SLA 保障' },
        value: '99%',
        valueType: 'text',
        highlight: true
      },
      {
        key: 'call_recording',
        label: { en: 'Call Recording', zh: '通话录音' },
        value: true,
        valueType: 'boolean'
      },
      {
        key: 'transcripts',
        label: { en: 'Transcripts', zh: '对话转录' },
        value: true,
        valueType: 'boolean'
      },
      {
        key: 'sentiment_analysis',
        label: { en: 'Sentiment Analysis', zh: '情绪分析' },
        value: true,
        valueType: 'boolean'
      },
      {
        key: 'custom_workflows',
        label: { en: 'Custom Workflows', zh: '自定义工作流' },
        value: true,
        valueType: 'boolean'
      }
    ],
    recommended: true,
    cta: {
      en: 'Start Pro Trial',
      zh: '试用专业版'
    },
    ctaAction: 'signup'
  },

  // -----------------------------------------------------
  // Enterprise Plan
  // -----------------------------------------------------
  {
    id: 'enterprise',
    name: {
      en: 'Enterprise',
      zh: '企业版'
    },
    description: {
      en: 'Custom solutions for large organizations',
      zh: '为大型组织定制的解决方案'
    },
    price: {
      amount: null,
      currency: 'USD',
      period: null,
      displayPrice: {
        en: 'Contact Sales',
        zh: '联系销售'
      }
    },
    badge: {
      en: 'Custom Pricing',
      zh: '定制报价'
    },
    highlights: [
      'Unlimited call volume',
      'Dedicated support team',
      'On-premise deployment option'
    ],
    features: [
      {
        key: 'monthly_minutes',
        label: { en: 'Monthly Call Minutes', zh: '月通话分钟' },
        value: null,
        valueType: 'unlimited',
        tooltip: {
          en: 'Custom pricing based on your volume',
          zh: '根据您的通话量定制报价'
        }
      },
      {
        key: 'concurrent_calls',
        label: { en: 'Concurrent Calls', zh: '并发通话数' },
        value: null,
        valueType: 'unlimited'
      },
      {
        key: 'voice_options',
        label: { en: 'Voice Options', zh: '语音选择' },
        value: 'All voices + custom',
        valueType: 'text'
      },
      {
        key: 'custom_voice',
        label: { en: 'Custom Voice', zh: '自定义音色' },
        value: true,
        valueType: 'boolean',
        highlight: true
      },
      {
        key: 'knowledge_base',
        label: { en: 'Knowledge Base', zh: '知识库集成' },
        value: true,
        valueType: 'boolean'
      },
      {
        key: 'api_access',
        label: { en: 'API Access', zh: 'API 访问' },
        value: true,
        valueType: 'boolean'
      },
      {
        key: 'analytics',
        label: { en: 'Analytics Dashboard', zh: '分析仪表盘' },
        value: 'Enterprise',
        valueType: 'text',
        tooltip: {
          en: 'Custom dashboards, data warehouse export, BI tools',
          zh: '自定义仪表盘、数据仓库导出、BI 工具'
        }
      },
      {
        key: 'integrations',
        label: { en: 'Integrations', zh: '系统集成' },
        value: 'All integrations + custom',
        valueType: 'text'
      },
      {
        key: 'support',
        label: { en: 'Support', zh: '技术支持' },
        value: 'Dedicated Team',
        valueType: 'text',
        highlight: true,
        tooltip: {
          en: '24/7 dedicated support team',
          zh: '24/7 专属支持团队'
        }
      },
      {
        key: 'sla',
        label: { en: 'SLA Guarantee', zh: 'SLA 保障' },
        value: '99.9%',
        valueType: 'text',
        highlight: true
      },
      {
        key: 'call_recording',
        label: { en: 'Call Recording', zh: '通话录音' },
        value: true,
        valueType: 'boolean'
      },
      {
        key: 'transcripts',
        label: { en: 'Transcripts', zh: '对话转录' },
        value: true,
        valueType: 'boolean'
      },
      {
        key: 'sentiment_analysis',
        label: { en: 'Sentiment Analysis', zh: '情绪分析' },
        value: true,
        valueType: 'boolean'
      },
      {
        key: 'custom_workflows',
        label: { en: 'Custom Workflows', zh: '自定义工作流' },
        value: true,
        valueType: 'boolean'
      },
      {
        key: 'on_premise',
        label: { en: 'On-Premise Deployment', zh: '本地部署' },
        value: true,
        valueType: 'boolean',
        highlight: true,
        tooltip: {
          en: 'Deploy on your own infrastructure',
          zh: '在您自己的基础设施上部署'
        }
      },
      {
        key: 'data_residency',
        label: { en: 'Data Residency', zh: '数据驻留' },
        value: true,
        valueType: 'boolean',
        tooltip: {
          en: 'Choose your data storage location',
          zh: '选择您的数据存储位置'
        }
      },
      {
        key: 'compliance',
        label: { en: 'Compliance Support', zh: '合规支持' },
        value: 'SOC2, GDPR, HIPAA',
        valueType: 'text'
      },
      {
        key: 'audit_logs',
        label: { en: 'Audit Logs', zh: '审计日志' },
        value: true,
        valueType: 'boolean'
      },
      {
        key: 'sso',
        label: { en: 'SSO Integration', zh: 'SSO 集成' },
        value: true,
        valueType: 'boolean'
      }
    ],
    cta: {
      en: 'Contact Sales',
      zh: '联系销售'
    },
    ctaAction: 'contact'
  }
];

// =====================================================
// 功能对比表（用于横向展示）
// =====================================================

export const featureComparisonTable = [
  // 通话能力
  { category: { en: 'Call Capacity', zh: '通话能力' }, features: [
    { key: 'monthly_minutes', label: { en: 'Monthly Call Minutes', zh: '月通话分钟' } },
    { key: 'concurrent_calls', label: { en: 'Concurrent Calls', zh: '并发通话数' } }
  ]},
  // 语音功能
  { category: { en: 'Voice Features', zh: '语音功能' }, features: [
    { key: 'voice_options', label: { en: 'Voice Options', zh: '语音选择' } },
    { key: 'custom_voice', label: { en: 'Custom Voice', zh: '自定义音色' } }
  ]},
  // 智能功能
  { category: { en: 'AI Features', zh: '智能功能' }, features: [
    { key: 'knowledge_base', label: { en: 'Knowledge Base', zh: '知识库集成' } },
    { key: 'api_access', label: { en: 'API Access', zh: 'API 访问' } },
    { key: 'sentiment_analysis', label: { en: 'Sentiment Analysis', zh: '情绪分析' } },
    { key: 'custom_workflows', label: { en: 'Custom Workflows', zh: '自定义工作流' } }
  ]},
  // 分析与报告
  { category: { en: 'Analytics', zh: '分析与报告' }, features: [
    { key: 'analytics', label: { en: 'Analytics Dashboard', zh: '分析仪表盘' } },
    { key: 'call_recording', label: { en: 'Call Recording', zh: '通话录音' } },
    { key: 'transcripts', label: { en: 'Transcripts', zh: '对话转录' } }
  ]},
  // 集成
  { category: { en: 'Integrations', zh: '系统集成' }, features: [
    { key: 'integrations', label: { en: 'Integrations', zh: '系统集成' } }
  ]},
  // 支持
  { category: { en: 'Support & SLA', zh: '支持与保障' }, features: [
    { key: 'support', label: { en: 'Support', zh: '技术支持' } },
    { key: 'sla', label: { en: 'SLA Guarantee', zh: 'SLA 保障' } }
  ]},
  // 企业功能
  { category: { en: 'Enterprise', zh: '企业功能' }, features: [
    { key: 'on_premise', label: { en: 'On-Premise', zh: '本地部署' } },
    { key: 'data_residency', label: { en: 'Data Residency', zh: '数据驻留' } },
    { key: 'sso', label: { en: 'SSO', zh: 'SSO 集成' } }
  ]}
];

// =====================================================
// 价格计算器配置
// =====================================================

export const calculatorConfig = {
  // 通话量档位价格
  callVolumeRates: [
    { min: 0, max: 1000, ratePerMinute: 0.15 },
    { min: 1000, max: 5000, ratePerMinute: 0.12 },
    { min: 5000, max: 20000, ratePerMinute: 0.10 },
    { min: 20000, max: 50000, ratePerMinute: 0.08 },
    { min: 50000, max: Infinity, ratePerMinute: 0.06 }
  ],
  
  // 并发通话加价
  concurrentRates: [
    { min: 1, max: 5, addOn: 0 },
    { min: 6, max: 20, addOnPerLine: 10 },
    { min: 21, max: 50, addOnPerLine: 8 },
    { min: 51, max: Infinity, addOnPerLine: 6 }
  ],
  
  // 功能加价
  featureAddOns: {
    customVoice: { price: 50, label: { en: 'Custom Voice', zh: '自定义音色' } },
    knowledgeBase: { price: 30, label: { en: 'Knowledge Base', zh: '知识库集成' } },
    advancedAnalytics: { price: 25, label: { en: 'Advanced Analytics', zh: '高级分析' } },
    enterpriseAnalytics: { price: 100, label: { en: 'Enterprise Analytics', zh: '企业分析' } },
    dedicatedSupport: { price: 200, label: { en: 'Dedicated Support', zh: '专属支持' } }
  },
  
  // 人工客服成本对比
  humanAgentCost: {
    annualPerAgent: 40000,
    callsPerDayPerAgent: 50,
    workingDaysPerYear: 250
  }
};

// =====================================================
// 价格计算函数
// =====================================================

export function calculatePricing(input: PricingCalculatorInput): PricingCalculatorResult {
  const breakdown: PriceBreakdownItem[] = [];
  let basePrice = 0;
  let addOnsPrice = 0;
  
  // 1. 计算通话分钟费用
  const volumeRate = calculatorConfig.callVolumeRates.find(
    r => input.monthlyCallVolume >= r.min && input.monthlyCallVolume < r.max
  ) || calculatorConfig.callVolumeRates[calculatorConfig.callVolumeRates.length - 1];
  
  const volumeCost = input.monthlyCallVolume * volumeRate.ratePerMinute;
  breakdown.push({
    item: { en: 'Call Minutes', zh: '通话分钟' },
    quantity: input.monthlyCallVolume,
    unitPrice: volumeRate.ratePerMinute,
    total: volumeCost
  });
  basePrice += volumeCost;
  
  // 2. 计算并发通话费用
  const concurrentRate = calculatorConfig.concurrentRates.find(
    r => input.concurrentCalls >= r.min && input.concurrentCalls <= r.max
  ) || calculatorConfig.concurrentRates[calculatorConfig.concurrentRates.length - 1];
  
  const addOnPerLineValue = concurrentRate.addOnPerLine ?? 0;
  if (addOnPerLineValue > 0) {
    const extraLines = input.concurrentCalls - 5;
    const concurrentCost = extraLines * addOnPerLineValue;
    breakdown.push({
      item: { en: 'Additional Concurrent Lines', zh: '额外并发线路' },
      quantity: extraLines,
      unitPrice: addOnPerLineValue,
      total: concurrentCost
    });
    addOnsPrice += concurrentCost;
  }
  
  // 3. 计算功能加价
  if (input.customVoice) {
    addOnsPrice += calculatorConfig.featureAddOns.customVoice.price;
    breakdown.push({
      item: calculatorConfig.featureAddOns.customVoice.label,
      unitPrice: calculatorConfig.featureAddOns.customVoice.price,
      total: calculatorConfig.featureAddOns.customVoice.price
    });
  }
  
  if (input.knowledgeBase) {
    addOnsPrice += calculatorConfig.featureAddOns.knowledgeBase.price;
    breakdown.push({
      item: calculatorConfig.featureAddOns.knowledgeBase.label,
      unitPrice: calculatorConfig.featureAddOns.knowledgeBase.price,
      total: calculatorConfig.featureAddOns.knowledgeBase.price
    });
  }
  
  // 分析功能定价
  if (input.analytics === 'advanced') {
    addOnsPrice += calculatorConfig.featureAddOns.advancedAnalytics.price;
    breakdown.push({
      item: calculatorConfig.featureAddOns.advancedAnalytics.label,
      unitPrice: calculatorConfig.featureAddOns.advancedAnalytics.price,
      total: calculatorConfig.featureAddOns.advancedAnalytics.price
    });
  } else if (input.analytics === 'enterprise') {
    addOnsPrice += calculatorConfig.featureAddOns.enterpriseAnalytics.price;
    breakdown.push({
      item: calculatorConfig.featureAddOns.enterpriseAnalytics.label,
      unitPrice: calculatorConfig.featureAddOns.enterpriseAnalytics.price,
      total: calculatorConfig.featureAddOns.enterpriseAnalytics.price
    });
  }
  
  // 支持级别定价
  if (input.supportLevel === 'dedicated') {
    addOnsPrice += calculatorConfig.featureAddOns.dedicatedSupport.price;
    breakdown.push({
      item: calculatorConfig.featureAddOns.dedicatedSupport.label,
      unitPrice: calculatorConfig.featureAddOns.dedicatedSupport.price,
      total: calculatorConfig.featureAddOns.dedicatedSupport.price
    });
  }
  
  const totalPrice = basePrice + addOnsPrice;
  
  // 4. 计算与人工客服的成本对比
  const humanAgentCost = calculatorConfig.humanAgentCost;
  const callsPerMonth = input.monthlyCallVolume;
  const callsPerYear = callsPerMonth * 12;
  const agentsNeeded = Math.ceil(callsPerYear / (humanAgentCost.callsPerDayPerAgent * humanAgentCost.workingDaysPerYear));
  const humanCostPerMonth = (agentsNeeded * humanAgentCost.annualPerAgent) / 12;
  const savingsVsHuman = humanCostPerMonth - totalPrice;
  
  // 5. 推荐方案
  let recommendedPlan = 'starter';
  if (input.monthlyCallVolume > 5000 || input.concurrentCalls > 20 || input.analytics === 'enterprise') {
    recommendedPlan = 'enterprise';
  } else if (input.monthlyCallVolume > 1000 || input.customVoice || input.knowledgeBase) {
    recommendedPlan = 'pro';
  }
  
  return {
    recommendedPlan,
    basePrice,
    addOnsPrice,
    totalPrice,
    savingsVsHuman: savingsVsHuman > 0 ? savingsVsHuman : undefined,
    breakdown
  };
}

// =====================================================
// 方案查询函数
// =====================================================

export function getPlanById(id: string): PricingPlan | undefined {
  return pricingPlans.find(p => p.id === id);
}

export function getRecommendedPlan(): PricingPlan {
  return pricingPlans.find(p => p.recommended) || pricingPlans[2];
}

export function getFeatureValue(plan: PricingPlan, featureKey: string): string {
  const feature = plan.features.find(f => f.key === featureKey);
  if (!feature) return '-';
  
  if (feature.valueType === 'boolean') {
    return feature.value ? '✓' : '✗';
  }
  if (feature.valueType === 'unlimited') {
    return '∞';
  }
  if (feature.value === null) {
    return 'Custom';
  }
  return String(feature.value);
}