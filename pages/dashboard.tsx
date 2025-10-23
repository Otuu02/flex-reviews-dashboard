// pages/dashboard.tsx
import { useEffect, useState } from "react";
import PropertySummary from "../components/PropertySummary";
import { getApproved, setApproved } from "../utils/approval";

export default function Dashboard() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [propertyFilter, setPropertyFilter] = useState("");
  const [minRatingFilter, setMinRatingFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  // Approvals
  const [approvedMap, setApprovedMap] = useState<Record<number, boolean>>({});

  // Load approvals
  useEffect(() => {
    if (typeof window !== "undefined") setApprovedMap(getApproved());
  }, []);

  // Save approvals
  useEffect(() => {
    if (typeof window !== "undefined") setApproved(approvedMap);
  }, [approvedMap]);

  // Fetch reviews
  useEffect(() => {
    fetch("/api/reviews/hostaway")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews || []);
        console.log("Review Data →", data.reviews);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleApprove = (id: number) =>
    setApprovedMap((prev) => ({ ...prev, [id]: !prev[id] }));

  // Filtered reviews
  const filtered = reviews
    .filter((r) => !propertyFilter || r.listingName === propertyFilter)
    .filter((r) => !minRatingFilter || (r.overallRating ?? 0) >= Number(minRatingFilter))
    .filter((r) => {
      const date = new Date(r.submittedAt);
      const start = startDateFilter ? new Date(startDateFilter) : null;
      const end = endDateFilter ? new Date(endDateFilter) : null;
      if (start && date < start) return false;
      if (end && date > end) return false;
      return true;
    });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard — Reviews</h1>

      {/* Per-Property Summary */}
      <PropertySummary reviews={reviews} approvedMap={approvedMap} />

      {/* Filters */}
      <div className="mb-4 p-3 border rounded bg-gray-50 flex flex-wrap gap-2 items-center">
        <select
          value={propertyFilter}
          onChange={(e) => setPropertyFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Properties</option>
          {Array.from(new Set(reviews.map((r) => r.listingName))).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="0"
          max="10"
          placeholder="Min Rating"
          value={minRatingFilter}
          onChange={(e) => setMinRatingFilter(e.target.value)}
          className="border px-2 py-1 rounded w-28"
        />

        <input
          type="date"
          value={startDateFilter}
          onChange={(e) => setStartDateFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <input
          type="date"
          value={endDateFilter}
          onChange={(e) => setEndDateFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <div className="ml-auto text-sm text-gray-600">
          Showing {filtered.length} of {reviews.length} reviews
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div>Loading reviews...</div>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="text-center">
              <th className="border px-2 py-2">Property</th>
              <th className="border px-2 py-2">Guest</th>
              <th className="border px-2 py-2">Rating</th>
              <th className="border px-2 py-2">Date</th>
              <th className="border px-2 py-2">Approve</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="text-center">
                <td className="border px-2 py-2 text-left">{r.listingName}</td>
                <td className="border px-2 py-2">{r.guestName}</td>
                <td className="border px-2 py-2">{r.overallRating ?? "-"}</td>
                <td className="border px-2 py-2">{new Date(r.submittedAt).toLocaleDateString()}</td>
                <td className="border px-2 py-2">
                  <input
                    type="checkbox"
                    checked={!!approvedMap[r.id]}
                    onChange={() => toggleApprove(r.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}