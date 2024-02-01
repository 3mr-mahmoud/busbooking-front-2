# Bus Booking System

## Introduction

Welcome to the Bus Booking System, a web application built with React and Laravel. for Computer Engineering This system allows users to easily search, book, and manage bus tickets for their travel needs. The combination of React on the front end and Laravel on the back end ensures a seamless and efficient user experience.

## Features

- **User Authentication**: Secure user authentication system to ensure the safety of user accounts and data.
- **Bus Search**: Easy-to-use search functionality to find available buses based on various criteria such as destination, date, and time.
- **Seat Selection**: Intuitive seat selection interface, allowing users to choose their preferred seats on the bus.
- **Booking Management**: Users can view and manage their bookings, including canceling and rescheduling trips.
- **Admin Dashboard**: An admin dashboard for managing buses, schedules, and user accounts.
- **Responsive Design**: Ensures a consistent and user-friendly experience across various devices.

## System Technologies

Make sure your system meets the following requirements before setting up the Bus Booking System:

- npm or yarn
- Composer
- PHP
- Laravel
- MySQL or any other compatible database

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/bus-booking-system.git
    ```

2. Navigate to the project directory:

    ```bash
    cd bus-booking-system
    ```

3. Install dependencies:

    ```bash
    # Install Laravel dependencies
    composer install

    # Install React dependencies
    npm install
    ```

4. Configure the environment:

    - Copy the `.env.example` file to `.env` and configure your database and other settings.

    ```bash
    cp .env.example .env
    ```

    - Generate the application key:

    ```bash
    php artisan key:generate
    ```

5. Migrate the database:

    ```bash
    php artisan migrate
    ```

6. Run the development server:

    ```bash
    # Start Laravel server
    php artisan serve

    # Start React development server
    npm run dev
    ```

Access the application at `http://localhost:8000` in your browser.

## Usage

1. Create an account or log in.
2. Search for available buses based on your travel preferences.
3. Select your preferred bus, seats, and provide necessary details.
4. Complete the payment process.
5. View and manage your bookings in the user dashboard.

For admin access, use the provided admin credentials to log in to the admin dashboard.

## Screenshots

Here are some screenshots showcasing different aspects of the Bus Booking System:


   ![Home Page](./screenshots/(1).png)

   ![Search Results](screenshots/(2).png)

   ![Seat Selection](screenshots/(3).png)

   ![Booking Details](screenshots/(4).png)

   ![Payment Gateway](screenshots/(5).png)

   ![User Dashboard](screenshots/(6).png)
   ![Booking History](screenshots/(7).png)
   ![Admin Dashboard](screenshots/(8).png)
   ![Bus Management](screenshots/(9).png)

    ![Schedule Management](screenshots/(10).png)
    ![User Management](screenshots/(11).png)

Feel free to explore the system with these visual representations. If you have any questions or feedback, please let us know!
