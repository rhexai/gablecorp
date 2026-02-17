
import { createClient } from '@/lib/supabase/server';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const supabase = await createClient();

    // Check if requester is admin
    const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

    if (!userData || userData.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { title, slug, category, image_url, excerpt, content } = await request.json();

    const { data, error } = await supabase
        .from('posts')
        .insert([
            { title, slug, category, image_url, excerpt, content, is_featured: false }
        ])
        .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true, post: data[0] });
}
