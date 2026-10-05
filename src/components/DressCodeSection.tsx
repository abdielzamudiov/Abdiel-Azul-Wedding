import { DressCodeIcon } from './MonetIcons'
import { WEDDING_DETAILS } from '../config/weddingDetails'
import womanWithParasol from '../assets/monet-woman-with-parasol.png'

export function DressCodeSection() {
  const mensSuitsPalette = [
    { name: 'Café Moka', hex: '#5A3D28' },
    { name: 'Café Miel', hex: '#704A33' },
    { name: 'Azul Marino', hex: '#1C2A39' },
    { name: 'Gris Oxford', hex: '#3F4852' },
    { name: 'Verde Olivo', hex: '#4E5D4E' },
    { name: 'Azul Pizarra', hex: '#3B597B' },
  ]

  const gardenPalette = [
    { name: 'French Sage', hex: '#8A9A86' },
    { name: 'Water Lily Pink', hex: '#E8C5C8' },
    { name: 'Periwinkle', hex: '#B4C5D4' },
    { name: 'Soft Primrose', hex: '#F3E8C8' },
    { name: 'Giverny Iris', hex: '#7B6B8D' },
    { name: 'Twilight Lavender', hex: '#9B8CB4' },
    { name: 'Night Garden Blue', hex: '#4B6B82' },
    { name: 'Eucalyptus', hex: '#94A692' },
  ]

  return (
    <section className="w-full max-w-3xl mx-auto px-4 pt-0 pb-8">
      <div
        className="bg-white rounded-2xl p-6 sm:p-10 border border-[var(--border-subtle)] shadow-[var(--shadow-card)] text-center space-y-6 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.91) 0%, rgba(255, 255, 255, 0.94) 75%, rgba(255, 255, 255, 1) 100%), url(${womanWithParasol})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      >
        {/* Top Accent Icon */}
        <div className="w-14 h-14 mx-auto rounded-full bg-[var(--surface-tint)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--color-moss)]">
          <DressCodeIcon className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-moss)] font-semibold font-[var(--font-sans)]">
            Código de Vestimenta
          </p>
          <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[var(--text-main)]">
            {WEDDING_DETAILS.dressCodeTitle}
          </h3>
          <p className="text-sm text-[var(--text-muted)] max-w-lg mx-auto font-[var(--font-sans)] leading-relaxed">
            {WEDDING_DETAILS.dressCodeNote}
          </p>
        </div>

        <div className="w-12 h-px bg-[var(--color-sage)] mx-auto opacity-40" />

        {/* Color Palette Swatches */}
        <div className="space-y-6 pt-1">
          {/* Mens Suits Section */}
          <div className="space-y-2.5">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-moss)] font-semibold font-[var(--font-sans)]">
              👔 Sugerencia para Trajes (Caballeros)
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
              {mensSuitsPalette.map((color, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 group">
                  <div
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-white shadow-md transform group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                  <span className="text-[10px] text-[var(--text-muted)] font-medium font-[var(--font-sans)]">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-8 h-px bg-[var(--color-sage)] mx-auto opacity-30" />

          {/* Garden & Pastels Section */}
          <div className="space-y-2.5">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-moss)] font-semibold font-[var(--font-sans)]">
              🌸 Tonos Jardín Nocturno & Pastel (Damas / Acompañantes)
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
              {gardenPalette.map((color, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 group">
                  <div
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-white shadow-md transform group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                  <span className="text-[10px] text-[var(--text-muted)] font-medium font-[var(--font-sans)]">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Friendly Note */}
        <div className="bg-[var(--surface-tint)] p-4 rounded-xl border border-[var(--border-subtle)] max-w-lg mx-auto">
          <p className="text-xs text-[var(--color-moss)] italic font-[var(--font-sans)]">
            {WEDDING_DETAILS.dressCodeWarning}
          </p>
        </div>
      </div>
    </section>
  )
}
