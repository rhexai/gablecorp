'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function DashboardPage() {
    const { user, isLoaded } = useUser();
    const [syncStatus, setSyncStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        if (isLoaded && user) {
            // Trigger sync
            fetch('/api/auth/sync')
                .then((res) => {
                    if (res.ok) setSyncStatus('success');
                    else setSyncStatus('error');
                })
                .catch(() => setSyncStatus('error'));
        }
    }, [isLoaded, user]);

    if (!isLoaded) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-serif text-navy-900 mb-4">
                        Welcome back, {user?.firstName || 'User'}
                    </h1>
                    <p className="text-gray-600">
                        Access your exclusive insights and manage your account.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Account Status Card */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-navy-900 mb-4">Account Status</h2>
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-3 h-3 rounded-full ${syncStatus === 'success' ? 'bg-green-500' : syncStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                            <span className="text-sm text-gray-600">
                                {syncStatus === 'success' ? 'System Synced' : syncStatus === 'error' ? 'Sync Failed' : 'Syncing...'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Your profile is active and connected to our secure platform.
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-navy-900 mb-4">Quick Actions</h2>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/insights" className="text-blue-600 hover:underline">Browse Latest Insights</Link>
                            </li>
                            <li>
                                <Link href="/capabilities" className="text-blue-600 hover:underline">Explore Capabilities</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
