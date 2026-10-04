import photoHorizon from '../assets/abdiel&azul-mirando-horizonte-espaldas.jpg'
import photoYellowFlowers from '../assets/abdiel&azul-flores-amarillas.jpg'
import artistsGarden from '../assets/monet-artists-garden.png'

export function PhotoGallerySection() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Clean Monet Card Container following application patterns */}
      <div
        className="relative bg-white rounded-2xl p-4 sm:p-8 border border-[var(--border-subtle)] shadow-[var(--shadow-card)] overflow-hidden transition-all duration-500 hover:shadow-[var(--shadow-hover)]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.95) 75%, rgba(255, 255, 255, 1) 100%), url(${artistsGarden})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      >
        {/* 2-Photo Composition Grid - Clean Images Only */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
          {/* Vertical Photo: Mirando al Horizonte (Portrait, object-top so both are visible) */}
          <div className="md:col-span-6 w-full">
            <div className="relative rounded-xl overflow-hidden shadow-[var(--shadow-card)] border border-[var(--border-subtle)] aspect-[3/4] sm:aspect-[4/5] w-full group bg-[var(--surface-tint)]">
              <img
                src={photoHorizon}
                alt="Abdiel & Esmeralda mirando al horizonte"
                className="w-full h-full object-cover object-bottom transform group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(27,38,30,0.25)] via-transparent to-transparent opacity-70" />
            </div>
          </div>

          {/* Horizontal Photo: Campo de Flores Amarillas */}
          <div className="md:col-span-6 w-full">
            <div className="relative rounded-xl overflow-hidden shadow-[var(--shadow-card)] border border-[var(--border-subtle)] aspect-[4/3] sm:aspect-[4/5] w-full group bg-[var(--surface-tint)]">
              <img
                src={photoYellowFlowers}
                alt="Abdiel & Esmeralda en el campo de flores amarillas"
                className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(27,38,30,0.25)] via-transparent to-transparent opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

