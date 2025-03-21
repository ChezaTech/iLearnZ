import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function Pricing() {
    const [billingPeriod, setBillingPeriod] = useState("monthly");
    const [showComparison, setShowComparison] = useState(false);

    const plans = [
        {
            name: "Basic",
            description: "Perfect for small schools just getting started",
            monthlyPrice: 199,
            yearlyPrice: 1990,
            features: [
                "Up to 200 students",
                "10 teacher accounts",
                "Basic reporting",
                "Student portal",
                "Parent portal",
                "Email support"
            ],
            cta: "Get Started",
            popular: false
        },
        {
            name: "Standard",
            description: "Ideal for growing schools with more needs",
            monthlyPrice: 399,
            yearlyPrice: 3990,
            features: [
                "Up to 500 students",
                "30 teacher accounts",
                "Advanced reporting",
                "Student & parent portal",
                "Resource library",
                "Assessment tools",
                "Priority email support",
                "Phone support"
            ],
            cta: "Get Started",
            popular: true
        },
        {
            name: "Premium",
            description: "For large schools requiring comprehensive solutions",
            monthlyPrice: 799,
            yearlyPrice: 7990,
            features: [
                "Unlimited students",
                "Unlimited teacher accounts",
                "Custom reporting",
                "Advanced analytics",
                "Resource library",
                "Assessment tools",
                "API access",
                "24/7 priority support",
                "Dedicated account manager"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    return (
        <>
            <Head title="Pricing - iLearnZ" />
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
                            className="rounded-full bg-[#1e5091] px-6 py-2.5 font-medium text-white transition hover:bg-[#1e5091]/90 shadow-md hover:shadow-[#1e5091]/20"
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
                    <div className="bg-[#1e5091] text-white py-16 relative overflow-hidden">
                        <div className="container mx-auto px-6 text-center relative z-10">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
                            <p className="text-xl text-white/80 max-w-2xl mx-auto">
                                Choose the plan that's right for your school and start transforming your educational experience today.
                            </p>
                            
                            {/* Billing toggle */}
                            <div className="mt-8 inline-flex items-center bg-white/10 p-1 rounded-full">
                                <button
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                                        billingPeriod === "monthly" 
                                            ? "bg-white text-[#1e5091]" 
                                            : "text-white hover:bg-white/20"
                                    }`}
                                    onClick={() => setBillingPeriod("monthly")}
                                >
                                    Monthly
                                </button>
                                <button
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                                        billingPeriod === "yearly" 
                                            ? "bg-white text-[#1e5091]" 
                                            : "text-white hover:bg-white/20"
                                    }`}
                                    onClick={() => setBillingPeriod("yearly")}
                                >
                                    Yearly <span className="text-[#ffb81c]">Save 17%</span>
                                </button>
                            </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute top-10 right-10 w-20 h-20 bg-[#ffb81c]/20 rounded-full"></div>
                        <div className="absolute bottom-10 left-10 w-16 h-16 bg-[#ffb81c]/30 rounded-full"></div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="container mx-auto px-6 py-16">
                        <div className="grid md:grid-cols-3 gap-8">
                            {plans.map((plan, index) => (
                                <div 
                                    key={index} 
                                    className={`rounded-2xl overflow-hidden border ${
                                        plan.popular 
                                            ? "border-[#ffb81c] shadow-lg shadow-[#ffb81c]/10" 
                                            : "border-gray-200 shadow-md"
                                    } transition-transform hover:scale-105`}
                                >
                                    {plan.popular && (
                                        <div className="bg-[#ffb81c] text-[#1e5091] text-center py-2 font-medium">
                                            Most Popular
                                        </div>
                                    )}
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-[#1e5091]">{plan.name}</h3>
                                        <p className="text-gray-600 mt-2 mb-6">{plan.description}</p>
                                        <div className="mb-6">
                                            <span className="text-4xl font-bold text-[#1e5091]">
                                                ${billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                                            </span>
                                            <span className="text-gray-600">/{billingPeriod === "monthly" ? "month" : "year"}</span>
                                        </div>
                                        <ul className="space-y-3 mb-8">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-start">
                                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                    <span className="text-gray-700">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <button 
                                            className={`w-full py-3 rounded-full font-medium ${
                                                plan.popular 
                                                    ? "bg-[#ffb81c] text-[#1e5091] hover:bg-[#ffb81c]/90" 
                                                    : "bg-[#1e5091] text-white hover:bg-[#1e5091]/90"
                                            } transition`}
                                        >
                                            {plan.cta}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

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
                </main>
            </div>
        </>
    );
}
