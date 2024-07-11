# Sobee Management

### Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Work Assignment](#work-assignment)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

### Project Overview

Sobee Management is the admin panel for the Sobee e-commerce platform.The platform is built using NextJs, TailwindCss, and Next UI. It allows administrators to manage products, orders, customers, staff, and provides a dashboard for business analytics. This project is part of the Sobee system, which includes the backend, customer frontend, recommendation system, and mobile app.

### Features

- **Product Management**
  - Add, edit, delete, and categorize products.
  - Manage product details such as name, price, category, brand, and description.
  - Upload and manage product images.
- **Order Management**

  - View and manage all orders in the system.
  - Update order status and details.
  - Handle order cancellations and returns.

- **Customer Management**

  - View and manage customer information.
  - Edit, block, or delete customer accounts.

- **Staff Management**

  - Manage staff accounts and permissions.
  - Add, edit, or remove staff members.

- **Category Management**

  - Create, edit, and delete product categories.
  - Organize products into categories for better navigation.

- **Recommendation System**
  - Integrate with the recommendation system to provide personalized product recommendations based on user behavior and purchase history.
- **Analytics and Reporting**
  - View sales and performance statistics.
  - Generate reports on sales, inventory, and customer behavior.

### Work Assignment

| Team Member    | Work Assignment                                                                                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trần Tuấn Kiệt | Developed product management, integrated recommendation system, Handled staff management, Worked on category management, assisted in UX/UI design and frontend development                         |
| Lê Văn Duy     | Implemented order and customer management, created analytics dashboard , Worked on category management, assisted in UX/UI design and frontend development, set up project infrastructure and CI/CD |

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/Sobee-Project/sobee-management.git
   cd sobee-management
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Setup environment variables**

   - Create a `.env` file in the root directory.
   - Add the necessary environment variables as specified in `.env.example`.

4. **Start the development server**
   ```sh
   npm run dev
   ```

### Usage

1. **Access the application**

   - Open your browser and navigate to `http://localhost:3000`.

2. **Login as admin**

   - Use the admin credentials to log in and access the admin dashboard.

3. **Manage the platform**
   - Utilize the various management features to handle products, orders, customers, and staff.

### Contributing

1. **Fork the repository**

   - Create your own fork of the repository by clicking the "Fork" button on GitHub.

2. **Create a new branch**

   - Create a new branch for your feature or bug fix.
     ```sh
     git checkout -b feature/your-feature-name
     ```

3. **Commit your changes**

   - Commit your changes with a meaningful commit message.
     ```sh
     git commit -m "Add feature: your feature description"
     ```

4. **Push to the branch**

   - Push your changes to your fork.
     ```sh
     git push origin feature/your-feature-name
     ```

5. **Create a Pull Request**
   - Open a pull request to the main repository.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
