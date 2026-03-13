"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const services = [
    { name: "BPO", href: "/dashboard/services/bpo" },
    { name: "Accounting & Tax", href: "/dashboard/services/accounting" },
    { name: "Marketing", href: "/dashboard/services/marketing" },
    { name: "Creative Design", href: "/dashboard/services/creative" },
    { name: "Software Implementation", href: "/dashboard/services/software" },
    { name: "Incorporation", href: "/dashboard/services/incorporation" },
    { name: "Consultancy", href: "/dashboard/services/consultancy" },
];

export default function DashboardSidebar({ isOpen, setIsOpen }: { isOpen?: boolean, setIsOpen?: (val: boolean) => void }) {
    const pathname = usePathname();
    const { user } = useUser();
    
    // Collapsible states
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
    const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);

    const toggleMenu = (name: string) => {
        setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: <svg width="16" height="16" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
        { name: "Services", href: "#", hasChevron: true, isServices: true, icon: <svg width="16" height="16" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg> },
        { name: "Orders", href: "/dashboard", icon: <svg width="16" height="16" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg> },
        { name: "Payments", href: "/dashboard", icon: <svg width="16" height="16" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V4.22c0-.756-.728-1.296-1.453-1.096A60.864 60.864 0 012.25 5.25v13.5z" /></svg> },
        { name: "Insights", href: "/insights", icon: <svg width="16" height="16" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h10.5m-10.5-6h10.5m-10.5-3h10.5m-10.5 12h10.5m-9-14c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg> },
    ];
    return (
        <aside className={`
            w-64 bg-white flex-shrink-0 flex flex-col h-screen fixed top-0 left-0 border-r border-gray-100/60 z-40 transition-transform duration-300 ease-in-out md:translate-x-0
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
            {/* Top Company Switcher (REFINED) */}
            <div className="p-4 relative">
                <div 
                    onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                    className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100/50 cursor-pointer hover:bg-gray-50 transition-all group overflow-hidden"
                >
                    <div className="relative w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 border border-gray-200 shadow-sm overflow-hidden">
                        {user?.imageUrl ? (
                            <Image 
                                src={user.imageUrl} 
                                alt="" 
                                fill 
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-400">G</div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#1e8636] leading-none mb-1">GH-92383</p>
                        <p className="text-xs font-black text-navy-900 truncate">Gablecorp</p>
                    </div>
                    <svg width="12" height="12" className={`w-3 h-3 text-gray-300 group-hover:text-gray-400 transition-transform ${isCompanyDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>

                {/* Company Switcher Dropdown */}
                {isCompanyDropdownOpen && (
                    <div className="absolute top-20 left-4 right-4 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 mb-1">
                            <p className="text-xs font-bold text-navy-900">Scriptlabs Digital</p>
                            <p className="text-[10px] text-gray-400">GH-102933</p>
                        </div>
                        <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                            <p className="text-xs font-bold text-gray-400">+ Add Business</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-2 flex flex-col gap-1 hide-scrollbar">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.isServices && pathname.startsWith("/dashboard/services"));
                    
                    return (
                        <div key={item.name} className="px-3">
                            <button
                                onClick={item.hasChevron ? () => toggleMenu(item.name) : undefined}
                                className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                                    isActive
                                        ? "bg-[#e8f5e9] text-[#1e8636] shadow-sm shadow-[#1e8636]/5"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                {item.hasChevron && (
                                    <svg 
                                        width="10"
                                        height="10"
                                        className={`transition-transform flex-shrink-0 ${openMenus[item.name] ? 'rotate-90' : ''} ${isActive ? "text-[#1e8636]" : "text-gray-300 group-hover:text-gray-400"}`} 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor" 
                                        strokeWidth={3}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                )}
                                <span className={`flex-1 text-sm font-medium tracking-tight text-left ${item.hasChevron ? 'ml-0.5' : ''}`}>{item.name}</span>
                            </button>

                            {/* Nested Services Submenu (DROP DOWN ANIMATION) */}
                            {item.isServices && (
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus[item.name] ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                                    <div className="ml-10 flex flex-col gap-1 border-l-2 border-gray-100 pl-3 py-1">
                                        {services.map((service) => (
                                            <Link
                                                key={service.name}
                                                href={service.href}
                                                className={`py-2 px-3 text-xs rounded-md transition-colors ${
                                                    pathname.startsWith(service.href)
                                                        ? "text-[#1e8636] font-semibold bg-[#e8f5e9]/50"
                                                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                                                }`}
                                            >
                                                {service.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Bottom Section */}
            <div className="p-4 mt-auto border-t border-gray-50 space-y-3 relative">
                <button className="w-full bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-900 hover:to-purple-700 text-white rounded-full py-3 px-4 shadow-lg shadow-purple-500/30 font-medium text-sm flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]">
                    <span>CFOAI ✨</span>
                </button>
                
                <Link href="#" className="flex items-center gap-3 px-4 py-2 bg-[#f0f9f1] rounded-lg text-[#1e8636] hover:bg-[#e6f4e8] transition-colors relative mt-4">
                    <svg width="16" height="16" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25z" />
                    </svg>
                    <span className="text-sm font-medium">Built Apps</span>
                </Link>

                <div className="flex flex-col gap-1 px-3">
                    <Link href="#" className="flex items-center gap-3 px-1 py-1.5 text-gray-500 hover:text-gray-800 transition-colors">
                        <svg width="16" height="16" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0M3.75 18H7.5m-3-6h15m-3 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                        </svg>
                        <span className="text-xs font-medium">Settings</span>
                    </Link>
                    <button className="hidden sm:block px-4 py-1.5 bg-[#e8f5e9] text-[#1e8636] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#dcfce7] transition-colors">
                        Upgrade
                    </button>
                    <button className="flex items-center justify-between w-full px-1 py-1.5 text-gray-500 hover:text-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                            <svg width="16" height="16" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <span className="text-xs font-medium">More</span>
                        </div>
                        <svg width="10" height="10" className="w-2.5 h-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* Global Styles for hiding scrollbar specifically in the sidebar to match design */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </aside>
    );
}
