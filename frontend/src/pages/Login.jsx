import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/users/login", { email, password });
      dispatch(loginSuccess(res.data));
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white border p-6 sm:p-10 rounded-3xl shadow-sm">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8">Sign in to manage your uploads.</p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-[#FF5B5B] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-[#FF5B5B] outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#FF5B5B] text-white w-full py-4 rounded-xl mt-8 font-bold shadow-lg hover:opacity-90 transition disabled:bg-gray-300"
        >
          {loading ? "Verifying..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          New here? <Link to="/signup" className="text-[#FF5B5B] font-bold underline">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
export default Login;