import { createClient } from '../lib/supabase/server';
import Link from 'next/link';

interface Post {
    id: string;
    title: string;
    slug: string;
    category: string;
    image_url: string;
    excerpt: string;
}

export default async function FeaturedInsights() {
    const supabase = await createClient();
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(3);

    return (
        <section id="insights" className="py-16 md:py-24 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-medium text-navy-900">
                        Featured Insights
                    </h2>
                    <Link href="/insights" className="flex items-center text-blue-600 font-semibold hover:underline">
                        View all insights
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts && posts.length > 0 ? (
                        posts.map((post: Post) => (
                            <Link href={`/insights/${post.slug}`} key={post.id} className="group cursor-pointer">
                                <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-100 relative">
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
                                <p className="text-gray-600 line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-12 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">
                                No featured insights available. Please run the SQL seed script.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

