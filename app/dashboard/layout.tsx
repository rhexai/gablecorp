import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            {/* Sidebar - Fixed to screen edge */}
            <DashboardSidebar />

            <div className="flex flex-col min-h-screen md:pl-64">
                {/* Header - Fixed but width adjusted for sidebar */}
                <DashboardHeader />

                {/* Main Content Area */}
                <main className="flex-1 w-full max-w-7xl mx-auto py-8 px-4 md:px-8 pt-28">
                    {children}
                </main>
            </div>
        </div>
    );
}
