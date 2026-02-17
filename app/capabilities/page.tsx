import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { capabilities } from '../../lib/data';

export default function CapabilitiesPage() {
    return (
        <main className="bg-white min-h-screen flex flex-col">
            <Navbar />

            {/* Header */}
            <section className="bg-navy-900 pt-32 pb-20 px-6 md:px-12 text-white">
                <div className="max-w-[1400px] mx-auto">
                    <h1 className="text-5xl md:text-6xl font-serif mb-6">Capabilities</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
                        We help clients build capabilities, leadership, and organization to sustain change.
                    </p>
                </div>
            </section>

            {/* List */}
            <section className="py-20 px-6 md:px-12 flex-grow">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {capabilities.map((item, index) => (
                        <Link href={`/capabilities/${item.slug}`} key={index} className="group block">
                            <div className="h-0.5 w-12 bg-gray-300 mb-6 group-hover:bg-blue-600 transition-colors" />
                            <h2 className="text-2xl font-serif font-bold text-navy-900 mb-4 group-hover:text-blue-600 transition-colors">
                                {item.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {item.description}
                            </p>
                            <div className="flex items-center text-blue-600 font-medium group-hover:underline">
                                Learn more
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
