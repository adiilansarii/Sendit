import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters!");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    
    setLoading(true);
    try {
      await api.post("/users/signup", { email, password });
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <form 
        onSubmit={handleSignup} 
        className="w-full max-w-md bg-white border border-gray-100 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-100/50"
      >
        <h2 className="text-3xl font-black text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-400 text-sm mb-10 font-medium">Join SENDIT to start sharing files securely.</p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#FF5B5B] outline-none transition-all text-sm font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#FF5B5B] outline-none transition-all text-sm font-medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#FF5B5B] outline-none transition-all text-sm font-medium"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#FF5B5B] text-white w-full py-4 rounded-2xl mt-10 font-black text-lg shadow-xl shadow-red-100 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:bg-gray-200"
        >
          {loading ? "CREATING ACCOUNT..." : "SIGN UP"}
        </button>

        <p className="mt-8 text-center text-xs text-gray-400 font-bold uppercase tracking-wider">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FF5B5B] hover:underline ml-1">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;