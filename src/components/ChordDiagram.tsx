import React from 'react'
import type { ChordShape } from '../types'

interface Props {
  name: string
  shape: ChordShape
  degree?: string
  role?: string
}

export const ChordDiagram: React.FC<Props> = ({ name, shape, degree, role }) => {
  const nutY = 20
  const sx = 10
  const sy = 11
  const fh = 13

  return (
    <div className="flex flex-col items-center bg-wood-lightest border border-wood-mid rounded-xl p-3 min-w-[80px]">
      <div className="text-sm font-medium text-wood-darkest mb-1">{name}</div>
      {degree && (
        <div className="text-[10px] text-wood-deep mb-1">
          {degree}{role ? ` · ${role}` : ''}
        </div>
      )}
      <svg width={72} height={92} viewBox="0 0 72 92">
        {[0,1,2,3,4].map(f => (
          <line
            key={f}
            x1={sx} y1={nutY + f * fh}
            x2={sx + 5 * sy} y2={nutY + f * fh}
            stroke={f === 0 ? '#4A2E14' : '#C9A87C'}
            strokeWidth={f === 0 ? 2.5 : 0.7}
          />
        ))}
        {[0,1,2,3,4,5].map(s => (
          <line
            key={s}
            x1={sx + s * sy} y1={nutY}
            x2={sx + s * sy} y2={nutY + 4 * fh}
            stroke="#C9A87C"
            strokeWidth={0.7}
          />
        ))}
        {shape.strings.map((fret, i) => {
          const x = sx + i * sy
          if (fret === -1) return (
            <text key={i} x={x} y={14} textAnchor="middle" fontSize={9} fill="#A07850">×</text>
          )
          if (fret === 0) return (
            <circle key={i} cx={x} cy={12} r={4} fill="none" stroke="#A07850" strokeWidth={1} />
          )
          return (
            <circle key={i} cx={x} cy={nutY + fret * fh - fh / 2} r={5} fill="#A67C52" />
          )
        })}
        <text x={36} y={88} textAnchor="middle" fontSize={8} fill="#A07850">
          {shape.label}
        </text>
      </svg>
      {shape.fingers && (
        <div className="text-[9px] text-wood-deep font-mono mt-1">{shape.fingers}</div>
      )}
    </div>
  )
}
