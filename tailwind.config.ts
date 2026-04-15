import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // 深色主题配色系统
      colors: {
        // 背景系统
        background: {
          DEFAULT: '#0A0A0F',
          primary: '#0A0A0F',
          secondary: '#12121A',
          card: '#1A1A24',
          elevated: '#22222E',
          hover: '#2A2A36',
        },
        // 文字颜色
        foreground: {
          DEFAULT: '#FFFFFF',
          primary: '#FFFFFF',
          secondary: '#A0A0B0',
          muted: '#6A6A7A',
          inverse: '#0A0A0F',
        },
        // 紫蓝渐变 - AI 科技感（主色调）
        primary: {
          DEFAULT: '#8B5CF6',
          purple: '#8B5CF6',
          blue: '#3B82F6',
          cyan: '#06B6D4',
        },
        // 金色系统 - CTA 按钮（Rox 参考）
        gold: {
          DEFAULT: '#D4A574',
          light: '#E8C9A0',
          dark: '#B8935F',
          muted: '#8B7355',
        },
        // 荧光绿 - 数据强调色（PolyAI 参考）
        accent: {
          DEFAULT: '#D4FF00',
          lime: '#D4FF00',
          light: '#E0FF33',
          dark: '#B8E600',
          green: '#10B981',
        },
        // 功能色
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        // 边框色
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          light: 'rgba(255, 255, 255, 0.2)',
          accent: '#D4A574',
        },
      },
      // 字体系统
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'monospace'],
        display: ['Inter', 'PingFang SC', 'system-ui', 'sans-serif'],
      },
      // 字号层级
      fontSize: {
        // Hero 标题 - 超大字号
        'hero': ['clamp(3rem, 8vw, 5rem)', {
          lineHeight: '1.0',
          letterSpacing: '-0.02em',
          fontWeight: '600',
        }],
        'hero-lg': ['clamp(4rem, 10vw, 6rem)', {
          lineHeight: '1.0',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        }],
        // H1 标题
        'h1': ['clamp(2.5rem, 5vw, 3.5rem)', {
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          fontWeight: '600',
        }],
        // H2 标题 - 区块标题
        'h2': ['clamp(1.75rem, 3vw, 2.5rem)', {
          lineHeight: '1.2',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        }],
        // H3 标题 - 子标题
        'h3': ['1.5rem', {
          lineHeight: '1.3',
          fontWeight: '600',
        }],
        // H4 标题 - 卡片标题
        'h4': ['1.25rem', {
          lineHeight: '1.4',
          fontWeight: '600',
        }],
        // 正文
        'body-lg': ['1.125rem', {
          lineHeight: '1.6',
          fontWeight: '400',
        }],
        'body': ['1rem', {
          lineHeight: '1.6',
          fontWeight: '400',
        }],
        'body-sm': ['0.875rem', {
          lineHeight: '1.5',
          fontWeight: '400',
        }],
        // 数据数字
        'metric': ['3rem', {
          lineHeight: '1.0',
          fontWeight: '700',
        }],
        'metric-lg': ['4rem', {
          lineHeight: '1.0',
          fontWeight: '700',
        }],
        // 标签文字
        'caption': ['0.75rem', {
          lineHeight: '1.5',
          fontWeight: '500',
        }],
        'label': ['0.875rem', {
          lineHeight: '1.4',
          fontWeight: '500',
        }],
      },
      // 间距系统
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        'section': '8rem',
        'section-sm': '5rem',
      },
      // 渐变背景
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4A574 0%, #E8C9A0 50%, #D4A574 100%)',
        'gradient-hero': 'radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
        'gradient-glow': 'radial-gradient(circle, rgba(212, 255, 0, 0.15) 0%, transparent 70%)',
        'gradient-mesh': 'linear-gradient(135deg, #0A0A0F 0%, #12121A 50%, #0A0A0F 100%)',
      },
      // 动画
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'gradient-flow': 'gradientFlow 3s ease infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'scroll': 'scroll var(--scroll-duration, 20s) linear infinite',
        // StarBorder 动画
        'star-bottom': 'star-bottom linear infinite alternate',
        'star-top': 'star-top linear infinite alternate',
      },
      // 动画关键帧
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 165, 116, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 165, 116, 0.5)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        // StarBorder 动画关键帧
        'star-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
      },
      // 圆角
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'full': '9999px',
      },
      // 阴影
      boxShadow: {
        'glow': '0 0 40px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 60px rgba(139, 92, 246, 0.4)',
        'gold': '0 0 40px rgba(212, 165, 116, 0.3)',
        'gold-lg': '0 0 60px rgba(212, 165, 116, 0.4)',
        'lime': '0 0 40px rgba(212, 255, 0, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.4)',
        'elevated': '0 20px 60px rgba(0, 0, 0, 0.5)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
      // 过渡
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      // Z-index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}

export default config