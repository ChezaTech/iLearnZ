# iLearnZ - Transforming Digital Education in Africa

<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
</p>

<p align="center">
  <a href="https://github.com/ChezaTech/iLearnZ/actions"><img src="https://img.shields.io/github/workflow/status/ChezaTech/iLearnZ/CI" alt="Build Status"></a>
  <a href="https://github.com/ChezaTech/iLearnZ/releases"><img src="https://img.shields.io/github/v/release/ChezaTech/iLearnZ" alt="Latest Release"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
</p>

## 🌍 About iLearnZ

iLearnZ is a comprehensive school management system designed specifically for the African educational landscape. Our mission is to bridge educational gaps and provide accessible, high-quality digital learning infrastructure to schools across the continent.

The platform connects students, teachers, parents, and school administrators in a collaborative ecosystem that enhances the educational experience for all stakeholders while providing valuable data insights for educational improvement.

## 📚 System Overview

iLearnZ is built as a complete school management solution with the following components:

### Core Modules

- **School Management**: Create and manage schools, districts, and educational resources
- **User Management**: Handle different user roles (admin, school admin, teacher, student, parent)
- **Academic Management**: Subjects, classes, enrollments, and curriculum tracking
- **Assessment System**: Create, distribute, and grade various types of assessments
- **Learning Materials**: Upload, organize, and distribute educational content
- **Reporting System**: Generate comprehensive reports on student performance and school metrics
- **Communication Tools**: Announcements, notifications, and messaging between stakeholders

### Database Structure

The system uses a relational database with the following key entities:

- Schools and Districts
- Users (with role-based permissions)
- Subjects and Classes
- Assessments and Grades
- Learning Materials
- Reports and Analytics

## ✨ Key Features

### For Students

- Interactive learning modules tailored to various African curricula
- Progress tracking and personalized learning paths
- Access to educational resources both online and offline
- Assignment submission and grade tracking
- Peer collaboration tools and discussion forums

### For Parents

- Real-time monitoring of children's academic progress
- Direct communication channels with teachers and school administrators
- Notification system for important academic events and deadlines
- Insights into children's strengths and areas for improvement

### For Teachers

- Comprehensive classroom management tools
- Automated grading and assessment features
- Curriculum planning and resource sharing
- Data-driven insights into student performance
- Attendance tracking and reporting

### For School Administrators

- School-wide performance analytics
- Teacher and staff management
- Resource allocation and tracking
- Communication tools for school announcements
- Integration with government reporting systems

## 🚀 Technology Stack

iLearnZ leverages modern web technologies to deliver a seamless educational experience:

- **Frontend**: React.js with Inertia.js for dynamic UI components
- **Backend**: Laravel PHP framework for robust API architecture
- **Database**: Supports both MySQL and SQLite for flexible deployment options
- **Styling**: Tailwind CSS with Material UI components for responsive design
- **Authentication**: Laravel Breeze with custom role-based permissions
- **Charting**: Recharts for data visualization
- **State Management**: React Context API
- **Deployment**: Docker containerization for consistent environments

## 📋 Requirements

- PHP 8.1 or higher
- Node.js 16+ and pnpm (preferred package manager)
- MySQL 8.0+ or SQLite 3.8.8+
- Composer 2.0+
- Git

## 🛠️ Installation

### Using MySQL

```bash
# Clone the repository
git clone https://github.com/ChezaTech/iLearnZ.git

# Navigate to the project directory
cd iLearnZ

# Install PHP dependencies
composer install

# Install JavaScript dependencies (using pnpm as preferred)
pnpm install

# Copy environment file and configure your database
cp .env.example .env

# Configure .env for MySQL
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=ilearnz
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Seed the database with initial data
php artisan db:seed --class=CompleteSystemSeeder

# Build frontend assets
pnpm run build

# Start the development server
php artisan serve
```

### Using SQLite (Simpler Setup)

```bash
# Clone the repository
git clone https://github.com/ChezaTech/iLearnZ.git

# Navigate to the project directory
cd iLearnZ

# Install PHP dependencies
composer install

# Install JavaScript dependencies (using pnpm as preferred)
pnpm install

# Copy environment file
cp .env.example .env

# Configure .env for SQLite
# DB_CONNECTION=sqlite

# Create SQLite database file
touch database/database.sqlite

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Seed the database with initial data
php artisan db:seed --class=CompleteSystemSeeder

# Build frontend assets
pnpm run build

# Start the development server
php artisan serve
```

## 👤 Default User Accounts

After seeding, the following user accounts are available for testing:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | john.admin@ilearnz.edu | password |
| School Admin | principal@ilearnz.edu | password |
| Teacher | david.teacher@ilearnz.edu | password |
| Student | alex.student@ilearnz.edu | password |
| Parent | frank.parent@example.com | password |

## 🧪 Testing

```bash
# Run PHP tests
php artisan test

# Run JavaScript tests
pnpm test
```

## 🔧 Development Workflow

```bash
# Start the development server
php artisan serve

# Watch for frontend changes
pnpm run dev

# Run database migrations after schema changes
php artisan migrate

# Create a new controller
php artisan make:controller YourControllerName

# Create a new model with migration
php artisan make:model YourModelName -m
```

## 📱 Mobile Support

iLearnZ is designed with a mobile-first approach, ensuring that students, teachers, and parents can access educational resources from any device, including low-bandwidth environments common in various African regions.

## 🔄 Offline Functionality

Understanding the connectivity challenges in many African settings, iLearnZ implements progressive web app features that allow for offline access to key educational resources and data synchronization when connectivity is restored.

## 🌐 Localization

iLearnZ supports multiple languages spoken across Africa, with an emphasis on both colonial and indigenous languages to ensure accessibility for all users.

## 🔒 Security Features

- Role-based access control for different user types
- Secure authentication with password hashing
- CSRF protection for all forms
- Input validation and sanitization
- Encrypted sensitive data storage
- Session management and security

## 📊 System Architecture

### MVC Pattern

iLearnZ follows the Model-View-Controller architecture:

- **Models**: Located in `app/Models/` - Define database structure and relationships
- **Views**: React components in `resources/js/Pages/` - Render the UI
- **Controllers**: Located in `app/Http/Controllers/` - Handle business logic and requests

### Key Directories

- `/app` - Core application code
- `/database` - Migrations, seeders, and factories
- `/resources/js` - Frontend React components
- `/routes` - API and web routes
- `/public` - Publicly accessible assets
- `/tests` - Automated tests

## 🤝 Contributing

We welcome contributions to the iLearnZ platform! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 Roadmap

- Integration with popular African payment gateways
- Advanced analytics dashboard for educational ministries
- AI-powered learning assistant and content recommendation
- Mobile application for Android and iOS
- Expanded curriculum coverage for more African countries
- Offline-first functionality for rural areas
- Integration with existing government educational systems

## 📄 License

iLearnZ is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 📞 Contact

For inquiries and support, please contact us at:

- Email: support@ilearnz.africa
- Twitter: [@iLearnZAfrica](https://twitter.com/iLearnZAfrica)

---

<p align="center">Built with ❤️ by ChezaTech for African education</p>
