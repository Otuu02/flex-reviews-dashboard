// pages/dashboard.tsx
import { useEffect, useState } from "react";
import PropertySummary from "../components/PropertySummary";
import { getApproved, toggleApproval } from "../utils/approval";
import Link from "next/link";

export default function Dashboard() {
  const [approved, setApproved] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setApproved(getApproved());
    setLoading(false);
  }, []);

  const handleToggleApproval = (id: string) => {
    toggleApproval(id);
    setApproved(getApproved());
  };

  if (loading) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {approved.length === 0 ? (
        <p className="text-gray-300">No approved reviews found.</p>
      ) : (
        <div className="grid gap-4">
          {approved.map((review) => (
            <div
              key={review.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{review.guestName}</h2>
                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                  ⭐ {review.overallRating || "-"}
                </span>
              </div>

              <p className="mt-2 text-gray-300">{review.publicReview}</p>

              <div className="mt-
