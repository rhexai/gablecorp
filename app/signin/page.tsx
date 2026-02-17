import Link from 'next/link';

export default function Signin() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="text-center mb-8">
                    <span className="font-serif text-3xl font-bold tracking-tight text-navy-900">
                        GABLECORP
                    </span>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">Sign in to your account</h2>
                </div>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <div className="mt-1">
                            <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="mt-1">
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
