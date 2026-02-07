import { useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import Header from '../components/Header'
import { img } from '../utils'
import { Download, Share2, Loader2, Award, Star, Trophy, Medal } from 'lucide-react'

const dogImg = 'images/dog-doberman.jpg'

const tree = {
  name: 'Maximus',
  img: 'images/dog-doberman.jpg',
  sire: {
    name: 'Apollo',
    img: 'images/ancestor-1.jpg',
    sire: { name: 'Rex', img: 'images/ancestor-3.jpg' },
    dam: { name: 'Luna', img: 'images/ancestor-4.jpg' },
  },
  dam: {
    name: 'Diana',
    img: 'images/ancestor-2.jpg',
    sire: { name: 'Thor', img: 'images/ancestor-1.jpg' },
    dam: { name: 'Bella', img: 'images/ancestor-2.jpg' },
  },
}

const titles = [
  { label: 'CH', desc: 'Champion', icon: Trophy, color: 'text-gold-dark', bg: 'bg-gold/10' },
  { label: 'BIS', desc: 'Best in Show', icon: Award, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'BOB', desc: 'Best of Breed', icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'CAC', desc: 'Certificado', icon: Medal, color: 'text-green-600', bg: 'bg-green-50' },
]

const infoRows = [
  { label: 'Registro', value: 'MX-2025-00847' },
  { label: 'Propietario', value: 'Ricardo F.' },
  { label: 'Nacimiento', value: '12 / Mar / 2021' },
  { label: 'Microchip', value: '985 120 032 847 291' },
  { label: 'Raza', value: 'Doberman Pinscher' },
  { label: 'Sexo', value: 'Macho' },
]

export default function Pedigree() {
  const cardRef = useRef(null)
  const [generating, setGenerating] = useState(false)

  const downloadPdf = async () => {
    if (!cardRef.current || generating) return
    setGenerating(true)
    try {
      const html2canvas = (await import('html2canvas-pro')).default
      const { jsPDF } = await import('jspdf')
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight)
      pdf.save('Pedigree-CH-Maximus-Prince.pdf')
    } catch (err) {
      console.error(err)
    }
    setGenerating(false)
  }

  const Circle = ({ src, name, size = 40 }) => (
    <div className="flex flex-col items-center shrink-0">
      <img
        src={img(src)}
        alt={name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover border-2 border-gold/40"
        crossOrigin="anonymous"
      />
      <span className="text-[7px] text-gray-500 mt-0.5 font-medium leading-tight text-center">{name}</span>
    </div>
  )

  /* Bracket connector: horizontal out, vertical split, horizontal to each child */
  const Bracket = ({ x, yCenter, yTop, yBot, w = 20 }) => (
    <g stroke="#C6A962" strokeWidth="1.2" fill="none" opacity="0.6">
      {/* horizontal out from parent */}
      <line x1={x} y1={yCenter} x2={x + w * 0.4} y2={yCenter} />
      {/* vertical bar */}
      <line x1={x + w * 0.4} y1={yTop} x2={x + w * 0.4} y2={yBot} />
      {/* horizontal to top child */}
      <line x1={x + w * 0.4} y1={yTop} x2={x + w} y2={yTop} />
      {/* horizontal to bottom child */}
      <line x1={x + w * 0.4} y1={yBot} x2={x + w} y2={yBot} />
    </g>
  )

  return (
    <div className="h-full flex flex-col">
      <Header title="Pedigree Digital" showBack />

      <div className="flex-1 overflow-y-auto scroll-area bg-cream">
        <div className="px-4 pt-3 pb-6">
          {/* Certificate card */}
          <div ref={cardRef} className="bg-white rounded-2xl card-shadow overflow-hidden border border-gray-100 relative">

            {/* Two-column: Photo LEFT | QR + title RIGHT */}
            <div className="flex gap-3 px-3 pt-3 pb-2">
              <div className="w-[48%] shrink-0">
                <div className="border-2 border-navy/15 rounded-lg overflow-hidden">
                  <img
                    src={img(dogImg)}
                    alt="CH. Maximus Prince of Alianz"
                    className="w-full h-40 object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-start pt-1">
                <div className="p-1.5 border-2 border-gold rounded-lg">
                  <QRCodeSVG value="https://alianz.org/pedigree/MX-2025-00847" size={64} />
                </div>
                <p className="text-gray-400 text-[9px] uppercase tracking-widest italic mt-3">Professional</p>
                <h2 className="text-navy font-serif font-bold text-sm leading-tight mt-1 text-center italic">
                  CH. Maximus<br />Prince of<br />Alianz
                </h2>
              </div>
            </div>

            {/* Title badges */}
            <div className="flex gap-1.5 px-3 pb-2 flex-wrap">
              {titles.map(t => {
                const Icon = t.icon
                return (
                  <div key={t.label} className={`${t.bg} rounded-full px-2 py-0.5 flex items-center gap-1`}>
                    <Icon size={10} className={t.color} />
                    <span className={`text-[9px] font-bold ${t.color}`}>{t.label}</span>
                    <span className="text-[8px] text-gray-400">{t.desc}</span>
                  </div>
                )
              })}
            </div>

            {/* Dog info grid */}
            <div className="mx-3 border-t border-gray-100 py-2">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {infoRows.map(r => (
                  <div key={r.label} className="flex items-baseline gap-1">
                    <span className="text-[8px] text-gray-400 uppercase tracking-wider shrink-0">{r.label}:</span>
                    <span className="text-[9px] text-navy font-semibold truncate">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Family Tree — bracket connectors */}
            <div className="mx-3 border-t border-gray-100 pt-2 pb-3">
              <h3 className="text-navy font-bold text-[9px] uppercase tracking-wider mb-2">Official Family Tree</h3>

              <div className="relative" style={{ height: 150 }}>
                {/* SVG bracket connectors */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} viewBox="0 0 400 150" preserveAspectRatio="none">
                  {/* Gen1 → Gen2 bracket */}
                  <Bracket x={58} yCenter={75} yTop={38} yBot={112} w={65} />
                  {/* Gen2 Sire → Gen3 bracket */}
                  <Bracket x={185} yCenter={38} yTop={20} yBot={56} w={55} />
                  {/* Gen2 Dam → Gen3 bracket */}
                  <Bracket x={185} yCenter={112} yTop={94} yBot={130} w={55} />
                </svg>

                {/* Gen 1: The dog — left */}
                <div className="absolute" style={{ left: '2%', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
                  <Circle src={tree.img} name={tree.name} size={36} />
                </div>

                {/* Gen 2: Sire */}
                <div className="absolute" style={{ left: '32%', top: '25%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                  <Circle src={tree.sire.img} name={tree.sire.name} size={32} />
                </div>
                {/* Gen 2: Dam */}
                <div className="absolute" style={{ left: '32%', top: '75%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                  <Circle src={tree.dam.img} name={tree.dam.name} size={32} />
                </div>

                {/* Gen 3: Sire's Sire */}
                <div className="absolute" style={{ left: '62%', top: '13%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                  <Circle src={tree.sire.sire.img} name={tree.sire.sire.name} size={26} />
                </div>
                {/* Gen 3: Sire's Dam */}
                <div className="absolute" style={{ left: '62%', top: '37%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                  <Circle src={tree.sire.dam.img} name={tree.sire.dam.name} size={26} />
                </div>
                {/* Gen 3: Dam's Sire */}
                <div className="absolute" style={{ left: '62%', top: '63%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                  <Circle src={tree.dam.sire.img} name={tree.dam.sire.name} size={26} />
                </div>
                {/* Gen 3: Dam's Dam */}
                <div className="absolute" style={{ left: '62%', top: '87%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                  <Circle src={tree.dam.dam.img} name={tree.dam.dam.name} size={26} />
                </div>
              </div>
            </div>

            {/* Big seal stamp — bleeds across footer boundary */}
            <div className="relative" style={{ zIndex: 3, pointerEvents: 'none' }}>
              <img
                src={img('images/seal-alianz.png')}
                alt="Official Stamp"
                className="absolute right-3 -bottom-8 w-28 h-28 object-contain opacity-25"
                crossOrigin="anonymous"
                style={{ transform: 'rotate(-12deg)' }}
              />
            </div>

            {/* Footer */}
            <div className="bg-navy px-4 py-3 flex items-center justify-between relative overflow-visible">
              <div>
                <p className="text-gold font-serif text-sm italic">Alianz</p>
                <p className="text-gray-400 text-[9px]">Official Stamp</p>
              </div>
              {/* Large stamp in footer that bleeds up */}
              <div className="relative" style={{ width: 80, height: 48 }}>
                <img
                  src={img('images/seal-alianz.png')}
                  alt="Official Stamp"
                  className="absolute -top-10 -right-1 w-24 h-24 object-contain opacity-60"
                  crossOrigin="anonymous"
                  style={{ transform: 'rotate(-8deg)' }}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={async () => {
                const shareData = {
                  title: 'Pedigree Digital - CH. Maximus Prince of Alianz',
                  text: 'Pedigree Digital verificado por Alianz Canine Worldwide. Registro: MX-2025-00847',
                  url: window.location.href,
                }
                if (navigator.share) {
                  try { await navigator.share(shareData) } catch {}
                } else {
                  await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`)
                  alert('Enlace copiado al portapapeles')
                }
              }}
              className="bg-gold-gradient text-white font-semibold text-sm py-3 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <Share2 size={16} />
              Compartir
            </button>
            <button
              onClick={downloadPdf}
              disabled={generating}
              className="bg-white text-navy font-semibold text-sm py-3 rounded-xl border border-navy/10 card-shadow active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              {generating ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Download size={16} />
              )}
              {generating ? 'Generando...' : 'Descargar PDF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
