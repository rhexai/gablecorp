"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function DashboardHeader() {
    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm h-20 flex items-center justify-between px-6 lg:px-12 transition-all">
            <div className="flex items-center gap-6">
                <Link href="/dashboard" className="flex items-center group">
                    <Image
                        src="/images/logo.png"
                        alt="Gablecorp"
                        width={140}
                        height={46}
                        className="h-9 w-auto object-contain group-hover:opacity-80 transition-opacity"
                    />
                </Link>
                <div className="hidden md:flex items-center gap-3 border-l border-gray-200 pl-6 ml-2">
                    <span className="px-3 py-1 bg-navy-900/5 text-navy-900 text-xs font-bold tracking-widest uppercase rounded-full border border-navy-900/10">
                        Client Portal
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex flex-col items-end mr-2">
                    <span className="text-xs text-gray-400 font-medium">Hello there,</span>
                    <span className="text-sm font-bold text-navy-900">Let's build</span>
                </div>
                <div className="p-1 rounded-full border border-gray-100 hover:border-blue-200 transition-colors shadow-sm bg-white">
                    <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
                </div>
            </div>
        </header>
    );
}
