
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Gablecorp',
    description: 'Our commitment to protecting your privacy and personal data.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-white min-h-screen text-navy-900 pb-20">
            {/* Header */}
            <div className="bg-navy-900 text-white py-24 px-6 md:px-12">
                <div className="max-w-[1000px] mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif mb-6">Privacy Policy</h1>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        At Gablecorp, we are committed to maintaining the trust and confidence of our visitors to our web site.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-[800px] mx-auto px-6 md:px-12 py-16">
                <div className="prose prose-lg prose-slate max-w-none">
                    <p className="lead text-xl text-gray-700 mb-8">
                        This Privacy Policy explains how Gablecorp ("we", "us", or "our") collects, uses, and shares information about you when you use our website and services.
                    </p>

                    <section className="mb-12">
                        <h2 className="text-2xl font-serif text-navy-900 mb-4">1. Information We Collect</h2>
                        <p className="mb-4 text-gray-700">
                            We may collect information about you in various ways, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                            <li><strong>Information You Provide to Us:</strong> We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or apply for a job. This may include your name, email address, phone number, company name, and any other information you choose to provide.</li>
                            <li><strong>Information We Collect Automatically:</strong> When you access or use our website, we automatically collect information about you, including your IP address, browser type, operating system, and data regarding your interaction with our website (such as pages visited and time spent).</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-serif text-navy-900 mb-4">2. How We Use Your Information</h2>
                        <p className="mb-4 text-gray-700">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Provide, maintain, and improve our services and website;</li>
                            <li>Respond to your comments, questions, and requests;</li>
                            <li>Send you technical notices, updates, security alerts, and administrative messages;</li>
                            <li>Communicate with you about products, services, offers, promotions, and events offered by Gablecorp;</li>
                            <li>Monitor and analyze trends, usage, and activities in connection with our website.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-serif text-navy-900 mb-4">3. Sharing of Information</h2>
                        <p className="mb-4 text-gray-700">
                            We do not share your personal information with third parties except as described in this policy:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf;</li>
                            <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process;</li>
                            <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of Gablecorp or others.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-serif text-navy-900 mb-4">4. Security</h2>
                        <p className="text-gray-700">
                            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-serif text-navy-900 mb-4">5. Your Choices</h2>
                        <p className="text-gray-700">
                            You may opt out of receiving promotional communications from us by following the instructions in those communications. If you opt out, we may still send you non-promotional communications, such as those about our ongoing business relations.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-serif text-navy-900 mb-4">6. Contact Us</h2>
                        <p className="text-gray-700">
                            If you have any questions about this Privacy Policy, please contact us at privacy@gablecorp.com.
                        </p>
                    </section>

                    <p className="text-sm text-gray-500 mt-12 border-t pt-8">
                        Last updated: February 17, 2026
                    </p>
                </div>
            </div>
        </div>
    );
}
