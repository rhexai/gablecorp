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
        <div className="min-h-screen bg-[#f8fafc]">
            {/* Sidebar - Overlay on mobile, fixed on desktop */}
            <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex flex-col min-h-screen md:pl-64">
                {/* Header - Fixed but width adjusted for sidebar */}
                <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                {/* Main Content Area */}
                <main className="flex-1 w-full max-w-7xl mx-auto py-8 px-4 md:px-8 pt-28">
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
