import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function Faq() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("general");
    const [expandedQuestions, setExpandedQuestions] = useState({});

    // FAQ categories and questions
    const faqCategories = [
        { id: "general", name: "General" },
        { id: "platform", name: "Platform Features" },
        { id: "account", name: "Account & Access" },
        { id: "technical", name: "Technical Support" },
        { id: "billing", name: "Billing & Pricing" },
    ];

    const faqQuestions = {
        general: [
            {
                id: "what-is-ilearnz",
                question: "What is iLearnZ?",
                answer: "iLearnZ is a comprehensive school management system designed specifically for African schools. Our platform connects teachers, students, and parents in a collaborative digital environment to enhance the educational experience. We provide tools for classroom management, content delivery, assessment, reporting, and communication."
            },
            {
                id: "who-can-use",
                question: "Who can use iLearnZ?",
                answer: "iLearnZ is designed for primary and secondary schools across Africa. Our platform serves school administrators, teachers, students, and parents, providing each user type with specific features tailored to their needs."
            },
            {
                id: "languages",
                question: "What languages is iLearnZ available in?",
                answer: "Currently, iLearnZ is available in English, French, Swahili, and Portuguese, covering the major languages used in educational systems across Africa. We're continuously working to add more languages to make our platform accessible to all."
            },
            {
                id: "internet-requirements",
                question: "What are the internet requirements for using iLearnZ?",
                answer: "iLearnZ is designed to work efficiently even in areas with limited internet connectivity. Our platform uses minimal data and has offline capabilities for essential functions. For optimal experience, we recommend a basic broadband connection, but the system can function on slower connections as well."
            }
        ],
        platform: [
            {
                id: "key-features",
                question: "What are the key features of iLearnZ?",
                answer: "iLearnZ offers a wide range of features including: digital classroom management, curriculum and lesson planning tools, assessment creation and grading, student performance analytics, resource library, communication tools for parents and teachers, attendance tracking, and school administration tools."
            },
            {
                id: "mobile-access",
                question: "Can iLearnZ be accessed on mobile devices?",
                answer: "Yes, iLearnZ is fully responsive and can be accessed on smartphones and tablets. We also offer dedicated mobile apps for Android and iOS devices, optimized for use in areas with limited connectivity."
            },
            {
                id: "data-security",
                question: "How does iLearnZ ensure data security?",
                answer: "We take data security very seriously. iLearnZ employs industry-standard encryption protocols, regular security audits, and strict access controls. All student data is protected in compliance with international data protection standards. We never share or sell user data to third parties."
            },
            {
                id: "offline-access",
                question: "Can iLearnZ be used offline?",
                answer: "Yes, certain features of iLearnZ can be used offline. Teachers and students can download lessons and resources for offline access. When internet connectivity is restored, the system automatically syncs any work completed offline."
            }
        ],
        account: [
            {
                id: "account-setup",
                question: "How do I set up accounts for my school?",
                answer: "Once your school subscribes to iLearnZ, an administrator account will be created. The administrator can then create accounts for teachers, who in turn can set up student accounts and parent access. We also offer bulk account creation options for larger schools."
            },
            {
                id: "login-issues",
                question: "What should I do if I can't log in?",
                answer: "If you're having trouble logging in, you can: 1) Use the 'Forgot Password' option on the login page, 2) Contact your school administrator if you're a teacher, student, or parent, 3) Contact our support team through the help center or email support@ilearnz.com."
            },
            {
                id: "multiple-roles",
                question: "Can a user have multiple roles?",
                answer: "Yes, a user can have multiple roles in the system. For example, a teacher might also be a parent of a student at the school. Our system allows for multiple role assignments while maintaining appropriate access controls for each role."
            }
        ],
        technical: [
            {
                id: "browser-compatibility",
                question: "Which browsers are compatible with iLearnZ?",
                answer: "iLearnZ works with all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of these browsers. Internet Explorer is not fully supported."
            },
            {
                id: "technical-requirements",
                question: "What are the technical requirements for using iLearnZ?",
                answer: "iLearnZ is web-based and requires minimal technical specifications. Any computer, tablet, or smartphone manufactured in the last 5 years should be capable of running the platform efficiently. For desktop/laptop users, we recommend at least 4GB of RAM and a modern web browser."
            },
            {
                id: "support-options",
                question: "What technical support options are available?",
                answer: "We offer multiple support channels including: 24/7 email support, live chat during business hours, comprehensive knowledge base and tutorials, phone support for premium subscribers, and dedicated account managers for enterprise clients."
            }
        ],
        billing: [
            {
                id: "pricing-model",
                question: "How does iLearnZ pricing work?",
                answer: "Our pricing is based on the number of students in your school and the features you need. We offer three main plans: Basic, Standard, and Premium, with discounts available for annual subscriptions. Please visit our Pricing page for detailed information."
            },
            {
                id: "payment-methods",
                question: "What payment methods do you accept?",
                answer: "We accept various payment methods including credit/debit cards, bank transfers, mobile money services (like M-Pesa, MTN Mobile Money), and PayPal. We also offer special payment arrangements for government-funded schools."
            },
            {
                id: "refund-policy",
                question: "What is your refund policy?",
                answer: "If you're not satisfied with iLearnZ, you can request a refund within 30 days of your initial subscription. For annual subscriptions, we offer prorated refunds if cancelled mid-term. Please contact our billing department at billing@ilearnz.com for specific refund requests."
            },
            {
                id: "subscription-changes",
                question: "Can I change my subscription plan?",
                answer: "Yes, you can upgrade your subscription at any time, with the price difference prorated for your current billing period. Downgrades will take effect at the start of your next billing cycle. All changes can be made through your admin dashboard or by contacting our support team."
            }
        ]
    };

    // Toggle question expansion
    const toggleQuestion = (questionId) => {
        setExpandedQuestions({
            ...expandedQuestions,
            [questionId]: !expandedQuestions[questionId]
        });
    };

    // Filter questions based on search query
    const filteredQuestions = searchQuery.trim() === "" 
        ? faqQuestions[activeCategory] 
        : Object.values(faqQuestions)
            .flat()
            .filter(q => 
                q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                q.answer.toLowerCase().includes(searchQuery.toLowerCase())
            );

    return (
        <>
            <Head title="FAQ - iLearnZ" />
            <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white overflow-hidden font-sans">
                {/* Header/Navigation */}
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
                            className="rounded-full px-6 py-2.5 font-medium text-[#1e5091] transition hover:bg-[#1e5091]/10 border border-transparent hover:border-[#1e5091]/20"
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
                            className="rounded-full bg-[#1e5091] px-6 py-2.5 font-medium text-white transition hover:bg-[#1e5091]/90 shadow-md hover:shadow-[#1e5091]/20"
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
                    <div className="bg-[#1e5091] text-white py-16 relative overflow-hidden">
                        <div className="container mx-auto px-6 text-center relative z-10">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
                            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                                Find answers to common questions about iLearnZ and how it can transform your school's educational experience.
                            </p>
                            
                            {/* Search bar */}
                            <div className="max-w-2xl mx-auto relative">
                                <input
                                    type="text"
                                    placeholder="Search for answers..."
                                    className="w-full py-4 px-6 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffb81c]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="absolute right-4 top-4 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute top-10 right-10 w-20 h-20 bg-[#ffb81c]/20 rounded-full"></div>
                        <div className="absolute bottom-10 left-10 w-16 h-16 bg-[#ffb81c]/30 rounded-full"></div>
                    </div>

                    {/* FAQ Content */}
                    <div className="container mx-auto px-6 py-16">
                        {searchQuery.trim() === "" ? (
                            <div className="grid md:grid-cols-4 gap-8">
                                {/* Category sidebar */}
                                <div className="md:col-span-1">
                                    <div className="sticky top-24">
                                        <h3 className="text-xl font-bold text-[#1e5091] mb-4">Categories</h3>
                                        <ul className="space-y-2">
                                            {faqCategories.map(category => (
                                                <li key={category.id}>
                                                    <button
                                                        className={`w-full text-left px-4 py-2 rounded-lg transition ${
                                                            activeCategory === category.id
                                                                ? "bg-[#1e5091] text-white"
                                                                : "text-gray-700 hover:bg-gray-100"
                                                        }`}
                                                        onClick={() => setActiveCategory(category.id)}
                                                    >
                                                        {category.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                {/* Questions and answers */}
                                <div className="md:col-span-3">
                                    <h2 className="text-2xl font-bold text-[#1e5091] mb-6">
                                        {faqCategories.find(c => c.id === activeCategory).name} Questions
                                    </h2>
                                    
                                    <div className="space-y-4">
                                        {faqQuestions[activeCategory].map(item => (
                                            <div 
                                                key={item.id} 
                                                className="border border-gray-200 rounded-lg overflow-hidden"
                                            >
                                                <button
                                                    className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50"
                                                    onClick={() => toggleQuestion(item.id)}
                                                >
                                                    <span className="font-medium text-lg text-[#1e5091]">{item.question}</span>
                                                    <svg 
                                                        className={`w-5 h-5 text-gray-500 transition-transform ${expandedQuestions[item.id] ? 'rotate-180' : ''}`} 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                                
                                                {expandedQuestions[item.id] && (
                                                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                                                        <p className="text-gray-700">{item.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold text-[#1e5091] mb-6">
                                    Search Results {filteredQuestions.length > 0 ? `(${filteredQuestions.length})` : ''}
                                </h2>
                                
                                {filteredQuestions.length > 0 ? (
                                    <div className="space-y-4">
                                        {filteredQuestions.map(item => (
                                            <div 
                                                key={item.id} 
                                                className="border border-gray-200 rounded-lg overflow-hidden"
                                            >
                                                <button
                                                    className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50"
                                                    onClick={() => toggleQuestion(item.id)}
                                                >
                                                    <span className="font-medium text-lg text-[#1e5091]">{item.question}</span>
                                                    <svg 
                                                        className={`w-5 h-5 text-gray-500 transition-transform ${expandedQuestions[item.id] ? 'rotate-180' : ''}`} 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                                
                                                {expandedQuestions[item.id] && (
                                                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                                                        <p className="text-gray-700">{item.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-5xl mb-4">🔍</div>
                                        <h3 className="text-xl font-medium text-gray-700 mb-2">No results found</h3>
                                        <p className="text-gray-500">
                                            We couldn't find any questions matching "{searchQuery}". Try using different keywords or browse by category.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Contact Section */}
                    <div className="bg-gray-50 py-16">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="text-3xl font-bold text-[#1e5091] mb-4">Still have questions?</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                                If you couldn't find the answer you were looking for, our support team is here to help.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-md max-w-xs w-full">
                                    <div className="w-12 h-12 bg-[#1e5091]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1e5091]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1e5091] mb-2">Email Support</h3>
                                    <p className="text-gray-600 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
                                    <a href="mailto:support@ilearnz.com" className="text-[#1e5091] font-medium hover:underline">support@ilearnz.com</a>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-md max-w-xs w-full">
                                    <div className="w-12 h-12 bg-[#1e5091]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1e5091]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1e5091] mb-2">Phone Support</h3>
                                    <p className="text-gray-600 mb-4">Available Monday to Friday, 8am to 6pm CAT.</p>
                                    <a href="tel:+260971234567" className="text-[#1e5091] font-medium hover:underline">+260 97 1234567</a>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-md max-w-xs w-full">
                                    <div className="w-12 h-12 bg-[#1e5091]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1e5091]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1e5091] mb-2">Live Chat</h3>
                                    <p className="text-gray-600 mb-4">Chat with our support team in real-time.</p>
                                    <button className="text-[#1e5091] font-medium hover:underline">Start Chat</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-100 text-gray-600 py-12">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-lg font-bold text-[#1e5091] mb-4">iLearnZ</h3>
                                <p className="mb-4">Transforming education across Africa through innovative technology.</p>
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
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#1e5091] mb-4">Contact</h3>
                                <ul className="space-y-2">
                                    <li>123 Education Street</li>
                                    <li>Lusaka, Zambia</li>
                                    <li>contact@ilearnz.com</li>
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
