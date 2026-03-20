import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { LuCopy, LuTrash2, LuFileText, LuX, LuCheck } from "react-icons/lu";

function MyFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchFiles = async () => {
    try {
      const res = await api.get("/files/my-history");
      setFiles(res.data);
    } catch (err) {
      toast.error("Could not load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFiles(); }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/files/${id}`);
      setFiles(files.filter(f => f._id !== id));
      toast.success("File deleted");
      setDeletingId(null);
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="text-center py-20 font-bold text-gray-400">Loading your history...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-black mb-8 text-gray-900">My <span className="text-[#FF5B5B]">History</span></h1>
      
      <div className="grid gap-3">
        {files.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No uploads found yet.</p>
          </div>
        ) : (
          files.map((file) => (
            <div key={file._id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm hover:border-red-100 transition-all">
              
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="bg-red-50 p-3 rounded-xl text-[#FF5B5B]">
                  <LuFileText size={22} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-800 truncate text-sm sm:text-base">{file.fileName}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">
                    {(file.fileSize / 1024 / 1024).toFixed(2)} MB • {file.code}
                  </p>
                </div>
              </div>

              <div className="flex items-center ml-4">
                {deletingId === file._id ? (
                  <div className="flex items-center gap-2 animate-in slide-in-from-right-2 duration-200">
                    <button onClick={() => handleDelete(file._id)} className="bg-[#FF5B5B] text-white p-2 rounded-lg hover:bg-red-600 transition"><LuCheck size={16} /></button>
                    <button onClick={() => setDeletingId(null)} className="bg-gray-100 text-gray-500 p-2 rounded-lg hover:bg-gray-200 transition"><LuX size={16} /></button>
                  </div>
                ) : (
                  <div className="flex gap-1">
                    <button 
                      onClick={() => {
                        const brandedLink = `${window.location.origin}/file/${file.code}`;
                        navigator.clipboard.writeText(brandedLink); 
                        toast.success("Link copied!");
                      }}
                      className="p-2.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                    >
                      <LuCopy size={18} />
                    </button>
                    <button onClick={() => setDeletingId(file._id)} className="p-2.5 text-gray-400 hover:text-[#FF5B5B] hover:bg-red-50 rounded-xl transition-all">
                      <LuTrash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default MyFiles;