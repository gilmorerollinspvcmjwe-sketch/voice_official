/**
 * Pricing FAQ 数据配置
 * 
 * 使用场景: src/pages/Pricing.tsx
 */

export interface PricingFAQ {
  id: string;
  question: {
    en: string;
    zh: string;
  };
  answer: {
    en: string;
    zh: string;
  };
}

export const pricingFAQ: PricingFAQ[] = [
  {
    id: 'faq-1',
    question: {
      en: 'How does the free trial work?',
      zh: '免费试用如何运作？',
    },
    answer: {
      en: 'Our free trial gives you full access to all Pro features for 14 days. No credit card required. You can make up to 100 calls during the trial period.',
      zh: '我们的免费试用让您完整访问所有 Pro 功能 14 天。无需信用卡。试用期间您可以拨打最多 100 通电话。',
    },
  },
  {
    id: 'faq-2',
    question: {
      en: 'Can I change my plan later?',
      zh: '我可以稍后更改套餐吗？',
    },
    answer: {
      en: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated difference. When downgrading, the new rate applies at your next billing cycle.',
      zh: '是的，您可以随时升级或降级您的套餐。升级时，您将支付按比例的差额。降级时，新费率将在您的下一个账单周期生效。',
    },
  },
  {
    id: 'faq-3',
    question: {
      en: 'What payment methods do you accept?',
      zh: '你们接受哪些付款方式？',
    },
    answer: {
      en: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise customers. All payments are processed securely through Stripe.',
      zh: '我们接受所有主要信用卡（Visa、Mastercard、American Express）、PayPal，以及企业客户的银行转账。所有付款均通过 Stripe 安全处理。',
    },
  },
  {
    id: 'faq-4',
    question: {
      en: 'Is there a minimum contract commitment?',
      zh: '有最低合同承诺吗？',
    },
    answer: {
      en: 'For Free and Pro plans, there\'s no minimum commitment - you pay month-to-month. Enterprise plans typically require an annual contract for the best pricing, but we offer flexible terms for smaller commitments.',
      zh: '对于免费版和专业版套餐，没有最低承诺 - 您按月付费。企业版套餐通常需要年度合同以获得最佳价格，但我们为较小的承诺提供灵活条款。',
    },
  },
  {
    id: 'faq-5',
    question: {
      en: 'How is call volume calculated?',
      zh: '通话量如何计算？',
    },
    answer: {
      en: 'A "call" is counted when our AI voice agent answers and begins a conversation. Short abandoned calls that last less than 5 seconds are not counted. Each conversation is billed based on duration (per-minute billing).',
      zh: '当我们的 AI 语音智能体接听并开始对话时，即算作一通"电话"。持续时间少于 5 秒的短放弃呼叫不计入。每通对话按时长计费（按分钟计费）。',
    },
  },
  {
    id: 'faq-6',
    question: {
      en: 'Do you offer custom enterprise solutions?',
      zh: '你们提供定制企业解决方案吗？',
    },
    answer: {
      en: 'Yes, Enterprise customers can request custom solutions including dedicated AI models, on-premise deployment, custom voice cloning, and specialized industry workflows. Contact our sales team for a tailored quote.',
      zh: '是的，企业客户可以请求定制解决方案，包括专用 AI 模型、本地部署、自定义语音克隆和专业行业工作流程。联系我们的销售团队获取定制报价。',
    },
  },
  {
    id: 'faq-7',
    question: {
      en: 'What happens if I exceed my monthly call limit?',
      zh: '如果我超出每月通话限制会怎样？',
    },
    answer: {
      en: 'We\'ll notify you when you reach 80% and 100% of your limit. Once you hit your limit, additional calls will be blocked until you upgrade or the next billing cycle. We never surprise-charge without explicit approval.',
      zh: '当您达到限额的 80% 和 100% 时，我们会通知您。一旦达到限额，额外电话将被阻止，直到您升级或进入下一个账单周期。我们绝不会在未经明确批准的情况下追加收费。',
    },
  },
  {
    id: 'faq-8',
    question: {
      en: 'Can I get a refund if I\'m not satisfied?',
      zh: '如果我不满意可以退款吗？',
    },
    answer: {
      en: 'We offer a 30-day money-back guarantee for all new subscriptions. If you\'re not satisfied with our service within the first 30 days, contact our support team for a full refund - no questions asked.',
      zh: '我们为所有新订阅提供 30 天退款保证。如果您在最初 30 天内对我们的服务不满意，请联系我们的支持团队获得全额退款 - 无需任何理由。',
    },
  },
  {
    id: 'faq-9',
    question: {
      en: 'Do you offer discounts for non-profits or startups?',
      zh: '你们为非营利组织或初创公司提供折扣吗？',
    },
    answer: {
      en: 'Yes! We offer 50% off for verified non-profits and qualified startups (under 2 years old, under $1M funding). Contact us with proof of eligibility to receive your discount code.',
      zh: '是的！我们为经认证的非营利组织和合格初创公司（成立不到 2 年、融资少于 100 万美元）提供 5 折优惠。联系我们提供资格证明以获取您的折扣码。',
    },
  },
  {
    id: 'faq-10',
    question: {
      en: 'What kind of support do you provide?',
      zh: '你们提供什么样的支持？',
    },
    answer: {
      en: 'Free users get community forum access and email support (24-48 hour response). Pro users get priority email support (4-hour response) and access to our knowledge base. Enterprise customers get dedicated account managers and 24/7 phone support.',
      zh: '免费用户可以访问社区论坛和电子邮件支持（24-48 小时响应）。专业用户享有优先电子邮件支持（4 小时响应）和知识库访问权限。企业客户享有专属客户经理和 24/7 电话支持。',
    },
  },
];
