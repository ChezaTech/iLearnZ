import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome to iLearn" />
            <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
                <header className="flex items-center justify-between py-6 z-20 relative bg-white px-8 lg:px-16 shadow-md dark:bg-gray-800 sticky top-0">
                    <div className="flex items-center">
                        <div className="text-3xl font-bold">
                            <span className="text-[#1e5091] inline-block mr-1">
                                i
                            </span>
                            <span className="text-[#1e5091]">
                                L
                            </span>
                            <span className="text-[#1e5091]">
                                e
                            </span>
                            <span className="text-[#ffb81c]">
                                a
                            </span>
                            <span className="text-[#1e5091]">
                                r
                            </span>
                            <span className="text-[#1e5091]">
                                n
                            </span>
                        </div>
                    </div>
                    <nav className="flex space-x-6">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="rounded-full px-6 py-2.5 font-medium text-[#1e5091] transition hover:bg-[#1e5091]/10 border border-transparent hover:border-[#1e5091]/20"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="rounded-full px-6 py-2.5 font-medium text-[#1e5091] transition hover:bg-[#1e5091]/10 border border-transparent hover:border-[#1e5091]/20"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="rounded-full bg-[#1e5091] px-6 py-2.5 font-medium text-white transition hover:bg-[#1e5091]/90 shadow-md hover:shadow-[#1e5091]/20"
                                >
                                    Registration
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="w-full">
                    {/* Hero Section */}
                    <div className="relative w-full">
                        <div className="bg-[#1e5091] text-white py-24 md:py-32 overflow-hidden relative">
                            {/* Background decorative elements */}
                            <div className="absolute top-20 right-20 w-16 h-16 bg-[#ffb81c]/20 rounded-full animate-pulse"></div>
                            <div className="absolute top-40 left-40 w-12 h-12 bg-[#ffb81c]/30 rounded-full animate-bounce"></div>
                            <div className="absolute bottom-20 left-20 w-14 h-14 bg-[#ffb81c]/20 rounded-full animate-pulse"></div>
                            <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-[#ffb81c]/10 rounded-full animate-bounce"></div>
                            <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-white/20 rounded-full"></div>
                            <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-white/30 rounded-full"></div>

                            <div className="container mx-auto px-10 lg:px-16">
                                <div className="grid lg:grid-cols-5 gap-16 items-center">
                                    {/* Text Content - Takes 2 columns */}
                                    <div className="lg:col-span-2 z-10">
                                        <div className="space-y-8">
                                            <div className="inline-block px-6 py-2 mb-4 bg-[#ffb81c] text-[#1e5091] rounded-full text-sm font-medium tracking-wide shadow-md transform hover:-translate-y-1 transition-transform duration-300">
                                                #1 Platform for Online Learning
                                            </div>
                                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                                                <span className="block mb-2">
                                                    Transforming
                                                </span>
                                                <span className="text-[#ffb81c] inline-block transform hover:scale-105 transition-transform duration-300">
                                                    Digital Learning
                                                </span>
                                                <span className="block mt-2">
                                                    Throughout Africa!
                                                </span>
                                            </h1>
                                            <p className="text-xl text-white/90 max-w-lg leading-relaxed">
                                                Manage your child's future
                                                through our platform, connecting teachers,
                                                students and parents.
                                            </p>
                                            <div className="flex flex-wrap gap-6 pt-6">
                                                <Link
                                                    href={route("register")}
                                                    className="rounded-full bg-[#ffb81c] px-10 py-4 font-medium text-[#1e5091] transition-all duration-300 hover:bg-[#ffb81c]/90 hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#ffb81c] focus:ring-offset-2"
                                                >
                                                    Get Started
                                                </Link>
                                                <a
                                                    href="#features"
                                                    className="rounded-full border-2 border-[#ffb81c]/70 bg-[#1e5091]/50 px-10 py-4 font-medium text-white transition-all duration-300 hover:bg-[#1e5091]/70 hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#ffb81c] focus:ring-offset-2"
                                                >
                                                    Start Learning
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image Grid - Takes 3 columns */}
                                    <div className="lg:col-span-3 relative">
                                        <div className="grid grid-cols-2 gap-8 relative">
                                            {/* Top left image */}
                                            <div className="relative overflow-hidden rounded-2xl shadow-xl transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                                                <img
                                                    src="https://static.vecteezy.com/system/resources/thumbnails/048/000/758/small/african-high-school-girl-smiling-in-classroom-diverse-education-concept-youth-empowerment-stock-for-print-poster-or-web-design-photo.jpg"
                                                    alt="African students in classroom"
                                                    className="w-full h-60 object-cover"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#1e5091]/70 to-transparent"></div>
                                            </div>
                                            {/* Top right image */}
                                            <div className="relative overflow-hidden rounded-2xl shadow-xl transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                                                <img
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSz-l94J5QscPBQGtw7sNCv3AL6mOtSEc-Xw&s"
                                                    alt="African school children"
                                                    className="w-full h-60 object-cover"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#1e5091]/70 to-transparent"></div>
                                            </div>
                                            {/* Bottom left image */}
                                            <div className="relative overflow-hidden rounded-2xl shadow-xl transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                                                <img
                                                    src="https://images.unsplash.com/photo-1613896527026-f195d5c818ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=85"
                                                    alt="African students with laptop"
                                                    className="w-full h-60 object-cover"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#1e5091]/70 to-transparent"></div>
                                            </div>
                                            {/* Bottom right image */}
                                            <div className="relative overflow-hidden rounded-2xl shadow-xl transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                                                <img
                                                    src="https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=85"
                                                    alt="African student studying"
                                                    className="w-full h-60 object-cover"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#1e5091]/70 to-transparent"></div>
                                            </div>
                                        </div>
                                        {/* Decorative elements */}
                                        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-[#ffb81c] rounded-full opacity-30 animate-pulse"></div>
                                        <div className="absolute -top-12 -left-12 w-20 h-20 bg-[#ffb81c] rounded-full opacity-20 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Wave divider */}
                            <div className="relative">
                                <svg
                                    className="w-full h-34 fill-current text-white dark:text-gray-800"
                                    viewBox="0 0 1440 74"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M0,37 C240,150 480,-50 720,37 C960,125 1200,-50 1440,37 L1440,74 L0,74 Z"></path>
                                </svg>
                            </div>

                            {/* Features Section */}
                            <div id="features" className="bg-white p-16">
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold tracking-tight text-[#1e5091] sm:text-4xl">
                                        Features
                                    </h2>
                                    <div className="h-1 w-20 bg-[#ffb81c] mx-auto mt-2 rounded-full"></div>
                                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                        Discover how iLearn can transform your
                                        educational experience with these
                                        powerful features
                                    </p>
                                </div>

                                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {/* Feature 1 */}
                                    <div className="flex flex-col rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-xl border border-[#1e5091]/10 hover:border-[#1e5091]/20">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1e5091]/10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-[#1e5091]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                />
                                            </svg>
                                        </div>
                                        <div className="h-1 w-12 bg-[#ffb81c] mb-3 rounded-full"></div>
                                        <h3 className="mb-2 text-xl font-semibold text-[#1e5091]">
                                            Interactive Learning
                                        </h3>
                                        <p className="flex-grow text-gray-600">
                                            Engage with interactive lessons,
                                            quizzes, and assignments designed to
                                            enhance understanding and retention.
                                        </p>
                                    </div>

                                    {/* Feature 2 */}
                                    <div className="flex flex-col rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-xl border border-[#1e5091]/10 hover:border-[#1e5091]/20">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1e5091]/10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-[#1e5091]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                />
                                            </svg>
                                        </div>
                                        <div className="h-1 w-12 bg-[#ffb81c] mb-3 rounded-full"></div>
                                        <h3 className="mb-2 text-xl font-semibold text-[#1e5091]">
                                            Progress Tracking
                                        </h3>
                                        <p className="flex-grow text-gray-600">
                                            Monitor student progress with
                                            detailed analytics and reports,
                                            helping identify strengths and areas
                                            for improvement.
                                        </p>
                                    </div>

                                    {/* Feature 3 */}
                                    <div className="flex flex-col rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-xl border border-[#1e5091]/10 hover:border-[#1e5091]/20">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1e5091]/10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-[#1e5091]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="h-1 w-12 bg-[#ffb81c] mb-3 rounded-full"></div>
                                        <h3 className="mb-2 text-xl font-semibold text-[#1e5091]">
                                            Collaborative Learning
                                        </h3>
                                        <p className="flex-grow text-gray-600">
                                            Foster teamwork and communication
                                            with built-in collaboration tools
                                            for group projects and discussions.
                                        </p>
                                    </div>

                                    {/* Feature 4 */}
                                    <div className="flex flex-col rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-xl border border-[#1e5091]/10 hover:border-[#1e5091]/20">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1e5091]/10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-[#1e5091]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="h-1 w-12 bg-[#ffb81c] mb-3 rounded-full"></div>
                                        <h3 className="mb-2 text-xl font-semibold text-[#1e5091]">
                                            Flexible Scheduling
                                        </h3>
                                        <p className="flex-grow text-gray-600">
                                            Access learning materials anytime,
                                            anywhere with our flexible
                                            scheduling system that adapts to
                                            your needs.
                                        </p>
                                    </div>

                                    {/* Feature 5 */}
                                    <div className="flex flex-col rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-xl border border-[#1e5091]/10 hover:border-[#1e5091]/20">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1e5091]/10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-[#1e5091]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="h-1 w-12 bg-[#ffb81c] mb-3 rounded-full"></div>
                                        <h3 className="mb-2 text-xl font-semibold text-[#1e5091]">
                                            Secure Environment
                                        </h3>
                                        <p className="flex-grow text-gray-600">
                                            Rest easy knowing your data is
                                            protected with our state-of-the-art
                                            security measures and privacy
                                            controls.
                                        </p>
                                    </div>

                                    {/* Feature 6 */}
                                    <div className="flex flex-col rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-xl border border-[#1e5091]/10 hover:border-[#1e5091]/20">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1e5091]/10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-[#1e5091]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                                                />
                                            </svg>
                                        </div>
                                        <div className="h-1 w-12 bg-[#ffb81c] mb-3 rounded-full"></div>
                                        <h3 className="mb-2 text-xl font-semibold text-[#1e5091]">
                                            Personalized Learning
                                        </h3>
                                        <p className="flex-grow text-gray-600">
                                            Tailor the learning experience to
                                            individual needs with adaptive
                                            content and personalized
                                            recommendations.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonials Section with diagonal background */}
                            <div className="relative py-24 overflow-hidden bg-white">
                                {/* Diagonal background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#1e5091]/10 to-white -skew-y-6 transform origin-top-right -z-10"></div>

                                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                                    <div className="text-center mb-16">
                                        <div className="inline-block px-4 py-1.5 bg-[#ffb81c]/10 text-[#1e5091] rounded-full mb-4 text-sm font-medium tracking-wide border border-[#ffb81c]/20">
                                            Success Stories
                                        </div>
                                        <h2 className="text-3xl font-bold tracking-tight text-[#1e5091] sm:text-4xl">
                                            What Our Users Say
                                        </h2>
                                        <div className="h-1 w-20 bg-[#ffb81c] mx-auto mt-2 mb-4 rounded-full"></div>
                                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                            Discover how iLearn has transformed
                                            the learning experience for
                                            students, teachers, and
                                            administrators worldwide.
                                        </p>
                                    </div>

                                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                        {/* Testimonial 1 */}
                                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#1e5091]/10 transform transition-all hover:scale-105 duration-300 hover:shadow-2xl">
                                            <div className="flex items-center mb-6">
                                                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 ring-4 ring-[#ffb81c]/30">
                                                    <img
                                                        src="https://img.freepik.com/premium-photo/happy-cheerful-american-african-black-ethnicity-female-university-student-learning-highschool_158001-9462.jpg"
                                                        alt="Amara N."
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg text-[#1e5091]">
                                                        Amara N.
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Parent of Two
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex mb-4 text-[#ffb81c]">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <p className="text-gray-600 italic">
                                                "As a parent, iLearn has given
                                                me peace of mind. I can easily
                                                track my children's progress and
                                                communicate with their teachers.
                                                The platform has truly enhanced
                                                their educational journey."
                                            </p>
                                        </div>

                                        {/* Testimonial 2 */}
                                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#1e5091]/10 transform transition-all hover:scale-105 duration-300 hover:shadow-2xl">
                                            <div className="flex items-center mb-6">
                                                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 ring-4 ring-[#ffb81c]/30">
                                                    <img
                                                        src="https://img.freepik.com/free-photo/portrait-smiling-african-american-businessman-wearing-suit_1262-3597.jpg"
                                                        alt="Kofi B."
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg text-[#1e5091]">
                                                        Kofi B.
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Father & IT Professional
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex mb-4 text-[#ffb81c]">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <p className="text-gray-600 italic">
                                                "As a tech-savvy parent, I
                                                appreciate how iLearn integrates
                                                modern technology with
                                                education. The platform keeps me
                                                involved in my children's
                                                learning journey while
                                                respecting my busy schedule."
                                            </p>
                                        </div>

                                        {/* Testimonial 3 */}
                                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#1e5091]/10 transform transition-all hover:scale-105 duration-300 hover:shadow-2xl">
                                            <div className="flex items-center mb-6">
                                                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 ring-4 ring-[#ffb81c]/30">
                                                    <img
                                                        src="https://img.freepik.com/free-photo/african-american-woman-casual-portrait_23-2149143313.jpg"
                                                        alt="Zainab M."
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg text-[#1e5091]">
                                                        Zainab M.
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Mother of Three
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex mb-4 text-[#ffb81c]">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <p className="text-gray-600 italic">
                                                "iLearn has been a blessing for
                                                our family. With three children
                                                in different grades, the
                                                platform helps me stay organized
                                                and ensure they're all receiving
                                                quality education. The
                                                parent-teacher communication
                                                feature is invaluable."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Statistics Section with floating cards */}
                            <div className="bg-gradient-to-b from-white to-[#1e5091]/5 py-24">
                                <div className="max-w-7xl mx-auto px-8 lg:px-16">
                                    <div className="text-center mb-16">
                                        <div className="inline-block px-4 py-1.5 bg-[#ffb81c]/10 text-[#1e5091] rounded-full mb-4 text-sm font-medium tracking-wide border border-[#ffb81c]/20">
                                            By The Numbers
                                        </div>
                                        <h2 className="text-3xl font-bold tracking-tight text-[#1e5091] sm:text-4xl">
                                            Our Impact in African Education
                                        </h2>
                                        <div className="h-1 w-20 bg-[#ffb81c] mx-auto mt-2 mb-4 rounded-full"></div>
                                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                            We're proud of the difference we're
                                            making in educational outcomes
                                            across Africa.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
                                        {/* Stat 1 */}
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-900/30 p-8 rounded-2xl shadow-lg text-center transform transition-all hover:scale-105 duration-300 hover:shadow-2xl border-2 border-white dark:border-blue-900/50">
                                            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                                5K+
                                            </div>
                                            <div className="text-gray-700 dark:text-gray-300 font-medium">
                                                Schools
                                            </div>
                                        </div>

                                        {/* Stat 2 */}
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-900/30 p-8 rounded-2xl shadow-lg text-center transform transition-all hover:scale-105 duration-300 hover:shadow-2xl border-2 border-white dark:border-blue-900/50">
                                            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                                50K+
                                            </div>
                                            <div className="text-gray-700 dark:text-gray-300 font-medium">
                                                Teachers
                                            </div>
                                        </div>

                                        {/* Stat 3 */}
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-900/30 p-8 rounded-2xl shadow-lg text-center transform transition-all hover:scale-105 duration-300 hover:shadow-2xl border-2 border-white dark:border-blue-900/50">
                                            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                                1M+
                                            </div>
                                            <div className="text-gray-700 dark:text-gray-300 font-medium">
                                                Students
                                            </div>
                                        </div>

                                        {/* Stat 4 */}
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-900/30 p-8 rounded-2xl shadow-lg text-center transform transition-all hover:scale-105 duration-300 hover:shadow-2xl border-2 border-white dark:border-blue-900/50">
                                            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                                30+
                                            </div>
                                            <div className="text-gray-700 dark:text-gray-300 font-medium">
                                                Countries
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bold CTA Section with angled background */}
                            <div className="relative py-24 overflow-hidden">
                                {/* Background with angle */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 skew-y-6 transform origin-top-right -z-10"></div>

                                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                                        Ready to Transform Your Learning
                                        Experience?
                                    </h2>
                                    <p className="mt-4 text-xl text-white max-w-2xl mx-auto mb-10">
                                        Join thousands of students, teachers,
                                        and administrators who have already
                                        revolutionized their educational journey
                                        with iLearn.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-6">
                                        <Link
                                            href={route("register")}
                                            className="rounded-full bg-white px-8 py-5 text-lg font-medium text-blue-600 shadow-xl transition transform hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 hover:bg-blue-50 dark:bg-gray-100 dark:hover:bg-white"
                                        >
                                            Get Started Today
                                        </Link>
                                        <a
                                            href="#features"
                                            className="rounded-full border-2 border-white px-8 py-5 text-lg font-medium text-white transition transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 hover:bg-white/10 dark:border-blue-200 dark:text-blue-200 dark:hover:bg-white/10"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                    Powered by Chezatek Technologies
                </footer>
            </div>
        </>
    );
}
