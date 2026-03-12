import { createClient } from "../../../../lib/supabase/server";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const user = await currentUser();
    if (!user) redirect("/sign-in");

    const { id: displayId } = await params;
    const supabase = await createClient();

    const { data: order } = await supabase
        .from('orders')
        .select('*')
        .eq('display_id', displayId)
        .eq('user_id', user.id)
        .single();

    if (!order) {
        notFound();
    }

    const engagementDate = order.availability ? new Date(order.availability) : null;
    const isUpcoming = engagementDate && engagementDate > new Date();

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-8">
                <Link href="/dashboard" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
                    &larr; Back to Dashboard
                </Link>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-serif text-navy-900">Order Details: {order.display_id}</h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {order.status}
                    </span>
                </div>
                <p className="text-gray-500 mt-2">Placed on {new Date(order.created_at).toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Details */}
                <div className="md:col-span-2 space-y-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-navy-900 mb-4 border-b pb-2">Service Request</h2>
                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div>
                                <p className="text-gray-500 mb-1">Service Category</p>
                                <p className="font-medium text-navy-900 capitalize">{order.service_slug}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Selected Package</p>
                                <p className="font-medium text-navy-900">{order.package}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Company Name</p>
                                <p className="font-medium text-navy-900">{order.business_name || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Industry / Size</p>
                                <p className="font-medium text-navy-900">{order.industry || 'Unknown'} • {order.company_size || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-navy-900 mb-4 border-b pb-2">Contact Information</h2>
                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div>
                                <p className="text-gray-500 mb-1">Primary Contact</p>
                                <p className="font-medium text-navy-900">{order.contact_name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Email</p>
                                <p className="font-medium text-navy-900 truncate">{order.contact_email}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Phone</p>
                                <p className="font-medium text-navy-900">{order.contact_phone || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Preferred Channel</p>
                                <p className="font-medium text-navy-900">{order.preferred_channel || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Engagement Module */}
                    <div className={`rounded-xl shadow-sm border p-6 ${isUpcoming ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                        <h2 className="text-lg font-bold text-navy-900 mb-4">Onboarding Call</h2>
                        {engagementDate ? (
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isUpcoming ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-navy-900 leading-tight">
                                            {engagementDate.toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">{order.preferred_channel || 'Video'} Call</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-200/50">
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Assigned Agent</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-navy-900 font-bold border border-gray-200 shadow-sm flex-shrink-0">
                                            {order.assigned_agent ? order.assigned_agent.charAt(0) : '?'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-navy-900">{order.assigned_agent || 'Pending Assignment'}</p>
                                            {order.assigned_agent && (
                                                <div className="mt-1 space-y-0.5">
                                                    <a href={`mailto:${order.assigned_agent.replace(' ', '.').toLowerCase()}@gablecorp.com`} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                                            <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                                                            <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                                                        </svg>
                                                        {order.assigned_agent.split(' ')[0].toLowerCase()}@gablecorp.com
                                                    </a>
                                                    <a href="tel:+18005550199" className="text-xs text-gray-500 hover:text-navy-900 flex items-center gap-1 transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                                            <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.12 0-2.227-.123-3.3-.357A13.916 13.916 0 013.857 5.8a13.916 13.916 0 01-.357-3.3z" clipRule="evenodd" />
                                                        </svg>
                                                        +1 (800) 555-0199
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No onboarding call requested for this order.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
