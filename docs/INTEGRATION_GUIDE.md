# 特效组件集成指南

## 快速开始

### 1. 安装依赖

```bash
npm install framer-motion lucide-react
```

### 2. 复制组件文件

将 `src/components/effects/` 目录下的所有文件复制到你的项目中。

### 3. 更新 Tailwind 配置

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#D4FF00',
          dark: '#0A0A0A',
          gray: '#1A1A1A',
        },
      },
    },
  },
}
```

---

## 组件使用指南

### GradientText - 渐变文字

```tsx
import { GradientText } from '@/components/effects'

// 基础用法
<h1>
  <GradientText>Hello World</GradientText>
</h1>

// 自定义配置
<GradientText
  direction="diagonal"
  speed={5}
  colors={['#D4FF00', '#00FF88', '#00D4FF']}
  metallic
>
  Custom Gradient
</GradientText>
```

**Props:**
- `direction`: 'horizontal' | 'vertical' | 'diagonal'
- `speed`: 动画速度（秒）
- `colors`: 自定义渐变颜色数组
- `metallic`: 是否使用金属质感
- `animated`: 是否启用动画

---

### InfiniteCarousel - 无限轮播

```tsx
import { InfiniteCarousel } from '@/components/effects'

const items = [
  { id: '1', content: <div>Item 1</div> },
  { id: '2', content: <div>Item 2</div> },
  { id: '3', content: <div>Item 3</div> },
]

<InfiniteCarousel
  items={items}
  direction="left"
  speed={50}
  pauseOnHover
  gap={24}
/>
```

**专用组件:**
- `LogoCarousel`: Logo 无限滚动
- `TestimonialCarousel`: 评价轮播

---

### HorizontalScroll - 横向滚动

```tsx
import { HorizontalScroll, FeatureCard } from '@/components/effects'

<HorizontalScroll
  containerHeight="400vh"
  showProgress
  showDots
>
  <FeatureCard
    icon={<Zap />}
    title="Feature 1"
    description="Description 1"
  />
  <FeatureCard
    icon={<Shield />}
    title="Feature 2"
    description="Description 2"
  />
</HorizontalScroll>
```

---

### ParticleBackground - 粒子背景

```tsx
import { ParticleBackground } from '@/components/effects'

<section className="relative">
  <ParticleBackground
    particleCount={50}
    particleColor="#D4FF00"
    connectionDistance={150}
    mouseInteraction
  />
  <div className="relative z-10">
    Your content here
  </div>
</section>
```

**变体:**
- `VoiceWaveBackground`: 语音波形
- `NeuralNetworkBackground`: 神经网络

---

### GlowCard - 光效卡片

```tsx
import { GlowCard, GlowButton, BorderGlowCard } from '@/components/effects'

// 悬停光效卡片
<GlowCard hoverGlow sweepEffect>
  <h3>Card Title</h3>
  <p>Card content</p>
</GlowCard>

// 发光按钮
<GlowButton variant="primary" size="lg">
  Get Started
</GlowButton>

// 边框发光卡片
<BorderGlowCard glowIntensity={3}>
  <p>Content with glowing border</p>
</BorderGlowCard>
```

---

### AnimatedCounter - 数字动画

```tsx
import { AnimatedCounter, StatCard } from '@/components/effects'

// 基础计数器
<AnimatedCounter
  value={1000000}
  prefix=""
  suffix="+"
  duration={2}
  useGrouping
/>

// 统计卡片
<StatCard
  value={99.9}
  suffix="%"
  label="Uptime"
  decimals={1}
/>
```

---

### ParallaxSection - 视差滚动

```tsx
import { ParallaxSection, FloatingElement } from '@/components/effects'

<ParallaxSection
  background={<div className="bg-gradient-to-b from-black to-gray-900" />}
  foreground={
    <FloatingElement amplitude={20}>
      <div className="floating-element" />
    </FloatingElement>
  }
>
  <div>Your content</div>
</ParallaxSection>
```

---

### FlipCard - 3D 翻转

```tsx
import { FlipCard, FeatureFlipCard } from '@/components/effects'

// 基础翻转卡片
<FlipCard
  front={<div>Front Content</div>}
  back={<div>Back Content</div>}
  direction="horizontal"
  trigger="hover"
/>

// 功能翻转卡片
<FeatureFlipCard
  icon={<Zap />}
  title="Fast"
  description="Lightning fast responses"
  details="Our optimized engine delivers sub-50ms responses."
/>
```

---

## 最佳实践

### 1. 性能优化

```tsx
// ✅ 使用 transform 而非 left/top
<motion.div style={{ x: 100 }} />

// ❌ 避免直接修改样式
<motion.div style={{ left: 100 }} />
```

### 2. 无障碍支持

```tsx
// 所有组件都支持减弱动画
<GradientText respectReducedMotion={false} />
```

### 3. 响应式设计

```tsx
// 组件自动适配屏幕尺寸
<GlowCard className="w-full md:w-1/2 lg:w-1/3" />
```

---

## 常见问题

### Q: 动画卡顿怎么办？

A: 检查以下几点：
1. 是否使用了 `transform` 和 `opacity`
2. 是否添加了 `will-change` 属性
3. 粒子数量是否过多（建议 < 100）
4. 是否启用了减弱动画模式

### Q: 如何禁用特定动画？

A: 使用 `respectReducedMotion` 属性：

```tsx
<ParticleBackground respectReducedMotion={false} />
```

### Q: 如何自定义颜色？

A: 所有组件都接受颜色属性：

```tsx
<GlowCard glowColor="#FF6B6B" />
<GradientText colors={['#FF6B6B', '#4ECDC4']} />
```

---

## 示例页面

查看 `src/pages/demo/EffectsDemo.tsx` 获取完整示例。

运行演示：

```bash
npm run dev
# 访问 /demo/effects
```
