import React, { useState } from 'react'
import { LICKS } from '../data'
import type { LickStyle } from '../types'
import { ProfChat } from './ProfChat'
import { useAudio } from '../hooks/useAudio'

export const LicksTab: React.FC = () => {
  const { playNoteSequence } = useAudio()
  const [filter, setFilter] = useState<LickStyle | 'all'>('all')
  const [showChat, setShowChat] = useState(false)
  const [chatPrompt, setChatPrompt] = useState('')

  const filtered = filter === 'all' ? LICKS : LICKS.filter(l => l.style === filter)

  const filters: { key: LickStyle | 'all'; label: string }[] = [
    { key: 'all', label: 'Tous' },
    { key: 'folk', label: 'Folk' },
    { key: 'blues', label: 'Blues' },
    { key: 'melo', label: 'Mélo' },
    { key: 'finger', label: 'Fingerpicking' },
  ]

  const badgeClass = (style: LickStyle) => {
    if (style === 'folk') return 'bg-sage-light text-sage-dark'
    if (style === 'blues') return 'bg-peach-light text-peach-dark'
    if (style === 'melo') return 'bg-dusty-light text-dusty-dark'
    return 'bg-wood-light text-wood-dark'
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
              filter === f.key
                ? 'bg-wood-deep text-white border-wood-dark'
                : 'bg-wood-lightest border-wood-mid text-wood-dark hover:bg-wood-light'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.map(lick => (
        <div key={lick.id} className="card">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-medium text-wood-darkest">{lick.title}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${badgeClass(lick.style)}`}>
              {lick.style}
            </span>
          </div>
          <div className="text-xs text-wood-deep mb-3 leading-relaxed">
            {lick.description} · Tonalité : {lick.key} · {lick.level}
          </div>
          <div className="bg-wood-lightest rounded-lg p-3 border border-wood-mid mb-3 overflow-x-auto">
            {lick.tab.map((line, i) => (
              <div key={i} className="font-mono text-[11px] text-wood-darkest leading-6 whitespace-pre">
                {line}
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => playNoteSequence(lick.freqs)}
              className="px-3 py-1.5 rounded-lg border border-wood-mid bg-wood-lightest text-wood-dark text-xs font-medium hover:bg-wood-light transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M5 3l14 9-14 9V3z"/>
              </svg>
              Écouter
            </button>
            <button
              onClick={() => {
                setChatPrompt(`Explique-moi le lick "${lick.title}" en ${lick.key}. Comment l'intégrer dans mon jeu acoustique ? Conseils pour le travailler progressivement.`)
                setShowChat(true)
              }}
              className="px-3 py-1.5 rounded-lg border border-sage bg-sage-light text-sage-dark text-xs font-medium hover:bg-sage hover:text-white transition-colors"
            >
              Demander au prof →
            </button>
          </div>
        </div>
      ))}

      {showChat && (
        <ProfChat initialPrompt={chatPrompt} onClose={() => setShowChat(false)} />
      )}
    </div>
  )
}