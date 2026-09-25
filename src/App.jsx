import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import CTASection from "./components/CTASection.jsx";
import Features from "./components/Features.jsx";
import Footer from "./components/Footer.jsx";
import Gallery from "./components/Gallery.jsx";
import Hero from "./components/Hero.jsx";
import MobileBottomCTA from "./components/MobileBottomCTA.jsx";
import Moments from "./components/Moments.jsx";
import Navbar from "./components/Navbar.jsx";
import ProductSection from "./components/ProductSection.jsx";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Lewati ke konten utama
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <ProductSection />
        <About />
        <Features />
        <Gallery />
        <Moments />
        <CTASection />
        <Contact />
      </main>

      <Footer />
      <MobileBottomCTA />
      {/* Menjaga baris terakhir halaman tetap bisa dibaca di balik CTA
          sticky pada mobile. */}
      <div className="sticky-spacer" aria-hidden="true" />
    </>
  );
}
