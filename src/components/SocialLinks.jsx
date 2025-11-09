import { socials } from "../config/socials";

export default function SocialLinks({ compact = false, highlightOnly = false }) {
  const links = highlightOnly ? socials.filter((s) => s.highlight) : socials;

  return (
    <ul
      className={compact ? "social-links compact" : "social-links"}
      style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: "0.75rem" }}
    >
      {links.map((social) => (
        <li key={social.id}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#a5b4fc",
              textDecoration: "none",
              fontSize: compact ? "0.85rem" : "1rem",
            }}
          >
            {social.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
