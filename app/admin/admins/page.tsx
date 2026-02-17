import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import InviteAdminForm from './invite-form';


export default async function AdminsPage() {
    const user = await currentUser();

    if (!user) {
        redirect('/sign-in');
    }

    const superAdminEmail = process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL;
    const isSuperAdmin = user.emailAddresses.some(
        (email) => email.emailAddress === superAdminEmail
    );

    if (!isSuperAdmin) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-3xl font-serif text-navy-900 mb-4">Access Denied</h1>
                <p className="text-gray-600">
                    You do not have permission to view this page. Only the Super Admin can invite other administrators.
                </p>
            </div>
        );
    }

    // Fetch pending invitations (optional logic if permissions allow)
    // For now, just the invite form.

    return (
        <div className="p-8">
            <h1 className="text-3xl font-serif text-navy-900 mb-8">Manage Admins</h1>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 max-w-2xl">
                <h2 className="text-xl font-medium mb-4">Invite New Admin</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Enter the email address of the person you want to invite as an administrator.
                    They will receive an email invitation to create an account.
                </p>
                <InviteAdminForm />
            </div>

            <div className="mt-8 bg-blue-50 p-4 border border-blue-100 rounded text-sm text-blue-800">
                <p className="font-semibold">Note:</p>
                <p>
                    Invited users will have access to the Dashboard and can manage posts.
                    Only you (Super Admin) can invite new users.
                </p>
            </div>
        </div>
    );
}
