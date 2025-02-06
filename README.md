# Ecommerce Follow Along

## Project Description

**Ecommerce Follow Along** is a hands-on project designed to guide participants through the process of building a full-fledged e-commerce application from scratch using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This project aims to provide practical experience with real-world development concepts and tools, enabling developers to create scalable and efficient web applications.

## Milestone 1: Project Overview

In this milestone, we focused on the foundational aspects of the e-commerce application. The session was mentor-led, providing insights into the overall vision, goals, and key features of the project. Here’s a summary of what was covered:

- **Understanding the MERN Stack:** 
  - The MERN stack is a popular set of technologies used for building full-stack web applications. It allows developers to use JavaScript across both the front-end and back-end, streamlining the development process.

- **REST API Structure and Endpoints:** 
  - We discussed the architecture of REST APIs, which facilitate communication between the client and server using standard HTTP methods. Key API endpoints will include:
    - **User Authentication:** Registering and logging in users.
    - **Product Management:** Adding, updating, and retrieving product data.
    - **Order Handling:** Managing customer orders.

- **Basics of Database Schema Design:** 
  - We explored how to define the structure and relationships of data stored in MongoDB, which is crucial for effective data management.

- **Role of Authentication in Web Applications:** 
  - We emphasized the importance of user authentication, which verifies the identity of users before granting access to sensitive resources, such as making purchases.

Get ready to dive deeper into the technical aspects of building your e-commerce application! 🚀

## Milestone 2: Structuring 

- **Project Structure**
  - **Frontend**: React + Tailwind CSS (Login Page)
  - **Backend**: Node.js + Express

- **Features Implemented**
  - **Project Setup**: Created structured folder hierarchy for frontend and backend.  
  - **Frontend Setup**: Initialized a React app using Vite.  
  - **Backend Setup**: Set up a simple Node.js Express server.  
  - **Tailwind CSS Configuration**: Configured Tailwind CSS for styling.  
  - **Login Page**: Designed and developed a functional, styled login page.  

## Milestone 3: Backend Setup
  - Organized backend folders into a structured format.
  - Configured an Express server.
  - Connected the server to MongoDB using Mongoose.
  - Implemented basic error handling for better debugging.

## Milestone 4: User Model, Controller, and File Uploads

### Features Implemented:
- Created a User model using Mongoose
- Developed a User Controller for user registration and retrieval
- Configured Multer to handle file uploads
- Set up API routes for user-related operations

### API Endpoints:
1. **POST /api/users/register** - Register a new user (with profile picture)
2. **GET /api/users/:id** - Get user details by ID