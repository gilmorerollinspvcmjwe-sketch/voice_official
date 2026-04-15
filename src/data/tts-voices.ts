/**
 * TTS 音色数据配置
 * 
 * 音色配置文件 - 支持扩展到 50+ 音色
 * 音频样本位置: public/audio/tts/
 * 真人形象位置: public/images/avatars/
 */

export interface AIVoice {
  id: string;
  name: string;              // 音色名称
  avatar: string;            // 逼真真人图片 URL
  gender: 'female' | 'male';
  ageRange: string;          // 年龄段: 20s/30s/40s/50s+
  style: string;             // 风格
  language: string[];        // 支持语言
  audioSample: string;       // 试听音频 URL
  script: string;            // 试听文案
  duration: number;          // 时长（秒）
  scenarios: string[];       // 适用场景
  emotion: string[];         // 支持情感
  popular?: boolean;         // 是否热门推荐
  description?: {
    en: string;
    zh: string;
  };
}

export const voiceGallery: AIVoice[] = [
  // =====================================================
  // 中文女声
  // =====================================================
  
  {
    id: 'xiaoya',
    name: '小雅',
    avatar: '/images/avatars/xiaoya.jpg',
    gender: 'female',
    ageRange: '25-30',
    style: '温柔亲切',
    language: ['zh-CN', 'en-US'],
    audioSample: '/audio/tts/xiaoya-demo.mp3',
    script: '您好，欢迎致电客户服务中心，我是智能客服助手。请问今天有什么可以帮您的？无论是账单查询还是业务办理，我都会全程为您跟进处理。',
    duration: 15,
    scenarios: ['客服', '前台', '导购'],
    emotion: ['平静', '开心', '关心'],
    popular: true,
    description: {
      en: 'Warm and friendly female voice, perfect for customer service',
      zh: '温柔亲切的女声，适合客服、前台等场景'
    }
  },
  
  {
    id: 'xiaoyun',
    name: '小云',
    avatar: '/images/avatars/xiaoyun.jpg',
    gender: 'female',
    ageRange: '20-25',
    style: '活泼可爱',
    language: ['zh-CN', 'ja-JP'],
    audioSample: '/audio/tts/xiaoyun-demo.mp3',
    script: '欢迎致电！感谢您的耐心等待，我是您的专属服务助手。今天为您推荐我们最新上线的优惠活动，办理业务还可以享受专属折扣哦！',
    duration: 15,
    scenarios: ['电商', '导购', '游戏'],
    emotion: ['开心', '兴奋', '可爱'],
    description: {
      en: 'Lively and cute young female voice',
      zh: '活泼可爱的年轻女声'
    }
  },
  
  {
    id: 'xiaolin',
    name: '小琳',
    avatar: '/images/avatars/xiaolin.jpg',
    gender: 'female',
    ageRange: '30-35',
    style: '知性优雅',
    language: ['zh-CN', 'en-US'],
    audioSample: '/audio/tts/xiaolin-demo.mp3',
    script: '欢迎致电，感谢您的支持。关于您咨询的业务方案，我为您整理了一份详细说明。接下来我将为您逐一介绍各项服务内容和办理方式。',
    duration: 15,
    scenarios: ['商务', '教育', '播客'],
    emotion: ['平静', '专业', '自信'],
    popular: true,
    description: {
      en: 'Intellectual and elegant female voice, perfect for business',
      zh: '知性优雅的女声，适合商务场景'
    }
  },
  
  {
    id: 'xiaofei',
    name: '小菲',
    avatar: '/images/avatars/xiaofei.jpg',
    gender: 'female',
    ageRange: '35-40',
    style: '成熟稳重',
    language: ['zh-CN'],
    audioSample: '/audio/tts/xiaofei-demo.mp3',
    script: '您好，经系统核实，您的账户当前余额为人民币十二万三千元，本月收益增长百分之二点一。整体表现稳健，建议您关注我们新推出的理财产品。',
    duration: 15,
    scenarios: ['金融', '客服', '咨询'],
    emotion: ['平静', '专业', '认真'],
    description: {
      en: 'Mature and composed female voice',
      zh: '成熟稳重的女声'
    }
  },

  // =====================================================
  // 中文男声
  // =====================================================
  
  {
    id: 'mingyu',
    name: '明宇',
    avatar: '/images/avatars/mingyu.jpg',
    gender: 'male',
    ageRange: '30-35',
    style: '专业沉稳',
    language: ['zh-CN', 'en-US'],
    audioSample: '/audio/tts/mingyu-demo.mp3',
    script: '感谢您致电我们的客户服务热线。我们致力于为您提供最优质的技术支持，如需办理业务或咨询问题，请随时告知，我将竭诚为您服务。',
    duration: 15,
    scenarios: ['客服', '播报', '商务'],
    emotion: ['平静', '专业', '自信'],
    popular: true,
    description: {
      en: 'Professional and steady male voice',
      zh: '专业沉稳的男声'
    }
  },
  
  {
    id: 'minghao',
    name: '明浩',
    avatar: '/images/avatars/minghao.jpg',
    gender: 'male',
    ageRange: '25-30',
    style: '阳光活力',
    language: ['zh-CN', 'en-US'],
    audioSample: '/audio/tts/minghao-demo.mp3',
    script: '您好！欢迎致电！我是您的服务助手，很高兴为您服务。今天有全新的会员权益和限时优惠，让我为您介绍一下吧，保证不会让您失望！',
    duration: 15,
    scenarios: ['游戏', '教育', '导购'],
    emotion: ['开心', '兴奋', '热情'],
    description: {
      en: 'Sunny and energetic young male voice',
      zh: '阳光活力的年轻男声'
    }
  },
  
  {
    id: 'mingzhe',
    name: '明哲',
    avatar: '/images/avatars/mingzhe.jpg',
    gender: 'male',
    ageRange: '40-50',
    style: '深沉磁性',
    language: ['zh-CN', 'en-US'],
    audioSample: '/audio/tts/mingzhe-demo.mp3',
    script: '欢迎使用智能语音服务。接下来为您播报今日重要通知：根据您的服务等级，系统已为您匹配专属优惠方案，详情将在稍后为您详细说明。',
    duration: 15,
    scenarios: ['有声书', '播客', '新闻'],
    emotion: ['平静', '深沉', '权威'],
    popular: true,
    description: {
      en: 'Deep and magnetic male voice, perfect for audiobooks',
      zh: '深沉磁性的男声，适合有声书'
    }
  },
  
  {
    id: 'mingwei',
    name: '明威',
    avatar: '/images/avatars/mingwei.jpg',
    gender: 'male',
    ageRange: '35-40',
    style: '权威可信',
    language: ['zh-CN'],
    audioSample: '/audio/tts/mingwei-demo.mp3',
    script: '您好，关于您的服务申请，经审核需要补充以下材料：身份证明文件、银行账户信息以及近期交易记录。准备好后请随时联系我们的服务专员。',
    duration: 15,
    scenarios: ['金融', '政务', '法律'],
    emotion: ['平静', '权威', '专业'],
    description: {
      en: 'Authoritative and trustworthy male voice',
      zh: '权威可信的男声'
    }
  },

  // =====================================================
  // 英文女声
  // =====================================================
  
  {
    id: 'emma',
    name: 'Emma',
    avatar: '/images/avatars/emma.jpg',
    gender: 'female',
    ageRange: '28-32',
    style: '知性优雅',
    language: ['en-US', 'en-GB', 'zh-CN'],
    audioSample: '/audio/tts/emma-demo.mp3',
    script: 'Thank you for calling our customer service center. I\'m your virtual assistant, and I\'ll be happy to help you today. Whether you need account support or have questions, I\'m here for you.',
    duration: 15,
    scenarios: ['客服', '商务', '教育'],
    emotion: ['平静', '友好', '专业'],
    popular: true,
    description: {
      en: 'Intellectual and elegant English female voice',
      zh: '知性优雅的英文女声'
    }
  },
  
  {
    id: 'sarah',
    name: 'Sarah',
    avatar: '/images/avatars/sarah.jpg',
    gender: 'female',
    ageRange: '25-30',
    style: '温柔甜美',
    language: ['en-US'],
    audioSample: '/audio/tts/sarah-demo.mp3',
    script: 'Welcome back! I\'m glad to have you with us today. We\'ve prepared some exciting offers just for you. Let me walk you through the benefits and help you find the best plan for your needs.',
    duration: 15,
    scenarios: ['客服', '导购', '教育'],
    emotion: ['开心', '友好', '热情'],
    description: {
      en: 'Warm and sweet English female voice',
      zh: '温柔甜美的英文女声'
    }
  },
  
  {
    id: 'lisa',
    name: 'Lisa',
    avatar: '/images/avatars/lisa.jpg',
    gender: 'female',
    ageRange: '20-25',
    style: '活泼开朗',
    language: ['en-US', 'en-GB'],
    audioSample: '/audio/tts/lisa-demo.mp3',
    script: 'Hi there! Thank you for choosing our service! I have some great news about your account eligibility. You\'ve been selected for exclusive rewards and premium benefits. Let me share the details with you.',
    duration: 15,
    scenarios: ['电商', '导购', '游戏'],
    emotion: ['开心', '兴奋', '活泼'],
    description: {
      en: 'Lively and cheerful young English female voice',
      zh: '活泼开朗的年轻英文女声'
    }
  },
  
  {
    id: 'olivia',
    name: 'Olivia',
    avatar: '/images/avatars/olivia.jpg',
    gender: 'female',
    ageRange: '35-40',
    style: '成熟知性',
    language: ['en-GB', 'en-US'],
    audioSample: '/audio/tts/olivia-demo.mp3',
    script: 'Welcome to our private banking service line. I\'m your dedicated virtual advisor with extensive experience in wealth management. Let me review your portfolio and recommend the best strategies for your goals.',
    duration: 15,
    scenarios: ['金融', '商务', '咨询'],
    emotion: ['平静', '专业', '自信'],
    description: {
      en: 'Mature and sophisticated British female voice',
      zh: '成熟知性的英式女声'
    }
  },

  // =====================================================
  // 英文男声
  // =====================================================
  
  {
    id: 'james',
    name: 'James',
    avatar: '/images/avatars/james.jpg',
    gender: 'male',
    ageRange: '35-40',
    style: '成熟磁性',
    language: ['en-US', 'en-GB', 'zh-CN'],
    audioSample: '/audio/tts/james-demo.mp3',
    script: 'Thank you for contacting our support team. I\'m your virtual service assistant, and I\'m here to ensure your experience is seamless. Please allow me to assist you with your inquiry or account needs today.',
    duration: 15,
    scenarios: ['商务', '播客', '有声书'],
    emotion: ['平静', '自信', '权威'],
    popular: true,
    description: {
      en: 'Mature and magnetic English male voice',
      zh: '成熟磁性的英文男声'
    }
  },
  
  {
    id: 'alex',
    name: 'Alex',
    avatar: '/images/avatars/alex.jpg',
    gender: 'male',
    ageRange: '25-30',
    style: '年轻活力',
    language: ['en-US'],
    audioSample: '/audio/tts/alex-demo.mp3',
    script: 'Hey! Thanks for calling in today! I\'ve got some really exciting updates for you about your membership status. You\'ve unlocked new perks and we have limited-time offers I\'d love to share with you!',
    duration: 15,
    scenarios: ['游戏', '教育', '导购'],
    emotion: ['开心', '热情', '活力'],
    description: {
      en: 'Young and energetic English male voice',
      zh: '年轻活力的英文男声'
    }
  },
  
  {
    id: 'david',
    name: 'David',
    avatar: '/images/avatars/david.jpg',
    gender: 'male',
    ageRange: '40-50',
    style: '深沉稳重',
    language: ['en-GB', 'en-US'],
    audioSample: '/audio/tts/david-demo.mp3',
    script: 'Good evening, this is your automated service notification. We are writing to inform you about important updates to your account terms and conditions. Please review the following details at your earliest convenience.',
    duration: 15,
    scenarios: ['有声书', '播客', '教育'],
    emotion: ['平静', '深沉', '专业'],
    popular: true,
    description: {
      en: 'Deep and steady British male voice, perfect for narration',
      zh: '深沉稳重的英式男声，适合朗读'
    }
  },
  
  {
    id: 'michael',
    name: 'Michael',
    avatar: '/images/avatars/michael.jpg',
    gender: 'male',
    ageRange: '30-35',
    style: '专业可信',
    language: ['en-US', 'en-GB'],
    audioSample: '/audio/tts/michael-demo.mp3',
    script: 'Thank you for reaching out to our technical support. Your service request has been logged under priority code four zero two. Our team will investigate and provide a resolution within twenty four hours.',
    duration: 15,
    scenarios: ['客服', '金融', '商务'],
    emotion: ['平静', '专业', '认真'],
    description: {
      en: 'Professional and trustworthy English male voice',
      zh: '专业可信的英文男声'
    }
  },

  // =====================================================
  // 日文音色
  // =====================================================
  
  {
    id: 'sakura',
    name: 'Sakura',
    avatar: '/images/avatars/sakura.jpg',
    gender: 'female',
    ageRange: '20-25',
    style: '活泼可爱',
    language: ['ja-JP', 'zh-CN', 'en-US'],
    audioSample: '/audio/tts/sakura-demo.mp3',
    script: 'こんにちは！お電話ありがとうございます。私はお客様の担当アシスタントです。本日はお得なキャンペーンのご案内がございます。ぜひ最後までお聞きくださいませ！',
    duration: 15,
    scenarios: ['客服', '游戏', '动漫'],
    emotion: ['开心', '兴奋', '可爱'],
    popular: true,
    description: {
      en: 'Lively and cute Japanese female voice',
      zh: '活泼可爱的日文女声'
    }
  },
  
  {
    id: 'yuki',
    name: 'Yuki',
    avatar: '/images/avatars/yuki.jpg',
    gender: 'female',
    ageRange: '25-30',
    style: '温柔优雅',
    language: ['ja-JP', 'en-US'],
    audioSample: '/audio/tts/yuki-demo.mp3',
    script: 'ご利用ありがとうございます。お客様のアカウント情報を確認させていただきました。本日は新しいサービスプランのご案内と、お客様向け特典についてご説明いたします。',
    duration: 15,
    scenarios: ['客服', '商务', '教育'],
    emotion: ['平静', '友好', '温柔'],
    description: {
      en: 'Warm and elegant Japanese female voice',
      zh: '温柔优雅的日文女声'
    }
  },
  
  {
    id: 'kenji',
    name: 'Kenji',
    avatar: '/images/avatars/kenji.jpg',
    gender: 'male',
    ageRange: '30-35',
    style: '专业沉稳',
    language: ['ja-JP', 'en-US'],
    audioSample: '/audio/tts/kenji-demo.mp3',
    script: 'お客様、お電話ありがとうございます。ケンジと申します。本日のサービス状況につきましてご報告いたします。詳細を順にご案内させていただきますので、よろしくお願いいたします。',
    duration: 15,
    scenarios: ['客服', '商务', '播报'],
    emotion: ['平静', '专业', '自信'],
    description: {
      en: 'Professional and steady Japanese male voice',
      zh: '专业沉稳的日文男声'
    }
  },
  
  {
    id: 'haruto',
    name: 'Haruto',
    avatar: '/images/avatars/haruto.jpg',
    gender: 'male',
    ageRange: '20-25',
    style: '阳光活力',
    language: ['ja-JP'],
    audioSample: '/audio/tts/haruto-demo.mp3',
    script: 'こんにちは！ハルトと申します！今日はお客様のアカウントに素敵な特典が追加されました！限定オファーやポイント還元など、嬉しいニュースがいっぱいありますのでお聞きください！',
    duration: 15,
    scenarios: ['游戏', '导购', '教育'],
    emotion: ['开心', '热情', '活力'],
    description: {
      en: 'Sunny and energetic young Japanese male voice',
      zh: '阳光活力的年轻日文男声'
    }
  },

  // =====================================================
  // 韩文音色
  // =====================================================
  
  {
    id: 'soyeon',
    name: 'Soyeon',
    avatar: '/images/avatars/soyeon.jpg',
    gender: 'female',
    ageRange: '25-30',
    style: '温柔亲切',
    language: ['ko-KR', 'en-US'],
    audioSample: '/audio/tts/soyeon-demo.mp3',
    script: '안녕하세요! 전화해 주셔서 감사합니다. 저는 고객 서비스 담당입니다. 오늘은 고객님의 계정에 맞는 특별한 혜택을 안내해 드리려고 합니다. 자세히 말씀드릴게요.',
    duration: 15,
    scenarios: ['客服', '导购', '教育'],
    emotion: ['平静', '友好', '温柔'],
    description: {
      en: 'Warm and friendly Korean female voice',
      zh: '温柔亲切的韩文女声'
    }
  },
  
  {
    id: 'minho',
    name: 'Minho',
    avatar: '/images/avatars/minho.jpg',
    gender: 'male',
    ageRange: '30-35',
    style: '专业沉稳',
    language: ['ko-KR', 'en-US'],
    audioSample: '/audio/tts/minho-demo.mp3',
    script: '고객 여러분, 안녕하세요. 민호와 함께 서비스 안내를 도와드리겠습니다. 고객님의 서비스 이용 현황과 새로운 혜택에 대해 자세히 알려드리겠습니다. 감사합니다.',
    duration: 15,
    scenarios: ['客服', '商务', '播报'],
    emotion: ['平静', '专业', '自信'],
    description: {
      en: 'Professional and steady Korean male voice',
      zh: '专业沉稳的韩文男声'
    }
  },

  // =====================================================
  // 多语言专业音色
  // =====================================================
  
  {
    id: 'maria',
    name: 'Maria',
    avatar: '/images/avatars/maria.jpg',
    gender: 'female',
    ageRange: '30-35',
    style: '知性优雅',
    language: ['es-ES', 'en-US', 'pt-BR'],
    audioSample: '/audio/tts/maria-demo.mp3',
    script: 'Gracias por llamar a nuestro servicio de atención al cliente. Soy su asistente virtual. Hoy tengo información importante sobre su cuenta y beneficios exclusivos que me gustaría compartir con usted.',
    duration: 15,
    scenarios: ['客服', '商务', '教育'],
    emotion: ['平静', '友好', '专业'],
    description: {
      en: 'Intellectual Spanish female voice',
      zh: '知性优雅的西班牙语女声'
    }
  },
  
  {
    id: 'pierre',
    name: 'Pierre',
    avatar: '/images/avatars/pierre.jpg',
    gender: 'male',
    ageRange: '35-40',
    style: '深沉磁性',
    language: ['fr-FR', 'en-US'],
    audioSample: '/audio/tts/pierre-demo.mp3',
    script: 'Bonjour et merci de nous contacter. Je suis votre assistant virtuel. Je vais vous présenter les dernières mises à jour de votre compte et vous proposer des solutions adaptées à vos besoins.',
    duration: 15,
    scenarios: ['商务', '有声书', '播客'],
    emotion: ['平静', '深沉', '优雅'],
    description: {
      en: 'Deep and magnetic French male voice',
      zh: '深沉磁性的法语男声'
    }
  },
  
  {
    id: 'anna',
    name: 'Anna',
    avatar: '/images/avatars/anna.jpg',
    gender: 'female',
    ageRange: '25-30',
    style: '温柔亲切',
    language: ['de-DE', 'en-US'],
    audioSample: '/audio/tts/anna-demo.mp3',
    script: 'Guten Tag! Vielen Dank für Ihren Anruf. Ich bin Ihr virtueller Assistent. Heute möchte ich Ihnen wichtige Informationen zu Ihrem Konto und unseren neuesten Angeboten mitteilen.',
    duration: 15,
    scenarios: ['客服', '商务', '教育'],
    emotion: ['平静', '友好', '温柔'],
    description: {
      en: 'Warm German female voice',
      zh: '温柔亲切的德语女声'
    }
  },

  // =====================================================
  // 更多音色可继续添加...
  // =====================================================
];

/**
 * 语言代码映射
 */
export const languageMap: Record<string, { label: string; flag: string }> = {
  'zh-CN': { label: '中文', flag: '🇨🇳' },
  'en-US': { label: 'English (US)', flag: '🇺🇸' },
  'en-GB': { label: 'English (UK)', flag: '🇬🇧' },
  'ja-JP': { label: '日本語', flag: '🇯🇵' },
  'ko-KR': { label: '한국어', flag: '🇰🇷' },
  'es-ES': { label: 'Español', flag: '🇪🇸' },
  'pt-BR': { label: 'Português', flag: '🇧🇷' },
  'fr-FR': { label: 'Français', flag: '🇫🇷' },
  'de-DE': { label: 'Deutsch', flag: '🇩🇪' },
  'it-IT': { label: 'Italiano', flag: '🇮🇹' },
  'ru-RU': { label: 'Русский', flag: '🇷🇺' },
  'ar-SA': { label: 'العربية', flag: '🇸🇦' },
  'hi-IN': { label: 'हिन्दी', flag: '🇮🇳' },
  'th-TH': { label: 'ไทย', flag: '🇹🇭' },
  'vi-VN': { label: 'Tiếng Việt', flag: '🇻🇳' },
};

/**
 * 风格类型
 */
export const styleTypes = [
  '温柔亲切',
  '专业沉稳',
  '活泼可爱',
  '成熟磁性',
  '知性优雅',
  '深沉稳重',
  '阳光活力',
  '权威可信',

];

/**
 * 场景类型
 */
export const scenarioTypes = [
  '客服',
  '销售',

  '教育',

  '金融',
  '商务',
  '导购',
  '新闻',

];

/**
 * 情感类型
 */
export const emotionTypes = [
  '平静',
  '开心',
  '悲伤',
  '愤怒',
  '惊讶',
  '害怕',
  '厌恶',
  '期待',
  '关心',
  '兴奋',
  '专业',
  '自信',
  '热情',
  '温柔',
  '深沉',
  '权威',
];

/**
 * 获取热门音色
 */
export function getPopularVoices(): AIVoice[] {
  return voiceGallery.filter(v => v.popular);
}

/**
 * 根据筛选条件获取音色
 */
export function filterVoices(filters: {
  gender?: 'all' | 'female' | 'male';
  ageRange?: string;
  language?: string;
  style?: string;
  scenario?: string;
}): AIVoice[] {
  return voiceGallery.filter(voice => {
    if (filters.gender && filters.gender !== 'all' && voice.gender !== filters.gender) {
      return false;
    }
    if (filters.ageRange && filters.ageRange !== 'all' && !voice.ageRange.includes(filters.ageRange)) {
      return false;
    }
    if (filters.language && filters.language !== 'all' && !voice.language.includes(filters.language)) {
      return false;
    }
    if (filters.style && filters.style !== 'all' && voice.style !== filters.style) {
      return false;
    }
    if (filters.scenario && filters.scenario !== 'all' && !voice.scenarios.includes(filters.scenario)) {
      return false;
    }
    return true;
  });
}

/**
 * 根据ID获取音色
 */
export function getVoiceById(id: string): AIVoice | undefined {
  return voiceGallery.find(v => v.id === id);
}