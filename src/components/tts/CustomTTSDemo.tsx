/**
 * 自定义 TTS 试听组件
 * 
 * 用户输入自定义文案，选择音色，实时生成语音试听
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Play, 
  Pause, 
  Download, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Volume2
} from 'lucide-react';
import { AIVoice, languageMap, emotionTypes } from '../../data/tts-voices';
import { cn } from '../../utils/cn';

interface CustomTTSDemoProps {
  voices: AIVoice[];
  onGenerate?: (params: GenerateParams) => Promise<GenerateResult>;
}

interface GenerateParams {
  text: string;
  voiceId: string;
  language: string;
  emotion: string;
  speed: number;
  pitch: number;
}

interface GenerateResult {
  audioUrl: string;
  duration: number;
}

export function CustomTTSDemo({ voices, onGenerate }: CustomTTSDemoProps) {
  // 输入状态
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<AIVoice | null>(
    voices.find(v => v.popular) || voices[0] || null
  );
  const [language, setLanguage] = useState('zh-CN');
  const [emotion, setEmotion] = useState('平静');
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);

  // 生成状态
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 字数限制
  const MAX_CHARS = 200;
  const charCount = text.length;
  const isValidLength = charCount > 0 && charCount <= MAX_CHARS;

  // 音频元素引用
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 更新语言选项
  useEffect(() => {
    if (selectedVoice && selectedVoice.language.length > 0) {
      setLanguage(selectedVoice.language[0]);
    }
  }, [selectedVoice]);

  // 生成音频
  const handleGenerate = async () => {
    if (!isValidLength || !selectedVoice) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedAudio(null);

    try {
      if (onGenerate) {
        const result = await onGenerate({
          text,
          voiceId: selectedVoice.id,
          language,
          emotion,
          speed,
          pitch
        });
        setGeneratedAudio(result.audioUrl);
      } else {
        // 模拟生成（实际项目中应该调用真实 API）
        await new Promise(resolve => setTimeout(resolve, 2000));
        // 使用预置音频作为演示
        setGeneratedAudio(selectedVoice.audioSample);
      }
    } catch (err) {
      setError('生成失败，请稍后重试');
    } finally {
      setIsGenerating(false);
    }
  };

  // 播放/暂停生成的音频
  const togglePlay = () => {
    if (!audioRef.current || !generatedAudio) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 重置
  const handleReset = () => {
    setText('');
    setGeneratedAudio(null);
    setError(null);
    setIsPlaying(false);
  };

  return (
    <div className="w-full bg-background-card rounded-2xl border border-border p-6 shadow-card">
      {/* 标题 */}
      <div className="flex items-center gap-3 mb-6">
        <Mic className="w-6 h-6 text-primary-purple" />
        <h3 className="text-xl font-semibold text-foreground-primary">
          自定义试听
        </h3>
      </div>

      {/* 文本输入 */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground-secondary mb-2 block">
          输入试听文案
        </label>
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
            placeholder="请输入您想听到的内容..."
            rows={4}
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-background-secondary resize-none",
              "focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-primary-purple",
              "placeholder:text-foreground-muted text-foreground-primary",
              "transition-colors",
              charCount > MAX_CHARS && "border-error"
            )}
          />
          <div className="absolute bottom-2 right-2 text-sm text-foreground-muted">
            {charCount} / {MAX_CHARS}
          </div>
        </div>
      </div>

      {/* 音色选择 */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground-secondary mb-2 block">
          选择音色
        </label>
        <select
          value={selectedVoice?.id || ''}
          onChange={(e) => {
            const voice = voices.find(v => v.id === e.target.value);
            setSelectedVoice(voice || null);
          }}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background-secondary 
                     text-foreground-primary focus:outline-none focus:ring-2 focus:ring-primary-purple 
                     focus:border-primary-purple transition-colors"
        >
          {voices.map((voice) => (
            <option key={voice.id} value={voice.id}>
              {voice.name} - {voice.style} ({voice.gender === 'female' ? '女' : '男'})
            </option>
          ))}
        </select>

        {/* 当前音色预览 */}
        {selectedVoice && (
          <div className="mt-3 flex items-center gap-3 p-3 bg-background-secondary rounded-lg border border-border">
            <img
              src={selectedVoice.avatar}
              alt={selectedVoice.name}
              className="w-12 h-12 rounded-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="font-medium text-foreground-primary">{selectedVoice.name}</p>
              <p className="text-sm text-foreground-secondary">
                {selectedVoice.style} · {selectedVoice.ageRange}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 参数调节 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* 语言 */}
        <div>
          <label className="text-sm font-medium text-foreground-secondary mb-2 block">
            语言
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background-secondary 
                       text-foreground-primary focus:outline-none focus:ring-2 focus:ring-primary-purple
                       transition-colors"
            disabled={!selectedVoice}
          >
            {selectedVoice?.language.map((lang) => (
              <option key={lang} value={lang}>
                {languageMap[lang]?.label || lang}
              </option>
            ))}
          </select>
        </div>

        {/* 情感 */}
        <div>
          <label className="text-sm font-medium text-foreground-secondary mb-2 block">
            情感
          </label>
          <select
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background-secondary 
                       text-foreground-primary focus:outline-none focus:ring-2 focus:ring-primary-purple
                       transition-colors"
          >
            {emotionTypes.slice(0, 8).map((em) => (
              <option key={em} value={em}>
                {em}
              </option>
            ))}
          </select>
        </div>

        {/* 语速 */}
        <div>
          <label className="text-sm font-medium text-foreground-secondary mb-2 block">
            语速: {speed.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full h-2 bg-background-elevated rounded-lg appearance-none 
                       cursor-pointer accent-primary-purple"
          />
          <div className="flex justify-between text-xs text-foreground-muted mt-1">
            <span>0.5x</span>
            <span>1.0x</span>
            <span>2.0x</span>
          </div>
        </div>
      </div>

      {/* 音调 */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground-secondary mb-2 block">
          音调: {pitch.toFixed(1)}x
        </label>
        <input
          type="range"
          min="0.5"
          max="2.0"
          step="0.1"
          value={pitch}
          onChange={(e) => setPitch(parseFloat(e.target.value))}
          className="w-full h-2 bg-background-elevated rounded-lg appearance-none 
                     cursor-pointer accent-primary-purple"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>低沉</span>
          <span>正常</span>
          <span>高亢</span>
        </div>
      </div>

      {/* 生成按钮 */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleGenerate}
          disabled={!isValidLength || isGenerating}
          className={cn(
            "flex-1 px-6 py-3 rounded-lg font-medium text-white",
            "flex items-center justify-center gap-2",
            "transition-all duration-300",
            isValidLength && !isGenerating
              ? "bg-primary-purple hover:bg-primary-purple/80 shadow-card"
              : "bg-foreground-muted/30 cursor-not-allowed"
          )}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              正在生成...
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5" />
              生成试听
            </>
          )}
        </button>

        {generatedAudio && (
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-lg font-medium text-foreground-secondary 
                       bg-background-secondary hover:bg-background-elevated transition-colors border border-border"
          >
            重置
          </button>
        )}
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="mb-6 p-4 bg-error/10 rounded-lg flex items-center gap-3 border border-error/20">
          <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />
          <p className="text-error">{error}</p>
        </div>
      )}

      {/* 生成的音频播放器 */}
      {generatedAudio && (
        <div className="p-4 bg-success/5 rounded-lg border border-success/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
            <p className="text-success font-medium">生成成功！</p>
          </div>

          {/* 音频播放器 */}
          <div className="flex items-center gap-4 p-4 bg-background-secondary rounded-lg border border-border">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-primary-purple text-white 
                         flex items-center justify-center shadow-card 
                         hover:scale-110 active:scale-95 transition-transform flex-shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </button>

            {/* 波形可视化 - CSS 动画替代 framer-motion */}
            <div className="flex-grow h-12 bg-background-elevated rounded-lg 
                            flex items-center justify-center overflow-hidden">
              <div className="flex gap-1 items-center">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-1 bg-primary-purple rounded-full transition-all",
                      isPlaying && "wave-bar-animate"
                    )}
                    style={{
                      height: isPlaying ? undefined : '12px',
                      animationDelay: `${i * 0.08}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* 下载按钮 */}
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = generatedAudio;
                link.download = 'tts-demo.mp3';
                link.click();
              }}
              className="w-12 h-12 rounded-full bg-background-elevated text-foreground-secondary 
                         flex items-center justify-center hover:bg-background-hover
                         hover:scale-110 active:scale-95 transition-all flex-shrink-0 border border-border"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>

          {/* 隐藏的音频元素 */}
          <audio
            ref={audioRef}
            src={generatedAudio}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
