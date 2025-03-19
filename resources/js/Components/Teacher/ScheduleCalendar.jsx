import React, { useState, useEffect } from 'react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function ScheduleCalendar({ classes }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState('week'); // 'day', 'week', 'month'
    const [calendarDays, setCalendarDays] = useState([]);
    const [scheduleItems, setScheduleItems] = useState([]);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Time slots for day view
    const timeSlots = Array.from({ length: 12 }, (_, i) => ({
        hour: i + 7, // Start from 7 AM
        label: `${i + 7 > 12 ? i + 7 - 12 : i + 7}:00 ${i + 7 >= 12 ? 'PM' : 'AM'}`
    }));

    useEffect(() => {
        generateCalendarDays();
        generateScheduleItems();
    }, [currentDate, currentView, classes]);

    const generateCalendarDays = () => {
        let days = [];
        const today = new Date();

        if (currentView === 'day') {
            days = [currentDate];
        } else if (currentView === 'week') {
            // Get the first day of the week (Sunday)
            const firstDayOfWeek = new Date(currentDate);
            const day = currentDate.getDay();
            firstDayOfWeek.setDate(currentDate.getDate() - day);

            // Generate 7 days starting from the first day of the week
            for (let i = 0; i < 7; i++) {
                const date = new Date(firstDayOfWeek);
                date.setDate(firstDayOfWeek.getDate() + i);
                days.push(date);
            }
        } else if (currentView === 'month') {
            // Get the first day of the month
            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            
            // Get the first day to display (might be from the previous month)
            const firstDayToDisplay = new Date(firstDayOfMonth);
            firstDayToDisplay.setDate(firstDayToDisplay.getDate() - firstDayOfMonth.getDay());
            
            // Generate days until we cover the entire month plus padding days
            const daysToGenerate = 42; // 6 weeks
            for (let i = 0; i < daysToGenerate; i++) {
                const date = new Date(firstDayToDisplay);
                date.setDate(firstDayToDisplay.getDate() + i);
                days.push(date);
                
                // Stop if we've gone past the last day of the month and completed the week
                if (date > lastDayOfMonth && date.getDay() === 6) {
                    break;
                }
            }
        }

        setCalendarDays(days);
    };

    const generateScheduleItems = () => {
        // Process classes data to create schedule items
        if (!classes || !classes.length) {
            setScheduleItems([]);
            return;
        }

        // In a real app, you would process the classes data to extract schedule information
        // For now, we'll create some sample data
        const items = [];

        classes.forEach(classItem => {
            // Parse schedule from class data if available
            // This is a placeholder - in a real app, you'd use actual schedule data
            const daysToSchedule = ['Monday', 'Wednesday', 'Friday']; // Example days
            
            daysToSchedule.forEach(day => {
                const dayIndex = daysOfWeek.indexOf(day);
                if (dayIndex >= 0) {
                    // Create a schedule item for each class on each scheduled day
                    items.push({
                        id: `${classItem.id}-${day}`,
                        title: classItem.name || 'Class',
                        subject: classItem.subjects && classItem.subjects[0] ? classItem.subjects[0].name : 'General',
                        day: dayIndex,
                        startTime: '10:00',
                        endTime: '11:30',
                        location: 'Room 101',
                        classId: classItem.id
                    });
                }
            });
        });

        setScheduleItems(items);
    };

    const navigatePrevious = () => {
        const newDate = new Date(currentDate);
        if (currentView === 'day') {
            newDate.setDate(currentDate.getDate() - 1);
        } else if (currentView === 'week') {
            newDate.setDate(currentDate.getDate() - 7);
        } else if (currentView === 'month') {
            newDate.setMonth(currentDate.getMonth() - 1);
        }
        setCurrentDate(newDate);
    };

    const navigateNext = () => {
        const newDate = new Date(currentDate);
        if (currentView === 'day') {
            newDate.setDate(currentDate.getDate() + 1);
        } else if (currentView === 'week') {
            newDate.setDate(currentDate.getDate() + 7);
        } else if (currentView === 'month') {
            newDate.setMonth(currentDate.getMonth() + 1);
        }
        setCurrentDate(newDate);
    };

    const navigateToday = () => {
        setCurrentDate(new Date());
    };

    const formatDate = (date) => {
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const isCurrentMonth = (date) => {
        return date.getMonth() === currentDate.getMonth();
    };

    const getScheduleItemsForDay = (date) => {
        const day = date.getDay();
        return scheduleItems.filter(item => item.day === day);
    };

    const renderDayView = () => {
        const daySchedule = getScheduleItemsForDay(currentDate);
        
        return (
            <div className="mt-4">
                <div className="bg-[#1e5091]/5 p-3 rounded-lg text-center font-medium">
                    {daysOfWeek[currentDate.getDay()]}, {formatDate(currentDate)}
                </div>
                <div className="mt-4 space-y-2">
                    {timeSlots.map((slot, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2">
                            <div className="col-span-2 text-right pr-2 text-sm text-gray-500 pt-2">
                                {slot.label}
                            </div>
                            <div className="col-span-10 min-h-[60px] border-l-2 border-gray-200 pl-2">
                                {daySchedule
                                    .filter(item => {
                                        const startHour = parseInt(item.startTime.split(':')[0]);
                                        return startHour === slot.hour;
                                    })
                                    .map(item => (
                                        <div 
                                            key={item.id} 
                                            className="bg-[#1e5091] text-white p-2 rounded-md mb-1"
                                        >
                                            <div className="font-medium">{item.title}</div>
                                            <div className="text-xs">{item.startTime} - {item.endTime}</div>
                                            <div className="text-xs">{item.location}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderWeekView = () => {
        return (
            <div className="mt-4">
                <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((date, index) => (
                        <div 
                            key={index} 
                            className={`text-center p-2 ${isToday(date) ? 'bg-[#1e5091]/10 rounded-t-lg font-bold text-[#1e5091]' : ''}`}
                        >
                            <div className="text-xs uppercase">{daysOfWeek[date.getDay()].substring(0, 3)}</div>
                            <div className={`text-sm mt-1 ${isToday(date) ? 'bg-[#1e5091] text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto' : ''}`}>
                                {date.getDate()}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1 mt-1">
                    {calendarDays.map((date, dateIndex) => (
                        <div 
                            key={dateIndex} 
                            className={`min-h-[150px] border border-gray-100 p-1 ${isToday(date) ? 'bg-[#1e5091]/5' : ''}`}
                        >
                            <div className="space-y-1">
                                {getScheduleItemsForDay(date).map((item, itemIndex) => (
                                    <div 
                                        key={`${dateIndex}-${itemIndex}`} 
                                        className="bg-[#1e5091] text-white p-1 rounded-md text-xs"
                                    >
                                        <div className="font-medium">{item.title}</div>
                                        <div>{item.startTime} - {item.endTime}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderMonthView = () => {
        return (
            <div className="mt-4">
                <div className="grid grid-cols-7 gap-1">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className="text-center p-1 text-xs font-medium text-gray-500">
                            {day.substring(0, 3)}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1 mt-1">
                    {calendarDays.map((date, index) => (
                        <div 
                            key={index} 
                            className={`min-h-[80px] border border-gray-100 p-1 
                                ${isToday(date) ? 'bg-[#1e5091]/5' : ''}
                                ${!isCurrentMonth(date) ? 'text-gray-400 bg-gray-50' : ''}`}
                        >
                            <div className={`text-right text-xs mb-1 ${isToday(date) ? 'font-bold text-[#1e5091]' : ''}`}>
                                {date.getDate()}
                            </div>
                            <div className="space-y-1">
                                {getScheduleItemsForDay(date).slice(0, 2).map((item, itemIndex) => (
                                    <div 
                                        key={`${index}-${itemIndex}`} 
                                        className="bg-[#1e5091] text-white p-0.5 rounded-md text-xs truncate"
                                    >
                                        {item.title}
                                    </div>
                                ))}
                                {getScheduleItemsForDay(date).length > 2 && (
                                    <div className="text-xs text-center text-gray-500">
                                        +{getScheduleItemsForDay(date).length - 2} more
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        My Schedule
                    </h2>
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => setCurrentView('day')}
                            className={`px-2 py-1 text-xs rounded-md ${currentView === 'day' ? 'bg-[#1e5091] text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            Day
                        </button>
                        <button 
                            onClick={() => setCurrentView('week')}
                            className={`px-2 py-1 text-xs rounded-md ${currentView === 'week' ? 'bg-[#1e5091] text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            Week
                        </button>
                        <button 
                            onClick={() => setCurrentView('month')}
                            className={`px-2 py-1 text-xs rounded-md ${currentView === 'month' ? 'bg-[#1e5091] text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            Month
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={navigatePrevious}
                            className="p-1 rounded-full hover:bg-gray-100"
                        >
                            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        <button 
                            onClick={navigateNext}
                            className="p-1 rounded-full hover:bg-gray-100"
                        >
                            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        <h3 className="text-base font-medium">
                            {currentView === 'day' ? formatDate(currentDate) : 
                             currentView === 'week' ? `${formatDate(calendarDays[0])} - ${formatDate(calendarDays[6])}` :
                             `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                        </h3>
                    </div>
                    <button 
                        onClick={navigateToday}
                        className="px-3 py-1 text-xs bg-[#1e5091]/10 text-[#1e5091] rounded-md hover:bg-[#1e5091]/20"
                    >
                        Today
                    </button>
                </div>

                {currentView === 'day' && renderDayView()}
                {currentView === 'week' && renderWeekView()}
                {currentView === 'month' && renderMonthView()}
            </div>
        </div>
    );
}
