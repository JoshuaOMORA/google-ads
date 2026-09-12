import { PRICE_MIN, PRICE_MAX } from '@/data/puppies';

export interface FilterState {
  gender: 'All' | 'Male' | 'Female';
  breeds: string[];
  priceMin: number;
  priceMax: number;
  ages: string[];
  sizes: string[];
  availableOnly: boolean;
  sortBy: string;
  searchQuery: string;
}

export const AGE_RANGES = [
  { key: '0-8', label: 'Under 8 weeks', min: 0, max: 8 },
  { key: '9-12', label: '9-12 weeks', min: 9, max: 12 },
  { key: '13+', label: 'Over 12 weeks', min: 13, max: 999 },
];

export const defaultFilters: FilterState = {
  gender: 'All',
  breeds: [],
  priceMin: PRICE_MIN,
  priceMax: PRICE_MAX,
  ages: [],
  sizes: [],
  availableOnly: false,
  sortBy: 'recommended',
  searchQuery: '',
};
