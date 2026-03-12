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
    const totalOrders = userOrders?.length || 0;
    const activeOrders = userOrders?.filter(o => o.status === 'Active').length || 0;
    const totalPaymentsAmount = userPayments?.reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;
    const upcomingEngagements = engagements.filter(e => e.status === 'Upcoming').length;

    return (
        <div className="flex flex-col gap-8 pb-12">
            {/* Tier 1: Performance Section (RESTORED) */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-navy-900 tracking-tight">Business Performance for {new Date().toLocaleString('default', { month: 'long', year: 'numeric'})}</h1>
                    <div className="flex gap-2">
                        <select className="bg-white border border-gray-200 text-gray-700 text-xs rounded-lg p-2 font-semibold shadow-sm focus:ring-1 focus:ring-green-500 transition-all outline-none">
                            <option>March</option>
                        </select>
                        <select className="bg-white border border-gray-200 text-gray-700 text-xs rounded-lg p-2 font-semibold shadow-sm focus:ring-1 focus:ring-green-500 transition-all outline-none">
                            <option>2026</option>
                        </select>
                    </div>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Metrics & Chart Card */}
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col transition-all hover:shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                            <div className="space-y-2 border-r border-gray-50 pr-4">
                                <p className="text-[10px] uppercase tracking-widest font-black text-gray-400">Total Orders</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-blue-600">{totalOrders}</span>
                                    <span className="text-xs text-green-500 font-bold">↑ 12%</span>
                                </div>
                            </div>
                            <div className="space-y-2 border-r border-gray-50 pr-4">
                                <p className="text-[10px] uppercase tracking-widest font-black text-gray-400">Pending Calls</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-orange-500">{upcomingEngagements}</span>
                                    <span className="text-xs text-gray-300 font-bold">Stable</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] uppercase tracking-widest font-black text-gray-400">Total Paid</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-[#1e8636]">₵{(totalPaymentsAmount / 1000).toFixed(1)}K</span>
                                    <span className="text-xs text-green-500 font-bold">↑ 8%</span>
                                </div>
                            </div>
                        </div>

                        {/* Polished Bar Chart Area */}
                        <div className="flex-1 border-t border-gray-50 pt-8 relative min-h-[220px]">
                            <div className="absolute inset-x-0 bottom-0 h-full flex items-end justify-around px-12 opacity-30 pointer-events-none pb-4">
                                <div className="w-12 h-[30%] bg-blue-100 rounded-t-lg transition-all hover:bg-blue-200" />
                                <div className="w-12 h-[50%] bg-blue-100 rounded-t-lg" />
                                <div className="w-12 h-[85%] bg-green-100 rounded-t-lg" />
                                <div className="w-12 h-[65%] bg-green-100 rounded-t-lg" />
                                <div className="w-12 h-[45%] bg-orange-100 rounded-t-lg" />
                            </div>
                            <div className="flex flex-col-reverse justify-between h-[180px] text-[10px] font-black text-gray-300 uppercase tracking-tighter pb-2">
                                <span>₵5.0K</span>
                                <span>₵2.5K</span>
                                <span>₵0.0</span>
                            </div>
                            <div className="absolute top-8 right-0 flex gap-2">
                                <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                                    <svg width="16" height="16" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0M3.75 18H7.5m-3-6h15m-3 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Growth Panel */}
                    <div className="w-full lg:w-96 flex flex-col gap-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col transition-all hover:shadow-md h-full">
                            <div className="flex w-full bg-gray-50 rounded-xl p-1 mb-8">
                                <button className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest bg-white shadow-sm rounded-lg text-navy-900">Metrics</button>
                                <button className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-navy-900">Activity</button>
                            </div>

                            <div className="flex-1 space-y-8">
                                {[
                                    { label: "Active Orders", value: activeOrders, total: totalOrders, color: "bg-blue-500" },
                                    { label: "Payment Success", value: "₵" + totalPaymentsAmount.toLocaleString(), total: "100%", color: "bg-[#1e8636]" },
                                    { label: "Pending Calls", value: upcomingEngagements, total: engagements.length, color: "bg-orange-400" },
                                ].map((item) => (
                                    <div key={item.label}>
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                                            <span>{item.label}: {item.value}</span>
                                            <span>{item.total}</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                            <div className={`h-full ${item.color}`} style={{ width: '70%' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <button className="mt-8 py-3 w-full rounded-xl border border-blue-100 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group">
                                Deep Insights
                                <svg width="10" height="10" className="w-2.5 h-2.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tier 2: 3-Column Activity Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all hover:shadow-md">
                    <h2 className="text-sm font-black uppercase tracking-widest text-navy-900 mb-8">Recent Orders</h2>
                    <div className="space-y-8">
                        {(userOrders || []).slice(0, 3).map((order: any) => (
                            <div key={order.id} className="flex gap-4 items-start group cursor-pointer">
                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100 group-hover:bg-blue-50 transition-colors">
                                    <svg width="20" height="20" className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-navy-900 group-hover:text-blue-600 transition-colors truncate">{order.package}</p>
                                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter mt-0.5">{order.status} • {order.display_id}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Calls */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all hover:shadow-md flex flex-col">
                    <h2 className="text-sm font-black uppercase tracking-widest text-navy-900 mb-8">Engagements</h2>
                    <div className="flex-1 space-y-6">
                        {upcomingEngagements === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                                    <svg width="24" height="24" className="w-6 h-6 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
                                </div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No scheduled calls</p>
                            </div>
                        ) : (
                            engagements.slice(0, 3).map(eng => (
                                <Link href={`/dashboard/orders/${eng.display_id}`} key={eng.id} className="block group">
                                    <p className="text-sm font-bold text-navy-900 group-hover:text-orange-500 transition-colors">{eng.title}</p>
                                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter mt-1">{eng.date}</p>
                                </Link>
                            ))
                        )}
                    </div>
                    <Link href="/dashboard/services/accounting" className="mt-8 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1e8636] hover:underline">
                        Book a session
                    </Link>
                </div>

                {/* Payment History */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all hover:shadow-md">
                    <h2 className="text-sm font-black uppercase tracking-widest text-navy-900 mb-8">Payments</h2>
                    <div className="space-y-6">
                        {(userPayments || []).slice(0, 4).map((payment: any) => (
                            <div key={payment.id} className="flex justify-between items-center group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className={`h-1.5 w-1.5 rounded-full ${payment.status === 'Paid' ? 'bg-[#1e8636]' : 'bg-orange-400'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-navy-900 transition-colors">{payment.method}</span>
                                </div>
                                <span className="text-sm font-bold text-navy-900">₵{parseFloat(payment.amount).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tier 3: Summary Tabs (RESTORED) */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 transition-all hover:shadow-md">
                <h2 className="text-xl font-bold text-navy-900 mb-2 tracking-tight">Orders & Business Assets</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-12">Detailed view of your engagements</p>

                <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50 mb-16 overflow-x-auto whitespace-nowrap hide-scrollbar">
                    <button className="pb-4 border-b-2 border-[#1e8636] text-[#1e8636] px-8 transition-all">Orders</button>
                    <button className="pb-4 border-b-2 border-transparent px-8 hover:text-navy-900 transition-all">Engagements</button>
                    <button className="pb-4 border-b-2 border-transparent px-8 hover:text-navy-900 transition-all">Reading List</button>
                    <button className="pb-4 border-b-2 border-transparent px-8 hover:text-navy-900 transition-all">Account</button>
                </div>

                <div className="flex flex-col items-center justify-center py-12">
                    <h1 className="text-7xl font-bold text-[#1e8636] tracking-tighter mb-4">{totalOrders}</h1>
                    <p className="text-sm font-black uppercase tracking-[0.3em] text-gray-400 mb-12">Active Engagements</p>
                    
                    <div className="w-full max-w-2xl bg-gray-50 rounded-2xl p-6 flex justify-between items-center group cursor-pointer border border-transparent hover:border-green-100 transition-all">
                        <div className="flex items-center gap-5">
                            <div className="h-12 w-12 rounded-full bg-[#1e8636] flex items-center justify-center text-white font-black text-sm shadow-xl shadow-green-900/10">
                                FO
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-navy-900 group-hover:text-[#1e8636] transition-colors">First Project Initialized</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-0.5">Automated System Entry</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-navy-900">₵{(totalPaymentsAmount / 1000).toFixed(1)}K</p>
                            <p className="text-[10px] uppercase font-black tracking-widest text-[#1e8636] mt-0.5">Value Locked</p>
                        </div>
                    </div>

                    <button className="mt-16 inline-flex items-center gap-3 py-3 px-8 rounded-full bg-navy-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-navy-800 transition-all shadow-xl shadow-navy-900/20">
                        View All Details
                        <svg width="10" height="10" className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                    </button>
                </div>
            </section>
        </div>
    );
}
