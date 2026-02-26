import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Spotlight from "../components/Spotlight";
import HowWeHelp from "../components/HowWeHelp";
import FeaturedInsights from "../components/FeaturedInsights";
import FeaturedMedia from "../components/FeaturedMedia";
import CareersCTA from "../components/CareersCTA";
import ImpactBanner from "../components/ImpactBanner";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-white min-h-screen w-full overflow-x-hidden relative">
      <Navbar />
      <Hero />
      <Spotlight />
      <HowWeHelp />
      <FeaturedInsights />
      <FeaturedMedia />
      <CareersCTA />
      <ImpactBanner />
      <Footer />
    </main>
  );
}
