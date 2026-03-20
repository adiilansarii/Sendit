import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { FiFileText, FiDownload, FiAlertCircle, FiLoader } from "react-icons/fi";

function Download() {
  const { code } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getFile = async () => {
      try {
        const res = await api.get(`/files/${code}`);
        setFile(res.data);
      } catch {
        setError(true);
      }
    };
    if (code) getFile();
  }, [code]);

  if (error) return (
    <div className="flex flex-col items-center justify-center mt-20 text-gray-400 gap-3">
      <FiAlertCircle size={48} className="text-red-400" />
      <p className="font-bold">File not found or link expired.</p>
    </div>
  );

  if (!file) return (
    <div className="flex flex-col items-center justify-center mt-20 text-gray-400 gap-3 animate-pulse">
      <FiLoader size={32} className="animate-spin" />
      <p className="font-medium">Searching for file...</p>
    </div>
  );

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-100/50 text-center w-full max-w-lg animate-in zoom-in duration-300">
        
        {/* Main Icon */}
        <div className="w-20 h-20 bg-red-50 text-[#FF5B5B] rounded-3xl mx-auto mb-6 flex items-center justify-center">
          <FiFileText size={40} />
        </div>

        <h2 className="text-2xl font-black text-gray-900 break-words mb-2 px-4">
          {file.fileName}
        </h2>

        {/* --- File Size Info --- */}
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-10">
          Size: {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
        </p>
        
        <a
          href={file.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-gray-200 w-full"
        >
          <FiDownload size={22} />
          DOWNLOAD NOW
        </a>

        <div className="mt-8 pt-6 border-t border-gray-50">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">
            Securely stored in S3 • Verified Link
          </p>
        </div>
      </div>
    </div>
  );
}

export default Download;