# 语音AI官网组件设计规范

> 基于 6 个竞品分析的 UI 组件设计指南

---

## 1. 按钮组件 (Button)

### 1.1 主按钮 (Primary)

**设计规范**:
```
背景: 渐变色 (主色 → 强调色)
圆角: 8px
内边距: 12px 24px
字体: 500 weight, 16px
悬停: 轻微上浮 + 亮度提升
点击: 缩放 0.98
```

**CSS 示例**:
```css
.btn-primary {
  background: linear-gradient(135deg, #1E3A5F 0%, #00D4FF 100%);
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(30, 58, 95, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30, 58, 95, 0.4);
  filter: brightness(1.1);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

### 1.2 次按钮 (Secondary)

**设计规范**:
```
背景: 透明
边框: 2px 主色
文字: 主色
悬停: 背景填充主色 + 文字变白
```

**CSS 示例**:
```css
.btn-secondary {
  background: transparent;
  color: #1E3A5F;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  border: 2px solid #1E3A5F;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #1E3A5F;
  color: #fff;
}
```

### 1.3 文字按钮 (Text)

**设计规范**:
```
背景: 无
边框: 无
文字: 主色或强调色
悬停: 下划线 + 箭头出现
```

**CSS 示例**:
```css
.btn-text {
  background: none;
  border: none;
  color: #00D4FF;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.btn-text:hover {
  text-decoration: underline;
}

.btn-text::after {
  content: '→';
  transition: transform 0.2s;
}

.btn-text:hover::after {
  transform: translateX(4px);
}
```

---

## 2. 卡片组件 (Card)

### 2.1 功能卡片

**设计规范**:
```
背景: 白色或浅灰
圆角: 16px
内边距: 24px
阴影: 轻微或无
悬停: 上浮 + 边框高亮
```

**CSS 示例**:
```css
.card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E5E7EB;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: #00D4FF;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #1E3A5F 0%, #00D4FF 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #1A1A2E;
  margin-bottom: 8px;
}

.card-description {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
}
```

### 2.2 定价卡片

**设计规范**:
```
推荐套餐: 边框高亮 + "推荐" 标签
价格: 大字体突出
功能列表: ✓ 图标
CTA: 卡片底部
```

**HTML 结构**:
```html
<div class="pricing-card featured">
  <div class="badge">推荐</div>
  <h3 class="plan-name">专业版</h3>
  <div class="price">
    <span class="currency">¥</span>
    <span class="amount">999</span>
    <span class="period">/月</span>
  </div>
  <p class="price-desc">按量计费，适合成长团队</p>
  <ul class="features">
    <li><span class="check">✓</span> 按量计费</li>
    <li><span class="check">✓</span> 高级功能</li>
    <li><span class="check">✓</span> 技术支持</li>
  </ul>
  <button class="btn-primary">开始使用</button>
</div>
```

**CSS 示例**:
```css
.pricing-card {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  border: 2px solid #E5E7EB;
  position: relative;
}

.pricing-card.featured {
  border-color: #00D4FF;
  transform: scale(1.05);
}

.pricing-card .badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #00D4FF;
  color: #fff;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.pricing-card .price {
  display: flex;
  align-items: baseline;
  margin: 16px 0;
}

.pricing-card .amount {
  font-size: 48px;
  font-weight: 700;
  color: #1A1A2E;
}
```

---

## 3. 导航组件 (Navigation)

### 3.1 主导航

**设计规范**:
```
高度: 64-72px
背景: 白色或半透明模糊
Logo: 左侧
菜单: 中间或偏左
CTA: 右侧
滚动: 添加阴影或背景变化
```

**CSS 示例**:
```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid transparent;
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  border-bottom-color: #E5E7EB;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 32px;
}

.navbar-link {
  color: #4B5563;
  font-weight: 500;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.2s;
}

.navbar-link:hover {
  color: #1E3A5F;
}
```

### 3.2 移动端导航

**CSS 示例**:
```css
.navbar-mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar-mobile-toggle {
    display: block;
  }
  
  .navbar-menu {
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    padding: 24px;
    border-bottom: 1px solid #E5E7EB;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}
```

---

## 4. Hero 区域

### 4.1 设计规范

```
高度: 视口高度 (100vh) 或 600-800px
布局: 左文字 + 右视觉 (桌面) / 上文字 + 下视觉 (移动)
标题: 48-64px, 加粗
副标题: 20-24px, 正常
CTA: 两个按钮并排
```

**HTML 结构**:
```html
<section class="hero">
  <div class="hero-container">
    <div class="hero-content">
      <h1 class="hero-title">
        构建自然流畅的<br />
        <span class="highlight">语音对话体验</span>
      </h1>
      <p class="hero-subtitle">
        企业级语音AI平台，延迟 < 500ms，准确率 98%+，
        让每一次对话都如真人般自然
      </p>
      <div class="hero-cta">
        <button class="btn-primary">免费试用</button>
        <button class="btn-secondary">观看演示</button>
      </div>
      <div class="hero-trust">
        <span>服务客户</span>
        <div class="logos">
          <img src="logo1.svg" alt="客户1" />
          <img src="logo2.svg" alt="客户2" />
          <img src="logo3.svg" alt="客户3" />
        </div>
      </div>
    </div>
    <div class="hero-visual">
      <!-- 产品截图或动画 -->
      <div class="waveform-animation"></div>
    </div>
  </div>
</section>
```

**CSS 示例**:
```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #F8FAFC 0%, #E8F4FF 100%);
  padding-top: 72px; /* 导航高度 */
}

.hero-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.hero-title {
  font-size: 56px;
  font-weight: 700;
  line-height: 1.2;
  color: #1A1A2E;
  margin-bottom: 24px;
}

.hero-title .highlight {
  background: linear-gradient(135deg, #1E3A5F 0%, #00D4FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 20px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 32px;
}

.hero-cta {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

@media (max-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-title {
    font-size: 36px;
  }
  
  .hero-cta {
    justify-content: center;
    flex-direction: column;
  }
}
```

---

## 5. Demo 区域

### 5.1 音频播放器

**设计规范**:
```
播放器样式: 现代简洁
波形可视化: 动态波形
时长显示: 当前时间 / 总时长
播放按钮: 圆形，中心位置
```

**HTML 结构**:
```html
<div class="audio-player">
  <div class="player-header">
    <span class="scenario-label">客服场景</span>
    <span class="duration">0:45</span>
  </div>
  <div class="waveform">
    <div class="bars"></div>
    <!-- 波形动画 -->
  </div>
  <div class="player-controls">
    <button class="play-btn">▶</button>
    <div class="transcript">
      <p class="speaker agent">AI: 您好，请问有什么可以帮助您的？</p>
      <p class="speaker user">用户: 我想查询一下我的订单状态。</p>
    </div>
  </div>
</div>
```

### 5.2 实时延迟显示

**CSS 示例**:
```css
.latency-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 212, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
}

.latency-badge::before {
  content: '';
  width: 8px;
  height: 8px;
  background: #00D4FF;
  border-radius: 50%;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 6. 统计数字

### 6.1 数字滚动动画

**CSS 示例**:
```css
.stat-number {
  font-size: 64px;
  font-weight: 700;
  color: #1E3A5F;
  line-height: 1;
}

.stat-number .unit {
  font-size: 32px;
  color: #00D4FF;
}

.stat-label {
  font-size: 16px;
  color: #6B7280;
  margin-top: 8px;
}

/* 数字进入动画 */
.stat-number.animate {
  animation: countUp 2s ease-out forwards;
}

@keyframes countUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 7. 客户 Logo 横幅

### 7.1 无限滚动

**CSS 示例**:
```css
.logo-banner {
  overflow: hidden;
  padding: 32px 0;
  background: #fff;
  border-top: 1px solid #E5E7EB;
  border-bottom: 1px solid #E5E7EB;
}

.logo-track {
  display: flex;
  gap: 64px;
  animation: scroll 30s linear infinite;
}

.logo-item {
  flex-shrink: 0;
  height: 32px;
  opacity: 0.6;
  filter: grayscale(100%);
  transition: all 0.3s;
}

.logo-item:hover {
  opacity: 1;
  filter: grayscale(0%);
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

---

## 8. 标签页 (Tabs)

### 8.1 功能切换标签

**CSS 示例**:
```css
.tabs {
  display: flex;
  gap: 8px;
  background: #F3F4F6;
  padding: 4px;
  border-radius: 12px;
  width: fit-content;
}

.tab {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: transparent;
}

.tab.active {
  background: #fff;
  color: #1E3A5F;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tab:hover:not(.active) {
  color: #1E3A5F;
}
```

---

## 9. 代码块

### 9.1 快速开始代码

**CSS 示例**:
```css
.code-block {
  background: #1E1E1E;
  border-radius: 12px;
  overflow: hidden;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #2D2D2D;
  border-bottom: 1px solid #3D3D3D;
}

.code-lang {
  font-size: 12px;
  color: #888;
  font-weight: 500;
}

.code-copy {
  background: transparent;
  border: 1px solid #555;
  color: #888;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.code-copy:hover {
  border-color: #00D4FF;
  color: #00D4FF;
}

.code-content {
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #D4D4D4;
  overflow-x: auto;
}

/* 语法高亮 */
.code-keyword { color: #569CD6; }
.code-string { color: #CE9178; }
.code-function { color: #DCDCAA; }
.code-comment { color: #6A9955; }
```

---

## 10. 响应式断点

```css
/* 断点定义 */
$mobile: 640px;
$tablet: 768px;
$desktop: 1024px;
$wide: 1280px;

/* 移动端优先 */
.container {
  width: 100%;
  padding: 0 16px;
}

@media (min-width: 640px) {
  .container {
    padding: 0 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1280px;
    margin: 0 auto;
  }
}

/* 隐藏类 */
.hide-mobile { display: block; }
.hide-desktop { display: none; }

@media (max-width: 768px) {
  .hide-mobile { display: none; }
  .hide-desktop { display: block; }
}
```

---

## 11. 动画库

### 推荐动画

```css
/* 淡入上浮 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* 缩放进入 */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 滚动触发 */
.scroll-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 12. 图标规范

### 推荐图标库
- **Heroicons**: 线性风格，简洁现代
- **Lucide**: 开源，丰富
- **Phosphor Icons**: 多种粗细

### 图标使用规范
```
尺寸: 16px / 20px / 24px / 32px
粗细: 1.5px (常规) / 2px (粗)
颜色: 继承文字颜色 或 品牌色
```

---

*组件规范生成日期: 2026-04-01*