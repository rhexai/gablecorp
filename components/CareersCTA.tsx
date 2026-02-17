import Link from "next/link";

export default function CareersCTA() {
    return (
        <section className="bg-white">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2">
                {/* Text Side */}
                <div className="p-12 md:p-24 flex flex-col justify-center bg-gray-50 lg:bg-white order-2 lg:order-1">
                    <h2 className="text-4xl md:text-5xl font-serif text-navy-900 mb-8 leading-tight">
                        Looking for your <br />
                        <span className="text-blue-600">next move?</span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                        We look for people who are energized by the same things as our clients: bold thinking, real impact, and the courage to move first.
                    </p>
                    <Link href="/careers" className="w-fit bg-blue-600 text-white font-bold py-4 px-8 rounded hover:bg-navy-900 transition-colors">
                        Explore Careers
                    </Link>
                </div>

                {/* Image Side */}
                <div className="aspect-video lg:aspect-auto relative lg:h-full min-h-[400px] order-1 lg:order-2">
                    <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
                        alt="Gablecorp Employee"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
