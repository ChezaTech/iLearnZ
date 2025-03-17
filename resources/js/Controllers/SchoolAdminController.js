import axios from 'axios';

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
            return { school_id: null };
        }
    }

    /**
     * Get school data for a specific school
     * @param {number} schoolId - The school ID
     * @returns {Promise<Object>} School data
     */
    static async getSchool(schoolId) {
        try {
            const response = await axios.get(`/api/schools/${schoolId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching school data:', error);
            throw error;
        }
    }

    /**
     * Get all admins for a specific school
     * @param {number} schoolId - The school ID
     * @returns {Promise<Array>} List of school admins
     */
    static async getSchoolAdmins(schoolId) {
        try {
            const response = await axios.get(`/api/schools/${schoolId}/admins`);
            return response.data;
        } catch (error) {
            console.error('Error fetching school admins:', error);
            return [];
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
            const response = await axios.get(`/api/admins/existing-users?search=${searchTerm}&school_id=${schoolId}`);
            return response.data;
        } catch (error) {
            console.error('Error searching users:', error);
            throw error;
        }
    }

    /**
     * Add an existing user as an admin
     * @param {Object} userData - The user data
     * @returns {Promise<Object>} The added admin
     */
    static async addExistingUserAsAdmin(userData) {
        try {
            const response = await axios.post('/api/admins/add-existing', userData);
            return response.data;
        } catch (error) {
            console.error('Error adding admin:', error);
            throw error;
        }
    }

    /**
     * Create a new admin
     * @param {Object} adminData - The admin data
     * @returns {Promise<Object>} The created admin
     */
    static async createNewAdmin(adminData) {
        try {
            const response = await axios.post('/api/admins/create-new', adminData);
            return response.data;
        } catch (error) {
            console.error('Error creating admin:', error);
            throw error;
        }
    }

    /**
     * Delete an admin
     * @param {number} adminId - The admin ID
     * @returns {Promise<void>}
     */
    static async deleteAdmin(adminId) {
        try {
            await axios.delete(`/api/admins/${adminId}`);
        } catch (error) {
            console.error('Error deleting admin:', error);
            throw error;
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
            const response = await axios.put(`/api/schools/${schoolId}`, schoolData);
            return response.data;
        } catch (error) {
            console.error('Error updating school settings:', error);
            throw error;
        }
    }
}

export default SchoolAdminController;
