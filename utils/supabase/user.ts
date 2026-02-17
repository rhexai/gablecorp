import { createClient } from '@/lib/supabase/server';

export async function syncUserToSupabase(user: { id: string; email: string; first_name?: string | null; last_name?: string | null }) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('users')
        .upsert({
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
        }, { onConflict: 'id' });

    if (error) {
        console.error('Error syncing user to Supabase:', error);
        throw error;
    }
}
