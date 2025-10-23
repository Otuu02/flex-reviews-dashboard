const STORAGE_KEY = "approvedReviews";

export function getApproved(): Record<number, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (err) {
    console.error("Failed to read approval data:", err);
    return {};
  }
}

export function setApproved(map: Record<number, boolean>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (err) {
    console.error("Failed to save approval data:", err);
  }
}

export function toggleApproval(slug: string, reviewId: number): void {
  const current = getApproved();
  const updated = {
    ...current,
    [reviewId]: !current[reviewId],
  };
  setApproved(updated);
}
