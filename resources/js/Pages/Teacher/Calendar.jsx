import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CalendarIcon,
    ClockIcon,
    BookOpenIcon,
    ClipboardDocumentCheckIcon,
    ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';

export default function Calendar({ auth, events }) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedView, setSelectedView] = useState('month'); // 'month', 'week', or 'day'

    // Function to get days in a month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Function to get the first day of the month (0 = Sunday, 1 = Monday, etc.)
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    // Function to get the name of the month
    const getMonthName = (month) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[month];
    };

    // Function to get the name of the day
    const getDayName = (day) => {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return dayNames[day];
    };

    // Function to navigate to previous month
    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    // Function to navigate to next month
    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    // Function to check if a date has events
    const hasEvents = (date) => {
        return events.some(event => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getDate() === date.getDate() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getFullYear() === date.getFullYear()
            );
        });
    };

    // Function to get events for a specific date
    const getEventsForDate = (date) => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getDate() === date.getDate() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getFullYear() === date.getFullYear()
            );
        });
    };

    // Function to render the calendar grid
    const renderCalendarGrid = () => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>);
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const dateHasEvents = hasEvents(date);

            days.push(
                <div 
                    key={`day-${day}`} 
                    className={`h-24 border border-gray-200 p-2 relative ${isToday ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedDate(date)}
                >
                    <div className="flex justify-between items-start">
                        <span 
                            className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-sm ${
                                isSelected 
                                    ? 'bg-[#1e5091] text-white' 
                                    : isToday 
                                        ? 'bg-blue-100 text-blue-800' 
                                        : ''
                            }`}
                        >
                            {day}
                        </span>
                        {dateHasEvents && (
                            <span className="h-2 w-2 rounded-full bg-[#ffb81c]"></span>
                        )}
                    </div>
                    <div className="mt-1 overflow-y-auto max-h-16">
                        {getEventsForDate(date).slice(0, 2).map((event, index) => (
                            <div 
                                key={`event-${day}-${index}`} 
                                className={`text-xs p-1 mb-1 rounded truncate ${
                                    event.type === 'class' 
                                        ? 'bg-blue-100 text-blue-800' 
                                        : event.type === 'assessment' 
                                            ? 'bg-red-100 text-red-800' 
                                            : 'bg-green-100 text-green-800'
                                }`}
                            >
                                {event.title}
                            </div>
                        ))}
                        {getEventsForDate(date).length > 2 && (
                            <div className="text-xs text-gray-500">
                                +{getEventsForDate(date).length - 2} more
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return days;
    };

    // Function to render the week view
    const renderWeekView = () => {
        // Get the start of the week (Sunday) for the selected date
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
        
        const days = [];
        
        // Create 7 days starting from the start of the week
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = date.toDateString() === selectedDate.toDateString();
            
            days.push(
                <div key={`week-day-${i}`} className="flex flex-col">
                    <div 
                        className={`text-center py-2 ${
                            isToday ? 'bg-blue-50' : ''
                        } ${
                            isSelected ? 'bg-[#1e5091]/10' : ''
                        }`}
                        onClick={() => setSelectedDate(date)}
                    >
                        <div className="text-xs text-gray-500">{getDayName(date.getDay())}</div>
                        <div 
                            className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-sm mt-1 ${
                                isSelected 
                                    ? 'bg-[#1e5091] text-white' 
                                    : isToday 
                                        ? 'bg-blue-100 text-blue-800' 
                                        : ''
                            }`}
                        >
                            {date.getDate()}
                        </div>
                    </div>
                    <div className="border-t border-gray-200 flex-grow overflow-y-auto p-2 space-y-2 h-96">
                        {getEventsForDate(date).map((event, index) => (
                            <div 
                                key={`week-event-${i}-${index}`} 
                                className={`p-2 rounded text-sm ${
                                    event.type === 'class' 
                                        ? 'bg-blue-100 text-blue-800' 
                                        : event.type === 'assessment' 
                                            ? 'bg-red-100 text-red-800' 
                                            : 'bg-green-100 text-green-800'
                                }`}
                            >
                                <div className="font-medium">{event.title}</div>
                                <div className="text-xs flex items-center mt-1">
                                    <ClockIcon className="h-3 w-3 mr-1" />
                                    {event.time}
                                </div>
                                {event.subject && (
                                    <div className="text-xs flex items-center mt-1">
                                        <BookOpenIcon className="h-3 w-3 mr-1" />
                                        {event.subject}
                                    </div>
                                )}
                            </div>
                        ))}
                        {getEventsForDate(date).length === 0 && (
                            <div className="text-xs text-gray-500 text-center py-4">
                                No events
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        
        return (
            <div className="grid grid-cols-7 gap-1 h-full">
                {days}
            </div>
        );
    };

    // Function to render the day view
    const renderDayView = () => {
        const eventsForDay = getEventsForDate(selectedDate);
        
        // Group events by hour
        const hourlyEvents = {};
        for (let i = 7; i <= 19; i++) { // 7 AM to 7 PM
            hourlyEvents[i] = [];
        }
        
        eventsForDay.forEach(event => {
            const hour = parseInt(event.time.split(':')[0]);
            if (hourlyEvents[hour]) {
                hourlyEvents[hour].push(event);
            }
        });
        
        return (
            <div className="space-y-2 p-4 h-full overflow-y-auto">
                <div className="text-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </h3>
                </div>
                
                {Object.keys(hourlyEvents).map(hour => (
                    <div key={`hour-${hour}`} className="flex">
                        <div className="w-16 text-right pr-4 text-gray-500 text-sm">
                            {hour > 12 ? `${hour - 12} PM` : hour == 12 ? '12 PM' : `${hour} AM`}
                        </div>
                        <div className="flex-grow border-l border-gray-200 pl-4 pb-6 relative">
                            {hourlyEvents[hour].length > 0 ? (
                                hourlyEvents[hour].map((event, index) => (
                                    <div 
                                        key={`day-event-${hour}-${index}`} 
                                        className={`p-3 rounded mb-2 ${
                                            event.type === 'class' 
                                                ? 'bg-blue-100 text-blue-800' 
                                                : event.type === 'assessment' 
                                                    ? 'bg-red-100 text-red-800' 
                                                    : 'bg-green-100 text-green-800'
                                        }`}
                                    >
                                        <div className="font-medium">{event.title}</div>
                                        <div className="text-sm flex items-center mt-1">
                                            <ClockIcon className="h-4 w-4 mr-1" />
                                            {event.time}
                                            {event.duration && ` (${event.duration})`}
                                        </div>
                                        {event.subject && (
                                            <div className="text-sm flex items-center mt-1">
                                                <BookOpenIcon className="h-4 w-4 mr-1" />
                                                {event.subject}
                                            </div>
                                        )}
                                        {event.description && (
                                            <div className="text-sm mt-2">
                                                {event.description}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="h-6 border-b border-dashed border-gray-200"></div>
                            )}
                        </div>
                    </div>
                ))}
                
                {eventsForDay.length === 0 && (
                    <div className="text-center py-12">
                        <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No events scheduled</h3>
                        <p className="mt-1 text-sm text-gray-500">There are no events scheduled for this day.</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center">
                    <Link 
                        href={route('teacher.dashboard')} 
                        className="mr-3 p-1 rounded-full hover:bg-gray-200 transition-all"
                    >
                        <ArrowLeftCircleIcon className="h-5 w-5 text-gray-600" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-[#1e5091]">
                        Calendar
                    </h2>
                </div>
            }
        >
            <Head title="Calendar" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Calendar Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <button
                                        onClick={prevMonth}
                                        className="p-1 rounded-full hover:bg-gray-200 transition-all"
                                    >
                                        <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                                    </button>
                                    <h2 className="text-xl font-semibold text-gray-900 mx-4">
                                        {getMonthName(currentMonth)} {currentYear}
                                    </h2>
                                    <button
                                        onClick={nextMonth}
                                        className="p-1 rounded-full hover:bg-gray-200 transition-all"
                                    >
                                        <ArrowRightIcon className="h-5 w-5 text-gray-600" />
                                    </button>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setSelectedView('month')}
                                        className={`px-3 py-1 rounded-md text-sm ${
                                            selectedView === 'month' 
                                                ? 'bg-[#1e5091] text-white' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        Month
                                    </button>
                                    <button
                                        onClick={() => setSelectedView('week')}
                                        className={`px-3 py-1 rounded-md text-sm ${
                                            selectedView === 'week' 
                                                ? 'bg-[#1e5091] text-white' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        Week
                                    </button>
                                    <button
                                        onClick={() => setSelectedView('day')}
                                        className={`px-3 py-1 rounded-md text-sm ${
                                            selectedView === 'day' 
                                                ? 'bg-[#1e5091] text-white' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        Day
                                    </button>
                                </div>
                            </div>

                            {/* Calendar View */}
                            {selectedView === 'month' && (
                                <>
                                    {/* Day Names */}
                                    <div className="grid grid-cols-7 gap-1 mb-1">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                            <div key={day} className="text-center py-2 text-sm font-medium text-gray-500">
                                                {day}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Calendar Grid */}
                                    <div className="grid grid-cols-7 gap-1">
                                        {renderCalendarGrid()}
                                    </div>
                                </>
                            )}

                            {selectedView === 'week' && renderWeekView()}
                            
                            {selectedView === 'day' && renderDayView()}

                            {/* Event Legend */}
                            <div className="mt-6 flex items-center space-x-4">
                                <div className="flex items-center">
                                    <span className="h-3 w-3 rounded-full bg-blue-100 border border-blue-800 mr-1"></span>
                                    <span className="text-xs text-gray-600">Classes</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="h-3 w-3 rounded-full bg-red-100 border border-red-800 mr-1"></span>
                                    <span className="text-xs text-gray-600">Assessments</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="h-3 w-3 rounded-full bg-green-100 border border-green-800 mr-1"></span>
                                    <span className="text-xs text-gray-600">Meetings</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selected Date Events */}
                    {selectedDate && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Events for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </h3>
                                
                                {getEventsForDate(selectedDate).length > 0 ? (
                                    <div className="space-y-4">
                                        {getEventsForDate(selectedDate).map((event, index) => (
                                            <div 
                                                key={`selected-event-${index}`} 
                                                className={`p-4 rounded-lg border ${
                                                    event.type === 'class' 
                                                        ? 'border-blue-200 bg-blue-50' 
                                                        : event.type === 'assessment' 
                                                            ? 'border-red-200 bg-red-50' 
                                                            : 'border-green-200 bg-green-50'
                                                }`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                                                        <div className="mt-2 flex items-center text-sm text-gray-500">
                                                            <ClockIcon className="h-4 w-4 mr-1" />
                                                            <span>{event.time}</span>
                                                            {event.duration && (
                                                                <span className="ml-1">({event.duration})</span>
                                                            )}
                                                        </div>
                                                        {event.subject && (
                                                            <div className="mt-1 flex items-center text-sm text-gray-500">
                                                                <BookOpenIcon className="h-4 w-4 mr-1" />
                                                                <span>{event.subject}</span>
                                                            </div>
                                                        )}
                                                        {event.type === 'assessment' && (
                                                            <div className="mt-1 flex items-center text-sm text-gray-500">
                                                                <ClipboardDocumentCheckIcon className="h-4 w-4 mr-1" />
                                                                <span>Due date</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        event.type === 'class' 
                                                            ? 'bg-blue-100 text-blue-800' 
                                                            : event.type === 'assessment' 
                                                                ? 'bg-red-100 text-red-800' 
                                                                : 'bg-green-100 text-green-800'
                                                    }`}>
                                                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                                    </span>
                                                </div>
                                                {event.description && (
                                                    <div className="mt-3 text-sm text-gray-600">
                                                        {event.description}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
                                        <p className="mt-1 text-sm text-gray-500">There are no events scheduled for this day.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
