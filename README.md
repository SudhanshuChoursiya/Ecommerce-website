E-Commerce Website  

A modern eCommerce web application built using **Next.js, Redux, Node.js, and MongoDB**.  

## Live Demo  

[Click here to visit the live website](https://ecomerce-web-pi.vercel.app)  

## Features  

- **User Authentication** – Secure JWT-based authentication  
- **Product Listing & Filtering** – Browse products with advanced filters  
- **Cart & Checkout** – Seamless cart management
- **Order History & Profile Management** – Users can track orders and update profiles  
- **Admin Dashboard** – Manage products efficiently  

## Tech Stack  

**Frontend:**  
- Next.js  
- Redux Toolkit  
- Material UI  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB (Mongoose ODM)  
- JSON Web Token (JWT)  

## Installation & Setup  

### Prerequisites  
Ensure you have the following installed:  
- **Node.js** (Latest LTS version)  
- **MongoDB** (Local or cloud-based)  

### Steps to Run Locally  

#### Clone the Repository  
```sh
git clone https://github.com/SudhanshuChoursiya/Ecommerce-website.git
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
MONGO_CONNECTION_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MY_EMAIL=your_email
MY_PASSWORD=your_email_password
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
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
