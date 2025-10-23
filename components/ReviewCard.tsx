// components/ReviewCard.tsx
export default function ReviewCard({ review }: { review: any }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-card">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{review.guestName}</div>
          <div className="text-xs text-flex-muted">
            {new Date(review.submittedAt).toLocaleDateString()}
          </div>
        </div>
        <div className="bg-flex-accent text-white px-3 py-1 rounded-full font-semibold">
          {review.overallRating ?? "-"}
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-700">{review.publicReview}</p>

      <div className="mt-3 flex gap-2 flex-wrap">
        {Object.entries(review.categories || {}).map(([k, v]) => (
          <span key={k} className="text-xs px-2 py-1 bg-gray-100 rounded">
            {k}: {String(v)}
          </span>
        ))}
      </div>
    </div>
  );
}
