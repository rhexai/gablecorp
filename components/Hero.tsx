import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative h-[85vh] w-full flex items-center overflow-hidden bg-navy-900">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')", // Corporate/Skyscraper abstract
                }}
            >
                <div className="absolute inset-0 bg-navy-900/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/40 to-transparent" />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full pt-20">
                <div className="max-w-3xl animate-[fade-in-up_0.8s_ease-out_forwards]">
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-white leading-tight mb-8">
                        Accelerating sustainable <br />
                        and inclusive growth.
                    </h1>

                    <p className="text-xl text-gray-200 max-w-2xl mb-10 font-light leading-relaxed">
                        We help the world's leading organizations build inclusive and sustainable growth.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <SignedIn>
                            <Link href="/dashboard" className="w-fit px-8 py-4 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
                                Go to Dashboard
                            </Link>
                        </SignedIn>
                        <SignedOut>
                            <Link href="/sign-up" className="w-fit px-8 py-4 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
                                Get Started
                            </Link>
                        </SignedOut>

                        <Link href="/capabilities" className="w-fit px-8 py-4 bg-transparent border border-white text-white font-semibold hover:bg-white hover:text-navy-900 transition-colors">
                            Explore capabilities
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
