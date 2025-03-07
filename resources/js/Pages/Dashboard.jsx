import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-[#1e5091]">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-[#1e5091]/10">
                        <div className="p-6 text-[#1e5091] border-l-4 border-[#ffb81c]">
                            <span className="font-medium">Welcome!</span> You're logged in to iLearn.
                        </div>
                    </div>
                    
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#1e5091]/10 hover:shadow-md transition-all">
                            <h3 className="text-lg font-medium text-[#1e5091] mb-3">Quick Stats</h3>
                            <div className="h-2 w-16 bg-[#ffb81c] rounded-full mb-4"></div>
                            <p className="text-gray-600">View your learning progress and achievements.</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#1e5091]/10 hover:shadow-md transition-all">
                            <h3 className="text-lg font-medium text-[#1e5091] mb-3">Recent Activities</h3>
                            <div className="h-2 w-16 bg-[#ffb81c] rounded-full mb-4"></div>
                            <p className="text-gray-600">Check your latest learning activities and assignments.</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#1e5091]/10 hover:shadow-md transition-all">
                            <h3 className="text-lg font-medium text-[#1e5091] mb-3">Resources</h3>
                            <div className="h-2 w-16 bg-[#ffb81c] rounded-full mb-4"></div>
                            <p className="text-gray-600">Access learning materials and additional resources.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
