import { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { whatsappLink, WHATSAPP_MESSAGES } from '@/data/puppies';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'Available puppies', href: '#available-puppies' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Why us', href: '#why-us' },
  { label: 'Reviews', href: '#reviews' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/95 backdrop-blur">
      <div className="bg-emerald-600 text-white text-center text-sm py-2 px-4">
        <span className="inline-flex items-center gap-1.5">
          Reach out to us on WhatsApp: +1 (803) 290-5650
        </span>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 sm:gap-2.5 shrink-0 min-w-0">
            <img
              src="/images/cloverwood-pups-logo.png"
              alt="Cloverwood Pups"
              className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 object-contain shrink-0"
            />
            <span className="flex flex-col leading-tight min-w-0">
              <span className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
                Cloverwood Pups
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 truncate">
                Healthy Pups, Happy Homes
              </span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href={whatsappLink(WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          <button
            className="md:hidden p-2 text-slate-700"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          open ? 'max-h-96' : 'max-h-0',
        )}
      >
        <nav className="px-4 pb-4 flex flex-col gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="py-2.5 px-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
            >
              {n.label}
            </a>
          ))}
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
