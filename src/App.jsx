import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Overview from "./pages/about/Overview";
import Mission from "./pages/about/Mission";
import Founder from "./pages/about/Founder";
import Team from "./pages/about/Team";
import AboutCertifications from "./pages/about/Certifications";
import FireFighting from "./pages/systems/FireFighting";
import FireAlarm from "./pages/systems/FireAlarm";
import VoiceEvacuation from "./pages/systems/VoiceEvacuation";
import EmergencyLighting from "./pages/systems/EmergencyLighting";
import Elv from "./pages/systems/Elv";
import SmokeManagement from "./pages/systems/SmokeManagement";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import CatalogStyleScope from "./components/CatalogStyleScope";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about/overview" element={<Overview />} />
        <Route path="/about/mission" element={<Mission />} />
        <Route path="/about/founder" element={<Founder />} />
        <Route path="/about/team" element={<Team />} />
        <Route path="/about/certifications" element={<AboutCertifications />} />
        <Route path="/systems/fire-fighting" element={<FireFighting />} />
        <Route path="/systems/fire-alarm" element={<FireAlarm />} />
        <Route path="/systems/voice-evacuation" element={<VoiceEvacuation />} />
        <Route path="/systems/emergency-lighting" element={<EmergencyLighting />} />
        <Route path="/systems/elv" element={<Elv />} />
        <Route path="/systems/smoke-management" element={<SmokeManagement />} />
        <Route path="/products" element={<CatalogStyleScope><Products /></CatalogStyleScope>} />
        <Route path="/product/:id" element={<CatalogStyleScope><ProductDetail /></CatalogStyleScope>} />
        <Route path="/projects" element={<CatalogStyleScope><Projects /></CatalogStyleScope>} />
        <Route path="/projects/:slug" element={<CatalogStyleScope><ProjectDetail /></CatalogStyleScope>} />
        <Route path="/careers" element={<CatalogStyleScope><Careers /></CatalogStyleScope>} />
        <Route path="/contact" element={<CatalogStyleScope><Contact /></CatalogStyleScope>} />
      </Route>
    </Routes>
  );
}
