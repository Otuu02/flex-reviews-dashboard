// components/PropertySummary.tsx
import Link from "next/link";

interface PropertySummaryProps {
  reviews: any[];
  approvedMap: Record<number, boolean>;
}

interface GroupedProperty {
  slug: string;
  name: string;
  avgRating: string;
  approvedCount: number;
}

export default function PropertySummary({ reviews, approvedMap }: PropertySummaryProps) {
  if (!reviews?.length) return null;

  const grouped: GroupedProperty[] = Object.values(
    reviews.reduce((acc: any, r: any) => {
      if (!r.listingSlug) return acc;

      if (!acc[r.listingSlug]) {
        acc[r.listingSlug] = {
          slug: r.listingSlug,
          name: r.listingName,
          ratings: [] as number[],
          approved: 0,
        };
      }

      acc[r.listingSlug].ratings.push(r.overallRating ?? 0);
      if (approvedMap[r.id]) acc[r.listingSlug].approved++;
      return acc;
    }, {})
  ).map((p: any) => ({
    slug: p.slug,
    name: p.name,
    avgRating:
      p.ratings.length > 0
        ? (p.ratings.reduce((a: number, b: number) => a + b, 0) / p.ratings.length).toFixed(1)
        : "-",
    approvedCount: p.approved,
  }));

  return (
    <div className="mb-5 p-3 border rounded bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">Per-Property Overview</h2>
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="text-center bg-gray-100 font-medium">
            <th className="border px-2 py-2">Property</th>
            <th className="border px-2 py-2">Avg Rating</th>
            <th className="border px-2 py-2">Approved Reviews</th>
            <th className="border px-2 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {grouped.map(({ slug, name, avgRating, approvedCount }) => (
            <tr key={slug} className="text-center">
              <td className="border px-2 py-2 text-left">{name}</td>
              <td className="border px-2 py-2">{avgRating}</td>
              <td className="border px-2 py-2">{approvedCount}</td>
              <td className="border px-2 py-2">
                <Link href={`/property/${slug}`} legacyBehavior>
                  <a className="text-blue-600 underline cursor-pointer">View Reviews</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}