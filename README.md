# Ecommerce Website

A modern eCommerce web application built using **Next.js, Redux, Node.js, and MongoDB**.

## Live Demo

[Click here to visit the live website](https://ecomerce-web-frontend-c8sfiwqkp-sudhanshuchoursiyas-projects.vercel.app/)

## Features

- **User Authentication** – Secure JWT-based authentication
- **Product Listing & Filtering** – Browse products with advanced filters
- **Cart & Checkout** – Seamless cart management
- **Order History & Profile Management** – Users can track orders and update profiles
- **Admin Dashboard** – Manage products efficiently

## Tech Stack

### Frontend

- **Framework:** Next.js
- **State Management:** Redux Toolkit
- **UI Library:** Material UI

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Token (JWT)

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (Latest LTS version)
- **MongoDB** (Local or cloud-based)

### Steps to Run Locally

#### Clone the Repository

```sh
git clone https://github.com/SudhanshuChoursiya/Ecomerce-web.git
cd Ecomerce-web
```

#### Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

- Open [`http://localhost:3000`](http://localhost:3000) in your browser.

#### Backend Setup

```sh
cd backend
npm install
```

Create a `.env` file in the **backend** folder and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
```

Run the backend server:

```sh
npm run dev
```

- Backend will run at [`http://localhost:5000`](http://localhost:5000).

## Available Scripts

### Frontend Scripts

```sh
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint checks
```

### Backend Scripts

```sh
npm run dev     # Start backend with nodemon
npm run start   # Start backend in production
```

## Contact

For any inquiries, feel free to reach out:

- **Email:** sudhanshuchoursiya2@gmail.com
- **GitHub:** [SudhanshuChoursiya](https://github.com/SudhanshuChoursiya)
