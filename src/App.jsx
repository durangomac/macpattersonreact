import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import WorkHistory from "./pages/WorkHistory";
import Portfolio from "./pages/Portfolio";
import Socials from "./pages/Socials";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="workhistory" element={<WorkHistory />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="socials" element={<Socials />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
