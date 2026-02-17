import { createClient } from '../../../lib/supabase/server';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function InsightPage({ params }: PageProps) {
    const { slug } = await params;
    const supabase = await createClient();
    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !post) {
        notFound();
    }

    return (
        <main className="bg-white min-h-screen flex flex-col">
            <Navbar />

            {/* Article Header */}
            <section className="bg-navy-900 pt-32 pb-20 px-6 md:px-12 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block py-1 px-3 border border-blue-400 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 rounded-full">
                        {post.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight">
                        {post.title}
                    </h1>
                    <p className="text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
                        {post.excerpt}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 px-6 md:px-12">
                <div className="max-w-3xl mx-auto">
                    <div className="aspect-video w-full overflow-hidden rounded-xl mb-12 shadow-xl">
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <article className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-navy-900 prose-a:text-blue-600">
                        {/* We use whitespace-pre-wrap to preserve newlines and basic formatting from the markdown/text */}
                        {post.content.split('\n').map((paragraph: string, idx: number) => {
                            if (paragraph.startsWith('# ')) {
                                return <h1 key={idx} className="text-3xl font-bold mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
                            }
                            if (paragraph.startsWith('## ')) {
                                return <h2 key={idx} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                            }
                            if (paragraph.startsWith('### ')) {
                                return <h3 key={idx} className="text-xl font-bold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                            }
                            if (paragraph.trim() === '') {
                                return <br key={idx} />;
                            }
                            return <p key={idx} className="mb-4 text-gray-800 leading-relaxed">{paragraph}</p>;
                        })}
                    </article>

                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <Link href="/insights" className="text-blue-600 font-semibold hover:underline flex items-center">
                            &larr; Back to all insights
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
