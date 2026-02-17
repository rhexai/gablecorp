import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "../../lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await currentUser();
    if (!user) redirect("/sign-in");

    const supabase = await createClient();

    // Fetch saved posts
    const { data: savedItems } = await supabase
        .from('saved_posts')
        .select('post_id, posts(id, title, slug, category, created_at)')
        .eq('user_id', user.id);

    // Fetch recommended posts (random for now, or latest)
    const { data: recommended } = await supabase
        .from('posts')
        .select('id, title, slug, category')
        .limit(3)
        .order('created_at', { ascending: false });

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-3xl font-serif text-navy-900 mb-2">Welcome back, {user?.firstName}</h1>
                <p className="text-gray-600">This is your personal dashboard.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Saved & Account */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Saved Insights */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-serif font-bold text-navy-900">My Reading List</h2>
                            <Link href="/insights" className="text-sm text-blue-600 font-medium hover:underline">Browse Insights</Link>
                        </div>

                        {savedItems && savedItems.length > 0 ? (
                            <div className="space-y-4">
                                {savedItems.map((item: any) => (
                                    <div key={item.posts.id} className="group block border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{item.posts.category}</div>
                                                <Link href={`/insights/${item.posts.slug}`}>
                                                    <h3 className="font-bold text-lg text-navy-900 group-hover:text-blue-600 transition-colors">{item.posts.title}</h3>
                                                </Link>
                                                <p className="text-xs text-gray-400 mt-1">Saved on {new Date(item.posts.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <Link
                                                href={`/insights/${item.posts.slug}`}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-gray-50 rounded">
                                <p className="text-gray-500 italic mb-2">You haven't saved any insights yet.</p>
                                <Link href="/insights" className="text-blue-600 text-sm font-medium hover:underline">Explore Insights</Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Recommended & Account */}
                <div className="space-y-8">
                    {/* Account Details */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-lg font-serif font-bold text-navy-900 mb-4">Account Details</h2>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                                <div className="truncate flex-1">
                                    <p className="font-medium text-navy-900">{user?.fullName}</p>
                                    <p className="text-xs text-gray-400 truncate">{user?.emailAddresses[0].emailAddress}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommended */}
                    <div className="bg-navy-900 text-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-lg font-serif font-bold mb-4">Recommended for You</h2>
                        <div className="space-y-4">
                            {recommended?.map((post) => (
                                <Link key={post.id} href={`/insights/${post.slug}`} className="block group">
                                    <div className="text-xs text-blue-400 font-bold uppercase mb-1">{post.category}</div>
                                    <h3 className="font-medium group-hover:text-blue-300 transition-colors leading-snug">{post.title}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
