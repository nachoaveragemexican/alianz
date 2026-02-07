import { useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import Header from '../components/Header'
import { img } from '../utils'
import { Download, Share2, Loader2 } from 'lucide-react'

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

  return (
    <div className="h-full flex flex-col">
      <Header title="Pedigree Digital" showBack />

      <div className="flex-1 overflow-y-auto scroll-area bg-cream">
        <div className="px-4 pt-3 pb-6">
          {/* Certificate card */}
          <div ref={cardRef} className="bg-white rounded-2xl card-shadow overflow-hidden border border-gray-100 relative">

            {/* Two-column: Photo LEFT | QR + title RIGHT */}
            <div className="flex gap-3 px-3 pt-3 pb-2">
              {/* Left: Dog photo */}
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

              {/* Right: QR code + Professional + Name */}
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

            {/* Official Family Tree — 3 generations left to right with branches */}
            <div className="mx-3 border-t border-gray-100 pt-2 pb-3">
              <h3 className="text-navy font-bold text-[9px] uppercase tracking-wider mb-2">Official Family Tree</h3>

              {/* Tree with SVG branches */}
              <div className="relative" style={{ height: 160 }}>
                {/* SVG branch lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                  {/* Gen1 → Sire */}
                  <line x1="12%" y1="50%" x2="38%" y2="28%" stroke="#d4d4d4" strokeWidth="1.5" />
                  {/* Gen1 → Dam */}
                  <line x1="12%" y1="50%" x2="38%" y2="72%" stroke="#d4d4d4" strokeWidth="1.5" />
                  {/* Sire → Sire's Sire */}
                  <line x1="42%" y1="28%" x2="68%" y2="13%" stroke="#d4d4d4" strokeWidth="1.5" />
                  {/* Sire → Sire's Dam */}
                  <line x1="42%" y1="28%" x2="68%" y2="38%" stroke="#d4d4d4" strokeWidth="1.5" />
                  {/* Dam → Dam's Sire */}
                  <line x1="42%" y1="72%" x2="68%" y2="62%" stroke="#d4d4d4" strokeWidth="1.5" />
                  {/* Dam → Dam's Dam */}
                  <line x1="42%" y1="72%" x2="68%" y2="87%" stroke="#d4d4d4" strokeWidth="1.5" />
                </svg>

                {/* Gen 1: The dog — left */}
                <div className="absolute" style={{ left: '2%', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
                  <Circle src={tree.img} name={tree.name} size={38} />
                </div>

                {/* Gen 2: Sire — middle top */}
                <div className="absolute" style={{ left: '30%', top: '28%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                  <Circle src={tree.sire.img} name={tree.sire.name} size={34} />
                </div>
                {/* Gen 2: Dam — middle bottom */}
                <div className="absolute" style={{ left: '30%', top: '72%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                  <Circle src={tree.dam.img} name={tree.dam.name} size={34} />
                </div>

                {/* Gen 3: Sire's Sire */}
                <div className="absolute" style={{ left: '62%', top: '13%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                  <Circle src={tree.sire.sire.img} name={tree.sire.sire.name} size={28} />
                </div>
                {/* Gen 3: Sire's Dam */}
                <div className="absolute" style={{ left: '62%', top: '38%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                  <Circle src={tree.sire.dam.img} name={tree.sire.dam.name} size={28} />
                </div>
                {/* Gen 3: Dam's Sire */}
                <div className="absolute" style={{ left: '62%', top: '62%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                  <Circle src={tree.dam.sire.img} name={tree.dam.sire.name} size={28} />
                </div>
                {/* Gen 3: Dam's Dam */}
                <div className="absolute" style={{ left: '62%', top: '87%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                  <Circle src={tree.dam.dam.img} name={tree.dam.dam.name} size={28} />
                </div>
              </div>
            </div>

            {/* Seal stamp — big, bleeds up into white area */}
            <div className="relative">
              <img
                src={img('images/seal-alianz.png')}
                alt="Official Stamp"
                className="absolute right-4 -top-10 w-20 h-20 object-contain opacity-30"
                crossOrigin="anonymous"
                style={{ zIndex: 2 }}
              />
            </div>

            {/* Footer */}
            <div className="bg-navy px-4 py-3 flex items-center justify-between relative" style={{ zIndex: 1 }}>
              <div>
                <p className="text-gold font-serif text-sm italic">Alianz</p>
                <p className="text-gray-400 text-[9px]">Official Stamp</p>
              </div>
              <img
                src={img('images/seal-alianz.png')}
                alt="Official Stamp"
                className="h-14 w-14 object-contain opacity-70"
                crossOrigin="anonymous"
              />
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
