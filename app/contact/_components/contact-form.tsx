'use client';

import { useActionState } from 'react';
import { submitContactForm } from '../../actions/contact';

export default function ContactForm() {
    // @ts-ignore
    const [state, formAction] = useActionState(submitContactForm, { message: '', error: null });

    return (
        <form action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Name</label>
                    <input type="text" id="name" name="name" required className="w-full border-b border-gray-300 py-2 focus:border-blue-600 outline-none transition-colors bg-transparent" placeholder="John Doe" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email</label>
                    <input type="email" id="email" name="email" required className="w-full border-b border-gray-300 py-2 focus:border-blue-600 outline-none transition-colors bg-transparent" placeholder="john@example.com" />
                </div>
            </div>

            <div>
                <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Message</label>
                <textarea id="message" name="message" rows={4} required className="w-full border-b border-gray-300 py-2 focus:border-blue-600 outline-none transition-colors bg-transparent resize-none" placeholder="How can we help you?" />
            </div>

            {state?.message && <div className="text-green-600 text-sm">{state.message}</div>}
            {state?.error && <div className="text-red-600 text-sm">{state.error}</div>}

            <button type="submit" className="bg-navy-900 text-white px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-blue-600 transition-colors">
                Submit Message
            </button>
        </form>
    );
}
