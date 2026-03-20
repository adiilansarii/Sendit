import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Download from "./pages/Download";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyFiles from "./pages/MyFiles"; 

function App() {
  return (
    <BrowserRouter>
      {/* Navbar is outside Routes so it stays visible on every page */}
      <Navbar />

      {/* Main container with responsive max-width */}
      <div className="max-w-5xl mx-auto p-4">
        <Routes>
          {/* 1. Landing Page */}
          <Route path="/" element={<Home />} />
          
          {/* 2. Upload Page (Accessed from Navbar) */}
          <Route path="/upload" element={<Upload />} />
          
          {/* 3. My History (Accessed from Navbar when logged in) */}
          <Route path="/my-files" element={<MyFiles />} />

          {/* 4. DYNAMIC DOWNLOAD ROUTE
              The ":code" is a variable. When you go to /file/RE_4OL, 
              React Router will match this path and pass "RE_4OL" to the Download component.
          */}
          <Route path="/file/:code" element={<Download />} />

          {/* 5. General Download Page
              Allows users to navigate to /download to enter a code manually.
          */}
          <Route path="/download" element={<Download />} />

          {/* 6. Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 7. Fallback Route (404)
              If a user enters a wrong URL, it sends them back Home.
          */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;