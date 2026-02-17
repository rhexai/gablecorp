import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function CareersPage() {
    return (
        <main className="bg-white min-h-screen flex flex-col">
            <Navbar />

            <section className="bg-navy-900 pt-32 pb-20 px-6 md:px-12 text-white">
                <div className="max-w-[1400px] mx-auto">
                    <h1 className="text-5xl md:text-6xl font-serif mb-6">Careers</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
                        Join a global community of passionate people solving the world's most complex problems.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">Why Gablecorp?</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We believe in the power of people. We help our clients make lasting improvements to their performance and realize their most important goals. Over nearly a century, we’ve built a firm uniquely equipped to this task.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3">✓</span>
                                    <span className="text-navy-900">Work with the best talent in the world</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3">✓</span>
                                    <span className="text-navy-900">Solve critical problems that matter</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3">✓</span>
                                    <span className="text-navy-900">Unmatched professional development</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-8 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-navy-900 mb-4">Search Jobs</h3>
                            <div className="bg-white p-2 rounded flex shadow-sm mb-4">
                                <input type="text" placeholder="Keyword" className="flex-grow px-4 py-2 outline-none text-gray-700" />
                                <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium">Search</button>
                            </div>
                            <p className="text-sm text-gray-500">
                                Browse all open positions by role, location, or industry.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12">Life at Gablecorp</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group cursor-pointer">
                            <div className="aspect-video bg-gray-200 mb-4 rounded overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <h3 className="font-bold text-lg text-navy-900 mb-2">Inclusion & Diversity</h3>
                            <p className="text-gray-600 text-sm">Fostering an environment where everyone can thrive.</p>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="aspect-video bg-gray-200 mb-4 rounded overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <h3 className="font-bold text-lg text-navy-900 mb-2">Learning & Development</h3>
                            <p className="text-gray-600 text-sm">Continuous growth at every stage of your career.</p>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="aspect-video bg-gray-200 mb-4 rounded overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <h3 className="font-bold text-lg text-navy-900 mb-2">Social Impact</h3>
                            <p className="text-gray-600 text-sm">Making a difference in our communities.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
