import { useState, useEffect, useCallback } from 'react';

export interface RouteState {
  path: string;
  params: Record<string, string>;
}

const INFO_PAGES = new Set([
  'health-guarantee',
  'delivery-info',
  'become-a-breeder',
  'breeder-guidelines',
  'verification-process',
  'puppy-guide',
  'puppy-care-tips',
  'faq',
  'contact',
  'privacy-policy',
]);

function parseHash(): RouteState {
  const hash = window.location.hash.replace(/^#/, '');
  const parts = hash.split('/').filter(Boolean);
  if (parts.length >= 2 && parts[0] === 'puppies') {
    return { path: 'puppy-detail', params: { id: parts[1] } };
  }
  if (parts.length >= 1 && parts[0] === 'page' && parts[1] && INFO_PAGES.has(parts[1])) {
    return { path: 'info-page', params: { slug: parts[1] } };
  }
  return { path: 'home', params: {} };
}

export function useHashRoute() {
  const [route, setRoute] = useState<RouteState>(() => parseHash());

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
  }, []);

  return { route, navigate };
}

export const puppyDetailLink = (id: number) => `#/puppies/${id}`;
export const homeLink = () => '#';
export const pageLink = (slug: string) => `#/page/${slug}`;
