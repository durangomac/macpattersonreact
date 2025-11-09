import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-logo">MP</span>
          <span className="brand-name">Mac Patterson</span>
        </div>
        <nav className="main-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/socials">Socials</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        © {new Date().getFullYear()} Mac Patterson
      </footer>
    </div>
  );
}
