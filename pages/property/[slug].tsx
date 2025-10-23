// pages/property/[slug].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type Property = {
  id: number;
  slug: string;
  name: string;
  location: string;
  description?: string;
};

type Review = {
  id: number;
  guestName: string;
  submittedAt: string;
  overallRating?: number;
  publicReview: string;
  categories?: Record<string, string | number>;
};

export default function PropertyPage() {
  const router = useRouter();
  const { slug } = router.query;

  // typed state avoids 'never' inference
  const [property, setProperty] = useState<Property | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) return;

    // --- Sample data (replace with your real data fetch) ---
    const sampleProperties: Property[] = [
      {
        id: 1,
        slug: "property-a",
        name: "Property A",
        location: "Lagos",
        description: "A cozy apartment in Lagos.",
      },
      {
        id: 2,
        slug: "property-b",
        name: "Property B",
        location: "Abuja",
        description: "Comfortable home in Abuja.",
      },
    ];

    const sampleReviews: Review[] = [
      {
        id: 1,
        guestName: "John Doe",
        submittedAt: "2025-10-20T12:00:00Z",
        overallRating: 5,
        publicReview: "Amazing stay!",
        categories: { Cleanliness: 5, Service: 4 },
      },
      {
        id: 2,
        guestName: "Jane Smith",
        submittedAt: "2025-10-21T10:00:00Z",
        overallRating: undefined,
        publicReview: "Nice location.",
        categories: { Comfort: 3 },
      },
    ];
    // -------------------------------------------------------

    // find property by slug (string or array)
    const slugStr = Array.isArray(slug) ? slug[0] : slug;
    const found = sampleProperties.find((p) => p.slug === slugStr) ?? null;

    // Filter reviews for this property (for demo we'll use id match)
    // In real app you would fetch reviews by property id from an API
    const propertyReviews = sampleReviews.filter((r) =>
      // demo: assign review id parity to property id for variety
      found ? r.id % 2 === (found.id % 2) : false
    );

    setProperty(found);
    setReviews(propertyReviews);
    setLoading(false);
  }, [slug]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!property)
    return (
      <div className="p-6">
        <p className="text-lg font-semibold">Property not found</p>
        <Link href="/dashboard">
          <a className="text-blue-600 underline mt-4 inline-block">Back to dashboard</a>
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold">{property.name}</h1>
          <p className="text-sm text-gray-500">{property.location}</p>
          {property.description && <p className="mt-2 text-gray-700">{property.description}</p>}
        </header>

        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>

          {/* List is typed as Review[], so r.id exists and no 'never' errors */}
          <div className="space-y-4">
            {reviews.length === 0 && <div className="text-gray-600">No reviews yet.</div>}

            {reviews.map((r: Review) => (
              <div key={r.id} className="p-3 bg-white border rounded shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{r.guestName}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(r.submittedAt).toLocaleDateString()} • ⭐ {r.overallRating ?? "-"}
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-gray-700">{r.publicReview}</p>

                <div className="mt-2 flex gap-2 flex-wrap">
                  {Object.entries(r.categories || {}).map(([k, v]) => (
                    <span key={k} className="text-xs px-2 py-1 bg-gray-100 rounded">
                      {k}: {String(v)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div>
          <Link href="/dashboard">
            <a className="text-blue-600 underline">Back to dashboard</a>
          </Link>
        </div>
      </div>
    </div>
  );
}