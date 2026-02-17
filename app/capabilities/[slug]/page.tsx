import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { capabilities } from '../../../lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return capabilities.map((capability) => ({
        slug: capability.slug,
    }));
}

export default async function CapabilityPage({ params }: PageProps) {
    const { slug } = await params;
    const capability = capabilities.find((c) => c.slug === slug);

    if (!capability) {
        notFound();
    }

    return (
        <main className="bg-white min-h-screen flex flex-col">
            <Navbar />

            {/* Hero */}
            <section className="bg-navy-900 pt-32 pb-24 px-6 md:px-12 text-white">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-sm font-semibold text-blue-400 tracking-widest uppercase mb-4">Capability</div>
                    <h1 className="text-5xl md:text-7xl font-serif mb-8 max-w-4xl">{capability.title}</h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl font-light leading-relaxed">
                        {capability.description}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-24 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8">
                        <h2 className="text-3xl font-serif font-medium text-navy-900 mb-8">Overview</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-12">
                            {capability.longDescription}
                        </p>

                        <h3 className="text-2xl font-bold text-navy-900 mb-6">How we help clients</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {capability.features.map((feature, idx) => (
                                <div key={idx} className="p-6 bg-gray-50 border-l-4 border-blue-600 rounded-r-lg">
                                    <h4 className="font-bold text-navy-900 text-lg mb-2">{feature}</h4>
                                    <p className="text-gray-600 text-sm">We provide expert guidance and strategic implementation for {feature.toLowerCase()}.</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="bg-gray-50 p-8 rounded-lg sticky top-24">
                            <h3 className="text-xl font-bold text-navy-900 mb-6">Contact our {capability.title} practice</h3>
                            <p className="text-gray-600 mb-6">
                                Discuss your specific needs with our industry experts.
                            </p>
                            <Link href="/careers" className="block w-full text-center py-3 px-6 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors rounded">
                                Get in touch
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
