/**
 * 客户评价数据配置
 * 
 * 添加真实的客户评价和引用
 * 支持中英文双语内容
 */

export interface Testimonial {
  id: string;
  quote: {
    en: string;
    zh: string;
  };
  author: {
    name: string;
    title: string;
    company: string;
    avatar: string;     // 头像路径: /images/avatars/[name].jpg
  };
  featured?: boolean;   // 是否在首页展示
  rating?: number;      // 评分 1-5
  date?: string;        // 日期 YYYY-MM-DD
}

export const testimonials: Testimonial[] = [
  // =====================================================
  // 💬 添加真实客户评价
  // =====================================================
  
  // 示例 1 - 请替换为真实评价
  {
    id: 't-001',
    quote: {
      en: 'This AI voice agent transformed our customer service. We reduced wait times by 80% and our customers can\'t tell they\'re talking to AI.',
      zh: '这个 AI 语音智能体彻底改变了我们的客服体系。等待时间降低了 80%，客户完全察觉不到是在和 AI 对话。'
    },
    author: {
      name: 'Sarah Chen',
      title: 'VP of Customer Service',
      company: 'TechCorp',
      avatar: '/images/avatars/sarah-chen.jpg'  // ← 添加头像文件
    },
    featured: true,
    rating: 5,
    date: '2024-01-15'
  },

  // 示例 2 - 请替换为真实评价
  {
    id: 't-002',
    quote: {
      en: 'We deployed voice agents for our collection calls and saw 40% improvement in recovery rates. The ROI was immediate.',
      zh: '我们部署语音智能体用于催收电话，回收率提升了 40%。投资回报立竿见影。'
    },
    author: {
      name: 'Michael Johnson',
      title: 'Director of Operations',
      company: 'FinanceHub',
      avatar: '/images/avatars/michael-johnson.jpg'
    },
    featured: true,
    rating: 5,
    date: '2024-02-20'
  },

  // 示例 3 - 请替换为真实评价
  {
    id: 't-003',
    quote: {
      en: 'The multi-language support is incredible. We now serve customers in 12 languages without hiring additional staff.',
      zh: '多语言支持功能太棒了。我们现在可以用 12 种语言服务客户，无需额外招聘人员。'
    },
    author: {
      name: 'Lisa Wang',
      title: 'Head of Global Support',
      company: 'GlobalRetail',
      avatar: '/images/avatars/lisa-wang.jpg'
    },
    featured: true,
    rating: 5
  },

  // =====================================================
  // 添加更多评价...
  // 头像文件放置位置: public/images/avatars/
  // 推荐尺寸: 200x200px 正方形
  // =====================================================
];

/**
 * 获取首页精选评价
 */
export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter(t => t.featured);
}

/**
 * 根据评分筛选评价
 */
export function getTestimonialsByRating(minRating: number): Testimonial[] {
  return testimonials.filter(t => t.rating && t.rating >= minRating);
}