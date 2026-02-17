import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Image from 'next/image';

export default function OurFirmPage() {
    return (
        <main className="bg-white min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-navy-900/40 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                    alt="Corporate Building"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="relative z-20 text-center text-white px-6">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Our Firm</h1>
                    <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
                        We help organizations across the private, public, and social sectors create the change that matters most to them.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 px-6 md:px-12 bg-white">
                <div className="max-w-[1000px] mx-auto text-center">
                    <h2 className="text-3xl font-serif font-bold text-navy-900 mb-8">Our Mission</h2>
                    <p className="text-2xl text-gray-700 leading-relaxed font-light">
                        "To help our clients make distinctive, lasting, and substantial improvements in their performance and to build a great firm that attracts, develops, excites, and retains exceptional people."
                    </p>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 px-6 md:px-12 bg-gray-50">
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="text-3xl font-serif font-bold text-navy-900 mb-16 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="bg-white p-10 shadow-sm border-t-4 border-blue-600">
                            <h3 className="text-xl font-bold text-navy-900 mb-4">Adhere to the highest professional standards</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We put client interests ahead of our own, observe high ethical standards, and preserve client confidences.
                            </p>
                        </div>
                        <div className="bg-white p-10 shadow-sm border-t-4 border-blue-600">
                            <h3 className="text-xl font-bold text-navy-900 mb-4">Improve our clients' performance significantly</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We follow the top-management approach and bring innovations in management practice to clients.
                            </p>
                        </div>
                        <div className="bg-white p-10 shadow-sm border-t-4 border-blue-600">
                            <h3 className="text-xl font-bold text-navy-900 mb-4">Create an unrivaled environment for exceptional people</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We stay non-hierarchical and inclusive, upholding the obligation to dissent.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* History / Legacy */}
            <section className="py-24 px-6 md:px-12 bg-navy-900 text-white">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-serif font-bold mb-6">A Legacy of Impact</h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            Founded in 2024, Gablecorp has grown from a single office to a global firm. We have helped the world's leading organizations solve their toughest challenges.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            From the very beginning, we have been guided by a singular purpose: to help our clients make distinctive, lasting, and substantial improvements in their performance.
                        </p>
                    </div>
                    <div className="relative h-[400px] w-full bg-gray-800 rounded-lg overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop"
                            alt="Global Office"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
