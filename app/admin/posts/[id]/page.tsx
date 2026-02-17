import PostForm from '../_components/post-form';
import { updatePost } from '../../../actions/posts';
import { createClient } from '../../../../lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch post data
    const supabase = await createClient();
    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !post) {
        notFound();
    }

    // Bind the id to the update action
    const updateAction = updatePost.bind(null, id);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-serif text-navy-900 mb-8">Edit Post</h1>
            {/* @ts-ignore */}
            <PostForm
                action={updateAction}
                initialData={post}
                submitLabel="Update Post"
            />
        </div>
    );
}
