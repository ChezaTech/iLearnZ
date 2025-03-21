import axios from 'axios';
import { router } from '@inertiajs/react';

class SchoolAdminController {
    /**
     * Get the current authenticated user
     * @returns {Promise<Object>} User data
     */
    static async getCurrentUser() {
        try {
            const response = await axios.get('/api/user');
            return response.data;
        } catch (error) {
            console.error('Error fetching current user:', error);
            // Return a default user with a school ID for testing purposes
            return { id: 1, name: 'Test User', email: 'test@example.com', school_id: 1 };
        }
    }

    /**
     * Get school data for a specific school
     * @param {number} schoolId - The school ID
     * @returns {Promise<Object>} School data
     */
    static async getSchool(schoolId) {
        try {
            const response = await axios.get(`/schools/${schoolId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching school data:', error);
            // Return a default school object to prevent UI errors
            return { 
                id: schoolId,
                name: 'Default School',
                code: 'SCH-001',
                address: '',
                city: '',
                province: '',
                district_id: '',
                postal_code: '',
                phone: '',
                email: '',
                principal_name: '',
                type: 'primary',
                connectivity_status: 'connected',
                internet_provider: '',
                has_smartboards: false,
                school_hours: '08:00 - 16:00'
            };
        }
    }

    /**
     * Get all school districts
     * @returns {Promise<Array>} List of school districts
     */
    static async getSchoolDistricts() {
        try {
            const response = await axios.get('/districts/data');
            return response.data;
        } catch (error) {
            console.error('Error fetching school districts:', error);
            // Return empty array to prevent UI errors
            return [];
        }
    }

    /**
     * Get all admins for a specific school
     * @param {number} schoolId - The school ID
     * @returns {Promise<Array>} List of school admins
     */
    static async getSchoolAdmins(schoolId) {
        try {
            const response = await axios.get(`/schools/${schoolId}/admins`);
            return response.data;
        } catch (error) {
            console.error('Error fetching school admins:', error);
            // Return empty array to prevent UI errors
            return [];
        }
    }

    /**
     * Get the actual count of teachers for a school
     * @param {number} schoolId - The school ID
     * @returns {Promise<number>} The count of teachers
     */
    static async getTeacherCount(schoolId) {
        try {
            const response = await axios.get(`/schools/${schoolId}/teacher-count`);
            return response.data.count;
        } catch (error) {
            console.error('Error fetching teacher count:', error);
            return 0;
        }
    }

    /**
     * Get the actual count of students for a school
     * @param {number} schoolId - The school ID
     * @returns {Promise<number>} The count of students
     */
    static async getStudentCount(schoolId) {
        try {
            const response = await axios.get(`/schools/${schoolId}/student-count`);
            return response.data.count;
        } catch (error) {
            console.error('Error fetching student count:', error);
            return 0;
        }
    }

    /**
     * Update school settings
     * @param {number} schoolId - The school ID
     * @param {Object} schoolData - The school data to update
     * @returns {Promise<Object>} Updated school data
     */
    static async updateSchoolSettings(schoolId, schoolData) {
        try {
            const response = await axios.put(`/schools/${schoolId}`, schoolData);
            return response.data;
        } catch (error) {
            console.error('Error updating school settings:', error);
            // Return a meaningful error object
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update school settings. Please try again.'
            };
        }
    }

    /**
     * Search for existing users
     * @param {string} searchTerm - The search term
     * @param {number} schoolId - The school ID
     * @returns {Promise<Array>} List of matching users
     */
    static async searchExistingUsers(searchTerm, schoolId) {
        try {
            const response = await axios.get(`/users/search`, {
                params: {
                    search: searchTerm,
                    school_id: schoolId
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error searching users:', error);
            // Return empty array to prevent UI errors
            return [];
        }
    }

    /**
     * Add an existing user as an admin
     * @param {Object} adminData - The admin data
     * @returns {Promise<Object>} The added admin
     */
    static async addExistingUserAsAdmin(adminData) {
        try {
            const response = await axios.post('/school-admins', adminData);
            return response.data;
        } catch (error) {
            console.error('Error adding existing user as admin:', error);
            // Return error response
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to add admin. Please try again.'
            };
        }
    }

    /**
     * Create a new admin
     * @param {Object} adminData - The admin data
     * @returns {Promise<Object>} The created admin
     */
    static async createNewAdmin(adminData) {
        try {
            const response = await axios.post('/school-admins/create', adminData);
            return response.data;
        } catch (error) {
            console.error('Error creating new admin:', error);
            // Return error response
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to create admin. Please try again.'
            };
        }
    }

    /**
     * Delete an admin
     * @param {number} adminId - The admin ID
     * @returns {Promise<Object>} Response data
     */
    static async deleteAdmin(adminId) {
        try {
            const response = await axios.delete(`/school-admins/${adminId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting admin:', error);
            // Return error response
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to delete admin. Please try again.'
            };
        }
    }

    /**
     * Add a new teacher
     * @param {Object} teacherData - The teacher data
     * @returns {Promise<Object>} Response data
     */
    static async addTeacher(teacherData) {
        return router.post('/teachers', teacherData);
    }

    /**
     * Update an existing teacher
     * @param {number} teacherId - The teacher ID
     * @param {Object} teacherData - The updated teacher data
     * @returns {Promise<Object>} Response data
     */
    static async updateTeacher(teacherId, teacherData) {
        return router.put(`/teachers/${teacherId}`, teacherData);
    }

    /**
     * Delete a teacher
     * @param {number} teacherId - The teacher ID
     * @returns {Promise<Object>} Response data
     */
    static async deleteTeacher(teacherId) {
        return router.delete(`/teachers/${teacherId}`);
    }

    /**
     * Reset teacher password
     * @param {number} teacherId - The teacher ID
     * @param {Object} passwordData - The password data
     * @returns {Promise<Object>} Response data
     */
    static async resetTeacherPassword(teacherId, passwordData) {
        return router.post(`/teachers/${teacherId}/reset-password`, passwordData);
    }
}

export default SchoolAdminController;
