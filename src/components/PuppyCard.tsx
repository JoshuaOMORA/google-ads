import { useState, useEffect } from 'react';
import {
  Heart,
  Star,
  MapPin,
  Clock,
  MessageCircle,
  Award,
  CircleCheck,
  Sparkles,
} from 'lucide-react';
import type { Puppy } from '@/data/puppies';
import { whatsappLink, WHATSAPP_MESSAGES } from '@/data/puppies';
import { puppyDetailLink } from '@/hooks/useHashRoute';
import { cn } from '@/lib/utils';

interface Props {
  puppy: Puppy;
  index: number;
  view: 'grid' | 'list';
}

const FAV_KEY = 'puppy-favorites';

function useFavorites() {
  const [favs, setFavs] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      return raw ? (JSON.parse(raw) as number[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    } catch {
      /* ignore */
    }
  }, [favs]);

  const toggle = (id: number) =>
    setFavs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return { favs, toggle };
}

export function PuppyCard({ puppy, index, view }: Props) {
  const { favs, toggle } = useFavorites();
  const [imgError, setImgError] = useState(false);
  const isFav = favs.includes(puppy.id);

  const statusBadge =
    puppy.featured
      ? { text: 'Featured', cls: 'bg-amber-100 text-amber-800', icon: Sparkles }
      : { text: 'Available', cls: 'bg-emerald-100 text-emerald-700', icon: CircleCheck };

  const waLink = whatsappLink(
    WHATSAPP_MESSAGES.perPuppy(puppy.name, puppy.breed, puppy.gender),
  );

  const animStyle = {
    animation: `cardIn 0.5s ease-out ${index * 80}ms both`,
  };

  const imageEl = (
    <div className="relative overflow-hidden bg-slate-100 w-full h-full">
      {!imgError ? (
        <img
          src={puppy.image}
          alt={`${puppy.breed} puppy named ${puppy.name}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-300">
          <span className="text-4xl font-bold">{puppy.name[0]}</span>
        </div>
      )}
      <button
        onClick={() => toggle(puppy.id)}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
      >
        <Heart
          className={cn(
            'w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors',
            isFav ? 'fill-red-500 text-red-500' : 'text-slate-400',
          )}
        />
      </button>
    </div>
  );

  const contentEl = (
    <div className="p-3 sm:p-4 flex flex-col flex-1 gap-1 sm:gap-1">
      {/* Badges below photo */}
      <div className="flex flex-wrap gap-1.5 mb-1">
        {puppy.available && (
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold',
              statusBadge.cls,
            )}
          >
            {statusBadge.icon && <statusBadge.icon className="w-3 h-3" />}
            {statusBadge.text}
          </span>
        )}
        {puppy.championBloodline && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900 text-amber-300">
            <Award className="w-3 h-3" />
            Champion Bloodline
          </span>
        )}
        {puppy.reserved && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-600">
            Reserved
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-1 sm:gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-base font-bold text-slate-900 truncate leading-tight">{puppy.name}</h3>
          <p className="text-sm sm:text-sm text-slate-500 truncate leading-tight">{puppy.breed}</p>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          <Star className="w-4 h-4 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm sm:text-sm font-semibold text-slate-700">
            {puppy.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Mobile: gender + age as one compact group */}
      <div className="mt-1 sm:mt-2 flex items-center text-sm text-slate-500">
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <span
            className={cn(
              'inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[10px] font-bold text-white shrink-0',
              puppy.gender === 'Male' ? 'bg-blue-500' : 'bg-pink-500',
            )}
          >
            {puppy.gender === 'Male' ? '♂' : '♀'}
          </span>
          <span>{puppy.gender}</span>
          <span className="text-slate-300">·</span>
          <span className="flex items-center gap-1 shrink-0">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {puppy.age}
          </span>
        </span>
      </div>
      <p className="mt-1 sm:mt-1 flex items-center gap-1 text-sm text-slate-500 truncate">
        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        <span className="truncate">{puppy.location}, {puppy.state}</span>
      </p>

      <div className="mt-2 sm:mt-2.5 pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 sm:gap-2">
        <div className="min-w-0">
          <span className="text-xs sm:text-xs text-slate-400 block leading-none">Price</span>
          <p className="text-lg sm:text-lg font-extrabold text-slate-900 leading-tight">
            ${puppy.price.toLocaleString()}
          </p>
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-4 py-2 sm:py-2 rounded-lg bg-emerald-600 text-white text-sm sm:text-sm font-semibold hover:bg-emerald-700 transition-colors shrink-0"
        >
          <MessageCircle className="w-4 h-4 sm:w-4 sm:h-4" />
          Chat
        </a>
      </div>
    </div>
  );

  if (view === 'list') {
    return (
      <div
        className="flex bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden cursor-pointer"
        style={animStyle}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('a, button')) return;
          window.location.hash = `#/puppies/${puppy.id}`;
        }}
      >
        <a href={puppyDetailLink(puppy.id)} className="w-48 sm:w-64 shrink-0 aspect-[4/3] block" aria-label={`View ${puppy.name}'s details`}>
          {imageEl}
        </a>
        <div className="flex-1">{contentEl}</div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden cursor-pointer w-full max-w-sm sm:w-full"
      style={animStyle}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button')) return;
        window.location.hash = `#/puppies/${puppy.id}`;
      }}
    >
      <a href={puppyDetailLink(puppy.id)} className="aspect-[4/3] w-full block" aria-label={`View ${puppy.name}'s details`}>
        {imageEl}
      </a>
      {contentEl}
    </div>
  );
}
