import { dashboardServices } from "../../../../lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ serviceSlug: string }> }): Promise<Metadata> {
    const { serviceSlug } = await params;
    const service = dashboardServices.find((s) => s.slug === serviceSlug);
    
    if (!service) {
        return { title: 'Service Not Found' };
    }

    return {
        title: `${service.name} Services | Gablecorp Dashboard`
    };
}

export default async function ServicePage({ params }: { params: Promise<{ serviceSlug: string }> }) {
    const { serviceSlug } = await params;
    const service = dashboardServices.find((s) => s.slug === serviceSlug);

    if (!service) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto py-4">
            <div className="mb-10">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Services</span>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">{service.name}</span>
                </div>
                
                <h1 className="text-3xl font-serif text-navy-900 mb-3">{service.name} Services</h1>
                <div className="text-gray-600 text-lg max-w-3xl whitespace-pre-line space-y-4">
                    {service.description.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                </div>
            </div>

            {service.packages && service.packages.length > 0 ? (
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-navy-900 mb-6">Select a Package</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                        {service.packages.map((pkg, index) => (
                            <div key={pkg.name} className="flex flex-col bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-navy-900 mb-2">{pkg.name}</h3>
                                    <div className="text-2xl font-bold text-blue-600 font-serif">
                                        {pkg.price}
                                    </div>
                                </div>
                                
                                <ul className="space-y-3 mb-8 flex-1">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 flex-shrink-0">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-6">
                                    <Link 
                                        href={`/dashboard/services/${service.slug}/onboarding?pkg=${encodeURIComponent(pkg.name)}`}
                                        className="block w-full py-3 px-4 bg-navy-900 text-white font-semibold text-sm text-center rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        Order Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-8 bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-navy-900 mb-4">Ready to optimize your operations?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl">
                        Because every business requires a unique operational structure, our BPO services are custom-tailored to your specific needs. Talk to our experts to design a workflow that scales with you.
                    </p>
                    <Link 
                        href={`/dashboard/services/${service.slug}/onboarding?pkg=Custom+Consultation`}
                        className="inline-block py-3 px-8 bg-blue-600 text-white font-bold text-sm text-center rounded-lg hover:bg-navy-900 transition-all shadow-md hover:shadow-lg"
                    >
                        Talk to our experts to get started
                    </Link>
                </div>
            )}
            
            {service.packages && service.packages.length > 0 && (
                <div className="mt-16 bg-blue-50 p-8 rounded-xl border border-blue-100 text-center">
                    <h3 className="text-xl font-bold text-navy-900 mb-2">Need a Custom Solution?</h3>
                    <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                        Don't see exactly what you're looking for? Our team can build a customized package tailored specifically to your business needs and objectives.
                    </p>
                    <Link href="/contact" className="inline-block px-6 py-3 bg-white text-navy-900 font-bold border border-gray-200 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors">
                        Contact Us for Custom Build
                    </Link>
                </div>
            )}
        </div>
    );
}
