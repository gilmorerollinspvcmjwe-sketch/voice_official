/**
 * 团队成员数据配置
 * 团队照片放置位置: public/images/team/
 */

export interface TeamMember {
  id: string;
  name: string;
  title: {
    en: string;
    zh: string;
  };
  bio: {
    en: string;
    zh: string;
  };
  photo?: string;
  linkedin?: string;
  twitter?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'ceo',
    name: '张明远',
    title: {
      en: 'Founder & CEO',
      zh: '创始人 & CEO',
    },
    bio: {
      en: '15 years of AI voice technology experience. Former Baidu Voice Technology Lead.',
      zh: '15年AI语音技术经验，前百度语音技术负责人。',
    },
    photo: '/images/team/ceo_001.jpg',
    linkedin: 'https://linkedin.com/in/',
  },
  {
    id: 'cto',
    name: '李思然',
    title: {
      en: 'Co-founder & CTO',
      zh: '联合创始人 & CTO',
    },
    bio: {
      en: 'Deep learning and speech recognition expert. Former Alibaba DAMO Academy researcher.',
      zh: '深度学习与语音识别专家，前阿里达摩院研究员。',
    },
    photo: '/images/team/cto_001.jpg',
    linkedin: 'https://linkedin.com/in/',
  },
  {
    id: 'vp-eng',
    name: '王浩宇',
    title: {
      en: 'VP of Engineering',
      zh: '工程副总裁',
    },
    bio: {
      en: '10 years of large-scale system architecture experience. Former ByteDance Infrastructure Lead.',
      zh: '10年大规模系统架构经验，前字节跳动基础架构负责人。',
    },
    photo: '/images/team/vp-eng_001.jpg',
    linkedin: 'https://linkedin.com/in/',
  },
  {
    id: 'head-product',
    name: '陈晓琳',
    title: {
      en: 'Head of Product',
      zh: '产品负责人',
    },
    bio: {
      en: '8 years of SaaS product experience. Former Youzan Product Director.',
      zh: '8年SaaS产品经验，前有赞产品总监。',
    },
    photo: '/images/team/head-product_001.jpg',
    linkedin: 'https://linkedin.com/in/',
  },
];
