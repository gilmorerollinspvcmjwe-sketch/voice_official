# 翻译指南

> 本指南为网站中英文翻译提供规范和流程。

---

## 🌐 翻译范围

### 需要翻译的内容

| 类别 | 文件位置 | 翻译项数量 |
|------|----------|------------|
| 通用文案 | `locales/*/common.json` | ~50 |
| 首页 | `locales/*/home.json` | ~100 |
| 产品页 | `locales/*/product.json` | ~80 |
| 解决方案 | `locales/*/solutions.json` | ~60 |
| 定价 | `locales/*/pricing.json` | ~40 |
| 演示 | `locales/*/demo.json` | ~30 |
| 文档 | `locales/*/docs.json` | ~50 |
| 公司 | `locales/*/company.json` | ~40 |
| 客户 | `locales/*/customers.json` | ~30 |
| 法律 | `locales/*/legal.json` | ~100 |
| SEO | `locales/*/seo.json` | ~30 |

---

## 📝 翻译原则

### 1. 保持品牌一致性

```
产品名称统一:
- AI Voice Agent → AI 语音智能体
- Voice AI Platform → 语音 AI 平台
- Voice Agent → 语音智能体（不翻译为"语音代理")

品牌名不翻译:
- 公司名称保持英文
- 技术名称如 "LLM" 保持原样
```

### 2. 专业术语统一

| 英文 | 中文翻译 | 说明 |
|------|----------|------|
| AI Voice Agent | AI 语音智能体 | 核心产品名称 |
| TTS (Text-to-Speech) | 语音合成 | 技术术语 |
| NLU (Natural Language Understanding) | 自然语言理解 | 技术术语 |
| Call Center | 呼叫中心 | 行业术语 |
| Customer Service | 客服 | 常用缩写 |
| Inbound | 来电/呼入 | 电话类型 |
| Outbound | 外呼/呼出 | 电话类型 |
| Integration | 集成 | 技术术语 |
| API | API | 保持英文 |
| SDK | SDK | 保持英文 |
| Dashboard | 控制台/仪表盘 | 界面术语 |
| Analytics | 数据分析 | 功能名称 |
| Uptime | 可用性 | 技术指标 |
| SLA | 服务等级协议 | 合同术语 |

### 3. 文案风格

```
英文风格:
- 直接、简洁、行动导向
- 使用主动语态
- 避免冗长句子

中文风格:
- 自然、流畅
- 保持专业性
- 避生硬翻译腔
```

### 4. 格式保持

```json
// 英文原文
{
  "hero": {
    "title": "Transform Your Customer Conversations",
    "cta": {
      "primary": "Start Free Trial",
      "secondary": "Watch Demo"
    }
  }
}

// 中文翻译（保持结构一致）
{
  "hero": {
    "title": "重塑您的客户对话体验",
    "cta": {
      "primary": "免费试用",
      "secondary": "观看演示"
    }
  }
}
```

---

## 🔤 常见翻译对照表

### 导航菜单

| 英文 | 中文 |
|------|------|
| Product | 产品 |
| Features | 功能特性 |
| Technology | 技术架构 |
| Security | 安全合规 |
| Integrations | 集成 |
| Solutions | 解决方案 |
| Customer Service | 客服 |
| Sales | 销售 |
| Collections | 催收 |
| Appointment Reminders | 预约提醒 |
| Survey & Feedback | 调研反馈 |
| Pricing | 定价 |
| Demo | 演示 |
| Docs | 文档 |
| Quick Start | 快速开始 |
| API Reference | API 参考 |
| SDKs | 开发工具包 |
| Tutorials | 教程 |
| Company | 公司 |
| About | 关于我们 |
| Blog | 博客 |
| Careers | 招聘 |
| Contact | 联系 |
| Customers | 客户 |
| Case Studies | 案例研究 |
| Testimonials | 客户评价 |
| Legal | 法律 |
| Privacy Policy | 隐私政策 |
| Terms of Service | 服务条款 |
| GDPR Compliance | GDPR 合规 |

### 按钮文案

| 英文 | 中文 |
|------|------|
| Start Free Trial | 免费试用 |
| Get Started | 开始使用 |
| Watch Demo | 观看演示 |
| Contact Sales | 联系销售 |
| Learn More | 了解更多 |
| View All | 查看全部 |
| Sign In | 登录 |
| Sign Up | 注册 |
| Subscribe | 订阅 |
| Download | 下载 |
| Play | 播放 |
| Pause | 暂停 |
| Share | 分享 |

### 状态标签

| 英文 | 中文 |
|------|------|
| No credit card required | 无需信用卡 |
| Setup in 5 minutes | 5分钟快速上手 |
| Free forever | 永久免费 |
| Enterprise | 企业版 |
| Popular | 热门 |
| New | 新功能 |
| Recommended | 推荐 |
| Featured | 精选 |

### 表单字段

| 英文 | 中文 |
|------|------|
| Name | 姓名 |
| Email | 电子邮箱 |
| Company | 公司名称 |
| Phone | 电话号码 |
| Message | 留言内容 |
| Submit | 提交 |
| Required | 必填 |
| Optional | 选填 |

### 错误消息

| 英文 | 中文 |
|------|------|
| This field is required | 此字段为必填项 |
| Invalid email format | 邮箱格式不正确 |
| Password too short | 密码太短 |
| Something went wrong | 出错了，请重试 |
| Please try again | 请重试 |
| Network error | 网络错误 |

---

## 📂 文件结构

### 语言包目录

```
src/locales/
├── en/                    # 英文
│   ├── common.json        # 通用文案
│   ├── home.json          # 首页
│   ├── product.json       # 产品页
│   ├── solutions.json     # 解决方案
│   ├── pricing.json       # 定价
│   ├── demo.json          # 演示
│   ├── docs.json          # 文档
│   ├── company.json       # 公司
│   ├── customers.json     # 客户
│   ├── legal.json         # 法律
│   └── seo.json           # SEO 元数据
│
└── zh/                    # 中文
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

### 示例文件内容

#### common.json

```json
{
  "nav": {
    "product": "产品",
    "solutions": "解决方案",
    "pricing": "定价",
    "demo": "演示",
    "docs": "文档",
    "company": "公司",
    "customers": "客户",
    "signIn": "登录",
    "getStarted": "开始使用"
  },
  "footer": {
    "product": {
      "title": "产品",
      "features": "功能特性",
      "technology": "技术架构",
      "security": "安全合规",
      "integrations": "集成"
    },
    "solutions": {
      "title": "解决方案",
      "customerService": "客服",
      "sales": "销售",
      "collections": "催收",
      "survey": "调研反馈"
    },
    "company": {
      "title": "公司",
      "about": "关于我们",
      "blog": "博客",
      "careers": "招聘",
      "contact": "联系"
    },
    "legal": {
      "title": "法律条款",
      "privacy": "隐私政策",
      "terms": "服务条款",
      "gdpr": "GDPR 合规"
    }
  },
  "buttons": {
    "startTrial": "免费试用",
    "watchDemo": "观看演示",
    "contactSales": "联系销售",
    "learnMore": "了解更多",
    "viewAll": "查看全部",
    "submit": "提交"
  },
  "labels": {
    "noCreditCard": "无需信用卡",
    "setupIn5Min": "5分钟快速上手",
    "freeForever": "永久免费",
    "enterprise": "企业版",
    "popular": "热门",
    "new": "新功能"
  },
  "forms": {
    "name": "姓名",
    "email": "电子邮箱",
    "company": "公司名称",
    "phone": "电话号码",
    "message": "留言内容",
    "required": "必填",
    "optional": "选填",
    "submit": "提交"
  },
  "errors": {
    "requiredField": "此字段为必填项",
    "invalidEmail": "邮箱格式不正确",
    "genericError": "出错了，请重试"
  }
}
```

#### home.json

```json
{
  "hero": {
    "title": "用 AI 语音智能体，重塑客户对话体验",
    "subtitle": "部署听起来像真人、能理解上下文、能驱动结果的语音智能体。",
    "cta": {
      "primary": "免费试用",
      "secondary": "观看演示"
    },
    "trustLabel": "无需信用卡 · 5分钟快速上手"
  },
  "socialProof": {
    "title": "全球 500+ 企业信赖",
    "subtitle": "覆盖金融、医疗、零售等多个行业"
  },
  "problem": {
    "title": "传统呼叫中心的困境",
    "items": [
      {
        "icon": "phone",
        "title": "高昂人力成本",
        "description": "每位客服年成本 $40,000+"
      },
      {
        "icon": "clock",
        "title": "24/7 覆盖困难",
        "description": "无法处理夜间和节假日咨询"
      },
      {
        "icon": "users",
        "title": "高员工流失率",
        "description": "平均任期仅 6-12 个月"
      }
    ]
  },
  "solution": {
    "title": "我们的解决方案",
    "items": [
      {
        "icon": "robot",
        "title": "AI 智能体替代",
        "description": "替代 80% 重复工作，成本降低 60%"
      },
      {
        "icon": "zap",
        "title": "全天候服务",
        "description": "24/7 无间断响应客户需求"
      },
      {
        "icon": "target",
        "title": "零培训成本",
        "description": "分钟级部署，即刻上岗"
      }
    ]
  },
  "features": {
    "title": "选择我们平台的理由",
    "subtitle": "业界领先的语音 AI 技术栈"
  },
  "howItWorks": {
    "title": "四步快速上手",
    "steps": [
      {
        "number": "01",
        "title": "定义你的智能体",
        "description": "设置智能体名字、角色和任务目标"
      },
      {
        "number": "02",
        "title": "配置语音风格",
        "description": "选择声音风格，设定对话流程"
      },
      {
        "number": "03",
        "title": "分钟部署",
        "description": "一键部署，即刻上线"
      },
      {
        "number": "04",
        "title": "无限扩展",
        "description": "弹性扩展，随业务增长"
      }
    ]
  },
  "useCases": {
    "title": "覆盖各行各业场景",
    "subtitle": "从金融到医疗，满足多样化需求"
  },
  "testimonials": {
    "title": "客户真实反馈",
    "subtitle": "听听他们怎么说"
  },
  "security": {
    "title": "企业级安全保障",
    "subtitle": "多重认证，数据安全无忧"
  },
  "cta": {
    "title": "准备好革新您的客户对话了吗？",
    "subtitle": "开始免费试用，无需信用卡",
    "buttons": {
      "primary": "免费试用",
      "secondary": "联系销售"
    }
  }
}
```

---

## 🛠️ 翻译流程

### Step 1: 准备翻译环境

```bash
# 确保语言包目录存在
mkdir -p src/locales/zh

# 复制英文文件作为模板
cp src/locales/en/*.json src/locales/zh/
```

### Step 2: 翻译单个文件

```bash
# 1. 打开中文文件
# 2. 翻译所有键值（保持 JSON 结构）
# 3. 保存文件
```

### Step 3: 验证翻译

```bash
# 检查 JSON 格式是否正确
node -e "console.log(JSON.parse(require('./src/locales/zh/home.json')))"

# 或使用在线 JSON 验证器
```

### Step 4: 测试页面

```bash
# 启动开发服务器
npm run dev

# 切换语言验证显示
http://localhost:3000/zh/
```

---

## ✅ 翻译检查清单

### 格式检查

- [ ] JSON 结构与英文一致
- [ ] 所有键名保持英文（不翻译键名）
- [ ] 无多余空格或换行
- [ ] 特殊字符正确转义

### 内容检查

- [ ] 专业术语翻译统一
- [ ] 品牌名称正确处理
- [ ] 无翻译腔（自然流畅）
- [ ] 数字和单位正确保留
- [ ] 链接路径未误改

### SEO 检查

- [ ] title 翻译完整
- [ ] description 翻译完整
- [ ] keywords 翻译适配中文搜索习惯
- [ ] hreflang 标签正确配置

---

## 🔗 技术集成

### i18next 配置

```typescript
// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入语言包
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import zhCommon from './locales/zh/common.json';
import zhHome from './locales/zh/home.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        // ...其他命名空间
      },
      zh: {
        common: zhCommon,
        home: zhHome,
        // ...其他命名空间
      }
    },
    defaultNS: 'common',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

### 组件中使用

```tsx
import { useTranslation } from 'react-i18next';

function Hero() {
  const { t } = useTranslation('home');
  
  return (
    <section>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button>{t('hero.cta.primary')}</button>
    </section>
  );
}
```

### 带插值的翻译

```json
// locales/en/common.json
{
  "welcome": "Welcome, {{name}}!"
}

// locales/zh/common.json
{
  "welcome": "欢迎，{{name}}！"
}
```

```tsx
// 使用
const { t } = useTranslation('common');
<p>{t('welcome', { name: 'John' })}</p>
```

---

## 📚 翻译工具推荐

### 在线工具

| 工具 | 网址 | 用途 |
|------|------|------|
| DeepL | deepl.com | 高质量机器翻译 |
| Google Translate | translate.google.com | 批量翻译参考 |
| JSON Editor | jsoneditoronline.org | JSON 格式验证 |

### VS Code 插件

```
- i18n Ally: 可视化翻译编辑
- JSON Tools: JSON 格式化
```

### AI 辅助

```
推荐使用 Claude 或 ChatGPT 辅助翻译:
- 保持 JSON 结构
- 翻译所有键值
- 验证专业术语
- 检查格式错误
```

---

**文档版本**: 1.0  
**最后更新**: 2024-04-01