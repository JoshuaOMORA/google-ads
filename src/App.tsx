import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import {
  MessageCircle,
  Dog,
  ShieldCheck,
  Truck,
  CircleCheck,
  Search,
  LayoutGrid,
  List,
  ChevronDown,
  SearchX,
  SlidersHorizontal,
  X,
  MapPin,
  Mail,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { PuppyCard } from '@/components/PuppyCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Pagination } from '@/components/Pagination';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { PuppyDetail } from '@/components/PuppyDetail';
import { InfoPage } from '@/components/InfoPage';
import {
  StatsBanner,
  HowItWorks,
  WhyUs,
  Testimonials,
  Lifestyle,
  QuizCTA,
  LocationGrid,
  Footer,
  REAL_STATE_SET,
} from '@/components/Sections';
import { allPuppies, whatsappLink, WHATSAPP_MESSAGES } from '@/data/puppies';
import { BUSINESS_EMAIL } from '@/config';
import type { FilterState } from '@/types';
import { defaultFilters, AGE_RANGES } from '@/types';
import { useHashRoute } from '@/hooks/useHashRoute';
import { cn } from '@/lib/utils';

const DESKTOP_ITEMS_PER_PAGE = 5;
const MOBILE_ITEMS_PER_PAGE = 10;

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'popular', label: 'Most Popular' },
];

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function App() {
  const { route, navigate } = useHashRoute();

  if (route.path === 'puppy-detail') {
    const id = parseInt(route.params.id, 10);
    if (!isNaN(id)) {
      return <PuppyDetail puppyId={id} onNavigate={navigate} />;
    }
  }

  if (route.path === 'info-page') {
    return <InfoPage slug={route.params.slug} />;
  }

  return <HomePage onNavigate={navigate} />;
}

function HomePage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();
    mediaQuery.addEventListener('change', updateIsMobile);
    return () => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);

  const debouncedSearch = useDebounced(filters.searchQuery, 300);
  const itemsPerPage = isMobile ? MOBILE_ITEMS_PER_PAGE : DESKTOP_ITEMS_PER_PAGE;

  const updateFilters = (patch: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setPage(1);
  };

  const filtered = useMemo(() => {
    let result = allPuppies.filter((p) => {
      if (filters.gender !== 'All' && p.gender !== filters.gender) return false;
      if (filters.breeds.length > 0 && !filters.breeds.includes(p.breed))
        return false;
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
      if (filters.sizes.length > 0 && !filters.sizes.includes(p.size))
        return false;
      if (filters.availableOnly && !p.available) return false;
      if (filters.ages.length > 0) {
        const inAge = filters.ages.some((key) => {
          const r = AGE_RANGES.find((a) => a.key === key);
          return r && p.ageWeeks >= r.min && p.ageWeeks <= r.max;
        });
        if (!inAge) return false;
      }
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.breed.toLowerCase().includes(q) &&
          !p.location.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });

    const sort = filters.sortBy;
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === 'newest') result = [...result].sort((a, b) => a.ageWeeks - b.ageWeeks);
    else if (sort === 'popular') result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);

    return result;
  }, [filters, debouncedSearch]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pageItems = useMemo(
    () =>
      filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      ),
    [filtered, currentPage, itemsPerPage],
  );

  const scrollToGrid = useCallback(() => {
    const el = document.getElementById('available-puppies');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handlePageChange = (p: number) => {
    setPage(p);
    scrollToGrid();
  };

  const handleLifestyleSelect = (breeds: string[]) => {
    updateFilters({ breeds });
    setTimeout(scrollToGrid, 100);
  };

  const handleStateSelect = useCallback((state: string) => {
    setSelectedState(state);
  }, []);

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === filters.sortBy)?.label ??
    'Recommended';

  const totalCount = allPuppies.length;
  const isFiltered =
    filters.gender !== 'All' ||
    filters.breeds.length > 0 ||
    filters.priceMin !== defaultFilters.priceMin ||
    filters.priceMax !== defaultFilters.priceMax ||
    filters.ages.length > 0 ||
    filters.sizes.length > 0 ||
    filters.availableOnly ||
    debouncedSearch.length > 0;

  const showingCount = pageItems.length;
  const matchingCount = filtered.length;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <FloatingWhatsApp />

      {/* HERO */}
      <section className="bg-gradient-to-b from-emerald-50 via-white to-white pb-14 pt-12 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
              <CircleCheck className="w-4 h-4" />
              Trusted puppy placement platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
              Find the Right Puppy Faster, with Real People Helping You 1-on-1
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-600 max-w-xl">
              Browse our current puppy listings or reach out to us directly. If
              you don't see quite the right match, we'll be happy to help you
              look for one nearby.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappLink(WHATSAPP_MESSAGES.hero)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with us on WhatsApp
              </a>
              <a
                href="#available-puppies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors"
              >
                <Search className="w-5 h-5" />
                Browse available puppies
              </a>
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-slate-500 text-sm font-medium hover:text-emerald-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
                or email us
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 sm:gap-6">
              {[
                { icon: ShieldCheck, label: 'Carefully raised & health-checked' },
                { icon: Truck, label: 'Delivery options across Texas & nearby states' },
                { icon: CircleCheck, label: 'Vetted breeder network' },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-2 text-xs sm:text-sm text-slate-600"
                >
                  <b.icon className="w-5 h-5 text-emerald-600 shrink-0" />
                  {b.label}
                </div>
              ))}
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900">Why families choose us</h2>
            <p className="mt-2 text-base leading-relaxed text-slate-600">
              A personal, guided experience — we help you find the right puppy from first question to safe home delivery.
            </p>
            <div className="mt-5 space-y-3">
              {[
                { value: '220+', label: 'Happy families' },
                { value: '150+', label: 'Breeders in our trusted network' },
                { value: '<5 min', label: 'Typical reply time' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-4"
                >
                  <span className="text-sm text-slate-700">{s.label}</span>
                  <span className="text-lg font-extrabold text-emerald-700">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
            <a
              href={whatsappLink(WHATSAPP_MESSAGES.hero)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              <MessageCircle className="h-4 w-4" />
              Start your puppy consultation
            </a>
          </div>
        </div>
      </section>

      {/* URGENCY BANNER */}
      <section className="px-4">
        <div className="max-w-5xl mx-auto bg-amber-50 border border-amber-200 rounded-xl px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-sm text-amber-900">
            <span className="font-bold">High-demand breeds sell out fast:</span>{' '}
            chat now to reserve your ideal puppy
          </p>
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.banner)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-200 text-amber-900 text-sm font-semibold hover:bg-amber-300 transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            Chat now
          </a>
        </div>
      </section>

      {/* AVAILABLE PUPPIES */}
      <section id="available-puppies" className="pt-16 pb-32 sm:pb-16 px-4 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                Live listings
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-1">
                Available Puppies
              </h2>
            </div>
            <a
              href={whatsappLink(WHATSAPP_MESSAGES.custom)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors self-start"
            >
              <Dog className="w-5 h-5" />
              Tell us what dog you want
            </a>
          </div>

          {/* Selected Online Listings notice */}
          <div className="mb-6 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-slate-900">Selected Online Listings</p>
              <p className="mt-0.5 text-sm text-slate-600">
                These are just some of our pups currently listed online. Looking for another kind of puppy? Reach out — we may have more available near you.
              </p>
            </div>
            <a
              href={whatsappLink(WHATSAPP_MESSAGES.otherPups)}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              Ask About Other Pups
            </a>
          </div>

          <div className="flex gap-6">
            <FilterSidebar
              filters={filters}
              onChange={updateFilters}
              onReset={resetFilters}
              resultCount={filtered.length}
              mobileOpen={mobileFilterOpen}
              onMobileOpenChange={setMobileFilterOpen}
              sortOptions={SORT_OPTIONS}
              currentSort={filters.sortBy}
            />

            <div className="flex-1 min-w-0">
              {/* Top bar */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 mb-6">
                <p className="text-sm text-slate-600">
                  Showing{' '}
                  <span className="font-bold text-slate-900">{showingCount}</span>{' '}
                  of{' '}
                  <span className="font-bold text-slate-900">
                    {isFiltered ? matchingCount : totalCount}
                  </span>{' '}
                  {isFiltered ? 'matching listings' : 'listings'}
                </p>
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  {/* Mobile Filter & Sort button */}
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="lg:hidden flex-1 sm:flex-initial min-w-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4 shrink-0" />
                    <span>Filter & Sort</span>
                  </button>

                  {/* Sort dropdown — desktop only */}
                  <div className="hidden lg:relative lg:flex-initial lg:min-w-0">
                    <button
                      onClick={() => setSortOpen(!sortOpen)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                      <SlidersHorizontal className="w-4 h-4 shrink-0" />
                      <span className="truncate">{currentSortLabel}</span>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 shrink-0 transition-transform',
                          sortOpen ? 'rotate-180' : '',
                        )}
                      />
                    </button>
                    {sortOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setSortOpen(false)}
                        />
                        <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg border border-slate-200 shadow-lg z-20 py-1">
                          {SORT_OPTIONS.map((o) => (
                            <button
                              key={o.value}
                              onClick={() => {
                                updateFilters({ sortBy: o.value });
                                setSortOpen(false);
                              }}
                              className={cn(
                                'w-full text-left px-4 py-2 text-sm hover:bg-emerald-50',
                                filters.sortBy === o.value
                                  ? 'text-emerald-700 font-semibold'
                                  : 'text-slate-600',
                              )}
                            >
                              {o.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* View toggle */}
                  <div className="flex items-center rounded-lg border border-slate-200 overflow-hidden shrink-0">
                    <button
                      onClick={() => setView('grid')}
                      aria-label="Grid view"
                      className={cn(
                        'p-2 transition-colors',
                        view === 'grid'
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-500 hover:bg-slate-50',
                      )}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setView('list')}
                      aria-label="List view"
                      className={cn(
                        'p-2 transition-colors',
                        view === 'list'
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-500 hover:bg-slate-50',
                      )}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid / List */}
              {pageItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <SearchX className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    No puppies found
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 max-w-sm">
                    Try adjusting your filters or search terms to find more
                    available puppies.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div
                  ref={gridRef}
                  className={
                    view === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6'
                      : 'flex flex-col gap-4'
                  }
                >
                  {pageItems.map((p, i) => (
                    <PuppyCard key={p.id} puppy={p} index={i} view={view} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {filtered.length > 0 && (
                <div className="mt-6 sm:mt-10">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <StatsBanner />
      <HowItWorks />
      <WhyUs />
      <Testimonials />
      <Lifestyle onCategorySelect={handleLifestyleSelect} />
      <QuizCTA />
      <LocationGrid onSelectState={handleStateSelect} />
      <Footer />

      {selectedState && (
        <StateCoverageModal
          state={selectedState}
          onClose={() => setSelectedState(null)}
        />
      )}
    </div>
  );
}

function StateCoverageModal({
  state,
  onClose,
}: {
  state: string;
  onClose: () => void;
}) {
  const isRealState = REAL_STATE_SET.has(state);
  const statePuppies = useMemo(
    () => allPuppies.filter((p) => p.state === state && p.available),
    [state],
  );
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(statePuppies.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pageItems = useMemo(
    () =>
      statePuppies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      ),
    [statePuppies, currentPage],
  );

  useEffect(() => {
    setPage(1);
  }, [state]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handlePageChange = (p: number) => {
    setPage(p);
    const el = document.getElementById('state-results-top');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
      <div className="relative my-8 w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">{state}</span>
          </div>

          {isRealState ? (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Puppies available in {state}
              </h2>
              <p className="mt-2 text-sm md:text-base text-slate-600">
                These puppies are currently shown in our online listings for {state}.
              </p>

              {statePuppies.length > 0 ? (
                <>
                  <div id="state-results-top" className="mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {pageItems.map((p, i) => (
                      <PuppyCard key={p.id} puppy={p} index={i} view="grid" />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-6">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}

                  <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 md:p-6">
                    <h3 className="text-lg font-bold text-slate-900">
                      Didn't find quite the right puppy?
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed">
                      We may have additional puppies available in or near {state} that aren't currently shown in our online listings. We'd be happy to help you find the right match.
                    </p>
                    <a
                      href={whatsappLink(WHATSAPP_MESSAGES.coverageReal(state))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Inquire About More Puppies
                    </a>
                  </div>
                </>
              ) : (
                <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 md:p-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    Looking for a puppy in {state}?
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed">
                    We don't currently have puppies from {state} shown in our online listings, but we may have additional puppies available nearby. We'd be happy to help you find the right match.
                  </p>
                  <a
                    href={whatsappLink(WHATSAPP_MESSAGES.coverageReal(state))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Inquire About More Puppies
                  </a>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Looking for a puppy in or near {state}?
              </h2>
              <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed">
                We don't currently have puppies from this area shown in our online listings, but we may have additional puppies available nearby. We'd be happy to help you find the right match.
              </p>
              <div className="mt-5">
                <a
                  href={whatsappLink(WHATSAPP_MESSAGES.coverageNearby(state))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Inquire About Nearby Availability
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
