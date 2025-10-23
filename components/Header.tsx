// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between h-16">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src="/logo.png" alt="Flex" className="h-8 w-auto" />
            <span className="font-semibold text-lg text-flex-dark">Flex Living</span>
          </div>
        </Link>

        <nav className="flex items-center gap-4 text-sm text-flex-muted">
          <Link href="/dashboard" className="hover:text-flex-accent">Dashboard</Link>
          <a href="https://theflex.global" target="_blank" rel="noreferrer" className="hover:text-flex-accent">Website</a>
        </nav>
      </div>
    </header>
  );
}