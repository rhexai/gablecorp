import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 pt-24 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
                {children}
            </main>

            <Footer />
        </div>
    );
}
