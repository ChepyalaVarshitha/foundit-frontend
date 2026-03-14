import "./Home.css";

export default function Home() {
  return (
    <main className="home-container">
      <section className="hero">
        <h2>Welcome to the Lost & Found Portal</h2>
        <p>Easily report, search and recover lost items</p>

        <div className="cta-row">
          <a className="btn" href="/report-lost">Report Lost</a>
          <a className="btn" href="/report-found">Report Found</a>
        </div>

        <div className="recent">
          <a className="btn secondary" href="/search">Recently Added Items</a>
        </div>
      </section>
    </main>
  );
}
