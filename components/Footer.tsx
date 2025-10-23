// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container py-6 text-sm text-flex-muted">
        © {new Date().getFullYear()} Flex Living — Assessment Demo
      </div>
    </footer>
  );
}