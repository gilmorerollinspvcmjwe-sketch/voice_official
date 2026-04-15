# AI Voice Agent 官网重设计方案

> 基于 PolyAI / Kore.ai 等竞品分析
> 分析日期: 2026-04-01

---

## 一、参考图分析总结

### 1.1 6张参考图的共同点

| 维度 | 共同特征 |
|------|---------|
| **配色** | 高对比度设计，深色/浅色背景 + 高饱和强调色 |
| **字体** | 大标题使用粗体/特粗体，正文清晰易读 |
| **布局** | 全宽Hero + 内容区域居中，大量留白 |
| **数据展示** | 大数字 + 简短描述的数据卡片 |
| **产品展示** | 真实产品界面截图/动态演示 |
| **社会证明** | 客户Logo墙 + 客户案例 + 名人代言 |
| **CTA** | 双按钮设计（主按钮高亮 + 次按钮） |
| **动效** | 滚动进入动画、悬停效果、波形动画 |

### 1.2 各品牌特色对比

| 品牌 | 主题 | 强调色 | 核心特色 |
|------|------|--------|---------|
| **PolyAI** | 深色 #0A0A0A | 荧光绿 #D4FF00 | 高端企业感，数据驱动，名人代言 |
| **Kore.ai** | 浅色白色 | 蓝色品牌 | 行业标签导航，城市背景图 |
| **Cognigy** | 紫色渐变 | 绿色 #10B981 | 低代码平台，流程可视化 |
| **Deepgram** | 深蓝黑 #0D1B2A | 青色 #00D9FF | 开发者导向，代码优先 |
| **Vapi** | 纯黑 #000000 | 霓虹绿 #00FF88 | 极简科技风，Discord社区 |
| **Retell** | 浅灰渐变 | 粉紫 #A855F7 | 实时Demo，快速部署 |

---

## 二、当前官网问题诊断

### 2.1 与 PolyAI / Kore.ai 的差距分析

| 维度 | PolyAI/Kore.ai 标准 | 我们当前状态 | 差距等级 |
|------|-------------------|-------------|---------|
| **配色** | 深色主题 + 高饱和强调色 | 浅蓝色主题 #0A2540 | 🔴 高 |
| **Hero标题** | 超大字号 56-72px，视觉冲击 | 3.5rem (56px)，偏保守 | 🟡 中 |
| **数据卡片** | 4-6个核心数据，大数字展示 | 6个数据，但设计平淡 | 🟡 中 |
| **产品界面** | 真实产品截图 + 动态演示 | 抽象波形动画 | 🔴 高 |
| **客户Logo** | 真实客户Logo墙 | Placeholder占位符 | 🔴 高 |
| **对话UI演示** | 真实对话场景展示 | 无 | 🔴 高 |
| **名人代言** | Gordon Ramsay等名人 | 无 | 🟡 中 |
| **行业方案** | 标签导航 + 场景卡片 | 基础卡片展示 | 🟡 中 |
| **CTA设计** | 高对比度，悬浮效果 | 标准按钮样式 | 🟡 中 |

### 2.2 具体问题清单

#### 🔴 P0 - 核心问题

1. **配色缺乏高端感**
   - 当前: 浅蓝色 #0A2540 + 蓝色强调
   - 问题: 过于保守，缺乏科技感和高端感
   - 建议: 参考 PolyAI 深色 + 荧光绿

2. **缺少真实产品界面**
   - 当前: 抽象波形动画
   - 问题: 无法展示产品真实能力
   - 建议: 添加 Agent Studio 界面截图

3. **客户Logo墙使用占位符**
   - 当前: CustomerLogoPlaceholder 组件
   - 问题: 缺乏社会证明
   - 建议: 替换为真实客户Logo

4. **缺少对话式UI演示**
   - 当前: 无
   - 问题: 无法直观展示对话能力
   - 建议: 添加交互式对话Demo

#### 🟡 P1 - 重要问题

5. **Hero区域视觉冲击力不足**
   - 当前: 渐变背景 + 波形动画
   - 问题: 缺乏层次感和深度
   - 建议: 添加3D元素或视频背景

6. **数据卡片设计平淡**
   - 当前: 简单卡片布局
   - 问题: 无法突出数据价值
   - 建议: 大数字 + 荧光色强调

7. **CTA按钮缺乏吸引力**
   - 当前: 标准按钮样式
   - 问题: 转化率可能受影响
   - 建议: 添加悬浮动画和光效

8. **行业解决方案展示不够专业**
   - 当前: 基础图标卡片
   - 问题: 缺乏行业深度
   - 建议: 添加标签导航 + 场景对话

#### 🟢 P2 - 优化问题

9. **动效过于简单**
   - 当前: fade-in-up基础动画
   - 建议: 添加更丰富的微交互

10. **字体层级不够清晰**
    - 当前: Inter字体，标准层级
    - 建议: 引入Display字体，强化层级

---

## 三、重设计方案

### 3.1 新配色方案（参考 PolyAI）

```javascript
// tailwind.config.js 更新
{
  colors: {
    // 主色调 - 深色主题
    background: {
      DEFAULT: '#0A0A0A',      // 主背景
      secondary: '#111111',    // 次级背景
      tertiary: '#1A1A1A',     // 卡片背景
      elevated: '#222222',     // 悬浮背景
    },
    
    // 强调色 - 荧光绿
    accent: {
      DEFAULT: '#D4FF00',      // 主强调色
      light: '#E0FF33',        // 浅色变体
      dark: '#B8E600',         // 深色变体
      glow: 'rgba(212, 255, 0, 0.3)', // 发光效果
    },
    
    // 辅助色
    secondary: {
      DEFAULT: '#00D4FF',      // 青色 - 科技感
      purple: '#A855F7',       // 紫色 - 高端感
    },
    
    // 文字色
    text: {
      DEFAULT: '#FFFFFF',      // 主文字
      secondary: '#A1A1AA',    // 次级文字
      muted: '#71717A',        // 弱化文字
      inverse: '#0A0A0A',      // 反色文字
    },
    
    // 边框
    border: {
      DEFAULT: '#27272A',      // 主边框
      light: '#3F3F46',        // 亮边框
      accent: '#D4FF00',       // 强调边框
    },
    
    // 渐变
    gradient: {
      hero: 'linear-gradient(135deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)',
      accent: 'linear-gradient(135deg, #D4FF00 0%, #B8E600 100%)',
      glow: 'radial-gradient(circle, rgba(212, 255, 0, 0.15) 0%, transparent 70%)',
    }
  }
}
```

**色彩心理学分析：**
- **深色背景 (#0A0A0A)**: 高端、专业、科技感，减少视觉疲劳
- **荧光绿 (#D4FF00)**: 活力、创新、醒目，高对比度确保可读性
- **青色 (#00D4FF)**: 补充色，用于数据和科技感元素

### 3.2 新字体方案

```css
/* 字体配置 */
@font-face {
  font-family: 'Inter Display';
  src: url('/fonts/InterDisplay-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: 'Inter Display';
  src: url('/fonts/InterDisplay-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}
```

```javascript
// tailwind.config.js 字体配置
{
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Inter Display', 'Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },
  fontSize: {
    // Hero标题 - 超大字号
    'hero': ['4.5rem', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '700' }],
    'hero-lg': ['5.5rem', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '700' }],
    
    // 大标题
    'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
    'display-sm': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
    
    // 标题层级
    'title': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
    'heading': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
    'subheading': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
    
    // 正文
    'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
    'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
    'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
    
    // 数据数字
    'metric': ['3rem', { lineHeight: '1.0', fontWeight: '700' }],
    'metric-lg': ['4rem', { lineHeight: '1.0', fontWeight: '700' }],
    
    // 小字
    'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
  }
}
```

### 3.3 首页重新布局

```
┌─────────────────────────────────────────────────────────────┐
│  NAVBAR (固定导航)                                           │
│  Logo | 产品 | 解决方案 | 定价 | 文档 | [登录] [Get Started] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HERO SECTION (全屏深色背景)                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │   "Every conversation counts"                       │   │
│  │   主标题: 56-72px, 荧光绿高亮关键词                    │   │
│  │                                                     │   │
│  │   副标题: 企业级AI语音助手，自然对话体验               │   │
│  │                                                     │   │
│  │   [Get Started →]  [Watch Demo ▶]                   │   │
│  │                                                     │   │
│  │   SOC 2  GDPR  HIPAA  ISO 27001                     │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [Agent Studio 界面截图 / 动态演示]                  │   │
│  │  - 对话界面展示                                      │   │
│  │  - 实时波形动画                                      │   │
│  │  - 3D悬浮效果                                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  METRICS SECTION (数据卡片)                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │   15pt   │ │  $7.2M   │ │   60%    │ │   75%    │       │
│  │   CSAT   │ │  revenue │ │ reduction│ │ resolved │       │
│  │  提升    │ │  节省    │ │  成本降低│ │  问题解决│       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SOCIAL PROOF (客户Logo墙)                                   │
│  Trusted by 500+ enterprise customers                       │
│  ┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐ │
│  │Logo││Logo││Logo││Logo││Logo││Logo││Logo││Logo│ │
│  └────┘└────┘└────┘└────┘└────┘└────┘└────┘└────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PRODUCT SHOWCASE (产品界面展示)                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Agent Studio - 可视化对话设计器                      │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │  [真实产品界面截图]                       │   │   │
│  │  │  - 对话流程图                            │   │   │
│  │  │  - 语音设置面板                          │   │   │
│  │  │  - 实时预览窗口                          │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CONVERSATION DEMO (对话式UI演示)                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │   场景: Banking Fraud Claim                      │   │
│  │                                                     │   │
│  │   ┌──────────────────────────────────────┐      │   │
│  │   │ AI: Hello, I noticed an unusual...   │      │   │
│  │   │                                      │      │   │
│  │   │ User: Yes, I didn't make that...    │      │   │
│  │   │                                      │      │   │
│  │   │ AI: I understand. Let me help...    │      │   │
│  │   └──────────────────────────────────────┘      │   │
│  │                                                     │   │
│  │   [播放按钮]  [文字切换: Healthcare/Retail]          │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  INDUSTRY SOLUTIONS (行业解决方案)                            │
│  ┌─────────────┬─────────────┬─────────────┐            │
│  │  BANKING   │ HEALTHCARE  │   RETAIL   │  标签导航   │
│  └─────────────┴─────────────┴─────────────┘            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Banking & Financial Services                       │   │
│  │                                                     │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐   │   │
│  │  │ 欺诈检测  │ │ 账户服务  │ │ 贷款咨询  │   │   │
│  │  │ [对话示例] │ │ [对话示例] │ │ [对话示例] │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  FEATURES (功能特性)                                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐     │
│  │    🎙️       │ │    🧠       │ │    ⚡       │     │
│  │ Natural      │ │ Contextual   │ │ Low        │     │
│  │ Conversations│ │ Understanding│ │ Latency    │     │
│  │              │ │              │ │ <500ms     │     │
│  └──────────────┘ └──────────────┘ └──────────────┘     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  TESTIMONIALS (客户案例)                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  "AI Voice Agent transformed our                  │   │
│  │   customer service operations..."                  │   │
│  │                                                     │   │
│  │  [Gordon Ramsay 头像]  Gordon Ramsay          │   │
│  │  Celebrity Chef & Restaurateur                   │   │
│  │                                                     │   │
│  │  客户Logo: [Morgan Stanley] [Sabadell] ...    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CTA SECTION (底部转化)                                      │
│  Ready to transform your customer conversations?              │
│  [Request Demo]  [Contact Sales]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.4 新增页面/模块建议

#### 新增模块

1. **Agent Studio 展示模块**
   - 产品界面截图轮播
   - 功能亮点标签
   - 交互式预览

2. **实时对话演示模块**
   - 多场景对话示例
   - 语音播放控制
   - 文字/语音切换

3. **行业解决方案详情页**
   - Banking: 欺诈检测、账户服务、贷款咨询
   - Healthcare: 预约管理、随访提醒、健康咨询
   - Retail: 订单查询、退换货、会员服务

4. **客户案例详情页**
   - 客户背景介绍
   - 面临挑战
   - 解决方案
   - 成果数据
   - 客户证言

5. **技术规格页面**
   - API文档入口
   - SDK下载
   - 性能指标
   - 安全合规

### 3.5 对话式UI演示设计

```typescript
// ConversationDemo 组件设计
interface ConversationDemoProps {
  scenarios: {
    id: string;
    title: string;
    icon: React.ReactNode;
    messages: {
      role: 'ai' | 'user';
      content: string;
      audio?: string;
    }[];
  }[];
}

// 视觉设计
const demoStyles = {
  container: 'bg-background-tertiary rounded-2xl border border-border',
  messageAI: 'bg-accent/10 border-l-4 border-accent',
  messageUser: 'bg-secondary/10 border-l-4 border-secondary',
  waveform: 'h-8 flex items-center gap-0.5',
  waveBar: 'w-1 bg-accent rounded-full animate-wave',
};
```

**交互设计：**
- 点击场景标签切换对话内容
- 播放按钮触发动画和音频
- 波形动画跟随语音节奏
- 文字逐字显示效果

### 3.6 客户案例展示方案

```typescript
// TestimonialCard 组件
interface TestimonialProps {
  quote: string;
  author: {
    name: string;
    title: string;
    company: string;
    avatar: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
  companyLogo: string;
}

// 展示形式
const testimonialLayout = {
  featured: '大卡片 + 名人头像 + 数据指标',
  carousel: '轮播展示多个客户',
  grid: '网格展示客户Logo',
};
```

---

## 四、实施优先级

### P0 - 核心改进（1-2周）

| 任务 | 工作量 | 影响 |
|------|--------|------|
| 更新配色方案为深色+荧光绿 | 2天 | 高 |
| 重新设计Hero区域 | 3天 | 高 |
| 添加真实产品界面截图 | 2天 | 高 |
| 替换客户Logo占位符 | 1天 | 高 |
| 添加对话式UI演示模块 | 3天 | 高 |

### P1 - 重要改进（2-3周）

| 任务 | 工作量 | 影响 |
|------|--------|------|
| 重新设计数据卡片 | 2天 | 中 |
| 优化CTA按钮样式 | 1天 | 中 |
| 添加行业标签导航 | 2天 | 中 |
| 优化字体层级 | 1天 | 中 |
| 添加客户案例详情页 | 3天 | 中 |

### P2 - 优化改进（3-4周）

| 任务 | 工作量 | 影响 |
|------|--------|------|
| 丰富动效和微交互 | 3天 | 低 |
| 添加Agent Studio展示 | 2天 | 低 |
| 优化移动端体验 | 2天 | 低 |
| 添加技术规格页面 | 2天 | 低 |
| 性能优化 | 2天 | 低 |

---

## 五、代码实现建议

### 5.1 Tailwind 配置更新

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 深色主题背景
        background: {
          DEFAULT: '#0A0A0A',
          secondary: '#111111',
          tertiary: '#1A1A1A',
          elevated: '#222222',
        },
        // 荧光绿强调色
        accent: {
          DEFAULT: '#D4FF00',
          light: '#E0FF33',
          dark: '#B8E600',
          glow: 'rgba(212, 255, 0, 0.3)',
        },
        // 辅助色
        secondary: {
          DEFAULT: '#00D4FF',
          purple: '#A855F7',
        },
        // 文字色
        foreground: {
          DEFAULT: '#FFFFFF',
          secondary: '#A1A1AA',
          muted: '#71717A',
        },
        // 边框
        border: {
          DEFAULT: '#27272A',
          light: '#3F3F46',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'hero-lg': ['5.5rem', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'metric': ['3rem', { lineHeight: '1.0' }],
        'metric-lg': ['4rem', { lineHeight: '1.0' }],
      },
      boxShadow: {
        'glow': '0 0 40px rgba(212, 255, 0, 0.3)',
        'glow-lg': '0 0 60px rgba(212, 255, 0, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'wave': 'wave 1.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.5)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 255, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 255, 0, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-glow': 'radial-gradient(circle, rgba(212, 255, 0, 0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}

export default config
```

### 5.2 组件结构建议

```
src/
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx           # 更新: 深色主题 + 荧光绿
│   │   ├── MetricsSection.tsx        # 新增: 数据卡片展示
│   │   ├── SocialProofSection.tsx    # 更新: 真实Logo
│   │   ├── ProductShowcase.tsx      # 新增: 产品界面展示
│   │   ├── ConversationDemo.tsx      # 新增: 对话式UI演示
│   │   ├── IndustrySolutions.tsx     # 更新: 标签导航
│   │   ├── FeaturesSection.tsx       # 更新: 新配色
│   │   ├── TestimonialsSection.tsx   # 更新: 名人代言
│   │   └── CTASection.tsx          # 更新: 新CTA样式
│   ├── ui/
│   │   ├── Button.tsx              # 更新: 荧光绿主题
│   │   ├── Card.tsx                # 更新: 深色主题
│   │   ├── MetricCard.tsx          # 新增: 数据卡片
│   │   ├── ConversationBubble.tsx    # 新增: 对话气泡
│   │   ├── Waveform.tsx            # 更新: 荧光绿波形
│   │   └── LogoWall.tsx            # 新增: Logo墙
│   └── layout/
│       ├── Navbar.tsx                # 更新: 深色主题
│       └── Footer.tsx                # 更新: 深色主题
├── pages/
│   ├── Home.tsx
│   ├── Product.tsx
│   ├── Solutions.tsx
│   ├── Pricing.tsx
│   ├── Customers.tsx               # 新增: 客户案例页
│   └── Docs.tsx
├── styles/
│   └── globals.css               # 更新: 深色主题变量
└── data/
    ├── metrics.ts
    ├── testimonials.ts
    └── conversations.ts          # 新增: 对话示例数据
```

### 5.3 关键组件代码示例

#### 新 HeroSection

```tsx
// components/sections/HeroSection.tsx
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-glow rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-hero lg:text-hero-lg font-bold text-foreground mb-6">
              Every{' '}
              <span className="text-accent">conversation</span>{' '}
              counts
            </h1>
            
            <p className="text-body-lg text-foreground-secondary mb-8 max-w-xl">
              Enterprise-grade AI voice agents that sound human, 
              understand context, and drive real results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="group px-8 py-4 bg-accent text-background font-semibold rounded-xl 
                               hover:bg-accent-light transition-all duration-300 
                               shadow-glow hover:shadow-glow-lg flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 border border-border text-foreground font-semibold 
                               rounded-xl hover:bg-background-tertiary transition-all duration-300
                               flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* 合规徽章 */}
            <div className="flex items-center gap-4">
              {['SOC 2', 'GDPR', 'HIPAA', 'ISO 27001'].map((badge) => (
                <span key={badge} className="px-3 py-1.5 bg-background-tertiary 
                                              border border-border rounded-lg text-caption 
                                              text-foreground-secondary">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 右侧产品展示 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* 产品截图占位 */}
              <div className="absolute inset-0 bg-background-tertiary rounded-2xl 
                            border border-border shadow-card overflow-hidden">
                <img 
                  src="/images/agent-studio.png" 
                  alt="Agent Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* 悬浮元素 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 
                          rounded-xl border border-accent/20 backdrop-blur-sm p-4"
              >
                <div className="text-metric font-bold text-accent">15pt</div>
                <div className="text-caption text-foreground-secondary">CSAT</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

#### MetricsSection 数据卡片

```tsx
// components/sections/MetricsSection.tsx
const metrics = [
  { value: '15pt', label: 'CSAT提升', suffix: '' },
  { value: '7.2M', label: 'revenue节省', suffix: '$' },
  { value: '60%', label: '成本降低', suffix: '' },
  { value: '75%', label: '问题解决率', suffix: '' },
]

export const MetricsSection = () => {
  return (
    <section className="py-16 bg-background-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-background-tertiary 
                        border border-border hover:border-accent/50 transition-colors"
            >
              <div className="text-metric lg:text-metric-lg font-bold text-accent mb-2">
                {metric.suffix}{metric.value}
              </div>
              <div className="text-body-sm text-foreground-secondary">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

#### ConversationDemo 对话演示

```tsx
// components/sections/ConversationDemo.tsx
const scenarios = [
  {
    id: 'banking',
    title: 'Banking',
    messages: [
      { role: 'ai', content: 'Hello, I noticed an unusual transaction on your account. Did you make a $500 purchase at Electronics Store?' },
      { role: 'user', content: 'No, I didn\'t make that purchase.' },
      { role: 'ai', content: 'I understand. Let me help you dispute this transaction and secure your account right away.' },
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    messages: [
      { role: 'ai', content: 'Hi, this is City Hospital calling to confirm your appointment tomorrow at 2 PM with Dr. Smith.' },
      { role: 'user', content: 'Yes, I\'ll be there.' },
      { role: 'ai', content: 'Perfect. Please arrive 15 minutes early for check-in. Is there anything else I can help you with?' },
    ]
  },
]

export const ConversationDemo = () => {
  const [activeScenario, setActiveScenario] = useState(scenarios[0])
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-display font-bold text-foreground mb-4">
            Hear it in action
          </h2>
          <p className="text-body-lg text-foreground-secondary">
            Experience natural conversations across industries
          </p>
        </div>

        {/* 场景标签 */}
        <div className="flex justify-center gap-4 mb-8">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario)}
              className={`px-6 py-3 rounded-xl font-medium transition-all
                ${activeScenario.id === scenario.id 
                  ? 'bg-accent text-background' 
                  : 'bg-background-tertiary text-foreground-secondary hover:text-foreground'}`}
            >
              {scenario.title}
            </button>
          ))}
        </div>

        {/* 对话展示 */}
        <div className="max-w-2xl mx-auto bg-background-tertiary rounded-2xl 
                      border border-border p-8">
          {activeScenario.messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.role === 'ai' ? 'mr-12' : 'ml-12'}`}
            >
              <div className={`p-4 rounded-xl ${
                message.role === 'ai' 
                  ? 'bg-accent/10 border-l-4 border-accent' 
                  : 'bg-secondary/10 border-l-4 border-secondary'
              }`}>
                <p className="text-body text-foreground">{message.content}</p>
              </div>
            </div>
          ))}

          {/* 播放控制 */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-accent flex items-center justify-center
                        hover:bg-accent-light transition-colors shadow-glow"
            >
              {isPlaying ? <Pause className="w-6 h-6 text-background" /> 
                        : <Play className="w-6 h-6 text-background ml-1" />}
            </button>
            
            {/* 波形动画 */}
            <div className="flex items-center gap-1 h-8">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-accent rounded-full"
                  animate={{
                    height: isPlaying ? [8, 24 + Math.random() * 16, 8] : 8,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## 六、总结

### 核心改进点

1. **配色升级**: 从浅蓝色主题 → 深色主题 + 荧光绿强调色
2. **Hero重设计**: 更大标题、更强视觉冲击、真实产品展示
3. **数据卡片**: 大数字 + 荧光色强调，突出核心价值
4. **对话演示**: 新增交互式对话UI展示模块
5. **客户证明**: 真实Logo墙 + 名人代言 + 数据指标
6. **行业方案**: 标签导航 + 场景化展示

### 预期效果

- **品牌感知**: 从"普通SaaS"升级为"高端企业级AI平台"
- **转化率**: 通过更强的CTA和数据展示提升转化
- **专业度**: 真实产品界面和对话演示建立信任
- **差异化**: 独特的深色+荧光绿配色形成品牌记忆点

### 下一步行动

1. **立即执行**: 更新Tailwind配置和全局样式
2. **本周完成**: HeroSection和MetricsSection重设计
3. **下周完成**: 对话演示模块和客户Logo墙
4. **持续优化**: 根据数据反馈调整细节

---

*设计方案完成日期: 2026-04-01*
