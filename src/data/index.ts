import type { ChordInfo, ChordShape, Lick, Exercise } from '../types'

export const KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F', 'Bb'] as const
export type Key = typeof KEYS[number]

export const KEY_NAMES: Record<Key, string> = {
  C: 'C majeur', G: 'G majeur', D: 'D majeur', A: 'A majeur',
  E: 'E majeur', B: 'B majeur', F: 'F majeur', Bb: 'Bb majeur',
}

export const FAMILIES: Record<Key, ChordInfo[]> = {
  C:  [{name:'C',degree:'I',type:'tonic'},{name:'Dm',degree:'ii',type:'color'},{name:'Em',degree:'iii',type:'color'},{name:'F',degree:'IV',type:'color'},{name:'G',degree:'V',type:'dominant'},{name:'Am',degree:'vi',type:'color'},{name:'Bdim',degree:'vii°',type:'color'}],
  G:  [{name:'G',degree:'I',type:'tonic'},{name:'Am',degree:'ii',type:'color'},{name:'Bm',degree:'iii',type:'color'},{name:'C',degree:'IV',type:'color'},{name:'D',degree:'V',type:'dominant'},{name:'Em',degree:'vi',type:'color'},{name:'F#dim',degree:'vii°',type:'color'}],
  D:  [{name:'D',degree:'I',type:'tonic'},{name:'Em',degree:'ii',type:'color'},{name:'F#m',degree:'iii',type:'color'},{name:'G',degree:'IV',type:'color'},{name:'A',degree:'V',type:'dominant'},{name:'Bm',degree:'vi',type:'color'},{name:'C#dim',degree:'vii°',type:'color'}],
  A:  [{name:'A',degree:'I',type:'tonic'},{name:'Bm',degree:'ii',type:'color'},{name:'C#m',degree:'iii',type:'color'},{name:'D',degree:'IV',type:'color'},{name:'E',degree:'V',type:'dominant'},{name:'F#m',degree:'vi',type:'color'},{name:'G#dim',degree:'vii°',type:'color'}],
  E:  [{name:'E',degree:'I',type:'tonic'},{name:'F#m',degree:'ii',type:'color'},{name:'G#m',degree:'iii',type:'color'},{name:'A',degree:'IV',type:'color'},{name:'B',degree:'V',type:'dominant'},{name:'C#m',degree:'vi',type:'color'},{name:'D#dim',degree:'vii°',type:'color'}],
  B:  [{name:'B',degree:'I',type:'tonic'},{name:'C#m',degree:'ii',type:'color'},{name:'D#m',degree:'iii',type:'color'},{name:'E',degree:'IV',type:'color'},{name:'F#',degree:'V',type:'dominant'},{name:'G#m',degree:'vi',type:'color'},{name:'A#dim',degree:'vii°',type:'color'}],
  F:  [{name:'F',degree:'I',type:'tonic'},{name:'Gm',degree:'ii',type:'color'},{name:'Am',degree:'iii',type:'color'},{name:'Bb',degree:'IV',type:'color'},{name:'C',degree:'V',type:'dominant'},{name:'Dm',degree:'vi',type:'color'},{name:'Edim',degree:'vii°',type:'color'}],
  Bb: [{name:'Bb',degree:'I',type:'tonic'},{name:'Cm',degree:'ii',type:'color'},{name:'Dm',degree:'iii',type:'color'},{name:'Eb',degree:'IV',type:'color'},{name:'F',degree:'V',type:'dominant'},{name:'Gm',degree:'vi',type:'color'},{name:'Adim',degree:'vii°',type:'color'}],
}

export const CHORD_SHAPES: Record<string, ChordShape> = {
  C:    { strings:[0,3,2,0,1,0], label:'Accord ouvert', fingers:'x32010' },
  G:    { strings:[3,2,0,0,0,3], label:'Accord ouvert', fingers:'320003' },
  D:    { strings:[-1,-1,0,2,3,2], label:'Accord ouvert', fingers:'xx0232' },
  A:    { strings:[0,0,2,2,2,0], label:'Accord ouvert', fingers:'x02220' },
  E:    { strings:[0,2,2,1,0,0], label:'Accord ouvert', fingers:'022100' },
  F:    { strings:[1,1,2,3,3,1], label:'Barré case 1', fingers:'133211' },
  Bb:   { strings:[-1,1,3,3,3,1], label:'Barré case 1', fingers:'x13331' },
  Am:   { strings:[0,0,2,2,1,0], label:'Accord ouvert', fingers:'x02210' },
  Em:   { strings:[0,2,2,0,0,0], label:'Accord ouvert', fingers:'022000' },
  Dm:   { strings:[-1,-1,0,2,3,1], label:'Accord ouvert', fingers:'xx0231' },
  Bm:   { strings:[-1,2,4,4,3,2], label:'Barré case 2', fingers:'x24432' },
  Gm:   { strings:[3,1,0,0,3,3], label:'Position ouverte', fingers:'310033' },
  'F#m':{ strings:[2,2,4,4,3,2], label:'Barré case 2', fingers:'244222' },
}

export const CHORD_FREQS: Record<string, number[]> = {
  C:  [261.6, 329.6, 392.0, 523.2],
  G:  [196.0, 246.9, 293.7, 392.0],
  D:  [146.8, 185.0, 220.0, 293.7],
  A:  [110.0, 138.6, 164.8, 220.0],
  E:  [82.4,  103.8, 123.5, 164.8],
  F:  [174.6, 220.0, 261.6, 349.2],
  Bb: [116.5, 146.8, 174.6, 233.1],
  Am: [110.0, 130.8, 164.8, 220.0],
  Em: [82.4,  98.0,  123.5, 164.8],
  Dm: [146.8, 174.6, 220.0, 293.7],
  Bm: [123.5, 146.8, 185.0, 246.9],
  Gm: [98.0,  116.5, 146.8, 196.0],
}

export const CHORD_EXPLAIN: Record<string, string> = {
  tonic:    "C'est la TONIQUE (degré I) — ta maison. Quand tu reviens à cet accord, la musique se pose et on respire. C'est le point de repos et de résolution de toute ta progression.",
  dominant: "C'est la DOMINANTE (degré V) — le moteur de l'harmonie. Elle crée une tension forte qui veut absolument retourner à la tonique. C'est ce frisson qu'on ressent juste avant la résolution.",
  ii:       "Degré ii — accord mineur de sous-tension. Légèrement mélancolique. Souvent placé avant la dominante pour créer une montée de tension progressive (ii → V → I).",
  iii:      "Degré iii — accord mineur de couleur. Crée une transition douce entre I et IV.",
  IV:       "La SOUS-DOMINANTE (degré IV) — avec la tonique et la dominante, c'est le trio de base. Elle donne du mouvement et de l'ouverture.",
  vi:       "Le RELATIF MINEUR (degré vi) — apporte une couleur mélancolique et émotionnelle tout en restant dans la tonalité.",
  'vii°':   "Accord diminué (degré vii°) — très instable, crée une tension extrême. À utiliser avec parcimonie.",
}

export const LICKS: Lick[] = [
  {
    id: 0,
    title: 'Lick pentatonique folk',
    style: 'folk',
    key: 'G',
    level: 'Intermédiaire',
    description: 'Phrase descendante en pentatonique de G. Sonne parfaitement sur I-IV-V.',
    tab: ['e|--3--2--0-----------0-|','B|----------3--1--0-----|','G|----------------------|','D|----------------------|','A|----------------------|','E|----------------------|'],
    freqs: [[392,349,329],[330,294,262],[392,0,0]],
  },
  {
    id: 1,
    title: 'Lick blues shuffle',
    style: 'blues',
    key: 'A',
    level: 'Intermédiaire',
    description: 'Riff blues classique sur dominante. Double corde + slides.',
    tab: ['e|----------------------|','B|----------------------|','G|--2--4--2-------------|','D|--0--2--0--2--0-------|','A|----------0-----------|','E|----------------------|'],
    freqs: [[220,277,330],[247,311,0],[220,277,330]],
  },
  {
    id: 2,
    title: 'Phrase mélodique Goldman',
    style: 'melo',
    key: 'C',
    level: 'Débutant',
    description: 'Ligne descendante émotionnelle style variété française. Sur vi-IV-I.',
    tab: ['e|--0--3--2--0----------|','B|--1----------3--1-----|','G|--0-------------------|','D|----------------------|','A|--3-------------------|','E|----------------------|'],
    freqs: [[262,329,392],[247,311,370],[220,262,330]],
  },
  {
    id: 3,
    title: 'Fingerpicking Blackbird',
    style: 'finger',
    key: 'G',
    level: 'Avancé',
    description: 'Pattern hammer-on/pull-off inspiré du fingerpicking classique.',
    tab: ['e|--3h5p3--2--0---------|','B|----------3--1--0-----|','G|--------------------0-|','D|--0-------------------|','A|----------------------|','E|--3-------------------|'],
    freqs: [[392,494,392],[349,440,349],[330,415,330]],
  },
  {
    id: 4,
    title: 'Arpège Am — Jeux Interdits',
    style: 'finger',
    key: 'Am',
    level: 'Intermédiaire',
    description: 'Arpège classique en Am. Pattern p-i-m-a. La base du fingerpicking classique.',
    tab: ['e|--0-----------0-------|','B|-----1-----1----------|','G|--------2----------2--|','D|--2-------------------|','A|--0-------------------|','E|----------------------|'],
    freqs: [[220,262,330,392],[207,247,311,370],[196,233,294,349]],
  },
  {
    id: 5,
    title: 'Lick de liaison I→V',
    style: 'melo',
    key: 'G',
    level: 'Débutant',
    description: 'Petite phrase qui connecte élégamment I à V.',
    tab: ['e|--3--2--0-------------|','B|----------3--2--0-----|','G|--------------------2-|','D|----------------------|','A|----------------------|','E|--3-------------------|'],
    freqs: [[392,349,329],[370,330,311],[349,311,294]],
  },
]

export const EXERCISES: Exercise[] = [
  {
    id: 0,
    title: 'Reconnaître la tonique et la dominante',
    level: 'Niveau 1 — Fondation',
    description: "C'est le premier pas. La tonique est ta maison, la dominante est le voyage qui veut y revenir.",
    steps: [
      'Joue C (tonique) pendant 4 temps. Remarque le sentiment de repos.',
      'Joue G (dominante) pendant 4 temps. Sens la tension, le manque.',
      'Reviens à C. Remarque la résolution, le soulagement.',
      'Répète 5 fois en conscientisant ce que tu ressens.',
    ],
    actions: [
      { label: 'Écouter C → G → C', isPrimary: true, playIndex: 0 },
      { label: 'Explication du prof ↗', isPrimary: false, prompt: 'Explique-moi en détail la relation tonique-dominante en C majeur pour guitare.' },
    ],
  },
  {
    id: 1,
    title: 'La progression I-IV-V',
    level: 'Niveau 2 — Fondation',
    description: 'C → F → G → C. La base de milliers de chansons.',
    steps: [
      'Joue : C → F → G → C (4 temps chacun)',
      'Écoute comment F donne du mouvement, G crée la tension, C résout.',
      'Essaie en G majeur : G → C → D → G',
      'Reconnais cette progression dans une chanson que tu connais.',
    ],
    actions: [
      { label: 'Écouter la progression', isPrimary: true, playIndex: 1 },
      { label: 'Voir en G aussi ↗', isPrimary: false, prompt: 'Montre-moi la progression I-IV-V en G avec tablatures et exemples de chansons.' },
    ],
  },
  {
    id: 2,
    title: 'Construire ta première loop complète',
    level: 'Niveau 3 — Application RC-5',
    description: "C → Am → F → G. La loop magique. Enregistre-la sur ta RC-5.",
    steps: [
      'Dans Roue, sélectionne C majeur',
      'Ajoute C → Am → F → G dans le Loop Builder',
      'Écoute et analyse : I → vi → IV → V',
      'Enregistre sur ta RC-5 et improvise dessus.',
    ],
    actions: [
      { label: 'Pourquoi ça marche ↗', isPrimary: false, prompt: 'Explique-moi pourquoi la progression C-Am-F-G est si universelle. Cite des chansons connues.' },
    ],
  },
  {
    id: 3,
    title: 'Improviser avec 5 notes',
    level: 'Niveau 4 — Improvisation',
    description: "Sur C-Am-F-G, improvise avec C, E, G, A, D. La pentatonique de C — tout sonne juste.",
    steps: [
      'Lance ta loop C-Am-F-G sur la RC-5',
      'Joue uniquement aux cases 0, 2, 3 sur les cordes e et B',
      'Expérimente : long, court, haut, bas, silence.',
      'Tout sonne bien — c\'est la magie de la pentatonique.',
    ],
    actions: [
      { label: 'Voir la gamme pentatonique ↗', isPrimary: false, prompt: 'Montre-moi la gamme pentatonique de C en tablature complète sur tout le manche.' },
    ],
  },
  {
    id: 4,
    title: 'Créer de la tension et la résoudre',
    level: 'Niveau 5 — Expression',
    description: "Va vers la dominante, attends, puis résous. C'est comme raconter une histoire.",
    steps: [
      'Sur ta loop, joue tranquille sur C et Am',
      'Sur G, monte dans les aigus, joue plus dense.',
      'Quand C revient, note longue, puis silence.',
      'Tu viens de raconter une histoire musicale.',
    ],
    actions: [
      { label: 'Techniques de tension ↗', isPrimary: false, prompt: 'Donne-moi des techniques pour créer de la tension et résolution en improvisation guitare acoustique.' },
    ],
  },
  {
    id: 5,
    title: 'Moduler entre deux tonalités',
    level: 'Niveau 6 — Avancé',
    description: "Passer de G à C via un accord pivot. Elles partagent 6 accords sur 7.",
    steps: [
      'Joue en G : G → Em → C → D',
      'Sur l\'accord C, bascule vers C majeur.',
      'Continue : C → Am → F → G',
      'C est ton accord pivot — il appartient aux deux tonalités.',
    ],
    actions: [
      { label: 'Comprendre les modulations ↗', isPrimary: false, prompt: 'Explique-moi comment moduler entre G et C avec un accord pivot sur guitare acoustique.' },
    ],
  },
]

export const QUINTE_CIRCLE = ['C','G','D','A','E','B','F#','Db','Ab','Eb','Bb','F']