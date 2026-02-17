import { createClient } from '../../lib/supabase/server';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Define the Post type based on our schema
interface Post {
    id: string;
    title: string;
    slug: string;
    category: string;
    image_url: string;
    excerpt: string;
    content: string;
    created_at: string;
}

export default async function InsightsPage() {
    const supabase = await createClient();
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
    }

    return (
        <main className="bg-white min-h-screen flex flex-col">
            <Navbar />

            <section className="bg-navy-900 pt-32 pb-20 px-6 md:px-12 text-white">
                <div className="max-w-[1400px] mx-auto">
                    <h1 className="text-5xl md:text-6xl font-serif mb-6">Insights</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
                        Our latest thinking on the issues that matter most in business and technology.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6 md:px-12 flex-grow">
                <div className="max-w-[1400px] mx-auto">
                    {(!posts || posts.length === 0) ? (
                        <div className="text-center py-20">
                            <h3 className="text-xl font-medium text-gray-900 mb-4">No insights found</h3>
                            <p className="text-gray-600 mb-6">There are no posts available at the moment.</p>
                            <div className="bg-blue-50 p-4 border border-blue-100 rounded text-left inline-block max-w-lg">
                                <p className="text-sm text-blue-800 font-semibold mb-2">Note to Developer:</p>
                                <p className="text-sm text-blue-700">
                                    If you haven't run the SQL script yet, please run <code>supabase/schema.sql</code> in your Supabase SQL Editor to create the table and seed data.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {posts.map((post: Post) => (
                                <Link href={`/insights/${post.slug}`} key={post.id} className="group cursor-pointer">
                                    <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-100 rounded-lg">
                                        <img
                                            src={post.image_url}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">{post.category}</span>
                                    <h3 className="text-2xl font-serif font-medium text-navy-900 mt-3 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-3 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <span className="text-blue-600 text-sm font-semibold group-hover:underline">Read more &rarr;</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
