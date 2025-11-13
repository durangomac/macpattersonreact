import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import "./Layout.css";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileNav = () => setMobileOpen(false);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-logo">MP</span>
          <span className="brand-name">Mac Patterson</span>
        </div>

        {/* Hamburger button (shown on mobile via CSS) */}
        <button
          className={"nav-toggle" + (mobileOpen ? " nav-toggle--open" : "")}
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <span className="nav-toggle-arrow" aria-hidden="true">
              →
            </span>
          ) : (
            <>
              <span />
              <span />
              <span />
            </>
          )}
        </button>

        {/* Nav acts inline on desktop, drawer on mobile */}
        <nav
          className={"main-nav" + (mobileOpen ? " main-nav--open" : "")}
          onClick={closeMobileNav}
        >
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/workhistory">Work History</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/socials">Socials</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {mobileOpen && <div className="nav-backdrop" onClick={closeMobileNav} />}
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <SocialLinks compact highlightOnly />
        <p>© {new Date().getFullYear()} Mac Patterson</p>
      </footer>
    </div>
  );
}
