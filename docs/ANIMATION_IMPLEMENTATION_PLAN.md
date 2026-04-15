# voice-ai-website 动画实施方案

> 基于 REACTBITS_GSAP_RESEARCH.md 的具体实施计划
> 项目风格：科技感、炫酷、商业

---

## 🎯 实施目标

将 voice-ai-website 从现有 Framer Motion 动画升级为：
- **GSAP 核心动画**（入场、滚动、交互）
- **React Bits 补充组件**（特效、背景）
- 保持现有 Framer Motion 作为基础动画库

---

## 📦 第一步：安装 GSAP

```bash
cd voice-ai-website
npm install gsap
```

---

## 🎨 第二步：React Bits 组件集成

### 需要引入的组件清单

| 优先级 | 组件 | 应用位置 | 文件路径 |
|--------|------|---------|---------|
| **P0** | Electric Border | Pricing 卡片边框 | `src/components/effects/ElectricBorder.tsx` |
| **P0** | Glitch Text | Hero 区域标语 | `src/components/effects/GlitchText.tsx` |
| **P1** | Aurora | Hero 背景 | `src/components/effects/Aurora.tsx` |
| **P1** | Hyperspeed | Demo 页面背景 | `src/components/effects/Hyperspeed.tsx` |
| **P1** | Meta Balls | Demo 页面背景 | `src/components/effects/MetaBalls.tsx` |
| **P1** | Splash Cursor | Demo 页面交互 | `src/components/effects/SplashCursor.tsx` |
| **P2** | Scroll Velocity | 产品介绍文字 | `src/components/effects/ScrollVelocity.tsx` |
| **P2** | Decrypted Text | Security 区域 | `src/components/effects/DecryptedText.tsx` |
| **P2** | Border Glow | 功能卡片边框 | `src/components/effects/BorderGlow.tsx` |

### 集成步骤

1. **访问 React Bits 官网**：https://www.reactbits.dev/
2. **找到目标组件**（如 Electric Border）
3. **复制组件代码**
4. **在项目中创建文件**：`src/components/effects/[ComponentName].tsx`
5. **调整颜色参数**：将默认颜色改为项目品牌色

### 颜色适配示例

```tsx
// Electric Border 组件颜色适配
// 默认颜色 → 项目品牌色

// 原始（React Bits 默认）
color = "#ffffff"

// 适配后（voice-ai-website）
color = "#D4FF00"  // 荧光绿
// 或
color = "#D4A574"  // 金色
```

---

## 🚀 第三步：GSAP 动画实现

### 3.1 Hero Section - SplitText 入场动画

```tsx
// src/components/sections/HeroSection.tsx
import { useRef } from 'react'
import { useGSAP } from 'gsap/react'
import { SplitText } from 'gsap/SplitText'
import gsap from 'gsap'

gsap.registerPlugin(SplitText)

export default function HeroSection() {
  const containerRef = useRef(null)
  
  useGSAP(() => {
    // 标题拆分动画
    const titleSplit = new SplitText(".hero-title", {
      type: "chars, words"
    })
    
    gsap.from(titleSplit.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 0.6,
      ease: "power4.out"
    })
    
    // 副标题入场
    gsap.from(".hero-subtitle", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.3
    })
    
    // CTA 按钮
    gsap.from(".hero-cta", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 0.6,
      stagger: 0.1
    })
  }, { scope: containerRef })
  
  return (
    <section ref={containerRef} className="relative min-h-screen">
      {/* Aurora 背景 */}
      <Aurora colors={['#D4FF00', '#00FF88', '#00D4FF']} />
      
      <div className="container-custom relative z-10">
        <h1 className="hero-title text-5xl md:text-7xl font-bold">
          AI Voice Agent
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl text-white/80">
          Enterprise-grade voice AI for your business
        </p>
        <div className="hero-cta flex gap-4">
          <button>Get Started</button>
          <button>Watch Demo</button>
        </div>
      </div>
    </section>
  )
}
```

### 3.2 Features Section - ScrollTrigger + Timeline

```tsx
// src/components/sections/FeaturesSection.tsx
import { useRef } from 'react'
import { useGSAP } from 'gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturesSection() {
  const containerRef = useRef(null)
  
  useGSAP(() => {
    // 创建时间线
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    })
    
    // 功能卡片错落入场
    tl.from(".feature-card", {
      y: 60,
      opacity: 0,
      scale: 0.95,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out"
    })
    
    // 功能图标动画
    tl.from(".feature-icon", {
      scale: 0,
      rotation: -180,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.3")
  }, { scope: containerRef })
  
  return (
    <section ref={containerRef} className="py-20">
      <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map(feature => (
          <div key={feature.id} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

### 3.3 How It Works - 滚动驱动流程动画

```tsx
// src/components/sections/HowItWorksSection.tsx
import { useRef } from 'react'
import { useGSAP } from 'gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

export default function HowItWorksSection() {
  const containerRef = useRef(null)
  
  useGSAP(() => {
    // 滚动进度驱动动画
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".process-steps",
        start: "top center",
        end: "bottom center",
        scrub: 1 // 滚动进度控制动画进度
      }
    })
    
    // 步骤依次激活
    tl.to(".step-1", { opacity: 1, scale: 1, borderColor: '#D4FF00' })
      .to(".step-2", { opacity: 1, x: 0, borderColor: '#D4FF00' }, "-=0.5")
      .to(".step-3", { opacity: 1, x: 0, borderColor: '#D4FF00' }, "-=0.5")
      .to(".step-4", { opacity: 1, x: 0, borderColor: '#D4FF00' }, "-=0.5")
    
    // 连接线绘制
    tl.from(".connection-line", {
      scaleX: 0,
      duration: 0.5,
      stagger: 0.2
    }, "-=0.3")
  }, { scope: containerRef })
  
  return (
    <section ref={containerRef} className="py-20">
      <div className="process-steps flex justify-between">
        <div className="step-1 opacity-0 scale-95">
          <span>Step 1</span>
          <p>Configure Agent</p>
        </div>
        <div className="connection-line" />
        <div className="step-2 opacity-0 x-20">
          <span>Step 2</span>
          <p>Train Voice</p>
        </div>
        <div className="connection-line" />
        <div className="step-3 opacity-0 x-20">
          <span>Step 3</span>
          <p>Deploy</p>
        </div>
        <div className="connection-line" />
        <div className="step-4 opacity-0 x-20">
          <span>Step 4</span>
          <p>Monitor</p>
        </div>
      </div>
    </section>
  )
}
```

### 3.4 Pricing Section - Electric Border + Flip

```tsx
// src/components/sections/PricingSection.tsx
import { useRef } from 'react'
import { useGSAP } from 'gsap/react'
import { Flip } from 'gsap/Flip'
import gsap from 'gsap'
import ElectricBorder from '../effects/ElectricBorder'

gsap.registerPlugin(Flip)

export default function PricingSection() {
  const containerRef = useRef(null)
  
  // 定价卡片切换动画
  const handleToggle = () => {
    const state = Flip.getState(".pricing-cards")
    // 改变 DOM 结构
    Flip.to(state, {
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    })
  }
  
  return (
    <section ref={containerRef} className="py-20">
      <div className="pricing-cards grid grid-cols-3 gap-8">
        <ElectricBorder color="#D4FF00" speed="2s">
          <div className="pricing-card">
            <h3>Starter</h3>
            <p>$99/month</p>
          </div>
        </ElectricBorder>
        
        <ElectricBorder color="#D4A574" speed="3s">
          <div className="pricing-card featured">
            <h3>Pro</h3>
            <p>$299/month</p>
          </div>
        </ElectricBorder>
        
        <ElectricBorder color="#00D4FF" speed="2s">
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p>Custom</p>
          </div>
        </ElectricBorder>
      </div>
    </section>
  )
}
```

---

## 📋 实施时间表

| 周 | 任务 | 预计时间 |
|----|------|---------|
| **Week 1** | 安装 GSAP + Hero SplitText 动画 | 4-6 小时 |
| **Week 1** | 集成 Electric Border + Glitch Text | 2-3 小时 |
| **Week 2** | Features ScrollTrigger 动画 | 4-5 小时 |
| **Week 2** | Aurora + Hyperspeed 背景 | 2-3 小时 |
| **Week 3** | How It Works 滚动流程动画 | 4-5 小时 |
| **Week 3** | Pricing Flip 动画 | 2-3 小时 |
| **Week 4** | Demo 页面 Meta Balls + MotionPath | 4-6 小时 |
| **Week 4** | 性能优化 + 无障碍适配 | 2-3 小时 |

---

## ✅ 检查清单

### GSAP 安装

- [ ] `npm install gsap`
- [ ] 在需要的组件中导入 `useGSAP`
- [ ] 注册插件：`gsap.registerPlugin(ScrollTrigger, SplitText, Flip)`

### React Bits 组件

- [ ] Electric Border 已复制到 `src/components/effects/`
- [ ] Glitch Text 已复制
- [ ] Aurora 已复制
- [ ] Hyperspeed 已复制
- [ ] Meta Balls 已复制
- [ ] 颜色参数已适配品牌色

### 动画实现

- [ ] Hero SplitText 入场动画
- [ ] Features ScrollTrigger 卡片入场
- [ ] How It Works 滚动流程动画
- [ ] Pricing Electric Border + Flip
- [ ] Demo 页面背景动画

### 无障碍适配

- [ ] 检测 `prefers-reduced-motion`
- [ ] 减弱动画模式下禁用/简化动画
- [ ] 动画不影响键盘导航

---

## 🎨 设计系统适配

### 颜色变量

```css
/* voice-ai-website 品牌色 */
--brand-primary: #D4FF00;  /* 荧光绿 */
--brand-gold: #D4A574;     /* 金色 */
--brand-accent: #00D4FF;   /* 青色 */
--brand-secondary: #00FF88; /* 青绿 */
--background-primary: #0A0A0A; /* 深黑 */
--background-card: #1A1A1A;  /* 深灰 */
```

### GSAP Easing 推荐

```js
// 科技感入场
ease: "power4.out"

// 弹性交互
ease: "back.out(1.7)"

// 平滑滚动
ease: "power2.inOut"

// 电流效果
ease: "steps(5)"
```

---

## 📝 注意事项

1. **GSAP scope 限制**：所有动画使用 `scope: containerRef` 限制范围
2. **性能优化**：避免过多同时触发的 ScrollTrigger
3. **无障碍**：检测 `prefers-reduced-motion` 并适配
4. **颜色一致性**：React Bits 组件颜色需适配项目品牌色
5. **保持现有动画**：不删除现有 Framer Motion 动画，GSAP 作为补充