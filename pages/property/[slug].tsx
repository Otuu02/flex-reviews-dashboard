// pages/property/[slug].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getApproved } from "../../utils/approval";

export default function PropertyPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const approvedMap = getApproved(); // IDs are strings

  useEffect(() => {
    if (!slug) return;

    fetch("/api/reviews/hostaway")
      .then((r) => r.json())
      .then((d) => {
        console.log("All Reviews →", d.reviews);
        console.log("Approved Map →", approvedMap);

        // Filter reviews for this property and approved
        const filtered = d.reviews.filter(
          (review: any) =>
            review.listingSlug === slug &&
            approvedMap[review.id.toString()] // convert id to string
        );

        setReviews(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch reviews:", err);
        setLoading(false);
      });
  }, [slug, approvedMap]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">
        {slug ? slug.replace(/-/g, " ") : "Property"}
      </h1>

      {loading ? (
        <div>Loading...</div>
      ) : reviews.length === 0 ? (
        <div>No approved reviews yet. Please approve reviews in the dashboard first.</div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="p-3 bg-white border rounded shadow-sm">
              <div className="font-semibold">{r.guestName}</div>
              <div className="text-sm text-gray-600">
                {new Date(r.submittedAt).toLocaleDateString()} • ⭐ {r.overallRating}
              </div>
              <p className="mt-2">{r.publicReview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}