import React, { useState } from 'react'
import { EXERCISES } from '../data'
import { ProfChat } from './ProfChat'
import { useAudio } from '../hooks/useAudio'

export const ExosTab: React.FC = () => {
  const { playExercise } = useAudio()
  const [openId, setOpenId] = useState<number | null>(0)
  const [doneIds, setDoneIds] = useState<Set<number>>(new Set())
  const [showChat, setShowChat] = useState(false)
  const [chatPrompt, setChatPrompt] = useState('')

  const markDone = (id: number) => {
    setDoneIds(prev => new Set([...prev, id]))
  }

  const ask = (prompt: string) => {
    setChatPrompt(prompt)
    setShowChat(true)
  }

  const current = EXERCISES.findIndex(e => !doneIds.has(e.id))

  return (
    <div className="space-y-3">
      <div className="bg-wood-lightest border border-wood-mid rounded-xl p-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          {EXERCISES.map((e, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                doneIds.has(e.id) ? 'bg-sage' :
                i === current ? 'bg-wood-deep' : 'bg-wood-mid'
              }`}
            />
          ))}
        </div>
        <div className="text-xs text-wood-dark">
          {doneIds.size === EXERCISES.length
            ? 'Tous les exercices complétés !'
            : `Exercice ${current + 1} / ${EXERCISES.length}`}
        </div>
      </div>

      {EXERCISES.map((exo, i) => (
        <div key={exo.id} className="bg-white border border-wood-mid rounded-2xl overflow-hidden">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-wood-lightest transition-colors text-left"
            onClick={() => setOpenId(openId === exo.id ? null : exo.id)}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
              doneIds.has(exo.id)
                ? 'bg-sage text-white'
                : i === current
                ? 'bg-wood-deep text-white'
                : 'bg-wood-light text-wood-dark'
            }`}>
              {doneIds.has(exo.id) ? '✓' : i + 1}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-wood-darkest">{exo.title}</div>
              <div className="text-[10px] text-wood-deep mt-0.5">{exo.level}</div>
            </div>
            <div className="text-wood-warm text-sm">
              {openId === exo.id ? '▴' : '▾'}
            </div>
          </button>

          {openId === exo.id && (
            <div className="px-4 pb-4 border-t border-wood-light">
              <p className="text-sm text-wood-dark leading-relaxed mt-3 mb-3">
                {exo.description}
              </p>
              <ul className="space-y-2 mb-4">
                {exo.steps.map((step, si) => (
                  <li key={si} className="flex gap-2 text-sm text-wood-darkest">
                    <span className="text-wood-warm mt-0.5 flex-shrink-0">→</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 flex-wrap">
                {exo.actions.map((action, ai) => (
                  <button
                    key={ai}
                    onClick={() => {
                      if (action.isPrimary && action.playIndex !== undefined) {
                        playExercise(action.playIndex)
                      } else if (action.prompt) {
                        ask(action.prompt)
                      }
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      action.isPrimary
                        ? 'bg-wood-deep text-white hover:bg-wood-dark flex items-center gap-1'
                        : 'bg-sage-light text-sage-dark border border-sage hover:bg-sage hover:text-white'
                    }`}
                  >
                    {action.isPrimary && (
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M5 3l14 9-14 9V3z"/>
                      </svg>
                    )}
                    {action.label}
                  </button>
                ))}
                {!doneIds.has(exo.id) && (
                  <button
                    onClick={() => markDone(exo.id)}
                    className="px-3 py-2 rounded-lg text-xs font-medium bg-wood-lightest border border-wood-mid text-wood-dark hover:bg-wood-light transition-colors"
                  >
                    Marquer comme fait ✓
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {showChat && (
        <ProfChat initialPrompt={chatPrompt} onClose={() => setShowChat(false)} />
      )}
    </div>
  )
}