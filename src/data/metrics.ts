/**
 * 数据指标配置
 * 
 * 修改此文件中的数值为真实数据
 * 所有指标将在首页 Social Proof 区域展示
 */

export interface Metric {
  key: string;        // 唯一标识符
  value: string;      // 数值（不含后缀）
  suffix?: string;    // 后缀如 %、M+、K+
  prefix?: string;    // 前缀如 $、¥
  label: {
    en: string;
    zh: string;
  };
  description?: {
    en: string;
    zh: string;
  };
}

export const metrics: Metric[] = [
  // =====================================================
  // 📊 请修改以下数值为您的真实数据
  // =====================================================
  
  {
    key: 'calls_monthly',
    value: '10',      // ← 修改为真实月通话量（单位：百万）
    suffix: 'M+',
    label: {
      en: 'Calls Monthly',
      zh: '月通话量'
    },
    description: {
      en: 'Voice calls processed every month',
      zh: '每月处理的语音通话'
    }
  },

  {
    key: 'accuracy',
    value: '99.5',    // ← 修改为真实准确率
    suffix: '%',
    label: {
      en: 'Accuracy Rate',
      zh: '准确率'
    },
    description: {
      en: 'Speech recognition accuracy',
      zh: '语音识别准确率'
    }
  },

  {
    key: 'cost_reduction',
    value: '60',      // ← 修改为真实成本降低比例
    suffix: '%',
    label: {
      en: 'Cost Reduction',
      zh: '成本降低'
    },
    description: {
      en: 'Average savings compared to traditional support',
      zh: '相比传统客服节省成本'
    }
  },

  {
    key: 'uptime',
    value: '99.9',    // ← 修改为真实可用性
    suffix: '%',
    label: {
      en: 'Uptime SLA',
      zh: '可用性'
    },
    description: {
      en: 'Platform availability guarantee',
      zh: '平台稳定运行保障'
    }
  },

  {
    key: 'languages',
    value: '50',      // ← 修改为支持的语言数量
    suffix: '+',
    label: {
      en: 'Languages',
      zh: '支持语言'
    },
    description: {
      en: 'Global language coverage',
      zh: '覆盖全球主要语言'
    }
  },

  {
    key: 'customers',
    value: '500',     // ← 修改为客户数量
    suffix: '+',
    label: {
      en: 'Enterprise Customers',
      zh: '服务客户'
    },
    description: {
      en: 'Companies using our platform',
      zh: '全球企业客户数量'
    }
  },

  // =====================================================
  // 可添加更多指标...
  // =====================================================
];

/**
 * 获取格式化后的指标显示值
 */
export function getFormattedMetric(metric: Metric): string {
  const prefix = metric.prefix || '';
  const suffix = metric.suffix || '';
  return `${prefix}${metric.value}${suffix}`;
}