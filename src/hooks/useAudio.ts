import { useCallback, useRef } from 'react'
import { CHORD_FREQS } from '../data'

export function useAudio() {
  const ctxRef = useRef<AudioContext | null>(null)

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return ctxRef.current
  }

  const pluckString = (ctx: AudioContext, freq: number, startTime: number, duration = 1.8) => {
    // Karplus-Strong inspired guitar string simulation
    const bufferSize = Math.round(ctx.sampleRate / freq)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    // Fill with noise burst (initial pluck)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    // Source node
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    // Body resonance filter (acoustic guitar body)
    const bodyFilter = ctx.createBiquadFilter()
    bodyFilter.type = 'peaking'
    bodyFilter.frequency.value = 200
    bodyFilter.gain.value = 6
    bodyFilter.Q.value = 0.8

    // Brightness filter (string brightness)
    const brightFilter = ctx.createBiquadFilter()
    brightFilter.type = 'highshelf'
    brightFilter.frequency.value = 3000
    brightFilter.gain.value = -8

    // Low cut (remove mud)
    const lowCut = ctx.createBiquadFilter()
    lowCut.type = 'highpass'
    lowCut.frequency.value = 80

    // String decay simulation
    const gainNode = ctx.createGain()
    gainNode.gain.setValueAtTime(0, startTime)
    gainNode.gain.linearRampToValueAtTime(0.18, startTime + 0.005)
    gainNode.gain.exponentialRampToValueAtTime(0.06, startTime + 0.3)
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration)

    // Subtle vibrato (string resonance)
    const vibrato = ctx.createOscillator()
    const vibratoGain = ctx.createGain()
    vibrato.frequency.value = 5.5
    vibratoGain.gain.value = freq * 0.003
    vibrato.connect(vibratoGain)

    // Connect chain
    source.connect(bodyFilter)
    bodyFilter.connect(brightFilter)
    brightFilter.connect(lowCut)
    lowCut.connect(gainNode)
    gainNode.connect(ctx.destination)

    source.start(startTime)
    source.stop(startTime + duration + 0.1)
    vibrato.start(startTime)
    vibrato.stop(startTime + duration + 0.1)
  }

  const playChord = useCallback((chordName: string, startTime: number, duration = 1.8) => {
    try {
      const ctx = getCtx()
      const freqs = CHORD_FREQS[chordName] ||
        CHORD_FREQS[chordName.replace('m', '')] ||
        [261.6, 329.6, 392.0]

      // Strum effect — each string slightly delayed like a real strum
      freqs.forEach((freq, i) => {
        const strumDelay = i * 0.028
        pluckString(ctx, freq, startTime + strumDelay, duration)
      })
    } catch (e) {
      console.warn('Audio error:', e)
    }
  }, [])

  const playProgression = useCallback((chords: string[]) => {
    if (!chords.length) return
    try {
      const ctx = getCtx()
      let t = ctx.currentTime + 0.1
      chords.forEach(chord => {
        playChord(chord, t, 1.8)
        t += 2.0
      })
    } catch (e) {
      console.warn('Audio error:', e)
    }
  }, [playChord])

  const playNoteSequence = useCallback((freqGroups: number[][]) => {
    try {
      const ctx = getCtx()
      let t = ctx.currentTime + 0.1
      freqGroups.forEach(group => {
        group.forEach((freq, i) => {
          if (!freq) return
          pluckString(ctx, freq, t + i * 0.22, 0.9)
        })
        t += 0.75
      })
    } catch (e) {
      console.warn('Audio error:', e)
    }
  }, [])

  const playExercise = useCallback((index: number) => {
    const progressions = [
      ['C', 'G', 'C'],
      ['C', 'F', 'G', 'C'],
      ['C', 'Am', 'F', 'G'],
      ['C', 'F', 'G', 'C'],
    ]
    const chords = progressions[index % progressions.length]
    playProgression(chords)
  }, [playProgression])

  return { playChord, playProgression, playNoteSequence, playExercise }
}