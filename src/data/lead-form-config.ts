/**
 * 获客表单配置
 * 
 * 用于 /get-started 页面的表单字段定义
 * 支持中英文双语、验证规则、提交后流程
 */

// =====================================================
// 表单字段类型定义
// =====================================================

export interface FormFieldConfig {
  key: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'multiselect' | 'textarea' | 'radio';
  label: {
    en: string;
    zh: string;
  };
  placeholder?: {
    en: string;
    zh: string;
  };
  required: boolean;
  validation?: {
    pattern?: string;           // 正则验证
    minLength?: number;
    maxLength?: number;
    customValidator?: string;   // 自定义验证器名称
  };
  options?: FormFieldOption[];  // 选择型字段选项
  defaultValue?: string | string[];
  helpText?: {
    en: string;
    zh: string;
  };
}

export interface FormFieldOption {
  value: string;
  label: {
    en: string;
    zh: string;
  };
  description?: {
    en: string;
    zh: string;
  };
}

export interface LeadFormSection {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  description?: {
    en: string;
    zh: string;
  };
  fields: FormFieldConfig[];
}

// =====================================================
// 表单配置数据
// =====================================================

export const leadFormSections: LeadFormSection[] = [
  // -----------------------------------------------------
  // 第一部分：基本信息
  // -----------------------------------------------------
  {
    id: 'basic-info',
    title: {
      en: 'Basic Information',
      zh: '基本信息'
    },
    description: {
      en: 'Tell us about yourself and your company',
      zh: '请填写您和公司的基本信息'
    },
    fields: [
      {
        key: 'fullName',
        type: 'text',
        label: {
          en: 'Full Name',
          zh: '姓名'
        },
        placeholder: {
          en: 'John Smith',
          zh: '张三'
        },
        required: true,
        validation: {
          minLength: 2,
          maxLength: 50
        }
      },
      {
        key: 'workEmail',
        type: 'email',
        label: {
          en: 'Work Email',
          zh: '工作邮箱'
        },
        placeholder: {
          en: 'john@company.com',
          zh: 'zhangsan@company.com'
        },
        required: true,
        validation: {
          customValidator: 'workEmail'
        },
        helpText: {
          en: 'Please use your company email (personal emails like Gmail are not accepted)',
          zh: '请使用公司邮箱（不接受 Gmail、QQ 等个人邮箱）'
        }
      },
      {
        key: 'company',
        type: 'text',
        label: {
          en: 'Company Name',
          zh: '公司名称'
        },
        placeholder: {
          en: 'TechCorp Inc.',
          zh: '某某科技有限公司'
        },
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100
        }
      },
      {
        key: 'jobTitle',
        type: 'text',
        label: {
          en: 'Job Title',
          zh: '职位'
        },
        placeholder: {
          en: 'VP of Customer Service',
          zh: '客服总监'
        },
        required: true,
        validation: {
          minLength: 2,
          maxLength: 50
        }
      },
      {
        key: 'phone',
        type: 'tel',
        label: {
          en: 'Phone Number',
          zh: '电话号码'
        },
        placeholder: {
          en: '+1 (555) 123-4567',
          zh: '+86 138 1234 5678'
        },
        required: true,
        validation: {
          customValidator: 'internationalPhone'
        },
        helpText: {
          en: 'International format supported. We may call you for a live demo.',
          zh: '支持国际格式。我们可能会致电为您提供实时演示。'
        }
      },
      {
        key: 'companySize',
        type: 'select',
        label: {
          en: 'Company Size',
          zh: '公司规模'
        },
        required: true,
        options: [
          { value: '1-50', label: { en: '1-50 employees', zh: '1-50 人' } },
          { value: '51-200', label: { en: '51-200 employees', zh: '51-200 人' } },
          { value: '201-500', label: { en: '201-500 employees', zh: '201-500 人' } },
          { value: '501-1000', label: { en: '501-1000 employees', zh: '501-1000 人' } },
          { value: '1000+', label: { en: '1000+ employees', zh: '1000+ 人' } }
        ]
      }
    ]
  },

  // -----------------------------------------------------
  // 第二部分：需求信息
  // -----------------------------------------------------
  {
    id: 'needs',
    title: {
      en: 'Your Needs',
      zh: '需求信息'
    },
    description: {
      en: 'Help us understand your use case',
      zh: '帮助我们了解您的使用场景'
    },
    fields: [
      {
        key: 'useCase',
        type: 'select',
        label: {
          en: 'Primary Use Case',
          zh: '主要使用场景'
        },
        required: true,
        options: [
          {
            value: 'customer-service',
            label: { en: 'Customer Service', zh: '客服咨询' },
            description: {
              en: 'Handle inbound customer inquiries, complaints, and support',
              zh: '处理客户咨询、投诉、技术支持'
            }
          },
          {
            value: 'sales',
            label: { en: 'Sales Outbound', zh: '销售外呼' },
            description: {
              en: 'Proactive outreach, lead qualification, product demos',
              zh: '主动外呼、线索筛选、产品推介'
            }
          },
          {
            value: 'collections',
            label: { en: 'Collections', zh: '催收提醒' },
            description: {
              en: 'Bill reminders, payment negotiations (compliant)',
              zh: '账单提醒、还款协商（合规）'
            }
          },
          {
            value: 'appointment',
            label: { en: 'Appointment Reminders', zh: '预约提醒' },
            description: {
              en: 'Meeting confirmations, service scheduling',
              zh: '会议确认、服务预约'
            }
          },
          {
            value: 'survey',
            label: { en: 'Survey & Feedback', zh: '调研回访' },
            description: {
              en: 'NPS surveys, satisfaction calls, market research',
              zh: 'NPS 调研、满意度回访、市场调研'
            }
          },
          {
            value: 'multiple',
            label: { en: 'Multiple Use Cases', zh: '多种场景' },
            description: {
              en: 'I need voice agents for several different scenarios',
              zh: '需要用于多个不同场景'
            }
          }
        ]
      },
      {
        key: 'monthlyCallVolume',
        type: 'select',
        label: {
          en: 'Estimated Monthly Call Volume',
          zh: '预估月通话量'
        },
        required: true,
        options: [
          { value: '<1000', label: { en: 'Less than 1,000 calls', zh: '少于 1000 次' } },
          { value: '1000-5000', label: { en: '1,000 - 5,000 calls', zh: '1,000 - 5,000 次' } },
          { value: '5000-20000', label: { en: '5,000 - 20,000 calls', zh: '5,000 - 20,000 次' } },
          { value: '20000-50000', label: { en: '20,000 - 50,000 calls', zh: '20,000 - 50,000 次' } },
          { value: '50000+', label: { en: '50,000+ calls', zh: '50,000+ 次' } }
        ]
      },
      {
        key: 'currentSolution',
        type: 'select',
        label: {
          en: 'Current Solution',
          zh: '当前方案'
        },
        required: true,
        options: [
          {
            value: 'human-only',
            label: { en: 'Human agents only', zh: '纯人工客服' },
            description: {
              en: 'All calls handled by human agents',
              zh: '所有通话由人工处理'
            }
          },
          {
            value: 'other-ai',
            label: { en: 'Another AI voice solution', zh: '其他 AI 语音方案' },
            description: {
              en: 'Using a different AI voice platform',
              zh: '正在使用其他 AI 语音平台'
            }
          },
          {
            value: 'ivr-only',
            label: { en: 'Traditional IVR only', zh: '传统 IVR' },
            description: {
              en: 'Basic automated menus, no AI',
              zh: '基础自动菜单，无 AI'
            }
          },
          {
            value: 'none',
            label: { en: 'No current solution', zh: '暂无方案' },
            description: {
              en: 'New to voice automation',
              zh: '刚开始探索语音自动化'
            }
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------
  // 第三部分：关注优先级
  // -----------------------------------------------------
  {
    id: 'priorities',
    title: {
      en: 'Your Priorities',
      zh: '关注优先级'
    },
    description: {
      en: 'What matters most to you? (Select top 3)',
      zh: '什么对您最重要？（请选择前 3 项）'
    },
    fields: [
      {
        key: 'priorities',
        type: 'multiselect',
        label: {
          en: 'Key Priorities',
          zh: '关键优先级'
        },
        required: true,
        validation: {
          minLength: 1,
          maxLength: 3
        },
        options: [
          {
            value: 'cost',
            label: { en: 'Cost Reduction', zh: '降低成本' },
            description: {
              en: 'Reduce operational costs and improve ROI',
              zh: '降低运营成本，提升投资回报'
            }
          },
          {
            value: 'quality',
            label: { en: 'Service Quality', zh: '服务质量' },
            description: {
              en: 'Improve customer satisfaction and consistency',
              zh: '提升客户满意度和服务一致性'
            }
          },
          {
            value: 'speed',
            label: { en: 'Fast Deployment', zh: '快速上线' },
            description: {
              en: 'Get up and running quickly',
              zh: '快速部署并投入使用'
            }
          },
          {
            value: 'compliance',
            label: { en: 'Compliance & Security', zh: '合规与安全' },
            description: {
              en: 'Meet regulatory requirements and protect data',
              zh: '满足监管要求，保护数据安全'
            }
          },
          {
            value: 'scale',
            label: { en: 'Scalability', zh: '可扩展性' },
            description: {
              en: 'Handle growing call volumes easily',
              zh: '轻松应对增长的通话量'
            }
          },
          {
            value: 'integration',
            label: { en: 'System Integration', zh: '系统集成' },
            description: {
              en: 'Connect with existing CRM, ticketing, etc.',
              zh: '对接现有 CRM、工单系统等'
            }
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------
  // 第四部分：其他信息
  // -----------------------------------------------------
  {
    id: 'additional',
    title: {
      en: 'Additional Information',
      zh: '其他信息'
    },
    fields: [
      {
        key: 'message',
        type: 'textarea',
        label: {
          en: 'Additional Notes',
          zh: '其他需求说明'
        },
        placeholder: {
          en: 'Tell us about your specific requirements, timeline, or any questions...',
          zh: '请描述您的具体需求、时间计划或任何问题...'
        },
        required: false,
        validation: {
          maxLength: 500
        }
      },
      {
        key: 'howDidYouFindUs',
        type: 'select',
        label: {
          en: 'How did you hear about us?',
          zh: '如何知道我们？'
        },
        required: false,
        options: [
          { value: 'search', label: { en: 'Search engine', zh: '搜索引擎' } },
          { value: 'social', label: { en: 'Social media', zh: '社交媒体' } },
          { value: 'referral', label: { en: 'Friend or colleague referral', zh: '朋友或同事推荐' } },
          { value: 'conference', label: { en: 'Conference or event', zh: '会议或活动' } },
          { value: 'press', label: { en: 'News or press article', zh: '新闻或媒体报道' } },
          { value: 'other', label: { en: 'Other', zh: '其他' } }
        ]
      },
      {
        key: 'requestLiveDemo',
        type: 'radio',
        label: {
          en: 'Would you like a live demo call?',
          zh: '是否希望立即体验外呼演示？'
        },
        required: false,
        options: [
          {
            value: 'yes',
            label: { en: 'Yes, call me now!', zh: '是的，立即拨打我的电话！' },
            description: {
              en: 'We\'ll call your phone number for a live AI demo',
              zh: '我们将拨打您的电话号码进行实时 AI 演示'
            }
          },
          {
            value: 'later',
            label: { en: 'Schedule for later', zh: '稍后预约' },
            description: {
              en: 'I\'d prefer to schedule a demo call',
              zh: '我更希望预约演示通话'
            }
          },
          {
            value: 'no',
            label: { en: 'No demo needed', zh: '暂不需要' },
            description: {
              en: 'Just send me information',
              zh: '仅发送产品资料即可'
            }
          }
        ],
        defaultValue: 'later'
      }
    ]
  }
];

// =====================================================
// 个人邮箱域名黑名单
// =====================================================

export const personalEmailDomains = [
  'gmail.com',
  'yahoo.com',
  'yahoo.co.jp',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'qq.com',
  '163.com',
  '126.com',
  'sina.com',
  'sohu.com',
  'foxmail.com',
  'icloud.com',
  'me.com',
  'aol.com',
  'mail.com',
  'protonmail.com',
  'yandex.com',
  'zoho.com'
];

// =====================================================
// 验证规则
// =====================================================

export const validationRules = {
  /**
   * 工作邮箱验证
   * 禁止个人邮箱域名
   */
  workEmail: {
    validate: (email: string): boolean => {
      const domain = email.split('@')[1]?.toLowerCase();
      if (!domain) return false;
      return !personalEmailDomains.includes(domain);
    },
    errorMessage: {
      en: 'Please use your work email address. Personal emails (Gmail, Yahoo, etc.) are not accepted.',
      zh: '请使用工作邮箱。不接受 Gmail、QQ 等个人邮箱。'
    }
  },

  /**
   * 国际电话号码验证
   * 支持多种国际格式
   */
  internationalPhone: {
    validate: (phone: string): boolean => {
      // 移除所有非数字字符（保留+）
      const cleaned = phone.replace(/[^\d+]/g, '');
      // 验证格式：+开头的国际号码或纯数字
      const pattern = /^(\+?[1-9]\d{1,14}|[0-9]{10,15})$/;
      return pattern.test(cleaned);
    },
    errorMessage: {
      en: 'Please enter a valid phone number in international format (e.g., +1 555 123 4567)',
      zh: '请输入有效的电话号码（国际格式如 +86 138 1234 5678）'
    }
  }
};

// =====================================================
// 提交后流程配置
// =====================================================

export const submissionFlow = {
  // 成功页面消息
  successMessage: {
    en: {
      title: 'Thank you for your interest!',
      subtitle: 'We\'ve received your request and will be in touch within 24 hours.',
      bulletPoints: [
        'You\'ll receive a confirmation email with product information',
        'Our team will review your needs and prepare a personalized demo',
        'Expect a call or email from us within one business day'
      ]
    },
    zh: {
      title: '感谢您的关注！',
      subtitle: '我们已收到您的请求，将在 24 小时内与您联系。',
      bulletPoints: [
        '您将收到确认邮件，包含产品资料',
        '我们的团队将评估您的需求并准备个性化演示',
        '请在一个工作日内等待我们的电话或邮件'
      ]
    }
  },

  // 自动邮件配置
  autoEmail: {
    subject: {
      en: 'Your AI Voice Agent Demo Request',
      zh: '您的 AI 语音智能体演示请求'
    },
    includeAttachments: true,
    attachments: [
      '/docs/product-overview.pdf',
      '/docs/pricing-guide.pdf'
    ]
  },

  // CRM 同步配置
  crmSync: {
    enabled: true,
    platform: 'hubspot',  // 可选: 'salesforce', 'hubspot', 'zoho'
    createLead: true,
    leadSource: 'Website Get Started Form',
    assignToOwner: true,
    notifyTeam: true
  },

  // 外呼演示触发配置
  liveDemoTrigger: {
    enabled: true,
    apiEndpoint: '/api/demo/call',
    scenarios: {
      'customer-service': 'demo-customer-service',
      'sales': 'demo-sales',
      'collections': 'demo-collections',
      'appointment': 'demo-appointment',
      'survey': 'demo-survey'
    },
    defaultScenario: 'demo-customer-service',
    maxAttempts: 3,
    retryDelayMinutes: 5
  }
};

// =====================================================
// 表单提交 API 接口定义
// =====================================================

export interface LeadFormData {
  fullName: string;
  workEmail: string;
  company: string;
  jobTitle: string;
  phone: string;
  companySize: string;
  useCase: string;
  monthlyCallVolume: string;
  currentSolution: string;
  priorities: string[];
  message?: string;
  howDidYouFindUs?: string;
  requestLiveDemo?: string;
}

export interface LeadFormSubmissionResult {
  success: boolean;
  leadId?: string;
  callId?: string;      // 外呼演示 ID（如果触发）
  message: {
    en: string;
    zh: string;
  };
  nextSteps?: string[];
}

// =====================================================
// 获取表单所有字段（扁平化）
// =====================================================

export function getAllFields(): FormFieldConfig[] {
  return leadFormSections.flatMap(section => section.fields);
}

// =====================================================
// 获取必填字段列表
// =====================================================

export function getRequiredFields(): FormFieldConfig[] {
  return getAllFields().filter(field => field.required);
}

// =====================================================
// 表单初始值
// =====================================================

export function getFormInitialValues(): Record<string, string | string[]> {
  const initialValues: Record<string, string | string[]> = {};
  getAllFields().forEach(field => {
    if (field.defaultValue) {
      initialValues[field.key] = field.defaultValue;
    } else if (field.type === 'multiselect') {
      initialValues[field.key] = [];
    } else {
      initialValues[field.key] = '';
    }
  });
  return initialValues;
}