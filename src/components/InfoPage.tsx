import { useState } from 'react';
import { ChevronDown, ArrowLeft, MessageCircle, Mail } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Sections';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { INFO_PAGES, type InfoPageData } from '@/data/info-pages';
import { cn } from '@/lib/utils';

export function InfoPage({ slug }: { slug: string }) {
  const page = INFO_PAGES[slug];
  if (!page) return null;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <FloatingWhatsApp />

      <section className="py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </a>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            {page.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            {page.intro}
          </p>

          {page.sections.length > 0 && (
            <div className="mt-10 space-y-8">
              {page.sections.map((s, i) => (
                <div key={i}>
                  {s.heading && (
                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                      {s.heading}
                    </h2>
                  )}
                  {s.body && (
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                      {s.body}
                    </p>
                  )}
                  {s.list && (
                    <ul className="mt-2 space-y-1.5">
                      {s.list.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm md:text-base text-slate-600"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.cta && (
                    <a
                      href={s.cta.href}
                      {...(s.cta.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className={cn(
                        'mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors',
                        s.cta.href.startsWith('mailto:')
                          ? 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700',
                      )}
                    >
                      {s.cta.href.startsWith('mailto:') ? (
                        <Mail className="w-4 h-4" />
                      ) : (
                        <MessageCircle className="w-4 h-4" />
                      )}
                      {s.cta.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {page.faq && (
            <div className="mt-10 space-y-3">
              {page.faq.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-5 py-4 text-left"
      >
        <span className="text-sm md:text-base font-semibold text-slate-900 pr-4">
          {q}
        </span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-slate-400 shrink-0 transition-transform',
            open ? 'rotate-180' : '',
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          open ? 'max-h-96' : 'max-h-0',
        )}
      >
        <p className="px-5 pb-4 text-sm md:text-base text-slate-600 leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}
