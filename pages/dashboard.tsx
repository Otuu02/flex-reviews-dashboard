// pages/dashboard.tsx
import { useEffect, useState } from "react";
import PropertySummary from "../components/PropertySummary";
import { getApproved, toggleApproval } from "../utils/approval";

type Property = {
  id: number;
  name: string;
  location: string;
};

type Review = {
  id: number;
  guestName: string;
  submittedAt: string;
  overallRating?: number;
  publicReview: string;
  categories?: Record<string, string | number>;
};

export default function Dashboard() {
  const [approved, setApproved] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState<boolean>(true);

  // make sure the states are explicitly typed
  const [properties, setProperties] = useState<Property[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // initial approved mapping (must return Record<number, boolean>)
    setApproved(getApproved());

    // explicit typed sample data
    const sampleProperties: Property[] = [
      { id: 1, name: "Property A", location: "Lagos" },
      { id: 2, name: "Property B", location: "Abuja" },
      { id: 3, name: "Property C", location: "Port Harcourt" },
    ];

    const sampleReviews: Review[] = [
      {
        id: 1,
        guestName: "John Doe",
        submittedAt: "2025-10-20T12:00:00Z",
        overallRating: 5,
        publicReview: "Great stay!",
        categories: { Cleanliness: 5, Service: 4 },
      },
      {
        id: 2,
        guestName: "Jane Smith",
        submittedAt: "2025-10-21T10:00:00Z",
        // overallRating intentionally undefined to test fallback
        publicReview: "Nice place.",
        categories: { Comfort: 3 },
      },
    ];

    setProperties(sampleProperties);
    setReviews(sampleReviews);
    setLoading(false);
  }, []);

  const handleToggle = (id: number) => {
    toggleApproval(id);
    setApproved((prev) => ({
      ...prev,
      [id]: prev[id] ? false : true,
    }));
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Dashboard</h1>

      {/* Properties */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property: Property) => (
          <PropertySummary
            key={property.id}
            property={property}
            approved={approved[property.id]}
            onToggle={() => handleToggle(property.id)}
          />
        ))}
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Reviews</h2>
        <div className="space-y-4">
          {reviews.map((r: Review) => (
            <div
              key={r.id} // r is typed as Review so id exists
              className="p-3 bg-white border rounded shadow-sm"
            >
              <div className="font-semibold">{r.guestName}</div>
              <div className="text-sm text-gray-600">
                {new Date(r.submittedAt).toLocaleDateString()} • ⭐{" "}
                {r.overallRating ?? "-"}
              </div>
              <p className="text-gray-700">{r.publicReview}</p>

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
      </div>
    </div>
  );
}
