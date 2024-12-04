export interface Word {
  word: string
  start: number
  end: number
  emphasis: number
  confidence_word: number
}

export interface Subtitle {
  start_time: number
  end_time: number
  start_frame: string
  end_frame: string
  subtitle: string
  emotion: string
  emotion_intensity: number
  confidence_utterance: number
  speech_rate: number
  volume: number
  words: Word[]
}

export interface TimelineProps {
  subtitles: Subtitle[]
  currentTime: number
  onTimeUpdate: (time: number) => void
  isPlaying: boolean
}

