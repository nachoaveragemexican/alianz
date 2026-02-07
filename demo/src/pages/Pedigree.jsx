import { useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import Header from '../components/Header'
import { img } from '../utils'
import { Download, Share2, Loader2 } from 'lucide-react'

const ancestors = [
  { name: 'Apollo', img: img('images/ancestor-1.jpg') },
  { name: 'Diana', img: img('images/ancestor-2.jpg') },
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

  return (
    <div className="h-full flex flex-col">
      <Header title="Pedigree Digital" showBack />

      <div className="flex-1 overflow-y-auto scroll-area bg-cream">
        <div className="px-4 pt-4 pb-6">
          {/* Certificate card */}
          <div ref={cardRef} className="bg-white rounded-2xl card-shadow overflow-hidden border border-navy/10">
            {/* Two QR codes at top */}
            <div className="flex justify-between items-start p-4 pb-0">
              <div className="p-1.5 border-2 border-green-700 rounded-lg">
                <QRCodeSVG value="https://alianz.org/verify/MX-2025-00847" size={52} />
              </div>
              <div className="p-1.5 border-2 border-green-700 rounded-lg">
                <QRCodeSVG value="https://alianz.org/pedigree/MX-2025-00847" size={52} />
              </div>
            </div>

            {/* Dog photo with ornamental border */}
            <div className="px-8 pt-4 pb-3">
              <div className="border-[3px] border-navy/20 rounded-xl p-1">
                <div className="border border-navy/10 rounded-lg overflow-hidden">
                  <img
                    src={img('images/dog-doberman.jpg')}
                    alt="CH. Maximus Prince of Alianz"
                    className="w-full h-44 object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center px-6 pb-4">
              <p className="text-gray-400 text-[11px] uppercase tracking-widest">Professional</p>
              <h2 className="text-navy font-bold text-lg leading-tight mt-1">
                CH. Maximus Prince<br />of Alianz
              </h2>
            </div>

            {/* Official Family Tree */}
            <div className="mx-4 border-t border-gray-100 pt-3 pb-4">
              <h3 className="text-navy font-bold text-xs uppercase tracking-wider mb-3">Official Family Tree</h3>
              <div className="flex items-center gap-3 overflow-x-auto scroll-area pb-1">
                {ancestors.map((a, i) => (
                  <div key={i} className="flex flex-col items-center shrink-0">
                    <img
                      src={a.img}
                      alt={a.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-gold/40"
                      crossOrigin="anonymous"
                    />
                    <span className="text-[9px] text-gray-500 mt-1 font-medium">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with seal and signature */}
            <div className="bg-navy px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={img('images/logo-alianz.png')} alt="Alianz" className="h-8 w-8 object-contain" crossOrigin="anonymous" />
                <div>
                  <p className="text-gold font-serif text-sm italic">Alianz</p>
                  <p className="text-gray-400 text-[9px]">Official Stamp</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-serif text-gold italic text-xl tracking-wide opacity-80">Alianz</p>
                <p className="text-gray-500 text-[8px] -mt-0.5">Certified</p>
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
