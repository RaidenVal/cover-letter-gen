"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/stories", label: "Stories" },
  { href: "/generate", label: "Generate" },
  { href: "/settings", label: "Settings" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function linkClasses(href: string) {
    const active = pathname === href || pathname.startsWith(href + "/");
    return `text-[15px] transition-colors ${
      active ? "text-[#141413] font-medium" : "text-[#5e5d59] hover:text-[#141413]"
    }`;
  }

  return (
    <nav className="border-b border-[#f0eee6] bg-[#f5f4ed]">
      <div className="mx-auto max-w-[980px] px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-serif text-[20px] font-medium text-[#141413]">
          Cover Letter Gen
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClasses(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-[#141413] transition-transform ${
              menuOpen ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#141413] transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#141413] transition-transform ${
              menuOpen ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#f0eee6] bg-[#f5f4ed]">
          <div className="mx-auto max-w-[980px] px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClasses(link.href)}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
