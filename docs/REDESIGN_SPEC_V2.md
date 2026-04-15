# AI Voice Agent 海外官网重构设计文档 V2

> **设计哲学：** 纯务虚、零技术参数
> **核心理念：** 先感受，后信息。访客看完 3 个视频、记住 5 个大数字、认出 10 个客户 Logo，然后点"联系我们"
> **参考风格：** Sierra / Intercom（干净、专业、温暖）+ ElevenLabs（体验驱动）
> **不适用风格：** PolyAI 荧光绿极客风（过于初创感，不适合沃丰的企业客户）

---

## 一、全站站点地图

### 首页（重构重点）

仅 5 屏，从 13 屏大幅精简。

### 保留的子页面

| 路由 | 页面 | 改动 |
|------|------|------|
| `/tts-demo` | TTS 试听 | 保留，从首页隐藏入口，仅底部 Footer 链接 |
| `/demo` | 产品 Demo | 保留，同上 |
| `/pricing` | 定价 | 保留，仅 Footer 可见 |
| `/customers` | 客户案例 | **重构** → 从"功能案例"改为"故事+数据" |
| `/solutions/*` | 行业方案 | **精简** → 每个行业一页故事，不要功能列表 |
| `/login` `/signup` | 认证 | 不动 |

### 建议删除/隐藏的页面

| 路由 | 现状 | 建议 |
|------|------|------|
| `/product/features` | 6 大功能卡片 | ❌ 删除，能力卡片移到首页场景故事里 |
| `/product/technology` | 技术架构/API | ❌ 删除或隐藏到 `/docs` 下 |
| `/product/security` | 安全合规 | ❌ 删除，合规信息放 Footer 或单行提及 |
| `/docs` | 文档 | 保留但入口从 Navbar 移除 → 仅 Footer |
| `/solutions/survey` | 问卷调查 | ❌ 删除（当前无对应内容） |
| `/blog` | 博客 | 保留但入口从 Navbar 移除 |
| `/demo/effects` | 特效演示 | ❌ 内部开发工具，不上线 |

### 建议新增的页面

| 路由 | 页面 | 说明 |
|------|------|------|
| `/why-us` | 为什么选择我们 | 一页大故事：客户痛点 → 我们的改变 → 成果数据 |

### 导航栏变更

**改前：** Logo | 产品 ▾ | 解决方案 ▾ | 定价 | 文档 | [登录] [Get Started]

**改后：** Logo | 解决方案 ▾ | 客户案例 | 关于我们 | [登录] [Request Demo]

- "产品"菜单隐藏（不要技术入口）
- "定价"从 Navbar 移除（务虚风格不主动暴露定价）
- CTA 从 "Get Started" 改为 "Request Demo"（B2B 企业级语气）

---

## 二、首页逐屏设计（核心）

> 全站 5 屏，每屏一个核心信息。无多余内容。

---

### 第 1 屏：Hero — "一句话 + 全屏视频"

**核心信息：** 你是谁，你能做什么

**布局：**
- **背景：** 全屏视频（静音自动播放 + 循环 + 深色渐变遮罩 60%）
  - 视频内容建议：真实呼叫中心场景 + AI 客服接听动画
  - 如果暂时没有真实视频：高质量全屏图片 + 缓慢缩放动画
- **居中对齐**（不再左右分栏），所有内容在画面中间

**内容：**

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│           [超大标题 - 72px / 4.5rem]                       │
│                                                          │
│     AI That Sounds Like Your                               │
│     Best Customer Agent                                    │
│                                                          │
│     [副标题 - 20px / 1.25rem]                             │
│     Enterprise voice AI that handles every                   │
│     call, every time — naturally.                          │
│                                                          │
│     ┌──────────────┐  ┌──────────────┐                    │
│     │ ▶ Watch Demo │  │ Contact Sales │                    │
│     └──────────────┘  └──────────────┘                    │
│                                                          │
│                                                          │
│     ↓ (微妙滚动提示)                                       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**文案风格（英文）：**
- 标题：**"AI That Sounds Like Your Best Customer Agent"**
- 副标题：**"Enterprise voice AI that handles every call, every time — naturally."**
- 主 CTA：`▶ Watch Demo`（点击弹出视频模态框）
- 次 CTA：`Contact Sales`（跳转到联系表单）

**UI 效果：**
- 标题文字入场：逐字 fade-in（GSAP SplitText 或简单 CSS stagger）
- 副标题：从下方 slide-up
- CTA 按钮：从下方依次弹入
- 底部滚动提示：微弱上下浮动动画
- **不要**：故障文字、星空穿梭、超光速粒子 — 太花哨

**视频素材需求：**
- 尺寸：1920×1080
- 时长：15-30 秒循环
- 文件大小：<5MB（压缩后）
- 如果无法拍摄：用场景图 + CSS 缓慢 zoom + 粒子光效替代

**当前素材状态：**
- `public/videos/hero-placeholder.mp4` → ⚠️ 17 字节空文件，需要替换
- `public/images/hero-poster.jpg` → 可用，作为 fallback

---

### 第 2 屏：Social Proof — "我们被谁信赖"

**核心信息：** 这么多大客户选我们，你不会选错

**布局：**
- **全宽 Logo 墙**（横向排列，6-10 个客户 Logo）
- Logo 下方一行大数字（4 个关键指标）
- **不要卡片！不要图标！不要描述！**

**内容：**

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│     Trusted by industry leaders                           │
│                                                          │
│   ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐            │
│   │Logo│ │Logo│ │Logo│ │Logo│ │Logo│ │Logo│  ...       │
│   └────┘ └────┘ └────┘ └────┘ └────┘ └────┘            │
│                                                          │
│   ────────────────────────────────────                   │
│                                                          │
│     500+           $50M+           98%           7B+     │
│     Enterprises    Saved Annually  CSAT Score    Calls   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**UI 效果：**
- Logo 墙：滚动进入时从两侧 fade-in
- 大数字：滚动到视口时数字滚动动画（AnimatedCounter）
- 数字之间用细线分隔
- 数字字体：超大、加粗、浅色（白色/浅灰）
- **配色建议：** 大数字用白色，不用荧光绿（更专业）

**当前素材状态：**
- `public/logos/customer-1.png` ~ `customer-6.png` → ✅ 6 个 Logo 已生成
- 需要增加到 8-10 个
- MetricsSection 已有 6 个指标 → 保留 4 个最大的，砍掉 `<200ms` 和 `99.9%`（太技术）

---

### 第 3 屏：场景故事 — "3 个改变一切的故事"（核心！）

**核心信息：** 这是你的客户正在经历的事

**这是整站最重要的一屏。** 3 个子场景，每个都是：
1. 大标题（痛点/成果）
2. 15-30 秒视频或对话录音
3. 大段故事文案（不是功能描述，是故事！）
4. 一个成果数字

**布局：** 垂直排列，每个场景独占一屏（类似 Apple 的产品页滚动叙事）

**场景 1：Banking — 银行客服**

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   ┌─────────────────────────────┐                        │
│   │                             │                        │
│   │  [场景视频 / 对话录音播放器]  │                        │
│   │                             │                        │
│   │  ▶ Play: Banking Fraud Call │                        │
│   │                             │                        │
│   └─────────────────────────────┘                        │
│                                                          │
│   60% Fewer Fraud Claims Lost to                          │
│   Response Delays                                        │
│                                                          │
│   When a customer calls about a suspicious               │
│   transaction, every second matters. Our AI              │
│   voice agent handles fraud verification in              │
│   real-time — no hold music, no transfers, no            │
│   frustration. The customer stays calm, the              │
│   bank stays trusted, and your team stays                │
│   focused on what actually needs a human.                │
│                                                          │
│   ┌─────────┐                                            │
│   │  3 sec   │  Average response time                    │
│   └─────────┘                                            │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**场景 2：Healthcare — 医疗预约**

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   80% of Appointments Booked Without                      │
│   a Single Human Agent                                   │
│                                                          │
│   ┌─────────────────────────────┐                        │
│   │                             │                        │
│   │  [场景视频 / 对话录音播放器]  │                        │
│   │                             │                        │
│   │  ▶ Play: Appointment Call   │                        │
│   │                             │                        │
│   └─────────────────────────────┘                        │
│                                                          │
│   A patient calls at 2 AM to reschedule.                 │
│   Your AI answers, confirms the slot, sends              │
│   the reminder — all before your front desk              │
│   even wakes up. No missed calls. No no-shows.           │
│   Just better healthcare, delivered naturally.           │
│                                                          │
│   ┌─────────┐                                            │
│   │  24/7    │  Always available                         │
│   └─────────┘                                            │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**场景 3：Retail / E-Commerce — 零售客服**

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   $2.4M Saved in Customer Service                         │
│   Costs Last Quarter                                     │
│                                                          │
│   ┌─────────────────────────────┐                        │
│   │                             │                        │
│   │  [场景视频 / 对话录音播放器]  │                        │
│   │                             │                        │
│   │  ▶ Play: Order Support Call │                        │
│   │                             │                        │
│   └─────────────────────────────┘                        │
│                                                          │
│   Black Friday hits. Call volume triples.                │
│   Instead of hiring 50 temp agents, our AI               │
│   scales instantly — handles orders, returns,            │
│   tracking, all in a natural conversation.               │
│   Your customers get answers, your team gets             │
│   breathing room.                                        │
│                                                          │
│   ┌─────────┐                                            │
│   │  3x      │  Call volume handled                      │
│   └─────────┘                                            │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**UI 效果：**
- 每个场景滚动进入时，视频/图片从下方 slide-up
- 标题：超大字体（36-48px），加粗
- 文案：较大字号（18-20px），行高 1.7，最大宽度 65ch（阅读舒适）
- 成果数字：大卡片（120×120px），白色背景，深色文字
- 视频/播放器：圆角 16px，带微妙的阴影
- 三个场景之间有大的留白（120-160px padding）

**素材需求：**
- 3 个场景视频 或 3 段对话录音 + 对话 UI 动画
- 当前 `public/audio/demos/` 有 4 个场景录音 → ✅ 可用
- 需要为每个场景制作配套的"对话 UI"可视化（文字气泡 + 波形）

---

### 第 4 屏：客户证言 — "听客户怎么说"

**核心信息：** 真实客户高管的原话

**布局：** 2-3 段高管证言轮播，每段包含：
- 客户照片（头像）
- 姓名 + 职位 + 公司
- 一段真实的引用（不是"效果很好"这种废话，要具体的）
- 一个成果数据

**内容：**

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│     What our customers say                                │
│                                                          │
│   ┌────────────────────────────────────────────┐        │
│   │                                            │        │
│   │  "Before this AI, our fraud team spent     │        │
│   │   4 hours a day just screening calls.       │        │
│   │   Now they handle the complex cases         │        │
│   │   that actually need human judgment."       │        │
│   │                                            │        │
│   │  ┌────┐                                    │        │
│   │  │👤  │  Sarah Chen                         │        │
│   │  └────┘  VP of Operations, First National   │        │
│   │                                            │        │
│   │  ┌──────────┐                              │        │
│   │  │  78%      │  Reduction in call handling  │        │
│   │  └──────────┘                              time     │        │
│   │                                            │        │
│   └────────────────────────────────────────────┘        │
│                                                          │
│         ○  ○  ○          ← 轮播指示点                    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**UI 效果：**
- 卡片：白色/浅色背景，圆角 24px，大留白
- 引号：大型装饰性引号（浅灰色）
- 头像：圆形 64px
- 成果数据：小卡片贴在证言卡片底部
- 轮播：自动播放 + 手动指示点，切换时淡入淡出

**素材需求：**
- 需要真实客户头像和姓名（至少 3 个）
- 如果没有真人 → 用 AI 生成商务头像 + 虚构名字（明确标注为"示例"）
- 当前 `src/data/testimonials.ts` → 有 placeholder 数据

---

### 第 5 屏：CTA — "最后推一把"

**核心信息：** 现在就行动

**布局：** 全屏深色背景 + 居中内容

**内容：**

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│     (微妙背景光效)                                        │
│                                                          │
│     Ready to Transform Your                               │
│     Customer Conversations?                               │
│                                                          │
│     See how leading enterprises are using                  │
│     AI voice agents to deliver better                      │
│     customer experiences.                                  │
│                                                          │
│     ┌──────────────────────┐                              │
│     │   Request a Demo →   │                              │
│     └──────────────────────┘                              │
│                                                          │
│     Or talk to our team: +86 XXX XXXX XXXX               │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**UI 效果：**
- 背景：深色 + 微妙的渐变光晕（不用花哨效果）
- 标题：超大字号（48-56px），白色
- 副标题：20px，浅灰
- CTA 按钮：超大（padding: 20px 48px），金色或品牌色
- 按钮 hover：轻微上移 + 阴影加深
- 底部电话/邮箱：小字，半透明

**与现有对比：**
- 当前 CTASection → 有两个按钮（Get Started + Contact），背景是紫色渐变
- 新方案 → 只保留一个主按钮（Request a Demo），去掉"免费试用"（B2B 风格）

---

## 三、当前 Section 处置清单

| 现有 Section | 保留？ | 处理方式 |
|-------------|--------|---------|
| `HeroSection` | ✅ 改 | 左右分栏 → 居中全屏视频 |
| `SocialProofSection` | ✅ 改 | Logo 墙保留，6 指标 → 4 大数字 |
| `MetricsSection` | ❌ 删 | 合并到 Social Proof 的数字行 |
| `ProblemSolutionSection` | ❌ 删 | 太"实"了，问题/解决方案对比太像产品文档 |
| `FeaturesSection` | ❌ 删 | 6 个功能卡片太技术，场景故事已覆盖 |
| `HowItWorksSection` | ❌ 删 | 步骤说明太技术 |
| `AudioDemoSection` | ❌ 删 | 音频播放器移到场景故事里 |
| `UseCasesSection` | ❌ 删 | 行业卡片移到场景故事里 |
| `IntegrationsSection` | ❌ 删 | 集成 Logo 对决策者没有意义 |
| `TestimonialsSection` | ✅ 改 | 简化为纯证言轮播，去掉案例详情 |
| `PricingSection` | ❌ 删 | 从首页移除，保留子页面 |
| `SecuritySection` | ❌ 删 | 合规放 Footer |
| `CTASection` | ✅ 改 | 简化为单按钮 |

**结果：13 个 section → 5 个 section**

---

## 四、子页面处理

### 4.1 Navbar 菜单结构

```
Logo | 解决方案 ▾ | 客户案例 | 关于我们 | [登录] [Request Demo]

解决方案下拉菜单:
  → 银行客服
  → 医疗预约
  → 零售客服
```

### 4.2 行业方案子页面（/solutions/*）

每个行业页面结构（3 屏即可）：

```
Screen 1: Hero
  - 行业大标题 ("AI Voice for Banking")
  - 一行痛点描述
  - 背景：行业场景图

Screen 2: Story
  - 具体客户故事（痛点 → 方案 → 成果）
  - 对话录音 + 对话 UI
  - 3 个成果数字

Screen 3: CTA
  - "Ready to see how AI voice works for your industry?"
  - [Talk to an Expert] 按钮
```

### 4.3 客户案例页（/customers）

改造为"成功案例集"：

```
Screen 1: Hero
  - "Success Stories"
  - "See how enterprises transformed their customer experience"

Screen 2-N: 案例卡片
  - 每个案例：客户 Logo + 行业标签 + 一句话成果 + 链接
  - 网格布局（2×2 或 3×2）
  - 点击跳转到案例详情

案例详情页：
  - 大标题 + 客户故事 + 成果数据 + 对话录音
```

### 4.4 TTS Demo 页（/tts-demo）

- 保留当前重构后的版本（人家昨天刚做完的）
- 从 Navbar 隐藏入口
- Footer 添加 "Try Our Voices" 链接
- 适合技术决策者自行探索

---

## 五、视觉设计规范

### 5.1 配色方案

> **核心原则：** 干净、专业、温暖（参考 Sierra / Intercom）

```
主背景:      #0A0A0A（深色）/ #FFFFFF（浅色区域交替使用）
次级背景:    #111111 / #F8F8F8
卡片背景:    #1A1A1A / #FFFFFF

强调色:      #D4A574（金色 - 品牌色，延续当前设计系统）
辅助色:      #8B5CF6（紫色 - 科技感）
            #06B6D4（青色 - 数据强调）

文字色:      #FFFFFF（深色背景上）
            #1A1A1A（浅色背景上）
次级文字:    #A1A1AA / #6B7280
弱化文字:    #71717A / #9CA3AF

边框:        #27272A / #E5E7EB
```

**配色策略：**
- Hero + CTA 用深色背景
- Social Proof 用浅色背景
- 场景故事交替使用深色和浅色（每屏切换一次）
- 证言用浅色背景（温暖、可信）

**与现有对比：**
- 不要改成 PolyAI 的荧光绿 #D4FF00
- 保留现有的金色 #D4A574 作为品牌强调色
- 紫色 #8B5CF6 作为辅助科技色
- 去掉 `accent-lime` 的所有引用

### 5.2 字体规范

```
标题字体:    Inter Display / Inter（当前已使用）
正文字体:    Inter（保持不变）

字号层级:
  Hero 标题:  4.5rem (72px) - 仅首页 Hero
  Section 标题: 3rem (48px)
  场景标题:   2.5rem (40px)
  副标题:     1.25rem (20px)
  正文:       1.125rem (18px) - 比当前大 2px！
  小字:       0.875rem (14px)
  数字大:     3.5rem (56px) - 仅用于成果数字
```

**关键变化：正文字号从 16px 提升到 18px**，因为务虚风格依赖大量文案阅读体验。

### 5.3 动效规范

```
入场动画:
  - 标题: 逐字 fade-in（GSAP 或 CSS stagger）
  - 正文: slide-up（20px, 0.6s, ease-out）
  - 数字: 滚动计数（AnimatedCounter）
  - 视频: scale 从 0.95 → 1.0

滚动触发:
  - 所有动画由 whileInView 触发
  - viewport: once: true（不重复播放）
  - 延迟：0.1s stagger

交互:
  - 按钮 hover: scale 1.02 + y -2
  - 卡片 hover: 阴影加深（不用边框变色）
  - 链接 hover: 下划线出现

禁止:
  ❌ GlitchText（故障文字）
  ❌ Hyperspeed（星空穿梭）
  ❌ 持续循环动画（除了波形）
  ❌ 过多 parallax
```

### 5.4 响应式断点

```
Mobile:   < 768px  — 单列布局，所有字号缩小 20%
Tablet:   768-1024px — 2 列布局
Desktop:  > 1024px  — 全宽布局
```

---

## 六、内容策略

### 6.1 文案风格指南

| 维度 | 做 ✅ | 不做 ❌ |
|------|------|--------|
| 标题 | 一句话价值主张 | 功能描述 |
| 副标题 | 解释价值，不是技术 | "基于 LLM + ASR + TTS" |
| 正文 | 故事 + 场景 + 成果 | 功能列表 + 参数 |
| CTA | 低门槛（Watch Demo） | "免费注册" |
| 数据 | 大数字 + 一句话解释 | 图表 + 详细分析 |
| 证言 | 具体人名 + 职位 + 具体成果 | "张总说效果很好" |

### 6.2 i18n 策略

- 英文站为主，中文为辅
- 所有文案先写英文版，再翻译中文
- 中文文案可以比英文短（信息密度更高）
- 数字、品牌名不翻译

### 6.3 内容优先级

1. **Hero 标题/副标题** → 最重要的内容，决定第一印象
2. **3 个场景故事文案** → 决定转化
3. **4 个大数字** → 社会证明
4. **3 段客户证言** → 信任建立
5. CTA 文案 → 最后推动

---

## 七、素材需求清单

### 已有素材 ✅

| 素材 | 位置 | 数量 | 状态 |
|------|------|------|------|
| 客户 Logo | `public/logos/` | 6 个 | ✅ 需要增加到 8-10 个 |
| TTS 音色头像 | `public/images/avatars/` | 25 个 | ✅ 仅 TTS 页使用 |
| 场景图 | `public/images/scenarios/` | 6 个 | ✅ 可用作场景故事封面 |
| 音频 Demo | `public/audio/demos/` | 4 个 | ✅ 可复用 |
| TTS 试听音频 | `public/audio/tts/` | 25 个 | ✅ 仅 TTS 页使用 |

### 需要新增 ❌

| 素材 | 说明 | 优先级 | 预估工作量 |
|------|------|--------|-----------|
| **Hero 背景视频** | 15-30s 呼叫中心场景 | 🔴 P0 | 需要 Max Plan 或外部拍摄 |
| **场景故事视频** | 3 个，各 15-30s | 🔴 P0 | 可用图片+对话UI替代 |
| **客户 Logo（新增）** | 4 个真实/示例 Logo | 🟡 P1 | 1 天（AI 生成） |
| **客户高管头像** | 3-5 个商务头像 | 🟡 P1 | 1 天（AI 生成） |
| **对话 UI 组件** | 可视化对话界面 | 🟡 P1 | 2 天（前端开发） |
| **产品界面截图** | Agent Studio 界面 | 🟢 P2 | 待定（产品尚未完成） |

### 素材生成方案

如果暂时没有视频：
1. 用高质量全屏图片 + CSS 缓慢 zoom（1.0 → 1.05, 20s 循环）
2. 叠加半透明渐变遮罩（60% 深色）
3. 前景用文字 + CTA 按钮
4. 效果仍然震撼，成本为零

---

## 八、开发排期

### Phase 1：首页重构（3-4 天）

| 任务 | 工作量 | 依赖 |
|------|--------|------|
| 新 HeroSection（全屏视频/图片居中布局） | 1 天 | Hero 背景素材 |
| SocialProofSection 精简（Logo + 4 大数字） | 0.5 天 | 现有 Logo |
| 3 个场景故事 Section（新组件） | 1.5 天 | 故事文案 + 音频/图片 |
| TestimonialsSection 精简（纯轮播） | 0.5 天 | 客户证言数据 |
| CTASection 简化（单按钮） | 0.5 天 | — |
| 删除废弃 Section | 0.5 天 | — |
| 测试 + 响应式调整 | 0.5 天 | — |

### Phase 2：导航/路由调整（1 天）

| 任务 | 工作量 |
|------|--------|
| Navbar 菜单重构 | 0.5 天 |
| Footer 更新（添加隐藏入口链接） | 0.5 天 |
| 路由调整（隐藏/删除页面） | 0.5 天 |

### Phase 3：子页面精简（2 天）

| 任务 | 工作量 |
|------|--------|
| 行业方案子页面重构（3 屏模板） | 1 天 |
| 客户案例页重构 | 0.5 天 |
| 删除废弃页面代码 | 0.5 天 |

### Phase 4：素材生成（并行）

| 任务 | 工作量 | 说明 |
|------|--------|------|
| Hero 背景视频 | 待定 | 需要 Max Plan 或外部素材 |
| 客户 Logo 补充 | 0.5 天 | AI 生成 |
| 客户头像生成 | 0.5 天 | AI 生成 |
| 文案撰写（英文版） | 1 天 | 产品/市场团队 |
| 中文翻译 | 0.5 天 | — |

---

## 九、关键决策点

### 需要主人确认的：

1. ✅ **风格方向**：务虚风格，零技术参数（已确认）
2. ⬜ **配色方案**：保留金色 + 紫色，去掉荧光绿？
3. ⬜ **Hero 背景**：先用图片 + zoom 效果，还是等视频素材？
4. ⬜ **场景故事**：3 个行业选哪些？（银行 / 医疗 / 零售？）
5. ⬜ **客户证言**：用真实客户数据还是先用 AI 生成示例？
6. ⬜ **TTS Demo 页**：保留但隐藏入口，还是完全移除？
7. ⬜ **定价页**：完全从导航移除，还是保留在 Footer？

---

## 十、与 V1 方案的差异

| 维度 | V1（4月1日 REDESIGN_ANALYSIS） | V2（本文档） |
|------|------|------|
| 设计风格 | PolyAI 深色 + 荧光绿 | Sierra/Intercom 干净专业 |
| 首页 Section 数 | 10+（保留大部分） | 5（大幅精简） |
| 技术内容 | 保留功能卡片、集成、安全 | 全部删除 |
| Hero 布局 | 左右分栏（45%:55%） | 居中全屏 |
| 数据展示 | 6 个指标卡片 | 4 个大数字（无卡片） |
| 场景展示 | 图标 + 功能卡片 | 故事 + 视频/音频 + 长文案 |
| CTA | 双按钮 | 单按钮 |
| 导航 | 保留"产品"菜单 | 隐藏"产品"入口 |
| 配色 | 荧光绿 #D4FF00 | 金色 #D4A574 |

---

*文档版本：V2*
*创建日期：2026-04-15*
*作者：基于主人"纯务虚零技术"指示*
