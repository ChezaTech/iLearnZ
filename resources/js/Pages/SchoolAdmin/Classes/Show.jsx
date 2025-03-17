import React, { useState, Fragment } from "react";
import { Head, Link } from "@inertiajs/react";
import { Tab } from "@headlessui/react";
import {
    UserIcon,
    BookOpenIcon,
    PencilIcon,
    TrashIcon,
    PlusIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import StudentsTab from "./StudentsTab";
import SubjectsTab from "./SubjectsTab";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Show({
    auth,
    class: classData,
    availableTeachers,
    availableStudents,
    books,
}) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <AuthenticatedLayout>
            <>
                <Head title={`Class: ${classData.name}`} />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                {/* Class Information */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Class Information
                                    </h3>
                                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                Name
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {classData.name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                Grade Level
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {classData.grade_level}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                Section
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {classData.section || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                Teacher
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {classData.teacher
                                                    ? classData.teacher.name
                                                    : "Not Assigned"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                Academic Year
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {classData.academic_year}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                Students
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {classData.students.length} /{" "}
                                                {classData.max_students}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <Tab.Group onChange={setActiveTab}>
                                    <Tab.List className="flex p-1 space-x-1 bg-gray-100 rounded-xl">
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    "w-full py-2.5 text-sm font-medium leading-5 text-gray-700",
                                                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                                    selected
                                                        ? "bg-white shadow rounded-lg"
                                                        : "hover:bg-white/[0.12] hover:text-gray-800"
                                                )
                                            }
                                        >
                                            <div className="flex items-center justify-center">
                                                <UserIcon className="h-5 w-5 mr-2" />
                                                Students
                                            </div>
                                        </Tab>
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    "w-full py-2.5 text-sm font-medium leading-5 text-gray-700",
                                                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                                    selected
                                                        ? "bg-white shadow rounded-lg"
                                                        : "hover:bg-white/[0.12] hover:text-gray-800"
                                                )
                                            }
                                        >
                                            <div className="flex items-center justify-center">
                                                <BookOpenIcon className="h-5 w-5 mr-2" />
                                                Subjects
                                            </div>
                                        </Tab>
                                    </Tab.List>
                                    <Tab.Panels className="mt-2">
                                        {/* Students Tab */}
                                        <Tab.Panel className="p-3">
                                            <StudentsTab
                                                classData={classData}
                                                availableStudents={
                                                    availableStudents
                                                }
                                            />
                                        </Tab.Panel>

                                        {/* Subjects Tab */}
                                        <Tab.Panel className="p-3">
                                            <SubjectsTab
                                                classData={classData}
                                                availableTeachers={
                                                    availableTeachers
                                                }
                                                books={books}
                                            />
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </AuthenticatedLayout>
    );
}
