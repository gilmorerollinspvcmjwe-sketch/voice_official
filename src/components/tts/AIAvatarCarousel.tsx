/**
 * AI 真人形象轮播组件
 * 
 * 展示逼真 AI 真人形象，点击播放对应音色示例
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, Volume2 } from 'lucide-react';
import { AIVoice } from '../../data/tts-voices';
import { cn } from '../../utils/cn';

interface AIAvatarCarouselProps {
  voices: AIVoice[];
  onSelect?: (voice: AIVoice) => void;
}

export function AIAvatarCarousel({ 
  voices, 
  onSelect
}: AIAvatarCarouselProps) {
  const { t } = useTranslation('ttsDemo');
  const [selectedVoice, setSelectedVoice] = useState<AIVoice | null>(
    voices && voices.length > 0 ? voices[0] : null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  // Pagination: show 12 avatars initially, then load more
  const INITIAL_VISIBLE = 12;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visibleVoices = voices ? voices.slice(0, visibleCount) : [];
  const hasMore = voices ? visibleCount < voices.length : false;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + INITIAL_VISIBLE, voices?.length || 0));
  }, [voices?.length]);

  // 初始化音频
  useEffect(() => {
    if (selectedVoice && audioRef.current) {
      audioRef.current.src = selectedVoice.audioSample;
      audioRef.current.load();
    }
  }, [selectedVoice]);

  // 播放/暂停
  const togglePlay = () => {
    if (!audioRef.current || !selectedVoice) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 选择音色
  const selectVoice = (voice: AIVoice) => {
    setSelectedVoice(voice);
    setIsPlaying(false);
    setCurrentTime(0);
    onSelect?.(voice);
  };

  // 音频时间更新
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // 音频结束
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // 格式化时间
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!voices || voices.length === 0) {
    return (
      <div className="text-center py-12 text-foreground-secondary">
        {t('avatar.noVoices', 'No voices available')}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 主展示区域 */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* 当前选中的真人形象 */}
        <div className="flex-shrink-0 w-full lg:w-1/3">
          {selectedVoice && (
            <div className="relative">
              {/* 真人图片 */}
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={selectedVoice.avatar}
                  alt={selectedVoice.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* 播放按钮覆盖层 */}
                <div 
                  className="absolute inset-0 bg-black/20 flex items-center justify-center 
                             cursor-pointer transition-all hover:bg-black/30"
                  onClick={togglePlay}
                >
                  <button
                    className={cn(
                      "w-20 h-20 rounded-full flex items-center justify-center",
                      "bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300",
                      "hover:scale-110 active:scale-95",
                      isPlaying && "bg-primary-purple text-white"
                    )}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" />
                    )}
                  </button>
                </div>

                {/* 音频播放进度 */}
                {isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                    <div
                      className="h-full bg-primary-purple transition-all duration-200"
                      style={{ width: `${(currentTime / selectedVoice.duration) * 100}%` }}
                    />
                  </div>
                )}
              </div>

              {/* 音色信息 */}
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-foreground-primary">
                  {selectedVoice.name}
                </h3>
                <p className="text-sm text-foreground-secondary mt-1">
                  {selectedVoice.style} · {selectedVoice.ageRange}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Volume2 className="w-4 h-4 text-primary-purple" />
                  <span className="text-sm text-foreground-secondary">
                    {formatTime(currentTime)} / {formatTime(selectedVoice.duration)}
                  </span>
                </div>
              </div>

              {/* 试听文案 */}
              <div className="mt-4 p-4 bg-background-card rounded-lg border border-border">
                <p className="text-sm text-foreground-secondary italic leading-relaxed">
                  &ldquo;{selectedVoice.script}&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 音色轮播网格 */}
        <div className="flex-grow w-full lg:w-2/3">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {visibleVoices.map((voice) => (
              <button
                key={voice.id}
                onClick={() => selectVoice(voice)}
                className={cn(
                  "relative rounded-full overflow-hidden aspect-square",
                  "border-2 transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-primary-purple focus:ring-offset-2 focus:ring-offset-background-primary",
                  "hover:scale-105 active:scale-95",
                  selectedVoice?.id === voice.id 
                    ? "border-primary-purple shadow-lg ring-2 ring-primary-purple/30" 
                    : "border-border hover:border-border-light"
                )}
              >
                <img
                  src={voice.avatar}
                  alt={voice.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* 悬停播放图标 */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 
                                flex items-center justify-center transition-all">
                  <Play className="w-6 h-6 text-white opacity-0 hover:opacity-100 
                                   transition-opacity" />
                </div>

                {/* 选中指示器 */}
                {selectedVoice?.id === voice.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-purple" />
                )}

                {/* 热门标签 */}
                {voice.popular && (
                  <div className="absolute top-1 right-1 bg-primary-purple text-white 
                                  text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                    {t('gallery.popular', 'Popular')}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Load More button */}
          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMore}
                className="px-6 py-2.5 bg-primary-purple/10 text-primary-purple rounded-full 
                           font-medium hover:bg-primary-purple/20 transition-colors"
              >
                {t('avatar.loadMore', 'Load More ({{count}} more)', { count: voices.length - visibleCount })}
              </button>
            </div>
          )}

          {/* 音色标签信息 */}
          {selectedVoice && (
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary-purple/10 text-primary-purple rounded-full text-sm">
                {selectedVoice.gender === 'female' ? t('avatar.femaleVoice', 'Female Voice') : t('avatar.maleVoice', 'Male Voice')}
              </span>
              <span className="px-3 py-1 bg-background-card text-foreground-secondary rounded-full text-sm border border-border">
                {selectedVoice.ageRange}
              </span>
              <span className="px-3 py-1 bg-background-card text-foreground-secondary rounded-full text-sm border border-border">
                {selectedVoice.style}
              </span>
              {selectedVoice.language.map((lang) => (
                <span 
                  key={lang}
                  className="px-3 py-1 bg-background-card text-foreground-secondary rounded-full text-sm border border-border"
                >
                  {lang}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 隐藏的音频元素 */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="hidden"
      />
    </div>
  );
}
