export interface ItineraryConfigItem {
  time: string
  title: string
  subtitle: string
  location?: string
  description?: string
  icon: 'church' | 'glass' | 'music' | 'rings' | 'utensils' | 'dance' | 'sparkles' | 'heart' | 'moon' | 'camera'
}

export const WEDDING_DETAILS = {
  // Couple Information
  brideName: 'Esmeralda',
  groomName: 'Abdiel',
  coupleNames: 'Abdiel & Esmeralda',

  // Event Date & Time
  targetDateISO: '2026-11-30T16:30:00', // Used for Countdown Timer
  dateString: 'Lunes, 30 de Noviembre de 2026',
  timeString: '4:30 PM',
  rsvpDeadlineString: '1 de Noviembre de 2026',

  // Background Music Configuration
  // Put an MP3 file path here (e.g., '/music/cancion-boda.mp3') or leave empty to use ambient piano synth
  musicUrl: '/yourname-piano.mp3',
  musicAutoPlay: false, // Start music strictly when Ver Invitacion button is clicked

  // Venue & Google Maps Information
  venueName: 'Jardín Belcanto',
  address: 'Lib. 3 12100, Valle del Ejido, 82129 Mazatlán, Sin.',
  cityState: 'Mazatlán, Sin. México',
  googleMapsUrl: 'https://maps.app.goo.gl/gGmoLp54jFXd6ZFf7',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Jardin%20Belcanto%2C%20Lib.%203%2012100%2C%20Valle%20del%20Ejido%2C%2082129%20Mazatl%C3%A1n%2C%20Sin.&t=&z=16&ie=UTF8&iwloc=&output=embed',

  // Religious & Quote Details
  quoteText:
    '«El amor es paciente y bondadoso. Todo lo soporta, todo lo aguanta. El amor nunca falla.»',
  quoteSource: '1 Corintios 13:4, 7, 8',

  // Family & Padrinos
  brideParents: 'Cuahutemoc Crespo & Lourdes Pacheco',
  groomParents: 'Eliu Zamudio & Raquel Vaquereño',
  godParents: '',

  // Event Itinerary / Schedule
  itinerarySubtitle: 'El itinerario de nuestro gran día',
  itineraryTitle: 'Programa del Evento',
  itinerary: [
    {
      time: '4:30 PM',
      title: 'Discurso Biblico',
      subtitle: '& Votos Matrimoniales',
      location: 'Jardín Belcanto',
      description:
        '"Y una cuerda triple no se rompe fácilmente." — Eclesiastés 4:12',
      icon: 'rings',
    },
    {
      time: '5:30 PM',
      title: 'Fotos',
      subtitle: 'Sesión de Fotos con los Novios',
      location: 'Jardín Belcanto',
      description:
        'Un momento especial para tomar fotografías de recuerdo con los novios y nuestros seres queridos.',
      icon: 'camera',
    },
    {
      time: '6:00 PM',
      title: 'Banquete',
      subtitle: 'Cena & Bebidas',
      location: 'Jardín Belcanto',
      description:
        'Disfrutaremos un exquisito banquete tradicional de Barbacoa Sinaloense.',
      icon: 'utensils',
    },
    {
      time: '6:30 PM',
      title: 'Vals de los Novios',
      subtitle: 'Íntimo Vals de Esposos',
      location: 'Jardín Belcanto',
      description:
        'Acompáñanos a presenciar nuestro primer vals como esposos, un momento lleno de amor y emoción.',
      icon: 'heart',
    },
    {
      time: '6:35 PM',
      title: 'Pista de Baile',
      subtitle: 'Música en Vivo & Celebración',
      location: 'Jardín Belcanto',
      description:
        '¡Es momento de celebrar! La pista de baile se abre para disfrutar de excelente música, alegría y diversión juntos.',
      icon: 'dance',
    },
    {
      time: '11:00 PM',
      title: 'Palabras de Agradecimiento & Cierre',
      subtitle: 'Mensaje Especial & Despedida',
      location: 'Jardín Belcanto',
      description:
        'Palabras de agradecimiento de los novios a todos los invitados por acompañarnos, y cierre de una noche inolvidable.',
      icon: 'moon',
    },
  ] as ItineraryConfigItem[],

  // Dress Code
  dressCodeTitle: 'Formal Obligatorio / Etiqueta Jardín Nocturno',
  dressCodeNote:
    'Nuestra boda se celebrará al aire libre por la tarde-noche y la vestimenta es estrictamente formal. Les pedimos amablemente acudir con elegancia y recato (evitando minifaldas, prendas demasiado cortas o escotes muy pronunciados). Les sugerimos vestimenta formal en tonos inspirados en un jardín nocturno o tonos pastel suaves.',
  dressCodeWarning: '🌸 Les pedimos amablemente reservar los tonos blanco, marfil y beige exclusivamente para los novios.',

  // Gift Registry & Bank Accounts
  giftMessage:
    '«El mejor regalo que podemos recibir en este día tan especial es su presencia y compañía. Sin embargo, si es su deseo hacernos un obsequio, les compartimos nuestras opciones de preferencia:»',
  registryUrl: 'https://mesaderegalos.liverpool.com.mx/milistaderegalos/60053817',
  bankName: 'Banamex México',
  accountHolder: 'Eliu Abdiel Zamudio Vaquereño',
  accountNumber: '', // Leave empty string if you only want to show CLABE number
  clabeNumber: '002744702115935295',
}
