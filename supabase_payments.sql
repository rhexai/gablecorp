-- Create the payments table
CREATE TABLE public.payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL, -- Clerk user ID
    order_id TEXT, -- e.g., ORD-2023-1234 (links to an order if applicable)
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'GHS',
    status TEXT NOT NULL DEFAULT 'Paid',
    method TEXT NOT NULL, -- e.g. "Visa ending in 4242" or "Mobile Money"
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own payments
CREATE POLICY "Users can view their own payments"
    ON public.payments
    FOR SELECT
    USING (auth.uid()::text = user_id OR user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Allow users to insert their own payments (or service role)
CREATE POLICY "Users can insert their own payments"
    ON public.payments
    FOR INSERT
    WITH CHECK (auth.uid()::text = user_id OR user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Insert some mock payments so the dashboard isn't empty on launch
-- Note: Replace 'user_id_here' with an actual clerk ID if you want them to show up immediately for a specific user, 
-- but we will just write the schema here. The app will fetch where user_id matches.
