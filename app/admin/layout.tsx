'use client';

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        async function checkRole() {
            if (!isLoaded) return;

            if (!user) {
                router.push('/sign-in');
                return;
            }

            const supabase = createClient();
            const { data, error } = await supabase
                .from('users')
                .select('role')
                .eq('id', user.id)
                .single();

            if (error || !data || data.role !== 'admin') {
                router.push('/dashboard'); // Not authorized
            } else {
                setIsAuthorized(true);
            }
            setChecking(false);
        }

        checkRole();
    }, [user, isLoaded, router]);

    if (checking) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-500">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (!isAuthorized) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-navy-900 text-white flex-shrink-0 hidden md:block">
                <div className="p-6">
                    <h2 className="text-2xl font-serif font-bold">Admin</h2>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <a href="/admin" className="block px-4 py-2 rounded hover:bg-navy-800 transition-colors">Dashboard</a>
                    <a href="/admin/posts/new" className="block px-4 py-2 rounded hover:bg-navy-800 transition-colors">Create Post</a>
                    <a href="/admin/users" className="block px-4 py-2 rounded hover:bg-navy-800 transition-colors">Manage Users</a>
                    <a href="/" className="block px-4 py-2 rounded hover:bg-navy-800 transition-colors text-gray-400 mt-8">Back to Site</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
