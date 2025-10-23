// pages/property/[slug].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getApproved } from "../../utils/approval";
import PropertyHero from "../../components/PropertyHero";
import ReviewCard from "../../components/ReviewCard";

export default function PropertyPage() {
  const router = useRouter();
  const { slug } = router.query;
  const displaySlug = Array.isArray(slug) ? slug[0] : slug;

  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const approvedMap = getApproved();

  useEffect(() => {
    if (!displaySlug) return;
    fetch("/api/reviews/hostaway")
      .then((r) => r.json())
      .then((d) => {
        const filtered = d.reviews.filter(
          (review: any) => review.listingSlug === displaySlug && approvedMap[review.id?.toString?.() ?? review.id]
        );
        setReviews(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [displaySlug]);

  const propertyName = displaySlug ? displaySlug.replace(/-/g, " ") : "Property";

  return (
    <div>
      <PropertyHero title={propertyName} image="/property-1.jpg" />

      <section>
        <h2 className="text-xl font-semibold mb-4">Guest Reviews</h2>

        {loading ? (
          <div>Loading reviews…</div>
        ) : reviews.length === 0 ? (
          <div>No approved reviews yet. Approve reviews in the dashboard first.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        )}
      </section>
    </div>
  );
}