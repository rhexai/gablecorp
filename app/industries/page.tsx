import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { industries } from '../../lib/data';

export default function IndustriesPage() {
    return (
        <main className="bg-white min-h-screen flex flex-col">
            <Navbar />

            <section className="bg-navy-900 pt-32 pb-20 px-6 md:px-12 text-white">
                <div className="max-w-[1400px] mx-auto">
                    <h1 className="text-5xl md:text-6xl font-serif mb-6">Industries</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
                        Deep expertise across every major industry and sector.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6 md:px-12 flex-grow">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                        {industries.map((ind, index) => (
                            <Link href="#" key={index} className="group flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <span className="text-lg text-gray-700 group-hover:text-navy-900 font-medium">{ind}</span>
                                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
