/**
 * Effects Demo Page
 * 
 * 展示所有科技感特效组件
 */

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, Globe, Cpu, Users } from 'lucide-react'

// 导入特效组件
import {
  GradientText,
  ShimmerText,
  LogoCarousel,
  TestimonialCarousel,
  HorizontalScroll,
  FeatureCard,
  ParticleBackground,
  VoiceWaveBackground,
  NeuralNetworkBackground,
  GlowCard,
  GlowButton,
  BorderGlowCard,
  StatCard,
  ParallaxSection,
  FloatingElement,
  FeatureFlipCard,
} from '@/components/effects'

// 示例数据
const logos = [
  { id: '1', name: 'Company A', logo: <span className="text-2xl font-bold text-white">A</span> },
  { id: '2', name: 'Company B', logo: <span className="text-2xl font-bold text-white">B</span> },
  { id: '3', name: 'Company C', logo: <span className="text-2xl font-bold text-white">C</span> },
  { id: '4', name: 'Company D', logo: <span className="text-2xl font-bold text-white">D</span> },
  { id: '5', name: 'Company E', logo: <span className="text-2xl font-bold text-white">E</span> },
  { id: '6', name: 'Company F', logo: <span className="text-2xl font-bold text-white">F</span> },
]

const testimonials = [
  {
    id: '1',
    quote: 'This AI voice agent has completely transformed our customer service. Response times are down 80%.',
    author: 'Sarah Chen',
    role: 'CTO',
    company: 'TechCorp',
  },
  {
    id: '2',
    quote: 'The natural voice quality is incredible. Our customers can\'t tell it\'s not human.',
    author: 'Michael Ross',
    role: 'VP of Operations',
    company: 'GlobalServe',
  },
  {
    id: '3',
    quote: 'Implementation was seamless. We were up and running in less than a week.',
    author: 'Emily Watson',
    role: 'Customer Success',
    company: 'FastGrowth',
  },
]

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Lightning Fast',
    description: 'Sub-second response times with our optimized inference engine.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified with end-to-end encryption.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Global Scale',
    description: 'Deploy in 12 regions worldwide with automatic failover.',
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'AI Powered',
    description: 'State-of-the-art language models trained on millions of conversations.',
  },
]

export default function EffectsDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* Hero Section with Gradient Text */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <ParticleBackground particleCount={30} className="opacity-50" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <GradientText
                className="font-bold"
                direction="horizontal"
                speed={3}
              >
                The Future of
              </GradientText>
              <br />
              <ShimmerText className="font-bold" shimmerColor="#D4FF00" baseColor="#FFFFFF">
                Voice AI
              </ShimmerText>
            </h1>
            
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
              Experience the next generation of conversational AI with our cutting-edge voice agents.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <GlowButton>Get Started</GlowButton>
              <GlowButton variant="outline">Learn More</GlowButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value={99.9} suffix="%" label="Uptime SLA" decimals={1} />
            <StatCard value={50} suffix="ms" label="Response Time" />
            <StatCard value={1000000} prefix="" label="Calls Handled" />
            <StatCard value={12} label="Global Regions" />
          </div>
        </div>
      </section>

      {/* Logo Carousel */}
      <section className="py-16 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <p className="text-center text-white/40 text-sm uppercase tracking-wider">
            Trusted by industry leaders
          </p>
        </div>
        <LogoCarousel logos={logos} />
      </section>

      {/* Horizontal Scroll Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">
            <GradientText>Powerful Features</GradientText>
          </h2>
          <p className="text-white/60 text-center max-w-2xl mx-auto">
            Scroll horizontally to explore our comprehensive feature set
          </p>
        </div>
        
        <HorizontalScroll
          containerHeight="400vh"
          showProgress
          showDots
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </HorizontalScroll>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Glow Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <GradientText>Interactive Cards</GradientText>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <GlowCard className="p-6" hoverGlow sweepEffect>
              <Zap className="w-8 h-8 text-[#D4FF00] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Setup</h3>
              <p className="text-white/60">Get started in minutes with our simple API integration.</p>
            </GlowCard>
            
            <GlowCard className="p-6" hoverGlow borderGlow>
              <Shield className="w-8 h-8 text-[#D4FF00] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure</h3>
              <p className="text-white/60">Enterprise-grade security with SOC 2 compliance.</p>
            </GlowCard>
            
            <BorderGlowCard glowIntensity={3}>
              <Globe className="w-8 h-8 text-[#D4FF00] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global</h3>
              <p className="text-white/60">Deploy worldwide with edge computing.</p>
            </BorderGlowCard>
          </div>
        </div>
      </section>

      {/* Flip Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            3D Flip Cards
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureFlipCard
              icon={<Zap />}
              title="Lightning Fast"
              description="Sub-second responses"
              details="Our optimized inference engine delivers responses in under 50ms, making conversations feel natural and fluid."
            />
            <FeatureFlipCard
              icon={<Shield />}
              title="Secure"
              description="Enterprise security"
              details="SOC 2 Type II certified with end-to-end encryption, audit logs, and role-based access control."
            />
            <FeatureFlipCard
              icon={<Users />}
              title="Scalable"
              description="Handle millions of calls"
              details="Auto-scaling infrastructure that handles millions of concurrent calls without breaking a sweat."
            />
          </div>
        </div>
      </section>

      {/* Voice Wave Background */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <VoiceWaveBackground barCount={60} maxHeight={300} />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            <GradientText>Natural Voice Synthesis</GradientText>
          </h2>
          <p className="text-xl text-white/60">
            Our advanced neural TTS models produce human-like speech with natural intonation and emotion.
          </p>
        </div>
      </section>

      {/* Neural Network Background */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <NeuralNetworkBackground nodeCount={40} />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            <GradientText>Powered by AI</GradientText>
          </h2>
          <p className="text-xl text-white/60">
            State-of-the-art language models trained on billions of parameters for natural conversation.
          </p>
        </div>
      </section>

      {/* Parallax Section */}
      <ParallaxSection
        height="150vh"
        background={
          <div className="w-full h-full bg-gradient-to-b from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]" />
        }
        foreground={
          <FloatingElement amplitude={30} className="absolute top-1/4 right-1/4">
            <div className="w-32 h-32 rounded-2xl bg-[#D4FF00]/20 backdrop-blur-sm border border-[#D4FF00]/30" />
          </FloatingElement>
        }
      >
        <div className="h-full flex items-center justify-center px-4">
          <div className="max-w-2xl text-center">
            <h2 className="text-4xl font-bold mb-6">
              <GradientText>Ready to Transform?</GradientText>
            </h2>
            <p className="text-xl text-white/60 mb-8">
              Join thousands of companies using our AI voice agents to deliver exceptional customer experiences.
            </p>
            <GlowButton size="lg">Start Free Trial</GlowButton>
          </div>
        </div>
      </ParallaxSection>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/40 text-sm">
            Effects Demo - Built with React + Framer Motion + Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
