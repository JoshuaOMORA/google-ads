import rawData from './puppy-info.json';

export const WHATSAPP_NUMBER = '18032905650';
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

export const whatsappLink = (message: string) =>
  `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_MESSAGES = {
  banner:
    'Hi! I saw your website banner and I\'d like help choosing the right puppy.',
  hero:
    'Hi! I\'m ready to find a puppy today. Can you share available puppies and next steps?',
  browse:
    'Hi! I\'m interested in getting a puppy. Can you guide me through available options?',
  custom: 'Hi! I want to tell you exactly the type of dog I want:',
  general:
    'Hi! I\'m browsing your site and would like to chat about available puppies.',
  quiz: 'Hi! I\'d like to take the breed quiz and get personalized recommendations.',
  perPuppy: (name: string, breed: string, gender: 'Male' | 'Female') =>
    `Hi! I'm interested in ${name}, the ${breed}. Is ${gender === 'Male' ? 'he' : 'she'} still available?`,
  detailTakeHome: (name: string, breed: string, gender: 'Male' | 'Female') =>
    `Hi! I'm interested in ${name}, the ${breed}. Is ${gender === 'Male' ? 'he' : 'she'} still available? I'd like to learn more about taking ${gender === 'Male' ? 'him' : 'her'} home.`,
  detailAdvisor: (name: string, breed: string) =>
    `Hi! I'm viewing ${name}, the ${breed}, and I'd like to learn about availability, delivery options, and next steps for bringing this puppy home.`,
  coverageReal: (state: string) =>
    `Hi, I'm looking for a puppy in or near ${state}. I didn't find quite what I was looking for in the online listings and wanted to ask if you have any additional puppies available nearby.`,
  coverageNearby: (state: string) =>
    `Hi, I'm looking for a puppy in or near ${state}. I wanted to ask if you have any puppies available nearby that aren't currently shown in the online listings.`,
  otherPups:
    "Hi, I'm looking for a puppy and I didn't see quite the right match in the current online listings. I wanted to ask if you have any other puppies available near me.",
};

export interface Puppy {
  id: number;
  name: string;
  breed: string;
  gender: 'Male' | 'Female';
  age: string;
  ageWeeks: number;
  price: number;
  location: string;
  state: string;
  size: string;
  color: string;
  available: boolean;
  featured: boolean;
  reserved: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  height: string;
  weight: string;
  temperament: string;
  image: string;
  championBloodline: boolean;
  sortPriority?: number;
}

type RawEntry = {
  id: number;
  name: string;
  breed: string;
  gender: 'Male' | 'Female';
  age: string;
  height?: string | number | null;
  weight?: string | number | null;
  temperament?: string[];
  price: number;
  location: string;
  state: string;
  size: string;
  available: boolean;
  featured: boolean;
  reserved?: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  championBloodline?: boolean;
};

const ageWeeksFromAge = (age: string): number => {
  const m = age.match(/(\d+)\s*week/);
  if (m) return parseInt(m[1], 10);
  const mo = age.match(/(\d+)\s*month/);
  if (mo) return parseInt(mo[1], 10) * 4;
  const y = age.match(/(\d+)\s*year/);
  if (y) return parseInt(y[1], 10) * 52;
  return 8;
};

const mappedPuppies: Puppy[] = (rawData as RawEntry[]).map((r) => ({
  id: r.id,
  name: r.name,
  breed: r.breed,
  gender: r.gender,
  age: r.age,
  ageWeeks: ageWeeksFromAge(r.age),
  price: r.price,
  location: r.location,
  state: r.state,
  size: r.size,
  color: 'Various',
  available: r.available,
  featured: r.featured,
  reserved: r.reserved ?? false,
  rating: r.rating,
  reviewCount: r.reviewCount,
  description: r.description,
  height: r.height != null ? String(r.height) : 'N/A',
  weight: r.weight != null ? String(r.weight) : 'N/A',
  temperament: (r.temperament ?? []).join(', '),
  image: r.image,
  championBloodline: r.championBloodline ?? false,
}));

const PRIORITY_BREEDS = [
  'Beagle',
  'Dachshund',
  'German Shepherd',
  'Poodle',
  'Rottweiler',
  'French Bulldog',
  'Labrador Retriever',
  'Shih Tzu',
  'Golden Retriever',
  'Bulldog',
];

const seededShuffle = <T,>(arr: T[], seed: number): T[] => {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const orderedPuppies = (() => {
  const priority: Puppy[] = [];
  const usedIds = new Set<number>();

  for (const breed of PRIORITY_BREEDS) {
    const match = mappedPuppies.find(
      (p) => p.breed === breed && !usedIds.has(p.id),
    );
    if (match) {
      priority.push(match);
      usedIds.add(match.id);
    }
  }

  const remaining = mappedPuppies.filter((p) => !usedIds.has(p.id));
  const shuffled = seededShuffle(remaining, 20260830);
  return [...priority, ...shuffled];
})();

const swappedPuppies: Puppy[] = (() => {
  const arr = [...orderedPuppies];
  const findIdx = (name: string) => arr.findIndex((p) => p.name === name);

  // Swap 1: Sadie ↔ Theo
  {
    const i = findIdx('Sadie');
    const j = findIdx('Theo');
    if (i !== -1 && j !== -1) [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // Swap 2: Sadie's new position ↔ Harper
  {
    const i = findIdx('Sadie');
    const j = findIdx('Harper');
    if (i !== -1 && j !== -1) [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // Swap 3: Chuck ↔ Rufus
  {
    const i = findIdx('Chuck');
    const j = findIdx('Rufus');
    if (i !== -1 && j !== -1) [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
})();

export const allPuppies: Puppy[] = swappedPuppies.map((p, i) => ({
  ...p,
  sortPriority: i < PRIORITY_BREEDS.length ? i : 99,
}));

export const breeds = Array.from(new Set(allPuppies.map((p) => p.breed))).sort();
export const sizes: string[] = Array.from(
  new Set(allPuppies.map((p) => p.size)),
).sort();

export const breedCounts = breeds.reduce<Record<string, number>>((acc, b) => {
  acc[b] = allPuppies.filter((p) => p.breed === b).length;
  return acc;
}, {});

export const PRICE_MIN = Math.min(...allPuppies.map((p) => p.price));
export const PRICE_MAX = Math.max(...allPuppies.map((p) => p.price));

export const getPuppyById = (id: number): Puppy | undefined =>
  allPuppies.find((p) => p.id === id);

export const getRelatedPuppies = (puppy: Puppy, count = 4): Puppy[] => {
  const sameBreed = allPuppies.filter(
    (p) => p.id !== puppy.id && p.breed === puppy.breed,
  );
  const others = allPuppies.filter(
    (p) => p.id !== puppy.id && p.breed !== puppy.breed,
  );
  return [...sameBreed, ...others].slice(0, count);
};

export const lifestyleCategories = [
  { key: 'Family Friendly', label: 'Family Friendly', sub: 'Great with kids', breeds: ['Labrador Retriever', 'Golden Retriever', 'Cavalier King Charles Spaniel', 'Beagle'] },
  { key: 'Apartment Living', label: 'Apartment Living', sub: 'Compact & calm', breeds: ['French Bulldog', 'Cavalier King Charles Spaniel', 'Maltipoo', 'Havanese'] },
  { key: 'Active Lifestyle', label: 'Active Lifestyle', sub: 'High energy', breeds: ['Siberian Husky', 'Australian Shepherd', 'German Shepherd', 'Boxer'] },
  { key: 'First-Time Owner', label: 'First-Time Owner', sub: 'Easy to train', breeds: ['Labrador Retriever', 'Golden Retriever', 'Maltipoo'] },
  { key: 'Hypoallergenic', label: 'Hypoallergenic', sub: 'Low shedding', breeds: ['Poodle', 'Bichon Frise', 'Maltipoo'] },
  { key: 'Guard Dog', label: 'Guard Dog', sub: 'Protective & loyal', breeds: ['German Shepherd', 'Akita', 'Staffordshire Bull Terrier'] },
];

if (import.meta.env.DEV) {
  const allIds = allPuppies.map((p) => p.id);
  console.assert(
    allPuppies.length === 55,
    `Expected 55 puppies, got ${allPuppies.length}`,
  );
  console.assert(
    allIds.every((id) => id >= 1 && id <= 55),
    'IDs must be 1-55',
  );
  console.assert(
    new Set(allIds).size === 55,
    'Duplicate IDs detected',
  );
  console.assert(
    allPuppies.filter((p) => p.championBloodline).length === 11,
    'Expected 11 champion bloodline puppies',
  );
}
