import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome to iLearnZ" />
            <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white overflow-hidden font-sans">
                {/* Flat design decorative elements */}
                <div className="fixed top-20 right-20 w-16 h-16 bg-blue-500 rounded-full opacity-20 dark:opacity-10"></div>
                <div className="fixed top-40 left-40 w-12 h-12 bg-green-500 rounded-full opacity-20 dark:opacity-10"></div>
                <div className="fixed bottom-20 left-20 w-14 h-14 bg-yellow-500 rounded-full opacity-20 dark:opacity-10"></div>
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-blue-500 selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="flex items-center justify-between py-6 z-20 relative bg-white px-6 mb-8 shadow-sm dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="text-3xl font-bold">
                                    <span className="text-blue-600 dark:text-blue-400 inline-block mr-1">
                                        i
                                    </span>
                                    <span className="text-blue-600 dark:text-blue-400">
                                        LearnZ
                                    </span>
                                </div>
                            </div>
                            <nav className="flex space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-md px-5 py-2 font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-5 py-2 font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                        >
                                           Parent Registration
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            {/* Hero Section */}
                            <div className="py-16 md:py-24 relative z-10">
                                <div className="relative">
                                    {/* Simple decorative elements */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full dark:bg-blue-900/20"></div>
                                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-100 rounded-full dark:bg-green-900/20"></div>

                                    <div className="grid items-center gap-12 md:grid-cols-2 relative">
                                        <div className="z-10 p-6 bg-white dark:bg-gray-800 shadow-sm border-t-4 border-blue-500 dark:border-blue-600">
                                            <div className="inline-block px-4 py-1 mb-4 bg-blue-100 text-blue-700 rounded-md text-sm font-medium tracking-wide dark:bg-blue-900/50 dark:text-blue-300">
                                                Future of Education
                                            </div>
                                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
                                                <span className="block">
                                                    Transforming
                                                </span>
                                                <span className="block text-blue-600 dark:text-blue-400">
                                                    Digital Learning
                                                </span>
                                            </h1>
                                            <p className="mt-6 max-w-lg text-lg text-gray-700 dark:text-gray-300">
                                                iLearnZ is a comprehensive
                                                digital learning platform
                                                designed to enhance the
                                                educational experience for
                                                students, teachers, and
                                                administrators with innovative
                                                tools and resources.
                                            </p>
                                            <div className="mt-8 flex flex-wrap gap-4">
                                                <Link
                                                    href={route("register")}
                                                    className="rounded-md bg-blue-600 px-8 py-4 font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                                >
                                                    Get Started
                                                </Link>
                                                <a
                                                    href="#features"
                                                    className="rounded-md border border-blue-600 px-8 py-4 font-medium text-blue-600 transition hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/30"
                                                >
                                                    Learn More
                                                </a>
                                            </div>
                                        </div>
                                        <div className="relative z-10">
                                            {/* Simple background */}
                                            <div className="absolute top-4 left-4 w-full h-full bg-blue-100 dark:bg-blue-900/20 -z-10"></div>

                                            <div className="relative bg-white p-6 shadow-md dark:bg-gray-800">
                                                <img
                                                    src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                                                    alt="Digital Learning"
                                                    className="mx-auto rounded-lg object-cover shadow-lg"
                                                    width="500"
                                                    height="375"
                                                />

                                                {/* Decorative elements */}
                                                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg transform hover:scale-110 transition-transform duration-300 dark:from-blue-700 dark:to-indigo-700"></div>
                                                <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg transform hover:scale-110 transition-transform duration-300 dark:from-purple-700 dark:to-pink-700"></div>
                                                <div className="absolute top-1/2 right-0 h-12 w-12 rounded-full bg-yellow-400 shadow-lg transform hover:scale-110 transition-transform duration-300 dark:bg-yellow-600"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Wave divider */}
                            <div className="relative">
                                <svg
                                    className="w-full h-24 fill-current text-white dark:text-gray-800"
                                    viewBox="0 0 1440 74"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M0,37 C240,150 480,-50 720,37 C960,125 1200,-50 1440,37 L1440,74 L0,74 Z"></path>
                                </svg>
                            </div>

                            {/* Features Section */}
                            <div id="features" className="py-16">
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                        Features
                                    </h2>
                                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                                        Discover how iLearnZ can transform your
                                        educational experience with these
                                        powerful features
                                    </p>
                                </div>

                                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {/* Feature 1 */}
                                    <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-blue-600 dark:text-blue-400"
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
                                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                            Interactive Learning
                                        </h3>
                                        <p className="flex-grow text-gray-600 dark:text-gray-300">
                                            Engage with interactive lessons,
                                            quizzes, and assignments designed to
                                            enhance understanding and retention.
                                        </p>
                                    </div>

                                    {/* Feature 2 */}
                                    <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-blue-600 dark:text-blue-400"
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
                                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                            Progress Tracking
                                        </h3>
                                        <p className="flex-grow text-gray-600 dark:text-gray-300">
                                            Monitor student progress with
                                            detailed analytics and reports,
                                            helping identify strengths and areas
                                            for improvement.
                                        </p>
                                    </div>

                                    {/* Feature 3 */}
                                    <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-blue-600 dark:text-blue-400"
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
                                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                            Collaborative Learning
                                        </h3>
                                        <p className="flex-grow text-gray-600 dark:text-gray-300">
                                            Foster teamwork and communication
                                            with built-in collaboration tools
                                            for group projects and discussions.
                                        </p>
                                    </div>

                                    {/* Feature 4 */}
                                    <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-blue-600 dark:text-blue-400"
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
                                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                            Flexible Scheduling
                                        </h3>
                                        <p className="flex-grow text-gray-600 dark:text-gray-300">
                                            Access learning materials anytime,
                                            anywhere with our flexible
                                            scheduling system that adapts to
                                            your needs.
                                        </p>
                                    </div>

                                    {/* Feature 5 */}
                                    <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-blue-600 dark:text-blue-400"
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
                                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                            Secure Environment
                                        </h3>
                                        <p className="flex-grow text-gray-600 dark:text-gray-300">
                                            Rest easy knowing your data is
                                            protected with our state-of-the-art
                                            security measures and privacy
                                            controls.
                                        </p>
                                    </div>

                                    {/* Feature 6 */}
                                    <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-blue-600 dark:text-blue-400"
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
                                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                            Personalized Learning
                                        </h3>
                                        <p className="flex-grow text-gray-600 dark:text-gray-300">
                                            Tailor the learning experience to
                                            individual needs with adaptive
                                            content and personalized
                                            recommendations.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonials Section with diagonal background */}
                            <div className="relative py-24 overflow-hidden">
                                {/* Diagonal background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-indigo-950 dark:to-blue-900 -skew-y-6 transform origin-top-right -z-10"></div>

                                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                                    <div className="text-center mb-16">
                                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full mb-4 dark:bg-blue-900/50 dark:text-blue-300 text-sm font-medium tracking-wide">
                                            Success Stories
                                        </div>
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                            What Our Users Say
                                        </h2>
                                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                            Discover how iLearnZ has transformed
                                            the learning experience for
                                            students, teachers, and
                                            administrators worldwide.
                                        </p>
                                    </div>

                                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                        {/* Testimonial 1 */}
                                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transform transition-all hover:scale-105 duration-300 hover:shadow-2xl">
                                            <div className="flex items-center mb-6">
                                                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 ring-4 ring-blue-100 dark:ring-blue-900/50">
                                                    <img
                                                        src="https://randomuser.me/api/portraits/women/32.jpg"
                                                        alt="Sarah J."
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                                        Sarah J.
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        High School Teacher
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex mb-4 text-yellow-400">
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
                                            <p className="text-gray-600 dark:text-gray-300 italic">
                                                "iLearnZ has revolutionized my
                                                classroom. The interactive tools
                                                make lesson planning easier and
                                                my students are more engaged
                                                than ever before."
                                            </p>
                                        </div>

                                        {/* Testimonial 2 */}
                                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transform transition-all hover:scale-105 duration-300 hover:shadow-2xl">
                                            <div className="flex items-center mb-6">
                                                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 ring-4 ring-blue-100 dark:ring-blue-900/50">
                                                    <img
                                                        src="https://randomuser.me/api/portraits/men/41.jpg"
                                                        alt="Michael R."
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                                        Michael R.
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        School Administrator
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex mb-4 text-yellow-400">
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
                                            <p className="text-gray-600 dark:text-gray-300 italic">
                                                "The administrative tools have
                                                streamlined our processes
                                                significantly. We're saving time
                                                and resources while providing
                                                better educational outcomes."
                                            </p>
                                        </div>

                                        {/* Testimonial 3 */}
                                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transform transition-all hover:scale-105 duration-300 hover:shadow-2xl">
                                            <div className="flex items-center mb-6">
                                                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 ring-4 ring-blue-100 dark:ring-blue-900/50">
                                                    <img
                                                        src="https://randomuser.me/api/portraits/women/67.jpg"
                                                        alt="Emily T."
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                                        Emily T.
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        High School Student
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex mb-4 text-yellow-400">
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
                                            <p className="text-gray-600 dark:text-gray-300 italic">
                                                "Learning has become so much
                                                more enjoyable! The interactive
                                                lessons and study tools have
                                                helped me improve my grades and
                                                actually enjoy studying."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Statistics Section with floating cards */}
                            <div className="bg-white dark:bg-gray-800 py-24">
                                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                                    <div className="text-center mb-16">
                                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full mb-4 dark:bg-blue-900/50 dark:text-blue-300 text-sm font-medium tracking-wide">
                                            By The Numbers
                                        </div>
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                            Our Impact in Education
                                        </h2>
                                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                            We're proud of the difference we're
                                            making in educational outcomes
                                            worldwide.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                                        {/* Stat 1 */}
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 p-8 rounded-2xl shadow-lg text-center transform transition-all hover:scale-105 duration-300 hover:shadow-2xl">
                                            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                                5K+
                                            </div>
                                            <div className="text-gray-700 dark:text-gray-300 font-medium">
                                                Schools
                                            </div>
                                        </div>

                                        {/* Stat 2 */}
                                        <div className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 p-8 rounded-2xl shadow-lg text-center transform transition-all hover:scale-105 duration-300 hover:shadow-2xl">
                                            <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                                50K+
                                            </div>
                                            <div className="text-gray-700 dark:text-gray-300 font-medium">
                                                Teachers
                                            </div>
                                        </div>

                                        {/* Stat 3 */}
                                        <div className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/50 dark:to-blue-900/50 p-8 rounded-2xl shadow-lg text-center transform transition-all hover:scale-105 duration-300 hover:shadow-2xl">
                                            <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                                1M+
                                            </div>
                                            <div className="text-gray-700 dark:text-gray-300 font-medium">
                                                Students
                                            </div>
                                        </div>

                                        {/* Stat 4 */}
                                        <div className="bg-gradient-to-br from-blue-50 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 p-8 rounded-2xl shadow-lg text-center transform transition-all hover:scale-105 duration-300 hover:shadow-2xl">
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
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 skew-y-6 transform origin-top-right -z-10"></div>

                                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                                        Ready to Transform Your Learning
                                        Experience?
                                    </h2>
                                    <p className="mt-4 text-xl text-blue max-w-2xl mx-auto mb-10">
                                        Join thousands of students, teachers,
                                        and administrators who have already
                                        revolutionized their educational journey
                                        with iLearnZ.
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
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Powered by Chezatek Technologies
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
