import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function PrivacyPolicy() {
    return (
        <main className="bg-white min-h-screen flex flex-col">
            <Navbar />

            <section className="bg-navy-900 pt-32 pb-20 px-6 md:px-12 text-white">
                <div className="max-w-[1400px] mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif mb-6">Privacy Policy</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
                        Last Updated: February 17, 2026
                    </p>
                </div>
            </section>

            <section className="py-20 px-6 md:px-12 flex-grow">
                <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
                    <p>
                        At Gablecorp, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website or use our services.
                    </p>

                    <h3>1. Information We Collect</h3>
                    <p>
                        We may collect personal information that you voluntarily provide to us, such as your name, email address, phone number, and company name when you:
                    </p>
                    <ul>
                        <li>Subscribe to our newsletters or insights.</li>
                        <li>Apply for a job through our Careers page.</li>
                        <li>Contact us via our forms.</li>
                    </ul>
                    <p>
                        We also automatically collect certain non-personal information when you visit our site, including your IP address, browser type, and operating system, through cookies and similar technologies.
                    </p>

                    <h3>2. How We Use Your Information</h3>
                    <p>
                        We use the information we collect for the following purposes:
                    </p>
                    <ul>
                        <li>To provide and improve our services and website functionality.</li>
                        <li>To communicate with you regarding your inquiries or applications.</li>
                        <li>To send you relevant insights, reports, and updates (if you have opted in).</li>
                        <li>To analyze website traffic and user behavior to enhance user experience.</li>
                    </ul>

                    <h3>3. Information Sharing</h3>
                    <p>
                        We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.
                    </p>

                    <h3>4. Data Security</h3>
                    <p>
                        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet constitutes 100% security.
                    </p>

                    <h3>5. Your Rights</h3>
                    <p>
                        You have the right to access, correct, or delete your personal information held by us. You may also opt-out of receiving marketing communications at any time by following the unsubscribe instructions in our emails.
                    </p>

                    <h3>6. Changes to This Policy</h3>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                    </p>

                    <h3>7. Contact Us</h3>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
