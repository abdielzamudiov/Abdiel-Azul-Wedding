import './App.css'

function App() {
  return (
    <main className="invitation">
      <div className="invitation__overlay" aria-hidden="true" />
      <section className="invitation__message" aria-labelledby="invitation-title">
        <p className="invitation__eyebrow">Con mucho amor</p>
        <h1 id="invitation-title">Esta es mi invitación</h1>
        <p className="invitation__subtitle">Para celebrar juntos un momento especial</p>
        <span className="invitation__ornament" aria-hidden="true">✦</span>
      </section>
    </main>
  )
}

export default App
