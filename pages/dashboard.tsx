// pages/dashboard.tsx
import { useEffect, useState } from "react";
import PropertySummary from "../components/PropertySummary";
import { getApproved, toggleApproval } from "../utils/approval";
import Link from "next/link";

export default function Dashboard() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvedOnly, setApprovedOnly] = useState(false);

  const approvedMap = getApproved();

  useEffect(() => {
    fetch("/api/reviews/hostaway")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews);
        setLoading(false);
      });
  }, []);

  const filteredReviews = reviews.filter(
    (r) => !approvedOnly || approvedMap[r.id]
  );

  // Group by property/listing
  const propertyGroups: Record<string, any[]> = {};
  filteredReviews.forEach((review) => {
    const slug = review.listingSlug;
    if (!propertyGroups[slug]) propertyGroups[slug] = [];
    propertyGroups[slug].push(review);
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-card">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Reviews Dashboard</h1>

        <label className="flex items-center gap-2 text-sm text-flex-dark">
          <input
            type="checkbox"
            checked={approvedOnly}
            onChange={(e) => setApprovedOnly(e.target.checked)}
          />
          Show Approved Only
        </label>
      </div>

      {loading ? (
        <div>Loading reviews…</div>
      ) : (
        <>
          {/* Grouped properties */}
          <div className="grid gap-4 mb-8 md:grid-cols-3">
            {Object.keys(propertyGroups).map((slug) => {
              const count = propertyGroups[slug].length;
              return (
                <PropertySummary
                  key={slug}
                  slug={slug}
                  title={slug.replace(/-/g, " ")}
                  totalReviews={count}
                />
              );
            })}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-flex-dark">
                  <th className="p-3">Guest</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Review</th>
                  <th className="p-3 text-center">Approve</th>
                </tr>
              </thead>

              <tbody>
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="border-b">
                    <td className="p-3">{review.guestName}</td>
                    <td className="p-3">
                      {new Date(review.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 font-semibold">{review.overallRating}</td>
                    <td className="p-3 max-w-xs truncate">
                      {review.publicReview}
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={!!approvedMap[review.id]}
                        onChange={() => {
                          toggleApproval(review.id);
                          window.location.reload();
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}