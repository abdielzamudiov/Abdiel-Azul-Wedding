import './App.css'
import RsvpForm, { type RsvpResponse } from './components/RsvpForm'

const sampleGuests = [
  { id: 'guest-1', name: 'María López', status: 'accepted' as const },
  { id: 'guest-2', name: 'Carlos López', status: null },
  { id: 'guest-3', name: 'Sofía López', status: 'rejected' as const },
]

function App() {
  function handleRsvpSubmit(response: RsvpResponse) {
    console.log('RSVP response:', response)
  }

  return (
    <main className="invitation">
      <div className="invitation__overlay" aria-hidden="true" />
      <section className="invitation__message" aria-labelledby="invitation-title">
        <p className="invitation__eyebrow">Con mucho amor</p>
        <h1 id="invitation-title">Esta es mi invitación</h1>
        <p className="invitation__subtitle">Para celebrar juntos un momento especial</p>
        <span className="invitation__ornament" aria-hidden="true">✦</span>
      </section>
      <RsvpForm
        invitationId="sample-invitation"
        guestCount={sampleGuests.length}
        guests={sampleGuests}
        responseDeadlinePassed={false}
        onSubmit={handleRsvpSubmit}
      />
    </main>
  )
}

export default App
