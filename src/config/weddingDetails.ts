export interface ItineraryConfigItem {
  time: string
  title: string
  subtitle: string
  location?: string
  description?: string
  icon: 'church' | 'glass' | 'music' | 'rings' | 'utensils' | 'dance' | 'sparkles' | 'heart' | 'moon'
}

export const WEDDING_DETAILS = {
  // Couple Information
  brideName: 'Esmeralda',
  groomName: 'Abdiel',
  coupleNames: 'Abdiel & Esmeralda',

  // Event Date & Time
  targetDateISO: '2026-11-30T17:00:00', // Used for Countdown Timer
  dateString: 'Lunes, 30 de Noviembre de 2026',
  timeString: '17:00 HRS',
  rsvpDeadlineString: '1 de Noviembre de 2026',

  // Background Music Configuration
  // Put an MP3 file path here (e.g., '/music/cancion-boda.mp3') or leave empty to use ambient piano synth
  musicUrl: '/Akasa Requiem Theme.mp3',
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
    '«Las muchas aguas no podrán apagar el amor, ni lo ahogarán los ríos. El amor es paciente, es bondadoso, todo lo sufre, todo lo cree, todo lo espera, todo lo soporta. El amor nunca deja de ser.»',
  quoteSource: '1 Corintios 13:4-8 | Cantares 8:7',

  // Family & Padrinos
  brideParents: 'Cuahutemoc Crespo & Lourdes Pacheco',
  groomParents: 'Eliu Zamudio & Raquel Vaquereño',
  godParents: '',

  // Event Itinerary / Schedule
  itinerarySubtitle: 'El itinerario de nuestro gran día',
  itineraryTitle: 'Programa del Evento',
  itinerary: [
    {
      time: '17:00 HRS',
      title: 'Ceremonia Religiosa',
      subtitle: 'Discurso Bíblico & Promesas',
      location: 'Jardín Belcanto',
      description:
        'Un emotivo momento para bendecir nuestra unión ante Dios y compartir nuestras promesas junto a nuestros seres queridos.',
      icon: 'rings',
    },
    {
      time: '18:30 HRS',
      title: 'Banquete & Cena de Gala',
      subtitle: 'Gastronomía Sinaloense',
      location: 'Jardín Belcanto',
      description:
        'Disfrutaremos un exquisito banquete tradicional con nuestro especial platillo de Barbacoa Sinaloense y cócteles de bienvenida.',
      icon: 'utensils',
    },
    {
      time: '19:00 HRS',
      title: 'Vals de los Novios',
      subtitle: 'Íntimo Vals de Esposos',
      location: 'Jardín Belcanto',
      description:
        'Acompáñanos a presenciar nuestro primer vals como esposos, iluminados bajo la magia del atardecer en los jardines.',
      icon: 'heart',
    },
    {
      time: '19:15 HRS',
      title: 'Pista de Baile',
      subtitle: 'Música en Vivo & Celebración',
      location: 'Jardín Belcanto',
      description:
        '¡Es momento de celebrar! La pista de baile se abre para disfrutar de excelente música, alegría y diversión juntos.',
      icon: 'dance',
    },
    {
      time: '23:00 HRS',
      title: 'Palabras de Agradecimiento & Cierre',
      subtitle: 'Mensaje Especial & Despedida',
      location: 'Jardín Belcanto',
      description:
        'Palabras de agradecimiento de los novios a todos los invitados por acompañarnos, y cierre con broche de oro de una noche inolvidable.',
      icon: 'moon',
    },
  ] as ItineraryConfigItem[],

  // Dress Code
  dressCodeTitle: 'Garden Formal Nocturno / Etiqueta Jardín de Noche',
  dressCodeNote:
    'Nuestra boda se celebrará al aire libre por la tarde-noche. Les sugerimos vestimenta formal en tonos inspirados en un jardín nocturno (púrpura, lavanda crepúsculo, azul noche, ciruela, eucalipto) o tonos pastel suaves.',
  dressCodeWarning: '🌸 Les pedimos amablemente reservar los tonos blanco, marfil y beige exclusivamente para la novia.',

  // Gift Registry & Bank Accounts
  giftMessage:
    '«El mejor regalo que podemos recibir en este día tan especial es su presencia y compañía. Sin embargo, si es su deseo hacernos un obsequio, les compartimos nuestras opciones de preferencia:»',
  registryUrl: 'https://mesaderegalos.liverpool.com.mx/milistaderegalos/60053817',
  bankName: 'Banamex México',
  accountHolder: 'Eliu Abdiel Zamudio Vaquereño',
  accountNumber: '', // Leave empty string if you only want to show CLABE number
  clabeNumber: '002744702115935295',
}
