import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function About() {
    const [activeTab, setActiveTab] = useState("mission");

    const teamMembers = [
        {
            name: "Dr. Sarah Mwanza",
            role: "Founder & CEO",
            image: "https://randomuser.me/api/portraits/women/32.jpg",
            bio: "With over 15 years in educational technology, Dr. Mwanza founded iLearnZ to transform education across Africa.",
        },
        {
            name: "Michael Banda",
            role: "Chief Technology Officer",
            image: "https://randomuser.me/api/portraits/men/42.jpg",
            bio: "Leading our technical innovation with expertise in EdTech solutions and AI-powered learning systems.",
        },
        {
            name: "Grace Tembo",
            role: "Head of Curriculum",
            image: "https://randomuser.me/api/portraits/women/45.jpg",
            bio: "Former principal with 20+ years experience developing engaging educational content for diverse learners.",
        },
        {
            name: "David Mutale",
            role: "Director of Operations",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            bio: "Oversees the day-to-day operations ensuring seamless delivery of our services to schools across the continent.",
        },
    ];

    const milestones = [
        {
            year: "2018",
            title: "Foundation",
            description: "iLearnZ was founded with a vision to transform education across Africa through technology.",
        },
        {
            year: "2019",
            title: "First School Partnership",
            description: "Launched our pilot program with 5 schools in Lusaka, reaching over 1,000 students.",
        },
        {
            year: "2020",
            title: "Digital Response",
            description: "Expanded rapidly to support remote learning during global pandemic, serving 50+ schools.",
        },
        {
            year: "2021",
            title: "Government Recognition",
            description: "Received official endorsement from Ministry of Education for our innovative approach.",
        },
        {
            year: "2022",
            title: "Pan-African Expansion",
            description: "Extended operations to 5 countries across Southern Africa, serving 100,000+ students.",
        },
        {
            year: "2023",
            title: "AI Integration",
            description: "Introduced adaptive learning features powered by AI to personalize education.",
        },
        {
            year: "2024",
            title: "Global Recognition",
            description: "Awarded 'Most Innovative EdTech Solution' at the Global Education Summit.",
        },
    ];

    const partners = [
        {
            name: "Ministry of Education",
            logo: "https://placehold.co/200x100/1e5091/ffffff?text=Ministry+of+Education",
        },
        {
            name: "UNESCO",
            logo: "https://placehold.co/200x100/1e5091/ffffff?text=UNESCO",
        },
        {
            name: "African Development Bank",
            logo: "https://placehold.co/200x100/1e5091/ffffff?text=AfDB",
        },
        {
            name: "Microsoft Education",
            logo: "https://placehold.co/200x100/1e5091/ffffff?text=Microsoft",
        },
        {
            name: "Google for Education",
            logo: "https://placehold.co/200x100/1e5091/ffffff?text=Google",
        },
    ];

    return (
        <>
            <Head title="About iLearnZ" />
            <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white overflow-hidden font-sans">
                <header className="flex items-center justify-between py-6 z-20 sticky top-0 bg-white px-8 lg:px-16 shadow-md dark:bg-gray-800">
                    <div className="flex items-center">
                        <Link href="/" className="text-3xl font-bold">
                            <span className="text-[#1e5091] inline-block mr-1">i</span>
                            <span className="text-[#1e5091]">L</span>
                            <span className="text-[#1e5091]">e</span>
                            <span className="text-[#ffb81c]">a</span>
                            <span className="text-[#1e5091]">r</span>
                            <span className="text-[#1e5091]">n</span>
                        </Link>
                    </div>
                    <nav className="flex space-x-6">
                        <Link
                            href="/"
                            className="rounded-full px-6 py-2.5 font-medium text-[#1e5091] transition hover:bg-[#1e5091]/10 border border-transparent hover:border-[#1e5091]/20"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="rounded-full bg-[#1e5091] px-6 py-2.5 font-medium text-white transition hover:bg-[#1e5091]/90 shadow-md hover:shadow-[#1e5091]/20"
                        >
                            About
                        </Link>
                        <Link
                            href="/pricing"
                            className="rounded-full px-6 py-2.5 font-medium text-[#1e5091] transition hover:bg-[#1e5091]/10 border border-transparent hover:border-[#1e5091]/20"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/faq"
                            className="rounded-full px-6 py-2.5 font-medium text-[#1e5091] transition hover:bg-[#1e5091]/10 border border-transparent hover:border-[#1e5091]/20"
                        >
                            FAQ
                        </Link>
                        <Link
                            href={route("login")}
                            className="rounded-full px-6 py-2.5 font-medium text-[#1e5091] transition hover:bg-[#1e5091]/10 border border-transparent hover:border-[#1e5091]/20"
                        >
                            Log in
                        </Link>
                    </nav>
                </header>

                <main className="w-full">
                    {/* Hero Section */}
                    <div className="relative w-full">
                        <div className="bg-[#1e5091] text-white py-16 md:py-24 overflow-hidden relative">
                            {/* Background decorative elements */}
                            <div className="absolute top-20 right-20 w-16 h-16 bg-[#ffb81c]/20 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-20 left-20 w-14 h-14 bg-[#ffb81c]/20 rounded-full animate-pulse"></div>

                            <div className="container mx-auto px-10 lg:px-16">
                                <div className="text-center max-w-4xl mx-auto">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                                        About <span className="text-[#ffb81c]">iLearnZ</span>
                                    </h1>
                                    <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                                        Revolutionizing education across Africa through innovative technology and 
                                        a passion for creating equal learning opportunities for all students.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="container mx-auto px-6 py-12">
                        <div className="flex flex-wrap border-b border-gray-200 mb-8">
                            <button
                                className={`px-6 py-3 text-lg font-medium ${
                                    activeTab === "mission"
                                        ? "text-[#1e5091] border-b-2 border-[#ffb81c]"
                                        : "text-gray-500 hover:text-[#1e5091]"
                                }`}
                                onClick={() => setActiveTab("mission")}
                            >
                                Our Mission
                            </button>
                            <button
                                className={`px-6 py-3 text-lg font-medium ${
                                    activeTab === "team"
                                        ? "text-[#1e5091] border-b-2 border-[#ffb81c]"
                                        : "text-gray-500 hover:text-[#1e5091]"
                                }`}
                                onClick={() => setActiveTab("team")}
                            >
                                Our Team
                            </button>
                            <button
                                className={`px-6 py-3 text-lg font-medium ${
                                    activeTab === "history"
                                        ? "text-[#1e5091] border-b-2 border-[#ffb81c]"
                                        : "text-gray-500 hover:text-[#1e5091]"
                                }`}
                                onClick={() => setActiveTab("history")}
                            >
                                Our History
                            </button>
                            <button
                                className={`px-6 py-3 text-lg font-medium ${
                                    activeTab === "partners"
                                        ? "text-[#1e5091] border-b-2 border-[#ffb81c]"
                                        : "text-gray-500 hover:text-[#1e5091]"
                                }`}
                                onClick={() => setActiveTab("partners")}
                            >
                                Our Partners
                            </button>
                        </div>

                        {/* Mission & Vision Content */}
                        {activeTab === "mission" && (
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h2 className="text-3xl font-bold text-[#1e5091] mb-6">Our Mission</h2>
                                    <div className="h-1 w-20 bg-[#ffb81c] mb-6 rounded-full"></div>
                                    <p className="text-gray-700 mb-6 text-lg">
                                        At iLearnZ, our mission is to democratize quality education across Africa through 
                                        innovative technology solutions that connect students, teachers, and parents in 
                                        a collaborative learning ecosystem.
                                    </p>
                                    <p className="text-gray-700 mb-6 text-lg">
                                        We believe that every child deserves access to quality education regardless of 
                                        their geographical location or socioeconomic background. Our platform bridges 
                                        these gaps by providing digital tools that enhance teaching and learning experiences.
                                    </p>
                                    <h2 className="text-3xl font-bold text-[#1e5091] mb-6 mt-12">Our Vision</h2>
                                    <div className="h-1 w-20 bg-[#ffb81c] mb-6 rounded-full"></div>
                                    <p className="text-gray-700 mb-6 text-lg">
                                        To create a future where every African student has equal access to world-class 
                                        education, empowering the next generation of leaders, innovators, and changemakers.
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="rounded-2xl overflow-hidden shadow-xl">
                                        <img 
                                            src="https://images.unsplash.com/photo-1544507888-56d73eb6046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                                            alt="African students learning" 
                                            className="w-full h-auto"
                                        />
                                    </div>
                                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#ffb81c] rounded-full opacity-20"></div>
                                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#1e5091] rounded-full opacity-20"></div>
                                </div>
                            </div>
                        )}

                        {/* Team Content */}
                        {activeTab === "team" && (
                            <div>
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-[#1e5091] mb-4">Meet Our Leadership Team</h2>
                                    <div className="h-1 w-20 bg-[#ffb81c] mx-auto mb-6 rounded-full"></div>
                                    <p className="text-gray-700 max-w-3xl mx-auto text-lg">
                                        Our diverse team of education experts, technologists, and visionaries work together 
                                        to revolutionize learning across Africa.
                                    </p>
                                </div>
                                
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {teamMembers.map((member, index) => (
                                        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
                                            <img 
                                                src={member.image} 
                                                alt={member.name} 
                                                className="w-full h-64 object-cover"
                                            />
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-[#1e5091]">{member.name}</h3>
                                                <p className="text-[#ffb81c] font-medium mb-3">{member.role}</p>
                                                <p className="text-gray-600">{member.bio}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-16 bg-[#1e5091]/5 rounded-xl p-8 border border-[#1e5091]/10">
                                    <h3 className="text-2xl font-bold text-[#1e5091] mb-4">Join Our Team</h3>
                                    <p className="text-gray-700 mb-6">
                                        We're always looking for passionate individuals to join our mission of transforming 
                                        education across Africa. Check out our current openings or send us your resume.
                                    </p>
                                    <a 
                                        href="#" 
                                        className="inline-block px-6 py-3 bg-[#1e5091] text-white rounded-full font-medium hover:bg-[#1e5091]/90 transition"
                                    >
                                        View Career Opportunities
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* History Content */}
                        {activeTab === "history" && (
                            <div>
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-[#1e5091] mb-4">Our Journey</h2>
                                    <div className="h-1 w-20 bg-[#ffb81c] mx-auto mb-6 rounded-full"></div>
                                    <p className="text-gray-700 max-w-3xl mx-auto text-lg">
                                        From a small startup to a leading EdTech platform across Africa, our journey has been 
                                        driven by a passion for transforming education.
                                    </p>
                                </div>
                                
                                <div className="relative border-l-4 border-[#1e5091] ml-6 pl-8 pb-8">
                                    {milestones.map((milestone, index) => (
                                        <div key={index} className="mb-12 relative">
                                            <div className="absolute -left-14 w-10 h-10 rounded-full bg-[#1e5091] flex items-center justify-center text-white font-bold">
                                                {milestone.year.substring(2)}
                                            </div>
                                            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                                                <div className="flex items-center mb-3">
                                                    <span className="text-[#ffb81c] font-bold text-xl mr-3">{milestone.year}</span>
                                                    <h3 className="text-xl font-bold text-[#1e5091]">{milestone.title}</h3>
                                                </div>
                                                <p className="text-gray-600">{milestone.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Partners Content */}
                        {activeTab === "partners" && (
                            <div>
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-[#1e5091] mb-4">Our Partners</h2>
                                    <div className="h-1 w-20 bg-[#ffb81c] mx-auto mb-6 rounded-full"></div>
                                    <p className="text-gray-700 max-w-3xl mx-auto text-lg">
                                        We collaborate with leading organizations to expand our impact and improve 
                                        educational outcomes across Africa.
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
                                    {partners.map((partner, index) => (
                                        <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center transition-transform hover:scale-105">
                                            <img 
                                                src={partner.logo} 
                                                alt={partner.name} 
                                                className="max-w-full h-auto"
                                            />
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="bg-[#1e5091]/5 rounded-xl p-8 border border-[#1e5091]/10">
                                    <h3 className="text-2xl font-bold text-[#1e5091] mb-4">Become a Partner</h3>
                                    <p className="text-gray-700 mb-6">
                                        Join our network of partners and help us transform education across Africa. 
                                        Whether you're a government agency, NGO, or private organization, we welcome 
                                        collaboration opportunities.
                                    </p>
                                    <a 
                                        href="#" 
                                        className="inline-block px-6 py-3 bg-[#1e5091] text-white rounded-full font-medium hover:bg-[#1e5091]/90 transition"
                                    >
                                        Partner With Us
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Call to Action */}
                    <div className="bg-[#1e5091] text-white py-16">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="text-3xl font-bold mb-6">Ready to transform your school with iLearnZ?</h2>
                            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                                Join thousands of schools across Africa that are already using our platform to enhance 
                                teaching and learning experiences.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/pricing"
                                    className="rounded-full bg-[#ffb81c] px-8 py-4 font-medium text-[#1e5091] transition hover:bg-[#ffb81c]/90 hover:shadow-xl"
                                >
                                    View Pricing
                                </Link>
                                <Link
                                    href={route("login")}
                                    className="rounded-full border-2 border-white px-8 py-4 font-medium text-white transition hover:bg-white/10 hover:shadow-xl"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="bg-gray-100 text-gray-600 py-12">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-lg font-bold text-[#1e5091] mb-4">iLearnZ</h3>
                                <p className="mb-4">Transforming education across Africa through innovative technology.</p>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-[#1e5091] hover:text-[#ffb81c]">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-[#1e5091] hover:text-[#ffb81c]">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-[#1e5091] hover:text-[#ffb81c]">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#1e5091] mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    <li><Link href="/" className="hover:text-[#1e5091]">Home</Link></li>
                                    <li><Link href="/about" className="hover:text-[#1e5091]">About Us</Link></li>
                                    <li><Link href="/pricing" className="hover:text-[#1e5091]">Pricing</Link></li>
                                    <li><Link href="/faq" className="hover:text-[#1e5091]">FAQ</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#1e5091] mb-4">Legal</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="hover:text-[#1e5091]">Privacy Policy</a></li>
                                    <li><a href="#" className="hover:text-[#1e5091]">Terms of Service</a></li>
                                    <li><a href="#" className="hover:text-[#1e5091]">Cookie Policy</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#1e5091] mb-4">Contact</h3>
                                <ul className="space-y-2">
                                    <li>123 Education Street</li>
                                    <li>Lusaka, Zambia</li>
                                    <li>contact@ilearnz.com</li>
                                    <li>+260 97 1234567</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                            <p>&copy; {new Date().getFullYear()} iLearnZ. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
