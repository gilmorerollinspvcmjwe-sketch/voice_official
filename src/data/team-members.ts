/**
 * 团队成员数据配置
 * 
 * 📝 TODO(老徐): 替换为真实团队信息
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
    name: 'John Smith',
    title: {
      en: 'Chief Executive Officer',
      zh: '首席执行官',
    },
    bio: {
      en: 'John has 20+ years of experience in enterprise software and AI. Previously VP at Salesforce.',
      zh: 'John 在企业软件和 AI 领域拥有 20 多年经验。曾任 Salesforce 副总裁。',
    },
    photo: '/images/team/ceo.jpg', // 📝 TODO(老徐): 添加 CEO 照片
    linkedin: 'https://linkedin.com/in/johnsmith',
  },
  {
    id: 'cto',
    name: 'Sarah Chen',
    title: {
      en: 'Chief Technology Officer',
      zh: '首席技术官',
    },
    bio: {
      en: 'Sarah leads our engineering team with expertise in speech recognition and NLP.',
      zh: 'Sarah 以语音识别和 NLP 专业能力领导我们的工程团队。',
    },
    photo: '/images/team/cto.jpg', // 📝 TODO(老徐): 添加 CTO 照片
    linkedin: 'https://linkedin.com/in/sarahchen',
  },
  {
    id: 'coo',
    name: 'Mike Johnson',
    title: {
      en: 'Chief Operating Officer',
      zh: '首席运营官',
    },
    bio: {
      en: 'Mike oversees daily operations and customer success with 15 years in tech ops.',
      zh: 'Mike 负责日常运营和客户成功，拥有 15 年技术运营经验。',
    },
    photo: '/images/team/coo.jpg', // 📝 TODO(老徐): 添加 COO 照片
    linkedin: 'https://linkedin.com/in/mikejohnson',
  },
  {
    id: 'vp-product',
    name: 'Emily Wang',
    title: {
      en: 'VP of Product',
      zh: '产品副总裁',
    },
    bio: {
      en: 'Emily drives product strategy with a focus on user experience and enterprise needs.',
      zh: 'Emily 以用户体验和企业需求为重点推动产品战略。',
    },
    photo: '/images/team/vp-product.jpg', // 📝 TODO(老徐): 添加 VP 产品照片
    linkedin: 'https://linkedin.com/in/emilywang',
  },
];
