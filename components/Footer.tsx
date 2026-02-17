import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-16 px-6 md:px-12 text-navy-900">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="mb-6 block">
                        <Image
                            src="/images/logo.png"
                            alt="Gablecorp"
                            width={120}
                            height={120}
                            className="h-16 w-auto object-contain"
                        />
                    </Link>
                    <div className="flex gap-4">
                        <Link href="https://www.linkedin.com/company/gablecorp/" className="text-gray-500 hover:text-blue-600">LinkedIn</Link>
                        <Link href="https://www.linkedin.com/company/gablecorp/" className="text-gray-500 hover:text-blue-600"></Link>
                        <Link href="https://www.linkedin.com/company/gablecorp/" className="text-gray-500 hover:text-blue-600">LinkedIn</Link>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-4">About Us</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li><Link href="#" className="hover:text-blue-600 transition-colors">Our Firm</Link></li>
                        <li><Link href="#" className="hover:text-blue-600 transition-colors">Our People</Link></li>
                        <li><Link href="/careers" className="hover:text-blue-600 transition-colors">Careers</Link></li>
                        <li><Link href="#" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Insights</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li><Link href="/insights" className="hover:text-blue-600 transition-colors">Featured</Link></li>
                        <li><Link href="/industries" className="hover:text-blue-600 transition-colors">Industries</Link></li>
                        <li><Link href="/capabilities" className="hover:text-blue-600 transition-colors">Capabilities</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Subscribe</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Get our latest thinking delivering straight to your inbox.
                    </p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
                        />
                        <button className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-gray-100 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center">
                <p>&copy; {new Date().getFullYear()} Gablecorp. BN363240425 All rights reserved. </p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link>
                    <Link href="#" className="hover:text-blue-600">Terms of Use</Link>
                    <Link href="#" className="hover:text-blue-600">Cookie Preferences</Link>
                </div>
            </div>
        </footer>
    );
}
