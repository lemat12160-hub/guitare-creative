import React, { useState } from 'react'
import { QUINTE_CIRCLE } from '../data'
import type { Key } from '../data'
import { ProfChat } from './ProfChat'

interface Props {
  currentKey: Key | null
}

export const ProfTab: React.FC<Props> = ({ currentKey }) => {
  const [showChat, setShowChat] = useState(false)
  const [chatPrompt, setChatPrompt] = useState('')

  const ask = (prompt: string) => {
    setChatPrompt(prompt)
    setShowChat(true)
  }

  const pillars = [
    { label: 'I — Tonique', val: 'Repos · maison', color: 'text-sage-dark' },
    { label: 'IV — Sous-dominante', val: 'Mouvement · ouverture', color: 'text-dusty-dark' },
    { label: 'V — Dominante', val: 'Tension · veut revenir', color: 'text-peach-dark' },
    { label: 'vi — Relatif mineur', val: 'Mélancolie · profondeur', color: 'text-dusty-dark' },
  ]

  const concepts = [
    { label: 'Accord mineur = couleur mélancolique', prompt: 'Pourquoi les accords mineurs sonnent-ils mélancoliques sur guitare ?' },
    { label: 'ii-V-I = cadence universelle', prompt: 'Explique-moi la cadence ii-V-I et comment l\'utiliser sur guitare acoustique.' },
    { label: 'Sus2 / Sus4 = couleur ouverte', prompt: 'Explique-moi les accords sus2 et sus4 avec des exemples en tablature.' },
    { label: 'Capo = transposition facile', prompt: 'Explique-moi comment utiliser le capo pour transposer et explorer différentes tonalités.' },
    { label: 'Pentatonique = improvisation sûre', prompt: 'Explique-moi la gamme pentatonique majeure et comment l\'utiliser pour improviser.' },
  ]

  return (
    <div className="space-y-3">
      <div className="flex gap-3 items-start">
        <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center flex-shrink-0 mt-1">
          <svg className="w-5 h-5 stroke-white fill-none" strokeWidth={1.5} viewBox="0 0 24 24">
            <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2zm0 12c-6 0-9 2.5-9 4v2h18v-2c0-1.5-3-4-9-4z"/>
          </svg>
        </div>
        <div className="bg-white border border-sage-light rounded-2xl rounded-tl-sm px-4 py-3 flex-1">
          <div className="text-[11px] font-medium text-sage-dark mb-1">Le Professeur</div>
          <div className="text-sm text-wood-darkest leading-relaxed">
            Bienvenue ! Je suis là pour transformer ton instinct en compréhension. Explore les accords dans "Roue", construis une loop, et je t'explique tout ce que tu joues.
          </div>
          <div className="bg-peach-light border-l-2 border-peach rounded-lg p-2.5 mt-3 text-xs text-peach-dark">
            Rappelle-toi : tu joues déjà bien. On met juste des mots sur ce que ton oreille sait déjà.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Les 4 piliers de l'harmonie</div>
        {pillars.map((p, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-wood-light last:border-0 text-sm">
            <span className="text-wood-dark">{p.label}</span>
            <span className={`text-xs font-medium ${p.color}`}>{p.val}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">Le cercle des quintes</div>
        <svg width="100%" viewBox="0 0 260 260" className="mb-3">
          {QUINTE_CIRCLE.map((k, i) => {
            const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
            const x = 130 + 95 * Math.cos(angle)
            const y = 130 + 95 * Math.sin(angle)
            const isActive = currentKey === k
            return (
              <g key={k}>
                <line x1={130} y1={130} x2={x} y2={y} stroke="#E2CBA8" strokeWidth={0.5} />
                <circle cx={x} cy={y} r={16} fill={isActive ? '#A67C52' : '#F2E8D8'} stroke="#C9A87C" strokeWidth={1} />
                <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontWeight={500} fill={isActive ? '#FDF8F2' : '#4A2E14'}>
                  {k}
                </text>
              </g>
            )
          })}
          <circle cx={130} cy={130} r={28} fill="#F2E8D8" stroke="#C9A87C" strokeWidth={1.5} />
          <text x={130} y={126} textAnchor="middle" fontSize={9} fill="#7A5230">Cercle</text>
          <text x={130} y={138} textAnchor="middle" fontSize={9} fill="#7A5230">des quintes</text>
        </svg>
        <button
          onClick={() => ask('Explique-moi le cercle des quintes de façon pratique pour guitare acoustique.')}
          className="ask-btn"
        >
          Comprendre le cercle des quintes →
        </button>
      </div>

      <div className="card">
        <div className="card-title">Concepts à explorer</div>
        {concepts.map((c, i) => (
          <button
            key={i}
            onClick={() => ask(c.prompt)}
            className="w-full flex justify-between items-center py-2.5 border-b border-wood-light last:border-0 text-sm text-left hover:text-wood-deep transition-colors"
          >
            <span className="text-wood-dark">{c.label}</span>
            <span className="text-wood-warm text-xs">→</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => ask('Donne-moi un plan de travail personnalisé pour progresser en guitare acoustique. Je joue déjà Never Going Back Again, Blackbird, Jeux Interdits. J\'utilise une RC-5. Je veux mieux comprendre l\'harmonie et composer mes propres loops.')}
        className="w-full py-3 rounded-xl bg-wood-deep text-white text-sm font-medium hover:bg-wood-dark transition-colors"
      >
        Créer mon plan de travail personnalisé →
      </button>

      {showChat && (
        <ProfChat initialPrompt={chatPrompt} onClose={() => setShowChat(false)} />
      )}
    </div>
  )
}