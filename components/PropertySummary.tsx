// components/PropertySummary.tsx
import React from "react";

interface Property {
  id: number;
  name: string;
  location: string;
}

interface PropertySummaryProps {
  property: Property;
  approved?: boolean;
  onToggle: () => void;
}

export default function PropertySummary({
  property,
  approved = false,
  onToggle,
}: PropertySummaryProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="font-semibold text-lg">{property.name}</div>
          <div className="text-gray-500 text-sm">{property.location}</div>
        </div>
        <button
          onClick={onToggle}
          className={`px-3 py-1 rounded-full font-semibold ${
            approved ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {approved ? "Approved" : "Pending"}
        </button>
      </div>
    </div>
  );
}
