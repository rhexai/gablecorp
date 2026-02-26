import Link from "next/link";

export default function Spotlight() {
    return (
        <section className="bg-navy-950 text-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2">
                {/* Left Content */}
                <div className="p-8 md:p-12 lg:p-20 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6 md:mb-8">
                        What's your next <br />
                        <span className="text-blue-400">strategic leap?</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 font-light mb-8 md:mb-10 leading-relaxed max-w-lg">
                        Game-changing work. People-powered growth. At Gablecorp, we help you think bigger, build stronger, and expand opportunity for all.
                    </p>
                    <Link href="/capabilities" className="group flex items-center gap-4 text-lg font-semibold hover:text-blue-400 transition-colors">
                        <span className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-600/10 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </span>
                        See how we help clients
                    </Link>
                </div>

                {/* Right Content - Full Image/Feature */}
                <div className="relative min-h-[400px] lg:h-auto group cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2672&auto=format&fit=crop"
                        alt="Strategic Leap"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/10 transition-colors duration-500" />

                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-navy-950/90 to-transparent">
                        <span className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-2 block">Featured Report</span>
                        <h3 className="text-2xl md:text-3xl font-serif font-medium leading-snug mb-4 group-hover:text-blue-300 transition-colors">
                            Global Private Markets Report 2026: <br />
                            Clearer view, tougher terrain.
                        </h3>
                        <div className="w-12 h-1 bg-white group-hover:w-full group-hover:bg-blue-500 transition-all duration-500" />
                    </div>
                </div>
            </div>
        </section>
    );
}
