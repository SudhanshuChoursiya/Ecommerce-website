E-Commerce Website (Full Stack)

Overview

This is a MERN stack E-Commerce website with Next.js for the frontend and Express.js + MongoDB for the backend. It includes features such as user authentication, product listings, and cart management. Both the frontend and backend are deployed on Vercel.


---

Tech Stack

Frontend:

Next.js (React 18)

Material UI (UI Components)

Redux Toolkit & Redux Persist (State Management)

Moment.js, Swiper.js (For enhanced UX)


Backend:

Node.js & Express.js

MongoDB & Mongoose

JWT Authentication

Multer & Cloudinary (File Uploads)

Nodemailer (Email Functionality)


Deployment:

Frontend: Vercel

Backend: Vercel

Database: MongoDB Atlas



---

Installation & Setup

Prerequisites

Node.js & npm installed

MongoDB (Local or Atlas)


Steps to Run Locally

Frontend Setup

# Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo/frontend

# Install dependencies
npm install

# Start the development server
npm run dev

Open the browser and visit http://localhost:3000


Backend Setup

cd ../backend

# Install dependencies
npm install

# Create a .env file and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url

# Start the backend server
npm run dev

Backend will run at http://localhost:5000



---

Available Scripts

Frontend Scripts

npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint checks

Backend Scripts

npm run dev     # Start backend with nodemon
npm run start   # Start backend in production


---

Contact

For any inquiries, feel free to reach out:

Email: sudhanshuchoursiya2@gmail.com



