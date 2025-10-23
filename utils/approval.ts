// Store approved reviews in localStorage

export type ApprovedMap = Record<number, boolean>; // mapping of reviewId -> approved

const STORAGE_KEY = "approvedReviews";

// Get approved reviews from localStorage
export function getApproved(): ApprovedMap {
  if (typeof window === "undefined") return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as ApprovedMap) : {};
  } catch {
    return {};
  }
}

// Save approved reviews to localStorage
export function setApproved(map: ApprovedMap) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore errors
  }
}