import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

// Playful color palette
const colors = {
    primary: "#4F46E5", // Indigo
    secondary: "#06B6D4", // Cyan
    accent: "#8B5CF6", // Purple
    background: "#F0F7FF", // Light blue background
    card: "#FFFFFF",
};

export default function GuestLayout({ children }) {
    return (
        <div
            className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0"
            style={{
                background: `linear-gradient(135deg, ${colors.background} 0%, #FFFFFF 100%)`,
                fontFamily: '"Nunito", sans-serif',
            }}
        >
            {/* <div className="mb-4 transform transition duration-500 hover:scale-110">
                <Link href="/">
                    <ApplicationLogo className="h-24 w-24 fill-current" style={{ color: colors.primary }} />
                </Link>
            </div> */}

            <h1
                className="mb-6 text-center text-3xl font-bold"
                style={{ color: colors.primary }}
            >
                iLearn
            </h1>

            <div
                className="w-full overflow-hidden px-8 py-8 sm:max-w-md sm:rounded-2xl"
                style={{
                    background: colors.card,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    border: "1px solid rgba(209, 213, 219, 0.3)",
                }}
            >
                {children}
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} iLearn. All rights reserved.
            </div>
        </div>
    );
}
