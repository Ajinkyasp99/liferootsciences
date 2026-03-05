import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── All unique types for particle shapes ──
const scientificData = [
  { type: 'dna' },
  { type: 'rna' },
  { type: 'mrna' },
  { type: 'trna' },
  { type: 'rrna' },
  { type: 'microrna' },
  { type: 'sirna' },
  { type: 'guiderna' },
  { type: 'nucleotide' },
  { type: 'nucleoside' },
  { type: 'adenine' },
  { type: 'thymine' },
  { type: 'guanine' },
  { type: 'cytosine' },
  { type: 'uracil' },
  { type: 'phosphate' },
  { type: 'deoxyribose' },
  { type: 'ribose' },
  { type: 'doublehelix' },
  { type: 'chromosome' },
  { type: 'chromatin' },
  { type: 'nucleosome' },
  { type: 'histone' },
  { type: 'chromatid' },
  { type: 'karyotype' },
  { type: 'nucleoid' },
  { type: 'gene' },
  { type: 'genome' },
  { type: 'exon' },
  { type: 'intron' },
  { type: 'promoter' },
  { type: 'enhancer' },
  { type: 'codon' },
  { type: 'anticodon' },
  { type: 'telomere' },
  { type: 'centromere' },
  { type: 'plasmid' },
  { type: 'operon' },
  { type: 'repfork' },
  { type: 'dnapoly' },
  { type: 'rnapoly' },
  { type: 'helicase' },
  { type: 'ligase' },
  { type: 'primase' },
  { type: 'topoisomerase' },
  { type: 'ribosome' },
  { type: 'protein' },
  { type: 'aminoacid' },
  { type: 'peptide' },
  { type: 'polypeptide' },
  { type: 'enzyme' },
  { type: 'transcription' },
  { type: 'translation' },
  { type: 'replication' },
  { type: 'mutation' },
  { type: 'epigenome' },
  { type: 'methylation' },
  { type: 'acetylation' },
  { type: 'crispr' },
  { type: 'cas9' },
  { type: 'proteome' },
  { type: 'transcriptome' },
  { type: 'metabolome' },
  { type: 'lipidome' },
]

// Unique color for every type
const typeColors = {
  dna: '#60a5fa', rna: '#a78bfa', mrna: '#c084fc', trna: '#e879f9',
  rrna: '#f0abfc', microrna: '#d946ef', sirna: '#a855f7', guiderna: '#8b5cf6',
  nucleotide: '#6366f1', nucleoside: '#818cf8', adenine: '#34d399', thymine: '#fbbf24',
  guanine: '#f87171', cytosine: '#38bdf8', uracil: '#fb923c', phosphate: '#facc15',
  deoxyribose: '#4ade80', ribose: '#2dd4bf', doublehelix: '#22d3ee', chromosome: '#a5b4fc',
  chromatin: '#fb923c', nucleosome: '#fdba74', histone: '#fcd34d', chromatid: '#c4b5fd',
  karyotype: '#e9d5ff', nucleoid: '#a7f3d0', gene: '#67e8f9', genome: '#5eead4',
  exon: '#86efac', intron: '#fca5a5', promoter: '#93c5fd', enhancer: '#f9a8d4',
  codon: '#fde68a', anticodon: '#bae6fd', telomere: '#6ee7b7', centromere: '#f472b6',
  plasmid: '#d8b4fe', operon: '#99f6e4', repfork: '#7dd3fc', dnapoly: '#a5f3fc',
  rnapoly: '#c7d2fe', helicase: '#fef08a', ligase: '#bef264', primase: '#d9f99d',
  topoisomerase: '#fda4af', ribosome: '#fdba74', protein: '#fbbf24', aminoacid: '#f0abfc',
  peptide: '#e9d5ff', polypeptide: '#fef9c3', enzyme: '#99f6e4', transcription: '#c084fc',
  translation: '#fb7185', replication: '#38bdf8', mutation: '#f87171', epigenome: '#a78bfa',
  methylation: '#34d399', acetylation: '#fbbf24', crispr: '#f59e0b', cas9: '#ef4444',
  proteome: '#8b5cf6', transcriptome: '#a78bfa', metabolome: '#14b8a6', lipidome: '#f472b6',
}

// ── Geometry helpers ──
const ring = (cx, cy, r, n, s) => {
  const p = []
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; p.push([cx + Math.cos(a) * r * s, cy + Math.sin(a) * r * s, 0]) }
  return p
}
const sphere = (cx, cy, cz, r, n, s) => {
  const p = []
  for (let i = 0; i < n; i++) { const th = Math.random() * Math.PI * 2; const ph = Math.acos(2 * Math.random() - 1); p.push([cx + r * s * Math.sin(ph) * Math.cos(th), cy + r * s * Math.sin(ph) * Math.sin(th), cz + r * s * Math.cos(ph)]) }
  return p
}
const line = (x1, y1, x2, y2, n, s) => {
  const p = []
  for (let i = 0; i < n; i++) { const t = i / (n - 1); p.push([x1 * s + (x2 - x1) * s * t, y1 * s + (y2 - y1) * s * t, 0]) }
  return p
}

// ── UNIQUE shape generator per type ──
function generateParticles(type, s = 1) {
  let p = []
  switch (type) {
    // ══ NUCLEIC ACIDS ══
    case 'dna': // Classic double helix with rungs
      for (let i = 0; i < 50; i++) { const t = i * 0.28, y = (i - 25) * 0.06 * s; p.push([Math.cos(t) * 0.35 * s, y, Math.sin(t) * 0.35 * s]); p.push([Math.cos(t + Math.PI) * 0.35 * s, y, Math.sin(t + Math.PI) * 0.35 * s]); if (i % 5 === 0) for (let k = 0; k < 3; k++) p.push([(k - 1) * 0.12 * s, y, 0]) }
      break
    case 'rna': // Single-strand helix
      for (let i = 0; i < 40; i++) { const t = i * 0.22; p.push([Math.cos(t) * 0.25 * s, (i - 20) * 0.07 * s, Math.sin(t) * 0.25 * s]) }
      break
    case 'mrna': // Long single strand with 5' cap ball and poly-A tail
      p.push(...sphere(-0.4 * s, 0.5 * s, 0, 0.08, 8, s / s)) // 5' cap
      for (let i = 0; i < 30; i++) { const t = i * 0.25; p.push([Math.cos(t) * 0.15 * s, (i - 15) * 0.08 * s, Math.sin(t) * 0.15 * s]) }
      for (let i = 0; i < 8; i++) p.push([0.05 * s * i, -1.3 * s + i * 0.03 * s, 0]) // poly-A tail
      break
    case 'trna': // Cloverleaf / L-shape with 3 loops + acceptor stem
      for (let i = 0; i < 8; i++) p.push([0, i * 0.08 * s, 0]) // acceptor stem
      p.push(...ring(0.25 * s, 0.15 * s, 0.12, 10, s)) // D-loop
      p.push(...ring(-0.25 * s, 0.15 * s, 0.12, 10, s)) // T-loop
      p.push(...ring(0, -0.3 * s, 0.15, 12, s)) // anticodon loop
      break
    case 'rrna': // Large folded rRNA with multiple domains
      for (let d = 0; d < 4; d++) { const cx = (d - 1.5) * 0.25 * s; for (let i = 0; i < 12; i++) { const t = i * 0.5; p.push([cx + Math.cos(t) * 0.15 * s, Math.sin(t) * 0.2 * s + d * 0.05 * s, Math.sin(t * 2) * 0.06 * s]) } }
      break
    case 'microrna': // Short hairpin loop
      for (let i = 0; i < 10; i++) p.push([0.04 * s, (i - 5) * 0.06 * s, 0])
      for (let i = 0; i < 10; i++) p.push([-0.04 * s, (i - 5) * 0.06 * s, 0])
      p.push(...ring(0, -0.35 * s, 0.08, 8, s))
      break
    case 'sirna': // Short double-stranded
      for (let i = 0; i < 12; i++) { const y = (i - 6) * 0.06 * s; p.push([0.06 * s, y, 0]); p.push([-0.06 * s, y, 0]); if (i % 2 === 0) p.push([0, y, 0]) }
      break
    case 'guiderna': // gRNA with scaffold loop + spacer strand
      for (let i = 0; i < 15; i++) p.push([i * 0.04 * s - 0.3 * s, 0, 0]) // spacer
      p.push(...ring(0.35 * s, 0.15 * s, 0.1, 10, s)) // scaffold loop 1
      p.push(...ring(0.35 * s, -0.15 * s, 0.08, 8, s)) // scaffold loop 2
      break

    // ══ NUCLEOTIDE COMPONENTS ══
    case 'nucleotide': // Phosphate + sugar pentagon + base hexagon
      p.push(...ring(-0.35 * s, 0, 0.08, 8, s)) // phosphate
      for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2 - Math.PI / 2; p.push([Math.cos(a) * 0.1 * s, Math.sin(a) * 0.1 * s, 0]) } // sugar
      p.push(...ring(0.3 * s, 0, 0.12, 6, s)) // base
      p.push(...line(-0.25, 0, -0.1, 0, 3, s)); p.push(...line(0.12, 0, 0.18, 0, 3, s))
      break
    case 'nucleoside': // Sugar pentagon + base hexagon only (no phosphate)
      for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2 - Math.PI / 2; p.push([Math.cos(a) * 0.12 * s, Math.sin(a) * 0.12 * s, 0]) }
      p.push(...ring(0.28 * s, 0, 0.13, 6, s))
      p.push(...line(0.12, 0, 0.15, 0, 3, s))
      break
    case 'adenine': // Purine: fused hexagon + pentagon
      p.push(...ring(-0.08 * s, 0, 0.16, 6, s))
      p.push(...ring(0.18 * s, 0, 0.12, 5, s))
      p.push([0.32 * s, 0.12 * s, 0]) // NH2 group
      break
    case 'guanine': // Purine variant with =O
      p.push(...ring(-0.08 * s, 0, 0.16, 6, s))
      p.push(...ring(0.18 * s, 0, 0.12, 5, s))
      p.push([-0.28 * s, 0.05 * s, 0], [-0.32 * s, 0.1 * s, 0]) // =O
      break
    case 'thymine': // Pyrimidine + CH3 methyl group
      p.push(...ring(0, 0, 0.18, 6, s))
      p.push([0.22 * s, 0.15 * s, 0], [0.28 * s, 0.18 * s, 0], [0.25 * s, 0.22 * s, 0]) // CH3
      break
    case 'cytosine': // Pyrimidine + NH2
      p.push(...ring(0, 0, 0.18, 6, s))
      p.push([0, 0.25 * s, 0], [0.05 * s, 0.3 * s, 0]) // NH2
      break
    case 'uracil': // Pyrimidine + =O (no methyl unlike thymine)
      p.push(...ring(0, 0, 0.18, 6, s))
      p.push([0.22 * s, 0.08 * s, 0], [0.26 * s, 0.12 * s, 0]) // =O
      break
    case 'phosphate': // PO4 tetrahedron
      p.push([0, 0.18 * s, 0], [0.17 * s, -0.06 * s, 0.1 * s], [-0.17 * s, -0.06 * s, 0.1 * s], [0, -0.06 * s, -0.18 * s])
      p.push([0, 0, 0]) // central P
      p.push(...line(0, 0, 0, 0.18, 4, s)); p.push(...line(0, 0, 0.17, -0.06, 4, s)); p.push(...line(0, 0, -0.17, -0.06, 4, s))
      break
    case 'deoxyribose': // 5-carbon sugar ring (flat pentagon)
      for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2 - Math.PI / 2; p.push([Math.cos(a) * 0.2 * s, Math.sin(a) * 0.2 * s, 0]); p.push([Math.cos(a) * 0.22 * s, Math.sin(a) * 0.22 * s, 0.02 * s]) }
      p.push([0.28 * s, -0.2 * s, 0]) // CH2OH branch
      break
    case 'ribose': // 5-carbon sugar with extra OH branch
      for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2 - Math.PI / 2; p.push([Math.cos(a) * 0.2 * s, Math.sin(a) * 0.2 * s, 0]) }
      p.push([0.28 * s, -0.2 * s, 0], [0.15 * s, 0.28 * s, 0], [0.2 * s, 0.32 * s, 0]) // OH groups
      break

    // ══ DNA STRUCTURES ══
    case 'doublehelix': // Tall elegant double helix with dense rungs
      for (let i = 0; i < 70; i++) { const t = i * 0.22, y = (i - 35) * 0.05 * s; p.push([Math.cos(t) * 0.3 * s, y, Math.sin(t) * 0.3 * s]); p.push([Math.cos(t + Math.PI) * 0.3 * s, y, Math.sin(t + Math.PI) * 0.3 * s]); if (i % 3 === 0) for (let k = 0; k < 4; k++) { const f = k / 3; p.push([Math.cos(t) * 0.3 * s * (1 - f) + Math.cos(t + Math.PI) * 0.3 * s * f, y, Math.sin(t) * 0.3 * s * (1 - f) + Math.sin(t + Math.PI) * 0.3 * s * f]) } }
      break
    case 'chromosome': // X-shaped with centromere
      for (let d of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) for (let i = 0; i < 15; i++) { const t = i / 14; p.push([d[0] * t * 0.35 * s, d[1] * t * 0.45 * s, 0]); p.push([d[0] * t * 0.35 * s + 0.03 * s, d[1] * t * 0.45 * s, 0]) }
      p.push(...ring(0, 0, 0.06, 10, s))
      break
    case 'chromatin': // Beads on a string (nucleosomes connected by linker DNA)
      for (let i = 0; i < 8; i++) { const t = i * 0.7; const cx = Math.sin(t) * 0.3 * s, cy = (i - 4) * 0.18 * s; p.push(...ring(cx, cy, 0.06, 6, s)); if (i < 7) p.push(...line(cx, cy, Math.sin((i + 1) * 0.7) * 0.3 * s, cy + 0.18 * s, 3, 1)) }
      break
    case 'nucleosome': // Disc with DNA wrapped 1.65 turns
      p.push(...ring(0, 0, 0.15, 16, s)) // histone disc
      for (let i = 0; i < 25; i++) { const t = i * 0.42; p.push([Math.cos(t) * 0.22 * s, Math.sin(t) * 0.22 * s, (i - 12) * 0.01 * s]) } // wrapped DNA
      break
    case 'histone': // Octamer cluster (8 protein blobs)
      for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; p.push(...sphere(Math.cos(a) * 0.12 * s, Math.sin(a) * 0.12 * s, 0, 0.06, 5, s)) }
      break
    case 'chromatid': // Single arm (half chromosome) – elongated rod
      for (let i = 0; i < 25; i++) { const y = (i - 12) * 0.06 * s; const w = 0.05 * s * (1 - Math.abs(i - 12) / 14); p.push([w, y, 0]); p.push([-w, y, 0]) }
      break
    case 'karyotype': // 23 pairs of tiny chromosomes arranged in rows
      for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const cx = (c - 2.5) * 0.2 * s, cy = (r - 1.5) * 0.28 * s; for (let d of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) p.push([cx + d[0] * 0.04 * s, cy + d[1] * 0.06 * s, 0]) }
      break
    case 'nucleoid': // Prokaryotic compact supercoiled DNA mass
      for (let i = 0; i < 80; i++) { const a = (i / 80) * Math.PI * 2 * 5; const r = (0.08 + (i / 80) * 0.28) * s; p.push([Math.cos(a) * r * 0.8, Math.sin(a) * r * 0.6, Math.sin(a * 2) * 0.06 * s]) }
      break

    // ══ GENE ELEMENTS ══
    case 'gene': // Arrow-shaped segment on DNA line
      p.push(...line(-0.4, 0, 0.3, 0, 15, s)) // DNA line
      p.push([0.3 * s, 0.08 * s, 0], [0.4 * s, 0, 0], [0.3 * s, -0.08 * s, 0]) // arrow head
      p.push(...ring(-0.35 * s, 0.12 * s, 0.04, 5, s)) // start site
      break
    case 'genome': // Large circle representing full genome
      p.push(...ring(0, 0, 0.4, 40, s))
      for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; p.push([Math.cos(a) * 0.42 * s, Math.sin(a) * 0.42 * s, 0], [Math.cos(a) * 0.38 * s, Math.sin(a) * 0.38 * s, 0]) } // gene markers
      break
    case 'exon': // Solid highlighted coding blocks
      for (let b = 0; b < 4; b++) { const bx = (b - 1.5) * 0.2 * s; for (let i = 0; i < 6; i++) p.push([bx + (i - 2.5) * 0.03 * s, (Math.random() - 0.5) * 0.12 * s, 0]) }
      p.push(...line(-0.4, 0, 0.4, 0, 8, s)) // connecting line
      break
    case 'intron': // Looped-out lariat (intron loop)
      p.push(...line(-0.35, 0, -0.1, 0, 5, s))
      for (let i = 0; i < 15; i++) { const t = (i / 14) * Math.PI; p.push([Math.cos(t) * 0.2 * s, Math.sin(t) * 0.2 * s + 0.05 * s, 0]) } // loop
      p.push(...line(0.1, 0, 0.35, 0, 5, s))
      p.push([0, 0.15 * s, 0]) // branch point
      break
    case 'promoter': // TATA box with arrow
      for (let i = 0; i < 6; i++) p.push([(i - 2.5) * 0.06 * s, 0.05 * s, 0]) // TATA region
      for (let i = 0; i < 6; i++) p.push([(i - 2.5) * 0.06 * s, -0.05 * s, 0])
      p.push([0.25 * s, 0, 0], [0.2 * s, 0.06 * s, 0], [0.2 * s, -0.06 * s, 0]) // arrow
      break
    case 'enhancer': // Distant element with looping arc to promoter
      p.push(...ring(-0.3 * s, 0, 0.06, 6, s)) // enhancer element
      p.push(...ring(0.3 * s, 0, 0.06, 6, s)) // promoter element
      for (let i = 0; i < 12; i++) { const t = (i / 11) * Math.PI; p.push([Math.cos(t) * 0.3 * s, Math.sin(t) * 0.2 * s + 0.1 * s, 0]) } // loop
      break
    case 'codon': // Triplet of 3 connected spheres
      for (let b = 0; b < 3; b++) p.push(...sphere((b - 1) * 0.18 * s, 0, 0, 0.08, 10, s))
      p.push(...line(-0.1, 0, 0.1, 0, 4, s))
      break
    case 'anticodon': // Inverted triplet (flipped)
      for (let b = 0; b < 3; b++) p.push(...sphere((b - 1) * 0.18 * s, 0, 0, 0.08, 10, s))
      p.push([0, 0.15 * s, 0], [0, 0.25 * s, 0]) // stem up to tRNA
      break
    case 'telomere': // Repetitive TTAGGG cap
      for (let i = 0; i < 6; i++) { const t = i * 0.5; p.push([Math.cos(t) * (0.12 + i * 0.03) * s, (i - 3) * 0.08 * s, Math.sin(t) * (0.12 + i * 0.03) * s]) }
      p.push(...ring(0, -0.35 * s, 0.15, 10, s)) // T-loop at end
      break
    case 'centromere': // Pinched constriction point
      for (let i = 0; i < 20; i++) { const y = (i - 10) * 0.05 * s; const w = 0.15 * s * (0.3 + 0.7 * Math.abs(Math.sin(Math.PI * i / 20))); p.push([w, y, 0]); p.push([-w, y, 0]) }
      break
    case 'plasmid': // Small circular ring with ORI
      p.push(...ring(0, 0, 0.3, 35, s))
      p.push(...sphere(0.3 * s, 0, 0, 0.05, 6, s)) // ORI marker
      break
    case 'operon': // Operator + promoter + structural genes as blocks
      p.push(...line(-0.45, 0, 0.45, 0, 10, s)) // DNA backbone
      for (let b = 0; b < 3; b++) { const bx = (b * 0.2 + 0.05) * s; for (let i = 0; i < 4; i++) p.push([bx + i * 0.03 * s, 0.06 * s, 0]) } // genes
      p.push(...ring(-0.35 * s, 0.05 * s, 0.04, 5, s)) // promoter
      p.push(...ring(-0.2 * s, 0.05 * s, 0.03, 4, s)) // operator
      break

    // ══ ENZYMES ══
    case 'repfork': // Y-shaped replication fork
      for (let i = 0; i < 12; i++) p.push([0, -i * 0.06 * s, 0]) // stem
      for (let i = 0; i < 12; i++) { const t = i * 0.15; p.push([-i * 0.03 * s - 0.05 * s, i * 0.04 * s, Math.sin(t) * 0.05 * s]) } // left
      for (let i = 0; i < 12; i++) { const t = i * 0.15; p.push([i * 0.03 * s + 0.05 * s, i * 0.04 * s, Math.cos(t) * 0.05 * s]) } // right
      break
    case 'dnapoly': // Hand-shaped (palm + fingers + thumb domains)
      p.push(...sphere(0, 0, 0, 0.15, 20, s)) // palm
      for (let i = 0; i < 8; i++) p.push([0.15 * s + i * 0.03 * s, 0.08 * s - i * 0.02 * s, 0]) // fingers
      for (let i = 0; i < 6; i++) p.push([-0.12 * s - i * 0.03 * s, 0.06 * s + i * 0.02 * s, 0]) // thumb
      p.push(...line(-0.05, -0.2, 0.05, -0.35, 5, s)) // DNA template
      break
    case 'rnapoly': // Transcription bubble with nascent RNA
      p.push(...sphere(0, 0, 0, 0.18, 25, s)) // polymerase body
      for (let i = 0; i < 10; i++) p.push([(i - 5) * 0.05 * s, -0.2 * s, 0]) // DNA template
      for (let i = 0; i < 8; i++) { const t = i * 0.3; p.push([0.1 * s, 0.1 * s + i * 0.04 * s, Math.sin(t) * 0.05 * s]) } // nascent RNA
      break
    case 'helicase': // Hexameric ring (6 subunits)
      for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; p.push(...sphere(Math.cos(a) * 0.18 * s, Math.sin(a) * 0.18 * s, 0, 0.07, 6, s)) }
      break
    case 'ligase': // Clamp/bridge connecting two DNA ends
      p.push(...line(-0.4, 0, -0.1, 0, 6, s)); p.push(...line(0.1, 0, 0.4, 0, 6, s))
      p.push(...ring(0, 0.1 * s, 0.12, 10, s)) // ring clamp
      p.push([0, 0, 0]) // join point
      break
    case 'primase': // Small wedge laying a primer
      p.push(...sphere(0, 0, 0, 0.1, 12, s)) // body
      for (let i = 0; i < 6; i++) p.push([-0.15 * s - i * 0.04 * s, 0, 0]) // template
      for (let i = 0; i < 4; i++) p.push([-0.12 * s - i * 0.04 * s, 0.07 * s, 0]) // primer
      break
    case 'topoisomerase': // Supercoil relief – twisted then relaxed lines
      for (let i = 0; i < 20; i++) { const t = i * 0.4; p.push([-0.3 * s + i * 0.015 * s, Math.sin(t) * 0.15 * s, Math.cos(t) * 0.1 * s]) } // supercoiled
      for (let i = 0; i < 15; i++) p.push([0.1 * s + i * 0.03 * s, 0, 0]) // relaxed
      p.push(...ring(0.05 * s, 0, 0.06, 6, s)) // enzyme
      break

    // ══ PROTEIN & TRANSLATION ══
    case 'ribosome': // Two subunits (large bottom + small top dome)
      p.push(...sphere(0, -0.08 * s, 0, 0.22, 35, s))
      p.push(...sphere(0, 0.18 * s, 0, 0.15, 20, s))
      break
    case 'protein': // Folded globular chain
      { let x = 0, y = 0, z = 0; for (let i = 0; i < 45; i++) { x += (Math.random() - 0.5) * 0.1 * s; y += (Math.random() - 0.5) * 0.1 * s; z += (Math.random() - 0.5) * 0.1 * s; p.push([x, y, z]) } }
      break
    case 'aminoacid': // H2N-CHR-COOH (amino, central C, R group, carboxyl)
      p.push([-0.2 * s, 0, 0], [-0.25 * s, 0.06 * s, 0]) // NH2
      p.push([0, 0, 0]) // central C
      p.push([0, 0.15 * s, 0], [0.05 * s, 0.2 * s, 0]) // R side chain
      p.push([0.2 * s, 0, 0], [0.25 * s, 0.06 * s, 0], [0.25 * s, -0.06 * s, 0]) // COOH
      p.push(...line(-0.2, 0, 0, 0, 4, s)); p.push(...line(0, 0, 0.2, 0, 4, s))
      break
    case 'peptide': // Short chain of 4 amino acids
      for (let a = 0; a < 4; a++) { const cx = (a - 1.5) * 0.18 * s; p.push([cx, 0, 0]); p.push([cx, 0.1 * s, 0]); if (a < 3) p.push([cx + 0.09 * s, 0, 0]) }
      break
    case 'polypeptide': // Long alpha-helix folded chain
      for (let i = 0; i < 50; i++) { const t = i * 0.3; p.push([Math.cos(t) * 0.12 * s, (i - 25) * 0.04 * s, Math.sin(t) * 0.12 * s]) }
      break
    case 'enzyme': // Globular with active-site pocket (cleft)
      for (let i = 0; i < 50; i++) { const th = Math.random() * Math.PI * 2; const ph = Math.acos(2 * Math.random() - 1); let r = 0.3 * s; if (th > 1.2 && th < 2.0 && ph > 1.0 && ph < 2.0) r *= 0.5; p.push([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph)]) }
      break

    // ══ PROCESSES ══
    case 'transcription': // DNA opening with RNA emerging
      for (let i = 0; i < 15; i++) p.push([(i - 7) * 0.05 * s, 0, 0]) // template DNA
      for (let i = 3; i < 12; i++) p.push([(i - 7) * 0.05 * s, 0.04 * s, 0]) // coding strand separates
      for (let i = 5; i < 12; i++) { const t = (i - 5) * 0.4; p.push([(i - 7) * 0.05 * s, 0.12 * s + Math.sin(t) * 0.04 * s, Math.cos(t) * 0.04 * s]) } // nascent RNA
      p.push(...sphere(0, 0.05 * s, 0, 0.08, 8, s)) // RNAP bubble
      break
    case 'translation': // Ribosome sliding on mRNA with growing peptide
      for (let i = 0; i < 20; i++) p.push([(i - 10) * 0.04 * s, 0, 0]) // mRNA
      p.push(...sphere(0, 0.08 * s, 0, 0.12, 15, s)) // ribosome
      for (let i = 0; i < 8; i++) p.push([0.05 * s + i * 0.04 * s, 0.2 * s + i * 0.02 * s, 0]) // peptide chain
      break
    case 'replication': // Complete fork with leading/lagging strands
      for (let i = 0; i < 15; i++) p.push([0, -i * 0.05 * s, 0]) // parental
      for (let i = 0; i < 10; i++) p.push([-0.05 * s - i * 0.03 * s, i * 0.04 * s, 0]) // leading
      for (let i = 0; i < 10; i++) p.push([0.05 * s + i * 0.03 * s, i * 0.04 * s, 0]) // lagging
      for (let i = 0; i < 5; i++) p.push([0.08 * s + i * 0.02 * s, i * 0.06 * s, 0]) // Okazaki
      p.push(...ring(0, 0, 0.04, 6, s)) // helicase at fork
      break
    case 'mutation': // DNA strand with a mismatched bulge
      for (let i = 0; i < 20; i++) p.push([(i - 10) * 0.04 * s, 0, 0])
      for (let i = 0; i < 20; i++) { const y = i === 10 ? 0.15 * s : 0.06 * s; p.push([(i - 10) * 0.04 * s, y, 0]) } // mismatch bulge
      p.push([0, 0.2 * s, 0]) // mutation marker
      break

    // ══ EPIGENETICS ══
    case 'epigenome': // Chromatin with methyl/acetyl marks drawn on
      for (let i = 0; i < 6; i++) { const cx = Math.sin(i * 0.8) * 0.25 * s, cy = (i - 3) * 0.15 * s; p.push(...ring(cx, cy, 0.05, 5, s)); p.push([cx, cy + 0.08 * s, 0]) } // marks above nucleosomes
      break
    case 'methylation': // CH3 tags attached to DNA strand
      for (let i = 0; i < 15; i++) p.push([(i - 7) * 0.05 * s, 0, 0]) // DNA
      for (let i = 2; i < 13; i += 3) p.push([(i - 7) * 0.05 * s, 0.1 * s, 0], [(i - 7) * 0.05 * s + 0.02 * s, 0.14 * s, 0], [(i - 7) * 0.05 * s - 0.02 * s, 0.14 * s, 0]) // CH3 triangles
      break
    case 'acetylation': // Acetyl groups on histone tails
      p.push(...ring(0, 0, 0.15, 10, s)) // histone
      for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; const tx = Math.cos(a) * 0.2 * s, ty = Math.sin(a) * 0.2 * s; p.push([tx, ty, 0]); p.push([tx * 1.3, ty * 1.3, 0]); p.push([tx * 1.5, ty * 1.5, 0.03 * s]) } // acetyl marks on tails
      break

    // ══ CRISPR ══
    case 'crispr': // CRISPR array: repeats (boxes) + spacers (lines)
      for (let i = 0; i < 5; i++) { const bx = (i - 2) * 0.18 * s; p.push([bx - 0.04 * s, 0.04 * s, 0], [bx + 0.04 * s, 0.04 * s, 0], [bx + 0.04 * s, -0.04 * s, 0], [bx - 0.04 * s, -0.04 * s, 0]) } // repeat boxes
      for (let i = 0; i < 4; i++) { const sx = (i - 1.5) * 0.18 * s + 0.09 * s; p.push([sx, 0, 0]) } // spacers
      break
    case 'cas9': // Cas9 protein with guide RNA + target DNA
      p.push(...sphere(0, 0, 0, 0.2, 25, s)) // Cas9 body
      for (let i = 0; i < 10; i++) p.push([0.2 * s + i * 0.03 * s, 0.05 * s, 0]) // gRNA
      for (let i = 0; i < 12; i++) p.push([(i - 6) * 0.04 * s, -0.25 * s, 0]) // target DNA
      p.push([0.02 * s, -0.2 * s, 0], [-0.02 * s, -0.2 * s, 0]) // cut site
      break

    // ══ OMICS ══
    case 'proteome': // Network of interconnected protein dots
      for (let i = 0; i < 15; i++) { const a = (i / 15) * Math.PI * 2; const r = (0.15 + (i % 3) * 0.1) * s; p.push([Math.cos(a) * r, Math.sin(a) * r, 0]) }
      for (let i = 0; i < 8; i++) p.push([(Math.random() - 0.5) * 0.2 * s, (Math.random() - 0.5) * 0.2 * s, 0]) // hub connections
      break
    case 'transcriptome': // Fan of RNA strands radiating outward
      for (let r = 0; r < 8; r++) { const a = (r / 8) * Math.PI - Math.PI / 2; for (let i = 0; i < 6; i++) p.push([Math.cos(a) * (0.1 + i * 0.06) * s, Math.sin(a) * (0.1 + i * 0.06) * s, 0]) }
      break
    case 'metabolome': // Metabolic pathway hexagonal network
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const cx = (c - 1.5) * 0.2 * s + (r % 2) * 0.1 * s, cy = (r - 1) * 0.18 * s; p.push([cx, cy, 0]); if (c < 3) p.push([cx + 0.1 * s, cy, 0]) }
      break
    case 'lipidome': // Lipid bilayer membrane cross-section
      for (let i = 0; i < 15; i++) { const x = (i - 7) * 0.05 * s; p.push([x, 0.06 * s, 0]); p.push([x, 0.12 * s, 0]); p.push([x, 0.15 * s, 0]) } // upper layer
      for (let i = 0; i < 15; i++) { const x = (i - 7) * 0.05 * s; p.push([x, -0.06 * s, 0]); p.push([x, -0.12 * s, 0]); p.push([x, -0.15 * s, 0]) } // lower layer
      break

    default:
      p.push(...sphere(0, 0, 0, 0.3, 30, s))
      break
  }
  return p
}

// ── Normalize any shape to exactly N particles ──
const PARTICLE_COUNT = 80
function normalizeParticles(raw, s = 1.3) {
  const pts = raw.length === 0 ? [[0, 0, 0]] : raw
  const out = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const src = pts[i % pts.length]
    out.push([src[0], src[1], src[2]])
  }
  return out
}

// Get all unique type keys for random picking
const allTypes = scientificData.map(d => d.type)

// Smooth easing
function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 }

// ── Morphing particle structure ──
// Phases: HOLD (4s) → SCATTER (1.5s) → MORPH (1.5s) → repeat
const HOLD_DUR = 4.0
const SCATTER_DUR = 1.5
const MORPH_DUR = 1.5
const CYCLE = HOLD_DUR + SCATTER_DUR + MORPH_DUR

function ParticleStructure({ data, position, delay }) {
  const groupRef = useRef()
  const matRef = useRef()
  const geoRef = useRef()

  // Mutable animation state stored in ref (no re-render)
  const anim = useRef({
    currentType: data.type,
    nextType: allTypes[(allTypes.indexOf(data.type) + 1 + Math.floor(Math.random() * (allTypes.length - 1))) % allTypes.length],
    currentPts: normalizeParticles(generateParticles(data.type, 2.5)),
    nextPts: null,
    scatterOffsets: null,
    cycleStart: 0, // all start together — sync morph
  })

  // Pre-compute next shape + scatter offsets on first morph
  const ensureNext = (a) => {
    if (!a.nextPts) {
      a.nextPts = normalizeParticles(generateParticles(a.nextType, 2.5))
      a.scatterOffsets = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        a.scatterOffsets.push([
          (Math.random() - 0.5) * 1.8,
          (Math.random() - 0.5) * 1.8,
          (Math.random() - 0.5) * 1.2,
        ])
      }
    }
  }

  // Working positions buffer
  const posArray = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), [])

  // Lerp color helper
  const colorA = useRef(new THREE.Color())
  const colorB = useRef(new THREE.Color())
  const colorOut = useRef(new THREE.Color())

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const a = anim.current

    // Basic float + rotation
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.4 + delay) * 0.4
      groupRef.current.rotation.y = t * 0.15 + delay
      groupRef.current.rotation.x = Math.sin(t * 0.25 + delay) * 0.15
    }

    // Phase calculation
    const elapsed = t - a.cycleStart
    const phase = elapsed % CYCLE

    if (phase < HOLD_DUR) {
      // ── HOLD: show current shape ──
      const pulse = 0.65 + Math.sin(t * 1.2 + delay * 0.5) * 0.2
      if (matRef.current) matRef.current.opacity = pulse
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        posArray[i * 3] = a.currentPts[i][0]
        posArray[i * 3 + 1] = a.currentPts[i][1]
        posArray[i * 3 + 2] = a.currentPts[i][2]
      }
    } else if (phase < HOLD_DUR + SCATTER_DUR) {
      // ── SCATTER: particles vibe outward ──
      ensureNext(a)
      const prog = easeInOutCubic((phase - HOLD_DUR) / SCATTER_DUR)
      if (matRef.current) matRef.current.opacity = 0.85 - prog * 0.4
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        posArray[i * 3] = a.currentPts[i][0] + a.scatterOffsets[i][0] * prog
        posArray[i * 3 + 1] = a.currentPts[i][1] + a.scatterOffsets[i][1] * prog
        posArray[i * 3 + 2] = a.currentPts[i][2] + a.scatterOffsets[i][2] * prog
      }
    } else {
      // ── MORPH: converge into new shape ──
      ensureNext(a)
      const prog = easeInOutCubic((phase - HOLD_DUR - SCATTER_DUR) / MORPH_DUR)
      if (matRef.current) matRef.current.opacity = 0.45 + prog * 0.4
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const sx = a.currentPts[i][0] + a.scatterOffsets[i][0]
        const sy = a.currentPts[i][1] + a.scatterOffsets[i][1]
        const sz = a.currentPts[i][2] + a.scatterOffsets[i][2]
        posArray[i * 3] = sx + (a.nextPts[i][0] - sx) * prog
        posArray[i * 3 + 1] = sy + (a.nextPts[i][1] - sy) * prog
        posArray[i * 3 + 2] = sz + (a.nextPts[i][2] - sz) * prog
      }
    }

    // Cycle complete → swap & pick a new random next
    if (elapsed >= CYCLE) {
      ensureNext(a)
      a.currentType = a.nextType
      a.currentPts = a.nextPts
      const avail = allTypes.filter(t => t !== a.currentType)
      a.nextType = avail[Math.floor(Math.random() * avail.length)]
      a.nextPts = null
      a.scatterOffsets = null
      a.cycleStart = t
    }

    // Color transition
    const cA = typeColors[a.currentType] || '#60a5fa'
    const cB = typeColors[a.nextType] || '#60a5fa'
    colorA.current.set(cA)
    colorB.current.set(cB)
    const colorProg = Math.max(0, Math.min(1, (elapsed % CYCLE - HOLD_DUR) / (SCATTER_DUR + MORPH_DUR)))
    colorOut.current.copy(colorA.current).lerp(colorB.current, easeInOutCubic(colorProg))
    if (matRef.current) matRef.current.color = colorOut.current

    // Update geometry
    if (geoRef.current) {
      geoRef.current.attributes.position.array = posArray
      geoRef.current.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <points>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={posArray} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial ref={matRef} size={0.1} color="#60a5fa" transparent opacity={0.85} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  )
}

// ── Background ambient particles ──
function BackgroundParticles() {
  const ref = useRef()
  const count = 450
  const positions = useMemo(() => { const pos = new Float32Array(count * 3); for (let i = 0; i < count; i++) { pos[i * 3] = (Math.random() - 0.5) * 100; pos[i * 3 + 1] = (Math.random() - 0.5) * 60; pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5 }; return pos }, [])
  useFrame((state) => { if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.012 })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.03} color="#3b82f6" transparent opacity={0.3} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

// ── Mouse tracker ──
function MouseTracker({ children }) {
  const groupRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  useEffect(() => { const onMove = (e) => { mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1; mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1 }; window.addEventListener('mousemove', onMove); return () => window.removeEventListener('mousemove', onMove) }, [])
  useFrame(() => { if (groupRef.current) { target.current.x += (mouse.current.x * 0.4 - target.current.x) * 0.03; target.current.y += (mouse.current.y * 0.3 - target.current.y) * 0.03; groupRef.current.rotation.y = target.current.x * 0.5; groupRef.current.rotation.x = target.current.y * 0.3 } })
  return <group ref={groupRef}>{children}</group>
}

// ── Scene layout — fill full viewport, skip center text area ──
function Scene() {
  const structures = useMemo(() => {
    const cols = 13
    const rows = Math.ceil(scientificData.length / cols)
    // Dead zone where hero text sits (center of screen) — keep generously wide
    const deadX = 18  // half-width of clear zone
    const deadY = 12  // half-height of clear zone

    return scientificData.map((data, i) => {
      const row = Math.floor(i / cols); const col = i % cols
      let x = (col - (cols - 1) / 2) * 5.5 + (Math.random() - 0.5) * 2
      let y = (row - (rows - 1) / 2) * 5 + (Math.random() - 0.5) * 2
      const z = (Math.random() - 0.5) * 8 - 5

      // Push structures away from center dead zone
      if (Math.abs(x) < deadX && Math.abs(y) < deadY) {
        // Push outward — whichever axis is closer to the edge
        if (Math.abs(x) / deadX > Math.abs(y) / deadY) {
          x = x >= 0 ? deadX + Math.random() * 3 : -deadX - Math.random() * 3
        } else {
          y = y >= 0 ? deadY + Math.random() * 3 : -deadY - Math.random() * 3
        }
      }

      return { data, position: [x, y, z], delay: i * 0.25 }
    })
  }, [])
  return (<><BackgroundParticles />{structures.map((s, i) => (<ParticleStructure key={i} data={s.data} position={s.position} delay={s.delay} />))}</>)
}

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 22], fov: 70 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <MouseTracker><Scene /></MouseTracker>
      </Canvas>
    </div>
  )
}
