import React, { useState } from 'react'
import type { NavTab } from './types'
import type { Key } from './data'
import { RoueTab } from './components/RoueTab'
import { LoopTab } from './components/LoopTab'
import { LicksTab } from './components/LicksTab'
import { ProfTab } from './components/ProfTab'
import { ExosTab } from './components/ExosTab'

const NAV: { id: NavTab; label: string; icon: string }[] = [
  { id: 'roue', label: 'Roue', icon: '🎡' },
  { id: 'loop', label: 'Loop', icon: '🔁' },
  { id: 'licks', label: 'Licks', icon: '🎸' },
  { id: 'prof', label: 'Prof', icon: '📖' },
  { id: 'exos', label: 'Exercices', icon: '🎯' },
]

export default function App() {
  const [tab, setTab] = useState<NavTab>('roue')
  const [currentKey, setCurrentKey] = useState<Key | null>(null)
  const [selectedChord, setSelectedChord] = useState<string | null>(null)
  const [progression, setProgression] = useState<(string | null)[]>([null, null, null, null])

  return (
    <div className="min-h-screen bg-wood-lightest">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div
          className="relative overflow-hidden px-5 pt-5 pb-4"
          style={{ background: 'linear-gradient(135deg, #4A2E14 0%, #7A5230 50%, #A67C52 100%)' }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 12px, white 12px, white 13px)',
            }}
          />
          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
              <svg className="w-6 h-6 stroke-white fill-none" strokeWidth={1.5} viewBox="0 0 24 24" strokeLinecap="round">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </div>
            <div>
              <div className="text-lg font-medium text-white">Guitare Créative</div>
              <div className="text-xs text-white/60">Ton compagnon de composition</div>
            </div>
          </div>
          <div className="relative flex gap-2 flex-wrap">
            {['Cercle des quintes', 'Loop builder', 'Licks + Tabs', 'Prof IA'].map(b => (
              <span key={b} className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/20">
                {b}
              </span>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-wood-warm via-wood-mid to-wood-warm opacity-60" />
        </div>

        {/* Nav */}
        <div className="flex bg-white border-b border-wood-mid sticky top-0 z-10">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 text-[10px] font-medium transition-all border-b-2 ${
                tab === n.id
                  ? 'text-wood-dark border-wood-deep'
                  : 'text-wood-warm border-transparent hover:text-wood-dark'
              }`}
            >
              <span className="text-base">{n.icon}</span>
              {n.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 pb-8">
          {tab === 'roue' && (
            <RoueTab
              currentKey={currentKey}
              onKeyChange={k => { setCurrentKey(k); setSelectedChord(null) }}
              onChordSelect={setSelectedChord}
            />
          )}
          {tab === 'loop' && (
            <LoopTab
              currentKey={currentKey}
              selectedChord={selectedChord}
              progression={progression}
              onProgressionChange={setProgression}
            />
          )}
          {tab === 'licks' && <LicksTab />}
          {tab === 'prof' && <ProfTab currentKey={currentKey} />}
          {tab === 'exos' && <ExosTab />}
        </div>

      </div>
    </div>
  )
}