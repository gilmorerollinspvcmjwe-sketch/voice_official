/**
 * 音频 Demo 数据配置
 * 
 * 上传音频文件到 public/audio/demos/
 * 然后在此文件中配置音频信息
 */

export interface AudioDemo {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  scenario: string;       // 场景标识: customer-service, sales, collections, survey
  src: string;            // 音频文件路径: /audio/demos/[filename].mp3
  duration: string;       // 显示时长: 2:45
  thumbnail?: string;     // 场景图标路径
  description: {
    en: string;
    zh: string;
  };
  transcript?: {
    en: string;           // 对话转录文本
    zh: string;
  };
  featured?: boolean;     // 是否在首页展示
}

export const audioDemos: AudioDemo[] = [
  // =====================================================
  // 🎵 配置音频 Demo
  // 
  // 1. 将音频文件上传到: public/audio/demos/
  // 2. 在此文件中添加配置
  // =====================================================
  
  // 示例 1 - 客服场景
  {
    id: 'demo-001',
    title: {
      en: 'Customer Service Demo',
      zh: '客服咨询演示'
    },
    scenario: 'customer-service',
    src: '/audio/demos/demo-customer-service.mp3',
    duration: '2:45',
    thumbnail: '/images/scenarios/customer-service.jpg',
    description: {
      en: 'Product inquiry and order tracking scenario',
      zh: '产品咨询、订单查询场景'
    },
    featured: true
  },

  // 示例 2 - 销售场景
  {
    id: 'demo-002',
    title: {
      en: 'Sales Outbound Demo',
      zh: '销售外呼演示'
    },
    scenario: 'sales',
    src: '/audio/demos/demo-sales.mp3',
    duration: '3:12',
    thumbnail: '/images/scenarios/sales.jpg',
    description: {
      en: 'Product introduction and demo scheduling',
      zh: '产品推介、预约演示场景'
    },
    featured: true
  },

  // 示例 3 - 催收场景
  {
    id: 'demo-003',
    title: {
      en: 'Collections Demo',
      zh: '催收回款演示'
    },
    scenario: 'collections',
    src: '/audio/demos/demo-collections.mp3',
    duration: '2:30',
    thumbnail: '/images/scenarios/collections.jpg',
    description: {
      en: 'Bill reminder and payment negotiation',
      zh: '账单提醒、还款协商场景'
    },
    featured: true
  },

  // 示例 4 - 调研场景
  {
    id: 'demo-004',
    title: {
      en: 'Survey Demo',
      zh: '调研反馈演示'
    },
    scenario: 'survey',
    src: '/audio/demos/demo-survey.mp3',
    duration: '2:15',
    thumbnail: '/images/scenarios/survey.jpg',
    description: {
      en: 'Customer satisfaction survey',
      zh: '满意度调查场景'
    },
    featured: true
  },

  // =====================================================
  // 添加更多音频 Demo...
  // 
  // 音频文件要求:
  // - 格式: MP3 (推荐)
  // - 大小: < 5MB
  // - 时长: 30秒 - 5分钟
  // - 质量: 128kbps 或更高
  // - 命名: demo-[场景].mp3
  // =====================================================
];

/**
 * 场景类型定义
 */
export const scenarioTypes = {
  'customer-service': {
    label: { en: 'Customer Service', zh: '客服咨询' },
    icon: 'Headphones'
  },
  'sales': {
    label: { en: 'Sales', zh: '销售外呼' },
    icon: 'Phone'
  },
  'collections': {
    label: { en: 'Collections', zh: '催收回款' },
    icon: 'CreditCard'
  },
  'survey': {
    label: { en: 'Survey', zh: '调研反馈' },
    icon: 'Clipboard'
  },
  'appointment': {
    label: { en: 'Appointment', zh: '预约提醒' },
    icon: 'Calendar'
  }
};

/**
 * 获取首页精选 Demo
 */
export function getFeaturedDemos(): AudioDemo[] {
  return audioDemos.filter(d => d.featured);
}

/**
 * 根据场景筛选 Demo
 */
export function getDemosByScenario(scenario: string): AudioDemo[] {
  return audioDemos.filter(d => d.scenario === scenario);
}