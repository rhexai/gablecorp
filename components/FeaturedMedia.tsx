import Link from "next/link";

export default function FeaturedMedia() {
    return (
        <section className="bg-blue-600 text-white py-16 md:py-24 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
                        The Gablecorp Podcast
                    </h2>
                    <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8 md:mb-10">
                        A shortcut to clarity in a noisy world, The Gablecorp Podcast dives into the ideas, issues, and innovations reshaping business, the economy, and society. Tune in to hear from Gablecorp experts and thought leaders.
                    </p>
                    <Link href="/insights" className="inline-flex items-center bg-white text-blue-600 font-bold py-4 px-8 rounded hover:bg-navy-900 hover:text-white transition-colors">
                        Listen here
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>

                <div className="relative">
                    {/* Visual representation of audio/media */}
                    <div className="aspect-square md:aspect-video lg:aspect-[4/3] bg-navy-900 rounded-lg overflow-hidden shadow-2xl relative group cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2670&auto=format&fit=crop"
                            alt="Podcast Episode"
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-white ml-1">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
                            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-2 block">Latest Episode</span>
                            <h3 className="text-2xl font-serif leading-tight">
                                Navigating the AI revolution in healthcare
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
