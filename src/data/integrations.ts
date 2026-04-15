/**
 * 集成合作伙伴配置
 * 
 * 用于 /integrations 页面
 * 展示支持的 CRM、客服系统、通信平台等集成
 */

// =====================================================
// 集成类型定义
// =====================================================

export interface Integration {
  id: string;
  name: string;
  logo: string;          // Logo 路径: /images/integrations/[name].svg
  category: IntegrationCategory;
  
  description: {
    en: string;
    zh: string;
  };
  
  // 集成方式
  integrationType: 'native' | 'api' | 'webhook' | 'sdk';
  
  // 支持的功能
  features: IntegrationFeature[];
  
  // 文档链接
  docsUrl?: string;
  
  // 官网链接
  websiteUrl?: string;
  
  // 是否为热门集成
  featured?: boolean;
  
  // 认证状态
  certified?: boolean;
}

export type IntegrationCategory = 
  | 'crm' 
  | 'customer-service' 
  | 'ticketing' 
  | 'communication' 
  | 'data-analytics' 
  | 'ai-platform'
  | 'automation';

export interface IntegrationFeature {
  key: string;
  label: {
    en: string;
    zh: string;
  };
  description?: {
    en: string;
    zh: string;
  };
}

// =====================================================
// 集成分类配置
// =====================================================

export const integrationCategories = [
  {
    id: 'crm',
    label: { en: 'CRM Systems', zh: 'CRM 系统' },
    description: {
      en: 'Sync customer data and call records with your CRM',
      zh: '同步客户数据和通话记录到您的 CRM'
    },
    icon: 'Users'
  },
  {
    id: 'customer-service',
    label: { en: 'Customer Service Platforms', zh: '客服系统' },
    description: {
      en: 'Integrate with help desks and support tools',
      zh: '与帮助台和支持工具集成'
    },
    icon: 'Headphones'
  },
  {
    id: 'ticketing',
    label: { en: 'Ticketing Systems', zh: '工单系统' },
    description: {
      en: 'Create and update tickets automatically',
      zh: '自动创建和更新工单'
    },
    icon: 'Ticket'
  },
  {
    id: 'communication',
    label: { en: 'Communication Platforms', zh: '通信平台' },
    description: {
      en: 'Connect through leading voice and messaging providers',
      zh: '通过领先的语音和消息平台连接'
    },
    icon: 'Phone'
  },
  {
    id: 'data-analytics',
    label: { en: 'Data & Analytics', zh: '数据分析' },
    description: {
      en: 'Export call data to your analytics platforms',
      zh: '导出通话数据到您的分析平台'
    },
    icon: 'BarChart'
  },
  {
    id: 'ai-platform',
    label: { en: 'AI Platforms', zh: 'AI 平台' },
    description: {
      en: 'Leverage advanced AI models for better conversations',
      zh: '利用先进的 AI 模型改善对话体验'
    },
    icon: 'Brain'
  },
  {
    id: 'automation',
    label: { en: 'Automation Tools', zh: '自动化工具' },
    description: {
      en: 'Connect workflows and automate actions',
      zh: '连接工作流并自动化操作'
    },
    icon: 'Zap'
  }
];

// =====================================================
// 集成配置数据
// =====================================================

export const integrations: Integration[] = [
  // -----------------------------------------------------
  // CRM 系统
  // -----------------------------------------------------
  {
    id: 'salesforce',
    name: 'Salesforce',
    logo: '/images/integrations/salesforce.svg',
    category: 'crm',
    description: {
      en: 'Seamlessly sync call logs, transcripts, and customer interactions to Salesforce. Create leads, update contacts, and trigger workflows automatically.',
      zh: '无缝同步通话日志、转录文本和客户交互到 Salesforce。自动创建线索、更新联系人并触发工作流。'
    },
    integrationType: 'native',
    features: [
      {
        key: 'call-logging',
        label: { en: 'Automatic Call Logging', zh: '自动通话记录' },
        description: { en: 'Every call logged as Salesforce activity', zh: '每次通话记录为 Salesforce 活动' }
      },
      {
        key: 'contact-sync',
        label: { en: 'Contact Sync', zh: '联系人同步' },
        description: { en: 'Two-way contact synchronization', zh: '双向联系人同步' }
      },
      {
        key: 'lead-creation',
        label: { en: 'Lead Creation', zh: '线索创建' },
        description: { en: 'Create leads from new caller info', zh: '从新来电信息创建线索' }
      },
      {
        key: 'case-management',
        label: { en: 'Case Management', zh: '案例管理' },
        description: { en: 'Create and update support cases', zh: '创建和更新支持案例' }
      },
      {
        key: 'workflow-trigger',
        label: { en: 'Workflow Triggers', zh: '工作流触发' },
        description: { en: 'Trigger Salesforce workflows on events', zh: '在事件上触发 Salesforce 工作流' }
      }
    ],
    docsUrl: '/docs/integrations/salesforce',
    websiteUrl: 'https://salesforce.com',
    featured: true,
    certified: true
  },
  
  {
    id: 'hubspot',
    name: 'HubSpot',
    logo: '/images/integrations/hubspot.svg',
    category: 'crm',
    description: {
      en: 'Connect voice calls to HubSpot CRM. Track conversations, associate calls with deals, and enrich contact records automatically.',
      zh: '将语音通话连接到 HubSpot CRM。跟踪对话、关联通话与交易，自动丰富联系人记录。'
    },
    integrationType: 'native',
    features: [
      {
        key: 'call-tracking',
        label: { en: 'Call Tracking', zh: '通话追踪' },
        description: { en: 'Track calls in HubSpot timeline', zh: '在 HubSpot 时间线追踪通话' }
      },
      {
        key: 'deal-association',
        label: { en: 'Deal Association', zh: '交易关联' },
        description: { en: 'Associate calls with deals', zh: '将通话与交易关联' }
      },
      {
        key: 'contact-enrichment',
        label: { en: 'Contact Enrichment', zh: '联系人丰富' },
        description: { en: 'Auto-update contact details', zh: '自动更新联系人详情' }
      },
      {
        key: 'task-creation',
        label: { en: 'Task Creation', zh: '任务创建' },
        description: { en: 'Create follow-up tasks automatically', zh: '自动创建跟进任务' }
      }
    ],
    docsUrl: '/docs/integrations/hubspot',
    websiteUrl: 'https://hubspot.com',
    featured: true,
    certified: true
  },
  
  {
    id: 'zoho',
    name: 'Zoho CRM',
    logo: '/images/integrations/zoho.svg',
    category: 'crm',
    description: {
      en: 'Integrate with Zoho CRM to log calls, create records, and sync customer data in real-time.',
      zh: '与 Zoho CRM 集成，记录通话、创建记录并实时同步客户数据。'
    },
    integrationType: 'api',
    features: [
      {
        key: 'call-logging',
        label: { en: 'Call Logging', zh: '通话记录' }
      },
      {
        key: 'contact-sync',
        label: { en: 'Contact Sync', zh: '联系人同步' }
      },
      {
        key: 'lead-management',
        label: { en: 'Lead Management', zh: '线索管理' }
      }
    ],
    docsUrl: '/docs/integrations/zoho',
    websiteUrl: 'https://zoho.com',
    featured: false,
    certified: true
  },
  
  {
    id: 'fxiaoke',
    name: '纷享销客',
    logo: '/images/integrations/fxiaoke.svg',
    category: 'crm',
    description: {
      en: 'Connect with China\'s leading CRM for sales teams. Sync calls and customer data seamlessly.',
      zh: '与中国领先的销客 CRM 连接。无缝同步通话和客户数据。'
    },
    integrationType: 'api',
    features: [
      {
        key: 'call-sync',
        label: { en: 'Call Sync', zh: '通话同步' }
      },
      {
        key: 'customer-data',
        label: { en: 'Customer Data Sync', zh: '客户数据同步' }
      }
    ],
    docsUrl: '/docs/integrations/fxiaoke',
    websiteUrl: 'https://fxiaoke.com',
    featured: false
  },

  // -----------------------------------------------------
  // 客服系统
  // -----------------------------------------------------
  {
    id: 'zendesk',
    name: 'Zendesk',
    logo: '/images/integrations/zendesk.svg',
    category: 'customer-service',
    description: {
      en: 'Create Zendesk tickets from voice calls, link transcripts to tickets, and sync customer information.',
      zh: '从语音通话创建 Zendesk 工单，将转录文本链接到工单，同步客户信息。'
    },
    integrationType: 'native',
    features: [
      {
        key: 'ticket-creation',
        label: { en: 'Ticket Creation', zh: '工单创建' },
        description: { en: 'Create tickets from call summaries', zh: '从通话摘要创建工单' }
      },
      {
        key: 'transcript-attachment',
        label: { en: 'Transcript Attachment', zh: '转录附件' },
        description: { en: 'Attach call transcripts to tickets', zh: '将通话转录作为工单附件' }
      },
      {
        key: 'customer-lookup',
        label: { en: 'Customer Lookup', zh: '客户查询' },
        description: { en: 'Look up customer by phone number', zh: '通过电话号码查询客户' }
      },
      {
        key: 'agent-handoff',
        label: { en: 'Agent Handoff', zh: '客服转接' },
        description: { en: 'Transfer to Zendesk agent', zh: '转接 Zendesk 客服' }
      }
    ],
    docsUrl: '/docs/integrations/zendesk',
    websiteUrl: 'https://zendesk.com',
    featured: true,
    certified: true
  },
  
  {
    id: 'intercom',
    name: 'Intercom',
    logo: '/images/integrations/intercom.svg',
    category: 'customer-service',
    description: {
      en: 'Sync voice conversations with Intercom. Create conversations, update user profiles, and trigger follow-ups.',
      zh: '与 Intercom 同步语音对话。创建对话、更新用户档案并触发跟进。'
    },
    integrationType: 'native',
    features: [
      {
        key: 'conversation-sync',
        label: { en: 'Conversation Sync', zh: '对话同步' }
      },
      {
        key: 'user-profile',
        label: { en: 'User Profile Update', zh: '用户档案更新' }
      },
      {
        key: 'message-trigger',
        label: { en: 'Message Trigger', zh: '消息触发' }
      }
    ],
    docsUrl: '/docs/integrations/intercom',
    websiteUrl: 'https://intercom.com',
    featured: true,
    certified: true
  },
  
  {
    id: 'qiyu',
    name: '网易七鱼',
    logo: '/images/integrations/qiyu.svg',
    category: 'customer-service',
    description: {
      en: 'Integrate with NetEase QiYu, China\'s popular customer service platform.',
      zh: '与网易七鱼集成，中国流行的客服平台。'
    },
    integrationType: 'api',
    features: [
      {
        key: 'ticket-sync',
        label: { en: 'Ticket Sync', zh: '工单同步' }
      },
      {
        key: 'chat-transfer',
        label: { en: 'Chat Transfer', zh: '聊天转接' }
      }
    ],
    docsUrl: '/docs/integrations/qiyu',
    websiteUrl: 'https://qiyu.netease.com',
    featured: false
  },

  // -----------------------------------------------------
  // 工单系统
  // -----------------------------------------------------
  {
    id: 'jira',
    name: 'Jira',
    logo: '/images/integrations/jira.svg',
    category: 'ticketing',
    description: {
      en: 'Create Jira issues from voice calls. Link support issues to development tasks for better tracking.',
      zh: '从语音通话创建 Jira 问题。将支持问题关联到开发任务以更好地追踪。'
    },
    integrationType: 'api',
    features: [
      {
        key: 'issue-creation',
        label: { en: 'Issue Creation', zh: '问题创建' },
        description: { en: 'Create Jira issues from call data', zh: '从通话数据创建 Jira 问题' }
      },
      {
        key: 'comment-sync',
        label: { en: 'Comment Sync', zh: '评论同步' },
        description: { en: 'Add call notes as comments', zh: '将通话备注添加为评论' }
      },
      {
        key: 'status-update',
        label: { en: 'Status Update', zh: '状态更新' },
        description: { en: 'Update issue status on call events', zh: '在通话事件时更新问题状态' }
      }
    ],
    docsUrl: '/docs/integrations/jira',
    websiteUrl: 'https://atlassian.com/jira',
    featured: false,
    certified: true
  },
  
  {
    id: 'servicenow',
    name: 'ServiceNow',
    logo: '/images/integrations/servicenow.svg',
    category: 'ticketing',
    description: {
      en: 'Enterprise integration with ServiceNow for IT service management and incident tracking.',
      zh: '与 ServiceNow 的企业级集成，用于 IT 服务管理和事件追踪。'
    },
    integrationType: 'api',
    features: [
      {
        key: 'incident-creation',
        label: { en: 'Incident Creation', zh: '事件创建' }
      },
      {
        key: 'knowledge-sync',
        label: { en: 'Knowledge Sync', zh: '知识库同步' }
      }
    ],
    docsUrl: '/docs/integrations/servicenow',
    websiteUrl: 'https://servicenow.com',
    featured: false,
    certified: true
  },

  // -----------------------------------------------------
  // 通信平台
  // -----------------------------------------------------
  {
    id: 'twilio',
    name: 'Twilio',
    logo: '/images/integrations/twilio.svg',
    category: 'communication',
    description: {
      en: 'The world\'s leading voice and messaging platform. Connect your Twilio phone numbers to our AI voice agents.',
      zh: '全球领先的语音和消息平台。将您的 Twilio 电话号码连接到我们的 AI 语音智能体。'
    },
    integrationType: 'native',
    features: [
      {
        key: 'sip-trunking',
        label: { en: 'SIP Trunking', zh: 'SIP 中继' },
        description: { en: 'Connect via SIP trunking', zh: '通过 SIP 中继连接' }
      },
      {
        key: 'phone-numbers',
        label: { en: 'Phone Number Management', zh: '号码管理' },
        description: { en: 'Use existing Twilio numbers', zh: '使用现有 Twilio 号码' }
      },
      {
        key: 'twiml-integration',
        label: { en: 'TwiML Integration', zh: 'TwiML 集成' },
        description: { en: 'Custom TwiML workflows', zh: '自定义 TwiML 工作流' }
      },
      {
        key: 'recording-storage',
        label: { en: 'Recording Storage', zh: '录音存储' },
        description: { en: 'Store recordings in Twilio', zh: '在 Twilio 存储录音' }
      }
    ],
    docsUrl: '/docs/integrations/twilio',
    websiteUrl: 'https://twilio.com',
    featured: true,
    certified: true
  },
  
  {
    id: 'agora',
    name: 'Agora',
    logo: '/images/integrations/agora.svg',
    category: 'communication',
    description: {
      en: 'Real-time voice and video communication platform for global connectivity.',
      zh: '实时语音和视频通信平台，实现全球连接。'
    },
    integrationType: 'sdk',
    features: [
      {
        key: 'real-time-voice',
        label: { en: 'Real-time Voice', zh: '实时语音' }
      },
      {
        key: 'global-network',
        label: { en: 'Global Network', zh: '全球网络' }
      }
    ],
    docsUrl: '/docs/integrations/agora',
    websiteUrl: 'https://agora.io',
    featured: false
  },
  
  {
    id: 'vonage',
    name: 'Vonage',
    logo: '/images/integrations/vonage.svg',
    category: 'communication',
    description: {
      en: 'Connect via Vonage\'s enterprise communication APIs and SIP trunking.',
      zh: '通过 Vonage 的企业通信 API 和 SIP 中继连接。'
    },
    integrationType: 'api',
    features: [
      {
        key: 'voice-api',
        label: { en: 'Voice API', zh: '语音 API' }
      },
      {
        key: 'sip-trunking',
        label: { en: 'SIP Trunking', zh: 'SIP 中继' }
      }
    ],
    docsUrl: '/docs/integrations/vonage',
    websiteUrl: 'https://vonage.com',
    featured: false,
    certified: true
  },
  
  {
    id: 'ronglianyun',
    name: '容联云',
    logo: '/images/integrations/ronglianyun.svg',
    category: 'communication',
    description: {
      en: 'China\'s leading cloud communication platform for enterprise voice services.',
      zh: '中国领先的云通信平台，提供企业语音服务。'
    },
    integrationType: 'api',
    features: [
      {
        key: 'voice-service',
        label: { en: 'Voice Service', zh: '语音服务' }
      },
      {
        key: 'sms-service',
        label: { en: 'SMS Service', zh: '短信服务' }
      }
    ],
    docsUrl: '/docs/integrations/ronglianyun',
    websiteUrl: 'https://ronglianyun.com',
    featured: false
  },

  // -----------------------------------------------------
  // 数据分析
  // -----------------------------------------------------
  {
    id: 'snowflake',
    name: 'Snowflake',
    logo: '/images/integrations/snowflake.svg',
    category: 'data-analytics',
    description: {
      en: 'Export call data, transcripts, and analytics to Snowflake for advanced data warehousing.',
      zh: '将通话数据、转录文本和分析结果导出到 Snowflake 进行高级数据仓库分析。'
    },
    integrationType: 'api',
    features: [
      {
        key: 'data-export',
        label: { en: 'Data Export', zh: '数据导出' },
        description: { en: 'Export call data to Snowflake', zh: '将通话数据导出到 Snowflake' }
      },
      {
        key: 'transcript-storage',
        label: { en: 'Transcript Storage', zh: '转录存储' },
        description: { en: 'Store transcripts for analysis', zh: '存储转录文本供分析' }
      },
      {
        key: 'analytics-queries',
        label: { en: 'Analytics Queries', zh: '分析查询' },
        description: { en: 'Run SQL queries on call data', zh: '对通话数据运行 SQL 查询' }
      }
    ],
    docsUrl: '/docs/integrations/snowflake',
    websiteUrl: 'https://snowflake.com',
    featured: true,
    certified: true
  },
  
  {
    id: 'databricks',
    name: 'Databricks',
    logo: '/images/integrations/databricks.svg',
    category: 'data-analytics',
    description: {
      en: 'Process and analyze call data with Databricks for ML and AI applications.',
      zh: '使用 Databricks 处理和分析通话数据，用于机器学习和 AI 应用。'
    },
    integrationType: 'api',
    features: [
      {
        key: 'ml-processing',
        label: { en: 'ML Processing', zh: 'ML 处理' }
      },
      {
        key: 'batch-analytics',
        label: { en: 'Batch Analytics', zh: '批量分析' }
      }
    ],
    docsUrl: '/docs/integrations/databricks',
    websiteUrl: 'https://databricks.com',
    featured: false,
    certified: true
  },

  // -----------------------------------------------------
  // AI 平台
  // -----------------------------------------------------
  {
    id: 'openai',
    name: 'OpenAI',
    logo: '/images/integrations/openai.svg',
    category: 'ai-platform',
    description: {
      en: 'Powered by OpenAI\'s GPT models for natural conversations and intelligent responses.',
      zh: '由 OpenAI 的 GPT 模型驱动，实现自然对话和智能响应。'
    },
    integrationType: 'native',
    features: [
      {
        key: 'gpt-integration',
        label: { en: 'GPT Integration', zh: 'GPT 集成' },
        description: { en: 'Powered by GPT-4', zh: '由 GPT-4 驱动' }
      },
      {
        key: 'natural-conversation',
        label: { en: 'Natural Conversation', zh: '自然对话' },
        description: { en: 'Human-like responses', zh: '拟人化响应' }
      },
      {
        key: 'context-aware',
        label: { en: 'Context Aware', zh: '上下文感知' },
        description: { en: 'Understands conversation context', zh: '理解对话上下文' }
      }
    ],
    docsUrl: '/docs/integrations/openai',
    websiteUrl: 'https://openai.com',
    featured: true,
    certified: true
  },
  
  {
    id: 'anthropic',
    name: 'Anthropic',
    logo: '/images/integrations/anthropic.svg',
    category: 'ai-platform',
    description: {
      en: 'Claude AI models for safe, helpful, and honest conversations.',
      zh: 'Claude AI 模型实现安全、有帮助、诚实的对话。'
    },
    integrationType: 'native',
    features: [
      {
        key: 'claude-integration',
        label: { en: 'Claude Integration', zh: 'Claude 集成' }
      },
      {
        key: 'safe-ai',
        label: { en: 'Safe AI', zh: '安全 AI' }
      }
    ],
    docsUrl: '/docs/integrations/anthropic',
    websiteUrl: 'https://anthropic.com',
    featured: false,
    certified: true
  },

  // -----------------------------------------------------
  // 自动化工具
  // -----------------------------------------------------
  {
    id: 'slack',
    name: 'Slack',
    logo: '/images/integrations/slack.svg',
    category: 'automation',
    description: {
      en: 'Send call notifications, transcripts, and alerts to Slack channels in real-time.',
      zh: '实时发送通话通知、转录文本和警报到 Slack 频道。'
    },
    integrationType: 'native',
    features: [
      {
        key: 'call-notifications',
        label: { en: 'Call Notifications', zh: '通话通知' },
        description: { en: 'Real-time call alerts', zh: '实时通话警报' }
      },
      {
        key: 'transcript-sharing',
        label: { en: 'Transcript Sharing', zh: '转录分享' },
        description: { en: 'Share transcripts in channels', zh: '在频道分享转录文本' }
      },
      {
        key: 'team-alerts',
        label: { en: 'Team Alerts', zh: '团队警报' },
        description: { en: 'Notify teams on events', zh: '在事件时通知团队' }
      }
    ],
    docsUrl: '/docs/integrations/slack',
    websiteUrl: 'https://slack.com',
    featured: true,
    certified: true
  },
  
  {
    id: 'zapier',
    name: 'Zapier',
    logo: '/images/integrations/zapier.svg',
    category: 'automation',
    description: {
      en: 'Connect to 5,000+ apps through Zapier. Automate workflows without coding.',
      zh: '通过 Zapier 连接 5,000+ 应用。无需编码即可自动化工作流。'
    },
    integrationType: 'native',
    features: [
      {
        key: 'workflow-automation',
        label: { en: 'Workflow Automation', zh: '工作流自动化' },
        description: { en: 'Automate with 5000+ apps', zh: '与 5000+ 应用自动化' }
      },
      {
        key: 'trigger-events',
        label: { en: 'Trigger Events', zh: '触发事件' },
        description: { en: 'Trigger Zaps on call events', zh: '在通话事件触发 Zap' }
      },
      {
        key: 'no-code',
        label: { en: 'No-Code Setup', zh: '无代码设置' },
        description: { en: 'Easy setup without coding', zh: '无需编码的简单设置' }
      }
    ],
    docsUrl: '/docs/integrations/zapier',
    websiteUrl: 'https://zapier.com',
    featured: true,
    certified: true
  }
];

// =====================================================
// 查询函数
// =====================================================

export function getIntegrationById(id: string): Integration | undefined {
  return integrations.find(i => i.id === id);
}

export function getFeaturedIntegrations(): Integration[] {
  return integrations.filter(i => i.featured);
}

export function getIntegrationsByCategory(category: IntegrationCategory): Integration[] {
  return integrations.filter(i => i.category === category);
}

export function getCertifiedIntegrations(): Integration[] {
  return integrations.filter(i => i.certified);
}

export function getIntegrationTypeLabel(type: string): { en: string; zh: string } {
  const labels: Record<string, { en: string; zh: string }> = {
    'native': { en: 'Native Integration', zh: '原生集成' },
    'api': { en: 'API Integration', zh: 'API 集成' },
    'webhook': { en: 'Webhook Integration', zh: 'Webhook 集成' },
    'sdk': { en: 'SDK Integration', zh: 'SDK 集成' }
  };
  return labels[type] || { en: type, zh: type };
}

// =====================================================
// 集成统计
// =====================================================

export const integrationStats = {
  total: integrations.length,
  certified: integrations.filter(i => i.certified).length,
  categories: integrationCategories.length,
  nativeIntegrations: integrations.filter(i => i.integrationType === 'native').length
};