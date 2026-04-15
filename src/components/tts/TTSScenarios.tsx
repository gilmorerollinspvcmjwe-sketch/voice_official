/**
 * TTS 应用场景展示组件
 * 
 * 展示客服、销售、播客、有声书、教育、游戏 NPC 等场景
 */

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Headphones, 
  Phone, 
  Mic, 
  BookOpen, 
  GraduationCap, 
  Gamepad2,
  ArrowRight
} from 'lucide-react';
import { Badge, Card } from '@/components/common';
import { ttsScenarios } from '../../data/tts-scenarios';
import { getVoiceById } from '../../data/tts-voices';

const scenarioIcons: Record<string, React.ReactNode> = {
  'customer-service': <Headphones className="w-8 h-8" />,
  'sales': <Phone className="w-8 h-8" />,
  'podcast': <Mic className="w-8 h-8" />,
  'audiobook': <BookOpen className="w-8 h-8" />,
  'education': <GraduationCap className="w-8 h-8" />,
  'game-npc': <Gamepad2 className="w-8 h-8" />
};

export function TTSScenarios() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="w-full">
      {/* 标题 */}
      <div className="text-center mb-12">
        <Badge variant="gradient" className="mb-4">{isZh ? '应用场景' : 'Application Scenarios'}</Badge>
        <h2 className="text-h2 font-bold text-foreground-primary mb-4">
          {isZh ? '应用场景' : 'Application Scenarios'}
        </h2>
        <p className="text-foreground-secondary max-w-2xl mx-auto">
          {isZh 
            ? '覆盖客服、销售、播客、有声书、教育、游戏等多行业场景，为每个场景提供最佳音色推荐' 
            : 'Covering customer service, sales, podcasts, audiobooks, education, gaming and more industries with best voice recommendations'}
        </p>
      </div>

      {/* 场景卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ttsScenarios.map((scenario) => (
          <Card key={scenario.id} variant="hover" padding="none" className="h-full overflow-hidden">
            {/* 场景图片/渐变背景 */}
            <div className="relative h-40 bg-gradient-to-br from-primary-purple/20 to-primary-cyan/10 
                            flex items-center justify-center text-primary-purple/60">
              {scenarioIcons[scenario.id]}
              <div className="absolute inset-0 bg-primary-purple/0 hover:bg-primary-purple/10 
                              transition-colors duration-300" />
            </div>

            {/* 内容 */}
            <div className="p-6">
              {/* 标题 */}
              <h3 className="text-subheading font-semibold text-foreground-primary mb-2">
                {isZh ? scenario.title.zh : scenario.title.en}
              </h3>

              {/* 描述 */}
              <p className="text-body-sm text-foreground-secondary mb-4 leading-relaxed">
                {isZh ? scenario.description.zh : scenario.description.en}
              </p>

              {/* 推荐音色 */}
              <div className="mb-4">
                <p className="text-caption text-foreground-muted mb-2">
                  {isZh ? '推荐音色' : 'Recommended Voices'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {scenario.recommendedVoices.slice(0, 4).map((voiceId) => {
                    const voice = getVoiceById(voiceId);
                    if (!voice) return null;
                    return (
                      <div
                        key={voiceId}
                        className="flex items-center gap-1.5 px-2 py-1 bg-background-secondary 
                                   rounded-full text-xs border border-border"
                      >
                        <img
                          src={voice.avatar}
                          alt={voice.name}
                          className="w-4 h-4 rounded-full"
                          loading="lazy"
                        />
                        <span className="text-foreground-secondary">{voice.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 特性列表 */}
              <ul className="space-y-2 mb-4">
                {(isZh ? scenario.features.zh : scenario.features.en).slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-purple mt-1.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* 数据指标 */}
              {scenario.stats && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {scenario.stats.map((stat, i) => (
                    <div key={i} className="text-center p-2 bg-background-secondary rounded-lg border border-border">
                      <p className="text-lg font-bold text-accent-lime">
                        {stat.value}
                      </p>
                      <p className="text-caption text-foreground-muted">
                        {isZh ? stat.label : stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* 查看详情链接 */}
              <Link
                to={`/tts-demo?scenario=${scenario.id}`}
                className="inline-flex items-center gap-2 text-primary-purple hover:text-primary-cyan 
                           transition-colors group/link"
              >
                <span className="text-sm font-medium">
                  {isZh ? '查看场景详情' : 'View Scenario Details'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 
                                       transition-transform" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* 场景对比表格 */}
      <div className="mt-12 bg-background-card rounded-2xl border border-border p-8">
        <h3 className="text-xl font-semibold text-foreground-primary mb-6">
          {isZh ? '各场景音色推荐对比' : 'Scenario Voice Recommendation Comparison'}
        </h3>
        
        {/* 移动端卡片布局 */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground-primary">
                  {isZh ? '场景' : 'Scenario'}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground-primary">
                  {isZh ? '推荐音色' : 'Voices'}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground-primary">
                  {isZh ? '风格特点' : 'Features'}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground-primary">
                  {isZh ? '效果指标' : 'Metrics'}
                </th>
              </tr>
            </thead>
            <tbody>
              {ttsScenarios.map((scenario) => (
                <tr key={scenario.id} className="border-b border-border/50 
                                                hover:bg-background-elevated transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-purple/10 
                                      flex items-center justify-center text-primary-purple">
                        {scenarioIcons[scenario.id]}
                      </div>
                      <span className="font-medium text-foreground-primary">
                        {isZh ? scenario.title.zh : scenario.title.en}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {scenario.recommendedVoices.map((voiceId) => {
                        const voice = getVoiceById(voiceId);
                        if (!voice) return null;
                        return (
                          <div key={voiceId} className="flex items-center gap-1">
                            <img
                              src={voice.avatar}
                              alt={voice.name}
                              className="w-6 h-6 rounded-full"
                              loading="lazy"
                            />
                            <span className="text-sm text-foreground-secondary">
                              {voice.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground-secondary">
                    {isZh ? scenario.description.zh : scenario.description.en}
                  </td>
                  <td className="px-4 py-4">
                    {scenario.stats?.map((stat, i) => (
                      <span key={i} className="inline-block px-2 py-1 mr-2 mb-1
                                              bg-primary-purple/10 text-primary-purple rounded 
                                              text-sm">
                        {stat.label}: {stat.value}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 移动端卡片布局 */}
        <div className="md:hidden space-y-4">
          {ttsScenarios.map((scenario) => (
            <div key={scenario.id} className="bg-background-secondary rounded-lg p-4 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary-purple/10 
                                flex items-center justify-center text-primary-purple">
                  {scenarioIcons[scenario.id]}
                </div>
                <span className="font-semibold text-foreground-primary">
                  {isZh ? scenario.title.zh : scenario.title.en}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {scenario.recommendedVoices.map((voiceId) => {
                  const voice = getVoiceById(voiceId);
                  if (!voice) return null;
                  return (
                    <img
                      key={voiceId}
                      src={voice.avatar}
                      alt={voice.name}
                      className="w-8 h-8 rounded-full"
                      loading="lazy"
                    />
                  );
                })}
              </div>
              
              <p className="text-sm text-foreground-secondary mb-2">
                {isZh ? scenario.description.zh : scenario.description.en}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {scenario.stats?.map((stat, i) => (
                  <span key={i} className="px-2 py-1 bg-background-card rounded text-sm border border-border text-foreground-secondary">
                    {stat.label}: {stat.value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
