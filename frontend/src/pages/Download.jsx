import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import {
  FiFileText,
  FiDownload,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";

function Download() {
  const { code } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const res = await api.get(`/files/${code}`);
        setFile(res.data);
      } catch {
        setError(true);
      }
    };

    if (code) fetchFile();
  }, [code]);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const res = await api.get(`/files/${code}`);
      window.open(res.data.downloadUrl, "_blank");
    } catch {
      alert("Link expired. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (error)
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-400 gap-3">
        <FiAlertCircle size={48} className="text-red-400" />
        <p className="font-bold">File not found or link expired.</p>
      </div>
    );

  if (!file)
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-400 gap-3 animate-pulse">
        <FiLoader size={32} className="animate-spin" />
        <p className="font-medium">Searching for file...</p>
      </div>
    );

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl text-center w-full max-w-lg">
        <div className="w-20 h-20 bg-red-50 text-[#FF5B5B] rounded-3xl mx-auto mb-6 flex items-center justify-center">
          <FiFileText size={40} />
        </div>

        <h2 className="text-2xl font-black text-gray-900 break-words mb-2 px-4">
          {file.fileName}
        </h2>

        <p className="text-gray-400 font-bold text-xs uppercase mb-10">
          Size: {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
        </p>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center justify-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-800 transition-all w-full disabled:bg-gray-400"
        >
          <FiDownload size={22} />
          {downloading ? "PREPARING..." : "DOWNLOAD NOW"}
        </button>

        <p className="text-[10px] text-gray-300 mt-6">
          Secure Signed URL • Expires in 5 minutes
        </p>
      </div>
    </div>
  );
}

export default Download;