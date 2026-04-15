/**
 * Demo 场景配置 - 20 个场景（呼入 10 个 + 外呼 10 个）
 * 
 * 用于 /demo 页面的交互式演示
 * 包含场景详情、音频样本、对话脚本、外呼测试配置
 */

// =====================================================
// 类型定义
// =====================================================

export interface DemoScenario {
  id: string;
  type: 'inbound' | 'outbound';  // 呼入/外呼
  category: string;
  
  name: {
    en: string;
    zh: string;
  };
  icon: string;
  
  description: {
    en: string;
    zh: string;
  };
  
  // 音频样本配置
  audioSample: string;
  
  // 对话脚本
  script: {
    en: string;
    zh: string;
  };
  
  // 预估时长（秒）
  duration: number;
  
  // 场景标签
  tags?: string[];
  
  // 是否为精选场景
  featured?: boolean;
  
  // 难度等级
  difficulty?: 'easy' | 'medium' | 'hard';
  
  // 外呼测试配置
  outboundConfig?: OutboundCallConfig;
}

export interface OutboundCallConfig {
  scenarioId: string;
  agentPersona: {
    name: string;
    tone: 'professional' | 'friendly' | 'casual' | 'urgent';
    language: string;
  };
  conversationFlow: ConversationStep[];
  dataCollectionGoals: DataCollectionGoal[];
  handoffConditions: HandoffCondition[];
}

export interface ConversationStep {
  stepId: string;
  type: 'greeting' | 'question' | 'response_handling' | 'information' | 'closing' | 'handoff';
  content: {
    en: string;
    zh: string;
  };
  expectedResponses?: ExpectedResponse[];
  fallback?: {
    en: string;
    zh: string;
  };
}

export interface ExpectedResponse {
  type: 'positive' | 'negative' | 'neutral' | 'question' | 'information';
  keywords: string[];
  nextStep: string;
}

export interface DataCollectionGoal {
  field: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'enum';
  required: boolean;
  description: string;
}

export interface HandoffCondition {
  trigger: 'sentiment_negative' | 'complex_issue' | 'request_human' | 'escalation_keyword';
  keywords?: string[];
  message: {
    en: string;
    zh: string;
  };
}

// =====================================================
// 场景配置 - 20 个场景（呼入 10 个 + 外呼 10 个）
// =====================================================

export const scenarios: DemoScenario[] = [
  // ==================== 呼入场景 (10 个) ====================
  
  {
    id: 'inbound-cs-001',
    type: 'inbound',
    category: 'customer-service',
    name: {
      en: 'Product Return Request',
      zh: '产品退货咨询'
    },
    icon: 'Package',
    description: {
      en: 'Customer calls to inquire about return policy and process a return',
      zh: '客户来电咨询退货政策并办理退货'
    },
    audioSample: '/audio/demos/inbound-return.mp3',
    script: {
      en: 'Customer: Hi, I bought a product last week but it doesn\'t work as expected. Can I return it?\nAI: Of course, I\'d be happy to help you with the return. May I have your order number please?',
      zh: '客户：你好，我上周买了个产品但不好用。能退货吗？\nAI：当然可以，我很乐意帮您办理退货。请问您的订单号是？'
    },
    duration: 90,
    tags: ['退货', '售后', '政策咨询'],
    featured: true,
    difficulty: 'medium'
  },
  
  {
    id: 'inbound-cs-002',
    type: 'inbound',
    category: 'customer-service',
    name: {
      en: 'Billing Dispute',
      zh: '账单争议处理'
    },
    icon: 'CreditCard',
    description: {
      en: 'Customer disputes an unexpected charge on their account',
      zh: '客户对账户上的意外收费提出异议'
    },
    audioSample: '/audio/demos/inbound-billing.mp3',
    script: {
      en: 'Customer: I see a charge on my statement that I don\'t recognize. Can you help?\nAI: I understand your concern. Let me pull up your account and review the charges with you.',
      zh: '客户：我看到账单上有笔不认识的收费。能帮我看看吗？\nAI：我理解您的担忧。让我调取您的账户，一起查看这笔收费。'
    },
    duration: 120,
    tags: ['账单', '争议', '退款'],
    featured: true,
    difficulty: 'hard'
  },
  
  {
    id: 'inbound-tech-001',
    type: 'inbound',
    category: 'technical-support',
    name: {
      en: 'Password Reset',
      zh: '密码重置'
    },
    icon: 'Key',
    description: {
      en: 'Customer needs to reset their account password',
      zh: '客户需要重置账户密码'
    },
    audioSample: '/audio/demos/inbound-password.mp3',
    script: {
      en: 'Customer: I forgot my password and can\'t log in.\nAI: No problem, I can help you reset your password. Let me verify your identity first.',
      zh: '客户：我忘记密码了，登不上去。\nAI：没问题，我可以帮您重置密码。先验证一下您的身份。'
    },
    duration: 60,
    tags: ['密码', '登录', '账户'],
    featured: false,
    difficulty: 'easy'
  },
  
  {
    id: 'inbound-tech-002',
    type: 'inbound',
    category: 'technical-support',
    name: {
      en: 'Software Installation Issue',
      zh: '软件安装问题'
    },
    icon: 'Download',
    description: {
      en: 'Customer encounters errors during software installation',
      zh: '客户在安装软件时遇到错误'
    },
    audioSample: '/audio/demos/inbound-install.mp3',
    script: {
      en: 'Customer: The installation keeps failing at 50%.\nAI: I see. Let me walk you through some troubleshooting steps to resolve this.',
      zh: '客户：安装到 50% 就一直失败。\nAI：明白了。让我引导您完成一些故障排除步骤。'
    },
    duration: 180,
    tags: ['安装', '故障排除', '技术支持'],
    featured: true,
    difficulty: 'hard'
  },
  
  {
    id: 'inbound-sales-001',
    type: 'inbound',
    category: 'sales',
    name: {
      en: 'Product Inquiry',
      zh: '产品咨询'
    },
    icon: 'Info',
    description: {
      en: 'Potential customer asks about product features and pricing',
      zh: '潜在客户咨询产品功能和价格'
    },
    audioSample: '/audio/demos/inbound-inquiry.mp3',
    script: {
      en: 'Customer: I\'m interested in your product. Can you tell me more about the features?\nAI: Absolutely! I\'d love to tell you about our product. What specific features are you most interested in?',
      zh: '客户：我对你们产品感兴趣。能介绍一下功能吗？\nAI：当然！我很乐意介绍。您最关心哪些功能？'
    },
    duration: 150,
    tags: ['咨询', '产品', '销售'],
    featured: true,
    difficulty: 'medium'
  },
  
  {
    id: 'inbound-sales-002',
    type: 'inbound',
    category: 'sales',
    name: {
      en: 'Upgrade Consultation',
      zh: '升级咨询'
    },
    icon: 'TrendingUp',
    description: {
      en: 'Existing customer wants to upgrade their plan',
      zh: '现有客户想要升级套餐'
    },
    audioSample: '/audio/demos/inbound-upgrade.mp3',
    script: {
      en: 'Customer: I\'m on the basic plan but need more features. What are my options?\nAI: Great question! Let me review your current plan and show you the upgrade options that best fit your needs.',
      zh: '客户：我用的是基础版，但需要更多功能。有什么选择？\nAI：好问题！让我查看您当前的套餐，给您推荐最适合的升级方案。'
    },
    duration: 100,
    tags: ['升级', '套餐', '销售'],
    featured: false,
    difficulty: 'medium'
  },
  
  {
    id: 'inbound-appt-001',
    type: 'inbound',
    category: 'appointment',
    name: {
      en: 'Appointment Scheduling',
      zh: '预约安排'
    },
    icon: 'Calendar',
    description: {
      en: 'Customer calls to schedule an appointment',
      zh: '客户来电安排预约'
    },
    audioSample: '/audio/demos/inbound-appointment.mp3',
    script: {
      en: 'Customer: I\'d like to schedule an appointment for next week.\nAI: Certainly! Let me check our availability. What day works best for you?',
      zh: '客户：我想预约下周的时间。\nAI：好的！让我查看可预约时间。您哪天比较方便？'
    },
    duration: 80,
    tags: ['预约', '日程', '安排'],
    featured: false,
    difficulty: 'easy'
  },
  
  {
    id: 'inbound-appt-002',
    type: 'inbound',
    category: 'appointment',
    name: {
      en: 'Appointment Rescheduling',
      zh: '预约改期'
    },
    icon: 'CalendarClock',
    description: {
      en: 'Customer needs to reschedule an existing appointment',
      zh: '客户需要改期已有预约'
    },
    audioSample: '/audio/demos/inbound-reschedule.mp3',
    script: {
      en: 'Customer: Something came up and I need to change my appointment.\nAI: No problem at all. Let me find your existing appointment and help you reschedule.',
      zh: '客户：临时有事，需要改一下预约时间。\nAI：没问题。让我找到您的预约，帮您重新安排。'
    },
    duration: 70,
    tags: ['改期', '预约', '变更'],
    featured: false,
    difficulty: 'easy'
  },
  
  {
    id: 'inbound-hr-001',
    type: 'inbound',
    category: 'hr',
    name: {
      en: 'Employee Benefits Inquiry',
      zh: '员工福利咨询'
    },
    icon: 'Users',
    description: {
      en: 'Employee calls HR to ask about benefits coverage',
      zh: '员工致电 HR 咨询福利保险'
    },
    audioSample: '/audio/demos/inbound-benefits.mp3',
    script: {
      en: 'Employee: Hi, I have a question about my health insurance coverage.\nAI: Hello! I\'d be happy to help you with your benefits question. What would you like to know?',
      zh: '员工：你好，我想问一下医疗保险的问题。\nAI：您好！我很乐意帮您解答福利问题。您想了解什么？'
    },
    duration: 90,
    tags: ['HR', '福利', '保险'],
    featured: false,
    difficulty: 'medium'
  },
  
  {
    id: 'inbound-finance-001',
    type: 'inbound',
    category: 'finance',
    name: {
      en: 'Loan Application Status',
      zh: '贷款申请状态查询'
    },
    icon: 'FileCheck',
    description: {
      en: 'Customer calls to check the status of their loan application',
      zh: '客户来电查询贷款申请状态'
    },
    audioSample: '/audio/demos/inbound-loan.mp3',
    script: {
      en: 'Customer: I applied for a loan last week. What\'s the status?\nAI: Let me look up your application. May I have your application reference number?',
      zh: '客户：我上周申请了贷款。现在什么状态了？\nAI：让我查询您的申请。请问申请编号是？'
    },
    duration: 80,
    tags: ['贷款', '金融', '状态查询'],
    featured: false,
    difficulty: 'medium'
  },
  
  // ==================== 外呼场景 (10 个) ====================
  
  {
    id: 'outbound-sales-001',
    type: 'outbound',
    category: 'sales',
    name: {
      en: 'Lead Qualification Call',
      zh: '潜在客户筛选'
    },
    icon: 'Phone',
    description: {
      en: 'AI calls to qualify a sales lead and schedule a demo',
      zh: 'AI 致电筛选销售线索并安排演示'
    },
    audioSample: '/audio/demos/outbound-lead.mp3',
    script: {
      en: 'AI: Hi, this is Sarah from TechCorp. I noticed you downloaded our whitepaper. Are you interested in learning more about our solution?\nProspect: Yes, I\'d like to know more.',
      zh: 'AI：您好，我是 TechCorp 的 Sarah。注意到您下载了我们的白皮书。有兴趣了解更多吗？\n客户：是的，我想了解更多。'
    },
    duration: 120,
    tags: ['销售', '线索筛选', '演示'],
    featured: true,
    difficulty: 'medium',
    outboundConfig: {
      scenarioId: 'outbound-sales-001',
      agentPersona: {
        name: 'Sarah',
        tone: 'professional',
        language: 'zh-CN'
      },
      conversationFlow: [],
      dataCollectionGoals: [],
      handoffConditions: []
    }
  },
  
  {
    id: 'outbound-sales-002',
    type: 'outbound',
    category: 'sales',
    name: {
      en: 'Product Demo Follow-up',
      zh: '产品演示跟进'
    },
    icon: 'Presentation',
    description: {
      en: 'Follow-up call after a product demo to answer questions and close the deal',
      zh: '产品演示后的跟进电话，回答问题并促成交易'
    },
    audioSample: '/audio/demos/outbound-followup.mp3',
    script: {
      en: 'AI: Hi, this is Sarah. You attended our demo yesterday. Do you have any questions I can help with?\nProspect: Yes, I have a few questions about pricing.',
      zh: 'AI：您好，我是 Sarah。您昨天参加了演示。有什么问题我可以解答吗？\n客户：是的，我有几个价格问题。'
    },
    duration: 150,
    tags: ['销售', '跟进', '成交'],
    featured: true,
    difficulty: 'hard'
  },
  
  {
    id: 'outbound-cs-001',
    type: 'outbound',
    category: 'customer-service',
    name: {
      en: 'Delivery Confirmation',
      zh: '配送确认'
    },
    icon: 'Truck',
    description: {
      en: 'AI calls to confirm delivery address and time',
      zh: 'AI 致电确认配送地址和时间'
    },
    audioSample: '/audio/demos/outbound-delivery.mp3',
    script: {
      en: 'AI: Hi, this is a call from FastShip. Your package is scheduled for delivery tomorrow. Is the address still correct?\nCustomer: Yes, that\'s correct.',
      zh: 'AI：您好，这里是 FastShip。您的包裹计划明天配送。地址还正确吗？\n客户：是的，正确。'
    },
    duration: 45,
    tags: ['配送', '确认', '物流'],
    featured: false,
    difficulty: 'easy'
  },
  
  {
    id: 'outbound-cs-002',
    type: 'outbound',
    category: 'customer-service',
    name: {
      en: 'Service Outage Notification',
      zh: '服务中断通知'
    },
    icon: 'TriangleAlert',
    description: {
      en: 'Proactive call to inform customers about a service outage',
      zh: '主动致电通知客户服务中断'
    },
    audioSample: '/audio/demos/outbound-outage.mp3',
    script: {
      en: 'AI: Hi, this is a call from PowerCo. We wanted to inform you about a planned maintenance in your area tomorrow.\nCustomer: Okay, how long will it last?',
      zh: 'AI：您好，这里是电力公司。通知您明天您所在区域有计划维护。\n客户：好的，会持续多久？'
    },
    duration: 60,
    tags: ['通知', '维护', '服务'],
    featured: false,
    difficulty: 'easy'
  },
  
  {
    id: 'outbound-appt-001',
    type: 'outbound',
    category: 'appointment',
    name: {
      en: 'Appointment Reminder',
      zh: '预约提醒'
    },
    icon: 'Bell',
    description: {
      en: 'AI calls to remind customer of upcoming appointment',
      zh: 'AI 致电提醒客户即将到来的预约'
    },
    audioSample: '/audio/demos/outbound-reminder.mp3',
    script: {
      en: 'AI: Hi, this is a reminder from City Hospital. You have an appointment tomorrow at 2 PM.\nCustomer: Thank you, I\'ll be there.',
      zh: 'AI：您好，这里是市医院提醒。您明天下午 2 点有预约。\n客户：谢谢，我会准时到。'
    },
    duration: 40,
    tags: ['提醒', '预约', '确认'],
    featured: true,
    difficulty: 'easy'
  },
  
  {
    id: 'outbound-appt-002',
    type: 'outbound',
    category: 'appointment',
    name: {
      en: 'No-Show Follow-up',
      zh: '爽约跟进'
    },
    icon: 'UserX',
    description: {
      en: 'Follow-up call when customer misses an appointment',
      zh: '客户爽约后的跟进电话'
    },
    audioSample: '/audio/demos/outbound-noshow.mp3',
    script: {
      en: 'AI: Hi, we noticed you missed your appointment yesterday. Would you like to reschedule?\nCustomer: Oh sorry, something came up. Yes, let\'s reschedule.',
      zh: 'AI：您好，注意到您昨天错过了预约。需要重新安排吗？\n客户：哦抱歉，临时有事。是的，重新安排吧。'
    },
    duration: 70,
    tags: ['爽约', '跟进', '改期'],
    featured: false,
    difficulty: 'medium'
  },
  
  {
    id: 'outbound-finance-001',
    type: 'outbound',
    category: 'finance',
    name: {
      en: 'Payment Reminder',
      zh: '付款提醒'
    },
    icon: 'DollarSign',
    description: {
      en: 'Friendly reminder about an upcoming payment due',
      zh: '友好提醒即将到期的付款'
    },
    audioSample: '/audio/demos/outbound-payment.mp3',
    script: {
      en: 'AI: Hi, this is a friendly reminder that your payment of $99 is due in 3 days.\nCustomer: Okay, I\'ll make the payment today.',
      zh: 'AI：您好，友好提醒您有 99 美元的付款 3 天后到期。\n客户：好的，我今天会付款。'
    },
    duration: 50,
    tags: ['付款', '提醒', '财务'],
    featured: false,
    difficulty: 'easy'
  },
  
  {
    id: 'outbound-finance-002',
    type: 'outbound',
    category: 'finance',
    name: {
      en: 'Overdue Payment Collection',
      zh: '逾期催收'
    },
    icon: 'ClockAlert',
    description: {
      en: 'Professional collection call for overdue payment',
      zh: '专业的逾期付款催收电话'
    },
    audioSample: '/audio/demos/outbound-collection.mp3',
    script: {
      en: 'AI: Hi, this is a call regarding your overdue payment of $199. Can we arrange payment today?\nCustomer: I understand. Let me make the payment now.',
      zh: 'AI：您好，致电是关于您逾期的 199 美元付款。今天能安排付款吗？\n客户：明白了。我现在就付。'
    },
    duration: 90,
    tags: ['催收', '逾期', '财务'],
    featured: true,
    difficulty: 'hard'
  },
  
  {
    id: 'outbound-survey-001',
    type: 'outbound',
    category: 'survey',
    name: {
      en: 'Customer Satisfaction Survey',
      zh: '客户满意度调研'
    },
    icon: 'Star',
    description: {
      en: 'AI conducts a satisfaction survey with recent customers',
      zh: 'AI 对近期客户进行满意度调研'
    },
    audioSample: '/audio/demos/outbound-survey.mp3',
    script: {
      en: 'AI: Hi, we\'d love your feedback on your recent experience. Do you have 2 minutes?\nCustomer: Sure, go ahead.',
      zh: 'AI：您好，想请您反馈一下最近的体验。有 2 分钟时间吗？\n客户：可以，你说。'
    },
    duration: 180,
    tags: ['调研', '满意度', '反馈'],
    featured: true,
    difficulty: 'medium'
  },
  
  {
    id: 'outbound-hr-001',
    type: 'outbound',
    category: 'hr',
    name: {
      en: 'Interview Scheduling',
      zh: '面试安排'
    },
    icon: 'Briefcase',
    description: {
      en: 'AI calls candidates to schedule job interviews',
      zh: 'AI 致电候选人安排工作面试'
    },
    audioSample: '/audio/demos/outbound-interview.mp3',
    script: {
      en: 'AI: Hi, this is HR from TechCorp. We\'d like to invite you for an interview. Are you available this week?\nCandidate: Yes, I\'m available Thursday afternoon.',
      zh: 'AI：您好，这里是 TechCorp 的 HR。想邀请您参加面试。本周有时间吗？\n候选人：可以，周四下午有空。'
    },
    duration: 100,
    tags: ['HR', '面试', '招聘'],
    featured: false,
    difficulty: 'medium'
  }
]

// =====================================================
// 场景分类统计
// =====================================================

export const scenarioStats = {
  total: scenarios.length,
  inbound: scenarios.filter(s => s.type === 'inbound').length,
  outbound: scenarios.filter(s => s.type === 'outbound').length,
  featured: scenarios.filter(s => s.featured).length,
  byCategory: scenarios.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1
    return acc
  }, {} as Record<string, number>),
  byDifficulty: {
    easy: scenarios.filter(s => s.difficulty === 'easy').length,
    medium: scenarios.filter(s => s.difficulty === 'medium').length,
    hard: scenarios.filter(s => s.difficulty === 'hard').length
  }
}

// =====================================================
// 导出
// =====================================================

export default {
  scenarios,
  scenarioStats
}
