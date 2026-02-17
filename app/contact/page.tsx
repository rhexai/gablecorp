import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactForm from './_components/contact-form';

export default function ContactPage() {
    return (
        <main className="bg-white min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col md:flex-row">
                {/* Left Side Info */}
                <div className="md:w-1/2 bg-navy-900 text-white p-12 md:p-24 flex flex-col justify-center">
                    <h1 className="text-5xl font-serif font-bold mb-8">Contact Us</h1>
                    <p className="text-xl text-gray-300 font-light mb-12 leading-relaxed">
                        Whether you have a question about our services, need expert advice, or want to join our team, we're here to help.
                    </p>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-bold mb-2 text-blue-400">Global Headquarters</h3>
                            <p className="text-gray-300">123 Business District<br />New York, NY 10001<br />United States</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2 text-blue-400">Email Us</h3>
                            <p className="text-gray-300">info@gablecorp.com</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2 text-blue-400">Call Us</h3>
                            <p className="text-gray-300">+1 (555) 123-4567</p>
                        </div>
                    </div>
                </div>

                {/* Right Side Form */}
                <div className="md:w-1/2 bg-gray-50 p-12 md:p-24 flex flex-col justify-center">
                    <div className="bg-white p-8 md:p-12 shadow-lg rounded-lg">
                        <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">Send a Message</h2>
                        <ContactForm />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
