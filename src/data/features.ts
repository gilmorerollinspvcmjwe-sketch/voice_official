/**
 * 产品功能配置 - 高端技术展示
 * 
 * 用于 /product/features 页面
 * 展示 AI 语音智能体的核心黑科技
 */

// =====================================================
// 类型定义
// =====================================================

export interface ProductFeature {
  id: string;
  category: FeatureCategory;
  
  title: {
    en: string;
    zh: string;
  };
  
  subtitle: {
    en: string;
    zh: string;
  };
  
  description: {
    en: string;
    zh: string;
  };
  
  icon: string;
  
  // 核心指标
  metrics?: FeatureMetric[];
  
  // 功能列表
  features: FeatureItem[];
  
  // Aha Moment 视频演示
  ahaMoment?: AhaMoment;
  
  // 是否为主要功能
  featured?: boolean;
}

export interface AhaMoment {
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  videoPlaceholder: string;
  beforeAfter: {
    before: {
      en: string;
      zh: string;
    };
    after: {
      en: string;
      zh: string;
    };
  };
}

export type FeatureCategory = 
  | 'human-like'        // 拟人化对话
  | 'real-time'         // 实时响应
  | 'interruption'      // 智能打断
  | 'context'           // 上下文理解
  | 'emotion'           // 情感识别
  | 'multi-turn';       // 多轮对话

export interface FeatureMetric {
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

export interface FeatureItem {
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  icon?: string;
}

// =====================================================
// 功能分类配置 - 高端技术展示
// =====================================================

export const featureCategories: FeatureCategory[] = [
  'human-like',
  'real-time',
  'interruption',
  'context',
  'emotion',
  'multi-turn'
]

// =====================================================
// 核心功能配置 - 6 大黑科技
// =====================================================

export const features: ProductFeature[] = [
  {
    id: 'human-like',
    category: 'human-like',
    title: {
      en: 'Human-Like Conversation',
      zh: '拟人化对话'
    },
    subtitle: {
      en: 'So natural, you can\'t tell it\'s AI',
      zh: '自然到听不出是 AI'
    },
    description: {
      en: 'Our AI agents use advanced neural TTS and prosody modeling to sound indistinguishable from human representatives. With 50+ voices across multiple languages and emotional ranges.',
      zh: '采用先进的神经 TTS 和韵律建模，声音与真人客服无法区分。支持 50+ 音色、多语言、多情感表达。'
    },
    icon: 'Smile',
    featured: true,
    metrics: [
      {
        value: '4.8/5.0',
        label: {
          en: 'MOS Naturalness Score',
          zh: 'MOS 自然度评分'
        },
        description: {
          en: 'Mean Opinion Score - industry standard for voice quality',
          zh: '平均意见得分 - 行业语音质量标准'
        }
      },
      {
        value: '<200ms',
        label: {
          en: 'Voice Latency',
          zh: '语音延迟'
        },
        description: {
          en: 'Time from text to natural speech output',
          zh: '从文本到自然语音输出的时间'
        }
      },
      {
        value: '50+',
        label: {
          en: 'Unique Voices',
          zh: '独特音色'
        },
        description: {
          en: 'Professional voices across 8 languages',
          zh: '覆盖 8 种语言的专业音色'
        }
      }
    ],
    features: [
      {
        title: {
          en: 'Neural TTS Engine',
          zh: '神经 TTS 引擎'
        },
        description: {
          en: 'Deep learning-based synthesis with natural intonation, rhythm, and emotional expression',
          zh: '基于深度学习的合成技术，自然语调、节奏、情感表达'
        },
        icon: 'Brain'
      },
      {
        title: {
          en: 'Voice Cloning',
          zh: '声音克隆'
        },
        description: {
          en: 'Clone your brand voice with just 10 seconds of audio sample',
          zh: '只需 10 秒音频样本即可克隆品牌专属声音'
        },
        icon: 'Copy'
      },
      {
        title: {
          en: 'Emotional Range',
          zh: '情感范围'
        },
        description: {
          en: '8 emotions: calm, happy, sad, angry, surprised, fearful, disgusted, excited',
          zh: '8 种情感：平静/开心/悲伤/愤怒/惊讶/害怕/厌恶/兴奋'
        },
        icon: 'Heart'
      },
      {
        title: {
          en: 'Accent Adaptation',
          zh: '口音自适应'
        },
        description: {
          en: 'Automatic accent adjustment based on caller region and preference',
          zh: '根据呼叫者地区和偏好自动调整口音'
        },
        icon: 'Globe'
      }
    ],
    ahaMoment: {
      title: {
        en: 'The "Wait, That\'s AI?" Moment',
        zh: '"等等，那是 AI？"时刻'
      },
      description: {
        en: 'Listen to this conversation. Can you tell which voice is AI?',
        zh: '听听这段对话。你能听出哪个声音是 AI 吗？'
      },
      videoPlaceholder: '/videos/aha-human-like.mp4',
      beforeAfter: {
        before: {
          en: 'Traditional IVR: Robotic, monotone, frustrating',
          zh: '传统 IVR：机械、单调、令人沮丧'
        },
        after: {
          en: 'Our AI: Warm, natural, empathetic, helpful',
          zh: '我们的 AI：温暖、自然、共情、乐于助人'
        }
      }
    }
  },
  {
    id: 'real-time',
    category: 'real-time',
    title: {
      en: 'Real-Time Response',
      zh: '实时响应'
    },
    subtitle: {
      en: 'Faster than a human blink',
      zh: '比人眨眼还快'
    },
    description: {
      en: 'Our streaming pipeline processes speech in parallel, not sequentially. While the user is still speaking, our AI is already formulating a response. The result? Conversations that flow naturally without awkward pauses.',
      zh: '流式并行处理架构，用户还在说话时 AI 已在组织回复。结果？对话流畅自然，没有尴尬停顿。'
    },
    icon: 'Zap',
    featured: true,
    metrics: [
      {
        value: '<300ms',
        label: {
          en: 'First Response Time',
          zh: '首次响应时间'
        },
        description: {
          en: 'From user stops speaking to AI starts responding',
          zh: '从用户停止说话到 AI 开始响应的时间'
        }
      },
      {
        value: '50ms',
        label: {
          en: 'Streaming Interval',
          zh: '流式间隔'
        },
        description: {
          en: 'New audio chunks every 50ms for smooth playback',
          zh: '每 50ms 输出新音频块，流畅播放'
        }
      },
      {
        value: '99.9%',
        label: {
          en: 'Uptime SLA',
          zh: '可用性 SLA'
        },
        description: {
          en: 'Enterprise-grade reliability with global CDN',
          zh: '企业级可靠性，全球 CDN 支持'
        }
      }
    ],
    features: [
      {
        title: {
          en: 'Streaming ASR+LLM+TTS',
          zh: '流式 ASR+LLM+TTS 管道'
        },
        description: {
          en: 'All three components stream in parallel, not waiting for each other to complete',
          zh: '三大组件并行流式处理，无需等待彼此完成'
        },
        icon: 'Pipeline'
      },
      {
        title: {
          en: 'Predictive Response',
          zh: '预测性响应'
        },
        description: {
          en: 'AI predicts user intent at 50% utterance completion and pre-generates response',
          zh: 'AI 在用户说到 50% 时预测意图并预生成响应'
        },
        icon: 'Sparkles'
      },
      {
        title: {
          en: 'Edge Computing',
          zh: '边缘计算'
        },
        description: {
          en: 'Processing happens at edge nodes closest to the caller for minimal latency',
          zh: '在离呼叫者最近的边缘节点处理，最小化延迟'
        },
        icon: 'Server'
      },
      {
        title: {
          en: 'Smart Buffering',
          zh: '智能缓冲'
        },
        description: {
          en: 'Intelligent buffering masks any remaining latency with natural filler sounds',
          zh: '智能缓冲用自然填充音掩盖任何剩余延迟'
        },
        icon: 'Layers'
      }
    ],
    ahaMoment: {
      title: {
        en: 'The "No Awkward Pause" Test',
        zh: '"没有尴尬停顿"测试'
      },
      description: {
        en: 'Notice how the AI responds instantly, just like a real person would',
        zh: '注意 AI 如何像真人一样即时响应'
      },
      videoPlaceholder: '/videos/aha-realtime.mp4',
      beforeAfter: {
        before: {
          en: 'Traditional: 2-3 second delay after each question',
          zh: '传统：每个问题后 2-3 秒延迟'
        },
        after: {
          en: 'Our AI: Instant response, conversation flows naturally',
          zh: '我们的 AI：即时响应，对话自然流畅'
        }
      }
    }
  },
  {
    id: 'interruption',
    category: 'interruption',
    title: {
      en: 'Natural Interruption',
      zh: '自然打断'
    },
    subtitle: {
      en: 'Speak anytime, the AI listens',
      zh: '随时说话，AI 都在听'
    },
    description: {
      en: 'Real conversations aren\'t turn-based. Our AI detects when you want to interrupt, gracefully stops speaking, and adapts to your new direction. It even knows the difference between a backchannel ("uh-huh") and a real interruption.',
      zh: '真实对话不是轮流说话。我们的 AI 检测你想打断时，优雅停止说话并适应新方向。甚至能区分附和（"嗯嗯"）和真正打断。'
    },
    icon: 'MessageCircle',
    featured: true,
    metrics: [
      {
        value: '<100ms',
        label: {
          en: 'Interruption Detection',
          zh: '打断检测延迟'
        },
        description: {
          en: 'Time to detect and respond to user interruption',
          zh: '检测并响应用户打断的时间'
        }
      },
      {
        value: '95%',
        label: {
          en: 'Detection Accuracy',
          zh: '检测准确率'
        },
        description: {
          en: 'Correctly identifies interruptions vs. backchannels',
          zh: '正确识别打断与附和'
        }
      },
      {
        value: '8',
        label: {
          en: 'Interruption Types',
          zh: '打断类型'
        },
        description: {
          en: 'From clarification to topic change, all handled gracefully',
          zh: '从澄清到话题切换，全部优雅处理'
        }
      }
    ],
    features: [
      {
        title: {
          en: 'Barge-In Detection',
          zh: '抢话检测'
        },
        description: {
          en: 'Immediately stops AI speech when user starts speaking',
          zh: '用户开始说话时立即停止 AI 语音'
        },
        icon: 'StopCircle'
      },
      {
        title: {
          en: 'Backchannel Recognition',
          zh: '附和识别'
        },
        description: {
          en: 'Distinguishes "uh-huh" from actual interruptions, continues when appropriate',
          zh: '区分"嗯嗯"附和与真正打断，适当时继续'
        },
        icon: 'CheckCircle2'
      },
      {
        title: {
          en: 'Graceful Recovery',
          zh: '优雅恢复'
        },
        description: {
          en: 'After interruption, smoothly resumes or pivots based on context',
          zh: '打断后根据上下文流畅恢复或切换'
        },
        icon: 'RotateCcw'
      },
      {
        title: {
          en: 'Intent Switching',
          zh: '意图切换'
        },
        description: {
          en: 'Handles mid-conversation topic changes without confusion',
          zh: '处理对话中途话题切换，不混淆'
        },
        icon: 'GitBranch'
      }
    ],
    ahaMoment: {
      title: {
        en: 'The "Let Me Interrupt" Moment',
        zh: '"让我打断一下"时刻'
      },
      description: {
        en: 'Try interrupting the AI mid-sentence. It handles it like a pro',
        zh: '试试在 AI 说话中途打断。它处理得像专业人士'
      },
      videoPlaceholder: '/videos/aha-interruption.mp4',
      beforeAfter: {
        before: {
          en: 'Traditional: Ignores interruption, keeps talking robotically',
          zh: '传统：忽略打断，继续机械说话'
        },
        after: {
          en: 'Our AI: Stops immediately, listens, adapts gracefully',
          zh: '我们的 AI：立即停止，倾听，优雅适应'
        }
      }
    }
  },
  {
    id: 'context',
    category: 'context',
    title: {
      en: 'Contextual Memory',
      zh: '上下文记忆'
    },
    subtitle: {
      en: 'Remembers everything you said',
      zh: '记得你说过的每句话'
    },
    description: {
      en: 'Our AI maintains conversation context across multiple turns, references previous information, and builds a coherent understanding of your needs. No more "Can you repeat that?"',
      zh: 'AI 在多轮对话中保持上下文，引用之前信息，建立连贯理解。不再有"能重复一遍吗？"'
    },
    icon: 'Brain',
    featured: true,
    metrics: [
      {
        value: '128K',
        label: {
          en: 'Context Window',
          zh: '上下文窗口'
        },
        description: {
          en: 'Tokens of conversation history retained',
          zh: '保留的对话历史 token 数'
        }
      },
      {
        value: '50+',
        label: {
          en: 'Turn Memory',
          zh: '轮次记忆'
        },
        description: {
          en: 'Conversation turns remembered with full context',
          zh: '完整上下文记忆的对话轮次'
        }
      },
      {
        value: '98%',
        label: {
          en: 'Reference Accuracy',
          zh: '引用准确率'
        },
        description: {
          en: 'Correctly references previous conversation points',
          zh: '正确引用之前对话要点'
        }
      }
    ],
    features: [
      {
        title: {
          en: 'Long-Term Memory',
          zh: '长期记忆'
        },
        description: {
          en: 'Remembers user preferences, history, and past interactions across sessions',
          zh: '记住用户偏好、历史、过往互动，跨会话'
        },
        icon: 'Database'
      },
      {
        title: {
          en: 'Entity Tracking',
          zh: '实体追踪'
        },
        description: {
          en: 'Tracks names, dates, numbers, and relationships mentioned in conversation',
          zh: '追踪对话中提到的姓名、日期、数字、关系'
        },
        icon: 'Link'
      },
      {
        title: {
          en: 'Coreference Resolution',
          zh: '共指消解'
        },
        description: {
          en: 'Understands "he", "she", "it", "that" refer to previously mentioned entities',
          zh: '理解"他""她""它""那个"指代之前提到的实体'
        },
        icon: 'Focus'
      },
      {
        title: {
          en: 'Contextual Follow-up',
          zh: '上下文追问'
        },
        description: {
          en: 'Handles follow-up questions that rely on previous context',
          zh: '处理依赖之前上下文的追问'
        },
        icon: 'MessageSquarePlus'
      }
    ],
    ahaMoment: {
      title: {
        en: 'The "You Remembered!" Moment',
        zh: '"你记住了！"时刻'
      },
      description: {
        en: 'The AI remembers details from 20 turns ago and references them naturally',
        zh: 'AI 记住 20 轮前的细节并自然引用'
      },
      videoPlaceholder: '/videos/aha-context.mp4',
      beforeAfter: {
        before: {
          en: 'Traditional: "I don\'t have context. Can you repeat?"',
          zh: '传统："我没有上下文。能重复一遍吗？"'
        },
        after: {
          en: 'Our AI: "As you mentioned earlier about John\'s appointment..."',
          zh: '我们的 AI："正如您之前提到约翰的预约..."'
        }
      }
    }
  },
  {
    id: 'emotion',
    category: 'emotion',
    title: {
      en: 'Emotional Intelligence',
      zh: '情感智能'
    },
    subtitle: {
      en: 'Understands how you feel',
      zh: '理解你的感受'
    },
    description: {
      en: 'Our AI detects user sentiment in real-time and adapts tone, pace, and content accordingly. Frustrated? It becomes more empathetic. Happy? It matches your energy. Angry? It knows when to escalate to human.',
      zh: 'AI 实时检测用户情绪并调整语气、节奏、内容。沮丧？更共情。开心？匹配你的能量。生气？知道何时转人工。'
    },
    icon: 'Heart',
    featured: true,
    metrics: [
      {
        value: '8',
        label: {
          en: 'Emotion Categories',
          zh: '情感类别'
        },
        description: {
          en: 'Detects: calm, happy, sad, angry, surprised, fearful, disgusted, excited',
          zh: '检测：平静/开心/悲伤/愤怒/惊讶/害怕/厌恶/兴奋'
        }
      },
      {
        value: '92%',
        label: {
          en: 'Sentiment Accuracy',
          zh: '情感准确率'
        },
        description: {
          en: 'Correctly identifies user emotional state',
          zh: '正确识别用户情绪状态'
        }
      },
      {
        value: '<500ms',
        label: {
          en: 'Adaptation Time',
          zh: '适应时间'
        },
        description: {
          en: 'Time to adjust tone and response based on detected emotion',
          zh: '根据检测情绪调整语气和响应的时间'
        }
      }
    ],
    features: [
      {
        title: {
          en: 'Real-Time Sentiment Analysis',
          zh: '实时情感分析'
        },
        description: {
          en: 'Analyzes voice tone, word choice, and speech patterns to detect emotion',
          zh: '分析语音语调、用词、说话模式检测情绪'
        },
        icon: 'Activity'
      },
      {
        title: {
          en: 'Adaptive Tone',
          zh: '自适应语气'
        },
        description: {
          en: 'Automatically adjusts AI tone to match or complement user emotion',
          zh: '自动调整 AI 语气匹配或补充用户情绪'
        },
        icon: 'Sliders'
      },
      {
        title: {
          en: 'Empathy Responses',
          zh: '共情响应'
        },
        description: {
          en: 'Generates empathetic responses when user is frustrated or upset',
          zh: '用户沮丧或不安时生成共情响应'
        },
        icon: 'HandHeart'
      },
      {
        title: {
          en: 'Escalation Detection',
          zh: '升级检测'
        },
        description: {
          en: 'Recognizes when to transfer to human agent based on emotional state',
          zh: '根据情绪状态识别何时转人工'
        },
        icon: 'TriangleAlert'
      }
    ],
    ahaMoment: {
      title: {
        en: 'The "It Gets Me" Moment',
        zh: '"它懂我"时刻'
      },
      description: {
        en: 'The AI detects frustration and responds with genuine empathy',
        zh: 'AI 检测沮丧并用真诚共情响应'
      },
      videoPlaceholder: '/videos/aha-emotion.mp4',
      beforeAfter: {
        before: {
          en: 'Traditional: Continues robotic script regardless of user frustration',
          zh: '传统：不管用户多沮丧，继续机械脚本'
        },
        after: {
          en: 'Our AI: "I understand this is frustrating. Let me help you right away."',
          zh: '我们的 AI："我理解这很令人沮丧。让我立即帮助您。"'
        }
      }
    }
  },
  {
    id: 'multi-turn',
    category: 'multi-turn',
    title: {
      en: 'Multi-Turn Mastery',
      zh: '多轮对话掌控'
    },
    subtitle: {
      en: 'Handles complex conversations',
      zh: '处理复杂对话'
    },
    description: {
      en: 'From simple Q&A to complex multi-step tasks, our AI navigates intricate conversations with ease. It asks clarifying questions, confirms understanding, and guides users to completion without getting lost.',
      zh: '从简单问答到复杂多步任务，AI 轻松驾驭复杂对话。它会问澄清问题、确认理解、引导用户完成，不会迷失。'
    },
    icon: 'GitMerge',
    featured: true,
    metrics: [
      {
        value: '50+',
        label: {
          en: 'Concurrent Conversations',
          zh: '并发对话数'
        },
        description: {
          en: 'Maintains full context for each independent conversation',
          zh: '为每个独立对话保持完整上下文'
        }
      },
      {
        value: '95%',
        label: {
          en: 'Task Completion Rate',
          zh: '任务完成率'
        },
        description: {
          en: 'Successfully guides users to complete complex multi-step tasks',
          zh: '成功引导用户完成复杂多步任务'
        }
      },
      {
        value: '3',
        label: {
          en: 'Average Turns to Completion',
          zh: '平均完成轮次'
        },
        description: {
          en: 'Efficient conversation flow minimizes back-and-forth',
          zh: '高效对话流程最小化来回次数'
        }
      }
    ],
    features: [
      {
        title: {
          en: 'Goal-Oriented Dialogue',
          zh: '目标导向对话'
        },
        description: {
          en: 'Maintains conversation goal and guides user systematically to completion',
          zh: '保持对话目标，系统引导用户完成'
        },
        icon: 'Target'
      },
      {
        title: {
          en: 'Clarification Questions',
          zh: '澄清问题'
        },
        description: {
          en: 'Asks smart clarifying questions when user input is ambiguous',
          zh: '用户输入模糊时问智能澄清问题'
        },
        icon: 'CircleHelp'
      },
      {
        title: {
          en: 'Progress Tracking',
          zh: '进度追踪'
        },
        description: {
          en: 'Tracks progress through multi-step tasks and confirms each step',
          zh: '追踪多步任务进度，确认每步'
        },
        icon: 'ListChecks'
      },
      {
        title: {
          en: 'Recovery Strategies',
          zh: '恢复策略'
        },
        description: {
          en: 'Handles misunderstandings and gracefully recovers conversation flow',
          zh: '处理误解并优雅恢复对话流程'
        },
        icon: 'LifeBuoy'
      }
    ],
    ahaMoment: {
      title: {
        en: 'The "It Knows What I Want" Moment',
        zh: '"它知道我想要什么"时刻'
      },
      description: {
        en: 'The AI guides a complex 10-step booking process without any confusion',
        zh: 'AI 引导复杂 10 步预订流程，毫无混淆'
      },
      videoPlaceholder: '/videos/aha-multi-turn.mp4',
      beforeAfter: {
        before: {
          en: 'Traditional: Gets lost after 2-3 turns, asks for repeat',
          zh: '传统：2-3 轮后迷失，要求重复'
        },
        after: {
          en: 'Our AI: Completes 10+ step tasks smoothly, confirms each step',
          zh: '我们的 AI：流畅完成 10+ 步任务，确认每步'
        }
      }
    }
  }
]

// =====================================================
// 导出
// =====================================================

export default {
  features,
  featureCategories
}
