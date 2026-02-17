'use server';

import { createClient } from '../../lib/supabase/server';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function toggleSavePost(postId: string) {
    const user = await currentUser();
    if (!user) {
        return { message: 'You must be signed in to save posts.', saved: false };
    }

    const supabase = await createClient();
    const userId = user.id;

    // Check if already saved
    const { data: existing } = await supabase
        .from('saved_posts')
        .select('id')
        .eq('user_id', userId)
        .eq('post_id', postId)
        .single();

    if (existing) {
        // Unsave
        await supabase
            .from('saved_posts')
            .delete()
            .eq('id', existing.id);

        revalidatePath('/dashboard');
        revalidatePath(`/insights`); // And specific post pages if possible
        return { message: 'Post removed from saved list.', saved: false };
    } else {
        // Save
        const { error } = await supabase
            .from('saved_posts')
            .insert({ user_id: userId, post_id: postId });

        if (error) {
            console.error('Error saving post:', error);
            return { message: 'Failed to save post.', saved: false };
        }

        revalidatePath('/dashboard');
        revalidatePath(`/insights`);
        return { message: 'Post saved to dashboard.', saved: true };
    }
}

export async function getSavedStatus(postId: string) {
    const user = await currentUser();
    if (!user) return false;

    const supabase = await createClient();
    const { data } = await supabase
        .from('saved_posts')
        .select('id')
        .eq('user_id', user.id)
        .eq('post_id', postId)
        .single();

    return !!data;
}
