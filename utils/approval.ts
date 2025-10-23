// utils/approval.ts
export function getApproved(): Record<number, boolean> {
  return { 1: true, 2: false, 3: true }; // Example initial approvals
}

export function toggleApproval(id: number) {
  // Placeholder for toggling logic (backend or localStorage)
  console.log(`Toggled approval for property ${id}`);
}
