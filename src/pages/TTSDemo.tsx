/**
 * TTS 试听页面
 * 
 * 路由: /tts-demo 或 /voice-gallery
 * 展示超逼真 AI 音色，支持多音色试听功能
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Mic, 
  Headphones, 
  Globe, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Container, Badge, Button } from '@/components/common';
import { getLocalizedPath } from '@/utils';

// 导入 TTS 组件
import {
  AIAvatarCarousel,
  VoiceFilter,
  CustomTTSDemo,
  TTSSpecs,
  TTSScenarios,
  TTSTestimonials
} from '@/components/tts';

// 导入数据
import { 
  voiceGallery, 
  AIVoice, 
  getPopularVoices
} from '@/data/tts-voices';

export default function TTSDemo() {
  const { t } = useTranslation('tts-demo');
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  
  // 状态
  const [filteredVoices, setFilteredVoices] = useState<AIVoice[]>(voiceGallery);

  // 处理筛选
  const handleFilter = (voices: AIVoice[]) => {
    setFilteredVoices(voices);
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>
          {isZh 
            ? '50+ 超逼真 AI 音色试听 | AI Voice Agent' 
            : 'Hyper-Realistic AI Voices Demo | AI Voice Agent'}
        </title>
        <meta 
          name="description" 
          content={isZh 
            ? '体验 50+ 超逼真 AI 音色，像真人一样自然。支持多语言、多情感、多风格，为客服/销售/播客等场景打造完美声音。' 
            : 'Experience 50+ hyper-realistic AI voices indistinguishable from humans. Multi-language, multi-emotion, multi-style voices for customer service, sales, podcasts, and more.'}
        />
      </Helmet>

      <div className="min-h-screen bg-background-primary">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-hero text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge variant="gradient" className="mb-4">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                {t('hero.badge')}
              </Badge>

              <h1 className="text-hero font-bold mb-6">
                {t('hero.title')}
                <br />
                <span className="text-gradient-lime">{t('hero.titleHighlight')}</span>
              </h1>

              <p className="text-body-lg text-foreground-secondary mb-8 max-w-2xl mx-auto">
                {t('hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to={getLocalizedPath('/demo/live')}>
                  <Button variant="secondary" size="lg" leftIcon={<Mic className="w-5 h-5" />}>
                    {t('hero.cta.primary')}
                  </Button>
                </Link>
                <Link to={getLocalizedPath('/product/features')}>
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" rightIcon={<ArrowRight size={20} />}>
                    {t('hero.cta.secondary')}
                  </Button>
                </Link>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { icon: <Mic className="w-5 h-5" />, value: t('hero.stats.voices.value'), label: t('hero.stats.voices.label') },
                  { icon: <Globe className="w-5 h-5" />, value: t('hero.stats.languages.value'), label: t('hero.stats.languages.label') },
                  { icon: <Headphones className="w-5 h-5" />, value: t('hero.stats.mos.value'), label: t('hero.stats.mos.label') },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 bg-background-card/50 backdrop-blur-sm rounded-xl border border-border">
                    <div className="text-accent-lime">{stat.icon}</div>
                    <div>
                      <p className="text-xl font-bold text-accent-lime">{stat.value}</p>
                      <p className="text-xs text-foreground-muted">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Avatar Gallery */}
        <section className="py-16 md:py-24 bg-background-secondary">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="accent" className="mb-4">{t('gallery.title')}</Badge>
              <h2 className="text-h2 font-bold text-foreground-primary mb-4">{t('gallery.title')}</h2>
              <p className="text-body-lg text-foreground-secondary max-w-2xl mx-auto">
                {t('gallery.subtitle')}
              </p>
            </motion.div>

            {/* Voice Filter */}
            <div className="max-w-4xl mx-auto mb-12">
              <VoiceFilter onFilter={handleFilter} />
            </div>

            {/* Avatar Carousel */}
            <div className="max-w-6xl mx-auto">
              <AIAvatarCarousel 
                voices={filteredVoices.length > 0 ? filteredVoices : getPopularVoices()}
              />
            </div>
          </Container>
        </section>

        {/* Custom Demo */}
        <section className="py-16 md:py-24 bg-background-primary">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="gradient" className="mb-4">{t('customDemo.title')}</Badge>
              <h2 className="text-h2 font-bold text-foreground-primary mb-4">{t('customDemo.title')}</h2>
              <p className="text-body-lg text-foreground-secondary max-w-2xl mx-auto">
                {t('customDemo.subtitle')}
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <CustomTTSDemo voices={voiceGallery} />
            </div>
          </Container>
        </section>

        {/* Specs */}
        <section className="py-16 md:py-24 bg-background-secondary">
          <Container>
            <TTSSpecs />
          </Container>
        </section>

        {/* Scenarios */}
        <section className="py-16 md:py-24 bg-background-primary">
          <Container>
            <TTSScenarios />
          </Container>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-background-secondary">
          <Container>
            <TTSTestimonials />
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-gradient-primary text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-h2 font-bold mb-4">{t('cta.title')}</h2>
              <p className="text-body-lg text-white/80 mb-8">{t('cta.subtitle')}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={getLocalizedPath('/demo/live')}>
                  <Button variant="secondary" size="lg" leftIcon={<Mic className="w-5 h-5" />}>
                    {t('cta.primary')}
                  </Button>
                </Link>
                <Link to={getLocalizedPath('/company/contact')}>
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                    {t('cta.secondary')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </Container>
        </section>
      </div>
    </>
  );
}
