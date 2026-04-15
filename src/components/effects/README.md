# 科技感特效组件库

为 AI Voice Agent 海外官网设计的高性能 React 特效组件库。

## 组件清单

### P0 - 核心特效

| 组件 | 功能 | 文件 |
|------|------|------|
| `GradientText` | 金属色流动文字 | `GradientText.tsx` |
| `ShimmerText` | 闪烁文字效果 | `GradientText.tsx` |
| `InfiniteCarousel` | 无限滚动轮播 | `InfiniteCarousel.tsx` |
| `LogoCarousel` | Logo 无限滚动 | `InfiniteCarousel.tsx` |
| `TestimonialCarousel` | 评价轮播 | `InfiniteCarousel.tsx` |
| `HorizontalScroll` | 横向滚动区域 | `HorizontalScroll.tsx` |
| `FeatureCard` | 功能卡片 | `HorizontalScroll.tsx` |

### P1 - 增强特效

| 组件 | 功能 | 文件 |
|------|------|------|
| `ParticleBackground` | 粒子背景 | `ParticleBackground.tsx` |
| `VoiceWaveBackground` | 语音波形背景 | `ParticleBackground.tsx` |
| `NeuralNetworkBackground` | 神经网络背景 | `ParticleBackground.tsx` |
| `GlowCard` | 光效卡片 | `GlowCard.tsx` |
| `GlowButton` | 发光按钮 | `GlowCard.tsx` |
| `BorderGlowCard` | 边框发光卡片 | `GlowCard.tsx` |
| `AnimatedCounter` | 数字滚动 | `AnimatedCounter.tsx` |
| `StatCard` | 统计卡片 | `AnimatedCounter.tsx` |
| `CountUp` | 简单计数器 | `AnimatedCounter.tsx` |
| `ParallaxSection` | 视差区域 | `ParallaxSection.tsx` |
| `ParallaxLayer` | 视差层 | `ParallaxSection.tsx` |
| `FloatingElement` | 浮动元素 | `ParallaxSection.tsx` |
| `ParallaxImage` | 视差图片 | `ParallaxSection.tsx` |
| `StaggerContainer` | 错落动画 | `ParallaxSection.tsx` |

### P2 - 高级特效

| 组件 | 功能 | 文件 |
|------|------|------|
| `FlipCard` | 3D 翻转卡片 | `FlipCard.tsx` |
| `FeatureFlipCard` | 功能翻转卡片 | `FlipCard.tsx` |
| `TeamCard` | 团队卡片 | `FlipCard.tsx` |
| `CustomCursor` | 自定义光标 | `CustomCursor.tsx` |
| `CursorProvider` | 光标提供者 | `CustomCursor.tsx` |
| `CursorHover` | 光标悬停区 | `CustomCursor.tsx` |

## 快速开始

```tsx
import { GradientText, GlowCard, AnimatedCounter } from '@/components/effects'

function App() {
  return (
    <div className="bg-[#0A0A0A] text-white">
      <h1>
        <GradientText>Hello World</GradientText>
      </h1>
      
      <GlowCard hoverGlow sweepEffect>
        <h3>Card Title</h3>
        <p>Card content</p>
      </GlowCard>
      
      <AnimatedCounter value={1000000} label="Users" />
    </div>
  )
}
```

## 设计规范

### 配色方案

- 背景色：`#0A0A0A`（深黑）
- 品牌色：`#D4FF00`（荧光绿）
- 辅助色：`#1A1A1A`（深灰）
- 文字色：`#FFFFFF`（白）/ `#A0A0A0`（灰）

### 动画规范

- 入场动画：0.5-0.8s
- 交互动画：0.2-0.3s
- 缓动函数：`cubic-bezier(0.22, 1, 0.36, 1)`
- 支持 `prefers-reduced-motion`

## 性能优化

- 使用 CSS `transform` 和 `opacity` 进行动画
- 使用 `will-change` 提示浏览器优化
- 使用 `requestAnimationFrame` 节流
- 支持减弱动画模式

## 演示页面

访问 `/demo/effects` 查看所有特效演示。

## 文档

- [特效设计方案](./docs/EFFECTS_DESIGN.md)
- [集成指南](./docs/INTEGRATION_GUIDE.md)
