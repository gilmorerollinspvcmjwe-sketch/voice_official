/**
 * Demo 交互式演示页面
 */

import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff, ChevronDown, Globe, User, Bot, Settings, RefreshCw } from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/common'
import { scenarios, type DemoScenario } from '@/data/demo-scenarios'

// 语言选项
const languages = [
  { code: 'zh-CN', name: '中文 (普通话)', flag: '🇨🇳' },
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
  { code: 'ko-KR', name: '한국어', flag: '🇰🇷' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
]

// 音色选项
const voices = [
  { id: 'female-young', name: 'Young Female', description: '专业、亲切' },
  { id: 'female-mature', name: 'Mature Female', description: '成熟、权威' },
  { id: 'male-young', name: 'Young Male', description: '活力、友好' },
  { id: 'male-mature', name: 'Mature Male', description: '稳重、可信' },
]

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const Demo = () => {
  const { t, i18n } = useTranslation('demo')
  const [selectedScenario, setSelectedScenario] = useState<DemoScenario | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [selectedVoice, setSelectedVoice] = useState(voices[0])
  const [userInput, setUserInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showScenarioDropdown, setShowScenarioDropdown] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showVoiceDropdown, setShowVoiceDropdown] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleScenarioSelect = (scenario: DemoScenario) => {
    setSelectedScenario(scenario)
    setShowScenarioDropdown(false)
    // Reset messages when changing scenario
    setMessages([])
  }

  const handleSendMessage = async () => {
    if (!userInput.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userInput,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setUserInput('')

    // Simulate AI response
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      content: selectedScenario 
        ? `这是一个示例回复。当前场景: ${selectedScenario.name.zh || selectedScenario.name.en}\n\n我会如何回答这个问题...`
        : '请选择一个场景开始演示，或者直接输入您的问题。',
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, aiResponse])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    }

  const resetConversation = () => {
    setMessages([])
  }

  // Get localized scenario name
  const getScenarioName = (scenario: DemoScenario) => {
    return i18n.language === 'zh' && scenario.name.zh ? scenario.name.zh : scenario.name.en
  }

  return (
    <>
      <Helmet>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
      </Helmet>

      <div className="min-h-screen bg-background-primary">
        {/* Hero */}
        <section className="py-12 md:py-16 bg-gradient-hero text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge variant="accent" className="mb-4">{t('interactive.badge', 'Interactive Demo')}</Badge>
              <h1 className="text-display font-bold mb-4">{t('interactive.title', 'Try VoiceAI Live')}</h1>
              <p className="text-body-lg text-white/80">
                {t('interactive.subtitle', 'Experience natural AI voice conversations in real-time. Select a scenario and start chatting!')}
              </p>
            </motion.div>
          </Container>
        </section>

        {/* Demo Interface */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto">
              <Card padding="lg" className="bg-background-secondary border-border">
                <div className="grid lg:grid-cols-[300px_1fr] gap-6">
                  {/* Left Sidebar - Controls */}
                  <div className="space-y-6">
                    {/* Scenario Selector */}
                    <div>
                      <label className="block text-body-sm font-medium text-text mb-2">
                        {t('interactive.scenario', 'Select Scenario')}
                      </label>
                      <div className="relative">
                        <button
                          onClick={() => setShowScenarioDropdown(!showScenarioDropdown)}
                          className="w-full px-4 py-3 bg-background-primary border border-border rounded-xl text-left text-text flex items-center justify-between hover:border-accent transition-colors"
                        >
                          <span className="truncate">
                            {selectedScenario ? getScenarioName(selectedScenario) : t('interactive.selectScenario', 'Choose a scenario...')}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-text-muted transition-transform ${showScenarioDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {showScenarioDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-20 top-full left-0 right-0 mt-2 bg-background-card border border-border rounded-xl shadow-lg overflow-hidden max-h-64 overflow-y-auto"
                            >
                              {scenarios.slice(0, 10).map((scenario) => (
                                <button
                                  key={scenario.id}
                                  onClick={() => handleScenarioSelect(scenario)}
                                  className="w-full px-4 py-3 text-left text-body-sm text-text hover:bg-accent/10 transition-colors border-b border-border last:border-b-0"
                                >
                                  <div className="font-medium">{getScenarioName(scenario)}</div>
                                  <div className="text-caption text-text-muted truncate">
                                    {scenario.description.zh || scenario.description.en}
                                  </div>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Language Selector */}
                    <div>
                      <label className="block text-body-sm font-medium text-text mb-2">
                        <Globe className="w-4 h-4 inline mr-1" />
                        {t('interactive.language', 'Language')}
                      </label>
                      <div className="relative">
                        <button
                          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                          className="w-full px-4 py-3 bg-background-primary border border-border rounded-xl text-left text-text flex items-center justify-between hover:border-accent transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <span>{selectedLanguage.flag}</span>
                            <span>{selectedLanguage.name}</span>
                          </span>
                          <ChevronDown className={`w-5 h-5 text-text-muted transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {showLanguageDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-20 top-full left-0 right-0 mt-2 bg-background-card border border-border rounded-xl shadow-lg overflow-hidden"
                            >
                              {languages.map((lang) => (
                                <button
                                  key={lang.code}
                                  onClick={() => {
                                    setSelectedLanguage(lang)
                                    setShowLanguageDropdown(false)
                                  }}
                                  className={`w-full px-4 py-3 text-left text-body-sm hover:bg-accent/10 transition-colors flex items-center gap-2 ${
                                    selectedLanguage.code === lang.code ? 'bg-accent/10 text-accent' : 'text-text'
                                  }`}
                                >
                                  <span>{lang.flag}</span>
                                  <span>{lang.name}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Voice Selector */}
                    <div>
                      <label className="block text-body-sm font-medium text-text mb-2">
                        <Settings className="w-4 h-4 inline mr-1" />
                        {t('interactive.voice', 'Voice Type')}
                      </label>
                      <div className="relative">
                        <button
                          onClick={() => setShowVoiceDropdown(!showVoiceDropdown)}
                          className="w-full px-4 py-3 bg-background-primary border border-border rounded-xl text-left text-text flex items-center justify-between hover:border-accent transition-colors"
                        >
                          <span>{selectedVoice.name}</span>
                          <ChevronDown className={`w-5 h-5 text-text-muted transition-transform ${showVoiceDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {showVoiceDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-20 top-full left-0 right-0 mt-2 bg-background-card border border-border rounded-xl shadow-lg overflow-hidden"
                            >
                              {voices.map((voice) => (
                                <button
                                  key={voice.id}
                                  onClick={() => {
                                    setSelectedVoice(voice)
                                    setShowVoiceDropdown(false)
                                  }}
                                  className={`w-full px-4 py-3 text-left hover:bg-accent/10 transition-colors ${
                                    selectedVoice.id === voice.id ? 'bg-accent/10 text-accent' : 'text-text'
                                  }`}
                                >
                                  <div className="text-body-sm font-medium">{voice.name}</div>
                                  <div className="text-caption text-text-muted">{voice.description}</div>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Reset Button */}
                    <Button
                      variant="outline"
                      size="md"
                      fullWidth
                      leftIcon={<RefreshCw className="w-4 h-4" />}
                      onClick={resetConversation}
                    >
                      {t('interactive.reset', 'Reset Conversation')}
                    </Button>
                  </div>

                  {/* Right Side - Chat Interface */}
                  <div className="flex flex-col h-[500px]">
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
                      {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <Bot className="w-16 h-16 text-foreground-muted mb-4" />
                          <h3 className="text-subheading font-semibold text-text mb-2">
                            {t('interactive.welcome', 'Welcome to VoiceAI Demo')}
                          </h3>
                          <p className="text-body-sm text-text-muted max-w-sm">
                            {selectedScenario 
                              ? t('interactive.startChat', 'Start a conversation about') + ' ' + getScenarioName(selectedScenario)
                              : t('interactive.startPrompt', 'Select a scenario from the left or type your message to begin.')}
                          </p>
                        </div>
                      )}

                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-start gap-3 ${
                            message.role === 'user' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          {/* Avatar */}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === 'user' 
                              ? 'bg-accent/20 text-accent' 
                              : 'bg-primary-purple/20 text-primary-purple'
                          }`}>
                            {message.role === 'user' ? (
                              <User className="w-5 h-5" />
                            ) : (
                              <Bot className="w-5 h-5" />
                            )}
                          </div>
                          
                          {/* Message Bubble */}
                          <div className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-accent text-white rounded-tr-sm'
                              : 'bg-background-card border border-border text-text rounded-tl-sm'
                          }`}>
                            <p className="text-body-sm whitespace-pre-wrap">{message.content}</p>
                            <p className={`text-caption mt-1 ${
                              message.role === 'user' ? 'text-white/60' : 'text-text-muted'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </motion.div>
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary-purple/20 text-primary-purple flex items-center justify-center">
                            <Bot className="w-5 h-5" />
                          </div>
                          <div className="bg-background-card border border-border px-4 py-3 rounded-2xl rounded-tl-sm">
                            <div className="flex gap-1">
                              <motion.span
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="w-2 h-2 bg-primary-purple rounded-full"
                              />
                              <motion.span
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                className="w-2 h-2 bg-primary-purple rounded-full"
                              />
                              <motion.span
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                className="w-2 h-2 bg-primary-purple rounded-full"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="flex items-center gap-3">
                      {/* Recording Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleRecording}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          isRecording
                            ? 'bg-red-500 text-white animate-pulse'
                            : 'bg-background-card border border-border text-text-muted hover:text-accent hover:border-accent'
                        }`}
                      >
                        {isRecording ? (
                          <MicOff className="w-5 h-5" />
                        ) : (
                          <Mic className="w-5 h-5" />
                        )}
                      </motion.button>

                      {/* Text Input */}
                      <div className="flex-1 relative">
                        <textarea
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder={t('interactive.inputPlaceholder', 'Type your message...')}
                          rows={1}
                          className="w-full px-4 py-3 bg-background-card border border-border rounded-xl text-text placeholder:text-foreground-muted focus:outline-none focus:border-accent resize-none"
                          style={{ minHeight: '48px', maxHeight: '120px' }}
                        />
                      </div>

                      {/* Send Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={!userInput.trim()}
                        className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors"
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>

                    {/* Audio Waveform Visualization */}
                    {isRecording && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 flex items-center justify-center gap-1 h-12"
                      >
                        {Array.from({ length: 20 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 bg-red-500 rounded-full"
                            animate={{
                              height: [8, 20 + Math.random() * 24, 8],
                            }}
                            transition={{
                              duration: 0.5 + Math.random() * 0.3,
                              repeat: Infinity,
                              delay: i * 0.03,
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </Card>

              {/* 模拟演示提示 */}
              <div className="text-center mt-4">
                <Badge variant="outline" className="text-accent">
                  🎭 模拟演示 | Simulation Demo
                </Badge>
                <p className="text-caption text-text-muted mt-2">
                  真实对话体验请联系我们预约演示
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Scenarios Overview */}
        <section className="py-12 bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-title font-bold text-text mb-2">{t('scenarios.title', 'Available Scenarios')}</h2>
              <p className="text-body text-text-secondary">{t('scenarios.subtitle', 'Explore different use cases for AI voice agents')}</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: '🎧', label: '客服', count: scenarios.filter(s => s.category === 'customer-service').length },
                { icon: '💰', label: '销售', count: scenarios.filter(s => s.category === 'sales').length },
                { icon: '📞', label: '催收', count: scenarios.filter(s => s.category === 'collections' || s.category === 'finance').length },
                { icon: '📅', label: '预订', count: scenarios.filter(s => s.category === 'appointment').length },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="hover" padding="md" className="text-center">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="text-subheading font-semibold text-text">{item.label}</div>
                    <div className="text-caption text-text-muted">{item.count} scenarios</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Demo
