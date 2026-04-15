# VoiceAI - 企业级语音AI智能体官网

一个现代化的、专业的AI语音智能体产品官网，支持中英双语，响应式设计。

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 📁 项目结构

```
voice-ai-website/
├── public/               # 静态资源
│   ├── images/           # 图片资源
│   │   ├── customers/    # 客户Logo (160x60px)
│   │   ├── team/         # 团队照片 (400x400px)
│   │   ├── avatars/      # 头像图片 (200x200px)
│   │   ├── case-studies/ # 案例图片 (800x600px)
│   │   └── og/           # 社交分享图 (1200x630px)
│   ├── audio/            # 音频文件
│   │   └── demos/        # Demo音频 (< 5MB)
│   └── videos/           # 视频文件
│       └── tutorials/    # 教程视频 (< 100MB)
│
├── src/
│   ├── components/       # React组件
│   │   ├── common/       # 通用组件 (Button, Card等)
│   │   ├── layout/       # 布局组件 (Navbar, Footer)
│   │   └── sections/     # 首页区块组件
│   │
│   ├── pages/            # 页面组件
│   │
│   ├── locales/          # 国际化翻译文件
│   │   ├── en/           # 英文翻译
│   │   └── zh/           # 中文翻译
│   │
│   ├── data/             # 数据配置文件
│   │   ├── metrics.ts    # 数据指标
│   │   ├── testimonials.ts # 客户评价
│   │   ├── case-studies.ts # 客户案例
│   │   └── audio-demos.ts  # 音频Demo
│   │
│   ├── stores/           # Zustand状态管理
│   ├── hooks/            # 自定义Hooks
│   ├── utils/            # 工具函数
│   └── styles/           # 全局样式
│
└── docs/                 # 文档
    ├── CONTENT_GUIDE.md  # 内容填充指南
    └── DEPLOYMENT.md     # 部署指南
```

## 🛠 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式**: Tailwind CSS 3
- **动画**: Framer Motion
- **路由**: React Router v6
- **国际化**: react-i18next
- **状态管理**: Zustand
- **图标**: Lucide React
- **组件变体**: CVA (class-variance-authority)

## 📝 内容定制

### 1. 修改数据指标

编辑 `src/data/metrics.ts`:

```typescript
{
  key: 'calls_monthly',
  value: '10',      // ← 修改这里
  suffix: 'M+',
  label: {
    en: 'Calls Monthly',
    zh: '月通话量'
  }
}
```

### 2. 添加客户Logo

1. 将Logo文件放入 `public/images/customers/`
2. 推荐尺寸: 160x60px (SVG或PNG透明背景)
3. Logo会自动显示在首页

### 3. 上传音频Demo

1. 将音频文件放入 `public/audio/demos/`
2. 格式: MP3, 大小 < 5MB
3. 在 `src/data/audio-demos.ts` 中配置

### 4. 添加客户案例

1. 在 `src/data/case-studies.ts` 添加案例数据
2. 上传案例图片到 `public/images/case-studies/`

### 5. 修改翻译文本

翻译文件位于 `src/locales/`:
- `en/` - 英文翻译
- `zh/` - 中文翻译

## 🎨 设计规范

### 颜色

| 名称 | 色值 | 用途 |
|------|------|------|
| Primary | `#0A2540` | 主色调 |
| Accent | `#0066FF` | 强调色 |
| CTA | `#FF6B6B` | 行动按钮 |

### 字体

- 标题: Inter Bold
- 正文: Inter Regular
- 代码: JetBrains Mono

### 响应式断点

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 📄 页面列表

### 核心页面
1. **首页** (`/`) - 12个完整模块
2. **产品** (`/product`) - 功能/技术/安全/集成
3. **解决方案** (`/solutions`) - 5个场景
4. **定价** (`/pricing`) - 方案对比
5. **演示** (`/demo`) - 音频/视频Demo
6. **文档** (`/docs`) - 快速开始/API/SDK
7. **公司** (`/company`) - 关于/招聘/联系
8. **客户** (`/customers`) - 案例/评价

### 法律页面
9. **隐私政策** (`/legal/privacy`)
10. **服务条款** (`/legal/terms`)
11. **GDPR合规** (`/legal/gdpr`)

## 🌐 国际化

### URL结构

- 英文: `/` (默认)
- 中文: `/zh/*`

### 语言切换

网站右上角提供语言切换器，自动保存用户偏好。

### 添加新语言

1. 创建 `src/locales/[lang]/` 目录
2. 复制并翻译所有JSON文件
3. 更新 `src/i18n.ts` 配置

## 🚢 部署

详见 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

### Vercel部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 构建优化

- 代码分割
- 图片懒加载
- Tree Shaking
- Gzip压缩

## 📊 性能目标

| 指标 | 目标值 |
|------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Lighthouse | > 90 |

## 🔗 相关文档

- [内容填充指南](docs/CONTENT_GUIDE.md)
- [翻译指南](docs/TRANSLATION_GUIDE.md)
- [部署指南](docs/DEPLOYMENT.md)

## 📜 License

MIT License