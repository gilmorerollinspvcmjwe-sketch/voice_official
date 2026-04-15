# AI Voice Agent 官网更新计划

> 整合 Gladia/Rox/PolyAI/Kore.ai 设计分析
> 生成日期：2026-04-01
> 执行周期：4-6 周

---

## 一、执行摘要

### 核心改进方向

| 维度 | 当前状态 | 目标状态 | 改进效果 |
|------|---------|---------|---------|
| **配色** | 浅蓝色主题 #0A2540 | 深色主题 + 紫蓝渐变 + 金色点缀 | 科技感 + 高端商务感 |
| **Hero** | 渐变背景 + 波形动画 | 左右分栏 + 3D产品展示 | 视觉冲击力 + 产品直观展示 |
| **数据展示** | 6个简单卡片 | 大数字 + 荧光色强调 | 突出核心价值指标 |
| **产品展示** | 抽象波形动画 | 真实产品界面截图 + 对话Demo | 增强信任感 |
| **社会证明** | Placeholder占位符 | 真实Logo墙 + 客户案例 | 建立企业级形象 |
| **特效** | 基础fade-in-up | 金属文字 + 粒子背景 + 轮播 | 精致高端体验 |

### 预期业务效果

- 首页跳出率降低 **20%**
- 免费试用转化率提升 **30%**
- 页面停留时间增加 **40%**
- 企业客户询盘量提升 **50%**

---

## 二、设计系统规范

### 2.1 最终配色方案（冲突解决）

**决策逻辑**：
- **PolyAI 荧光绿 vs Gladia/Rox 紫蓝** → 选择融合方案：紫蓝渐变为主色调（AI科技感），荧光绿为数据强调色（高对比度）
- **Rox 金色 vs PolyAI 荧光绿** → 金色用于CTA按钮和高端点缀（商务感），荧光绿用于数据卡片（醒目）

#### 主色调（Primary Colors）

```css
/* 深色背景系统 - 融合 Gladia + Rox */
--bg-primary: #0A0A0F;        /* 主背景 - 深邃黑 */
--bg-secondary: #12121A;      /* 次级背景 - 深蓝黑 */
--bg-card: #1A1A24;           /* 卡片背景 - 柔和黑 */
--bg-elevated: #22222E;       /* 悬浮背景 - 浅黑 */
--bg-hover: #2A2A36;          /* 悬浮状态 */

/* 文字颜色 */
--text-primary: #FFFFFF;      /* 主文字 - 纯白 */
--text-secondary: #A0A0B0;    /* 次级文字 - 灰蓝 */
--text-muted: #6A6A7A;        /* 弱化文字 - 深灰 */
--text-inverse: #0A0A0F;      /* 反色文字 */
```

#### 强调色（Accent Colors）- 融合方案

```css
/* 紫蓝渐变 - AI 科技感（主色调） */
--accent-purple: #8B5CF6;     /* 紫色 - Gladia */
--accent-blue: #3B82F6;       /* 蓝色 */
--accent-cyan: #06B6D4;       /* 青色 */

/* 荧光绿 - 数据强调色（PolyAI 参考） */
--accent-green: #D4FF00;      /* 荧光绿 - PolyAI */
--accent-green-light: #E0FF33;
--accent-green-dark: #B8E600;

/* 金色系统 - CTA 按钮（Rox 参考） */
--gold-primary: #D4A574;      /* 温暖金 */
--gold-light: #E8C9A0;        /* 高光 */
--gold-dark: #B8935F;         /* 阴影 */

/* 渐变定义 */
--gradient-primary: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%);
--gradient-gold: linear-gradient(135deg, #D4A574 0%, #E8C9A0 50%, #D4A574 100%);
--gradient-hero: radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
--gradient-glow: radial-gradient(circle, rgba(212, 255, 0, 0.15) 0%, transparent 70%);
```

#### 功能色

```css
--success: #10B981;           /* 成功 - 翠绿 */
--warning: #F59E0B;           /* 警告 - 琥珀 */
--error: #EF4444;             /* 错误 - 红色 */
--info: #3B82F6;              /* 信息 - 蓝色 */
```

#### 色彩使用场景

| 场景 | 颜色选择 | 原因 |
|------|---------|------|
| Hero 主标题关键词高亮 | 紫蓝渐变 | AI 科技感，品牌识别 |
| CTA 主按钮 | 金色渐变 | 高端商务感，转化引导 |
| 数据大数字 | 荧光绿 #D4FF00 | 高对比度，醒目 |
| 产品界面边框光效 | 紫蓝渐变光晕 | 科技感 |
| 客户案例卡片边框 | 金色 #D4A574 | 高端感 |

### 2.2 字体系统

#### 字体家族

```css
/* 英文 - Inter（现代几何感） */
--font-heading-en: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
--font-body-en: 'Inter', 'SF Pro Text', -apple-system, sans-serif;

/* 中文 - PingFang SC */
--font-heading-zh: 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif;
--font-body-zh: 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif;

/* 代码/技术字体 */
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
```

#### 字号层级（Type Scale）

```css
/* Hero 标题 - 超大字号 */
--text-hero: clamp(3rem, 8vw, 5rem);    /* 48-80px */
--text-hero-line-height: 1.0;
--text-hero-weight: 600;
--text-hero-letter-spacing: -0.02em;

/* H1 标题 */
--text-h1: clamp(2.5rem, 5vw, 3.5rem);  /* 40-56px */
--text-h1-line-height: 1.1;
--text-h1-weight: 600;

/* H2 标题 - 区块标题 */
--text-h2: clamp(1.75rem, 3vw, 2.5rem); /* 28-40px */
--text-h2-line-height: 1.2;
--text-h2-weight: 600;

/* H3 标题 - 子标题 */
--text-h3: 1.5rem;                      /* 24px */
--text-h3-line-height: 1.3;
--text-h3-weight: 600;

/* H4 标题 - 卡片标题 */
--text-h4: 1.25rem;                     /* 20px */
--text-h4-line-height: 1.4;
--text-h4-weight: 600;

/* 正文 */
--text-body-lg: 1.125rem;               /* 18px */
--text-body-lg-line-height: 1.6;
--text-body: 1rem;                      /* 16px */
--text-body-line-height: 1.6;
--text-body-sm: 0.875rem;               /* 14px */
--text-body-sm-line-height: 1.5;

/* 数据数字 - 特殊 */
--text-metric: 3rem;                    /* 48px */
--text-metric-lg: 4rem;                 /* 64px */
--text-metric-weight: 700;

/* 标签文字 */
--text-caption: 0.75rem;                /* 12px */
--text-caption-line-height: 1.5;
--text-caption-weight: 500;
```

#### 字重使用规范

| 字重 | 数值 | 使用场景 |
|------|------|---------|
| Light | 300 | 辅助说明 |
| Normal | 400 | 正文 |
| Medium | 500 | 强调文字 |
| Semibold | 600 | 标题、副标题 |
| Bold | 700 | Hero 标题、数据数字 |

### 2.3 间距系统

```css
/* 8px 基准间距 */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */

/* 区块间距 */
--section-padding-y: 8rem;      /* 128px 上下内边距 */
--section-gap: 6rem;            /* 96px 区块间距 */
--hero-padding-top: 10rem;      /* 160px Hero顶部 */
```

### 2.4 响应式断点

```css
--breakpoint-sm: 640px;         /* 手机横屏 */
--breakpoint-md: 768px;         /* 平板 */
--breakpoint-lg: 1024px;        /* 小桌面 */
--breakpoint-xl: 1280px;        /* 桌面 */
--breakpoint-2xl: 1536px;       /* 大桌面 */
```

### 2.5 布局决策（冲突解决）

**决策：Hero 区域左右分栏，其他区域按内容灵活布局**

| 区域 | 布局方式 | 原因 |
|------|---------|------|
| Hero | 左右分栏（左文右图） | 参考 Rox，平衡文字与视觉展示 |
| 数据卡片 | 居中网格（4列） | PolyAI 风格，对称展示核心指标 |
| 6大能力 | 居中网格（3x2） | Gladia 建议，清晰展示技术能力 |
| 应用场景 | 标签切换 + 网格 | Kore.ai 风格，按分类展示 |
| 客户案例 | 左右分栏或大卡片 | Rox 风格，突出社会证明 |
| 定价 | 居中三栏对比 | Rox 风格，清晰对比方案 |

---

## 三、分阶段更新计划

### Phase 1: 基础改造（P0，1-2周）

**目标：建立设计系统基础，刷新品牌视觉**

#### 1.1 配色系统更新（工时：4h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 更新 Tailwind 配置 | 添加完整配色变量 | 待执行 |
| [ ] 更新 globals.css | 定义 CSS 变量 | 待执行 |
| [ ] 替换现有组件颜色 | 统一使用新配色 | 待执行 |
| [ ] 添加渐变定义 | 紫蓝渐变、金色渐变 | 待执行 |

**Tailwind 配置更新代码**：
```javascript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      background: {
        DEFAULT: '#0A0A0F',
        primary: '#0A0A0F',
        secondary: '#12121A',
        card: '#1A1A24',
        elevated: '#22222E',
      },
      foreground: {
        DEFAULT: '#FFFFFF',
        primary: '#FFFFFF',
        secondary: '#A0A0B0',
        muted: '#6A6A7A',
      },
      accent: {
        purple: '#8B5CF6',
        blue: '#3B82F6',
        cyan: '#06B6D4',
        green: '#D4FF00',
      },
      gold: {
        DEFAULT: '#D4A574',
        light: '#E8C9A0',
        dark: '#B8935F',
      },
    },
    backgroundImage: {
      'gradient-primary': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)',
      'gradient-gold': 'linear-gradient(135deg, #D4A574 0%, #E8C9A0 50%, #D4A574 100%)',
      'gradient-hero': 'radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
    },
  },
}
```

#### 1.2 字体系统更新（工时：2h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 配置 Inter 字体 | 加载 Google Fonts 或本地字体 | 待执行 |
| [ ] 配置 PingFang SC | 中文适配 | 待执行 |
| [ ] 更新 Tailwind 字体配置 | 字号、字重、行高 | 待执行 |
| [ ] 替换现有组件字体 | 统一字体使用 | 待执行 |

#### 1.3 Hero 区域重设计（工时：8h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 实现左右分栏布局 | 左文右图，45%:55% | 待执行 |
| [ ] 更新主标题样式 | 超大字号 + 紫蓝渐变关键词 | 待执行 |
| [ ] 更新副标题样式 | 灰色，18px | 待执行 |
| [ ] 更新 CTA 按钮 | 金色主按钮 + 描边次按钮 | 待执行 |
| [ ] 添加背景光效 | 紫蓝光晕渐变 | 待执行 |
| [ ] 产品截图展示 | 3D透视效果 + 金色边框光晕 | 待执行 |

**Hero 布局结构**：
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────────┐  ┌──────────────────────────────────┐│
│  │                  │  │                                  ││
│  │  AI Voice Agent  │  │    ┌────────────────────────┐    ││
│  │                  │  │    │                        │    ││
│  │  [紫蓝渐变高亮]   │  │    │   产品界面截图          │    ││
│  │  拟人化语音对话   │  │    │   (3D透视效果)         │    ││
│  │  智能体平台      │  │    │   金色边框光晕          │    ││
│  │                  │  │    │                        │    ││
│  │  副标题...       │  │    └────────────────────────┘    ││
│  │                  │  │                                  ││
│  │  [金色CTA] [描边]│  │                                  ││
│  │                  │  │                                  ││
│  │  信任指标        │  │                                  ││
│  │  500+ | 99.9%    │  │                                  ││
│  └──────────────────┘  └──────────────────────────────────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 1.4 导航栏优化（工时：4h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 固定顶部设计 | 滚动时保持可见 | 待执行 |
| [ ] 透明 → 深色过渡 | Hero 区域透明，滚动后变深色 | 待执行 |
| [ ] 更新导航链接样式 | 悬浮变色效果 | 待执行 |
| [ ] 更新 CTA 按钮 | 金色"免费开始"按钮 | 待执行 |
| [ ] 移动端汉堡菜单 | 全屏覆盖式菜单 | 待执行 |

---

### Phase 2: 内容增强（P1，2-3周）

**目标：增强内容展示，建立信任感**

#### 2.1 数据卡片展示（工时：6h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 设计数据卡片组件 | 大数字 + 荧光绿强调 | 待执行 |
| [ ] 实现 4 列网格布局 | 居中对称展示 | 待执行 |
| [ ] 添加数据指标 | CSAT提升、成本降低等 | 待执行 |
| [ ] 悬浮动效 | 边框光晕效果 | 待执行 |

**数据指标设计**：
```
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│            │ │            │ │            │ │            │
│   15pt     │ │   $7.2M    │ │    60%     │ │    75%     │
│  (荧光绿)   │ │  (荧光绿)   │ │  (荧光绿)   │ │  (荧光绿)   │
│            │ │            │ │            │ │            │
│  CSAT提升   │ │  revenue   │ │  成本降低   │ │  问题解决   │
│            │ │  节省      │ │            │ │  率        │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
```

#### 2.2 客户案例模块（工时：8h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 设计案例卡片组件 | 参考 Rox Bynder 案例 | 待执行 |
| [ ] 左侧标签设计 | "CASE STUDY" 金色大写 | 待执行 |
| [ ] 客户证言设计 | 引号装饰 + 金色边框 | 待执行 |
| [ ] 人物信息展示 | 头像 + 姓名 + 职位 | 待执行 |
| [ ] 场景照片展示 | 暖色调商务场景 | 待执行 |
| [ ] 数据指标展示 | 转化率提升等 | 待执行 |

**客户案例结构**：
```
┌─────────────────────────────────────────────────────────────┐
│  CASE STUDY                                                 │
│  某知名企业如何通过 AI Voice Agent 提升 40% 转化率           │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ "                                                     │  │
│  │  使用 AI Voice Agent 后，我们的客服效率提升了 3 倍... │  │
│  │  "                                                     │  │
│  │                                                       │  │
│  │  [头像] 张经理, 客户成功总监, 某知名电商               │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              [客户场景照片]                          │    │
│  │              暖色调，办公环境                         │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

#### 2.3 产品界面展示（工时：6h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 设计产品展示区域 | 居中大图展示 | 待执行 |
| [ ] 3D 透视效果 | rotateY: -5deg | 待执行 |
| [ ] 金色边框光晕 | box-shadow 发光效果 | 待执行 |
| [ ] 悬浮恢复平面 | hover 时恢复正视角 | 待执行 |
| [ ] 功能亮点标签 | 产品特性标注 | 待执行 |

#### 2.4 对话演示模块（工时：8h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 设计对话气泡组件 | AI左侧金色，用户右侧灰色 | 待执行 |
| [ ] 场景标签切换 | Banking / Healthcare / Retail | 待执行 |
| [ ] 波形动画展示 | 播放时显示波形 | 待执行 |
| [ ] 播放控制按钮 | 金色圆形播放按钮 | 待执行 |
| [ ] 对话内容数据 | 多场景对话示例 | 待执行 |

**对话演示结构**：
```
┌─────────────────────────────────────────────────────────────┐
│  Hear it in action                                          │
│                                                             │
│  [Banking] [Healthcare] [Retail]  ← 标签切换                │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │  AI: Hello, I noticed an unusual transaction...      │  │
│  │  (金色左边框)                                          │  │
│  │                                                       │  │
│  │  User: No, I didn't make that purchase.              │  │
│  │  (灰色左边框)                                          │  │
│  │                                                       │  │
│  │  AI: I understand. Let me help you secure...         │  │
│  │  (金色左边框)                                          │  │
│  │                                                       │  │
│  │  [▶ 播放按钮]  [波形动画 ████████]                    │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

### Phase 3: 特效集成（P2，3-4周）

**目标：集成已完成的特效组件，提升视觉体验**

#### 3.1 金属文字效果（工时：4h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 导入 GradientText 组件 | 使用已完成的特效组件 | 待执行 |
| [ ] Hero 标题应用 | 主标题关键词渐变 | 待执行 |
| [ ] 区块标题应用 | H2 标题可选渐变 | 待执行 |
| [ ] 数据数字应用 | 大数字金属质感 | 待执行 |

**使用示例**：
```tsx
// Hero 标题
<GradientText metallic={true} direction="diagonal">
  AI Voice Agent
</GradientText>

// 数据数字
<GradientText colors={['#D4FF00', '#00FF88', '#00D4FF', '#D4FF00']}>
  15pt
</GradientText>
```

#### 3.2 粒子背景（工时：4h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 导入 ParticleBackground 组件 | 使用已完成的特效组件 | 待执行 |
| [ ] Hero 区域应用 | 粒子 + 连线效果 | 待执行 |
| [ ] CTA 区域应用 | 背景粒子点缀 | 待执行 |
| [ ] 配置粒子颜色 | 紫蓝/荧光绿粒子 | 待执行 |

**使用示例**：
```tsx
// Hero 区域粒子背景
<ParticleBackground
  particleCount={50}
  particleColor="#8B5CF6"
  connectionDistance={150}
  mouseInteraction={true}
/>

// CTA 区域粒子背景
<ParticleBackground
  particleCount={30}
  particleColor="#D4FF00"
  connectionDistance={100}
/>
```

#### 3.3 Logo 轮播组件（工时：4h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 导入 InfiniteCarousel 组件 | 使用已完成的特效组件 | 待执行 |
| [ ] 客户 Logo 墙应用 | 无限滚动展示 | 待执行 |
| [ ] Logo 灰度处理 | 默认灰度，悬浮彩色 | 待执行 |
| [ ] 配置滚动速度 | 40px/s，悬浮暂停 | 待执行 |

**使用示例**：
```tsx
// Logo 轮播
<LogoCarousel
  logos={[
    { id: '1', name: 'Company A', logo: <LogoA /> },
    { id: '2', name: 'Company B', logo: <LogoB /> },
    // ...
  ]}
/>
```

#### 3.4 横向滚动展示（工时：6h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 导入 HorizontalScroll 组件 | 使用已完成的特效组件 | 待执行 |
| [ ] 功能特性展示应用 | 横向滚动展示 6 大能力 | 待执行 |
| [ ] 进度指示器 | 底部进度条 | 待执行 |
| [ ] 导航点 | 可点击跳转 | 待执行 |

**使用示例**：
```tsx
// 功能特性横向滚动
<HorizontalScroll
  showProgress={true}
  showDots={true}
  containerHeight="300vh"
>
  <FeatureCard icon={<Icon1 />} title="拟人对话" description="..." />
  <FeatureCard icon={<Icon2 />} title="实时响应" description="..." />
  <FeatureCard icon={<Icon3 />} title="智能打断" description="..." />
  {/* ... */}
</HorizontalScroll>
```

---

### Phase 4: 优化完善（P3，4-6周）

**目标：细节优化，完善用户体验**

#### 4.1 动效优化（工时：8h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 入场动画统一 | fadeInUp，延迟 0.1s 递增 | 待执行 |
| [ ] 悬浮效果细化 | scale + shadow + border | 待执行 |
| [ ] 点击反馈动效 | 按钮点击缩放 | 待执行 |
| [ ] 页面过渡动画 | 路由切换动画 | 待执行 |
| [ ] 波形动画优化 | 语音波形跟随节奏 | 待执行 |
| [ ] 光晕脉冲效果 | CTA 按钮光晕呼吸 | 待执行 |

#### 4.2 响应式适配（工时：8h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 移动端 Hero 布局 | 单列，产品图在上 | 待执行 |
| [ ] 移动端数据卡片 | 2x2 网格 | 待执行 |
| [ ] 移动端导航菜单 | 汉堡菜单，全屏覆盖 | 待执行 |
| [ ] 移动端对话演示 | 单列展示 | 待执行 |
| [ ] 移动端定价卡片 | 单列滑动 | 待执行 |
| [ ] 移动端 Footer | 折叠式链接 | 待执行 |

#### 4.3 性能优化（工时：6h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 图片懒加载 | Next.js Image 组件 | 待执行 |
| [ ] 字体预加载 | preload 关键字体 | 待执行 |
| [ ] CSS 优化 | 移除未使用的样式 | 待执行 |
| [ ] JavaScript 优化 | 代码分割，动态导入 | 待执行 |
| [ ] 动画性能 | will-change 优化 | 待执行 |
| [ ] 缓存策略 | 静态资源缓存 | 待执行 |

#### 4.4 多语言完善（工时：4h）

| 任务 | 说明 | 状态 |
|------|------|------|
| [ ] 中英文切换按钮 | 导航栏语言切换 | 待执行 |
| [ ] 中文内容完善 | 翻译所有英文内容 | 待执行 |
| [ ] 字体适配 | 中英文字体切换 | 待执行 |
| [ ] SEO 多语言 | hreflang 标签 | 待执行 |

---

## 四、组件使用指南

### 4.1 GradientText（金属流动文字）

**用途**：Hero 标题关键词高亮、数据大数字展示

**Props**：
```typescript
interface GradientTextProps {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical' | 'diagonal'  // 渐变方向
  speed?: number                                      // 动画速度（秒）
  animated?: boolean                                  // 是否启用动画
  colors?: string[]                                   // 自定义渐变颜色
  metallic?: boolean                                  // 金属质感
}
```

**使用示例**：
```tsx
// Hero 主标题关键词
<h1 className="text-hero">
  <GradientText metallic={true} direction="diagonal" speed={4}>
    AI Voice Agent
  </GradientText>
  拟人化语音对话智能体平台
</h1>

// 数据大数字
<div className="text-metric">
  <GradientText colors={['#D4FF00', '#00FF88', '#00D4FF']} animated={true}>
    15pt
  </GradientText>
</div>

// Shimmer 效果（可选）
<ShimmerText shimmerColor="#D4FF00" baseColor="#FFFFFF">
  Every conversation counts
</ShimmerText>
```

### 4.2 ParticleBackground（粒子背景）

**用途**：Hero 区域背景、CTA 区域背景点缀

**Props**：
```typescript
interface ParticleBackgroundProps {
  particleCount?: number          // 粒子数量，默认 50
  particleColor?: string          // 粒子颜色，默认 #D4FF00
  connectionDistance?: number     // 连线距离，默认 150
  mouseInteraction?: boolean      // 鼠标交互，默认 true
  mouseRadius?: number            // 鼠标影响半径，默认 200
  speed?: number                  // 粒子速度，默认 0.5
}
```

**使用示例**：
```tsx
// Hero 区域紫蓝粒子背景
<section className="relative min-h-screen overflow-hidden">
  <ParticleBackground
    particleCount={50}
    particleColor="#8B5CF6"
    connectionDistance={150}
    mouseInteraction={true}
    mouseRadius={200}
    speed={0.5}
  />
  
  {/* Hero 内容 */}
  <div className="relative z-10">
    {/* ... */}
  </div>
</section>

// CTA 区域荧光绿粒子背景
<section className="relative py-24 overflow-hidden">
  <ParticleBackground
    particleCount={30}
    particleColor="#D4FF00"
    connectionDistance={100}
    mouseInteraction={false}
  />
  
  {/* CTA 内容 */}
</section>

// 语音波形背景（可选）
<VoiceWaveBackground
  barCount={50}
  color="#D4FF00"
  maxHeight={200}
/>
```

### 4.3 InfiniteCarousel（无限轮播）

**用途**：客户 Logo 墙、客户评价轮播

**Props**：
```typescript
interface InfiniteCarouselProps {
  items: CarouselItem[]            // 轮播项目
  direction?: 'left' | 'right'     // 滚动方向
  speed?: number                   // 滚动速度（px/s）
  pauseOnHover?: boolean           // 悬浮暂停
  showArrows?: boolean             // 显示箭头
  showIndicators?: boolean         // 显示指示器
  gap?: number                     // 项目间距
}
```

**使用示例**：
```tsx
// Logo 轮播
<LogoCarousel
  logos={[
    { id: 'company-a', name: 'Company A', logo: <CompanyALogo /> },
    { id: 'company-b', name: 'Company B', logo: <CompanyBLogo /> },
    { id: 'company-c', name: 'Company C', logo: <CompanyCLogo /> },
    // ...
  ]}
/>

// 客户评价轮播
<TestimonialCarousel
  testimonials={[
    {
      id: '1',
      quote: '使用 AI Voice Agent 后，效率提升了 3 倍...',
      author: '张经理',
      role: '客户成功总监',
      company: '某知名电商',
      avatar: '/avatars/avatar1.jpg',
    },
    // ...
  ]}
/>

// 自定义轮播
<InfiniteCarousel
  items={[
    { id: '1', content: <FeatureCard /> },
    { id: '2', content: <FeatureCard /> },
    // ...
  ]}
  direction="left"
  speed={40}
  pauseOnHover={true}
  gap={48}
/>
```

### 4.4 HorizontalScroll（横向滚动）

**用途**：功能特性横向展示、产品案例横向展示

**Props**：
```typescript
interface HorizontalScrollProps {
  children: React.ReactNode[]      // 滚动内容
  itemWidth?: string | number      // 项目宽度
  containerHeight?: string         // 容器高度
  showProgress?: boolean           // 显示进度条
  showDots?: boolean               // 显示导航点
  respectReducedMotion?: boolean   // 尊重减弱动画偏好
}
```

**使用示例**：
```tsx
// 功能特性横向滚动展示
<HorizontalScroll
  showProgress={true}
  showDots={true}
  containerHeight="300vh"
>
  <FeatureCard
    icon={<MicIcon />}
    title="拟人对话"
    description="自然流畅的对话体验，支持打断和上下文记忆"
  />
  <FeatureCard
    icon={<ZapIcon />}
    title="实时响应"
    description="<200ms 响应延迟，毫秒级语音识别和合成"
  />
  <FeatureCard
    icon={<BrainIcon />}
    title="智能打断"
    description="支持用户随时打断，AI 智能响应"
  />
  {/* ... 更多功能 */}
</HorizontalScroll>

// 产品案例横向展示
<HorizontalScroll
  showProgress={true}
  itemWidth="80vw"
  containerHeight="200vh"
>
  <CaseStudyCard case={caseStudy1} />
  <CaseStudyCard case={caseStudy2} />
  <CaseStudyCard case={caseStudy3} />
</HorizontalScroll>
```

---

## 五、实施 Checklist

### Phase 1: 基础改造（P0）

#### 配色系统
- [ ] 更新 tailwind.config.ts 配色变量
- [ ] 更新 globals.css CSS 变量
- [ ] 替换所有组件中的硬编码颜色
- [ ] 添加渐变定义（紫蓝、金色、荧光绿）
- [ ] 测试配色在不同设备上的显示效果

#### 字体系统
- [ ] 配置 Inter 字体加载（Google Fonts 或本地）
- [ ] 配置 PingFang SC 中文字体
- [ ] 更新 Tailwind fontSize 配置
- [ ] 替换现有组件字号和字重
- [ ] 测试中英文混排效果

#### Hero 区域
- [ ] 实现左右分栏布局（Grid 2列）
- [ ] 主标题超大字号 + 紫蓝渐变关键词
- [ ] 副标题灰色 18px 样式
- [ ] 金色 CTA 主按钮 + 描边次按钮
- [ ] 紫蓝光晕背景渐变
- [ ] 产品截图 3D 透视效果
- [ ] 金色边框光晕效果
- [ ] 信任指标展示（500+ / 99.9% / <200ms）

#### 导航栏
- [ ] 固定顶部设计
- [ ] Hero 区域透明 → 滚动后深色
- [ ] 导航链接悬浮变色
- [ ] 金色"免费开始"按钮
- [ ] 移动端汉堡菜单

### Phase 2: 内容增强（P1）

#### 数据卡片
- [ ] 设计数据卡片组件（MetricCard）
- [ ] 大数字 48px + 荧光绿强调
- [ ] 4 列居中网格布局
- [ ] 悬浮边框光晕动效
- [ ] 配置数据指标内容

#### 客户案例
- [ ] 设计案例卡片组件（CaseStudyCard）
- [ ] "CASE STUDY" 金色标签
- [ ] 客户证言引号装饰
- [ ] 金色左边框设计
- [ ] 人物信息展示（头像 + 姓名 + 职位）
- [ ] 场景照片暖色调处理
- [ ] 数据指标展示

#### 产品界面展示
- [ ] 设计产品展示区域
- [ ] 3D 透视效果（rotateY: -5deg）
- [ ] 金色边框光晕（box-shadow）
- [ ] 悬浮恢复平面效果
- [ ] 功能亮点标签标注

#### 对话演示
- [ ] 设计对话气泡组件（ConversationBubble）
- [ ] AI 消息金色左边框
- [ ] 用户消息灰色左边框
- [ ] 场景标签切换（Banking / Healthcare / Retail）
- [ ] 波形动画展示
- [ ] 金色圆形播放按钮
- [ ] 对话内容数据配置

### Phase 3: 特效集成（P2）

#### 金属文字效果
- [ ] 导入 GradientText 组件
- [ ] Hero 标题关键词应用
- [ ] 区块标题可选应用
- [ ] 数据数字金属质感应用

#### 粒子背景
- [ ] 导入 ParticleBackground 组件
- [ ] Hero 区域紫蓝粒子背景
- [ ] CTA 区域荧光绿粒子背景
- [ ] 配置粒子颜色和连线距离

#### Logo 轮播
- [ ] 导入 InfiniteCarousel 组件
- [ ] 客户 Logo 墙无限滚动
- [ ] Logo 灰度 → 悬浮彩色
- [ ] 配置滚动速度和悬浮暂停

#### 横向滚动
- [ ] 导入 HorizontalScroll 组件
- [ ] 功能特性横向滚动展示
- [ ] 进度指示器
- [ ] 导航点点击跳转

### Phase 4: 优化完善（P3）

#### 动效优化
- [ ] 入场动画统一（fadeInUp）
- [ ] 悬浮效果细化
- [ ] 点击反馈动效
- [ ] 页面过渡动画
- [ ] 波形动画优化
- [ ] 光晕脉冲效果

#### 响应式适配
- [ ] 移动端 Hero 单列布局
- [ ] 移动端数据卡片 2x2 网格
- [ ] 移动端汉堡菜单
- [ ] 移动端对话演示单列
- [ ] 移动端定价卡片单列
- [ ] 移动端 Footer 折叠

#### 性能优化
- [ ] 图片懒加载（Next.js Image）
- [ ] 字体预加载
- [ ] CSS 未使用样式移除
- [ ] JavaScript 代码分割
- [ ] 动画 will-change 优化
- [ ] 静态资源缓存策略

#### 多语言完善
- [ ] 中英文切换按钮
- [ ] 中文内容翻译
- [ ] 中英文字体适配
- [ ] SEO hreflang 标签

---

## 六、风险与注意事项

### 6.1 技术风险

| 风险 | 影响 | 解决方案 |
|------|------|---------|
| 粒子背景性能问题 | 低端设备卡顿 | 提供减弱动画 fallback，检测设备性能 |
| 3D 透视兼容性 | 旧浏览器不支持 | 提供 fallback 平面展示 |
| 字体加载延迟 | 首屏文字闪烁 | 使用 font-display: swap，预加载关键字体 |
| 横向滚动冲突 | 鼠标滚轮冲突 | 仅在特定区域启用，提供导航点跳转 |

### 6.2 设计风险

| 风险 | 影响 | 解决方案 |
|------|------|---------|
| 荧光绿过亮刺眼 | 视觉疲劳 | 仅用于数据数字，控制使用范围 |
| 深色背景压抑 | 用户体验下降 | 添加光效渐变，保持呼吸感 |
| 左右分栏移动端问题 | 布局混乱 | 移动端单列，产品图在上 |
| 动效过多干扰 | 分散注意力 | 控制动效频率，仅关键区域使用 |

### 6.3 内容风险

| 风险 | 影响 | 解决方案 |
|------|------|---------|
| 客户 Logo 缺失 | 社会证明不足 | 先使用行业代表性 Logo，后续补充真实客户 |
| 客户证言缺失 | 信任感不足 | 先使用模拟内容，标注"示例" |
| 对话 Demo 数据缺失 | 展示不完整 | 先使用预设对话示例，后续补充真实案例 |
| 产品截图缺失 | 产品展示不足 | 先使用设计稿，后续补充真实界面 |

### 6.4 实施注意事项

1. **优先级执行**：严格按照 P0 → P1 → P2 → P3 顺序执行
2. **渐进发布**：每个 Phase 完成后发布测试，收集反馈
3. **AB 测试**：关键改动（如配色、CTA）建议进行 A/B 测试
4. **数据监控**：关注跳出率、转化率、停留时间等指标
5. **用户反馈**：收集用户对新设计的反馈，及时调整
6. **性能测试**：发布前测试低端设备和移动端性能
7. **兼容性测试**：测试主流浏览器和设备兼容性

---

## 七、附录

### 7.1 参考设计来源

| 来源 | 核心借鉴 | 应用场景 |
|------|---------|---------|
| **Gladia** | 紫蓝渐变 + 产品居中展示 | Hero 配色、产品展示 |
| **Rox** | 金色系统 + 左右分栏 + 客户案例 | CTA 按钮、布局、案例设计 |
| **PolyAI** | 荧光绿 + 大数字数据卡片 + 对话Demo | 数据展示、对话演示 |
| **Kore.ai** | 行业标签导航 + 场景卡片 | 应用场景展示 |

### 7.2 组件文件位置

```
voice-ai-website/src/components/effects/
├── GradientText.tsx      # 金属流动文字
├── InfiniteCarousel.tsx  # 无限轮播
├── HorizontalScroll.tsx  # 横向滚动
└── ParticleBackground.tsx # 粒子背景
```

### 7.3 设计系统配置文件

```
voice-ai-website/
├── tailwind.config.ts    # Tailwind 配置（配色、字体、间距）
├── src/styles/globals.css # CSS 变量定义
└── src/lib/design-tokens.ts # 设计令牌（可选）
```

---

*文档生成时间：2026-04-01*
*适用项目：voice-ai-website*
*执行周期：4-6 周*