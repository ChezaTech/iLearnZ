import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    HomeIcon,
    BookOpenIcon,
    AcademicCapIcon,
    CalendarIcon,
    UserGroupIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Detect scroll for navbar effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine user type for conditional navigation
    const isParent = user?.user_type === "parent";
    const isStudent = user?.user_type === "student";
    const isTeacher = user?.user_type === "teacher";

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <nav
                className={`fixed w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-white/95 backdrop-blur-sm shadow-lg py-2"
                        : "bg-[#1e5091]/95 backdrop-blur-sm py-3"
                }`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="flex shrink-0 items-center">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2"
                                >
                                    <div className="flex items-center bg-white">
                                        <span className="text-2xl font-bold p-3">
                                            <span className="text-[#1e5091]">
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
                                        </span>
                                    </div>
                                    
                                </Link>
                            </div>

                            <div className="hidden md:flex space-x-2 ml-10">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                    className={`px-5 py-2 text-sm font-medium transition-all border-b-2 ${
                                        scrolled
                                            ? "hover:text-[#1e5091] border-transparent hover:border-[#ffb81c]"
                                            : "text-white hover:border-[#ffb81c] border-transparent"
                                    } ${
                                        route().current("dashboard")
                                            ? scrolled
                                                ? "border-[#ffb81c] text-[#1e5091]"
                                                : "border-[#ffb81c] text-white"
                                            : ""
                                    }`}
                                >
                                    Dashboard
                                </NavLink>

                                {isParent && (
                                    <>
                                        <NavLink
                                            href={route("parent.dashboard")}
                                            active={route().current(
                                                "parent.dashboard"
                                            )}
                                            className={`px-5 py-2 text-sm font-medium transition-all border-b-2 ${
                                                scrolled
                                                    ? "hover:text-[#1e5091] border-transparent hover:border-[#ffb81c]"
                                                    : "text-white hover:border-[#ffb81c] border-transparent"
                                            } ${
                                                route().current(
                                                    "parent.dashboard"
                                                )
                                                    ? scrolled
                                                        ? "border-[#ffb81c] text-[#1e5091]"
                                                        : "border-[#ffb81c] text-white"
                                                    : ""
                                            }`}
                                        >
                                            My Students
                                        </NavLink>
                                    </>
                                )}

                                {isStudent && (
                                    <>
                                        <NavLink
                                            href="#"
                                            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all hover:scale-105 ${
                                                scrolled
                                                    ? "hover:bg-indigo-50"
                                                    : "text-white hover:bg-white/20"
                                            }`}
                                        >
                                            <BookOpenIcon className="h-5 w-5" />
                                            <span>My Courses</span>
                                        </NavLink>
                                        <NavLink
                                            href="#"
                                            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all hover:scale-105 ${
                                                scrolled
                                                    ? "hover:bg-indigo-50"
                                                    : "text-white hover:bg-white/20"
                                            }`}
                                        >
                                            <AcademicCapIcon className="h-5 w-5" />
                                            <span>Assignments</span>
                                        </NavLink>
                                    </>
                                )}

                                <NavLink
                                    href="#"
                                    className={`px-5 py-2 text-sm font-medium transition-all border-b-2 ${
                                        scrolled
                                            ? "hover:text-[#1e5091] border-transparent hover:border-[#ffb81c]"
                                            : "text-white hover:border-[#ffb81c] border-transparent"
                                    }`}
                                >
                                    Calendar
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center">
                            <div className="relative ml-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className={`flex items-center gap-2 rounded-xl ${
                                                scrolled
                                                    ? "bg-[#1e5091]/10"
                                                    : "bg-white/10"
                                            } p-2 text-sm transition-all duration-200 ease-in-out hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#ffb81c] focus:ring-offset-2`}
                                        >
                                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#1e5091] to-[#1e5091] flex items-center justify-center text-white font-semibold shadow-md">
                                                {user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div className="flex flex-col items-start pr-2">
                                                <span
                                                    className={`text-sm font-medium ${
                                                        scrolled
                                                            ? "text-[#1e5091]"
                                                            : "text-white"
                                                    }`}
                                                >
                                                    {user.name}
                                                </span>
                                                <span
                                                    className={`text-xs ${
                                                        scrolled
                                                            ? "text-[#1e5091]/70"
                                                            : "text-white/80"
                                                    } capitalize`}
                                                >
                                                    {user.user_type}
                                                </span>
                                            </div>
                                            <svg
                                                className={`h-4 w-4 ${
                                                    scrolled
                                                        ? "text-[#ffb81c]"
                                                        : "text-[#ffb81c]"
                                                }`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content
                                        width="48"
                                        contentClasses="py-2 bg-white rounded-xl shadow-xl border border-[#1e5091]/10"
                                    >
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm text-gray-600">
                                                Signed in as
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {user.email}
                                            </p>
                                        </div>

                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150"
                                        >
                                            <Cog6ToothIcon className="mr-2 h-5 w-5 text-indigo-500" />
                                            Account Settings
                                        </Dropdown.Link>

                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                                        >
                                            <svg
                                                className="mr-2 h-5 w-5 text-red-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                                />
                                            </svg>
                                            Sign Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        !showingNavigationDropdown
                                    )
                                }
                                className={`inline-flex items-center justify-center rounded-lg p-2 ${
                                    scrolled
                                        ? "text-[#1e5091] bg-[#1e5091]/10"
                                        : "text-white bg-white/10"
                                } transition-all duration-200 ease-in-out hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#ffb81c] focus:ring-offset-2`}
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!showingNavigationDropdown ? (
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " md:hidden fixed inset-0 z-40 bg-[#1e5091]/95 backdrop-blur-md"
                    }
                >
                    <div className="pt-20 pb-6 px-4 max-h-screen overflow-y-auto">
                        <div className="flex flex-col space-y-2 mb-8">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="flex items-center px-4 py-3 text-base font-medium rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-150"
                            >
                                <HomeIcon className="mr-3 h-6 w-6" />
                                Dashboard
                            </ResponsiveNavLink>

                            {isParent && (
                                <ResponsiveNavLink
                                    href={route("parent.dashboard")}
                                    active={route().current("parent.dashboard")}
                                    className="flex items-center px-4 py-3 text-base font-medium rounded-xl text-white hover:bg-white/10 transition-all duration-150 border-l-4 border-transparent hover:border-[#ffb81c]"
                                >
                                    My Students
                                </ResponsiveNavLink>
                            )}

                            {isStudent && (
                                <>
                                    <ResponsiveNavLink
                                        href="#"
                                        className="flex items-center px-4 py-3 text-base font-medium rounded-xl text-white hover:bg-white/10 transition-all duration-150 border-l-4 border-transparent hover:border-[#ffb81c]"
                                    >
                                        My Courses
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href="#"
                                        className="flex items-center px-4 py-3 text-base font-medium rounded-xl text-white hover:bg-white/10 transition-all duration-150 border-l-4 border-transparent hover:border-[#ffb81c]"
                                    >
                                        Assignments
                                    </ResponsiveNavLink>
                                </>
                            )}

                            <ResponsiveNavLink
                                href="#"
                                className="flex items-center px-4 py-3 text-base font-medium rounded-xl text-white hover:bg-white/10 transition-all duration-150 border-l-4 border-transparent hover:border-[#ffb81c]"
                            >
                                Calendar
                            </ResponsiveNavLink>
                        </div>

                        <div className="border-t border-white/20 pt-6">
                            <div className="flex items-center px-4 mb-4">
                                <div className="h-12 w-12 rounded-full bg-[#1e5091] flex items-center justify-center text-white font-semibold text-lg mr-3 border-2 border-[#ffb81c]">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="text-base font-medium text-white">
                                        {user.name}
                                    </div>
                                    <div className="text-sm font-medium text-white/70">
                                        {user.email}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <ResponsiveNavLink
                                    href={route("profile.edit")}
                                    className="flex items-center px-4 py-3 text-base font-medium rounded-xl text-white hover:bg-white/10 transition-all duration-150 border-l-4 border-transparent hover:border-[#ffb81c]"
                                >
                                    Account Settings
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                    className="flex items-center w-full text-left px-4 py-3 text-base font-medium text-red-600 rounded-xl"
                                >
                                    <svg
                                        className="mr-3 h-6 w-6 text-red-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                        />
                                    </svg>
                                    Sign Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="pt-20">
                {" "}
                {/* Add padding to account for fixed navbar */}
                {header && (
                    <header className="bg-white shadow-sm mb-6">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
                    {children}
                </main>
                <footer className="bg-white border-t border-gray-200 mt-auto">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="col-span-1 md:col-span-2">
                                <Link href="/">
                                    <ApplicationLogo className="h-10 w-auto fill-current text-indigo-600" />
                                    <span className="mt-2 text-xl font-bold text-indigo-600 block">
                                        iLearn
                                    </span>
                                </Link>
                                <p className="mt-4 text-sm text-gray-600 max-w-md">
                                    Empowering students, parents, and teachers
                                    with a modern learning platform designed for
                                    the digital age.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                                    Resources
                                </h3>
                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-base text-gray-600 hover:text-indigo-600"
                                        >
                                            Help Center
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-base text-gray-600 hover:text-indigo-600"
                                        >
                                            Tutorials
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-base text-gray-600 hover:text-indigo-600"
                                        >
                                            FAQ
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                                    Contact
                                </h3>
                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <a
                                            href="mailto:support@iLearn.com"
                                            className="text-base text-gray-600 hover:text-indigo-600"
                                        >
                                            support@iLearn.com
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="tel:+1234567890"
                                            className="text-base text-gray-600 hover:text-indigo-600"
                                        >
                                            +123 456 7890
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-sm text-gray-500">
                                &copy; {new Date().getFullYear()} iLearn. All
                                rights reserved.
                            </p>
                            <div className="mt-4 md:mt-0 flex space-x-6">
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-indigo-600"
                                >
                                    <span className="sr-only">Facebook</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-indigo-600"
                                >
                                    <span className="sr-only">Twitter</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-indigo-600"
                                >
                                    <span className="sr-only">Instagram</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
