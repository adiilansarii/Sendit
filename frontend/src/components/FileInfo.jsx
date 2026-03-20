import { FiFileText, FiCheck } from "react-icons/fi";

function FileInfo({ file }) {
  if (!file) return null;

  return (
    <div className="mt-4 p-4 bg-white rounded-2xl border border-gray-100 flex items-center justify-between animate-fade-in shadow-sm">
      <div className="flex items-center gap-3">
        {/* Modern File Icon */}
        <div className="p-2 bg-red-50 rounded-lg text-[#FF5B5B]">
          <FiFileText size={20} />
        </div>
        
        <div className="text-left">
          <p className="text-sm font-bold text-gray-800 truncate max-w-[150px] sm:max-w-[250px]">
            {file.name}
          </p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
        <FiCheck size={12} />
        Ready
      </div>
    </div>
  );
}

export default FileInfo;