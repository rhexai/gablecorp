import PostForm from '../_components/post-form';
import { createPost } from '../../../actions/posts';

export default function NewPostPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-serif text-navy-900 mb-8">Create New Post</h1>
            {/* @ts-ignore */}
            <PostForm action={createPost} submitLabel="Publish Post" />
        </div>
    );
}
