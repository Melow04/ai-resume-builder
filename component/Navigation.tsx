'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const isBuilder = pathname === '/builder';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Resuvmint Home">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <Image src="/assets/resuvmint-mark.svg" alt="Resuvmint Logo" width={25} height={25} className="w-10 h-10" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-[var(--primary)] transition-colors">
              resuvmint
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-3">
            {!isBuilder && (
              <Link
                href="/builder"
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Start Building</span>
                <span className="sm:hidden">Start</span>
              </Link>
            )}
            
            {isBuilder && (
              <Link
                href="/"
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                Home
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
