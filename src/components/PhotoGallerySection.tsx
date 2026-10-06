import photoHorizon from '../assets/abdiel&azul-mirando-horizonte-espaldas.jpg'
import photoYellowFlowers from '../assets/abdiel&azul-flores-amarillas.jpg'
import extraPhoto1 from '../assets/Abdiel&azul-extra-photos - 1.jpeg'
import extraPhoto2 from '../assets/Abdiel&azul-extra-photos - 2.jpeg'
import extraPhoto3 from '../assets/Abdiel&azul-extra-photos - 3.jpeg'
import extraPhoto4 from '../assets/Abdiel&azul-extra-photos - 4.jpeg'
import artistsGarden from '../assets/monet-artists-garden.png'
import waterLilies from '../assets/monet-water-lilies.png'

export function PhotoGallerySection() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Group 1 Card: Photo Horizon, Extra Photo #4, and Yellow Flowers */}
      <div
        className="relative bg-white rounded-2xl p-4 sm:p-8 border border-[var(--border-subtle)] shadow-[var(--shadow-card)] overflow-hidden transition-all duration-500 hover:shadow-[var(--shadow-hover)]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.95) 75%, rgba(255, 255, 255, 1) 100%), url(${artistsGarden})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center">
          {/* Photo Horizon (Portrait - Anchored object-bottom) */}
          <div className="w-full">
            <div className="relative rounded-xl overflow-hidden shadow-[var(--shadow-card)] border border-[var(--border-subtle)] aspect-[3/4] w-full group bg-[var(--surface-tint)]">
              <img
                src={photoHorizon}
                alt="Abdiel & Esmeralda mirando al horizonte"
                className="w-full h-full object-cover object-bottom transform group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(27,38,30,0.25)] via-transparent to-transparent opacity-70" />
            </div>
          </div>

          {/* Extra Photo #4 (Portrait - Anchored object-bottom) */}
          <div className="w-full">
            <div className="relative rounded-xl overflow-hidden shadow-[var(--shadow-card)] border border-[var(--border-subtle)] aspect-[3/4] w-full group bg-[var(--surface-tint)]">
              <img
                src={extraPhoto4}
                alt="Abdiel & Esmeralda"
                className="w-full h-full object-cover object-bottom transform group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(27,38,30,0.25)] via-transparent to-transparent opacity-70" />
            </div>
          </div>

          {/* Yellow Flowers Photo (Portrait/Square framing) */}
          <div className="w-full">
            <div className="relative rounded-xl overflow-hidden shadow-[var(--shadow-card)] border border-[var(--border-subtle)] aspect-[3/4] w-full group bg-[var(--surface-tint)]">
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

export function ExtraPhotoGallerySection() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Group 2 Card: Extra Photos #1, #2, and #3 */}
      <div
        className="relative bg-white rounded-2xl p-4 sm:p-8 border border-[var(--border-subtle)] shadow-[var(--shadow-card)] overflow-hidden transition-all duration-500 hover:shadow-[var(--shadow-hover)]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.95) 75%, rgba(255, 255, 255, 1) 100%), url(${waterLilies})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
          {/* Photo #1 (Portrait) */}
          <div className="md:col-span-5 w-full">
            <div className="relative rounded-xl overflow-hidden shadow-[var(--shadow-card)] border border-[var(--border-subtle)] aspect-[3/4] sm:aspect-[4/5] w-full group bg-[var(--surface-tint)]">
              <img
                src={extraPhoto1}
                alt="Abdiel & Esmeralda"
                className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(27,38,30,0.25)] via-transparent to-transparent opacity-70" />
            </div>
          </div>

          {/* Photos #2 & #3 Column (Landscapes) */}
          <div className="md:col-span-7 w-full flex flex-col gap-4 sm:gap-6">
            {/* Photo #2 */}
            <div className="relative rounded-xl overflow-hidden shadow-[var(--shadow-card)] border border-[var(--border-subtle)] aspect-[16/10] w-full group bg-[var(--surface-tint)]">
              <img
                src={extraPhoto2}
                alt="Abdiel & Esmeralda"
                className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(27,38,30,0.25)] via-transparent to-transparent opacity-70" />
            </div>

            {/* Photo #3 */}
            <div className="relative rounded-xl overflow-hidden shadow-[var(--shadow-card)] border border-[var(--border-subtle)] aspect-[16/10] w-full group bg-[var(--surface-tint)]">
              <img
                src={extraPhoto3}
                alt="Abdiel & Esmeralda"
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
