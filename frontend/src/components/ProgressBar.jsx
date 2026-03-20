function ProgressBar({ progress }) {
  return (
    <div className="mt-6 w-full">
      <div className="flex justify-between text-xs mb-1 font-bold text-gray-600 uppercase">
        <span>Uploading...</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
        <div
          style={{ width: `${progress}%` }}
          className="bg-[#FF5B5B] h-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,91,91,0.4)]"
        />
      </div>
    </div>
  );
}
export default ProgressBar;