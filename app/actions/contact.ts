'use server';

import { createClient } from '../../lib/supabase/server';
import { z } from 'zod';

const ContactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function submitContactForm(prevState: any, formData: FormData) {
    const validatedFields = ContactSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors.name?.[0] || validatedFields.error.flatten().fieldErrors.email?.[0] || validatedFields.error.flatten().fieldErrors.message?.[0] || 'Invalid form data',
            message: null,
        };
    }

    const { name, email, message } = validatedFields.data;
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from('contact_messages')
            .insert({ name, email, message });

        if (error) {
            console.error('Contact form error:', error);
            return { error: 'Failed to send message. Please try again.', message: null };
        }

        return { message: 'Message sent successfully! We will get back to you soon.', error: null };
    } catch (error) {
        return { error: 'An unexpected error occurred.', message: null };
    }
}
