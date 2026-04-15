/**
 * TTS 应用场景数据配置
 * 
 * 场景图片位置: public/images/scenarios/
 */

export interface TTSScenario {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  image: string;            // 场景图片路径
  description: {
    en: string;
    zh: string;
  };
  recommendedVoices: string[];  // 推荐音色 ID
  features: {
    en: string[];
    zh: string[];
  };
  stats?: {
    label: string;
    value: string;
  }[];
}

export const ttsScenarios: TTSScenario[] = [
  {
    id: 'customer-service',
    title: {
      en: 'Customer Service',
      zh: '客服咨询'
    },
    image: '/images/scenarios/customer-service.jpg',
    description: {
      en: 'Warm and friendly voice to enhance customer experience',
      zh: '温柔亲切的声音，提升客户体验'
    },
    recommendedVoices: ['xiaoya', 'mingyu', 'emma', 'sarah'],
    features: {
      en: [
        'Instant response to inquiries',
        '24/7 availability',
        'Multi-language support',
        'Consistent service quality'
      ],
      zh: [
        '即时响应客户咨询',
        '全天候在线服务',
        '多语言无缝支持',
        '服务质量稳定一致'
      ]
    },
    stats: [
      { label: '响应速度', value: '<1s' },
      { label: '客户满意度', value: '95%+' },
      { label: '成本降低', value: '60%' }
    ]
  },

  {
    id: 'sales',
    title: {
      en: 'Sales Outbound',
      zh: '销售外呼'
    },
    image: '/images/scenarios/sales.jpg',
    description: {
      en: 'Professional and confident voice to build trust',
      zh: '专业自信的声音，增强信任感'
    },
    recommendedVoices: ['james', 'emma', 'mingyu', 'xiaolin'],
    features: {
      en: [
        'Natural conversation flow',
        'Intelligent objection handling',
        'Personalized recommendations',
        'Lead qualification'
      ],
      zh: [
        '自然流畅对话',
        '智能异议处理',
        '个性化推荐',
        '意向智能筛选'
      ]
    },
    stats: [
      { label: '外呼效率', value: '10x' },
      { label: '意向筛选', value: '85%' },
      { label: '转化提升', value: '30%' }
    ]
  },

  {
    id: 'podcast',
    title: {
      en: 'Podcast Broadcasting',
      zh: '播客播报'
    },
    image: '/images/scenarios/podcast.jpg',
    description: {
      en: 'Intellectual and elegant voice to attract listeners',
      zh: '知性优雅的声音，吸引听众'
    },
    recommendedVoices: ['emma', 'sakura', 'narrator', 'david'],
    features: {
      en: [
        'Clear pronunciation',
        'Engaging tone',
        'Topic flexibility',
        'Multi-episode consistency'
      ],
      zh: [
        '清晰标准发音',
        '引人入胜语调',
        '话题灵活切换',
        '多期节目一致性'
      ]
    },
    stats: [
      { label: '听众留存', value: '40%+' },
      { label: '制作效率', value: '5x' },
      { label: '成本节省', value: '80%' }
    ]
  },

  {
    id: 'audiobook',
    title: {
      en: 'Audiobook Narration',
      zh: '有声书'
    },
    image: '/images/scenarios/audiobook.jpg',
    description: {
      en: 'Expressive and emotional voice for rich storytelling',
      zh: '富有表现力的声音，情感丰富'
    },
    recommendedVoices: ['james', 'mingzhe', 'storyteller', 'david'],
    features: {
      en: [
        'Character voice variety',
        'Emotional depth',
        'Chapter consistency',
        'Genre flexibility'
      ],
      zh: [
        '角色音色多样',
        '情感深度表达',
        '章节音色一致',
        '题材灵活适配'
      ]
    },
    stats: [
      { label: '制作速度', value: '100x' },
      { label: '自然度 MOS', value: '4.8' },
      { label: '听众好评', value: '92%' }
    ]
  },

  {
    id: 'education',
    title: {
      en: 'Educational Content',
      zh: '教育课件'
    },
    image: '/images/scenarios/education.jpg',
    description: {
      en: 'Clear and standard voice for easy understanding',
      zh: '清晰标准的声音，易于理解'
    },
    recommendedVoices: ['xiaoya', 'emma', 'xiaolin', 'xiaotian'],
    features: {
      en: [
        'Age-appropriate tone',
        'Subject expertise',
        'Multi-grade support',
        'Interactive elements'
      ],
      zh: [
        '适龄语调调整',
        '学科专业表达',
        '多年级适配',
        '交互式元素'
      ]
    },
    stats: [
      { label: '学习效率', value: '25%+' },
      { label: '学生参与', value: '60%+' },
      { label: '制作成本', value: '-70%' }
    ]
  },

  {
    id: 'game-npc',
    title: {
      en: 'Game NPCs',
      zh: '游戏 NPC'
    },
    image: '/images/scenarios/game-npc.jpg',
    description: {
      en: 'Diverse voices matching character settings',
      zh: '多样化声音，符合角色设定'
    },
    recommendedVoices: ['sakura', 'james', 'xiaoyun', 'haruto'],
    features: {
      en: [
        'Character-specific voice',
        'Emotional range',
        'Dynamic responses',
        'Multi-language NPCs'
      ],
      zh: [
        '角色专属音色',
        '情感范围广',
        '动态响应',
        '多语言 NPC'
      ]
    },
    stats: [
      { label: '玩家沉浸', value: '50%+' },
      { label: '对话选项', value: '∞' },
      { label: '开发效率', value: '10x' }
    ]
  }
];

/**
 * 获取场景详情
 */
export function getScenarioById(id: string): TTSScenario | undefined {
  return ttsScenarios.find(s => s.id === id);
}