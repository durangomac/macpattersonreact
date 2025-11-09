import { socials } from "../config/socials";

export default function Socials() {
  return (
    <section className="page">
      <h1>Socials</h1>
      <p>
        Here are the best places to find me online. I keep this list up to date in
        a single config file so it stays consistent across the site.
      </p>

      <ul className="social-list">
        {socials.map((social) => (
          <li key={social.id}>
            <a href={social.href} target="_blank" rel="noreferrer">
              <strong>{social.label}</strong>
              {social.handle ? (
                <span style={{ marginLeft: "0.35rem", opacity: 0.8 }}>
                  {social.handle}
                </span>
              ) : null}
            </a>
            {social.category ? (
              <span style={{ marginLeft: "0.5rem", fontSize: "0.8rem", opacity: 0.7 }}>
                ({social.category})
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
