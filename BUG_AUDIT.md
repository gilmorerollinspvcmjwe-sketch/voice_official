# Bug Audit Report

> 审计日期：2026-04-15
> 项目：voice-ai-website
> 审计人：Subagent (coder-bug-audit)

## 统计

| 级别 | 数量 |
|------|------|
| 🔴 Critical | 5 |
| 🟡 Warning | 12 |
| 🟢 Info | 8 |
| **总计** | **25** |

---

## Step 执行结果速览

| 步骤 | 状态 | 说明 |
|------|------|------|
| Step 1: 编译检查 | ✅ 通过 | `npm run build` 成功，但有 chunk 大小警告 |
| Step 2: TypeScript 类型检查 | ✅ 无问题 | `npx tsc --noEmit` 零错误 |
| Step 3: ESLint 扫描 | ⚠️ 3 warnings | 均为 react-hooks/exhaustive-deps |
| Step 4: 关键文件审查 | 🔴 5 Critical | 缺失组件、缺失资源目录等 |
| Step 5: 资源引用检查 | 🔴 严重 | 26 个文件缺失（20 音频 + 6 视频） |
| Step 6: 未使用的导入 | ✅ 无问题 | 无 unused-vars 错误 |

---

## 🔴 Critical（导致崩溃/白屏/编译失败）

### [C1] ShimmerText 组件被导出但文件不存在

- **文件**: `src/components/effects/index.ts`
- **行号**: 第 1 行 (`export { GradientText, ShimmerText } from './GradientText'`)
- **问题**: `index.ts` 从 `./GradientText` 导出了 `ShimmerText`，但 `src/components/effects/ShimmerText.tsx` 文件**不存在**。`GradientText.tsx` 中也没有导出名为 `ShimmerText` 的组件。如果有页面尝试 `import { ShimmerText } from '@/components/effects'`，将导致编译失败。
- **修复**: 从 index.ts 中移除 `ShimmerText` 导出，或创建对应的 `ShimmerText.tsx` 文件。

### [C2] 缺失 `public/images/case-studies/` 目录

- **文件**: `src/data/case-studies.ts`
- **行号**: 多处（images 数组引用）
- **问题**: 案例数据引用了 `'/images/case-studies/techcorp-dashboard.png'`、`'/images/case-studies/techcorp-analytics.png'`、`'/images/case-studies/financehub-metrics.png'`，但 `public/images/case-studies/` 目录**完全不存在**。客户案例页面加载时会显示断裂图片。
- **修复**: 创建目录并上传对应图片，或暂时将 `images` 数组置空 `[]`。

### [C3] 缺失 `public/images/integrations/` 目录

- **文件**: `src/data/integrations.ts`
- **行号**: 多处（所有 Integration 的 logo 字段）
- **问题**: 19 个集成项全部引用了 `'/images/integrations/[name].svg'`，但 `public/images/integrations/` 目录**完全不存在**。集成页面所有 logo 都会断裂。
- **修复**: 创建目录并上传对应的 SVG logo 文件，或使用在线 CDN 图标暂代。

### [C4] 缺失 `public/images/blog/` 目录

- **文件**: `src/data/blog-posts.ts`
- **行号**: 多处（所有 BlogPost 的 coverImage 字段）
- **问题**: 5 篇博客文章都引用了 `'/images/blog/[filename].jpg'`，但 `public/images/blog/` 目录**完全不存在**。博客列表和详情页封面图全部断裂。
- **修复**: 创建目录并上传封面图片，或在图片缺失时提供 fallback。

### [C5] 缺失 `public/images/hero-poster.jpg` 视频海报

- **文件**: `src/components/sections/HeroSection.tsx`
- **行号**: 第 145 行（`poster="/images/hero-poster.jpg"`）
- **问题**: `<video>` 标签的 `poster` 属性引用了不存在的文件。在视频加载失败或用户禁用自动播放时，背景将完全空白。
- **修复**: 添加 `hero-poster.jpg` 海报图，或在 video 外层添加背景色 fallback。

---

## 🟡 Warning（功能异常/体验差）

### [W1] 20 个 Demo 场景音频文件全部缺失

- **文件**: `src/data/demo-scenarios.ts`
- **问题**: 所有 20 个场景（10 个呼入 + 10 个外呼）都引用了 `/audio/demos/inbound-*.mp3` 和 `/audio/demos/outbound-*.mp3`，但这些文件全部不存在。磁盘上仅有 4 个文件（demo-customer-service.mp3, demo-sales.mp3, demo-collections.mp3, demo-survey.mp3）。
- **影响**: `/demo` 页面的音频播放器将无法播放任何场景演示音频。
- **修复**: 录制并上传 20 个对应的音频文件，或修改 `audioSample` 指向已有的 4 个文件。

### [W2] 6 个 Aha Moment 演示视频缺失

- **文件**: `src/data/features.ts`
- **问题**: 6 大核心功能各引用一个 Aha Moment 视频：
  - `/videos/aha-human-like.mp4`
  - `/videos/aha-realtime.mp4`
  - `/videos/aha-interruption.mp4`
  - `/videos/aha-context.mp4`
  - `/videos/aha-emotion.mp4`
  - `/videos/aha-multi-turn.mp4`
  - 全部缺失，仅存在 `/videos/hero-placeholder.mp4`
- **影响**: `/product/features` 页面的视频演示区域将全部显示为空白。
- **修复**: 上传对应演示视频，或添加占位图片/动画 fallback。

### [W3] 客户 Logo SVG 文件缺失

- **文件**: `src/data/case-studies.ts`
- **问题**: 引用了 `/images/customers/customer-techcorp.svg` 和 `/images/customers/customer-financehub.svg`，但 `public/images/customers/` 目录为空。
- **修复**: 上传客户 logo 或使用文字 placeholder。

### [W4] 博客作者头像文件与代码引用不匹配

- **文件**: `src/data/blog-posts.ts`
- **问题**: 博客数据引用了以下头像文件：
  - `/images/avatars/sarah-chen.jpg` → ❌ 不存在（有 `sarah.jpg`）
  - `/images/avatars/michael-johnson.jpg` → ❌ 不存在（有 `michael.jpg`）
  - `/images/avatars/emily-wang.jpg` → ❌ 不存在
  - `/images/avatars/james-liu.jpg` → ❌ 不存在（有 `james.jpg`）
  - `/images/avatars/alex-thompson.jpg` → ❌ 不存在（有 `alex.jpg`）
- **修复**: 重命名数据文件中的路径匹配现有文件名，或上传对应文件。

### [W5] React Hook 依赖数组问题 — GlitchText

- **文件**: `src/components/effects/GlitchText.tsx`
- **行号**: 121
- **问题**: `textRef.current` 在 effect cleanup 中读取时可能已经改变。ESLint 警告：`react-hooks/exhaustive-deps`
- **修复**: 在 effect 内部将 `textRef.current` 保存到局部变量，在 cleanup 中使用该变量。
  ```ts
  useEffect(() => {
    const currentRef = textRef.current;
    // ... use currentRef
    return () => {
      // cleanup with currentRef
    };
  }, []);
  ```

### [W6] React Hook 依赖数组问题 — useGSAPAnimation

- **文件**: `src/hooks/useGSAPAnimation.ts`
- **行号**: 227
- **问题**: `useEffect` 的依赖数组不是字面量数组，且缺少 `callback` 依赖。
- **修复**: 将 `callback` 用 `useCallback` 包装，或将其移出依赖数组（如果确实不需要响应其变化）。

### [W7] HeroSection 视频 background 无 fallback

- **文件**: `src/components/sections/HeroSection.tsx`
- **行号**: 143-153
- **问题**: `<video>` 标签只有 `<source>` 但无文本 fallback 内容。如果浏览器不支持视频格式或文件加载失败，用户看到完全空白的背景。
- **修复**: 在 `</video>` 前添加 fallback 文本，或添加 CSS `background-color` 作为降级方案。

### [W8] 案例数据中中文描述被截断

- **文件**: `src/data/audio-demos.ts`
- **问题**: 多处中文描述出现乱码/截断，如 `'产品咨询、订单查询场?'`、`'产品推介、预约演示场?'`。看起来是文件编码问题导致的字符截断。
- **修复**: 检查文件编码（应为 UTF-8），修复被截断的中文字符。

### [W9] 多处数据文件中文被截断/乱码

- **文件**: `src/data/blog-posts.ts`, `src/data/case-studies.ts`, `src/data/features.ts`, `src/data/integrations.ts`, `src/data/metrics.ts`, `src/data/pricing.ts`, `src/data/faq.ts`, `src/data/testimonials.ts`, `src/data/use-cases.ts`, `src/data/voices.ts`, `src/data/scenarios.ts`, `src/data/lead-form-config.ts`
- **问题**: 几乎所有数据文件的中文注释和字符串都有 `?` 占位符，说明存在系统性的编码问题或文件截断。
- **修复**: 全局检查并修复文件编码，确保所有 .ts 文件为 UTF-8 无 BOM。

### [W10] 博客文章中文内容大量截断

- **文件**: `src/data/blog-posts.ts`
- **问题**: 博客文章的 excerpt、content 字段中大量中文被 `?` 截断，例如：
  - `'通过自然对话?24/7 可用性改变客户服务?'`
  - `'一份基于功能、定价和集成能力评估语音 AI 平台的综合指南?'`
- **修复**: 修复文件编码后重新补全截断内容。

### [W11] 案例数据中文被截断

- **文件**: `src/data/case-studies.ts`
- **问题**: 挑战描述、解决方案描述等中长文本中多处 `?` 截断。
- **修复**: 同上，修复编码后补全。

### [W12] 集成数据中公司名称/描述截断

- **文件**: `src/data/integrations.ts`
- **问题**: 公司名称如 `'纷享销?'`、`'容联?'` 被截断。功能描述也多处不完整。
- **修复**: 修复编码后补全正确名称。

---

## 🟢 Info（优化建议）

### [I1] 主 JS chunk 超过 500KB

- **问题**: 构建产物 `assets/index-DI5yVVRL.js` 为 544.79 KB（gzip 后 169.46 KB），超过 500KB 警告线。
- **建议**: 使用 `import()` 动态导入路由页面，或通过 `build.rollupOptions.output.manualChunks` 拆分 vendor chunks（framer-motion、gsap、lucide-react 可单独拆分）。

### [I2] App.tsx 中英双语路由完全重复

- **文件**: `src/App.tsx`
- **问题**: 英文路由块（`/`）和中文路由块（`/zh`）的路由定义完全相同，约 80 行重复代码。维护两套相同的路由容易在修改时遗漏。
- **建议**: 将路由定义为数组/配置对象，通过循环生成两套路由。

### [I3] Home.tsx 中 hrefLang 使用硬编码域名

- **文件**: `src/pages/Home.tsx`
- **行号**: 第 23-25 行
- **问题**: `href="https://example.com/"` 使用了 `example.com` 作为占位域名。上线后需替换为真实域名。
- **建议**: 从环境变量读取域名，如 `import.meta.env.VITE_SITE_URL`。

### [I4] 缺失 404 页面组件

- **文件**: `src/App.tsx`
- **行号**: 第 99 行
- **问题**: Catch-all 路由 `path="*"` 直接 `Navigate to="/"`, 没有自定义 404 页面。用户访问不存在的 URL 时会被静默重定向到首页，不利于 SEO 和用户体验。
- **建议**: 创建 `src/pages/NotFound.tsx`，在 catch-all 路由中展示 404 页面并提供返回首页的链接。

### [I5] `solutions/survey` 路由仅存在于中文路由块

- **文件**: `src/App.tsx`
- **问题**: `/zh/solutions/survey` → `SolutionsSurvey` 路由存在，但英文路由块中没有对应的 `/solutions/survey`。英文用户访问该路径会命中 `/solutions/*` fallback，跳转到 `Solutions` 首页。
- **建议**: 在英文路由块中也添加 `<Route path="solutions/survey" element={<SolutionsSurvey />} />`。

### [I6] `demo/effects` 路由重复

- **文件**: `src/App.tsx`
- **问题**: `/demo/effects` 路由在中英两个路由块中都存在且完全相同。如果未来只修改一处，另一处会遗漏。
- **建议**: 同 [I2]，路由配置化去重。

### [I7] Navbar 中 `setIsOpen(false)` 缺少依赖

- **文件**: `src/components/layout/Navbar.tsx`
- **行号**: 第 44-46 行
- **问题**: `useEffect(() => { setIsOpen(false); }, [location.pathname, setIsOpen])` — `setIsOpen` 通常是一个稳定函数（Zustand setter），但严格模式下建议确认其稳定性。如果 `setIsOpen` 每次渲染都变化，会导致 effect 频繁触发。
- **建议**: 确认 Zustand store 的 setter 是稳定引用，或使用 `useMobileMenuStore.getState().setIsOpen(false)` 替代。

### [I8] 数据文件中存在大量 TODO 未完成

- **文件**: 多个 `src/data/*.ts` 文件
- **问题**: 多处标记了 `📝 TODO(老徐)`，包括：
  - 替换产品视频 (`HeroSection.tsx`)
  - 对接 CMS (`blog-posts.ts`)
  - 添加头像/封面图片 (`blog-posts.ts`)
  - 添加真实客户案例 (`case-studies.ts`)
  - 上传音频文件 (`audio-demos.ts`)
- **建议**: 建立 TODO 跟踪清单，按优先级逐步完成。

---

## 资源存在性汇总

### ✅ 存在的资源
| 目录/文件 | 状态 |
|-----------|------|
| `public/audio/demos/demo-customer-service.mp3` | ✅ |
| `public/audio/demos/demo-sales.mp3` | ✅ |
| `public/audio/demos/demo-collections.mp3` | ✅ |
| `public/audio/demos/demo-survey.mp3` | ✅ |
| `public/images/scenarios/` (7 张图) | ✅ |
| `public/logos/customer-{1-6}.{png,svg}` | ✅ |
| `public/videos/hero-placeholder.mp4` | ✅ |
| `public/images/avatars/` (32 张头像) | ✅ |

### ❌ 缺失的资源（26 个文件）
| 资源 | 引用位置 |
|------|---------|
| `/audio/demos/inbound-*.mp3` (10 个) | demo-scenarios.ts |
| `/audio/demos/outbound-*.mp3` (10 个) | demo-scenarios.ts |
| `/videos/aha-human-like.mp4` | features.ts |
| `/videos/aha-realtime.mp4` | features.ts |
| `/videos/aha-interruption.mp4` | features.ts |
| `/videos/aha-context.mp4` | features.ts |
| `/videos/aha-emotion.mp4` | features.ts |
| `/videos/aha-multi-turn.mp4` | features.ts |

### ❌ 缺失的目录（3 个）
| 目录 | 引用位置 |
|------|---------|
| `public/images/case-studies/` | case-studies.ts |
| `public/images/integrations/` | integrations.ts |
| `public/images/blog/` | blog-posts.ts |

---

## 总结

本项目**编译和类型检查均通过**，不存在导致白屏的运行时编译错误。但存在以下风险：

1. **资源缺失严重**: 26 个媒体文件 + 3 个目录缺失，Demo、Features、Blog、Case Studies、Integrations 等页面在运行时会出现大量断裂图片和无法播放的音频/视频。
2. **编码问题**: 几乎所有数据文件的中文都存在 `?` 截断，需全局修复 UTF-8 编码。
3. **导出风险**: `ShimmerText` 被导出但文件不存在，未来一旦使用将立即崩溃。
4. **路由重复**: App.tsx 中英两套完全相同的路由定义，维护成本高。

**建议优先级**: 编码修复 > 关键资源补充 > 路由去重 > 性能优化
