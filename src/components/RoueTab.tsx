import React, { useState } from 'react'
import { KEYS, KEY_NAMES, FAMILIES, CHORD_SHAPES, CHORD_EXPLAIN } from '../data'
import type { Key } from '../data'
import type { ChordInfo } from '../types'
import { ChordDiagram } from './ChordDiagram'
import { ProfChat } from './ProfChat'

interface Props {
  currentKey: Key | null
  onKeyChange: (key: Key) => void
  onChordSelect: (chord: string) => void
}

export const RoueTab: React.FC<Props> = ({ currentKey, onKeyChange, onChordSelect }) => {
  const [selectedChord, setSelectedChord] = useState<ChordInfo | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [chatPrompt, setChatPrompt] = useState('')

  const handleChord = (ch: ChordInfo) => {
    setSelectedChord(ch)
    onChordSelect(ch.name)
    setShowChat(false)
  }

  const getExplain = (ch: ChordInfo) => {
    if (ch.type === 'tonic') return CHORD_EXPLAIN.tonic
    if (ch.type === 'dominant') return CHORD_EXPLAIN.dominant
    return CHORD_EXPLAIN[ch.degree] || CHORD_EXPLAIN.vi
  }

  const chipClass = (ch: ChordInfo, selected: boolean) => {
    const base = 'flex flex-col items-center px-3 py-2 rounded-xl border cursor-pointer transition-all select-none text-center'
    if (selected) {
      if (ch.type === 'tonic') return `${base} bg-sage border-sage-dark text-white`
      if (ch.type === 'dominant') return `${base} bg-peach border-peach-dark text-white`
      return `${base} bg-dusty border-dusty-dark text-white`
    }
    if (ch.type === 'tonic') return `${base} bg-sage-light border-sage text-wood-darkest hover:bg-sage hover:text-white`
    if (ch.type === 'dominant') return `${base} bg-peach-light border-peach text-wood-darkest hover:bg-peach hover:text-white`
    return `${base} bg-wood-lightest border-wood-mid text-wood-darkest hover:bg-wood-light`
  }

  return (
    <div className="space-y-3">
      <div className="card">
        <div className="card-title">Choisis ta tonalité</div>
        <div className="grid grid-cols-4 gap-2">
          {KEYS.map(k => (
            <button
              key={k}
              onClick={() => { onKeyChange(k); setSelectedChord(null); setShowChat(false) }}
              className={`py-3 rounded-xl border font-medium transition-all ${
                currentKey === k
                  ? 'bg-wood-deep text-white border-wood-dark'
                  : 'bg-wood-lightest border-wood-mid text-wood-darkest hover:bg-wood-light'
              }`}
            >
              <div className="text-base">{k}</div>
              <div className={`text-[9px] mt-0.5 ${currentKey === k ? 'text-white/70' : 'text-wood-deep'}`}>
                majeur
              </div>
            </button>
          ))}
        </div>
      </div>

      {currentKey && (
        <div className="card">
          <div className="card-title">
            Famille d'accords · <span className="text-wood-deep">{KEY_NAMES[currentKey]}</span>
          </div>
          <div className="flex gap-3 flex-wrap mb-3">
            <div className="flex items-center gap-1 text-xs text-wood-deep">
              <div className="w-2 h-2 rounded-full bg-sage" />Tonique
            </div>
            <div className="flex items-center gap-1 text-xs text-wood-deep">
              <div className="w-2 h-2 rounded-full bg-peach" />Dominante
            </div>
            <div className="flex items-center gap-1 text-xs text-wood-deep">
              <div className="w-2 h-2 rounded-full bg-dusty" />Couleur
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {FAMILIES[currentKey].map(ch => (
              <button
                key={ch.name}
                onClick={() => handleChord(ch)}
                className={chipClass(ch, selectedChord?.name === ch.name)}
              >
                <span className="text-sm font-medium">{ch.name}</span>
                <span className="text-[9px] opacity-70">{ch.degree}</span>
              </button>
            ))}
          </div>
          <div className="text-[11px] text-wood-warm mt-2">
            Appuie sur un accord pour voir sa position sur le manche
          </div>
        </div>
      )}

      {selectedChord && (
        <>
          <div className="card">
            <div className="card-title">Position sur le manche</div>
            <div className="flex flex-wrap gap-3">
              {CHORD_SHAPES[selectedChord.name] ? (
                <ChordDiagram
                  name={selectedChord.name}
                  shape={CHORD_SHAPES[selectedChord.name]}
                  degree={selectedChord.degree}
                  role={
                    selectedChord.type === 'tonic' ? 'Tonique' :
                    selectedChord.type === 'dominant' ? 'Dominante' : 'Couleur'
                  }
                />
              ) : (
                <div className="text-sm text-wood-deep py-2">
                  Diagramme bientôt disponible pour {selectedChord.name}
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Comprendre cet accord</div>
            <p className="text-sm text-wood-darkest leading-relaxed">
              {getExplain(selectedChord)}
            </p>
            <button
              onClick={() => {
                setChatPrompt(`Explique-moi le rôle de l'accord ${selectedChord.name} (degré ${selectedChord.degree}) en ${currentKey}. Donne des exemples de chansons acoustiques qui l'utilisent.`)
                setShowChat(true)
              }}
              className="ask-btn mt-3"
            >
              Demander plus au prof →
            </button>
          </div>
        </>
      )}

      {showChat && (
        <ProfChat
          initialPrompt={chatPrompt}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  )
}