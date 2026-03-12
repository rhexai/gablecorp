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

    // Fetch user orders
    const { data: userOrders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    // Fetch user payments
    const { data: userPayments } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('payment_date', { ascending: false });

    // Generate Engagements from Orders
    const engagements = (userOrders || [])
        .filter(order => order.availability) // Only orders where they requested a call time
        .map(order => ({
            id: order.id,
            display_id: order.display_id,
            title: `Onboarding: ${order.package}`,
            type: order.preferred_channel || "Video Call",
            date: new Date(order.availability).toLocaleString(),
            status: new Date(order.availability) > new Date() ? "Upcoming" : "Completed",
            agent: order.assigned_agent
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div>
            <div className="mb-10 bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-8 lg:p-10 shadow-lg text-white relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-10 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase text-blue-200 mb-4 border border-white/10">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-3 tracking-tight">
                            Welcome back, <span className="text-blue-300">{user?.firstName}</span>
                        </h1>
                        <p className="text-blue-100 text-lg max-w-xl font-light">
                            Here's what's happening with your business today. Access your active services, track engagements, and discover new growth opportunities.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Orders, Payments, Engagements */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Orders Widget */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-serif font-bold text-navy-900">Recent Orders</h2>
                            <Link href="#" className="text-sm text-blue-600 font-medium hover:underline">View All</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">Order ID</th>
                                        <th className="px-4 py-3 font-semibold">Package</th>
                                        <th className="px-4 py-3 font-semibold">Agent</th>
                                        <th className="px-4 py-3 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userOrders && userOrders.length > 0 ? userOrders.map((order: any) => (
                                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 py-4 font-medium text-navy-900">{order.display_id}</td>
                                            <td className="px-4 py-4">
                                                <div className="font-medium text-navy-900">{order.package}</div>
                                                <div className="text-xs text-gray-400 capitalize">{order.service_slug}</div>
                                            </td>
                                            <td className="px-4 py-4 text-gray-600">{order.assigned_agent || "Pending"}</td>
                                            <td className="px-4 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    )) : null}
                                </tbody>
                            </table>
                        </div>
                        {(!userOrders || userOrders.length === 0) && (
                            <div className="text-center py-6 text-gray-500 text-sm">No orders found.</div>
                        )}
                    </div>

                    {/* Engagements Widget */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-serif font-bold text-navy-900">Engagements & Calls</h2>
                        </div>
                        <div className="space-y-4">
                            {engagements.length > 0 ? engagements.map((engagement) => (
                                <Link href={`/dashboard/orders/${engagement.display_id}`} key={engagement.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-300 hover:shadow-sm transition-all bg-gray-50/50 cursor-pointer group">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-navy-900 text-sm group-hover:text-blue-600 transition-colors">{engagement.title}</h3>
                                            <p className="text-xs text-gray-500 mt-1">{engagement.date} • {engagement.type}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${engagement.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {engagement.status}
                                    </span>
                                </Link>
                            )) : (
                                <div className="text-center py-4 text-gray-500 text-sm">No recorded engagements.</div>
                            )}
                        </div>
                    </div>

                    {/* Payments Widget */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-serif font-bold text-navy-900">Recent Payments</h2>
                            <Link href="#" className="text-sm text-blue-600 font-medium hover:underline">Billing History</Link>
                        </div>
                        <div className="space-y-4">
                            {userPayments && userPayments.length > 0 ? userPayments.map((payment: any) => (
                                <div key={payment.id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-bold text-navy-900 text-sm">{payment.currency} {parseFloat(payment.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{new Date(payment.payment_date).toLocaleDateString()} • {payment.method}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${payment.status === 'Paid' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                        {payment.status}
                                    </span>
                                </div>
                            )) : (
                                <div className="text-center py-4 text-gray-500 text-sm">No recent payments.</div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Right Column: Account & Saved */}
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

                    {/* Saved Insights (Mini) */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-serif font-bold text-navy-900">Reading List</h2>
                            <Link href="/insights" className="text-xs text-blue-600 hover:underline">View All</Link>
                        </div>
                        {savedItems && savedItems.length > 0 ? (
                            <div className="space-y-3">
                                {savedItems.slice(0, 3).map((item: any) => (
                                    <Link key={item.posts.id} href={`/insights/${item.posts.slug}`} className="block group">
                                        <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-0.5">{item.posts.category}</div>
                                        <h3 className="font-medium text-sm text-navy-900 group-hover:text-blue-600 transition-colors leading-snug">{item.posts.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-gray-500">No saved insights.</p>
                        )}
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
