/**
 * 安全合规配置
 * 
 * 用于 /security 页面
 * 展示安全认证、数据保护措施、合规声明
 */

// =====================================================
// 类型定义
// =====================================================

export interface SecurityCertification {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  logo: string;
  description: {
    en: string;
    zh: string;
  };
  status: 'certified' | 'in_progress' | 'planned';
  validUntil?: string;
  link?: string;
}

export interface SecurityFeature {
  id: string;
  category: SecurityCategory;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  icon: string;
  details?: string[];
}

export type SecurityCategory = 
  | 'encryption'
  | 'access-control'
  | 'data-protection'
  | 'compliance'
  | 'monitoring'
  | 'infrastructure';

export interface DataResidencyRegion {
  id: string;
  name: string;
  locations: string[];
  compliance: string[];
}

export interface SecurityAuditLog {
  eventType: string;
  description: string;
  retainedDays: number;
}

// =====================================================
// 安全认证配置
// =====================================================

export const securityCertifications: SecurityCertification[] = [
  {
    id: 'soc2',
    name: {
      en: 'SOC 2 Type II',
      zh: 'SOC 2 Type II 认证'
    },
    logo: '/images/security/soc2.svg',
    description: {
      en: 'Demonstrates our commitment to security, availability, processing integrity, confidentiality, and privacy.',
      zh: '证明我们在安全性、可用性、处理完整性、保密性和隐私保护方面的承诺。'
    },
    status: 'certified',
    validUntil: '2025-12-31',
    link: '/docs/security/soc2-report'
  },
  {
    id: 'gdpr',
    name: {
      en: 'GDPR Compliance',
      zh: 'GDPR 合规'
    },
    logo: '/images/security/gdpr.svg',
    description: {
      en: 'Fully compliant with EU General Data Protection Regulation for data processing and storage.',
      zh: '完全符合欧盟通用数据保护条例，覆盖数据处理和存储要求。'
    },
    status: 'certified',
    link: '/docs/security/gdpr-statement'
  },
  {
    id: 'iso27001',
    name: {
      en: 'ISO 27001',
      zh: 'ISO 27001 认证'
    },
    logo: '/images/security/iso27001.svg',
    description: {
      en: 'International standard for information security management systems.',
      zh: '信息安全管理体系国际标准认证。'
    },
    status: 'certified',
    validUntil: '2025-06-30',
    link: '/docs/security/iso27001-certificate'
  },
  {
    id: 'hipaa',
    name: {
      en: 'HIPAA Compliance',
      zh: 'HIPAA 合规'
    },
    logo: '/images/security/hipaa.svg',
    description: {
      en: 'Healthcare data protection compliant for medical customer service applications.',
      zh: '符合医疗数据保护要求，适用于医疗客服场景。'
    },
    status: 'certified',
    link: '/docs/security/hipaa-baa'
  },
  {
    id: 'pci-dss',
    name: {
      en: 'PCI DSS Level 1',
      zh: 'PCI DSS Level 1'
    },
    logo: '/images/security/pci-dss.svg',
    description: {
      en: 'Payment card industry data security standard for financial transactions.',
      zh: '支付卡行业数据安全标准，用于金融交易场景。'
    },
    status: 'certified',
    validUntil: '2025-03-31',
    link: '/docs/security/pci-dss'
  },
  {
    id: ' ccpa',
    name: {
      en: 'CCPA Compliance',
      zh: 'CCPA 合规'
    },
    logo: '/images/security/ccpa.svg',
    description: {
      en: 'California Consumer Privacy Act compliant for US customers.',
      zh: '符合加州消费者隐私法，服务美国客户。'
    },
    status: 'certified',
    link: '/docs/security/ccpa-statement'
  }
];

// =====================================================
// 安全功能配置
// =====================================================

export const securityFeatures: SecurityFeature[] = [
  // -----------------------------------------------------
  // 加密
  // -----------------------------------------------------
  {
    id: 'tls-encryption',
    category: 'encryption',
    title: {
      en: 'TLS 1.3 Encryption',
      zh: 'TLS 1.3 加密'
    },
    description: {
      en: 'All communications encrypted with TLS 1.3 for maximum security in transit.',
      zh: '所有通信使用 TLS 1.3 加密，确保传输过程最高安全性。'
    },
    icon: 'Lock',
    details: [
      'AES-256 encryption for all data in transit',
      'Perfect Forward Secrecy (PFS) enabled',
      'Certificate transparency verification',
      'Automatic certificate renewal'
    ]
  },
  {
    id: 'end-to-end-encryption',
    category: 'encryption',
    title: {
      en: 'End-to-End Encryption',
      zh: '端到端加密'
    },
    description: {
      en: 'Voice data encrypted from caller to AI agent with no intermediate decryption.',
      zh: '语音数据从来电方到 AI 智能体全程加密，无中间解密。'
    },
    icon: 'Shield',
    details: [
      'Voice streams encrypted during transmission',
      'No plaintext voice data at any relay point',
      'Secure key exchange protocol',
      'Ephemeral session keys'
    ]
  },
  {
    id: 'data-encryption',
    category: 'encryption',
    title: {
      en: 'Data at Rest Encryption',
      zh: '静态数据加密'
    },
    description: {
      en: 'All stored data encrypted with AES-256, including recordings, transcripts, and customer data.',
      zh: '所有存储数据使用 AES-256 加密，包括录音、转录文本和客户数据。'
    },
    icon: 'Database',
    details: [
      'AES-256 encryption for databases',
      'Encrypted backup storage',
      'Key management service (KMS)',
      'Automatic key rotation'
    ]
  },

  // -----------------------------------------------------
  // 访问控制
  // -----------------------------------------------------
  {
    id: 'rbac',
    category: 'access-control',
    title: {
      en: 'Role-Based Access Control',
      zh: '基于角色的访问控制'
    },
    description: {
      en: 'Fine-grained permissions system ensures users only access data they need.',
      zh: '精细权限系统确保用户只能访问其所需数据。'
    },
    icon: 'Users',
    details: [
      'Granular permission levels',
      'Custom role creation',
      'Resource-level access control',
      'Time-based access restrictions'
    ]
  },
  {
    id: 'mfa',
    category: 'access-control',
    title: {
      en: 'Multi-Factor Authentication',
      zh: '多因素认证'
    },
    description: {
      en: 'MFA required for all user accounts with support for TOTP, SMS, and hardware tokens.',
      zh: '所有用户账户需启用多因素认证，支持 TOTP、短信和硬件令牌。'
    },
    icon: 'Key',
    details: [
      'TOTP authentication apps',
      'SMS verification backup',
      'Hardware security keys (FIDO2)',
      'Biometric authentication support'
    ]
  },
  {
    id: 'sso',
    category: 'access-control',
    title: {
      en: 'SSO Integration',
      zh: 'SSO 集成'
    },
    description: {
      en: 'Integrate with enterprise identity providers for unified access management.',
      zh: '与企业身份提供商集成，实现统一访问管理。'
    },
    icon: 'Link',
    details: [
      'SAML 2.0 support',
      'OAuth 2.0 / OpenID Connect',
      'Active Directory integration',
      'Okta, Azure AD, Google Workspace'
    ]
  },
  {
    id: 'session-management',
    category: 'access-control',
    title: {
      en: 'Session Management',
      zh: '会话管理'
    },
    description: {
      en: 'Automatic session timeout and secure session handling to prevent unauthorized access.',
      zh: '自动会话超时和安全会话处理，防止未授权访问。'
    },
    icon: 'Clock',
    details: [
      'Configurable session timeout',
      'Session invalidation on password change',
      'Concurrent session limits',
      'IP-based session binding'
    ]
  },

  // -----------------------------------------------------
  // 数据保护
  // -----------------------------------------------------
  {
    id: 'data-residency',
    category: 'data-protection',
    title: {
      en: 'Data Residency Options',
      zh: '数据驻留选择'
    },
    description: {
      en: 'Choose where your data is stored to meet regional compliance requirements.',
      zh: '选择数据存储位置，满足区域合规要求。'
    },
    icon: 'Globe',
    details: [
      'US data centers (AWS Virginia)',
      'EU data centers (AWS Frankfurt)',
      'Asia-Pacific data centers (AWS Singapore)',
      'Custom deployment options'
    ]
  },
  {
    id: 'data-retention',
    category: 'data-protection',
    title: {
      en: 'Flexible Data Retention',
      zh: '灵活数据保留'
    },
    description: {
      en: 'Configure retention policies to meet your compliance and operational needs.',
      zh: '配置保留策略，满足您的合规和运营需求。'
    },
    icon: 'Calendar',
    details: [
      'Configurable retention periods',
      'Automatic data purging',
      'Legal hold support',
      'Data lifecycle management'
    ]
  },
  {
    id: 'pii-protection',
    category: 'data-protection',
    title: {
      en: 'PII Protection',
      zh: '个人信息保护'
    },
    description: {
      en: 'Automatic detection and handling of personally identifiable information.',
      zh: '自动检测和处理个人身份信息。'
    },
    icon: 'UserX',
    details: [
      'PII detection in transcripts',
      'Automatic masking/redaction',
      'Consent management',
      'Right to erasure support'
    ]
  },

  // -----------------------------------------------------
  // 合规
  // -----------------------------------------------------
  {
    id: 'consent-management',
    category: 'compliance',
    title: {
      en: 'Consent Management',
      zh: '同意管理'
    },
    description: {
      en: 'Capture and manage customer consent for recording, data processing, and AI interaction.',
      zh: '捕获和管理客户对录音、数据处理和 AI 交互的同意。'
    },
    icon: 'CheckCircle',
    details: [
      'Call recording consent prompts',
      'Consent version tracking',
      'Withdrawal mechanism',
      'Consent audit trail'
    ]
  },
  {
    id: 'gdpr-rights',
    category: 'compliance',
    title: {
      en: 'GDPR Rights Support',
      zh: 'GDPR 权利支持'
    },
    description: {
      en: 'Full support for GDPR data subject rights including access, deletion, and portability.',
      zh: '完全支持 GDPR 数据主体权利，包括访问、删除和可携带性。'
    },
    icon: 'FileText',
    details: [
      'Right to access (Article 15)',
      'Right to rectification (Article 16)',
      'Right to erasure (Article 17)',
      'Right to data portability (Article 20)'
    ]
  },
  {
    id: 'call-recording-compliance',
    category: 'compliance',
    title: {
      en: 'Call Recording Compliance',
      zh: '通话录音合规'
    },
    description: {
      en: 'Region-specific call recording consent and disclosure requirements handled automatically.',
      zh: '自动处理各地区的通话录音同意和披露要求。'
    },
    icon: 'Mic',
    details: [
      'US state-specific requirements',
      'EU GDPR consent prompts',
      'Asia-Pacific regulations',
      'Disclosure scripts customization'
    ]
  },

  // -----------------------------------------------------
  // 监控
  // -----------------------------------------------------
  {
    id: 'audit-logs',
    category: 'monitoring',
    title: {
      en: 'Comprehensive Audit Logs',
      zh: '全面审计日志'
    },
    description: {
      en: 'Detailed audit trail of all system access, configuration changes, and data operations.',
      zh: '所有系统访问、配置更改和数据操作的详细审计追踪。'
    },
    icon: 'FileSearch',
    details: [
      'User activity logging',
      'Configuration change tracking',
      'Data access records',
      'API call logging'
    ]
  },
  {
    id: 'security-monitoring',
    category: 'monitoring',
    title: {
      en: '24/7 Security Monitoring',
      zh: '24/7 安全监控'
    },
    description: {
      en: 'Continuous monitoring for threats, anomalies, and security incidents.',
      zh: '持续监控威胁、异常和安全事件。'
    },
    icon: 'Eye',
    details: [
      'Real-time threat detection',
      'Anomaly detection alerts',
      'SIEM integration',
      'Incident response automation'
    ]
  },
  {
    id: 'breach-notification',
    category: 'monitoring',
    title: {
      en: 'Breach Notification',
      zh: '安全事件通知'
    },
    description: {
      en: 'Rapid notification and response procedures in case of security incidents.',
      zh: '安全事件时的快速通知和响应程序。'
    },
    icon: 'AlertTriangle',
    details: [
      '72-hour GDPR notification',
      'Incident severity classification',
      'Customer notification protocols',
      'Post-incident reports'
    ]
  },

  // -----------------------------------------------------
  // 基础设施
  // -----------------------------------------------------
  {
    id: 'infrastructure-security',
    category: 'infrastructure',
    title: {
      en: 'Secure Infrastructure',
      zh: '安全基础设施'
    },
    description: {
      en: 'Built on AWS with enterprise-grade security practices and certifications.',
      zh: '基于 AWS 构建，采用企业级安全实践和认证。'
    },
    icon: 'Server',
    details: [
      'AWS certified infrastructure',
      'Network isolation (VPC)',
      'DDoS protection',
      'Web Application Firewall (WAF)'
    ]
  },
  {
    id: 'redundancy',
    category: 'infrastructure',
    title: {
      en: 'High Availability',
      zh: '高可用性'
    },
    description: {
      en: 'Multi-region deployment with automatic failover for 99.9% uptime guarantee.',
      zh: '多区域部署，自动故障转移，保障 99.9% 可用性。'
    },
    icon: 'RefreshCw',
    details: [
      'Multi-region redundancy',
      'Automatic failover',
      'Load balancing',
      '99.9% uptime SLA'
    ]
  },
  {
    id: 'disaster-recovery',
    category: 'infrastructure',
    title: {
      en: 'Disaster Recovery',
      zh: '灾难恢复'
    },
    description: {
      en: 'Regular backups and tested recovery procedures to protect your data.',
      zh: '定期备份和经过测试的恢复程序，保护您的数据。'
    },
    icon: 'Cloud',
    details: [
      'Daily automated backups',
      'Cross-region backup replication',
      'RPO: < 1 hour',
      'RTO: < 4 hours'
    ]
  }
];

// =====================================================
// 数据驻留区域配置
// =====================================================

export const dataResidencyRegions: DataResidencyRegion[] = [
  {
    id: 'us',
    name: 'United States',
    locations: ['Virginia (us-east-1)', 'Oregon (us-west-2)'],
    compliance: ['SOC 2', 'HIPAA', 'CCPA']
  },
  {
    id: 'eu',
    name: 'European Union',
    locations: ['Frankfurt (eu-central-1)', 'Ireland (eu-west-1)'],
    compliance: ['GDPR', 'SOC 2', 'ISO 27001']
  },
  {
    id: 'apac',
    name: 'Asia-Pacific',
    locations: ['Singapore (ap-southeast-1)', 'Tokyo (ap-northeast-1)'],
    compliance: ['SOC 2', 'Local regulations']
  },
  {
    id: 'china',
    name: 'China',
    locations: ['Beijing (cn-north-1)', 'Shanghai (cn-east-1)'],
    compliance: ['网络安全法', '个人信息保护法']
  }
];

// =====================================================
// 审计日志配置
// =====================================================

export const auditLogEvents: SecurityAuditLog[] = [
  { eventType: 'user.login', description: 'User login events', retainedDays: 365 },
  { eventType: 'user.logout', description: 'User logout events', retainedDays: 365 },
  { eventType: 'user.mfa_enable', description: 'MFA enabled', retainedDays: 365 },
  { eventType: 'user.password_change', description: 'Password changes', retainedDays: 365 },
  { eventType: 'user.role_change', description: 'Role assignments changed', retainedDays: 365 },
  { eventType: 'call.initiated', description: 'Call started', retainedDays: 90 },
  { eventType: 'call.recording', description: 'Recording started/stopped', retainedDays: 365 },
  { eventType: 'call.transcript', description: 'Transcript generated', retainedDays: 90 },
  { eventType: 'config.change', description: 'System configuration changes', retainedDays: 365 },
  { eventType: 'api.access', description: 'API endpoint accessed', retainedDays: 90 },
  { eventType: 'data.export', description: 'Data export operations', retainedDays: 365 },
  { eventType: 'data.delete', description: 'Data deletion operations', retainedDays: 365 }
];

// =====================================================
// 安全页面 FAQ
// =====================================================

export const securityFAQ = [
  {
    question: {
      en: 'How is my call data protected?',
      zh: '我的通话数据如何保护？'
    },
    answer: {
      en: 'All call data is encrypted using TLS 1.3 in transit and AES-256 at rest. Voice recordings and transcripts are stored in encrypted databases with automatic key rotation. Access to your data requires authentication and is logged in our audit system.',
      zh: '所有通话数据在传输中使用 TLS 1.3 加密，静态存储使用 AES-256 加密。语音录音和转录文本存储在加密数据库中，自动密钥轮换。访问您的数据需要认证，并记录在审计系统中。'
    }
  },
  {
    question: {
      en: 'Can I choose where my data is stored?',
      zh: '我可以选择数据存储位置吗？'
    },
    answer: {
      en: 'Yes, Enterprise customers can select their data residency region (US, EU, Asia-Pacific, or China) to meet local compliance requirements. Data remains within the selected region for processing and storage.',
      zh: '是的，企业客户可以选择数据驻留区域（美国、欧盟、亚太或中国），满足当地合规要求。数据在选定区域内进行处理和存储。'
    }
  },
  {
    question: {
      en: 'What happens in case of a security breach?',
      zh: '发生安全事件时会怎样？'
    },
    answer: {
      en: 'We have 24/7 security monitoring and incident response procedures. In case of a breach affecting your data, we will notify you within 72 hours as required by GDPR, provide details of the incident, and take immediate remediation steps.',
      zh: '我们有 24/7 安全监控和事件响应程序。如果发生影响您数据的安全事件，我们将按 GDPR 要求在 72 小时内通知您，提供事件详情，并立即采取补救措施。'
    }
  },
  {
    question: {
      en: 'How do you handle GDPR right to erasure requests?',
      zh: '你们如何处理 GDPR 删除权请求？'
    },
    answer: {
      en: 'We fully support GDPR Article 17 (Right to Erasure). You can request deletion of your personal data through our privacy portal. We will process the request within 30 days and delete data from all systems, backups, and logs.',
      zh: '我们完全支持 GDPR 第 17 条（删除权）。您可以通过隐私门户请求删除个人数据。我们将在 30 天内处理请求，从所有系统、备份和日志中删除数据。'
    }
  },
  {
    question: {
      en: 'Is call recording consent handled automatically?',
      zh: '通话录音同意是自动处理的吗？'
    },
    answer: {
      en: 'Yes, our AI agents automatically handle call recording consent at the start of each call. The consent prompt and disclosure script can be customized to meet your regional requirements (US state laws, GDPR, etc.).',
      zh: '是的，我们的 AI 智能体在每次通话开始时自动处理录音同意。同意提示和披露脚本可根据您所在地区的要求（美国州法律、GDPR 等）进行定制。'
    }
  },
  {
    question: {
      en: 'Do you support HIPAA for healthcare applications?',
      zh: '你们支持医疗应用场景的 HIPAA 吗？'
    },
    answer: {
      en: 'Yes, we are HIPAA compliant and can execute a Business Associate Agreement (BAA) with healthcare organizations. Our platform includes PHI protection features suitable for medical customer service applications.',
      zh: '是的，我们符合 HIPAA 合规要求，可以与医疗组织签署业务关联协议（BAA）。我们的平台包含适合医疗客服应用的 PHI 保护功能。'
    }
  }
];

// =====================================================
// 查询函数
// =====================================================

export function getCertifications(): SecurityCertification[] {
  return securityCertifications.filter(c => c.status === 'certified');
}

export function getCertificationById(id: string): SecurityCertification | undefined {
  return securityCertifications.find(c => c.id === id);
}

export function getFeaturesByCategory(category: SecurityCategory): SecurityFeature[] {
  return securityFeatures.filter(f => f.category === category);
}

export function getRegionById(id: string): DataResidencyRegion | undefined {
  return dataResidencyRegions.find(r => r.id === id);
}