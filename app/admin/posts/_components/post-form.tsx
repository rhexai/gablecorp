'use client';

import { useActionState } from 'react';
import Link from 'next/link';

// Define the type for the props directly since we're not exporting it
interface PostFormProps {
    action: (prevState: any, formData: FormData) => Promise<any>;
    initialData?: {
        title: string;
        slug: string;
        category: string;
        image_url: string;
        excerpt: string;
        content: string;
        is_featured: boolean;
    };
    submitLabel: string;
}

export default function PostForm({ action, initialData, submitLabel }: PostFormProps) {
    const initialState = { message: null, errors: {} };
    // @ts-ignore - types for useActionState can be tricky with server actions
    const [state, formAction] = useActionState(action, initialState);

    return (
        <form action={formAction} className="space-y-6 max-w-4xl">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 space-y-6">

                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={initialData?.title}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Enter post title"
                        required
                    />
                    {state?.errors?.title && (
                        <p className="mt-1 text-sm text-red-600">{state.errors.title}</p>
                    )}
                </div>

                {/* Slug & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                            Slug
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            defaultValue={initialData?.slug}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="my-post-slug"
                            required
                        />
                        {state?.errors?.slug && (
                            <p className="mt-1 text-sm text-red-600">{state.errors.slug}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            defaultValue={initialData?.category || 'Article'}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                            <option value="Article">Article</option>
                            <option value="Report">Report</option>
                            <option value="Perspective">Perspective</option>
                            <option value="Case Study">Case Study</option>
                        </select>
                        {state?.errors?.category && (
                            <p className="mt-1 text-sm text-red-600">{state.errors.category}</p>
                        )}
                    </div>
                </div>

                {/* Image URL */}
                <div>
                    <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                    </label>
                    <input
                        type="url"
                        id="image_url"
                        name="image_url"
                        defaultValue={initialData?.image_url}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="https://images.unsplash.com/..."
                        required
                    />
                    <p className="mt-1 text-xs text-gray-500">Provide a direct URL to an image.</p>
                    {state?.errors?.image_url && (
                        <p className="mt-1 text-sm text-red-600">{state.errors.image_url}</p>
                    )}
                </div>

                {/* Excerpt */}
                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                        Excerpt
                    </label>
                    <textarea
                        id="excerpt"
                        name="excerpt"
                        defaultValue={initialData?.excerpt}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Brief summary of the post..."
                        required
                    />
                    {state?.errors?.excerpt && (
                        <p className="mt-1 text-sm text-red-600">{state.errors.excerpt}</p>
                    )}
                </div>

                {/* To-Do: Add Markdown Editor here later */}
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                        Content (Markdown Supported)
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        defaultValue={initialData?.content}
                        rows={10}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-sm"
                        placeholder="# Heading&#10;&#10;Content goes here..."
                        required
                    />
                    {state?.errors?.content && (
                        <p className="mt-1 text-sm text-red-600">{state.errors.content}</p>
                    )}
                </div>

                {/* Is Featured */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="is_featured"
                        name="is_featured"
                        defaultChecked={initialData?.is_featured}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
                        Feature this post on the homepage
                    </label>
                </div>

                {/* General Message */}
                {state?.message && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded border border-red-100">
                        {state.message}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2.5 rounded hover:bg-blue-700 transition-colors font-medium"
                >
                    {submitLabel}
                </button>
                <Link
                    href="/admin/posts"
                    className="text-gray-600 hover:text-gray-900 font-medium"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
