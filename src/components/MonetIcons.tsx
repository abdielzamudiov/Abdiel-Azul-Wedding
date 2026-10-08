import type { SVGProps } from 'react'

export function WaterLilyMotif(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="120"
      height="40"
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Central Water Lily Blossom */}
      <path
        d="M60 6C60 6 56 16 48 20C54 20 58 24 60 30C62 24 66 20 72 20C64 16 60 6 60 6Z"
        fill="var(--color-blush)"
        opacity="0.85"
      />
      <path
        d="M60 10C60 10 54 18 45 20C52 22 56 25 60 31C64 25 68 22 75 20C66 18 60 10 60 10Z"
        fill="var(--color-primrose)"
        opacity="0.9"
      />
      {/* Leaves / Pads */}
      <path
        d="M45 22C35 22 25 25 15 28C25 31 40 29 48 24Z"
        fill="var(--color-sage)"
        opacity="0.7"
      />
      <path
        d="M75 22C85 22 95 25 105 28C95 31 80 29 72 24Z"
        fill="var(--color-sage)"
        opacity="0.7"
      />
      {/* Accent Stems / Water Ripples */}
      <path
        d="M30 32C45 34 75 34 90 32"
        stroke="var(--color-periwinkle)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M10 36C40 38 80 38 110 36"
        stroke="var(--color-sage)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <circle cx="60" cy="18" r="2.5" fill="var(--color-moss)" opacity="0.8" />
    </svg>
  )
}

export function BotanicalCorner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 2C2 22 10 40 40 40M2 2C22 2 40 10 40 40"
        stroke="var(--color-sage)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Leaves */}
      <path
        d="M12 12C8 18 10 26 18 28C20 20 18 14 12 12Z"
        fill="var(--color-sage)"
        opacity="0.5"
      />
      <path
        d="M24 6C18 10 16 18 22 22C26 16 26 10 24 6Z"
        fill="var(--color-moss)"
        opacity="0.4"
      />
      <path
        d="M6 24C10 18 18 16 22 22C16 26 10 26 6 24Z"
        fill="var(--color-periwinkle)"
        opacity="0.5"
      />
      {/* Small Floral Dot */}
      <circle cx="28" cy="28" r="3" fill="var(--color-blush)" opacity="0.7" />
    </svg>
  )
}

export function ChurchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2v4M10 4h4" />
      <path d="M18 10V6L12 3 6 6v4" />
      <path d="M4 10v11h16V10" />
      <path d="M10 21v-5a2 2 0 0 1 4 0v5" />
    </svg>
  )
}

export function GlassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 22h8M12 15v7M8.5 2h7l-1 8a4 4 0 0 1-8 0z" />
      <path d="M6 6h12" opacity="0.5" />
    </svg>
  )
}

export function MusicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

export function RingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
      <path d="M12 7l1-2 2 1" />
    </svg>
  )
}

export function UtensilsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2v20M18 2a4 4 0 0 0-4 4v4h4" />
      <path d="M6 2v7a3 3 0 0 0 3 3v10" />
      <path d="M10 2v7" />
      <path d="M6 2v4" />
    </svg>
  )
}

export function DanceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="4" r="2" />
      <path d="M9 20l3-7 3 7M6 10l6 2 6-2M12 12v4" />
    </svg>
  )
}

export function SparklesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z" />
      <path d="M19 17l1 2.3 2.3 1-2.3 1-1 2.3-1-2.3-2.3-1 2.3-1z" opacity="0.6" />
    </svg>
  )
}

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export function LocationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
    </svg>
  )
}

export function DressCodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3a2 2 0 0 0-2 2c0 .74.4 1.39 1 1.73V8L4.5 13.5a1.5 1.5 0 0 0 1 2.5H6v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5h.5a1.5 1.5 0 0 0 1-2.5L13 8V6.73A2.001 2.001 0 0 0 12 3z" />
    </svg>
  )
}

export function GiftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

export function BankIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  )
}

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export function AudioWaveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="6" y1="10" x2="6" y2="14" />
      <line x1="10" y1="6" x2="10" y2="18" />
      <line x1="14" y1="8" x2="14" y2="16" />
      <line x1="18" y1="11" x2="18" y2="13" />
    </svg>
  )
}

export function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function CameraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

export function EnvelopeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
