/**
 * 音色筛选器组件
 * 
 * 支持多维度筛选：性别、年龄段、语言、风格、场景
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, RotateCcw, X } from 'lucide-react';
import { 
  AIVoice, 
  languageMap, 
  styleTypes, 
  scenarioTypes as scenarioList,
  filterVoices 
} from '../../data/tts-voices';
import { cn } from '../../utils/cn';

interface VoiceFilterProps {
  onFilter: (filteredVoices: AIVoice[]) => void;
}

interface FilterState {
  gender: 'all' | 'female' | 'male';
  ageRange: string;
  language: string;
  style: string;
  scenario: string;
}

export function VoiceFilter({ onFilter }: VoiceFilterProps) {
  const { t } = useTranslation('ttsDemo');
  const [filters, setFilters] = useState<FilterState>({
    gender: 'all',
    ageRange: 'all',
    language: 'all',
    style: 'all',
    scenario: 'all'
  });

  // 年龄段选项
  const ageRanges = [
    { value: 'all', label: t('filter.ageRange.all', 'All Ages') },
    { value: '20', label: '20s' },
    { value: '25', label: '25-30' },
    { value: '30', label: '30s' },
    { value: '35', label: '35-40' },
    { value: '40', label: '40s' },
    { value: '50', label: '50+' },
    { value: '8', label: t('filter.ageRange.child', 'Child') }
  ];

  // 语言选项
  const languageOptions = [
    { value: 'all', label: t('filter.language.all', 'All Languages') },
    ...Object.entries(languageMap).map(([code, info]) => ({
      value: code,
      label: `${info.flag} ${info.label}`
    }))
  ];

  // 应用筛选
  const applyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    const filtered = filterVoices(newFilters);
    onFilter(filtered);
  };

  // 更新单个筛选条件
  const updateFilter = (key: keyof FilterState, value: string) => {
    applyFilters({ ...filters, [key]: value });
  };

  // 重置筛选
  const resetFilters = () => {
    const defaultFilters: FilterState = {
      gender: 'all',
      ageRange: 'all',
      language: 'all',
      style: 'all',
      scenario: 'all'
    };
    applyFilters(defaultFilters);
  };

  // 计算筛选结果数量
  const filteredCount = filterVoices(filters).length;
  const hasActiveFilters = Object.values(filters).some(v => v !== 'all');

  return (
    <div className="w-full">
      {/* 筛选器头部 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-foreground-muted" />
          <span className="text-sm text-foreground-secondary">
            {t('filter.results', '{{count}} voices found', { count: filteredCount })}
          </span>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-3 py-1.5 text-sm 
                       text-foreground-secondary hover:text-foreground-primary transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            {t('filter.reset', 'Reset Filters')}
          </button>
        )}
      </div>

      {/* 筛选器主体 */}
      <div className="bg-background-card rounded-xl border border-border p-4">
        {/* 快捷筛选按钮 - 性别 */}
        <div className="mb-4">
          <label className="text-sm font-medium text-foreground-secondary mb-2 block">
            {t('filter.gender.label', 'Gender')}
          </label>
          <div className="flex gap-2">
            {[
              { value: 'all', label: t('filter.gender.all', 'All') },
              { value: 'female', label: `👩 ${t('filter.gender.female', 'Female')}` },
              { value: 'male', label: `👨 ${t('filter.gender.male', 'Male')}` }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => updateFilter('gender', option.value)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm transition-all",
                  "border focus:outline-none focus:ring-2 focus:ring-primary-purple",
                  filters.gender === option.value
                    ? "border-primary-purple bg-primary-purple text-white"
                    : "border-border bg-background-secondary text-foreground-secondary hover:border-border-light hover:text-foreground-primary"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 下拉筛选器 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* 年龄段 */}
          <div>
            <label className="text-sm font-medium text-foreground-secondary mb-2 block">
              {t('filter.ageRange.label', 'Age Range')}
            </label>
            <select
              value={filters.ageRange}
              onChange={(e) => updateFilter('ageRange', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border 
                         bg-background-secondary text-foreground-primary text-sm 
                         focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-primary-purple"
            >
              {ageRanges.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value === 'all' ? t('filter.ageRange.all', 'All Ages') : option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 语言 */}
          <div>
            <label className="text-sm font-medium text-foreground-secondary mb-2 block">
              {t('filter.language.label', 'Language')}
            </label>
            <select
              value={filters.language}
              onChange={(e) => updateFilter('language', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border 
                         bg-background-secondary text-foreground-primary text-sm 
                         focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-primary-purple"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value === 'all' ? t('filter.language.all', 'All Languages') : option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 风格 */}
          <div>
            <label className="text-sm font-medium text-foreground-secondary mb-2 block">
              {t('filter.style.label', 'Style')}
            </label>
            <select
              value={filters.style}
              onChange={(e) => updateFilter('style', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border 
                         bg-background-secondary text-foreground-primary text-sm 
                         focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-primary-purple"
            >
              <option value="all">{t('filter.style.all', 'All Styles')}</option>
              {styleTypes.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>

          {/* 场景 */}
          <div>
            <label className="text-sm font-medium text-foreground-secondary mb-2 block">
              {t('filter.scenario.label', 'Scenario')}
            </label>
            <select
              value={filters.scenario}
              onChange={(e) => updateFilter('scenario', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border 
                         bg-background-secondary text-foreground-primary text-sm 
                         focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-primary-purple"
            >
              <option value="all">{t('filter.scenario.all', 'All Scenarios')}</option>
              {scenarioList.map((scenario) => (
                <option key={scenario} value={scenario}>
                  {scenario}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 当前筛选标签 */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.gender !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 
                               bg-primary-purple/10 text-primary-purple rounded-full text-sm">
                {filters.gender === 'female' ? t('filter.gender.female', 'Female') : t('filter.gender.male', 'Male')}
                <button
                  onClick={() => updateFilter('gender', 'all')}
                  className="hover:bg-primary-purple/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.ageRange !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 
                               bg-background-card text-foreground-secondary rounded-full text-sm border border-border">
                {ageRanges.find(a => a.value === filters.ageRange)?.label}
                <button
                  onClick={() => updateFilter('ageRange', 'all')}
                  className="hover:bg-background-elevated rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.language !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 
                               bg-background-card text-foreground-secondary rounded-full text-sm border border-border">
                {languageMap[filters.language]?.label || filters.language}
                <button
                  onClick={() => updateFilter('language', 'all')}
                  className="hover:bg-background-elevated rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.style !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 
                               bg-background-card text-foreground-secondary rounded-full text-sm border border-border">
                {filters.style}
                <button
                  onClick={() => updateFilter('style', 'all')}
                  className="hover:bg-background-elevated rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.scenario !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 
                               bg-background-card text-foreground-secondary rounded-full text-sm border border-border">
                {filters.scenario}
                <button
                  onClick={() => updateFilter('scenario', 'all')}
                  className="hover:bg-background-elevated rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
