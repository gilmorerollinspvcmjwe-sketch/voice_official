# AI Voice Agent 官网完整规划方案

> **项目**: 海外大模型语音智能体产品官网  
> **参考竞品**: PolyAI, Cognigy, Retell AI, Vapi  
> **设计风格**: 工业级、大气、科技感、专业可信  
> **语言支持**: 中文/英文双语  

---

## 目录

1. [网站地图](#1-网站地图)
2. [首页内容规划](#2-首页内容规划)
3. [设计规范](#3-设计规范)
4. [双语支持方案](#4-双语支持方案)
5. [内容占位符设计](#5-内容占位符设计)
6. [技术架构](#6-技术架构)
7. [内容填充指南](#7-内容填充指南)

---

## 1. 网站地图

### 1.1 完整页面结构

```
/
├── [Home] 首页 (/)
│
├── Product（产品）(/product)
│   ├── Overview 产品概览 (/product)
│   ├── Features 功能特性 (/product/features) ⭐ 新增详情页
│   ├── Technology 技术架构 (/product/technology)
│   ├── Security 安全合规 (/product/security) ⭐ 新增独立页
│   └── Integrations 集成 (/product/integrations) ⭐ 新增独立页
│
├── Solutions（解决方案）(/solutions)
│   ├── Overview 解决方案概览 (/solutions)
│   ├── Customer Service 客服 (/solutions/customer-service)
│   ├── Sales 销售 (/solutions/sales)
│   ├── Collections 催收 (/solutions/collections)
│   ├── Appointment Reminders 预约提醒 (/solutions/appointment-reminders)
│   └── Survey & Feedback 调研反馈 (/solutions/survey-feedback)
│
├── Pricing（定价）(/pricing) ⭐ 增强版：方案对比表 + 价格计算器
│   ├── Pay-as-you-go 按量付费 (/pricing#payg)
│   ├── Enterprise 企业版 (/pricing#enterprise)
│   ├── Compare Plans 方案对比 (/pricing#compare)
│   └── Calculator 价格计算器 (/pricing#calculator)
│
├── Demo（演示）(/demo) ⭐ 新增交互式 Demo 页
│   ├── Interactive Demo 交互演示 (/demo) ⭐ 场景选择 + 实时外呼测试
│   ├── Audio Samples 录音样本 (/demo/audio)
│   ├── Live Demo 实时演示 (/demo/live)
│   └── Video Tutorials 视频教程 (/demo/tutorials)
│
├── Get Started 获客表单 (/get-started) ⭐ 新增获客表单页
│   ├── 基本信息 (姓名/邮箱/公司/职位/电话/规模)
│   ├── 需求信息 (场景/通话量/当前方案)
│   ├── 关注优先级 (成本/质量/速度/合规)
│   └── 实时外呼测试触发
│
├── Docs（文档）(/docs) ⭐ 新增开发者文档
│   ├── Quick Start 快速开始 (/docs/quick-start)
│   ├── API Reference API 参考 (/docs/api)
│   ├── SDKs 开发工具包 (/docs/sdks)
│   ├── Webhook 指南 (/docs/webhook)
│   ├── Error Codes 错误码 (/docs/errors)
│   └── Tutorials 教程 (/docs/tutorials)
│
├── Resources 资源中心 (/resources) ⭐ 新增资源中心
│   ├── Blog 博客文章 (/resources/blog)
│   ├── Whitepapers 白皮书 (/resources/whitepapers)
│   ├── Webinars 网络研讨会 (/resources/webinars)
│   ├── Videos 视频 (/resources/videos)
│   └── E-Books 电子书 (/resources/ebooks)
│
├── Company（公司）(/company)
│   ├── About 关于我们 (/company/about)
│   ├── Blog 博客 (/blog)
│   ├── Careers 招聘 (/company/careers)
│   └── Contact 联系 (/company/contact)
│
├── Customers（客户）(/customers) ⭐ 新增客户案例页
│   ├── Case Studies 案例研究 (/customers/case-studies)
│   ├── Testimonials 客户评价 (/customers/testimonials)
│   └── Industries 行业案例 (/customers/industries)
│
└── Legal（法律）
    ├── Privacy Policy 隐私政策 (/legal/privacy)
    ├── Terms of Service 服务条款 (/legal/terms)
    └── GDPR Compliance GDPR 合规 (/legal/gdpr)
```

### 1.1.1 新增页面说明

| 页面 | 路由 | 功能描述 | 配置文件 |
|------|------|----------|----------|
| **获客表单** | `/get-started` | 收集潜在客户信息，触发外呼测试 | `lead-form-config.ts` |
| **交互式 Demo** | `/demo` | 场景选择、实时外呼、对话展示 | `demo-scenarios.ts` |
| **TTS 音色试听** | `/tts-demo` | 50+超逼真AI音色展示与试听 | `tts-voices.ts` |
| **产品功能详情** | `/product/features` | TTS/ASR/对话管理等详细功能 | 现有 features.ts |
| **集成页面** | `/product/integrations` | CRM/客服/通信平台集成展示 | `integrations.ts` |
| **安全合规** | `/product/security` | 认证/加密/数据保护说明 | `security.ts` |
| **开发者文档** | `/docs` | API 参考/SDK/最佳实践 | 新建 docs 配置 |
| **定价增强** | `/pricing` | 方案对比表 + 价格计算器 | `pricing.ts` |
| **客户案例** | `/customers` | 成功案例展示 | `case-studies.ts` |
| **资源中心** | `/resources` | 博客/白皮书/视频等内容 | `resources.ts` |

### 1.1.2 TTS 试听页面模块

**路由**: `/tts-demo` 或 `/voice-gallery`

**页面模块**:
1. **Hero 区域** - 主标题、波形动画、核心数据
2. **AI 真人形象展示** - 轮播展示逼真头像，点击试听
3. **音色筛选器** - 性别/年龄/语言/风格/场景筛选
4. **自定义试听** - 用户输入文案，选择音色生成
5. **技术规格展示** - MOS评分/语言支持/响应延迟
6. **应用场景展示** - 客服/销售/播客/有声书/教育/游戏
7. **客户案例** - 真实使用案例和效果数据

**数据文件**:
- `src/data/tts-voices.ts` - 50+ 音色配置
- `src/data/tts-scenarios.ts` - 6 个应用场景配置

**组件目录**:
- `src/components/tts/` - TTS 相关组件

### 1.2 URL 结构设计

| 语言 | URL 前缀 | 示例 |
|------|----------|------|
| 英文（默认） | `/` | `/product/features` |
| 中文 | `/zh` | `/zh/product/features` |

### 1.3 导航结构

#### 主导航（桌面端）
```
[Logo] Product ▼  Solutions ▼  Pricing  Demo  Docs  [Sign In] [Get Started]
```

#### 移动端
```
[Logo]                    [☰]
├── Product
│   ├── Overview
│   ├── Features
│   ├── Technology
│   ├── Security
│   └── Integrations
├── Solutions
│   ├── Customer Service
│   ├── Sales
│   ├── Collections
│   ├── Appointment Reminders
│   └── Survey & Feedback
├── Pricing
├── Demo
├── Docs
├── Company
└── [Sign In] [Get Started]
```

#### Footer 导航
```
┌─────────────────────────────────────────────────────────────────────┐
│ Product          Solutions       Resources       Company           │
│ ├─ Features      ├─ Customer      ├─ Docs         ├─ About Us       │
│ ├─ Technology    │  Service       ├─ Blog         ├─ Careers        │
│ ├─ Security      ├─ Sales         ├─ Tutorials    ├─ Contact        │
│ └─ Integrations  ├─ Collections   └─ API Docs     └─ Press Kit      │
│                   └─ Survey                                        │
├─────────────────────────────────────────────────────────────────────┤
│ Legal                     Social              Contact               │
│ ├─ Privacy Policy         ├─ Twitter           📧 hello@xxx.com     │
│ ├─ Terms of Service       ├─ LinkedIn         📞 +1 (xxx) xxx-xxxx  │
│ └─ GDPR                   └─ YouTube                                │
├─────────────────────────────────────────────────────────────────────┤
│ © 2024 Company Name. All rights reserved.   [EN] [中文]             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. 首页内容规划

### 2.1 页面模块总览

```
┌────────────────────────────────────────────────────────────────────┐
│                         1. NAVIGATION                              │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                         2. HERO SECTION                           │
│                    [大标题 + 3D视觉 + CTA]                          │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                       3. SOCIAL PROOF                              │
│                  [客户Logo + 核心数据指标]                           │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                     4. PROBLEM/SOLUTION                           │
│                  [痛点对比 + 解决方案]                              │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                        5. FEATURES                                │
│                   [6-8核心功能卡片]                                 │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                     6. HOW IT WORKS                               │
│                    [3-4步流程图]                                    │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                      7. AUDIO DEMO                                │
│               [交互式音频播放器 + 场景切换]                          │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                      8. USE CASES                                 │
│                   [4-6个行业场景卡片]                               │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                     9. INTEGRATIONS                               │
│                    [合作伙伴Logo墙]                                 │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                    10. TESTIMONIALS                               │
│                  [客户评价轮播 + 头像]                              │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                      11. SECURITY                                │
│               [合规认证徽章 + 信任标识]                             │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                         12. CTA                                   │
│              [双重CTA: 免费试用 + 联系销售]                          │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                        13. FOOTER                                 │
│                   [导航 + 社交 + 法律]                              │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

### 2.2 Hero Section（首屏）

#### 设计规格
- **高度**: 100vh（最小 700px）
- **背景**: 渐变 + 3D动画/粒子效果
- **布局**: 左侧文案 + 右侧视觉

#### 内容结构

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   [Logo]     Product  Solutions  Pricing  Demo  Docs  [登录] [开始] │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                    │                            │
│   Transform Your Customer         │      ╭──────────────╮      │
│   Conversations with AI Voice      │      │              │      │
│                                    │      │   [3D音频    │      │
│   Deploy intelligent voice agents  │      │    波形动画]  │      │
│   that sound human, understand     │      │              │      │
│   context, and drive results.     │      │   ◠◠◠◠◠◠◠    │      │
│                                    │      │              │      │
│   [Start Free Trial] [Watch Demo]  │      ╰──────────────╯      │
│                                    │                            │
│   No credit card required          │                            │
│                                    │                            │
└─────────────────────────────────────────────────────────────────┘
```

#### 文案内容

| 元素 | 英文 | 中文 |
|------|------|------|
| **主标题** | Transform Your Customer Conversations with AI Voice | 用 AI 语音智能体，重塑客户对话体验 |
| **副标题** | Deploy intelligent voice agents that sound human, understand context, and drive results. | 部署听起来像真人、能理解上下文、能驱动结果的语音智能体。 |
| **CTA 主按钮** | Start Free Trial | 免费试用 |
| **CTA 次按钮** | Watch Demo | 观看演示 |
| **信任标签** | No credit card required • Setup in 5 minutes | 无需信用卡 • 5分钟快速上手 |

#### 视觉元素
- **3D音频波形动画**: 使用 Three.js 或 Lottie 实现
- **粒子效果**: 表示语音数据流动
- **背景渐变**: `linear-gradient(135deg, #0A2540 0%, #1a3a5c 100%)`

---

### 2.3 Social Proof（信任背书）

#### 设计规格
- **高度**: auto（约 120px）
- **背景**: 浅灰 `#F8FAFC`
- **布局**: 居中对齐

#### 内容结构

```
┌─────────────────────────────────────────────────────────────────┐
│  Trusted by 500+ companies worldwide                            │
│                                                                 │
│  [Logo1] [Logo2] [Logo3] [Logo4] [Logo5] [Logo6] [Logo7]        │
│                                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐            │
│  │  10M+   │  │  99.5%  │  │  -60%   │  │  24/7   │            │
│  │ Calls   │  │Accuracy │  │Cost     │  │Uptime   │            │
│  │Monthly  │  │         │  │Reduction│  │         │            │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

#### 数据指标设计

| 指标 | 英文 | 中文 | 说明 |
|------|------|------|------|
| **月通话量** | 10M+ Calls Monthly | 月通话 1000万+ 次 | 展示规模 |
| **准确率** | 99.5% Accuracy | 99.5% 准确率 | 展示质量 |
| **成本降低** | 60% Cost Reduction | 成本降低 60% | 展示价值 |
| **可用性** | 99.9% Uptime | 99.9% 可用性 | 展示稳定性 |

---

### 2.4 Problem/Solution（痛点与方案）

#### 设计规格
- **高度**: auto（约 600px）
- **背景**: 白色
- **布局**: 左右对比

#### 内容结构

```
┌─────────────────────────────────────────────────────────────────┐
│                    The Challenge You Face                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ❌ 传统呼叫中心困境                    ✅ 我们的解决方案          │
│   ─────────────────────────────────────────────────────────────  │
│                                                                 │
│   📞 高人力成本                         🤖 AI智能体替代80%重复工作   │
│      每位客服年成本$40,000+               成本降低60%以上            │
│                                                                 │
│   ⏰ 24/7覆盖困难                       ⚡ 全天候无间断服务          │
│      无法处理夜间和节假日咨询              随时响应客户需求            │
│                                                                 │
│   🔄 高员工流失率                       🎯 零培训成本              │
│      平均任期仅6-12个月                   分钟级部署，即刻上岗        │
│                                                                 │
│   📊 服务质量不稳定                      📈 100%一致性体验          │
│      每次通话质量参差不齐                  每一通电话都完美执行        │
│                                                                 │
│   🌍 多语言支持有限                      🌐 50+语言无缝支持          │
│      难以服务国际化客户                    触达全球客户无障碍          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2.5 Features（核心功能）

#### 设计规格
- **高度**: auto（约 800px）
- **背景**: 渐变 `#F8FAFC` → `#FFFFFF`
- **布局**: 3列网格（移动端1列）

#### 内容结构

```
┌─────────────────────────────────────────────────────────────────┐
│                    Why Choose Our Platform                       │
│                    选择我们平台的理由                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   🎙️ 自然    │  │   🧠 智能    │  │   ⚡ 快速    │          │
│  │   语音合成    │  │   对话理解   │  │   部署上线    │          │
│  │              │  │              │  │              │          │
│  │ 业界领先的   │  │ 基于大模型   │  │ 5分钟即可    │          │
│  │ 语音合成技术 │  │ 的深度理解   │  │ 完成部署     │          │
│  │ 拟人度99.5%  │  │ 上下文记忆   │  │ 即刻上线     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   🔄 多轮    │  │   🌐 多语言  │  │   📊 实时    │          │
│  │   对话能力   │  │   支持       │  │   分析       │          │
│  │              │  │              │  │              │          │
│  │ 复杂业务场景 │  │ 支持50+语言  │  │ 通话数据     │          │
│  │ 无缝衔接     │  │ 全球业务无碍 │  │ 实时可视化   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │   🔗 开放    │  │   🛡️ 安全    │                            │
│  │   API集成   │  │   合规       │                            │
│  │              │  │              │                            │
│  │ 灵活对接现有 │  │ SOC2/GDPR/   │                            │
│  │ 业务系统     │  │ HIPAA认证    │                            │
│  └──────────────┘  └──────────────┘                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 功能卡片详细设计

| 功能 | 图标 | 英文标题 | 中文标题 | 英文描述 | 中文描述 |
|------|------|----------|----------|----------|----------|
| 1 | 🎙️ | Natural Voice Synthesis | 自然语音合成 | Industry-leading TTS with 99.5% human-likeness | 业界领先的语音合成技术，拟人度高达 99.5% |
| 2 | 🧠 | Intelligent Context Understanding | 智能对话理解 | LLM-powered deep understanding with context memory | 基于大模型的深度理解，支持上下文记忆 |
| 3 | ⚡ | Rapid Deployment | 快速部署上线 | Deploy in 5 minutes, start immediately | 5分钟即可完成部署，即刻上线 |
| 4 | 🔄 | Multi-turn Conversations | 多轮对话能力 | Handle complex business scenarios seamlessly | 复杂业务场景无缝衔接 |
| 5 | 🌐 | Multi-language Support | 多语言支持 | Support 50+ languages for global business | 支持 50+ 语言，全球业务无障碍 |
| 6 | 📊 | Real-time Analytics | 实时数据分析 | Call data visualization in real-time | 通话数据实时可视化分析 |
| 7 | 🔗 | Open API Integration | 开放 API 集成 | Flexible integration with existing systems | 灵活对接现有业务系统 |
| 8 | 🛡️ | Security & Compliance | 安全合规 | SOC2/GDPR/HIPAA certified | SOC2/GDPR/HIPAA 认证 |

---

### 2.6 How It Works（工作流程）

#### 设计规格
- **高度**: auto（约 500px）
- **背景**: 深蓝 `#0A2540`
- **布局**: 横向时间线

#### 内容结构

```
┌─────────────────────────────────────────────────────────────────┐
│                    How It Works in 4 Steps                       │
│                    四步快速上手                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ①───────────②───────────③───────────④                        │
│   │           │           │           │                         │
│   ▼           ▼           ▼           ▼                         │
│ ┌─────┐     ┌─────┐     ┌─────┐     ┌─────┐                     │
│ │ 📝  │     │ 🎯  │     │ 🚀  │     │ 📈  │                     │
│ │     │────▶│     │────▶│     │────▶│     │                     │
│ └─────┘     └─────┘     └─────┘     └─────┘                     │
│                                                                 │
│  Define      Configure    Deploy      Scale                     │
│  Your Agent  The Voice    In Minutes  Infinitely                │
│                                                                 │
│  定义你的     配置语音     分钟部署     无限扩展                   │
│  智能体       风格         即刻上线     随业务增长                 │
│                                                                 │
│  设置智能体   选择声音风格   一键部署    弹性扩展                    │
│  名字、角色   设定对话流程   即刻上线    满足业务需求                │
│  和任务目标   和触发条件     开始通话                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 步骤详细内容

| 步骤 | 英文标题 | 中文标题 | 英文描述 | 中文描述 |
|------|----------|----------|----------|----------|
| 1 | Define Your Agent | 定义你的智能体 | Set agent name, role, and task objectives | 设置智能体名字、角色和任务目标 |
| 2 | Configure The Voice | 配置语音风格 | Choose voice style, set conversation flow and triggers | 选择声音风格，设定对话流程和触发条件 |
| 3 | Deploy In Minutes | 分钟部署 | One-click deployment, start calls immediately | 一键部署，即刻上线，开始通话 |
| 4 | Scale Infinitely | 无限扩展 | Elastic scaling to meet business demands | 弹性扩展，随业务增长自动扩容 |

---

### 2.7 Audio Demo（音频演示）

#### 设计规格
- **高度**: auto（约 600px）
- **背景**: 渐变深色
- **布局**: 居中播放器 + 场景选择

#### 内容结构

```
┌─────────────────────────────────────────────────────────────────┐
│                    Hear It In Action                             │
│                    亲耳聆听真实效果                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │    [场景选择: Customer Service ▼]                       │   │
│  │                                                         │   │
│  │    ┌─────────────────────────────────────────────────┐  │   │
│  │    │  ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉  │  │   │
│  │    │  ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  │   │
│  │    └─────────────────────────────────────────────────┘  │   │
│  │                                                         │   │
│  │    ⏮️  ▶️  ⏭️       🔊 ───●───────── 🔗 Share          │   │
│  │                                                         │   │
│  │    01:23 / 02:45                                       │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ Customer │ │   Sales  │ │Collections│ │ Survey  │           │
│  │ Service  │ │          │ │          │ │          │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 场景列表

| 场景 | 英文 | 中文 | 时长 | 内容描述 |
|------|------|------|------|----------|
| 1 | Customer Service | 客服咨询 | 2:45 | 产品咨询、订单查询场景 |
| 2 | Sales | 销售外呼 | 3:12 | 产品推介、预约演示场景 |
| 3 | Collections | 催收回款 | 2:30 | 账单提醒、还款协商场景 |
| 4 | Survey | 调研反馈 | 2:15 | 满意度调查、市场调研场景 |

---

### 2.8 Use Cases（使用场景）

#### 设计规格
- **高度**: auto（约 700px）
- **背景**: 白色
- **布局**: 2行3列网格

#### 内容结构

```
┌─────────────────────────────────────────────────────────────────┐
│                    Built for Every Industry                      │
│                    覆盖各行各业场景                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   🏦 Finance    │  │   🏥 Healthcare │  │   🛒 Retail     │ │
│  │                 │  │                 │  │                 │ │
│  │   金融服务      │  │   医疗健康      │  │   零售电商      │ │
│  │                 │  │                 │  │                 │ │
│  │   • 账单提醒    │  │   • 预约确认    │  │   • 订单确认    │ │
│  │   • 贷款咨询    │  │   • 随访通知    │  │   • 物流更新    │ │
│  │   • 催收通知    │  │   • 处方提醒    │  │   • 售后服务    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   📞 Telecom    │  │   🎓 Education  │  │   🚚 Logistics │ │
│  │                 │  │                 │  │                 │ │
│  │   电信运营      │  │   教育培训      │  │   物流快递      │ │
│  │                 │  │                 │  │                 │ │
│  │   • 套餐推荐    │  │   • 课程提醒    │  │   • 配送通知    │ │
│  │   • 续费提醒    │  │   • 家校沟通    │  │   • 取件提醒    │ │
│  │   • 故障报修    │  │   • 招生咨询    │  │   • 投诉处理    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2.9 Integrations（集成生态）

#### 设计规格
- **高度**: auto（约 400px）
- **背景**: 浅灰 `#F8FAFC`
- **布局**: Logo 网格

#### 内容结构

```
┌─────────────────────────────────────────────────────────────────┐
│                    Seamless Integrations                         │
│                    无缝对接您的技术栈                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CRM                      通讯平台                   AI平台      │
│  ┌────┐ ┌────┐ ┌────┐    ┌────┐ ┌────┐ ┌────┐    ┌────┐ ┌────┐ │
│  │SF  │ │Hub │ │Zen │    │Twi │ │Von │ │Nex │    │Ope │ │Ant │ │
│  │    │ │Spot│ │desk│    │lio │ │age │ │mo  │    │nAI │ │hro │ │
│  └────┘ └────┘ └────┘    └────┘ └────┘ └────┘    └────┘ └────┘ │
│                                                                 │
│  数据分析                 呼叫中心                   其他集成     │
│  ┌────┐ ┌────┐ ┌────┐    ┌────┐ ┌────┐ ┌────┐    ┌────┐ ┌────┐ │
│  │Goo │ │Mix │ │Seg │    │Gen │ │Ava │ │Fiv │    │Sla │ │Zap │ │
│  │gle │ │pan │ │ment│    │esys│ │aya │ │e9  │    │ck  │ │ier │ │
│  └────┘ └────┘ └────┘    └────┘ └────┘ └────┘    └────┘ └────┘ │
│                                                                 │
│                    [View All Integrations →]                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2.10 Testimonials（客户评价）

#### 设计规格
- **高度**: auto（约 500px）
- **背景**: 白色
- **布局**: 轮播卡片

#### 内容结构

```
┌─────────────────────────────────────────────────────────────────┐
│                    What Our Customers Say                        │
│                    客户真实反馈                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  "This AI voice agent transformed our customer          │   │
│  │   service. We reduced wait times by 80% and our         │   │
│  │   customers can't tell they're talking to AI."          │   │
│  │                                                         │   │
│  │  ┌───────────────────────────────────────────────┐     │   │
│  │  │ [头像]  Sarah Chen                            │     │   │
│  │  │         VP of Customer Service, TechCorp      │     │   │
│  │  └───────────────────────────────────────────────┘     │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│              ○ ○ ● ○ ○ ○ ○ ○              [<] [>]               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2.11 Security（安全合规）

#### 设计规格
- **高度**: auto（约 350px）
- **背景**: 深蓝 `#0A2540`
- **布局**: 居中徽章

#### 内容结构

```
┌─────────────────────────────────────────────────────────────────┐
│                    Enterprise-Grade Security                     │
│                    企业级安全保障                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│        ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐       │
│        │ SOC 2 │    │ GDPR  │    │ HIPAA │    │ ISO   │       │
│        │ Type II│    │       │    │       │    │ 27001 │       │
│        └───────┘    └───────┘    └───────┘    └───────┘       │
│                                                                 │
│        ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐       │
│        │ TLS   │    │ End-to│    │ Data  │    │99.9%  │       │
│        │ 1.3   │    │-End   │    │ Resi- │    │Uptime │       │
│        │Encrypt│    │Encrypt│    │dency  │    │SLA    │       │
│        └───────┘    └───────┘    └───────┘    └───────┘       │
│                                                                 │
│        [Learn More About Our Security →]                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2.12 CTA Section（行动号召）

#### 设计规格
- **高度**: auto（约 300px）
- **背景**: 渐变品牌色
- **布局**: 居中文案 + 双按钮

#### 内容结构

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                                                                 │
│         Ready to Transform Your Customer Conversations?         │
│                    准备好革新您的客户对话了吗？                     │
│                                                                 │
│                                                                 │
│         ┌──────────────────┐    ┌──────────────────┐            │
│         │  Start Free Trial │    │ Contact Sales    │            │
│         │   免费试用         │    │   联系销售        │            │
│         └──────────────────┘    └──────────────────┘            │
│                                                                 │
│         No credit card required • Setup in 5 minutes            │
│         无需信用卡 • 5分钟快速上手                                 │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2.13 Footer（页脚）

#### 设计规格
- **高度**: auto
- **背景**: 深色 `#0F172A`
- **布局**: 4列网格

#### 内容结构

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [Logo]                                                         │
│  AI Voice Agent                                                 │
│  Enterprise Voice AI Platform                                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Product          Solutions        Resources       Company      │
│  ─────────        ─────────        ─────────       ─────────    │
│  Overview         Customer Service Documentation   About Us      │
│  Features         Sales            Blog            Careers       │
│  Technology       Collections      Tutorials       Contact       │
│  Security         Appointment      API Reference   Press Kit     │
│  Integrations     Survey           Changelog                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Legal                        Social             Contact         │
│  ─────                        ──────             ───────         │
│  Privacy Policy               Twitter            hello@xxx.com   │
│  Terms of Service             LinkedIn           +1 (xxx) xxx     │
│  GDPR Compliance              YouTube                             │
│  Cookie Policy                GitHub                              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  © 2024 Company Name. All rights reserved.    [EN ▼] [中文 ▼]    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. 设计规范

### 3.1 配色方案

#### 主色系
```css
/* 品牌色 */
--color-primary: #0A2540;        /* Deep Blue - 信任、专业 */
--color-primary-light: #1a3a5c;  /* 浅蓝背景 */
--color-primary-dark: #051829;   /* 深蓝强调 */

/* 辅助色 */
--color-accent: #0066FF;         /* Electric Blue - 科技、创新 */
--color-accent-light: #3385FF;   /* 浅蓝高亮 */
--color-accent-dark: #0052CC;    /* 深蓝链接 */

/* 强调色 */
--color-cta: #FF6B6B;            /* Coral - CTA按钮 */
--color-cta-hover: #FF5252;      /* CTA悬停 */
--color-success: #10B981;        /* Emerald - 成功 */
--color-warning: #F59E0B;        /* Amber - 警告 */
--color-error: #EF4444;         /* Red - 错误 */
```

#### 中性色
```css
/* 文字色 */
--color-text-primary: #1F2937;    /* 主文字 */
--color-text-secondary: #6B7280;  /* 次文字 */
--color-text-muted: #9CA3AF;      /* 弱文字 */
--color-text-inverse: #FFFFFF;     /* 反色文字 */

/* 背景色 */
--color-bg-primary: #FFFFFF;      /* 主背景 */
--color-bg-secondary: #F9FAFB;    /* 次背景 */
--color-bg-tertiary: #F3F4F6;     /* 三级背景 */
--color-bg-dark: #0A2540;         /* 深色背景 */

/* 边框色 */
--color-border: #E5E7EB;          /* 边框 */
--color-border-light: #F3F4F6;    /* 浅边框 */
```

#### 渐变
```css
/* 背景渐变 */
--gradient-hero: linear-gradient(135deg, #0A2540 0%, #1a3a5c 100%);
--gradient-accent: linear-gradient(135deg, #0066FF 0%, #00D4FF 100%);
--gradient-cta: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%);
```

### 3.2 字体系统

#### 字体族
```css
/* 主字体 */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             Roboto, 'Helvetica Neue', Arial, sans-serif;

/* 标题字体 */
--font-display: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 
                sans-serif;

/* 代码字体 */
--font-mono: 'JetBrains Mono', 'Fira Code', Consolas, Monaco, monospace;
```

#### 字体大小
```css
/* 标题 */
--font-size-h1: 3.5rem;    /* 56px */
--font-size-h2: 2.5rem;    /* 40px */
--font-size-h3: 1.875rem;  /* 30px */
--font-size-h4: 1.5rem;    /* 24px */
--font-size-h5: 1.25rem;   /* 20px */
--font-size-h6: 1rem;      /* 16px */

/* 正文 */
--font-size-body: 1rem;        /* 16px */
--font-size-body-sm: 0.875rem; /* 14px */
--font-size-body-xs: 0.75rem;  /* 12px */

/* 按钮 */
--font-size-btn: 1rem;         /* 16px */
--font-size-btn-sm: 0.875rem;  /* 14px */
--font-size-btn-lg: 1.125rem;  /* 18px */
```

#### 字重
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

#### 行高
```css
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

### 3.3 间距系统

```css
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
```

### 3.4 圆角系统

```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;  /* 圆形 */
```

### 3.5 阴影系统

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
             0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
             0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
             0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### 3.6 响应式断点

```css
/* 断点定义 */
--breakpoint-sm: 640px;   /* 手机横屏 */
--breakpoint-md: 768px;   /* 平板 */
--breakpoint-lg: 1024px;  /* 笔记本 */
--breakpoint-xl: 1280px;  /* 桌面 */
--breakpoint-2xl: 1536px; /* 大屏 */

/* Tailwind CSS 使用 */
sm: '640px'
md: '768px'
lg: '1024px'
xl: '1280px'
2xl: '1536px'
```

### 3.7 动画系统

```css
/* 过渡时长 */
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;

/* 缓动函数 */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* 常用动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### 3.8 组件规范

#### 按钮
```css
/* 主要按钮 */
.btn-primary {
  background: #FF6B6B;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 150ms;
}
.btn-primary:hover {
  background: #FF5252;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

/* 次要按钮 */
.btn-secondary {
  background: transparent;
  color: #0A2540;
  border: 2px solid #0A2540;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
}

/* 幽灵按钮 */
.btn-ghost {
  background: transparent;
  color: #0066FF;
  padding: 0.5rem 1rem;
}
```

#### 卡片
```css
.card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 300ms;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

---

## 4. 双语支持方案

### 4.1 技术架构

#### 国际化框架
- **框架**: `react-i18next` + `i18next`
- **路由**: `react-router-dom` + 语言前缀路由
- **SEO**: `react-helmet-async` + hreflang 标签

#### URL 结构
```
英文（默认）:
/                       → 首页
/product/features       → 功能页面
/solutions/customer-service → 解决方案页面

中文:
/zh/                    → 首页
/zh/product/features    → 功能页面
/zh/solutions/customer-service → 解决方案页面
```

#### 语言切换
```tsx
// 语言切换组件
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    const path = lang === 'en' 
      ? location.pathname.replace(/^\/zh/, '') 
      : `/zh${location.pathname}`;
    navigate(path);
  };

  return (
    <select 
      value={i18n.language} 
      onChange={(e) => switchLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="zh">中文</option>
    </select>
  );
}
```

### 4.2 语言包结构

```
locales/
├── en/
│   ├── common.json          # 通用文案（导航、按钮、错误信息等）
│   ├── home.json            # 首页
│   ├── product.json         # 产品页面
│   ├── solutions.json       # 解决方案
│   ├── pricing.json         # 定价
│   ├── demo.json            # 演示
│   ├── docs.json            # 文档
│   ├── company.json         # 公司信息
│   ├── customers.json       # 客户案例
│   ├── legal.json           # 法律条款
│   └── seo.json             # SEO 元数据
│
└── zh/
    ├── common.json
    ├── home.json
    ├── product.json
    ├── solutions.json
    ├── pricing.json
    ├── demo.json
    ├── docs.json
    ├── company.json
    ├── customers.json
    ├── legal.json
    └── seo.json
```

### 4.3 翻译范围清单

| 类别 | 翻译项 | 文件位置 |
|------|--------|----------|
| **导航** | 主导航、Footer导航、移动端菜单 | `common.json` |
| **按钮** | 所有CTA按钮文案 | `common.json` |
| **表单** | 标签、占位符、错误消息 | `common.json` + 各页面 |
| **首页** | Hero、Social Proof、Features、Use Cases | `home.json` |
| **产品** | 功能描述、技术参数、安全认证 | `product.json` |
| **解决方案** | 行业场景、痛点描述 | `solutions.json` |
| **定价** | 价格、功能对比、FAQ | `pricing.json` |
| **演示** | 音频描述、视频标题 | `demo.json` |
| **文档** | 标题、目录、说明 | `docs.json` |
| **公司** | 关于我们、招聘、联系 | `company.json` |
| **客户** | 案例研究、客户评价 | `customers.json` |
| **法律** | 隐私政策、服务条款、GDPR | `legal.json` |
| **SEO** | title、description、keywords | `seo.json` |

### 4.4 SEO 多语言优化

#### hreflang 标签
```html
<!-- 每个页面都应包含 -->
<link rel="alternate" hreflang="en" href="https://example.com/page" />
<link rel="alternate" hreflang="zh" href="https://example.com/zh/page" />
<link rel="alternate" hreflang="x-default" href="https://example.com/page" />
```

#### 元数据翻译
```tsx
// 使用 react-helmet-async
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

function PageMeta({ pageKey }) {
  const { t } = useTranslation('seo');
  
  return (
    <Helmet>
      <title>{t(`${pageKey}.title`)}</title>
      <meta name="description" content={t(`${pageKey}.description`)} />
      <meta name="keywords" content={t(`${pageKey}.keywords`)} />
    </Helmet>
  );
}
```

---

## 5. 内容占位符设计

### 5.1 客户 Logo 占位符

#### 设计规格
```html
<div class="customer-logo-placeholder">
  <div class="placeholder-box">
    <svg><!-- Logo 图标 --></svg>
    <span class="placeholder-text">Your Logo Here</span>
  </div>
</div>
```

#### 样式
```css
.customer-logo-placeholder {
  width: 160px;
  height: 60px;
  background: #F3F4F6;
  border: 2px dashed #D1D5DB;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: all 0.3s;
}
.customer-logo-placeholder:hover {
  opacity: 1;
  border-color: #0066FF;
}
```

#### 使用说明
```
📁 文件位置: public/images/customers/
📐 推荐尺寸: 160x60px (或 2x: 320x120px)
🎨 格式: SVG 或 PNG (透明背景)
📝 命名: customer-[公司名].svg
```

### 5.2 音频 Demo 占位符

#### 设计规格
```html
<div class="audio-demo-placeholder">
  <div class="audio-player">
    <div class="waveform-placeholder">
      <!-- 占位波形图 -->
      <svg class="waveform-bars">
        <rect x="0" y="10" height="20" />
        <rect x="5" y="5" height="30" />
        <!-- ...更多条形 -->
      </svg>
    </div>
    <div class="audio-controls">
      <button class="play-btn">▶ Play Sample</button>
      <span class="duration">0:00 / 0:00</span>
    </div>
  </div>
  <div class="upload-hint">
    <p>📁 上传音频样本</p>
    <p>支持格式: MP3, WAV, M4A</p>
    <p>推荐时长: 30秒 - 3分钟</p>
  </div>
</div>
```

#### 文件要求
```
📁 文件位置: public/audio/
🎵 格式: MP3 (推荐), WAV, M4A
📏 大小: < 5MB
⏱️ 时长: 30秒 - 5分钟
📝 命名: demo-[场景].mp3
   例: demo-customer-service.mp3
```

### 5.3 视频占位符

#### 设计规格
```html
<div class="video-placeholder">
  <div class="video-container">
    <div class="play-button">
      <svg><!-- 播放图标 --></svg>
    </div>
    <div class="video-info">
      <h4>视频标题占位</h4>
      <p>时长: 2:30</p>
    </div>
  </div>
  <div class="upload-guide">
    <p>📹 上传演示视频</p>
    <p>支持: MP4, WebM</p>
    <p>推荐: 1080p, 16:9</p>
  </div>
</div>
```

#### 文件要求
```
📁 文件位置: public/videos/
🎥 格式: MP4 (H.264), WebM
📏 大小: < 100MB
📐 分辨率: 1920x1080 (推荐)
📐 比例: 16:9
📝 命名: tutorial-[名称].mp4
```

### 5.4 客户案例占位符

#### 模板结构
```typescript
interface CaseStudy {
  // 基本信息
  id: string;
  slug: string;
  
  // 客户信息
  customer: {
    name: string;           // 公司名
    logo: string;           // Logo 路径
    industry: string;       // 行业
    size: string;           // 公司规模
    location: string;       // 地区
  };
  
  // 案例内容
  title: {
    en: string;             // 英文标题
    zh: string;             // 中文标题
  };
  summary: {
    en: string;             // 英文摘要
    zh: string;             // 中文摘要
  };
  
  // 结构化内容
  challenge: {
    en: string;             // 面临的挑战
    zh: string;
  };
  solution: {
    en: string;             // 我们的方案
    zh: string;
  };
  results: Array<{
    metric: string;         // 指标名称
    value: string;          // 数值
    description: string;    // 说明
  }>;
  
  // 多媒体
  images: string[];         // 截图图片
  video?: string;           // 视频链接
  
  // 引用
  quote?: {
    text: string;
    author: string;
    title: string;
    avatar: string;
  };
}
```

#### 占位示例
```json
{
  "id": "case-001",
  "slug": "techcorp-customer-service",
  "customer": {
    "name": "TechCorp",
    "logo": "/images/customers/techcorp.svg",
    "industry": "Technology",
    "size": "500-1000 employees",
    "location": "United States"
  },
  "title": {
    "en": "How TechCorp Reduced Support Costs by 60%",
    "zh": "TechCorp 如何降低 60% 客服成本"
  },
  "summary": {
    "en": "Learn how TechCorp transformed their customer service with AI voice agents.",
    "zh": "了解 TechCorp 如何用 AI 语音智能体革新客服体系。"
  },
  "challenge": {
    "en": "[PASTE_CHALLENGE_HERE]",
    "zh": "[在此粘贴挑战描述]"
  },
  "solution": {
    "en": "[PASTE_SOLUTION_HERE]",
    "zh": "[在此粘贴方案描述]"
  },
  "results": [
    {
      "metric": "Cost Reduction",
      "value": "60%",
      "description": "Reduced support costs"
    },
    {
      "metric": "Response Time",
      "value": "-80%",
      "description": "Faster response"
    }
  ],
  "images": [
    "/images/case-studies/techcorp-1.png"
  ],
  "quote": {
    "text": "[PASTE_QUOTE_HERE]",
    "author": "Sarah Chen",
    "title": "VP of Customer Service",
    "avatar": "/images/avatars/sarah-chen.jpg"
  }
}
```

### 5.5 团队照片占位符

#### 设计规格
```html
<div class="team-member-placeholder">
  <div class="avatar-placeholder">
    <svg><!-- 默认头像图标 --></svg>
  </div>
  <div class="member-info">
    <h4 class="name">[姓名]</h4>
    <p class="title">[职位]</p>
    <p class="bio">[简短介绍]</p>
  </div>
</div>
```

#### 文件要求
```
📁 文件位置: public/images/team/
📐 尺寸: 400x400px (正方形)
🎨 格式: JPG 或 PNG
📝 命名: team-[姓名拼音].jpg
   例: team-john-smith.jpg
```

### 5.6 数据指标占位符

#### 配置结构
```typescript
interface Metric {
  key: string;
  value: string;
  suffix?: string;
  prefix?: string;
  label: {
    en: string;
    zh: string;
  };
  description?: {
    en: string;
    zh: string;
  };
}

// 示例配置
const metrics: Metric[] = [
  {
    key: 'calls_monthly',
    value: '10',           // 可编辑
    suffix: 'M+',
    label: {
      en: 'Calls Monthly',
      zh: '月通话量'
    },
    description: {
      en: 'Voice calls processed every month',
      zh: '每月处理的语音通话'
    }
  },
  {
    key: 'accuracy',
    value: '99.5',
    suffix: '%',
    label: {
      en: 'Accuracy',
      zh: '准确率'
    }
  },
  {
    key: 'cost_reduction',
    value: '60',
    suffix: '%',
    label: {
      en: 'Cost Reduction',
      zh: '成本降低'
    }
  },
  {
    key: 'uptime',
    value: '99.9',
    suffix: '%',
    label: {
      en: 'Uptime',
      zh: '可用性'
    }
  }
];
```

---

## 6. 技术架构

### 6.1 项目结构

```
voice-ai-website/
├── .github/
│   └── workflows/
│       ├── deploy.yml           # 部署工作流
│       └── lighthouse.yml       # 性能检查
│
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── images/
│   │   ├── logo/                # Logo 资源
│   │   ├── customers/           # 客户 Logo
│   │   ├── team/                # 团队照片
│   │   ├── case-studies/        # 案例图片
│   │   ├── icons/               # 图标
│   │   └── og/                  # 社交分享图
│   ├── audio/
│   │   └── demos/               # 音频 Demo
│   └── videos/
│       └── tutorials/           # 教程视频
│
├── src/
│   ├── components/
│   │   ├── common/              # 通用组件
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Tooltip/
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Navigation/
│   │   │   ├── Sidebar/
│   │   │   └── Layout.tsx
│   │   ├── sections/
│   │   │   ├── Hero/
│   │   │   ├── SocialProof/
│   │   │   ├── Features/
│   │   │   ├── HowItWorks/
│   │   │   ├── AudioDemo/
│   │   │   ├── UseCases/
│   │   │   ├── Integrations/
│   │   │   ├── Testimonials/
│   │   │   ├── Security/
│   │   │   ├── CTA/
│   │   │   └── ...
│   │   ├── demo/
│   │   │   ├── AudioPlayer/
│   │   │   ├── WaveformVisualizer/
│   │   │   ├── LiveDemo/
│   │   │   └── ...
│   │   └── icons/
│   │       └── index.tsx        # Icon 组件库
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Product/
│   │   │   ├── index.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Technology.tsx
│   │   │   ├── Security.tsx
│   │   │   └── Integrations.tsx
│   │   ├── Solutions/
│   │   │   ├── index.tsx
│   │   │   ├── CustomerService.tsx
│   │   │   ├── Sales.tsx
│   │   │   ├── Collections.tsx
│   │   │   ├── AppointmentReminders.tsx
│   │   │   └── SurveyFeedback.tsx
│   │   ├── Pricing/
│   │   │   └── index.tsx
│   │   ├── Demo/
│   │   │   ├── index.tsx
│   │   │   ├── AudioSamples.tsx
│   │   │   ├── LiveDemo.tsx
│   │   │   └── VideoTutorials.tsx
│   │   ├── Docs/
│   │   │   ├── index.tsx
│   │   │   ├── QuickStart.tsx
│   │   │   ├── APIReference.tsx
│   │   │   ├── SDKs.tsx
│   │   │   └── Tutorials.tsx
│   │   ├── Company/
│   │   │   ├── About.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── Careers.tsx
│   │   │   └── Contact.tsx
│   │   ├── Customers/
│   │   │   ├── CaseStudies.tsx
│   │   │   └── Testimonials.tsx
│   │   └── Legal/
│   │       ├── Privacy.tsx
│   │       ├── Terms.tsx
│   │       └── GDPR.tsx
│   │
│   ├── hooks/
│   │   ├── useTranslation.ts    # 国际化 Hook
│   │   ├── useAudio.ts          # 音频播放 Hook
│   │   ├── useScrollPosition.ts # 滚动位置 Hook
│   │   ├── useInView.ts         # 元素可见性 Hook
│   │   └── useAnalytics.ts      # 分析追踪 Hook
│   │
│   ├── locales/
│   │   ├── en/
│   │   │   ├── common.json
│   │   │   ├── home.json
│   │   │   ├── product.json
│   │   │   ├── solutions.json
│   │   │   ├── pricing.json
│   │   │   ├── demo.json
│   │   │   ├── docs.json
│   │   │   ├── company.json
│   │   │   ├── customers.json
│   │   │   ├── legal.json
│   │   │   └── seo.json
│   │   └── zh/
│   │       ├── common.json
│   │       ├── home.json
│   │       ├── product.json
│   │       ├── solutions.json
│   │       ├── pricing.json
│   │       ├── demo.json
│   │       ├── docs.json
│   │       ├── company.json
│   │       ├── customers.json
│   │       ├── legal.json
│   │       └── seo.json
│   │
│   ├── styles/
│   │   ├── globals.css          # 全局样式
│   │   ├── variables.css        # CSS 变量
│   │   ├── animations.css       # 动画样式
│   │   └── components.css       # 组件样式
│   │
│   ├── utils/
│   │   ├── analytics.ts         # 分析工具
│   │   ├── api.ts               # API 工具
│   │   ├── formatters.ts        # 格式化工具
│   │   ├── validators.ts        # 验证工具
│   │   └── constants.ts         # 常量定义
│   │
│   ├── data/
│   │   ├── features.ts          # 功能数据
│   │   ├── use-cases.ts         # 使用场景数据
│   │   ├── testimonials.ts      # 客户评价数据
│   │   ├── integrations.ts      # 集成数据
│   │   ├── metrics.ts           # 指标数据
│   │   └── case-studies.ts      # 案例数据
│   │
│   ├── types/
│   │   ├── index.ts             # 类型导出
│   │   ├── components.ts        # 组件类型
│   │   ├── data.ts              # 数据类型
│   │   └── api.ts               # API 类型
│   │
│   ├── App.tsx                  # 根组件
│   ├── main.tsx                 # 入口文件
│   └── vite-env.d.ts            # Vite 类型声明
│
├── docs/
│   ├── CONTENT_GUIDE.md         # 内容填充指南
│   ├── TRANSLATION_GUIDE.md     # 翻译指南
│   └── COMPONENT_GUIDE.md       # 组件使用指南
│
├── .env.example                 # 环境变量示例
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

### 6.2 技术栈选型

| 类别 | 技术 | 用途 |
|------|------|------|
| **框架** | React 18+ | UI 框架 |
| **构建工具** | Vite | 快速构建 |
| **路由** | React Router v6 | 客户端路由 |
| **国际化** | react-i18next | 多语言支持 |
| **样式** | Tailwind CSS | 原子化 CSS |
| **动画** | Framer Motion | 动画库 |
| **3D 效果** | Three.js / React Three Fiber | 3D 渲染 |
| **音频** | Howler.js | 音频播放 |
| **波形** | Wavesurfer.js | 音频波形可视化 |
| **表单** | React Hook Form | 表单处理 |
| **验证** | Zod | 数据验证 |
| **SEO** | React Helmet Async | 元数据管理 |
| **分析** | Google Analytics 4 | 用户分析 |
| **监控** | Sentry | 错误监控 |
| **测试** | Vitest + Playwright | 单元/E2E 测试 |
| **部署** | Vercel / Cloudflare Pages | 静态托管 |

### 6.3 关键组件实现

#### 音频播放器组件
```tsx
// src/components/demo/AudioPlayer/AudioPlayer.tsx
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  title: string;
  scenario: string;
}

export function AudioPlayer({ src, title, scenario }: AudioPlayerProps) {
  const { t } = useTranslation('demo');
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#0066FF',
      progressColor: '#FF6B6B',
      cursorColor: '#0A2540',
      barWidth: 3,
      barRadius: 3,
      cursorWidth: 1,
      height: 80,
      barGap: 2,
    });

    wavesurferRef.current.load(src);

    wavesurferRef.current.on('ready', () => {
      setDuration(wavesurferRef.current?.getDuration() || 0);
    });

    wavesurferRef.current.on('audioprocess', () => {
      setCurrentTime(wavesurferRef.current?.getCurrentTime() || 0);
    });

    wavesurferRef.current.on('finish', () => {
      setIsPlaying(false);
    });

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [src]);

  const togglePlay = () => {
    if (!wavesurferRef.current) return;
    
    if (isPlaying) {
      wavesurferRef.current.pause();
    } else {
      wavesurferRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const restart = () => {
    if (!wavesurferRef.current) return;
    wavesurferRef.current.seekTo(0);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-player">
      <div className="audio-player-header">
        <h4>{title}</h4>
        <span className="scenario">{scenario}</span>
      </div>
      
      <div ref={containerRef} className="waveform-container" />
      
      <div className="audio-player-controls">
        <button onClick={restart} className="restart-btn">
          <RotateCcw size={20} />
        </button>
        
        <button onClick={togglePlay} className="play-btn">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        
        <span className="time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
```

#### 语言切换器组件
```tsx
// src/components/common/LanguageSwitcher/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  const switchLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    
    // 更新 URL
    const currentPath = location.pathname;
    const newPath = langCode === 'en'
      ? currentPath.replace(/^\/zh/, '') || '/'
      : `/zh${currentPath}`;
    
    navigate(newPath);
    
    // 存储偏好
    localStorage.setItem('preferredLanguage', langCode);
  };

  return (
    <div className="language-switcher">
      <Globe size={18} />
      <select
        value={i18n.language}
        onChange={(e) => switchLanguage(e.target.value)}
        className="language-select"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
```

---

## 7. 内容填充指南

### 7.1 概述

本文档为网站内容填充提供详细指南。所有需要填充的内容都已设计好占位符和数据结构，按照以下步骤即可完成内容替换。

### 7.2 内容清单

#### 📊 需要填充的内容类型

| 内容类型 | 位置 | 格式 | 数量 | 优先级 |
|----------|------|------|------|--------|
| 客户 Logo | Social Proof | PNG/SVG | 6-12 个 | 高 |
| 数据指标 | Social Proof | JSON | 4 个 | 高 |
| 功能描述 | Features | JSON | 8 个 | 高 |
| 音频 Demo | Audio Demo | MP3 | 4-6 个 | 高 |
| 客户评价 | Testimonials | JSON | 6-10 条 | 中 |
| 客户案例 | Case Studies | MD/JSON | 4-6 个 | 中 |
| 团队照片 | About | JPG | 按需 | 低 |
| 视频教程 | Demo | MP4 | 3-5 个 | 低 |
| 集成 Logo | Integrations | PNG/SVG | 12-20 个 | 低 |

### 7.3 内容填充步骤

#### Step 1: 准备媒体资源

```bash
# 1. 创建目录结构
public/
├── images/
│   ├── customers/        # 客户 Logo (160x60px)
│   ├── team/             # 团队照片 (400x400px)
│   ├── case-studies/     # 案例图片 (800x600px)
│   ├── icons/            # 功能图标 (64x64px)
│   └── og/               # 社交分享图 (1200x630px)
├── audio/
│   └── demos/            # 音频 Demo (< 5MB)
└── videos/
    └── tutorials/        # 教程视频 (< 100MB)
```

#### Step 2: 更新数据文件

```typescript
// src/data/metrics.ts
export const metrics = [
  {
    key: 'calls_monthly',
    value: '10',      // ← 修改这里
    suffix: 'M+',
    label: {
      en: 'Calls Monthly',
      zh: '月通话量'
    }
  },
  // ... 其他指标
];
```

#### Step 3: 更新翻译文件

```json
// src/locales/en/home.json
{
  "hero": {
    "title": "Transform Your Customer Conversations with AI Voice",
    "subtitle": "Deploy intelligent voice agents..."
  },
  // ← 根据需要修改文案
}
```

#### Step 4: 添加客户案例

```typescript
// src/data/case-studies.ts
export const caseStudies: CaseStudy[] = [
  {
    id: 'case-001',
    slug: 'techcorp-customer-service',
    customer: {
      name: 'TechCorp',           // ← 填入客户名称
      logo: '/images/customers/techcorp.svg',  // ← Logo 路径
      industry: 'Technology',
      size: '500-1000 employees',
      location: 'United States'
    },
    title: {
      en: 'How TechCorp Reduced Support Costs by 60%',
      zh: 'TechCorp 如何降低 60% 客服成本'
    },
    // ... 其他字段
  }
];
```

### 7.4 各内容类型详细指南

#### 📸 客户 Logo

**要求:**
- 尺寸: 160x60px (或 2x: 320x120px)
- 格式: SVG (推荐) 或 PNG (透明背景)
- 风格: 灰度或品牌色，保持一致性

**放置位置:**
```
public/images/customers/[公司名].svg
```

**更新数据:**
```typescript
// src/data/integrations.ts
export const customerLogos = [
  { name: 'TechCorp', logo: '/images/customers/techcorp.svg', url: 'https://...' },
  // 添加更多
];
```

#### 🎵 音频 Demo

**要求:**
- 格式: MP3 (推荐)
- 大小: < 5MB
- 时长: 30秒 - 3分钟
- 质量: 128kbps 或更高

**场景建议:**
| 场景 | 英文文件名 | 内容 |
|------|------------|------|
| 客服咨询 | demo-customer-service.mp3 | 产品咨询、订单查询 |
| 销售外呼 | demo-sales.mp3 | 产品推介、预约演示 |
| 催收回款 | demo-collections.mp3 | 账单提醒、还款协商 |
| 调研反馈 | demo-survey.mp3 | 满意度调查、市场调研 |

**更新数据:**
```typescript
// src/data/audio-demos.ts
export const audioDemos = [
  {
    id: 'demo-001',
    title: 'Customer Service Demo',
    scenario: 'customer-service',
    src: '/audio/demos/demo-customer-service.mp3',
    duration: '2:45',
    description: {
      en: 'Product inquiry and order tracking scenario',
      zh: '产品咨询、订单查询场景'
    }
  }
];
```

#### 💬 客户评价

**要求:**
- 头像: 200x200px 正方形
- 引用: 100-200 字
- 包含: 姓名、职位、公司

**数据结构:**
```typescript
// src/data/testimonials.ts
export const testimonials = [
  {
    id: 't-001',
    quote: {
      en: 'This AI voice agent transformed our customer service...',
      zh: '这个 AI 语音智能体彻底改变了我们的客服体系...'
    },
    author: {
      name: 'Sarah Chen',
      title: 'VP of Customer Service',
      company: 'TechCorp',
      avatar: '/images/avatars/sarah-chen.jpg'
    },
    featured: true  // 是否在首页展示
  }
];
```

#### 📋 客户案例

**模板:**
```markdown
# [客户名称] - [行业]

## 挑战
[描述客户面临的主要挑战和痛点]

## 解决方案
[描述如何使用我们的产品解决问题]

## 成果
- **指标1**: 具体数值
- **指标2**: 具体数值
- **指标3**: 具体数值

## 客户评价
> "[客户引言]"
> — [姓名], [职位], [公司]
```

**数据结构:**
```typescript
// src/data/case-studies.ts
export const caseStudies = [
  {
    id: 'case-001',
    slug: 'company-name-industry',
    customer: {
      name: 'Company Name',
      logo: '/images/customers/company.svg',
      industry: 'Technology',
      size: '500-1000 employees',
      location: 'United States'
    },
    title: {
      en: 'How [Company] Reduced Support Costs by 60%',
      zh: '[公司] 如何降低 60% 客服成本'
    },
    challenge: {
      en: 'Description of the challenge...',
      zh: '挑战描述...'
    },
    solution: {
      en: 'Description of the solution...',
      zh: '方案描述...'
    },
    results: [
      { metric: 'Cost Reduction', value: '60%', description: 'Reduced support costs' },
      { metric: 'Response Time', value: '-80%', description: 'Faster response' }
    ],
    images: ['/images/case-studies/company-1.png'],
    quote: {
      text: 'Customer quote...',
      author: 'Name',
      title: 'Title',
      avatar: '/images/avatars/name.jpg'
    }
  }
];
```

#### 👥 团队照片

**要求:**
- 尺寸: 400x400px (正方形)
- 格式: JPG 或 PNG
- 风格: 专业头像照

**命名:**
```
public/images/team/team-[姓名拼音].jpg
例: team-john-smith.jpg
```

**数据:**
```typescript
// src/data/team.ts
export const team = [
  {
    name: 'John Smith',
    title: {
      en: 'CEO & Co-founder',
      zh: 'CEO & 联合创始人'
    },
    bio: {
      en: 'Brief bio...',
      zh: '简介...'
    },
    avatar: '/images/team/team-john-smith.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/...',
      twitter: 'https://twitter.com/...'
    }
  }
];
```

### 7.5 翻译流程

#### 步骤 1: 准备翻译文件
```bash
# 复制英文文件作为模板
cp src/locales/en/*.json src/locales/zh/
```

#### 步骤 2: 翻译内容
```json
// src/locales/zh/home.json
{
  "hero": {
    "title": "用 AI 语音智能体，重塑客户对话体验",
    "subtitle": "部署听起来像真人、能理解上下文、能驱动结果的语音智能体。"
  }
}
```

#### 步骤 3: 验证翻译
- 使用专业翻译工具或人工翻译
- 检查专业术语一致性
- 确保品牌名称统一

### 7.6 SEO 内容

#### 元数据配置
```typescript
// src/data/seo.ts
export const seoConfig = {
  home: {
    en: {
      title: 'AI Voice Agent Platform - Transform Customer Conversations',
      description: 'Deploy intelligent voice agents that sound human, understand context, and drive results. Reduce costs by 60% with enterprise-grade AI voice technology.',
      keywords: 'AI voice agent, voice AI, customer service automation, voice bot, call center AI'
    },
    zh: {
      title: 'AI 语音智能体平台 - 重塑客户对话体验',
      description: '部署听起来像真人、能理解上下文、能驱动结果的语音智能体。使用企业级 AI 语音技术降低 60% 成本。',
      keywords: 'AI 语音智能体, 语音 AI, 客服自动化, 语音机器人, 呼叫中心 AI'
    }
  },
  // ... 其他页面
};
```

#### Open Graph 图片
```
尺寸: 1200 x 630 px
格式: PNG 或 JPG
位置: public/images/og/

为每个主要页面创建 OG 图片:
- og-home.png
- og-product.png
- og-pricing.png
- ...
```

### 7.7 内容检查清单

#### 上线前检查

- [ ] 所有客户 Logo 已添加
- [ ] 所有数据指标已更新为真实数据
- [ ] 所有音频 Demo 已上传并测试
- [ ] 所有客户评价已添加真实引用
- [ ] 所有客户案例已填充完整内容
- [ ] 所有页面中英文翻译完成
- [ ] 所有 SEO 元数据已配置
- [ ] 所有 OG 图片已创建
- [ ] 所有链接已测试
- [ ] 所有表单已测试
- [ ] 跨浏览器测试完成
- [ ] 移动端测试完成
- [ ] 性能测试完成

---

## 附录

### A. 文件命名规范

```
图片: kebab-case.png
  例: customer-logo-techcorp.png

音频: kebab-case.mp3
  例: demo-customer-service.mp3

视频: kebab-case.mp4
  例: tutorial-getting-started.mp4

组件: PascalCase.tsx
  例: AudioPlayer.tsx

工具: camelCase.ts
  例: formatTime.ts

数据: kebab-case.ts
  例: case-studies.ts
```

### B. Git 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 样式调整
refactor: 重构
perf: 性能优化
test: 测试
chore: 构建/工具

例:
feat: add audio player component
fix: resolve language switcher bug
docs: update content guide
```

### C. 性能目标

| 指标 | 目标 |
|------|------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| TTI (Time to Interactive) | < 3.5s |
| 首屏加载 | < 1.5MB |

---

**文档版本**: 1.0  
**最后更新**: 2024-04-01  
**维护者**: AI Voice Agent Team