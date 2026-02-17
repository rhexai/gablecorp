import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 transition-all duration-300">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex flex-col justify-center">
                    <Image
                        src="/images/logo.png"
                        alt="Gablecorp Logo"
                        width={180}
                        height={180}
                        className="h-28 w-auto object-contain group-hover:opacity-80 transition-opacity"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    <Link href="/capabilities" className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        Capabilities
                    </Link>
                    <Link href="/industries" className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        Industries
                    </Link>
                    <Link href="/insights" className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        Insights
                    </Link>
                    <Link href="/careers" className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        Careers
                    </Link>
                </div>

                {/* Action / Mobile */}
                <div className="flex items-center gap-6">
                    <Link href="/signin" className="hidden md:block text-blue-600 font-semibold text-sm hover:underline">
                        Sign In
                    </Link>
                    <button className="md:hidden text-navy-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
