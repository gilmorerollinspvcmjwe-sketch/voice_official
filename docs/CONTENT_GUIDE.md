# 内容填充指南

本文档提供网站内容替换的详细说明。

## 📊 需要填充的内容清单

| 内容类型 | 文件位置 | 格式 | 优先级 |
|----------|----------|------|--------|
| 数据指标 | `src/data/metrics.ts` | TypeScript | 高 |
| 客户Logo | `public/images/customers/` | SVG/PNG | 高 |
| 音频Demo | `public/audio/demos/` | MP3 | 高 |
| 客户评价 | `src/data/testimonials.ts` | TypeScript | 中 |
| 客户案例 | `src/data/case-studies.ts` | TypeScript | 中 |
| 团队照片 | `public/images/team/` | JPG | 低 |
| 视频教程 | `public/videos/tutorials/` | MP4 | 低 |
| 社交分享图 | `public/images/og/` | PNG | 低 |

## 1. 数据指标

文件: `src/data/metrics.ts`

```typescript
{
  key: 'calls_monthly',
  value: '10',      // ← 修改为真实数值
  suffix: 'M+',
  label: {
    en: 'Calls Monthly',
    zh: '月通话量'
  }
}
```

显示位置：首页 Social Proof 区块

## 2. 客户Logo

**要求：**
- 尺寸：160x60px (或 2x: 320x120px)
- 格式：SVG (推荐) 或 PNG (透明背景)
- 文件大小：< 50KB

**步骤：**
1. 准备Logo文件，命名为 `customer-[公司名].svg`
2. 放入 `public/images/customers/` 目录
3. Logo会自动显示在首页客户墙

## 3. 音频Demo

**要求：**
- 格式：MP3
- 质量：128kbps 或更高
- 大小：< 5MB
- 时长：30秒 - 5分钟

**步骤：**
1. 上传音频文件到 `public/audio/demos/`
2. 编辑 `src/data/audio-demos.ts`：

```typescript
{
  id: 'demo-001',
  title: {
    en: 'Customer Service Demo',
    zh: '客服咨询演示'
  },
  scenario: 'customer-service',
  src: '/audio/demos/demo-customer-service.mp3',
  duration: '2:45',
  description: {
    en: 'Product inquiry scenario',
    zh: '产品咨询场景'
  }
}
```

## 4. 客户评价

文件: `src/data/testimonials.ts`

```typescript
{
  id: 't-001',
  quote: {
    en: 'Customer quote in English...',
    zh: '客户中文评价...'
  },
  author: {
    name: 'Name',
    title: 'Position',
    company: 'Company',
    avatar: '/images/avatars/name.jpg'  // 200x200px
  },
  featured: true  // 首页展示
}
```

## 5. 客户案例

文件: `src/data/case-studies.ts`

**案例结构：**
- 挑战 (challenge)
- 解决方案 (solution)
- 结果 (results) - 数据指标
- 客户引用 (quote)

**图片要求：**
- 尺寸：800x600px 或更高
- 格式：JPG 或 PNG
- 内容：仪表板截图、数据图表等

## 6. 团队照片

**要求：**
- 尺寸：400x400px (正方形)
- 格式：JPG
- 风格：专业头像照

**命名规则：**
`team-[姓名拼音].jpg`

示例：`team-john-smith.jpg`

## 7. 社交分享图 (OG Images)

**要求：**
- 尺寸：1200x630px
- 格式：PNG

**文件列表：**
- `og-home.png` - 首页
- `og-product.png` - 产品页
- `og-pricing.png` - 定价页
- 等等...

## 8. 翻译修改

翻译文件位于 `src/locales/`：

```
locales/
├── en/           # 英文
│   ├── common.json
│   ├── home.json
│   ├── product.json
│   └── ...
└── zh/           # 中文
    ├── common.json
    ├── home.json
    └── ...
```

**修改步骤：**
1. 打开对应的JSON文件
2. 修改翻译文本
3. 保存后自动生效

## 🎨 设计资源

### 推荐工具

- **Logo处理**: Figma, Adobe Illustrator
- **图片压缩**: TinyPNG, Squoosh
- **音频处理**: Audacity, Adobe Audition
- **视频压缩**: HandBrake

### 资源链接

- 图标库: Lucide Icons (已集成)
- 字体: Google Fonts - Inter

## ✅ 内容检查清单

- [ ] 所有数据指标已更新
- [ ] 至少6个客户Logo
- [ ] 至少3个音频Demo
- [ ] 至少3条客户评价
- [ ] 至少2个客户案例
- [ ] 团队页面照片完整
- [ ] 所有翻译已完成
- [ ] SEO描述已定制