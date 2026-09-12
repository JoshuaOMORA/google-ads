import { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  ChevronDown,
  X,
  Check,
  Filter,
} from 'lucide-react';
import type { FilterState } from '@/types';
import { AGE_RANGES } from '@/types';
import {
  breeds as allBreeds,
  sizes as allSizes,
  breedCounts,
  allPuppies,
  PRICE_MIN,
  PRICE_MAX,
} from '@/data/puppies';
import { cn } from '@/lib/utils';

interface Props {
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  onReset: () => void;
  resultCount: number;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  sortOptions?: { value: string; label: string }[];
  currentSort?: string;
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-slate-900"
      >
        {title}
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform',
            open ? 'rotate-180' : '',
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          open ? 'mt-3 max-h-96' : 'max-h-0',
        )}
      >
        {children}
      </div>
    </div>
  );
}

function CheckboxRow({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
      <span
        className={cn(
          'w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0',
          checked
            ? 'bg-emerald-600 border-emerald-600'
            : 'border-slate-300 group-hover:border-emerald-400',
        )}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="text-sm text-slate-600 flex-1">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-slate-400">{count}</span>
      )}
    </label>
  );
}

export function FilterSidebar({ filters, onChange, onReset, resultCount, mobileOpen, onMobileOpenChange, sortOptions, currentSort }: Props) {
  const [breedSearch, setBreedSearch] = useState('');

  const sizeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allSizes.forEach((s) => {
      counts[s] = allPuppies.filter((p) => p.size === s).length;
    });
    return counts;
  }, []);

  const ageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    AGE_RANGES.forEach((r) => {
      counts[r.key] = allPuppies.filter(
        (p) => p.ageWeeks >= r.min && p.ageWeeks <= r.max,
      ).length;
    });
    return counts;
  }, []);

  const filteredBreeds = allBreeds.filter((b) =>
    b.toLowerCase().includes(breedSearch.toLowerCase()),
  );

  const toggleArray = (key: keyof FilterState, value: string) => {
    const arr = filters[key] as string[];
    const next = arr.includes(value)
      ? arr.filter((x) => x !== value)
      : [...arr, value];
    onChange({ [key]: next } as Partial<FilterState>);
  };

  const content = (
    <div>
      {/* Search */}
      <div className="py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChange({ searchQuery: e.target.value })}
            placeholder="Search puppies..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
          />
        </div>
      </div>

      {/* Gender */}
      <Section title="Gender">
        <div className="flex gap-2">
          {(['All', 'Male', 'Female'] as const).map((g) => (
            <button
              key={g}
              onClick={() => onChange({ gender: g })}
              className={cn(
                'flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors',
                filters.gender === g
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100',
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </Section>

      {/* Breed */}
      <Section title="Breed">
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={breedSearch}
            onChange={(e) => setBreedSearch(e.target.value)}
            placeholder="Search breeds"
            className="w-full pl-8 pr-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:border-emerald-500 outline-none"
          />
        </div>
        <div className="max-h-48 overflow-y-auto">
          {filteredBreeds.map((b) => (
            <CheckboxRow
              key={b}
              label={b}
              count={breedCounts[b]}
              checked={filters.breeds.includes(b)}
              onChange={() => toggleArray('breeds', b)}
            />
          ))}
        </div>
      </Section>

      {/* Price */}
      <Section title="Price Range">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs text-slate-400">Min</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
                <input
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) =>
                    onChange({ priceMin: Number(e.target.value) })
                  }
                  className="w-full pl-6 pr-2 py-1.5 text-sm rounded-lg border border-slate-200 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
            <span className="text-slate-400 mt-4">–</span>
            <div className="flex-1">
              <label className="text-xs text-slate-400">Max</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) =>
                    onChange({ priceMax: Number(e.target.value) })
                  }
                  className="w-full pl-6 pr-2 py-1.5 text-sm rounded-lg border border-slate-200 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={50}
            value={filters.priceMax}
            onChange={(e) => onChange({ priceMax: Number(e.target.value) })}
            className="w-full accent-emerald-600"
          />
          <p className="text-xs text-slate-400">
            ${filters.priceMin.toLocaleString()} – ${filters.priceMax.toLocaleString()}
          </p>
        </div>
      </Section>

      {/* Age */}
      <Section title="Age">
        {AGE_RANGES.map((r) => (
          <CheckboxRow
            key={r.key}
            label={r.label}
            count={ageCounts[r.key]}
            checked={filters.ages.includes(r.key)}
            onChange={() => toggleArray('ages', r.key)}
          />
        ))}
      </Section>

      {/* Size */}
      <Section title="Size">
        {allSizes.map((s) => (
          <CheckboxRow
            key={s}
            label={s}
            count={sizeCounts[s]}
            checked={filters.sizes.includes(s)}
            onChange={() => toggleArray('sizes', s)}
          />
        ))}
      </Section>

      {/* Availability */}
      <Section title="Availability" defaultOpen={false}>
        <CheckboxRow
          label="Available only"
          checked={filters.availableOnly}
          onChange={() => onChange({ availableOnly: !filters.availableOnly })}
        />
      </Section>

      <div className="pt-4">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Clear All
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-white rounded-xl border border-slate-100 p-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Filter className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Filters</h3>
            <span className="ml-auto text-xs text-slate-400">
              {resultCount} results
            </span>
          </div>
          {content}
        </div>
      </aside>

      {/* Mobile filter trigger + drawer handled by parent via props */}
      <MobileFilterDrawer
        content={content}
        onReset={onReset}
        resultCount={resultCount}
        open={mobileOpen ?? false}
        onOpenChange={onMobileOpenChange ?? (() => {})}
        sortOptions={sortOptions}
        currentSort={currentSort}
        onSortChange={(v) => onChange({ sortBy: v } as Partial<FilterState>)}
      />
    </>
  );
}

function MobileFilterDrawer({
  content,
  onReset,
  resultCount,
  open,
  onOpenChange,
  sortOptions,
  currentSort,
  onSortChange,
}: {
  content: React.ReactNode;
  onReset: () => void;
  resultCount: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sortOptions?: { value: string; label: string }[];
  currentSort?: string;
  onSortChange: (value: string) => void;
}) {
  return (
    <div className="lg:hidden">
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => onOpenChange(false)}
          />
          <div className="relative w-[85%] max-w-sm bg-white h-full overflow-y-auto p-4 animate-[slideIn_0.3s_ease-out]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Filter & Sort</h3>
              <button
                onClick={() => onOpenChange(false)}
                aria-label="Close filters"
                className="p-2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {sortOptions && (
              <div className="border-b border-slate-100 pb-4 mb-2">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Sort By</h4>
                <div className="flex flex-col gap-1.5">
                  {sortOptions.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => onSortChange(o.value)}
                      className={cn(
                        'text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        currentSort === o.value
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-600 hover:bg-slate-50',
                      )}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {content}
            <div className="sticky bottom-0 bg-white pt-4 pb-2 flex gap-3 border-t border-slate-100">
              <button
                onClick={onReset}
                className="flex-1 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600"
              >
                Clear All
              </button>
              <button
                onClick={() => onOpenChange(false)}
                className="flex-1 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold"
              >
                Show {resultCount} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
