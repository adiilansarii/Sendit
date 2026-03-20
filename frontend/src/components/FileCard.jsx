import toast from "react-hot-toast";
// Switching to Feather Icons (Fi) to avoid the Lu export errors
import { FiCheckCircle } from "react-icons/fi";

function FileCard({ link }) {
  return (
    <div className="bg-white border border-gray-100 p-6 sm:p-10 rounded-2xl text-center shadow-xl">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-2">
        File Ready to Share 
        <FiCheckCircle className="text-green-500" />
      </h2>
      
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          value={link}
          readOnly
          className="bg-gray-50 border p-3 flex-1 rounded-xl text-sm font-mono focus:outline-none"
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(link);
            toast.success("Link copied!");
          }}
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition active:scale-95"
        >
          Copy
        </button>
      </div>
      <p className="text-xs text-gray-400 font-medium">
        Anyone with this link can download the file.
      </p>
    </div>
  );
}

export default FileCard;