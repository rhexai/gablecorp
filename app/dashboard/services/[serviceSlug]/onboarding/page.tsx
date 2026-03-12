"use client";

import { useState, use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function OnboardingPage({ params }: { params: Promise<{ serviceSlug: string }> }) {
    const { serviceSlug } = use(params);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pkg = searchParams.get("pkg") || "Custom Package";
    const { user } = useUser();

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successData, setSuccessData] = useState<any>(null);

    const [formData, setFormData] = useState({
        businessName: "",
        industry: "",
        size: "1-10",
        contactName: user?.fullName || "",
        contactEmail: user?.primaryEmailAddress?.emailAddress || "",
        contactPhone: "",
        preferredChannel: "Email",
        availability: "",
        signedIntent: false
    });

    const handleNext = () => setStep((s) => s + 1);
    const handleBack = () => setStep((s) => s - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.signedIntent) return alert("Please sign the buying intent document.");

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    serviceSlug,
                    package: pkg,
                    ...formData
                })
            });

            if (res.ok) {
                const data = await res.json();
                setSuccessData(data);
                setStep(5); // Success step
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting the order.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            {step < 5 && (
                <div className="mb-8">
                    <Link href={`/dashboard/services/${serviceSlug}`} className="text-sm text-blue-600 hover:underline mb-4 inline-block">
                        &larr; Back to Packages
                    </Link>
                    <h1 className="text-3xl font-serif text-navy-900 mb-2">Service Onboarding</h1>
                    <p className="text-gray-600">You are requesting the <strong>{pkg}</strong> package for <strong>{serviceSlug.toUpperCase()}</strong>.</p>
                </div>
            )}

            {/* Progress Bar */}
            {step < 5 && (
                <div className="flex items-center justify-between mb-8 relative">
                    <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-100 -z-10 rounded"></div>
                    <div className={`absolute left-0 top-1/2 h-1 bg-blue-600 -z-10 rounded transition-all`} style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
                    
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${step >= i ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-400'}`}>
                            {i}
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-navy-900 border-b pb-4">1. Business Details</h2>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                            <input 
                                type="text"
                                value={formData.businessName}
                                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                placeholder="e.g. Acme Corp"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                            <input 
                                type="text"
                                value={formData.industry}
                                onChange={(e) => setFormData({...formData, industry: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                placeholder="e.g. Technology, Retail"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                            <select 
                                value={formData.size}
                                onChange={(e) => setFormData({...formData, size: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white"
                            >
                                <option value="1-10">1-10 Employees</option>
                                <option value="11-50">11-50 Employees</option>
                                <option value="51-200">51-200 Employees</option>
                                <option value="201+">201+ Employees</option>
                            </select>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-navy-900 border-b pb-4">2. Contact Details</h2>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Contact Name</label>
                            <input 
                                type="text"
                                value={formData.contactName}
                                onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input 
                                type="email"
                                value={formData.contactEmail}
                                onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input 
                                type="tel"
                                value={formData.contactPhone}
                                onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-navy-900 border-b pb-4">3. Preferences</h2>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Communication Channel</label>
                            <div className="flex gap-4">
                                {["Email", "Phone", "WhatsApp", "Slack"].map((channel) => (
                                    <label key={channel} className={`flex-1 flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${formData.preferredChannel === channel ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-gray-200 hover:border-blue-300'}`}>
                                        <input 
                                            type="radio" 
                                            name="channel" 
                                            value={channel} 
                                            checked={formData.preferredChannel === channel}
                                            onChange={() => setFormData({...formData, preferredChannel: channel})}
                                            className="hidden"
                                        />
                                        {channel}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Availability for Onboarding Call</label>
                            <input 
                                type="datetime-local"
                                value={formData.availability}
                                onChange={(e) => setFormData({...formData, availability: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-2">We will try our best to accommodate this time, or send you calendar options.</p>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-navy-900 border-b pb-4">4. Review & Intent</h2>
                        
                        <div className="bg-gray-50 p-6 rounded-lg text-sm text-gray-700 space-y-4 mb-6">
                            <h3 className="font-bold text-lg text-navy-900 mb-2">Order Summary</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div><span className="font-medium">Service:</span> {serviceSlug.toUpperCase()}</div>
                                <div><span className="font-medium">Package:</span> {pkg}</div>
                                <div><span className="font-medium">Company:</span> {formData.businessName || 'N/A'}</div>
                                <div><span className="font-medium">Contact:</span> {formData.contactEmail}</div>
                                <div><span className="font-medium">Call Time:</span> {formData.availability ? new Date(formData.availability).toLocaleString() : 'TBD'}</div>
                            </div>
                        </div>

                        <div className="border p-4 rounded-lg bg-yellow-50 border-yellow-200">
                            <h4 className="font-bold text-yellow-800 mb-2">Buying Intent Declaration</h4>
                            <p className="text-sm text-yellow-700 mb-4">
                                By checking the box below, you declare your intent to procure the specified services from Gablecorp. This serves as a formal request to initiate the onboarding and contract creation process. A dedicated agent will be assigned to guide you through the final paperwork.
                            </p>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={formData.signedIntent}
                                    onChange={(e) => setFormData({...formData, signedIntent: e.target.checked})}
                                    className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-navy-900">
                                    I confirm my intent to purchase and agree to proceed with the onboarding call.
                                </span>
                            </label>
                        </div>
                    </div>
                )}

                {step === 5 && successData && (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-serif text-navy-900 mb-4">Order Received!</h2>
                        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                            Thank you for declaring your intent. Your order <strong className="text-navy-900">#{successData.orderId}</strong> has been logged.
                        </p>
                        
                        <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto mb-8 border border-gray-100">
                            <h3 className="font-bold text-navy-900 mb-2">Next Steps</h3>
                            <p className="text-sm text-gray-600 mb-4">You have been assigned a dedicated agent who will contact you shortly to conduct the onboarding call.</p>
                            
                            <div className="flex items-center gap-4 bg-white p-4 rounded border border-gray-200">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                                    {successData.agent.charAt(0)}
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Assigned Agent</p>
                                    <p className="font-bold text-navy-900">{successData.agent}</p>
                                </div>
                            </div>
                        </div>

                        <Link href="/dashboard" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Return to Dashboard
                        </Link>
                    </div>
                )}

                {step < 5 && (
                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between">
                        <button 
                            onClick={handleBack}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${step === 1 ? 'invisible' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            Back
                        </button>
                        
                        {step < 4 ? (
                            <button 
                                onClick={handleNext}
                                disabled={step === 1 && !formData.businessName}
                                className="px-6 py-2 bg-navy-900 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue
                            </button>
                        ) : (
                            <button 
                                onClick={handleSubmit}
                                disabled={!formData.signedIntent || isSubmitting}
                                className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 hover:shadow-lg disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? 'Submitting...' : 'Confirm Request'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
