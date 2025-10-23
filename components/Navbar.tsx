import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <span className="text-2xl font-bold text-blue-500">TheFlex Admin</span>
      <div className="flex items-center space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition">
          Dashboard
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded font-semibold transition">
          Profile
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded font-semibold transition">
          Settings
        </button>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;