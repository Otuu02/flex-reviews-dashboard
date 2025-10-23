import { useEffect, useState } from "react";
import PropertySummary from "../components/PropertySummary";
import { getApproved, toggleApproval } from "../utils/approval.ts";
import Link from "next/link";

export default function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const approvedMap = getApproved();

  useEffect(() => {
    fetch("/api/reviews/hostaway")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews || []);
        setLoading(false);
      });
  }, []);

  const handleApprovalToggle = (slug: string, id: number) => {
    toggleApproval(slug, id);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>

        {/* ✅ Per Property Stats */}
        <PropertySummary reviews={reviews} approvedMap={approvedMap} />

        {/* ✅ Review List */}
        <div className="space-y-4">
          {reviews.map((review: any) => (
            <div key={review.id} className="bg-white shadow rounded p-4">
              <div className="font-semibold">{review.listingName}</div>
              <div className="text-sm text-gray-600">
                {review.guestName} • ⭐ {review.overallRating}
              </div>
              <div className="mt-2">{review.publicReview}</div>

              <label className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  checked={approvedMap[review.id] || false}
                  onChange={() =>
                    handleApprovalToggle(review.listingSlug, review.id)
                  }
                />
                Approve Review
              </label>

              <Link href={`/property/${review.listingSlug}`}>
                <span className="text-blue-600 underline cursor-pointer text-sm mt-2 inline-block">
                  View Property Reviews
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}