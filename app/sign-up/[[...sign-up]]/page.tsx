import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12">
            <SignUp />
        </div>
    );
}
