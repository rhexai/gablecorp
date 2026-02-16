export default function FeaturedInsights() {
    return (
        <section id="insights" className="py-24 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-medium text-navy-900">
                        Featured Insights
                    </h2>
                    <button className="hidden md:flex items-center text-blue-600 font-semibold hover:underline">
                        View all insights
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="group cursor-pointer">
                        <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                                alt="AI Analytics"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Article</span>
                        <h3 className="text-2xl font-serif font-medium text-navy-900 mt-3 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                            The economic potential of generative AI: The next productivity frontier
                        </h3>
                        <p className="text-gray-600 line-clamp-3">
                            Generative AI is poised to unleash the next wave of productivity. We estimate it could add trillions of dollars in value into the global economy.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="group cursor-pointer">
                        <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                                alt="Digital Strategy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Report</span>
                        <h3 className="text-2xl font-serif font-medium text-navy-900 mt-3 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                            Rewired: Outcompeting in the age of digital and AI
                        </h3>
                        <p className="text-gray-600 line-clamp-3">
                            Successful digital transformations are rare. Our latest research reveals the six capabilities that allow companies to beat the odds and generate value.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="group cursor-pointer">
                        <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1507207611509-9807c37799ba?q=80&w=2070&auto=format&fit=crop"
                                alt="Sustainability"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Perspective</span>
                        <h3 className="text-2xl font-serif font-medium text-navy-900 mt-3 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                            Sustainability: The net-zero transition
                        </h3>
                        <p className="text-gray-600 line-clamp-3">
                            What it would cost, what it could bring. A detailed look at the economic transformation needed to achieve net-zero emissions by 2050.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
