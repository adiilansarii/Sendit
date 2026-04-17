import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { LuShieldCheck, LuZap, LuSmartphone, LuGlobe } from "react-icons/lu";

function Home() {
  const { token } = useSelector((state) => state.auth);

  const features = [
    { title: "S3 Powered", desc: "Enterprise storage.", icon: <LuShieldCheck size={20} /> },
    { title: "Fast & Secure", desc: "Encrypted transfers.", icon: <LuZap size={20} /> },
    { title: "Any Device", desc: "Access anywhere.", icon: <LuSmartphone size={20} /> },
    { title: "Free Access", desc: "No hidden charges.", icon: <LuGlobe size={20} /> },
  ];

  return (
    <div className="md:h-[calc(100vh-80px)] h-auto flex flex-col justify-center items-center px-4 text-center md:overflow-hidden py-12 md:py-0">
      
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
        
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-gray-900"
        >
          Share files <br className="hidden sm:block" />
          <span className="text-[#FF5B5B]">without limits.</span>
        </motion.h1>

        {/* Subtext */}
        <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Experience a modern, lightning-fast file sharing platform. 
          Simple, secure, and built for speed.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to={token ? "/upload" : "/login"}
            className="bg-[#FF5B5B] text-white px-10 py-3.5 rounded-2xl text-lg font-bold shadow-xl shadow-red-100 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            {token ? "Upload Now" : "Sign in to Upload"}
          </Link>
          <Link
            to="/signup"
            className="border border-gray-200 px-10 py-3.5 rounded-2xl text-lg font-semibold hover:bg-gray-50 transition-all"
          >
            Create Account
          </Link>
        </div>

        {/* --- Feature Row --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 md:mt-20 w-full max-w-5xl">
          {features.map((item) => (
            <div 
              key={item.title} 
              className="p-5 bg-white border border-gray-100 rounded-3xl text-left hover:shadow-md hover:border-red-100 transition-all group"
            >
              <div className="w-10 h-10 bg-red-50 rounded-xl mb-4 flex items-center justify-center text-[#FF5B5B] group-hover:bg-[#FF5B5B] group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="font-bold text-base text-gray-800 leading-tight">{item.title}</h3>
              <p className="text-gray-400 text-[11px] mt-1.5 leading-snug font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;