import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-serif font-bold text-navy-900 mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Create Post Card */}
                <Link href="/admin/posts/new" className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                    <h3 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-blue-600">Create New Post</h3>
                    <p className="text-gray-500">Write and publish new insights to the blog.</p>
                </Link>

                {/* Manage Users Card */}
                <Link href="/admin/users" className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                    <h3 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-blue-600">Manage Users</h3>
                    <p className="text-gray-500">View registered users and manage admin access.</p>
                </Link>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">Recent Activity</h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                    No recent activity to show.
                </div>
            </div>
        </div>
    );
}
