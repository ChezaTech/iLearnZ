# iLearnZ - Transforming Education in Africa

<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
</p>

<p align="center">
  <a href="https://github.com/ChezaTech/iLearnZ/actions"><img src="https://img.shields.io/github/workflow/status/ChezaTech/iLearnZ/CI" alt="Build Status"></a>
  <a href="https://github.com/ChezaTech/iLearnZ/releases"><img src="https://img.shields.io/github/v/release/ChezaTech/iLearnZ" alt="Latest Release"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
</p>

## 🌍 About iLearnZ

iLearnZ is a revolutionary digital learning platform designed specifically for the African educational landscape. Our mission is to bridge educational gaps and provide accessible, high-quality learning resources to students across the continent.

The platform connects students, teachers, and parents in a collaborative ecosystem that enhances the educational experience for all stakeholders.

## ✨ Key Features

### For Students
- Interactive learning modules tailored to various African curricula
- Progress tracking and personalized learning paths
- Access to educational resources both online and offline
- Peer collaboration tools and discussion forums

### For Parents
- Real-time monitoring of children's academic progress
- Direct communication channels with teachers
- Notification system for important academic events and deadlines
- Insights into children's strengths and areas for improvement

### For Teachers
- Comprehensive classroom management tools
- Automated grading and assessment features
- Curriculum planning and resource sharing
- Data-driven insights into student performance

## 🚀 Technology Stack

iLearnZ leverages modern web technologies to deliver a seamless educational experience:

- **Frontend**: React.js with Inertia.js for dynamic UI components
- **Backend**: Laravel PHP framework for robust API architecture
- **Database**: MySQL for reliable data storage
- **Styling**: Tailwind CSS for responsive design
- **Authentication**: Laravel Breeze for secure user authentication
- **Deployment**: Docker containerization for consistent environments

## 📋 Requirements

- PHP 8.1 or higher
- Node.js 16+ and pnpm
- MySQL 8.0+
- Composer

## 🛠️ Installation

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

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Seed the database with initial data
php artisan db:seed

# Build frontend assets
pnpm run build

# Start the development server
php artisan serve
```

## 🧪 Testing

```bash
# Run PHP tests
php artisan test

# Run JavaScript tests
pnpm test
```

## 📱 Mobile Support

iLearnZ is designed with a mobile-first approach, ensuring that students and parents can access educational resources from any device, including low-bandwidth environments common in various African regions.

## 🔄 Offline Functionality

Understanding the connectivity challenges in many African settings, iLearnZ implements progressive web app features that allow for offline access to key educational resources.

## 🌐 Localization

iLearnZ supports multiple languages spoken across Africa, with an emphasis on both colonial and indigenous languages to ensure accessibility for all users.

## 🤝 Contributing

We welcome contributions to the iLearnZ platform! Please read our [contribution guidelines](CONTRIBUTING.md) before submitting pull requests.

## 📊 Roadmap

- Integration with popular African payment gateways
- Advanced analytics dashboard for school administrators
- AI-powered learning assistant
- Mobile application for Android and iOS
- Expanded curriculum coverage for more African countries

## 📄 License

iLearnZ is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 📞 Contact

For inquiries and support, please contact us at:
- Email: support@ilearnz.africa
- Twitter: [@iLearnZAfrica](https://twitter.com/iLearnZAfrica)

---

<p align="center">Built with ❤️ by ChezaTech for African learners</p>
