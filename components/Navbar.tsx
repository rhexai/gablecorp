"use client";

import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

import { useUser } from "@clerk/nextjs";

function AdminLink() {
    const { user } = useUser();

    if (!user) return null;

    const superAdminEmail = process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL?.toLowerCase();
    const isSuperAdmin = user.emailAddresses.some(
        (email) => email.emailAddress.toLowerCase() === superAdminEmail
    );
    const isAdmin = user.publicMetadata?.role === 'admin';

    if (isSuperAdmin || isAdmin) {
        return (
            <Link href="/admin" className="text-[15px] font-medium text-navy-900 font-bold hover:text-blue-600 transition-colors">
                Admin
            </Link>
        );
    }
    return null;
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen]);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen ? "bg-white border-b border-gray-100 shadow-sm" : "bg-white/90 backdrop-blur-md border-b border-gray-100/50"}`}>
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex flex-col justify-center z-50 relative">
                    <Image
                        src="/images/logo.png"
                        alt="Gablecorp Logo"
                        width={180}
                        height={180}
                        className="h-24 w-auto object-contain group-hover:opacity-80 transition-opacity"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    <SignedIn>
                        <Link href="/dashboard" className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">
                            Dashboard
                        </Link>
                        {/* 
                             ideally we'd check roles here, but client-side role checking 
                            should be consistent with server-side. For now, we can link both 
                            or hide 'Admin' if not appropriate. 
                            Since we can't easily access ENV vars or Metadata synchronously in client components without hooks:
                            We'll link both and let the middleware/layout handle access control.
                            However, to be cleaner, we should use the useUser hook.
                        */}
                        <AdminLink />
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
                    <Link href="https://scriptlabs.gablecorp.com" target="_blank" className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        Scriptlabs Digital
                    </Link>
                    <Link href="https://miva.gablecorp.com" target="_blank" className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        Miva
                    </Link>
                    <Link href="/careers" className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        Careers
                    </Link>
                </div>

                {/* Desktop Action */}
                <div className="hidden md:flex items-center gap-6">
                    <SignedOut>
                        <Link href="/sign-in" className="text-gray-600 font-semibold text-sm hover:text-blue-600 transition-colors">
                            Sign In
                        </Link>
                        <Link href="/sign-up" className="bg-blue-600 text-white px-5 py-2.5 rounded hover:bg-blue-700 transition-colors text-sm font-semibold">
                            Sign Up
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden z-50 flex items-center gap-4">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-navy-900 p-2 focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col h-full pt-28 px-6 pb-12 overflow-y-auto">
                    <nav className="flex flex-col gap-8 text-2xl font-serif text-navy-900">
                        <SignedIn>
                            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="border-b border-gray-100 pb-4 hover:text-blue-600 transition-colors">
                                Dashboard
                            </Link>
                            <div onClick={() => setIsMenuOpen(false)} className="border-b border-gray-100 pb-4">
                                <AdminLink />
                            </div>
                        </SignedIn>
                        <Link href="/capabilities" onClick={() => setIsMenuOpen(false)} className="border-b border-gray-100 pb-4 hover:text-blue-600 transition-colors">
                            Capabilities
                        </Link>
                        <Link href="/industries" onClick={() => setIsMenuOpen(false)} className="border-b border-gray-100 pb-4 hover:text-blue-600 transition-colors">
                            Industries
                        </Link>
                        <Link href="/insights" onClick={() => setIsMenuOpen(false)} className="border-b border-gray-100 pb-4 hover:text-blue-600 transition-colors">
                            Insights
                        </Link>
                        <Link href="https://scriptlabs.gablecorp.com" target="_blank" onClick={() => setIsMenuOpen(false)} className="border-b border-gray-100 pb-4 hover:text-blue-600 transition-colors">
                            Scriptlabs Digital
                        </Link>
                        <Link href="https://miva.gablecorp.com" target="_blank" onClick={() => setIsMenuOpen(false)} className="border-b border-gray-100 pb-4 hover:text-blue-600 transition-colors">
                            Miva
                        </Link>
                        <Link href="/careers" onClick={() => setIsMenuOpen(false)} className="border-b border-gray-100 pb-4 hover:text-blue-600 transition-colors">
                            Careers
                        </Link>
                    </nav>

                    <div className="mt-auto flex flex-col gap-4">
                        <SignedOut>
                            <Link href="/sign-in" onClick={() => setIsMenuOpen(false)} className="w-full py-4 border border-blue-600 text-blue-600 text-center font-semibold rounded hover:bg-blue-50 transition-colors text-lg">
                                Sign In
                            </Link>
                            <Link href="/sign-up" onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-blue-600 text-white text-center font-semibold rounded hover:bg-blue-700 transition-colors text-lg">
                                Sign Up
                            </Link>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </nav>
    );
}
