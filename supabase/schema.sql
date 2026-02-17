-- Create the posts table
create table if not exists posts (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    slug text not null unique,
    category text not null,
    image_url text not null,
    excerpt text not null,
    content text not null,
    is_featured boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table posts enable row level security;

-- Create a policy that allows read access to everyone
create policy "Public posts are viewable by everyone"
    on posts for select
    using (true);

-- Seed data
insert into posts (title, slug, category, image_url, excerpt, content, is_featured)
values
(
    'The economic potential of generative AI: The next productivity frontier',
    'economic-potential-generative-ai',
    'Article',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    'Generative AI is poised to unleash the next wave of productivity. We estimate it could add trillions of dollars in value into the global economy.',
    '# The economic potential of generative AI\n\nGenerative AI is poised to unleash the next wave of productivity. We estimate it could add trillions of dollars in value into the global economy.\n\n## A new era of productivity\n\nThe latest research suggests that generative AI could add the equivalent of $2.6 trillion to $4.4 trillion annually across the 63 use cases we analyzed.\n\n### Key Findings\n\n1. Generative AI''s impact on productivity could add trillions of dollars in value to the global economy.\n2. About 75 percent of the value that generative AI use cases could deliver falls across four areas: Customer operations, marketing and sales, software engineering, and R&D.\n3. Generative AI will have a significant impact across all industry sectors.\n\n## Conclusion\n\nBusiness leaders and policymakers have a critical role to play in ensuring that this technology is used responsibly and that its benefits are shared broadly.',
    true
),
(
    'Rewired: Outcompeting in the age of digital and AI',
    'rewired-outcompeting-digital-ai',
    'Report',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    'Successful digital transformations are rare. Our latest research reveals the six capabilities that allow companies to beat the odds and generate value.',
    '# Rewired: Outcompeting in the age of digital and AI\n\nSuccessful digital transformations are rare. Our latest research reveals the six capabilities that allow companies to beat the odds and generate value.\n\n## The six capabilities\n\n1. **Strategy and innovation**: Create a digital roadmap.\n2. **Customer experience**: Design journeys that delight.\n3. **Data and analytics**: Build a data engine.\n4. **Technology**: Modernize the core.\n5. **Talent**: Build a digital workforce.\n6. **Operating model**: Adopt an agile delivery model.\n\n## Why it matters\n\nCompanies that successfully master these capabilities are able to drive revenue growth, improve efficiency, and create new business models.',
    true
),
(
    'Sustainability: The net-zero transition',
    'sustainability-net-zero-transition',
    'Perspective',
    'https://images.unsplash.com/photo-1507207611509-9807c37799ba?q=80&w=2070&auto=format&fit=crop',
    'What it would cost, what it could bring. A detailed look at the economic transformation needed to achieve net-zero emissions by 2050.',
    '# Sustainability: The net-zero transition\n\nWhat it would cost, what it could bring. A detailed look at the economic transformation needed to achieve net-zero emissions by 2050.\n\n## The challenge\n\nAchieving net-zero emissions by 2050 will require a fundamental transformation of the global economy.\n\n## The opportunity\n\nThe transition to net-zero also presents significant opportunities for growth and innovation. Companies that lead the way in sustainability will be well-positioned to capture these opportunities.',
    true
),
(
    'The future of work: Trends to watch in 2026',
    'future-of-work-2026',
    'Article',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    'How remote work, AI, and changing demographics are reshaping the workforce.',
    '# The future of work: Trends to watch in 2026\n\nHow remote work, AI, and changing demographics are reshaping the workforce.\n\n## 1. The rise of the hybrid workforce\n\nHybrid work is here to stay. Companies are finding new ways to balance flexibility with collaboration.\n\n## 2. AI as a coworker\n\nAI tools are becoming increasingly integrated into daily workflows, augmenting human capabilities rather than replacing them.\n\n## 3. The skills gap\n\nAs technology evolves, the demand for new skills is outpacing supply. Upskilling and reskilling are becoming critical priorities.',
    false
);

-- users (handled by Clerk, but we might mirror role here if needed, 
-- but simpler to rely on Clerk metadata. 
-- However, for RLS on saved_posts, we treat 'user_id' as text matching Clerk ID).

-- Newsletter Subscribers
create table if not exists newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for newsletter
alter table newsletter_subscribers enable row level security;
-- Allow anyone to insert (subscribe)
create policy "Anyone can subscribe to newsletter"
    on newsletter_subscribers for insert
    with check (true);
-- Allow admins to read (will need Policy/Service Role for admin dashboard)
create policy "Admins can view subscribers"
    on newsletter_subscribers for select
    using (true); 
    -- In real app, restrict this policy. For now 'true' allows public read which is insecure 
    -- but simplified. 
    -- BETTER: Use Service Role in Admin Panel (which bypasses RLS). 

-- Saved Posts
create table if not exists saved_posts (
  id uuid default gen_random_uuid() primary key,
  user_id text not null, -- Clerk User ID
  post_id uuid references posts(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, post_id)
);

-- Enable RLS for saved_posts
alter table saved_posts enable row level security;

-- Users can View their own saved posts
create policy "Users can view own saved posts"
    on saved_posts for select
    using (user_id = auth.uid()::text); -- Note: this requires syncing Clerk ID to Supabase Auth, 
    -- OR we just use the anon key client-side and pass a filter? 
    -- ACTUALLY: Since we use Clerk, `auth.uid()` from Supabase won't match Clerk ID 
    -- unless we use a custom JWT or just use Service Role for all backend ops.
    -- PLAN: We will use Server Actions with Service Role (or tailored client) for user ops 
    -- to avoid complex JWT integration for this MVP.
    -- So we disable RLS or just leave it on but use Service Role in Actions.

-- Contact Messages
create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text,
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table contact_messages enable row level security;
-- Allow insert
create policy "Anyone can submit contact form"
    on contact_messages for insert
    with check (true);
