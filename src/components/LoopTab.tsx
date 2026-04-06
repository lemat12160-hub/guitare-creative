import React, { useState } from 'react'
import { FAMILIES, CHORD_SHAPES, KEY_NAMES } from '../data'
import type { Key } from '../data'
import { ChordDiagram } from './ChordDiagram'
import { ProfChat } from './ProfChat'
import { useAudio } from '../hooks/useAudio'

interface Props {
  currentKey: Key | null
  selectedChord: string | null
  progression: (string | null)[]
  onProgressionChange: (prog: (string | null)[]) => void
}

export const LoopTab: React.FC<Props> = ({
  currentKey,
  selectedChord,
  progression,
  onProgressionChange,
}) => {
  const { playProgression } = useAudio()
  const [showChat, setShowChat] = useState(false)
  const [chatPrompt, setChatPrompt] = useState('')
  const [playing, setPlaying] = useState(false)

  const filled = progression.filter(Boolean) as string[]

  const addToSlot = (idx: number) => {
    if (!selectedChord) return
    const next = [...progression]
    next[idx] = selectedChord
    onProgressionChange(next)
  }

  const removeSlot = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const next = [...progression]
    next[idx] = null
    onProgressionChange(next)
  }

  const handlePlay = () => {
    if (!filled.length) return
    setPlaying(true)
    playProgression(filled)
    setTimeout(() => setPlaying(false), filled.length * 1700 + 500)
  }

  const getChordInfo = (name: string) => {
    if (!currentKey) return null
    return FAMILIES[currentKey]?.find(c => c.name === name) || null
  }

  const slotClass = (ch: string | null) => {
    const base = 'flex-1 h-14 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all relative select-none'
    if (!ch) return `${base} border-dashed border-wood-mid bg-wood-lightest hover:border-wood-warm hover:bg-wood-light text-wood-warm`
    const info = getChordInfo(ch)
    if (info?.type === 'tonic') return `${base} border-sage bg-sage-light text-sage-dark`
    if (info?.type === 'dominant') return `${base} border-peach bg-peach-light text-peach-dark`
    return `${base} border-dusty bg-dusty-light text-dusty-dark`
  }

  return (
    <div className="space-y-3">
      <div className="bg-wood-light border border-wood-mid rounded-xl p-3 text-xs text-wood-dark leading-relaxed">
        <div className="font-medium text-wood-deep mb-1 uppercase tracking-wide text-[10px]">Comment utiliser</div>
        Sélectionne une tonalité dans <span className="font-medium">Roue</span>, appuie sur un accord, puis ajoute-le aux slots pour construire ta progression.
      </div>

      <div className="card">
        <div className="card-title">
          Ta progression · <span className="text-wood-deep">
            {currentKey ? KEY_NAMES[currentKey] : 'choisir une tonalité'}
          </span>
        </div>
        <div className="flex gap-2 mb-3">
          {[0,1,2,3].map(i => (
            <div key={i} className={slotClass(progression[i])} onClick={() => addToSlot(i)}>
              {progression[i] ? (
                <>
                  <span className="text-base font-medium">{progression[i]}</span>
                  <span className="text-[9px] opacity-70">{getChordInfo(progression[i]!)?.degree || ''}</span>
                  <button
                    className="absolute top-1 right-1.5 text-[10px] opacity-40 hover:opacity-80"
                    onClick={e => removeSlot(i, e)}
                  >✕</button>
                </>
              ) : (
                <span className="text-2xl text-wood-mid">+</span>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handlePlay}
          disabled={!filled.length || playing}
          className={`w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
            filled.length
              ? 'bg-wood-deep text-white hover:bg-wood-dark'
              : 'bg-wood-light text-wood-warm cursor-not-allowed'
          }`}
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M5 3l14 9-14 9V3z"/>
          </svg>
          {playing ? 'En lecture...' : 'Écouter ma progression'}
        </button>
      </div>

      {filled.length >= 2 && currentKey && (
        <div className="card">
          <div className="card-title">Analyse harmonique</div>
          <div className="space-y-1 mb-3">
            {filled.map((ch, i) => {
              const info = getChordInfo(ch)
              const colorClass = info?.type === 'tonic' ? 'text-sage-dark' : info?.type === 'dominant' ? 'text-peach-dark' : 'text-dusty-dark'
              const role = info?.type === 'tonic' ? 'Repos · tonique' : info?.type === 'dominant' ? 'Tension · dominante' : `Couleur · ${info?.degree || ''}`
              return (
                <div key={i} className="flex justify-between items-center py-1.5 border-b border-wood-light last:border-0 text-sm">
                  <span className="font-medium text-wood-dark">{ch}</span>
                  <span className={`text-xs font-medium ${colorClass}`}>{role}</span>
                </div>
              )
            })}
          </div>
          <div className="bg-peach-light border-l-2 border-peach rounded-lg p-2.5 text-xs text-peach-dark mb-3">
            Astuce : improvise avec la gamme pentatonique de {currentKey} sur cette progression.
          </div>
          <button
            onClick={() => {
              setChatPrompt(`Je joue ${filled.join(' → ')} en ${currentKey ? KEY_NAMES[currentKey] : '?'}. Explique pourquoi ces accords fonctionnent ensemble, leurs degrés, et comment improviser dessus avec ma RC-5.`)
              setShowChat(true)
            }}
            className="ask-btn"
          >
            Demander une explication au prof →
          </button>
        </div>
      )}

      {filled.length >= 1 && (
        <div className="card">
          <div className="card-title">Positions visuelles</div>
          <div className="flex flex-wrap gap-3">
            {filled.map(ch => {
              const shape = CHORD_SHAPES[ch]
              if (!shape) return null
              const info = getChordInfo(ch)
              return (
                <ChordDiagram
                  key={ch}
                  name={ch}
                  shape={shape}
                  degree={info?.degree}
                  role={info?.type === 'tonic' ? 'Tonique' : info?.type === 'dominant' ? 'Dominante' : 'Couleur'}
                />
              )
            })}
          </div>
        </div>
      )}

      {showChat && (
        <ProfChat initialPrompt={chatPrompt} onClose={() => setShowChat(false)} />
      )}
    </div>
  )
}