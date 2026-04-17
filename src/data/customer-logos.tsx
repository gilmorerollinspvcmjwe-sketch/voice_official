/**
 * 客户 Logo 配置
 * Logo 文件放置位置: public/logos/
 */

export interface CustomerLogo {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
}

export const customerLogos: CustomerLogo[] = [
  {
    id: 'customer-1',
    name: 'TechCorp',
    logoUrl: '/logos/customer-1.svg',
    website: 'https://udesk.cn',
  },
  {
    id: 'customer-2',
    name: 'FinanceHub',
    logoUrl: '/logos/customer-2.svg',
    website: 'https://udesk.cn',
  },
  {
    id: 'customer-3',
    name: 'RetailMax',
    logoUrl: '/logos/customer-3.svg',
    website: 'https://udesk.cn',
  },
  {
    id: 'customer-4',
    name: 'HealthPlus',
    logoUrl: '/logos/customer-4.svg',
    website: 'https://udesk.cn',
  },
  {
    id: 'customer-5',
    name: 'LogiTech',
    logoUrl: '/logos/customer-5.svg',
    website: 'https://udesk.cn',
  },
  {
    id: 'customer-6',
    name: 'EduFirst',
    logoUrl: '/logos/customer-6.svg',
    website: 'https://udesk.cn',
  },
];

/**
 * 转换为 LogoCarousel 格式
 */
export const logoCarouselItems = customerLogos.map((logo) => ({
  id: logo.id,
  name: logo.name,
  logo: (
    <div className="flex items-center justify-center px-8 py-4">
      <img 
        src={logo.logoUrl} 
        alt={`${logo.name} logo`}
        className="h-8 w-auto grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
      />
    </div>
  ),
}));
