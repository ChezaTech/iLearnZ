import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from "recharts";
import { Tab } from "@headlessui/react";
import {
    UserGroupIcon,
    AcademicCapIcon,
    BookOpenIcon,
    Cog6ToothIcon,
    ChartBarIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

// Import tab components
import DashboardTab from "@/Pages/SchoolAdmin/Tabs/DashboardTab";
import TeachersTab from "@/Pages/SchoolAdmin/Tabs/TeachersTab";
import GradesTab from "@/Pages/SchoolAdmin/Tabs/GradesTab";
import LibraryTab from "@/Pages/SchoolAdmin/Tabs/LibraryTab";
import SettingsTab from "@/Pages/SchoolAdmin/Tabs/SettingsTab";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function SchoolAdmin({
    auth,
    grades,
    teachers,
    students,
    error,
}) {
    const [stats, setStats] = useState({
        totalTeachers: 6,
        totalStudents: 120,
        totalClasses: 8,
        attendanceRate: 92,
        averageGrade: 78,
    });

    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Annual Science Fair",
            date: "2025-03-15",
            type: "academic",
        },
        {
            id: 2,
            title: "Parent-Teacher Conference",
            date: "2025-04-05",
            type: "meeting",
        },
        {
            id: 3,
            title: "Inter-School Sports Tournament",
            date: "2025-05-10",
            type: "sports",
        },
    ]);

    const [resources, setResources] = useState([
        {
            id: 1,
            name: "Science Laboratory Kit",
            type: "equipment",
            condition: "good",
            quantity: 15,
        },
        {
            id: 2,
            name: "Online Learning Platform Subscription",
            type: "digital",
            condition: "excellent",
            quantity: 1,
        },
    ]);

    const [recentReportCards, setRecentReportCards] = useState([
        {
            id: 1,
            student: "Tendai Mutasa",
            grade: "Form 5",
            term: "First Term",
            average: 82.5,
        },
        {
            id: 2,
            student: "Chipo Dziva",
            grade: "Form 4",
            term: "First Term",
            average: 88.75,
        },
    ]);

    const attendanceData = [
        { month: "Jan", attendance: 94 },
        { month: "Feb", attendance: 91 },
        { month: "Mar", attendance: 93 },
        { month: "Apr", attendance: 89 },
        { month: "May", attendance: 92 },
        { month: "Jun", attendance: 90 },
    ];

    const gradeDistribution = [
        { name: "A", value: 25 },
        { name: "B", value: 35 },
        { name: "C", value: 30 },
        { name: "D", value: 8 },
        { name: "F", value: 2 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

    // Mock data for teachers
    const [schoolTeachers, setSchoolTeachers] = useState(teachers);

    // Mock data for grades
    const [schoolGrades, setSchoolGrades] = useState(grades);

    // Mock data for library books
    const [books, setBooks] = useState([
        {
            id: 1,
            title: "Mathematics Textbook Grade 5",
            author: "Ministry of Education",
            category: "Textbook",
            status: "Available",
            copies: 30,
        },
        {
            id: 2,
            title: "English Grammar Guide",
            author: "Oxford Press",
            category: "Reference",
            status: "Available",
            copies: 20,
        },
        {
            id: 3,
            title: "Science Encyclopedia",
            author: "National Geographic",
            category: "Reference",
            status: "Available",
            copies: 15,
        },
        {
            id: 4,
            title: "History of Zambia",
            author: "Andrew Roberts",
            category: "Textbook",
            status: "Available",
            copies: 25,
        },
        {
            id: 5,
            title: "Computer Basics",
            author: "Tech Publishing",
            category: "Textbook",
            status: "Available",
            copies: 18,
        },
    ]);

    // Mock data for school settings
    const [settings, setSettings] = useState({
        schoolName: "Lusaka Primary School",
        address: "123 Independence Avenue, Lusaka",
        phone: "+260 211 123456",
        email: "info@lusakaprimary.edu.zm",
        principal: "Dr. Mulenga Chilufya",
        academicYear: "2025",
        terms: 3,
        schoolHours: "07:30 - 16:00",
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    School Admin Dashboard
                </h2>
            }
        >
            <Head title="School Admin " />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Tab.Group>
                        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                            <Tab
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                                ${
                                    selected
                                        ? "bg-white shadow"
                                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                }`
                                }
                            >
                                <div className="flex items-center justify-center">
                                    <ChartBarIcon className="h-5 w-5 mr-2" />
                                    Dashboard
                                </div>
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                                ${
                                    selected
                                        ? "bg-white shadow"
                                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                }`
                                }
                            >
                                <div className="flex items-center justify-center">
                                    <UserGroupIcon className="h-5 w-5 mr-2" />
                                    Teachers
                                </div>
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                                ${
                                    selected
                                        ? "bg-white shadow"
                                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                }`
                                }
                            >
                                <div className="flex items-center justify-center">
                                    <AcademicCapIcon className="h-5 w-5 mr-2" />
                                    Grades
                                </div>
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                                ${
                                    selected
                                        ? "bg-white shadow"
                                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                }`
                                }
                            >
                                <div className="flex items-center justify-center">
                                    <BookOpenIcon className="h-5 w-5 mr-2" />
                                    Library
                                </div>
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                                ${
                                    selected
                                        ? "bg-white shadow"
                                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                }`
                                }
                            >
                                <div className="flex items-center justify-center">
                                    <Cog6ToothIcon className="h-5 w-5 mr-2" />
                                    Settings
                                </div>
                            </Tab>
                        </Tab.List>
                        <Tab.Panels className="mt-2">
                            {/* Dashboard Panel */}
                            <Tab.Panel className="rounded-xl bg-white p-3">
                                <DashboardTab
                                    stats={stats}
                                    events={events}
                                    resources={resources}
                                    recentReportCards={recentReportCards}
                                />
                            </Tab.Panel>

                            {/* Teachers Panel */}
                            <Tab.Panel className="rounded-xl bg-white p-3">
                                <TeachersTab teachers={schoolTeachers} />
                            </Tab.Panel>

                            {/* Grades Panel */}
                            <Tab.Panel className="rounded-xl bg-white p-3">
                                <GradesTab
                                    grades={schoolGrades}
                                    teachers={schoolTeachers}
                                    students={students}
                                />
                            </Tab.Panel>

                            {/* Library Panel */}
                            <Tab.Panel className="rounded-xl bg-white p-3">
                                <LibraryTab books={books} />
                            </Tab.Panel>

                            {/* Settings Panel */}
                            <Tab.Panel className="rounded-xl bg-white p-3">
                                <SettingsTab settings={settings} />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
