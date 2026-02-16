const services = [
    {
        title: "Digital Transformation",
        description: "Reimagining business processes through the lens of modern technology.",
        icon: (
            <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        title: "AI Strategy",
        description: "Leveraging artificial intelligence to unlock new value streams and efficiency.",
        icon: (
            <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: "Cloud Infrastructure",
        description: "Building scalable, improved, and secure cloud-native architectures.",
        icon: (
            <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        ),
    },
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-navy-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-semibold text-cyan-400 tracking-widest uppercase mb-3">Our Expertise</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Architecting the <span className="text-cyan-400">Future</span>
                    </h3>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        We provide deep technical expertise combined with strategic business insight to solve complex challenges.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl bg-navy-800 border border-navy-700 hover:border-cyan-500/30 transition-all duration-300 hover:bg-navy-800/80 hover:shadow-2xl hover:shadow-cyan-500/10"
                        >
                            <div className="mb-6 p-4 rounded-xl bg-navy-950 w-fit group-hover:scale-110 transition-transform duration-300 border border-navy-700">
                                {service.icon}
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                                {service.title}
                            </h4>
                            <p className="text-slate-400 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
