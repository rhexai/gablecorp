import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Capabilities from "../components/Capabilities";
import FeaturedInsights from "../components/FeaturedInsights";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedInsights />
      <Capabilities />

      {/* Careers / Values Section - Text Heavy, Editorial Style */}
      <section id="careers" className="py-24 bg-navy-900 text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              Come to Gablecorp to do your best work.
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              We are a global community of people who are passionate about solving the world's most complex problems. We are looking for exceptional talent to join our team.
            </p>
            <button className="text-white border-b border-white pb-1 font-medium hover:text-blue-400 hover:border-blue-400 transition-colors">
              Search careers
            </button>
          </div>
          {/* Visual spacer or image could go here */}
        </div>
      </section>

      <Footer />
    </main>
  );
}
