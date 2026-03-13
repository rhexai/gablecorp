"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar - Overlay on mobile, fixed on desktop */}
            <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content Wrapper - Takes up remaining width */}
            <div className="flex-1 flex flex-col min-h-screen min-w-0 md:ml-64 bg-white transition-all duration-300">
                {/* Header */}
                <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                {/* Main Content Area */}
                <main className="flex-1 w-full max-w-5xl mx-auto py-8 px-4 md:px-8 pt-28">
                    {children}
                </main>
            </div>
            
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-navy-900/20 backdrop-blur-sm z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
