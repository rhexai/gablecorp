'use server';

import { createAdminClient } from '../../lib/supabase/admin'; // Use admin client for write access
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Schema for post validation
const PostSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and hyphen-separated"),
    category: z.string().min(1),
    image_url: z.string().url(),
    excerpt: z.string().min(10),
    content: z.string().min(20),
    is_featured: z.boolean().optional(),
});

export type PostState = {
    errors?: {
        title?: string[];
        slug?: string[];
        category?: string[];
        image_url?: string[];
        excerpt?: string[];
        content?: string[];
    };
    message?: string | null;
};

export async function createPost(prevState: PostState, formData: FormData) {
    // Validate fields
    const validatedFields = PostSchema.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        category: formData.get('category'),
        image_url: formData.get('image_url'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        is_featured: formData.get('is_featured') === 'on',
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Post.',
        };
    }

    const { title, slug, category, image_url, excerpt, content, is_featured } = validatedFields.data;

    const supabase = createAdminClient();

    try {
        const { error } = await supabase
            .from('posts')
            .insert({
                title,
                slug,
                category,
                image_url,
                excerpt,
                content,
                is_featured: is_featured || false,
            });

        if (error) {
            // Handle duplicate slug error specifically if possible
            if (error.code === '23505') { // Postgres unique violation code
                return { message: 'Slug already exists. Please choose a different one.' };
            }
            return { message: 'Database Error: Failed to Create Post.' };
        }
    } catch (error) {
        return { message: 'Database Error: Failed to Create Post.' };
    }

    revalidatePath('/admin/posts');
    revalidatePath('/insights');
    redirect('/admin/posts');
}

export async function updatePost(id: string, prevState: PostState, formData: FormData) {
    const validatedFields = PostSchema.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        category: formData.get('category'),
        image_url: formData.get('image_url'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        is_featured: formData.get('is_featured') === 'on',
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Post.',
        };
    }

    const { title, slug, category, image_url, excerpt, content, is_featured } = validatedFields.data;

    const supabase = createAdminClient();

    try {
        const { error } = await supabase
            .from('posts')
            .update({
                title,
                slug,
                category,
                image_url,
                excerpt,
                content,
                is_featured: is_featured || false,
            })
            .eq('id', id);

        if (error) {
            return { message: 'Database Error: Failed to Update Post.' };
        }
    } catch (error) {
        return { message: 'Database Error: Failed to Update Post.' };
    }

    revalidatePath('/admin/posts');
    revalidatePath(`/admin/posts/${id}`);
    revalidatePath('/insights');
    redirect('/admin/posts');
}

export async function deletePost(id: string) {
    const supabase = createAdminClient();
    try {
        await supabase.from('posts').delete().eq('id', id);
        revalidatePath('/admin/posts');
        revalidatePath('/insights');
    } catch (error) {
        console.error('Failed to delete post:', error);
        throw new Error('Failed to delete post');
    }
}
