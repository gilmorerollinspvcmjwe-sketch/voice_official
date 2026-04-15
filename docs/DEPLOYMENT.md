# 部署指南

本文档提供 VoiceAI 官网的详细部署说明。

## 目录

1. [环境要求](#环境要求)
2. [本地开发](#本地开发)
3. [生产构建](#生产构建)
4. [部署选项](#部署选项)
5. [环境变量](#环境变量)
6. [CDN配置](#cdn配置)
7. [监控与分析](#监控与分析)

## 环境要求

- Node.js 18+
- npm 9+ 或 pnpm 8+
- Git

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run type-check
```

开发服务器运行在 `http://localhost:5173`

## 生产构建

```bash
# 构建
npm run build

# 预览构建结果
npm run preview
```

构建产物位于 `dist/` 目录。

## 部署选项

### 1. Vercel (推荐)

Vercel 提供最佳的性能和开发体验：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署预览环境
vercel

# 部署生产环境
vercel --prod
```

或连接 GitHub 仓库实现自动部署：

1. 在 Vercel 导入 GitHub 仓库
2. 配置构建设置：
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. 配置环境变量
4. 部署

### 2. Netlify

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 登录
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy --prod
```

netlify.toml 配置：

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. 静态文件托管

构建后可以部署到任何静态文件托管服务：

- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- 阿里云 OSS
- 腾讯云 COS

### 4. Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

nginx.conf:

```nginx
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # 静态资源缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Gzip 压缩
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    }
}
```

构建和运行：

```bash
# 构建镜像
docker build -t voiceai-website .

# 运行容器
docker run -p 80:80 voiceai-website
```

## 环境变量

创建 `.env` 文件：

```env
# API 配置
VITE_API_URL=https://api.example.com

# 分析追踪
VITE_GA_ID=G-XXXXXXXXXX

# 其他配置
VITE_SITE_URL=https://example.com
```

在代码中使用：

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## CDN 配置

### CloudFront 设置

1. 创建 S3 存储桶
2. 上传构建产物
3. 创建 CloudFront 分配
4. 配置缓存行为：
   - HTML: 不缓存 (TTL = 0)
   - JS/CSS: 长期缓存 (TTL = 1年)
   - 图片/字体: 长期缓存 (TTL = 1年)

### 缓存策略

| 文件类型 | Cache-Control | TTL |
|----------|--------------|-----|
| HTML | no-cache | 0 |
| JS/CSS (hashed) | public, max-age=31536000, immutable | 1年 |
| 图片 | public, max-age=31536000 | 1年 |
| 字体 | public, max-age=31536000 | 1年 |

## 监控与分析

### Google Analytics 4

在 `index.html` 添加：

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 性能监控

使用 Lighthouse CI：

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://your-domain.com
            https://your-domain.com/product
```

### 错误监控

集成 Sentry：

```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://xxx@xxx.ingest.sentry.io/xxx",
  environment: import.meta.env.MODE,
});
```

## CI/CD 示例

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.API_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## 检查清单

部署前确认：

- [ ] 所有环境变量已配置
- [ ] 构建成功无错误
- [ ] 类型检查通过
- [ ] 图片已优化
- [ ] 翻译完整
- [ ] SEO 元数据正确
- [ ] 性能指标达标
- [ ] 跨浏览器测试通过
- [ ] 移动端测试通过

部署后确认：

- [ ] 网站可访问
- [ ] HTTPS 正常
- [ ] 语言切换正常
- [ ] 表单提交正常
- [ ] 分析追踪正常
- [ ] 性能监控正常