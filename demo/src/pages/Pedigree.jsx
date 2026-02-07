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
          <div ref={cardRef} className="bg-white rounded-2xl card-shadow overflow-hidden">
            {/* Top QR */}
            <div className="flex justify-between items-start p-4 pb-0">
              <div className="p-1 border-2 border-green-700 rounded-lg">
                <QRCodeSVG value="https://alianz.org/verify/MX-2025-00847" size={56} />
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block">Registro No.</span>
                <span className="text-navy text-xs font-bold">MX-2025-00847</span>
              </div>
            </div>

            {/* Dog photo */}
            <div className="px-6 py-4">
              <div className="border-2 border-navy/10 rounded-xl overflow-hidden">
                <img
                  src={img('images/dog-doberman.jpg')}
                  alt="CH. Maximus"
                  className="w-full h-48 object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </div>

            {/* Title */}
            <div className="text-center px-4 pb-3">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Profesional</p>
              <h2 className="text-navy font-bold text-lg leading-tight mt-1">
                CH. Maximus Prince<br />of Alianz
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-xs bg-gold/10 text-gold-dark px-2 py-0.5 rounded-full font-medium">Doberman</span>
                <span className="text-xs bg-navy/5 text-navy px-2 py-0.5 rounded-full font-medium">Macho</span>
              </div>
            </div>

            {/* Info grid */}
            <div className="mx-4 border-t border-gray-100 py-3 grid grid-cols-2 gap-y-2 text-sm">
              <div>
                <span className="text-gray-400 text-xs">Fecha de Nacimiento</span>
                <p className="text-navy font-medium">15 Mar 2021</p>
              </div>
              <div>
                <span className="text-gray-400 text-xs">Microchip</span>
                <p className="text-navy font-medium">941000025678432</p>
              </div>
              <div>
                <span className="text-gray-400 text-xs">Criador</span>
                <p className="text-navy font-medium">Ricardo M.</p>
              </div>
              <div>
                <span className="text-gray-400 text-xs">País</span>
                <p className="text-navy font-medium">México</p>
              </div>
            </div>

            {/* Family Tree */}
            <div className="mx-4 border-t border-gray-100 pt-3 pb-4">
              <h3 className="text-navy font-bold text-sm mb-3">Árbol Familiar Oficial</h3>
              <div className="flex items-center gap-3 overflow-x-auto scroll-area pb-2">
                {ancestors.map((a, i) => (
                  <div key={i} className="flex flex-col items-center shrink-0">
                    <img
                      src={a.img}
                      alt={a.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
                      crossOrigin="anonymous"
                    />
                    <span className="text-[10px] text-gray-500 mt-1">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with seal */}
            <div className="bg-navy px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={img('images/logo-alianz.png')} alt="Alianz" className="h-8 w-8 object-contain" crossOrigin="anonymous" />
                <div>
                  <p className="text-gold font-serif text-sm italic">Alianz</p>
                  <p className="text-gray-400 text-[9px]">Sello Oficial</p>
                </div>
              </div>
              <div className="p-1 bg-white/10 rounded">
                <QRCodeSVG value="https://alianz.org/verify/MX-2025-00847" size={36} fgColor="#C6A962" bgColor="transparent" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="bg-gold-gradient text-white font-semibold text-sm py-3 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2">
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
