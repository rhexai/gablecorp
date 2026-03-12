"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";

export default function DashboardHeader() {
    const { user } = useUser();
    
    return (
        <header className="fixed top-0 right-0 left-0 md:left-64 z-40 bg-white/80 backdrop-blur-md h-20 flex items-center justify-between px-8 transition-all border-b border-gray-100/60">
            <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-navy-900 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

            {/* Centered Search and Actions */}
            <div className="flex-1 max-w-2xl mx-auto flex items-center gap-4 px-8">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search Scriptlabs Digital (Gablecorp)"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-transparent rounded-lg text-[13px] focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-navy-900 placeholder-gray-400 font-medium"
                    />
                </div>
                
                <button className="hidden lg:flex items-center gap-3 px-4 py-2 text-blue-600 bg-white border border-blue-200 rounded-lg text-xs font-bold transition-all hover:bg-blue-50/50 shadow-sm group">
                    <div className="flex items-center gap-2">
                        <svg width="16" height="16" className="w-4 h-4 text-blue-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="uppercase tracking-tight">Create New</span>
                    </div>
                    <svg width="10" height="10" className="w-2.5 h-2.5 text-blue-300 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>

            {/* Right Side Icons & Avatar */}
            <div className="flex items-center justify-end gap-5">
                <button className="text-gray-400 hover:text-navy-900 transition-colors relative">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                </button>
                
                <button className="hidden sm:block px-4 py-1.5 bg-[#e8f5e9] text-[#1e8636] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#dcfce7] transition-colors">
                    Upgrade
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-100 group cursor-pointer">
                    <div className="flex items-center gap-2">
                        <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-8 h-8 rounded-lg" } }} />
                        <span className="hidden xl:block text-xs font-bold text-navy-900 truncate max-w-[100px]">
                            {user?.firstName || "User"}
                        </span>
                    </div>
                    <svg width="10" height="10" className="w-2.5 h-2.5 text-gray-300 group-hover:text-navy-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
        </header>
    );
}
