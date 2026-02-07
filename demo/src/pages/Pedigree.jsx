import { useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import Header from '../components/Header'
import { img } from '../utils'
import { Download, Share2, Loader2 } from 'lucide-react'

const sire = { name: 'Apollo', img: img('images/ancestor-1.jpg') }
const dam = { name: 'Diana', img: img('images/ancestor-2.jpg') }
const grandparents = [
  { name: 'Rex', img: img('images/ancestor-3.jpg') },
  { name: 'Luna', img: img('images/ancestor-4.jpg') },
  { name: 'Thor', img: img('images/ancestor-1.jpg') },
  { name: 'Bella', img: img('images/ancestor-2.jpg') },
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

  const Ancestor = ({ data, size = 'w-10 h-10' }) => (
    <div className="flex flex-col items-center">
      <img
        src={data.img}
        alt={data.name}
        className={`${size} rounded-full object-cover border-2 border-gold/40`}
        crossOrigin="anonymous"
      />
      <span className="text-[8px] text-gray-500 mt-0.5 font-medium">{data.name}</span>
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      <Header title="Pedigree Digital" showBack />

      <div className="flex-1 overflow-y-auto scroll-area bg-cream">
        <div className="px-4 pt-3 pb-6">
          {/* Certificate card */}
          <div ref={cardRef} className="bg-white rounded-2xl card-shadow overflow-hidden border border-gray-100">
            {/* QR codes row */}
            <div className="flex justify-between items-start px-3 pt-3">
              <div className="p-1 border-2 border-green-700 rounded-md">
                <QRCodeSVG value="https://alianz.org/verify/MX-2025-00847" size={48} />
              </div>
              <div className="p-1 border-2 border-green-700 rounded-md">
                <QRCodeSVG value="https://alianz.org/pedigree/MX-2025-00847" size={48} />
              </div>
            </div>

            {/* Dog photo — compact */}
            <div className="px-5 pt-2 pb-2">
              <div className="border-2 border-navy/15 rounded-lg overflow-hidden">
                <img
                  src={img('images/dog-doberman.jpg')}
                  alt="CH. Maximus Prince of Alianz"
                  className="w-full h-36 object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </div>

            {/* Title */}
            <div className="text-center px-6 pb-2">
              <p className="text-gray-400 text-[10px] uppercase tracking-widest italic">Professional</p>
              <h2 className="text-navy font-bold text-base leading-tight mt-0.5">
                CH. Maximus<br />Prince of Alianz
              </h2>
            </div>

            {/* Genealogical Tree */}
            <div className="mx-3 border-t border-gray-100 pt-2 pb-3">
              <h3 className="text-navy font-bold text-[10px] uppercase tracking-wider mb-2">Official Family Tree</h3>

              <div className="flex items-start gap-3">
                {/* Parents (Sire & Dam) */}
                <div className="flex flex-col items-center gap-2">
                  <Ancestor data={sire} size="w-11 h-11" />
                  <Ancestor data={dam} size="w-11 h-11" />
                </div>

                {/* Connecting lines */}
                <div className="flex flex-col items-center justify-center self-center">
                  <div className="w-4 border-t border-gray-300" />
                  <div className="h-8 border-l border-gray-300" />
                  <div className="w-4 border-t border-gray-300" />
                </div>

                {/* Grandparents */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  {grandparents.map((gp, i) => (
                    <Ancestor key={i} data={gp} size="w-9 h-9" />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer — text left, seal stamp right */}
            <div className="bg-navy px-4 py-2.5 flex items-center justify-between">
              <div>
                <p className="text-gold font-serif text-sm italic">Alianz</p>
                <p className="text-gray-400 text-[9px]">Official Stamp</p>
              </div>
              <img
                src={img('images/seal-alianz.png')}
                alt="Official Stamp"
                className="h-10 w-10 object-contain opacity-80"
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
