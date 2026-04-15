# Image Generation Prompts

> voice-ai-website 项目图片资源生成提示词草稿
> 共 9 张图片：1 张 Hero 海报 + 3 张客户案例 + 5 张博客封面

---

## 一、Hero 视频海报（方案 A：现代客服中心场景）

**输出文件：** `public/images/hero-poster.jpg`
**尺寸：** 1920×1080
**用途：** Hero 区域全屏背景视频海报（fallback）

**Prompt：**
```
A cinematic wide shot of a modern, bright customer service center. A friendly professional woman wearing a headset sits at a clean white desk, smiling warmly while looking at a sleek monitor. The monitor displays a subtle AI voice waveform visualization in soft gold tones. Large windows with natural daylight. Warm golden hour lighting. Clean, minimalist office design with soft neutral colors. Photorealistic, professional corporate photography style. The image should convey trust, warmth, and technology. Dark overlay friendly (leaves space for white text on top). No text in image. 1920x1080 aspect ratio.
```

---

## 二、客户案例配图（3 张）

### CS-1：科技客服仪表盘

**输出文件：** `public/images/case-studies/techcorp-dashboard.png`
**尺寸：** 1200×800

**Prompt：**
```
A clean, modern SaaS dashboard interface displayed on a sleek laptop screen. The dashboard shows a customer service analytics panel with large metric cards: "78% Resolution Rate", "3s Avg Response", "92% CSAT Score". The UI uses a dark theme with gold accent highlights. Clean charts showing call volume trends over 30 days. A subtle waveform visualization in the corner. The overall design is minimalist, professional, similar to Stripe or Linear dashboard aesthetics. Slight angle perspective, soft studio lighting, subtle shadow beneath the laptop. No readable company names or logos. 1200x800 aspect ratio.
```

### CS-2：数据分析面板

**输出文件：** `public/images/case-studies/techcorp-analytics.png`
**尺寸：** 1200×800

**Prompt：**
```
A professional business analytics dashboard displayed on a large desktop monitor. The screen shows a fraud detection report with before/after comparison charts: a large declining bar chart showing "60% Fewer Fraud Claims Lost", and a timeline showing response time improvement from "8 min → 3 sec". Clean, dark-themed UI with green and gold data highlights. Pie charts showing resolution categories. The design is enterprise-grade, similar to Snowflake or Datadog dashboards. Slight 3/4 perspective, soft ambient lighting, clean desk surface. No readable company names or logos. 1200x800 aspect ratio.
```

### CS-3：医疗预约成果看板

**输出文件：** `public/images/case-studies/financehub-metrics.png`
**尺寸：** 1200×800

**Prompt：**
```
A modern healthcare management dashboard displayed on a tablet device. The screen shows appointment management metrics: "80% Booked Without Human Agent", "24/7 Availability", "45% Reduction in No-Shows". Clean calendar view with color-coded appointment slots. A map showing call coverage across regions. Soft blue and green accent colors on a white/light UI. The design is warm, healthcare-friendly, similar to Epic or Cerner EHR interfaces. Flat lay perspective, soft natural lighting, clean white desk surface with a coffee cup nearby. No readable company names or logos. 1200x800 aspect ratio.
```

---

## 三、博客封面图（5 张）

### BLOG-1：AI 语音客服趋势

**输出文件：** `public/images/blog/ai-voice-guide.jpg`
**尺寸：** 1200×630（OG 封面标准尺寸）

**Prompt：**
```
An abstract, modern illustration of AI voice technology. A stylized sound wave or speech bubble in warm gold and deep navy tones. Clean gradient background from dark navy (#0A0A0A) to deep blue. Minimalist, professional SaaS blog cover style. No text, no human faces. Elegant composition with negative space for headline overlay. 1200x630 aspect ratio.
```

### BLOG-2：客服行业数据

**输出文件：** `public/images/blog/customer-service-trends.jpg`
**尺寸：** 1200×630

**Prompt：**
```
A modern office workspace with multiple monitors showing customer satisfaction charts and upward trending graphs. Warm natural lighting, clean desk, a coffee cup and notebook. The monitors show colorful data visualizations in gold, blue, and green. Professional corporate photography style, photorealistic. No readable text on screens. 1200x630 aspect ratio.
```

### BLOG-3：AI 与人类协作

**输出文件：** `public/images/blog/ai-human-collaboration.jpg`
**尺寸：** 1200×630

**Prompt：**
```
A split composition showing human-AI collaboration. On one side, a professional customer service agent smiling with a headset. On the other side, an abstract representation of AI voice — soft golden light waves and glowing particles floating in a dark space. The two halves blend seamlessly. Warm, professional, trustworthy. Photorealistic quality. No text. 1200x630 aspect ratio.
```

### BLOG-4：语音 AI 安全合规

**输出文件：** `public/images/blog/voice-ai-security.jpg`
**尺寸：** 1200×630

**Prompt：**
```
A clean, modern security concept illustration. A shield icon made of sound wave patterns, rendered in gold and navy tones. Dark background with subtle grid lines and data flow patterns. Professional, trustworthy, enterprise-grade visual. Minimalist SaaS blog cover style. No text. 1200x630 aspect ratio.
```

### BLOG-5：未来呼叫中心

**输出文件：** `public/images/blog/future-call-center.jpg`
**尺寸：** 1200×630

**Prompt：**
```
A futuristic but realistic office environment — a modern call center with AI-powered workstations. Clean white desks, large monitors showing AI voice waveforms and real-time analytics. Soft blue ambient lighting mixed with warm golden desk lamps. No humans in the shot, just the technology environment. Photorealistic, professional corporate photography. No text. 1200x630 aspect ratio.
```

---

## 汇总

| # | 标签 | 输出路径 | 尺寸 |
|---|------|---------|------|
| 1 | HERO | `public/images/hero-poster.jpg` | 1920×1080 |
| 2 | CS-1 | `public/images/case-studies/techcorp-dashboard.png` | 1200×800 |
| 3 | CS-2 | `public/images/case-studies/techcorp-analytics.png` | 1200×800 |
| 4 | CS-3 | `public/images/case-studies/financehub-metrics.png` | 1200×800 |
| 5 | BLOG-1 | `public/images/blog/ai-voice-guide.jpg` | 1200×630 |
| 6 | BLOG-2 | `public/images/blog/customer-service-trends.jpg` | 1200×630 |
| 7 | BLOG-3 | `public/images/blog/ai-human-collaboration.jpg` | 1200×630 |
| 8 | BLOG-4 | `public/images/blog/voice-ai-security.jpg` | 1200×630 |
| 9 | BLOG-5 | `public/images/blog/future-call-center.jpg` | 1200×630 |
