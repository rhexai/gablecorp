const capabilities = [
    {
        title: "Strategy & Corporate Finance",
        description: "Building resilience and capturing value in a volatile global economy.",
    },
    {
        title: "Digital & Analytics",
        description: "Harnessing the power of data and AI to transform core operations.",
    },
    {
        title: "Sustainability",
        description: "Integrating environmental, social, and governance goals into business strategy.",
    },
    {
        title: "Transformation",
        description: "Driving holistic change to unlock potential and performance.",
    },
    {
        title: "Operations",
        description: "Optimizing supply chains and manufacturing for the next era of industry.",
    },
    {
        title: "Marketing & Sales",
        description: "Reimagining customer experiences to drive growth and loyalty.",
    },
];

export default function Capabilities() {
    return (
        <section id="capabilities" className="py-24 bg-gray-50">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-navy-900 mb-16">
                    Our Capabilities
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {capabilities.map((item, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="h-0.5 w-12 bg-gray-300 mb-6 group-hover:bg-blue-600 transition-colors" />
                            <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-[17px]">
                                {item.description}
                            </p>
                            <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300 font-medium">
                                Learn more
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
