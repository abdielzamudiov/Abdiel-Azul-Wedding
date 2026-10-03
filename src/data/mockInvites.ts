export type GuestStatus = 'accepted' | 'rejected' | null

export interface Guest {
  id: string
  name: string
  status: GuestStatus
}

export interface Invitation {
  id: string
  name: string
  guests: Guest[]
}

export const initialInvitations: Invitation[] = [
  {
    id: 'inv-001',
    name: 'Familia López',
    guests: [
      { id: 'guest-1', name: 'María López', status: 'accepted' },
      { id: 'guest-2', name: 'Carlos López', status: null },
      { id: 'guest-3', name: 'Sofía López', status: 'rejected' },
    ],
  },
  {
    id: 'inv-002',
    name: 'Casa García',
    guests: [
      { id: 'guest-4', name: 'Laura García', status: 'accepted' },
      { id: 'guest-5', name: 'Emilio García', status: 'accepted' },
      { id: 'guest-6', name: 'Pablo García', status: null },
    ],
  },
]
