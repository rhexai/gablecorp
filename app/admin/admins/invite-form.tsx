'use client';

import { useActionState } from 'react';
import { inviteAdmin } from '../../actions/admin';

export default function InviteAdminForm() {
    // @ts-ignore
    const [state, formAction] = useActionState(inviteAdmin, { message: '', error: null });

    return (
        <form action={formAction} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="colleague@gablecorp.com"
                />
            </div>

            {state?.error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded border border-red-100">
                    {state.error}
                </div>
            )}

            {state?.message && (
                <div className="p-3 bg-green-50 text-green-600 text-sm rounded border border-green-100">
                    {state.message}
                </div>
            )}

            <button
                type="submit"
                className="bg-navy-900 text-white px-6 py-2 rounded hover:bg-navy-800 transition-colors font-medium w-full sm:w-auto"
            >
                Send Invitation
            </button>
        </form>
    );
}
