import workHistory from "../config/workhistory";
import testimonials from "../config/testimonials";

// src/pages/WorkHistory.jsx
export default function WorkHistory() {
  return (
    <main className="page work-history-page">
      <header className="page-header">
        <h1>Work History</h1>
        <p className="page-subtitle">
          A look at the roles I’ve held and the teams I’ve worked with.
        </p>
      </header>

      <section className="work-section">
        {workHistory.map((job, index) => (
          <div key={index} className="work-entry">
            <h2>
              {job.title}{" "}
              {job.company ? (
                <>
                  – {job.company}
                </>
              ) : null}
            </h2>
            {job.dates && <p className="work-dates">{job.dates}</p>}
            {job.summary && <p>{job.summary}</p>}
            {job.bullets && job.bullets.length > 0 && (
              <ul>
                {job.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      <section className="testimonial-section">
        <h2>What People Are Saying</h2>
        <div className="testimonial-row">
          {testimonials.map((t, index) => (
            <article key={index} className="testimonial-card">
              {t.image && (
                <img
                  src={t.image}
                  alt={t.name ? `${t.name} photo` : "Testimonial"}
                  className="testimonial-photo"
                />
              )}
              {t.name && <h3>{t.name}</h3>}
              {t.title && <p className="testimonial-title">{t.title}</p>}
              {t.qoute && (
                <p className="testimonial-quote">
                  “{t.qoute}”
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}