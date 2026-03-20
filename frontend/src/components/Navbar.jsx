import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // This now uses the default success icon (checkmark) 
    // to match your login and signup notifications.
    toast.success("Logged out successfully!");

    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="sticky top-0 backdrop-blur-md bg-white/80 border-b z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-1.5">
          <img src="favicon.svg" alt="LOGO" className="mt-2 w-6 h-6 object-contain" />
          <span className="text-xl sm:text-2xl font-bold">
            SEND<span className="text-[#FF5B5B]">IT</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-3 sm:gap-6 text-sm font-medium">
          {token ? (
            <>  
              <Link className="hover:text-[#FF5B5B] transition-colors" to="/my-files">My History</Link>
              <button 
                onClick={handleLogout} 
                className="bg-[#FF5B5B] text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition-opacity ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="hover:text-[#FF5B5B] transition-colors" to="/login">Login</Link>
              <Link 
                to="/signup" 
                className="bg-[#FF5B5B] text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;