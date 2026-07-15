import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import Topics from "@/components/Topics";
import PreviewGallery from "@/components/PreviewGallery";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import StickyBuyBar from "@/components/StickyBuyBar";

export default function Home() {
  return (
    <main className="bg-slate-50">

      <Navbar />

      <Hero />

      <TrustBar />

      <About />

      <Topics />

      <PreviewGallery />

      <Pricing />

      <Reviews />

      <FAQ />

      <StickyBuyBar />

    </main>
  );
}