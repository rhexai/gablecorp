'use server';

import { createClerkClient } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const InviteSchema = z.object({
    email: z.string().email(),
});

export async function inviteAdmin(prevState: any, formData: FormData) {
    const email = formData.get('email');

    const validatedFields = InviteSchema.safeParse({ email });

    if (!validatedFields.success) {
        return { message: '', error: 'Invalid email address.' };
    }

    try {
        const client = await createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

        await client.invitations.createInvitation({
            emailAddress: validatedFields.data.email as string,
            publicMetadata: {
                role: 'admin',
            },
        });

        revalidatePath('/admin/admins');
        return { message: `Invitation sent to ${validatedFields.data.email}`, error: null };
    } catch (error: any) {
        console.error('Invite error:', error);
        // Clerk errors usually have a message property
        const errorMessage = error.errors?.[0]?.message || error.message || 'Failed to send invitation.';
        return { message: '', error: errorMessage };
    }
}
