// utils/approval.ts

const STORAGE_KEY = "approved_reviews";

export function getApproved(): Record<number, boolean> {
  if (typeof window === "undefined") return {}; // SSR safety
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function toggleApproval(reviewId: number) {
  if (typeof window === "undefined") return; // SSR safety
  const approvals = getApproved();
  approvals[reviewId] = !approvals[reviewId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(approvals));
}