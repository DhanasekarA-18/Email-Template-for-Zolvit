import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-20 h-20 border-4 border-t-transparent border-gray-300 rounded-full animate-spin">
        <span className="absolute inset-0 flex justify-center items-center font-bold text-lg text-gray-700">
          DS
        </span>
      </div>
    </div>
  );
};

export default Loader;
