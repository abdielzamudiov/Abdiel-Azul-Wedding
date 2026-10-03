function HomePage() {
  return (
    <main className="page-shell">
      <div className="page-shell__overlay" aria-hidden="true" />
      <section className="page-shell__content page-shell__content--intro" aria-labelledby="home-title">
        <p className="page-shell__eyebrow">Nuestra historia</p>
        <h1 id="home-title">Bienvenidos</h1>
        <p className="page-shell__subtitle">Este es el espacio central de la invitación.</p>
      </section>
    </main>
  )
}

export default HomePage
