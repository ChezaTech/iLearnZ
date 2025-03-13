import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    AcademicCapIcon,
    UserGroupIcon,
    BookOpenIcon,
    BuildingLibraryIcon,
    UserIcon,
    PencilSquareIcon,
    ArrowLeftIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function Show({ school, students, teachers, classes, admins, books }) {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Tabs for different sections of the school details
    const tabs = [
        { name: 'overview', label: 'Overview', icon: BuildingLibraryIcon },
        { name: 'students', label: 'Students', icon: AcademicCapIcon },
        { name: 'teachers', label: 'Teachers', icon: UserGroupIcon },
        { name: 'classes', label: 'Classes', icon: BookOpenIcon },
        { name: 'admins', label: 'Administrators', icon: UserIcon },
        { name: 'library', label: 'Library', icon: BookOpenIcon },
    ];

    return (
        <AuthenticatedLayout>
            <Head title={`${school.name} - School Details`} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Back button and school name */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link 
                                href={route('superadmin.dashboard')} 
                                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                                <span>Back to Dashboard</span>
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900">{school.name}</h1>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {school.code}
                            </span>
                        </div>
                        <Link
                            href="#"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <PencilSquareIcon className="h-4 w-4 mr-2" />
                            Edit School
                        </Link>
                    </div>
                    
                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`
                                        flex items-center py-4 px-1 border-b-2 font-medium text-sm
                                        ${activeTab === tab.name
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                                    `}
                                >
                                    <tab.icon className="h-5 w-5 mr-2" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                    
                    {/* Content based on active tab */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {activeTab === 'overview' && <OverviewTab school={school} />}
                        {activeTab === 'students' && <StudentsTab students={students} />}
                        {activeTab === 'teachers' && <TeachersTab teachers={teachers} />}
                        {activeTab === 'classes' && <ClassesTab classes={classes} />}
                        {activeTab === 'admins' && <AdminsTab admins={admins} />}
                        {activeTab === 'library' && <LibraryTab school={school} />}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Overview Tab Component
function OverviewTab({ school }) {
    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">School Information</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">School Name</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.name}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">School Code</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.code}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">District</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.district}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Type</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.type}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Connectivity Status</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.connectivity_status}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.address}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">City</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.city}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Province</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.province}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.phone}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.email || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Principal Name</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.principal_name || 'Not provided'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Internet Provider</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.internet_provider || 'Not provided'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Has Smartboards</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.has_smartboards ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500">Students</h3>
                                <p className="mt-1 text-2xl font-semibold text-blue-600">{school.student_count}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500">Teachers</h3>
                                <p className="mt-1 text-2xl font-semibold text-green-600">{school.teacher_count}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500">Classes</h3>
                                <p className="mt-1 text-2xl font-semibold text-purple-600">0</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500">Books</h3>
                                <p className="mt-1 text-2xl font-semibold text-amber-600">0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Students Tab Component
function StudentsTab({ students }) {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Students</h2>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Student
                </button>
            </div>
            
            {students && students.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-600 font-medium">{student.name.charAt(0)}</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.grade}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${student.performance === 'Excellent' ? 'bg-green-100 text-green-800' : 
                                            student.performance === 'Good' ? 'bg-blue-100 text-blue-800' : 
                                            student.performance === 'Average' ? 'bg-yellow-100 text-yellow-800' : 
                                            'bg-red-100 text-red-800'}`}>
                                            {student.performance}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-gray-50 p-6 text-center rounded-lg">
                    <p className="text-gray-500">No students found for this school.</p>
                    <button className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add First Student
                    </button>
                </div>
            )}
        </div>
    );
}

// Teachers Tab Component
function TeachersTab({ teachers }) {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Teachers</h2>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Teacher
                </button>
            </div>
            
            {teachers && teachers.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {teachers.map((teacher) => (
                                <tr key={teacher.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-600 font-medium">{teacher.name.charAt(0)}</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${teacher.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                            teacher.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 
                                            'bg-red-100 text-red-800'}`}>
                                            {teacher.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-gray-50 p-6 text-center rounded-lg">
                    <p className="text-gray-500">No teachers found for this school.</p>
                    <button className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add First Teacher
                    </button>
                </div>
            )}
        </div>
    );
}

// Classes Tab Component
function ClassesTab({ classes }) {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Classes</h2>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Class
                </button>
            </div>
            
            {classes && classes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((classItem) => (
                        <div key={classItem.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-900">{classItem.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">Grade {classItem.grade}</p>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500">Students</p>
                                        <p className="text-sm font-medium">{classItem.student_count}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Teacher</p>
                                        <p className="text-sm font-medium">{classItem.teacher_name}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button className="text-blue-600 hover:text-blue-900 text-sm">View</button>
                                    <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 p-6 text-center rounded-lg">
                    <p className="text-gray-500">No classes found for this school.</p>
                    <button className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add First Class
                    </button>
                </div>
            )}
        </div>
    );
}

// Admins Tab Component
function AdminsTab({ admins }) {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">School Administrators</h2>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Administrator
                </button>
            </div>
            
            {admins && admins.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {admins.map((admin) => (
                                <tr key={admin.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-600 font-medium">{admin.name.charAt(0)}</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${admin.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {admin.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-gray-50 p-6 text-center rounded-lg">
                    <p className="text-gray-500">No administrators found for this school.</p>
                    <button className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add First Administrator
                    </button>
                </div>
            )}
        </div>
    );
}

// Library Tab Component
function LibraryTab({ school }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        author: '',
        isbn: '',
        publication_year: '',
        category: '',
        school_id: school.id,
    });

    const borrowForm = useForm({
        user_id: '',
        due_date: '',
        book_id: '',
    });

    const [books, setBooks] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showBorrowModal, setShowBorrowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const { auth } = usePage().props;

    useEffect(() => {
        // Fetch books for this school
        axios.get(`/api/schools/${school.id}/books`)
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, [school.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const submitBook = (e) => {
        e.preventDefault();
        post(route('books.store'), {
            onSuccess: () => {
                reset();
                setShowAddModal(false);
                // Refresh books list
                axios.get(`/api/schools/${school.id}/books`)
                    .then(response => {
                        setBooks(response.data);
                    });
            }
        });
    };

    const openEditModal = (book) => {
        setSelectedBook(book);
        setData({
            title: book.title,
            author: book.author,
            isbn: book.isbn || '',
            publication_year: book.publication_year || '',
            category: book.category || '',
            school_id: school.id,
        });
        setShowEditModal(true);
    };

    const updateBook = (e) => {
        e.preventDefault();
        put(route('books.update', selectedBook.id), {
            onSuccess: () => {
                reset();
                setShowEditModal(false);
                setSelectedBook(null);
                // Refresh books list
                axios.get(`/api/schools/${school.id}/books`)
                    .then(response => {
                        setBooks(response.data);
                    });
            }
        });
    };

    const openBorrowModal = (book) => {
        setSelectedBook(book);
        borrowForm.setData('book_id', book.id);
        setShowBorrowModal(true);
    };

    const borrowBook = (e) => {
        e.preventDefault();
        borrowForm.post(route('books.borrow', selectedBook.id), {
            onSuccess: () => {
                borrowForm.reset();
                setShowBorrowModal(false);
                setSelectedBook(null);
                // Refresh books list
                axios.get(`/api/schools/${school.id}/books`)
                    .then(response => {
                        setBooks(response.data);
                    });
            }
        });
    };

    const returnBook = (book) => {
        if (confirm('Are you sure you want to mark this book as returned?')) {
            axios.post(route('books.return', book.id))
                .then(() => {
                    // Refresh books list
                    axios.get(`/api/schools/${school.id}/books`)
                        .then(response => {
                            setBooks(response.data);
                        });
                })
                .catch(error => {
                    console.error('Error returning book:', error);
                });
        }
    };

    const deleteBook = (book) => {
        if (confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
            axios.delete(route('books.destroy', book.id))
                .then(() => {
                    // Refresh books list
                    axios.get(`/api/schools/${school.id}/books`)
                        .then(response => {
                            setBooks(response.data);
                        });
                })
                .catch(error => {
                    console.error('Error deleting book:', error);
                });
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Library Books</h2>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Book
                </button>
            </div>
            
            {books && books.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div key={book.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
                            <div className="h-40 bg-gray-200 flex items-center justify-center">
                                <BookOpenIcon className="h-16 w-16 text-gray-400" />
                            </div>
                            <div className="p-4">
                                <h3 className="text-md font-semibold text-gray-900 truncate">{book.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">By {book.author}</p>
                                {book.isbn && <p className="text-xs text-gray-500 mt-1">ISBN: {book.isbn}</p>}
                                {book.category && <p className="text-xs text-gray-500 mt-1">Category: {book.category}</p>}
                                {book.publication_year && <p className="text-xs text-gray-500 mt-1">Published: {book.publication_year}</p>}
                                
                                <div className="mt-3 flex justify-between items-center">
                                    <span className={`px-2 py-1 text-xs rounded-full 
                                        ${!book.is_borrowed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {!book.is_borrowed ? 'Available' : 'Borrowed'}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => openEditModal(book)}
                                            className="text-blue-600 hover:text-blue-900 text-sm"
                                        >
                                            Edit
                                        </button>
                                        {!book.is_borrowed ? (
                                            <button 
                                                onClick={() => openBorrowModal(book)}
                                                className="text-green-600 hover:text-green-900 text-sm"
                                            >
                                                Borrow
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => returnBook(book)}
                                                className="text-orange-600 hover:text-orange-900 text-sm"
                                            >
                                                Return
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => deleteBook(book)}
                                            className="text-red-600 hover:text-red-900 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 p-6 text-center rounded-lg">
                    <p className="text-gray-500">No books found in the library.</p>
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add First Book
                    </button>
                </div>
            )}
            
            {/* Add Book Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Book</h3>
                            <form onSubmit={submitBook}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                    <input
                                        type="text"
                                        id="author"
                                        name="author"
                                        value={data.author}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                                    <input
                                        type="text"
                                        id="isbn"
                                        name="isbn"
                                        value={data.isbn}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.isbn && <p className="text-red-500 text-xs mt-1">{errors.isbn}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="publication_year" className="block text-sm font-medium text-gray-700 mb-1">Publication Year</label>
                                    <input
                                        type="number"
                                        id="publication_year"
                                        name="publication_year"
                                        value={data.publication_year}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.publication_year && <p className="text-red-500 text-xs mt-1">{errors.publication_year}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={data.category}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                                </div>
                                
                                <input type="hidden" name="school_id" value={data.school_id} />
                                
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddModal(false);
                                            reset();
                                        }}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Book'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Edit Book Modal */}
            {showEditModal && selectedBook && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Book</h3>
                            <form onSubmit={updateBook}>
                                <div className="mb-4">
                                    <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        id="edit-title"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="edit-author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                    <input
                                        type="text"
                                        id="edit-author"
                                        name="author"
                                        value={data.author}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="edit-isbn" className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                                    <input
                                        type="text"
                                        id="edit-isbn"
                                        name="isbn"
                                        value={data.isbn}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.isbn && <p className="text-red-500 text-xs mt-1">{errors.isbn}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="edit-publication_year" className="block text-sm font-medium text-gray-700 mb-1">Publication Year</label>
                                    <input
                                        type="number"
                                        id="edit-publication_year"
                                        name="publication_year"
                                        value={data.publication_year}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.publication_year && <p className="text-red-500 text-xs mt-1">{errors.publication_year}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        id="edit-category"
                                        name="category"
                                        value={data.category}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                                </div>
                                
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowEditModal(false);
                                            setSelectedBook(null);
                                            reset();
                                        }}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Updating...' : 'Update Book'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Borrow Book Modal */}
            {showBorrowModal && selectedBook && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Borrow Book: {selectedBook.title}</h3>
                            <form onSubmit={borrowBook}>
                                <div className="mb-4">
                                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-1">Student/User</label>
                                    <select
                                        id="user_id"
                                        name="user_id"
                                        value={borrowForm.data.user_id}
                                        onChange={(e) => borrowForm.setData('user_id', e.target.value)}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    >
                                        <option value="">Select a user</option>
                                        {/* This would be populated with users from the school */}
                                        <option value="1">John Doe (Student)</option>
                                        <option value="2">Jane Smith (Teacher)</option>
                                    </select>
                                    {borrowForm.errors.user_id && <p className="text-red-500 text-xs mt-1">{borrowForm.errors.user_id}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        id="due_date"
                                        name="due_date"
                                        value={borrowForm.data.due_date}
                                        onChange={(e) => borrowForm.setData('due_date', e.target.value)}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    {borrowForm.errors.due_date && <p className="text-red-500 text-xs mt-1">{borrowForm.errors.due_date}</p>}
                                </div>
                                
                                <input type="hidden" name="book_id" value={selectedBook.id} />
                                
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowBorrowModal(false);
                                            setSelectedBook(null);
                                            borrowForm.reset();
                                        }}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={borrowForm.processing}
                                        className="px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {borrowForm.processing ? 'Processing...' : 'Confirm Borrowing'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
