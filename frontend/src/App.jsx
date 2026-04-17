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
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/upload" element={<Upload />} />
         
          <Route path="/my-files" element={<MyFiles />} />

          <Route path="/file/:code" element={<Download />} />

          <Route path="/download" element={<Download />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;