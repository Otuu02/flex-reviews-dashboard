// pages/api/reviews/hostaway.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const fp = path.join(process.cwd(), "data", "mock_reviews.json");
    const raw = JSON.parse(fs.readFileSync(fp, "utf8"));
    const normalized = (raw.result || []).map((r) => {
      const categories = {};
      let sum = 0;
      (r.reviewCategory || []).forEach((c) => {
        categories[c.category] = c.rating;
        sum += Number(c.rating) || 0;
      });
      const overall = r.rating ?? (Object.keys(categories).length ? Math.round(sum / Object.keys(categories).length) : null);
      const listingSlug = String(r.listingName || "unknown")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
      return {
        id: r.id,
        listingName: r.listingName,
        listingSlug,
        guestName: r.guestName,
        submittedAt: new Date(r.submittedAt).toISOString(),
        overallRating: overall,
        categories,
        publicReview: r.publicReview ?? null,
        channel: r.channel ?? "hostaway",
        type: r.type ?? null
      };
    });

    return res.status(200).json({ status: "ok", count: normalized.length, reviews: normalized });
  } catch (err) {
    console.error("API error", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}