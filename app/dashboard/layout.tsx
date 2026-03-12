import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardHeader from "../../components/DashboardHeader";

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
        <div className="flex flex-col min-h-screen bg-gray-50">
            <DashboardHeader />

            {/* Main Content */}
            <div className="flex-1 flex max-w-[1400px] mx-auto w-full pt-16">
                <DashboardSidebar />
                <main className="flex-1 py-8 md:py-12 px-6 md:px-12 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
