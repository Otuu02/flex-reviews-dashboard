// components/PropertyHero.tsx
export default function PropertyHero({ title = "Property Title", image = "/placeholder.jpg" }: { title?: string, image?: string }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-card mb-6 flex gap-4 items-center">
      <img src={image} alt={title} className="w-40 h-28 object-cover rounded-md" />
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="text-sm text-flex-muted mt-1">2 beds • 1 bath • central area</div>
      </div>
    </div>
  );
}