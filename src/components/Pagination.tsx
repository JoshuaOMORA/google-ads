import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  const showAll = totalPages <= 12;
  if (showAll) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    )
      pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  // Mobile: condensed format ‹ 1 … 3 4 5 … 6 ›
  const mobilePages: (number | '...')[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) mobilePages.push(i);
  } else {
    mobilePages.push(1);
    if (currentPage > 3) mobilePages.push('...');
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    )
      mobilePages.push(i);
    if (currentPage < totalPages - 2) mobilePages.push('...');
    mobilePages.push(totalPages);
  }

  const go = (p: number) => {
    if (p < 1 || p > totalPages || p === currentPage) return;
    onPageChange(p);
  };

  const prevBtn = (isMobile: boolean) => (
    <button
      onClick={() => go(currentPage - 1)}
      disabled={currentPage === 1}
      className={cn(
        'inline-flex items-center justify-center rounded-lg border border-gray-200 transition-colors',
        isMobile
          ? 'w-8 h-8 sm:hidden'
          : 'hidden sm:inline-flex gap-1 px-3 py-2 text-sm font-medium',
        currentPage === 1
          ? 'text-slate-300 cursor-not-allowed'
          : 'text-slate-600 hover:bg-gray-50',
      )}
      aria-label="Previous page"
    >
      <ChevronLeft className={cn('w-4 h-4', !isMobile && 'sm:w-4 sm:h-4')} />
      {!isMobile && <span className="hidden sm:inline">Previous</span>}
    </button>
  );

  const nextBtn = (isMobile: boolean) => (
    <button
      onClick={() => go(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={cn(
        'inline-flex items-center justify-center rounded-lg border border-gray-200 transition-colors',
        isMobile
          ? 'w-8 h-8 sm:hidden'
          : 'hidden sm:inline-flex gap-1 px-3 py-2 text-sm font-medium',
        currentPage === totalPages
          ? 'text-slate-300 cursor-not-allowed'
          : 'text-slate-600 hover:bg-gray-50',
      )}
      aria-label="Next page"
    >
      {!isMobile && <span className="hidden sm:inline">Next</span>}
      <ChevronRight className="w-4 h-4" />
    </button>
  );

  return (
    <nav
      className="flex items-center justify-center gap-1 sm:gap-1.5 flex-nowrap"
      aria-label="Pagination"
    >
      {prevBtn(true)}
      {prevBtn(false)}

      {/* Mobile page buttons */}
      {mobilePages.map((p, i) =>
        p === '...' ? (
          <span
            key={`m-ellipsis-${i}`}
            className="px-1 text-slate-400 sm:hidden"
          >
            …
          </span>
        ) : (
          <button
            key={`m-${p}`}
            onClick={() => go(p)}
            className={cn(
              'min-w-[2rem] h-8 rounded-lg text-sm font-semibold transition-colors sm:hidden',
              p === currentPage
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:bg-gray-50',
            )}
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {p}
          </button>
        ),
      )}

      {/* Desktop page buttons */}
      {pages.map((p, i) =>
        p === '...' ? (
          <span
            key={`d-ellipsis-${i}`}
            className="hidden sm:inline px-2 text-slate-400"
          >
            …
          </span>
        ) : (
          <button
            key={`d-${p}`}
            onClick={() => go(p)}
            className={cn(
              'hidden sm:inline-flex min-w-[2.5rem] h-10 rounded-lg text-sm font-semibold transition-colors items-center justify-center',
              p === currentPage
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:bg-gray-50',
            )}
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {p}
          </button>
        ),
      )}

      {nextBtn(true)}
      {nextBtn(false)}
    </nav>
  );
}
