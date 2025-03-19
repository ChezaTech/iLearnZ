import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    AcademicCapIcon,
    BookOpenIcon,
    CalendarIcon,
    ClipboardDocumentCheckIcon,
    DocumentPlusIcon,
    UserGroupIcon,
    BellAlertIcon,
    ClockIcon,
    ChartBarIcon,
} from '@heroicons/react/24/outline';
import CreateAssignmentForm from '@/Components/Teacher/CreateAssignmentForm';
import ScheduleCalendar from '@/Components/Teacher/ScheduleCalendar';
import StudentManagement from '@/Components/Teacher/StudentManagement';

export default function TeacherDashboard({ auth, classes, subjects, assessments, announcements, schedule }) {
    const { user } = auth;
    const [activeTab, setActiveTab] = useState('classes');
    const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showStudentManagement, setShowStudentManagement] = useState(false);

    // Extract last name for personalized greeting
    const nameParts = user.name.split(' ');
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

    // Get current time for greeting
    const currentHour = new Date().getHours();
    let greeting = 'Good evening';
    if (currentHour < 12) {
        greeting = 'Good morning';
    } else if (currentHour < 18) {
        greeting = 'Good afternoon';
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-[#1e5091]">
                    Teacher Dashboard
                </h2>
            }
        >
            <Head title="Teacher Dashboard" />

            {/* Header & Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden mb-6">
                <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1e5091]">
                                {greeting}, Mr. {lastName}!
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Welcome to your teaching dashboard. Here's an overview of your classes and activities.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <button className="p-2 bg-[#1e5091]/10 rounded-full hover:bg-[#1e5091]/20 transition-all">
                                    <BellAlertIcon className="h-6 w-6 text-[#1e5091]" />
                                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                                        3
                                    </span>
                                </button>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1e5091] to-[#1e5091] flex items-center justify-center text-white font-semibold text-lg border-2 border-[#ffb81c]">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button 
                            className="inline-flex items-center px-4 py-2 bg-[#1e5091] text-white rounded-lg text-sm font-medium hover:bg-[#1e5091]/90 transition-all"
                            onClick={() => setShowCreateAssignmentModal(true)}
                        >
                            <DocumentPlusIcon className="h-5 w-5 mr-2" />
                            Create Assignment
                        </button>
                        <button 
                            className="inline-flex items-center px-4 py-2 bg-[#ffb81c] text-[#1e5091] rounded-lg text-sm font-medium hover:bg-[#ffb81c]/90 transition-all"
                            onClick={() => setShowScheduleModal(!showScheduleModal)}
                        >
                            <CalendarIcon className="h-5 w-5 mr-2" />
                            {showScheduleModal ? 'Hide Schedule' : 'View Schedule'}
                        </button>
                        <button 
                            className="inline-flex items-center px-4 py-2 bg-white border border-[#1e5091]/20 text-[#1e5091] rounded-lg text-sm font-medium hover:bg-[#1e5091]/5 transition-all"
                            onClick={() => setShowStudentManagement(!showStudentManagement)}
                        >
                            <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                            {showStudentManagement ? 'Hide Students' : 'Manage Students'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Schedule Calendar (Conditionally Rendered) */}
            {showScheduleModal && (
                <div className="mb-6">
                    <ScheduleCalendar classes={classes || []} />
                </div>
            )}

            {/* Student Management (Conditionally Rendered) */}
            {showStudentManagement && (
                <div className="mb-6">
                    <StudentManagement classes={classes || []} />
                </div>
            )}

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - My Classes & My Students */}
                <div className="lg:col-span-2 space-y-6">
                    {/* My Classes Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                                <AcademicCapIcon className="h-5 w-5 mr-2" />
                                My Classes
                            </h2>
                            <Link href="#" className="text-sm text-[#1e5091] hover:text-[#ffb81c] transition-all">
                                View All
                            </Link>
                        </div>
                        <div className="p-6">
                            {classes && classes.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {classes.map((classItem) => (
                                        <div key={classItem.id} className="py-4 first:pt-0 last:pb-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-base font-medium text-gray-900">
                                                        {classItem.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Grade {classItem.grade_level} | {classItem.section} | {classItem.students?.length || 0} students
                                                    </p>
                                                </div>
                                                <Link
                                                    href={route('classes.show', classItem.id)}
                                                    className="px-3 py-1 bg-[#1e5091]/10 text-[#1e5091] rounded-lg text-sm hover:bg-[#1e5091]/20 transition-all"
                                                >
                                                    Details
                                                </Link>
                                            </div>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {classItem.subjects?.map((subject) => (
                                                    <span
                                                        key={subject.id}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ffb81c]/10 text-[#ffb81c]"
                                                    >
                                                        {subject.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <AcademicCapIcon className="h-12 w-12 text-gray-400 mx-auto" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No classes assigned</h3>
                                    <p className="mt-1 text-sm text-gray-500">You don't have any classes assigned yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* My Students Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                                <UserGroupIcon className="h-5 w-5 mr-2" />
                                My Students
                            </h2>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    className="w-48 px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5091]"
                                />
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Class
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Performance
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {classes && classes.length > 0 ? (
                                            classes.flatMap(classItem => 
                                                classItem.students && classItem.students.length > 0 ? 
                                                classItem.students.map(student => {
                                                    // Get student's latest performance if available
                                                    const performance = student.performances && student.performances.length > 0 
                                                        ? student.performances[0].average_score 
                                                        : null;
                                                    
                                                    // Calculate color based on performance
                                                    let performanceColor = 'gray';
                                                    if (performance !== null) {
                                                        if (performance >= 80) performanceColor = 'green';
                                                        else if (performance >= 60) performanceColor = 'yellow';
                                                        else performanceColor = 'red';
                                                    }
                                                    
                                                    // Get student initials for avatar
                                                    const nameParts = student.name.split(' ');
                                                    const initials = nameParts.length > 1 
                                                        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
                                                        : student.name.substring(0, 2);
                                                    
                                                    return (
                                                        <tr key={student.id}>
                                                            <td className="px-3 py-2 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="h-8 w-8 rounded-full bg-[#1e5091]/20 flex items-center justify-center text-[#1e5091] font-medium">
                                                                        {initials.toUpperCase()}
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                                        <div className="text-xs text-gray-500">
                                                                            ID: {student.student ? student.student.student_id_number : 'N/A'}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                                                                Grade {classItem.grade_level}-{classItem.section}
                                                            </td>
                                                            <td className="px-3 py-2 whitespace-nowrap">
                                                                {performance !== null ? (
                                                                    <div className="flex items-center">
                                                                        <div className="w-16 bg-gray-200 rounded-full h-2.5">
                                                                            <div 
                                                                                className={`bg-${performanceColor}-500 h-2.5 rounded-full`} 
                                                                                style={{ width: `${performance}%` }}
                                                                            ></div>
                                                                        </div>
                                                                        <span className="ml-2 text-xs font-medium text-gray-600">{performance}%</span>
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-xs text-gray-500">No data</span>
                                                                )}
                                                            </td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-sm">
                                                                <Link href="#" className="text-[#1e5091] hover:text-[#ffb81c]">
                                                                    View
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                                : []
                                            )
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-3 py-4 text-center text-sm text-gray-500">
                                                    No students found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Schedule, Subjects, Assessments, Announcements */}
                <div className="space-y-6">
                    {/* My Schedule Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                                <CalendarIcon className="h-5 w-5 mr-2" />
                                My Schedule
                            </h2>
                            <Link href="#" className="text-sm text-[#1e5091] hover:text-[#ffb81c] transition-all">
                                Full View
                            </Link>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-medium text-gray-900">Today's Classes</h3>
                                <span className="text-xs text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="space-y-3">
                                {schedule && schedule.length > 0 ? (
                                    schedule.flatMap((item, index) => 
                                        item.todaySubjects.map((subject, subIndex) => {
                                            // Parse schedule to get time if available
                                            const scheduleInfo = subject.pivot.schedule || '';
                                            const timeMatch = scheduleInfo.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
                                            const timeSlot = timeMatch ? `${timeMatch[1]} - ${timeMatch[2]}` : 'Scheduled today';
                                            
                                            // Determine if class is current, upcoming, or past
                                            const now = new Date();
                                            const currentHour = now.getHours();
                                            const currentMinute = now.getMinutes();
                                            
                                            let status = 'upcoming';
                                            let statusColor = 'yellow';
                                            
                                            if (timeMatch) {
                                                const [startHour, startMinute] = timeMatch[1].split(':').map(Number);
                                                const [endHour, endMinute] = timeMatch[2].split(':').map(Number);
                                                
                                                const isStarted = (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute));
                                                const isEnded = (currentHour > endHour || (currentHour === endHour && currentMinute >= endMinute));
                                                
                                                if (isStarted && !isEnded) {
                                                    status = 'current';
                                                    statusColor = 'red';
                                                } else if (isEnded) {
                                                    status = 'past';
                                                    statusColor = 'gray';
                                                }
                                            }
                                            
                                            return (
                                                <div 
                                                    key={`${item.class.id}-${subject.id}-${subIndex}`} 
                                                    className={`flex items-center p-3 bg-${statusColor}-50 rounded-lg border border-${statusColor}-100`}
                                                >
                                                    <div className="mr-3 flex-shrink-0">
                                                        <ClockIcon className={`h-5 w-5 text-${statusColor}-600`} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">{subject.name}</p>
                                                        <p className="text-xs text-gray-600">
                                                            Grade {item.class.grade_level}-{item.class.section} • {timeSlot}
                                                        </p>
                                                    </div>
                                                    <button 
                                                        className={`px-3 py-1 ${status === 'past' 
                                                            ? 'bg-gray-200 text-gray-700' 
                                                            : 'bg-[#1e5091] text-white'} rounded text-xs`}
                                                    >
                                                        {status === 'current' ? 'Join' : status === 'upcoming' ? 'Upcoming' : 'Completed'}
                                                    </button>
                                                </div>
                                            );
                                        })
                                    )
                                ) : (
                                    <div className="text-center py-4">
                                        <CalendarIcon className="h-10 w-10 text-gray-400 mx-auto" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No classes scheduled</h3>
                                        <p className="mt-1 text-xs text-gray-500">You don't have any classes scheduled for today.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* My Subjects Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                                <BookOpenIcon className="h-5 w-5 mr-2" />
                                My Subjects
                            </h2>
                            <Link href="#" className="text-sm text-[#1e5091] hover:text-[#ffb81c] transition-all">
                                View All
                            </Link>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-3">
                                {subjects && subjects.length > 0 ? (
                                    subjects.map((subject) => {
                                        // Generate a color based on subject name for the badge
                                        const colors = ['blue', 'purple', 'green', 'red', 'yellow', 'indigo', 'pink'];
                                        const colorIndex = subject.name.length % colors.length;
                                        const color = colors[colorIndex];
                                        
                                        return (
                                            <div key={subject.id} className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#1e5091]/30 hover:shadow-sm transition-all">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-sm font-medium text-gray-900">{subject.name}</h3>
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}>
                                                        {subject.classes && subject.classes.length > 0 
                                                            ? `Grade ${subject.classes[0].grade_level}` 
                                                            : 'All Grades'}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-xs text-gray-600">
                                                    {subject.classes ? subject.classes.length : 0} classes • {subject.students_count || 0} students
                                                </p>
                                                <div className="mt-2 flex justify-end">
                                                    <Link 
                                                        href={subject.classes && subject.classes.length > 0 
                                                            ? route('classes.subjects.materials.index', {
                                                                class: subject.classes[0].id,
                                                                subject: subject.id
                                                            }) 
                                                            : '#'}
                                                        className="text-xs text-[#1e5091] hover:text-[#ffb81c]"
                                                    >
                                                        View Materials
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-4">
                                        <BookOpenIcon className="h-10 w-10 text-gray-400 mx-auto" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No subjects assigned</h3>
                                        <p className="mt-1 text-xs text-gray-500">You don't have any subjects assigned yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* My Assessments Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                                My Assessments
                            </h2>
                            <Link href="#" className="text-sm text-[#1e5091] hover:text-[#ffb81c] transition-all">
                                View All
                            </Link>
                        </div>
                        <div className="p-6">
                            <div className="space-y-3">
                                {assessments && assessments.length > 0 ? (
                                    assessments.map((assessment) => {
                                        // Determine status and style based on due date and submissions
                                        const now = new Date();
                                        const dueDate = assessment.due_date ? new Date(assessment.due_date) : null;
                                        
                                        let status = 'active';
                                        let bgColor = 'yellow';
                                        let statusText = '';
                                        
                                        if (dueDate && dueDate < now) {
                                            status = 'past';
                                            bgColor = 'gray';
                                            statusText = 'Past Due';
                                        } else if (assessment.submissions_count && assessment.submissions_count > 0) {
                                            status = 'needs_grading';
                                            bgColor = 'red';
                                            statusText = `Needs Grading (${assessment.submissions_count})`;
                                        } else if (assessment.graded_count && assessment.graded_count > 0) {
                                            status = 'graded';
                                            bgColor = 'green';
                                            statusText = 'Graded';
                                        }
                                        
                                        // Format due date
                                        const formattedDueDate = dueDate 
                                            ? dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                            : 'No due date';
                                        
                                        return (
                                            <div key={assessment.id} className={`flex items-center justify-between p-3 bg-${bgColor}-50 rounded-lg border border-${bgColor}-100`}>
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0 mr-3">
                                                        <div className={`h-8 w-8 rounded-full bg-${bgColor}-100 flex items-center justify-center text-${bgColor}-600`}>
                                                            <ClipboardDocumentCheckIcon className="h-4 w-4" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-900">{assessment.title}</h3>
                                                        <p className="text-xs text-gray-600">
                                                            {assessment.class?.name || 'All Classes'} • Due: {formattedDueDate}
                                                        </p>
                                                        {statusText && (
                                                            <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-${bgColor}-100 text-${bgColor}-800`}>
                                                                {statusText}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <Link 
                                                    href={route('classes.subjects.assessments.show', {
                                                        class: assessment.class_id,
                                                        subject: assessment.subject_id,
                                                        assessment: assessment.id
                                                    })} 
                                                    className="text-xs text-[#1e5091] hover:text-[#ffb81c]"
                                                >
                                                    {status === 'needs_grading' ? 'Grade' : 'View'}
                                                </Link>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-4">
                                        <ClipboardDocumentCheckIcon className="h-10 w-10 text-gray-400 mx-auto" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No assessments</h3>
                                        <p className="mt-1 text-xs text-gray-500">You haven't created any assessments yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Announcements Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                                <BellAlertIcon className="h-5 w-5 mr-2" />
                                Announcements
                            </h2>
                            <Link href="#" className="text-sm text-[#1e5091] hover:text-[#ffb81c] transition-all">
                                View All
                            </Link>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {announcements && announcements.length > 0 ? (
                                    announcements.map((announcement) => {
                                        // Determine border color based on priority or type
                                        let borderColor = 'gray-300';
                                        if (announcement.priority === 'high') {
                                            borderColor = '#1e5091';
                                        } else if (announcement.priority === 'medium') {
                                            borderColor = '#ffb81c';
                                        }
                                        
                                        // Format time ago
                                        const createdAt = new Date(announcement.created_at);
                                        const now = new Date();
                                        const diffInHours = Math.floor((now - createdAt) / (1000 * 60 * 60));
                                        
                                        let timeAgo = '';
                                        if (diffInHours < 1) {
                                            timeAgo = 'Just now';
                                        } else if (diffInHours < 24) {
                                            timeAgo = `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
                                        } else {
                                            const diffInDays = Math.floor(diffInHours / 24);
                                            timeAgo = `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
                                        }
                                        
                                        return (
                                            <div key={announcement.id} className={`border-l-4 border-${borderColor} pl-3 py-1`}>
                                                <h3 className="text-sm font-medium text-gray-900">{announcement.title}</h3>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    {announcement.content}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-2">{timeAgo}</p>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-4">
                                        <BellAlertIcon className="h-10 w-10 text-gray-400 mx-auto" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No announcements</h3>
                                        <p className="mt-1 text-xs text-gray-500">There are no announcements at this time.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Assignment Modal */}
            <CreateAssignmentForm 
                show={showCreateAssignmentModal}
                onClose={() => setShowCreateAssignmentModal(false)}
                classes={classes || []}
                subjects={subjects || []}
            />
        </AuthenticatedLayout>
    );
}
