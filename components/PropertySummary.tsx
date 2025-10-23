// components/PropertySummary.tsx
import Link from "next/link";

export default function PropertySummary({
  title,
  totalReviews,
  slug
}: {
  title: string;
  totalReviews: number;
  slug: string;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-card border border-gray-100">
      <h3 className="font-semibold text-lg text-flex-dark mb-2">{title}</h3>
      <p className="text-sm text-flex-muted">
        Total Reviews: {totalReviews}
      </p>
      <Link
        href={`/property/${slug}`}
        className="inline-block mt-3 bg-flex-accent text-white px-3 py-2 text-sm rounded-md hover:opacity-90"
      >
        View Reviews
      </Link>
    </div>
  );
}