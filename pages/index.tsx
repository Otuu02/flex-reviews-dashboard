import React from "react";
import Navbar from "../components/Navbar";

const reviews = [
  { id: 1, title: "Amazing Product", content: "Loved it, works perfectly!", rating: 5 },
  { id: 2, title: "Good Service", content: "Fast delivery, very satisfied.", rating: 4 },
  { id: 3, title: "Could be better", content: "Packaging was damaged.", rating: 3 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        {/* Dashboard Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-6">
          Admin Dashboard
        </h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition">
            <h3 className="text-gray-400 uppercase text-sm mb-2">Total Reviews</h3>
            <p className="text-2xl font-bold text-blue-500">128</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition">
            <h3 className="text-gray-400 uppercase text-sm mb-2">Average Rating</h3>
            <p className="text-2xl font-bold text-blue-500">4.5 ★</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition">
            <h3 className="text-gray-400 uppercase text-sm mb-2">Pending Reviews</h3>
            <p className="text-2xl font-bold text-blue-500">12</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition">
            <h3 className="text-gray-400 uppercase text-sm mb-2">New Users</h3>
            <p className="text-2xl font-bold text-blue-500">34</p>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-white">
                {review.title}
              </h2>
              <p className="text-gray-300 mb-4">{review.content}</p>
              <span className="text-blue-500 font-bold">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </span>
              <div className="mt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2">
                  View
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;