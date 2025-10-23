import React from "react";

interface Review {
  guestName: string;
  submittedAt: string;
  publicReview: string;
  overallRating?: number;
  categories?: Record<string, string | number>;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-card">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{review.guestName}</div>
          <div className="text-xs text-gray-500">
            {new Date(review.submittedAt).toLocaleDateString()} • ⭐{" "}
            {review.overallRating ?? "-"}
          </div>
        </div>
        <div className="bg-blue-500 text-white px-3 py-1 rounded-full font-semibold">
          {review.overallRating ?? "-"}
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-700">{review.publicReview}</p>

      <div className="mt-3 flex gap-2 flex-wrap">
        {Object.entries(review.categories || {}).map(([k, v]) => (
          <span
            key={k}
            className="text-xs px-2 py-1 bg-gray-100 rounded"
          >
            {k}: {v}
          </span>
        ))}
      </div>
    </div>
  );
}
