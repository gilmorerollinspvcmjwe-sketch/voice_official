/**
 * TTS 技术规格展示组件
 * 
 * 展示自然度、语言支持、响应延迟等核心指标
 */

import { useTranslation } from 'react-i18next';
import { 
  Mic, 
  Globe, 
  Zap, 
  Brain, 
  Users,
  Award,
  TrendingUp
} from 'lucide-react';
import { Badge, Card } from '@/components/common';

interface Spec {
  icon: React.ReactNode;
  label: {
    en: string;
    zh: string;
  };
  value: string;
  unit?: string;
  description: {
    en: string;
    zh: string;
  };
}

const specs: Spec[] = [
  {
    icon: <Award className="w-6 h-6" />,
    label: { en: 'Naturalness (MOS)', zh: '自然度 (MOS)' },
    value: '4.8',
    unit: '/5.0',
    description: { 
      en: 'Close to human level, indistinguishable from real voice',
      zh: '接近真人水平，听不出是 AI' 
    }
  },
  {
    icon: <Globe className="w-6 h-6" />,
    label: { en: 'Languages', zh: '支持语言' },
    value: '50',
    unit: '+',
    description: { 
      en: 'Chinese, English, Japanese, Korean, French, German, etc.',
      zh: '中/英/日/韩/法/德等 50+ 语言' 
    }
  },
  {
    icon: <Mic className="w-6 h-6" />,
    label: { en: 'Voice Profiles', zh: '音色数量' },
    value: '100',
    unit: '+',
    description: { 
      en: 'Male/Female, various age ranges and styles',
      zh: '男女/年龄段/风格全覆盖' 
    }
  },
  {
    icon: <Brain className="w-6 h-6" />,
    label: { en: 'Emotion Support', zh: '情感支持' },
    value: '8',
    unit: ' 种',
    description: { 
      en: 'Calm, Happy, Sad, Angry, Surprised, Afraid, Disgusted, Expecting',
      zh: '平静/开心/悲伤/愤怒/惊讶/害怕/厌恶/期待' 
    }
  },
  {
    icon: <Zap className="w-6 h-6" />,
    label: { en: 'Response Latency', zh: '响应延迟' },
    value: '<500',
    unit: 'ms',
    description: { 
      en: 'Real-time generation, instant response',
      zh: '实时生成，毫秒级响应' 
    }
  },
  {
    icon: <Users className="w-6 h-6" />,
    label: { en: 'Concurrent Calls', zh: '并发支持' },
    value: '1000',
    unit: '+',
    description: { 
      en: 'Simultaneous synthesis without queueing',
      zh: '同时合成，无需排队' 
    }
  }
];

const emotionData = [
  { emoji: '😊', label: '开心', key: 'happy', score: 95 },
  { emoji: '😌', label: '平静', key: 'calm', score: 98 },
  { emoji: '😢', label: '悲伤', key: 'sad', score: 88 },
  { emoji: '😠', label: '愤怒', key: 'angry', score: 85 },
  { emoji: '😲', label: '惊讶', key: 'surprised', score: 82 },
  { emoji: '😨', label: '害怕', key: 'afraid', score: 78 },
  { emoji: '🤢', label: '厌恶', key: 'disgusted', score: 75 },
  { emoji: '🤩', label: '期待', key: 'expecting', score: 90 }
];

export function TTSSpecs() {
  const { t, i18n } = useTranslation('ttsDemo');
  const isZh = i18n.language === 'zh';

  return (
    <div className="w-full">
      {/* 标题 */}
      <div className="text-center mb-12">
        <Badge variant="accent" className="mb-4">{t('specs.title', 'Technical Specifications')}</Badge>
        <h2 className="text-h2 font-bold text-foreground-primary mb-4">
          {t('specs.title', 'Technical Specifications')}
        </h2>
        <p className="text-foreground-secondary max-w-2xl mx-auto">
          {t('specs.subtitle', 'Industry-leading TTS parameters ensuring the highest quality speech synthesis')}
        </p>
      </div>

      {/* 规格卡片网格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {specs.map((spec) => (
          <Card key={isZh ? spec.label.zh : spec.label.en} variant="hover" padding="lg" className="h-full">
            {/* 图标 */}
            <div className="w-12 h-12 rounded-xl bg-primary-purple/10 flex items-center 
                            justify-center text-primary-purple mb-4">
              {spec.icon}
            </div>

            {/* 数值 */}
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-3xl font-bold text-accent-lime">
                {spec.value}
              </span>
              {spec.unit && (
                <span className="text-lg text-foreground-muted">
                  {spec.unit}
                </span>
              )}
            </div>

            {/* 标签 */}
            <h3 className="text-subheading font-semibold text-foreground-primary mb-2">
              {isZh ? spec.label.zh : spec.label.en}
            </h3>

            {/* 描述 */}
            <p className="text-body-sm text-foreground-secondary leading-relaxed">
              {isZh ? spec.description.zh : spec.description.en}
            </p>
          </Card>
        ))}
      </div>

      {/* 波形对比图 */}
      <div className="mt-12 bg-background-card rounded-2xl border border-border p-8">
        <h3 className="text-xl font-semibold mb-6 text-center text-foreground-primary">
          {t('specs.waveform.title', 'AI vs Human Waveform Comparison')}
        </h3>
        
        {/* 对比展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI 语音波形 */}
          <div className="bg-background-elevated rounded-xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Mic className="w-5 h-5 text-primary-purple" />
              <span className="font-medium text-foreground-primary">{t('specs.waveform.ai', 'AI Voice Synthesis')}</span>
              <span className="ml-auto text-sm text-success">MOS 4.8</span>
            </div>
            {/* 模拟波形 */}
            <div className="h-24 bg-background-primary/50 rounded-lg flex items-center 
                            justify-center overflow-hidden">
              <svg viewBox="0 0 400 60" className="w-full h-full">
                <path
                  d="M0,30 Q10,10 20,30 T40,30 Q50,50 60,30 T80,30 
                     Q90,15 100,30 T120,30 Q130,45 140,30 T160,30 
                     Q170,20 180,30 T200,30 Q210,40 220,30 T240,30 
                     Q250,15 260,30 T280,30 Q290,45 300,30 T320,30 
                     Q330,20 340,30 T360,30 Q370,35 380,30 T400,30"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>

          {/* 真人语音波形 */}
          <div className="bg-background-elevated rounded-xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-success" />
              <span className="font-medium text-foreground-primary">{t('specs.waveform.human', 'Human Recording')}</span>
              <span className="ml-auto text-sm text-success">MOS 5.0</span>
            </div>
            {/* 模拟波形 */}
            <div className="h-24 bg-background-primary/50 rounded-lg flex items-center 
                            justify-center overflow-hidden">
              <svg viewBox="0 0 400 60" className="w-full h-full">
                <path
                  d="M0,30 Q8,12 16,30 T32,30 Q40,48 48,30 T64,30 
                     Q72,18 80,30 T96,30 Q104,42 112,30 T128,30 
                     Q136,15 144,30 T160,30 Q168,38 176,30 T192,30 
                     Q200,22 208,30 T224,30 Q232,46 240,30 T256,30 
                     Q264,16 272,30 T288,30 Q296,44 304,30 T320,30 
                     Q328,18 336,30 T352,30 Q360,36 368,30 T384,30 
                     Q392,32 400,30"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 说明 */}
        <div className="mt-6 text-center text-sm text-foreground-muted">
          <TrendingUp className="w-4 h-4 inline mr-2" />
          {t('specs.waveform.note', 'AI voice waveform highly similar to human, MOS score close to perfect')}
        </div>
      </div>

      {/* 情感雷达图 */}
      <div className="mt-12 bg-background-card rounded-2xl border border-border p-8">
        <h3 className="text-xl font-semibold mb-6 text-center text-foreground-primary">
          {t('specs.emotionRadar.title', 'Emotion Expression Coverage')}
        </h3>
        
        {/* 简化的情感展示 */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {emotionData.map((emotion) => (
            <div key={emotion.label} className="text-center">
              <div className="text-3xl mb-2">{emotion.emoji}</div>
              <div className="text-sm font-medium text-foreground-secondary mb-1">
                {t(`emotions.${emotion.key}`, emotion.label)}
              </div>
              <div className="w-full bg-background-elevated rounded-full h-2">
                <div
                  className="h-full bg-primary-purple rounded-full"
                  style={{ width: `${emotion.score}%` }}
                />
              </div>
              <div className="text-xs text-foreground-muted mt-1">
                {emotion.score}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
