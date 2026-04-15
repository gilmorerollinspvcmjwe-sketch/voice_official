import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Theme store
interface ThemeState {
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
)

// Language store
interface LanguageState {
  language: 'en' | 'zh'
  setLanguage: (language: 'en' | 'zh') => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage',
    }
  )
)

// Audio player store
interface AudioPlayerState {
  isPlaying: boolean
  currentTrack: string | null
  currentTime: number
  duration: number
  volume: number
  setIsPlaying: (isPlaying: boolean) => void
  setCurrentTrack: (track: string | null) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setVolume: (volume: number) => void
}

export const useAudioPlayerStore = create<AudioPlayerState>()((set) => ({
  isPlaying: false,
  currentTrack: null,
  currentTime: 0,
  duration: 0,
  volume: 1,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTrack: (track) => set({ currentTrack: track, currentTime: 0, duration: 0 }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
}))

// Mobile menu store
interface MobileMenuState {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  toggle: () => void
}

export const useMobileMenuStore = create<MobileMenuState>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

// Scroll position store
interface ScrollPositionState {
  scrollY: number
  isScrolled: boolean
  setScrollY: (scrollY: number) => void
}

export const useScrollPositionStore = create<ScrollPositionState>()((set) => ({
  scrollY: 0,
  isScrolled: false,
  setScrollY: (scrollY) => set({ scrollY, isScrolled: scrollY > 50 }),
}))