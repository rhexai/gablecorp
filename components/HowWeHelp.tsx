import Link from "next/link";

export default function HowWeHelp() {
    return (
        <section className="bg-navy-900 text-white py-24">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">How We Help Clients</span>
                    <h2 className="text-3xl md:text-5xl font-serif mt-4 mb-6">
                        Let's turn your biggest opportunities <br />
                        into your next big moves.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="group">
                        <div className="overflow-hidden aspect-[16/9] mb-6 rounded bg-navy-800">
                            <img
                                src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
                                alt="Industry Expertise"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors flex items-center">
                            Industry expertise
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Deep industry insights and knowledge based on 100 years of CEO counseling.
                        </p>
                        <Link href="/industries" className="text-sm font-bold text-white uppercase tracking-wider border-b border-transparent group-hover:border-blue-400 transition-all">Explore Industries</Link>
                    </div>

                    {/* Card 2 */}
                    <div className="group">
                        <div className="overflow-hidden aspect-[16/9] mb-6 rounded bg-navy-800">
                            <img
                                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                                alt="Capabilities"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors flex items-center">
                            Capabilities
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Practical experience and know-how on transforming how organizations work.
                        </p>
                        <Link href="/capabilities" className="text-sm font-bold text-white uppercase tracking-wider border-b border-transparent group-hover:border-blue-400 transition-all">Explore Capabilities</Link>
                    </div>

                    {/* Card 3 */}
                    <div className="group">
                        <div className="overflow-hidden aspect-[16/9] mb-6 rounded bg-navy-800">
                            <img
                                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
                                alt="Tech & AI"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors flex items-center">
                            Tech & AI
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            We help clients unlock the power of AI at scale, modernize technology delivery, and build new businesses.
                        </p>
                        <Link href="/capabilities/digital-analytics" className="text-sm font-bold text-white uppercase tracking-wider border-b border-transparent group-hover:border-blue-400 transition-all">Explore Tech</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
