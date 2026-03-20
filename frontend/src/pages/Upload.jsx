import UploadBox from "../components/UploadBox";
import { motion } from "framer-motion";

function Upload() {
  return (
    <div className="py-10 sm:py-16 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
          Upload Your File
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Your file will be stored securely on AWS S3 and a shareable link will be generated instantly.
        </p>
      </motion.div>

      {/* This component handles the actual logic and S3 connection */}
      <UploadBox />
      
      <div className="mt-12 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
          Secure • Encrypted • Fast
        </p>
      </div>
    </div>
  );
}

export default Upload;