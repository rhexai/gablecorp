import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

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
                    <SignedIn>
                        <Link href="/dashboard" className="text-[15px] font-medium text-gray-900 font-bold hover:text-blue-600 transition-colors">
                            Dashboard
                        </Link>
                    </SignedIn>
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
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="hidden md:block text-blue-600 font-semibold text-sm hover:underline">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <div className="md:hidden">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-navy-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
}
