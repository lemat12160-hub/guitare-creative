export type ChordType = 'tonic' | 'dominant' | 'color'
export type LickStyle = 'folk' | 'blues' | 'melo' | 'finger'
export type NavTab = 'roue' | 'loop' | 'licks' | 'prof' | 'exos'

export interface ChordInfo {
  name: string
  degree: string
  type: ChordType
}

export interface ChordShape {
  strings: number[]
  label: string
  fingers?: string
}

export interface Lick {
  id: number
  title: string
  style: LickStyle
  key: string
  level: string
  description: string
  tab: string[]
  freqs: number[][]
}

export interface Exercise {
  id: number
  title: string
  level: string
  description: string
  steps: string[]
  actions: ExerciseAction[]
}

export interface ExerciseAction {
  label: string
  isPrimary: boolean
  prompt?: string
  playIndex?: number
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}