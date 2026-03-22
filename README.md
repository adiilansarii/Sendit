# 🚀 SendIt | Secure MERN File Sharing Platform

**SendIt** is a high-performance, minimalist file-sharing application. It allows users to upload files to the cloud, generate unique sharing codes, and manage their transfer history with a focus on speed, security, and a modern user experience.

---

## 📸 Project Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/6f1c9742-ee36-4fee-8afd-8ba223b9cb14" height="350" />
  <img src="https://github.com/user-attachments/assets/34079c5c-b0d3-49f7-99ea-765cf0568ba4" height="350" />
  <img src="https://github.com/user-attachments/assets/63e02126-fd65-4c37-9883-c93eeac903f9" height="350" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/86cfc793-26ca-48df-83e0-fe0f7a31620d" height="350" />
  <img src="https://github.com/user-attachments/assets/a11fea5e-59cc-4502-bf3b-0c3b77ad9e59" height="350" />
  <img src="https://github.com/user-attachments/assets/e3863aaa-1c70-4766-b72c-d01463f9eee4" height="350" />
</p>

---

## 🛠 Tech Stack & Implementation

### **Frontend (Client)**
* **React.js & Vite:** Powering the SPA for lightning-fast transitions and optimized builds.
* **Tailwind CSS:** Modern UI design featuring 2.5rem rounded corners and custom shadows.
* **React Router Dom:** Handling dynamic routing for unique file retrieval codes.
* **Axios:** Managed API service layer for communicating with the Node.js backend.
* **React Hot Toast:** Elegant popup notifications for success and error handling.

### **Backend (Server)**
* **Node.js & Express:** Robust server architecture handling RESTful API endpoints.
* **MongoDB & Mongoose:** NoSQL database for storing user profiles and file metadata.
* **AWS SDK (S3):** Integrated cloud storage for reliable, scalable file hosting.
* **Multer:** Middleware for handling `multipart/form-data` and file streaming.
* **JWT (JSON Web Tokens):** Secure, stateless session management for user authentication.
* **Bcrypt:** Industry-standard password hashing for data security.

---

## 📂 Project Structure

```text
Sendit/
├── backend/                # Server-side Logic
│   ├── config/             # Database & AWS S3 configurations
│   ├── controllers/        # Logic for Auth and File operations
│   ├── middleware/         # JWT verification & Multer setup
│   ├── models/             # Mongoose Schemas (User, File)
│   ├── routes/             # API Endpoint definitions
│   └── server.js           # Entry point
│
├── frontend/               # Client-side Logic
│   ├── src/
│   │   ├── components/     # Reusable UI elements (Navbar, Layout)
│   │   ├── pages/          # Home, Login, Signup, Upload, Download, History
│   │   ├── services/       # Axios API instance configuration
│   │   └── App.jsx         # Main Routing & State
│   └── vite.config.js      # Build & Plugin configurations
```
Developed by Adil Ansari
