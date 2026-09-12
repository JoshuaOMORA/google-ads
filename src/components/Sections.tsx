import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search,
  MessageCircle,
  ShieldCheck,
  Truck,
  CircleCheck,
  Lock,
  Headphones,
  HeartPulse,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';
import { whatsappLink, WHATSAPP_MESSAGES, lifestyleCategories, allPuppies } from '@/data/puppies';
import { pageLink } from '@/hooks/useHashRoute';
import { BUSINESS_EMAIL } from '@/config';

/* ===================== STATS BANNER ===================== */
export function StatsBanner() {
  const stats = [
    { value: `${allPuppies.length}`, label: 'Puppies currently listed online', sub: 'More may be available near you' },
    { value: '150+', label: 'Trusted breeder connections in Texas & nearby states' },
    { value: '96%', label: 'Customer satisfaction rate' },
  ];
  return (
    <section className="bg-emerald-800 py-12 md:py-14 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl md:text-5xl font-extrabold text-white">
              {s.value}
            </p>
            <p className="mt-2 text-xs md:text-base text-emerald-100">
              {s.label}
            </p>
            {s.sub && (
              <p className="mt-1 text-[11px] md:text-xs text-emerald-300/70">
                {s.sub}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===================== HOW IT WORKS ===================== */
export function HowItWorks() {
  const steps = [
    { num: '01', title: 'Browse & Filter', desc: 'Explore the puppies currently listed online and narrow things down by breed, location, and other preferences.', icon: Search },
    { num: '02', title: 'Chat on WhatsApp', desc: 'Ask questions, tell us what you\'re looking for, and get help from a real person.', icon: MessageCircle },
    { num: '03', title: 'Choose Your Puppy', desc: 'Review the details, ask any final questions, and decide when you\'re ready.', icon: ShieldCheck },
    { num: '04', title: 'Bring Them Home', desc: 'We\'ll discuss delivery or pickup options and the next steps for bringing your puppy home.', icon: Truck },
  ];
  return (
    <section id="how-it-works" className="py-16 md:py-20 px-4 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900">
            How It Works
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            Four simple steps to finding your perfect puppy
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
          {steps.map((s) => (
            <div
              key={s.num}
              className="relative bg-emerald-50 rounded-2xl p-5 md:p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <span className="text-xs font-bold text-emerald-600">{s.num}</span>
              <h3 className="mt-1 text-base md:text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== WHY US ===================== */
export function WhyUs() {
  const cards = [
    { title: 'Vetted Breeder Network', desc: 'Every breeder is vetted with background checks, facility inspections, and health certifications.', icon: ShieldCheck },
    { title: 'Health Guarantee Included', desc: 'All puppies come with comprehensive health guarantees and up-to-date vaccination records.', icon: HeartPulse },
    { title: '1-on-1 Human Support', desc: 'Real humans guide you through every step, from browsing to bringing your puppy home.', icon: Headphones },
    { title: 'Clear & Secure Payments', desc: 'Escrow-protected payments ensure your money is safe until your puppy is in your arms.', icon: Lock },
  ];
  return (
    <section id="why-us" className="bg-slate-50 py-16 md:py-20 px-4 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900">
            Why Choose Us
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            Built to feel premium, trusted, and easy
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-white rounded-2xl p-5 md:p-6 flex gap-4 border border-slate-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <c.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-slate-900">{c.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== TESTIMONIALS ===================== */
const TESTIMONIALS = [
  {
    name: 'Emily R.',
    date: 'February 14, 2026',
    avatar: '/images/testimonials/testimonial-female-3.jpg',
    text: "We fell in love with Buddy the moment we saw his profile. He was just as sweet and playful when we met him, and the Cloverwood Pups team made the whole process surprisingly easy. They kept us updated throughout and answered all of our questions.",
    rating: 5,
  },
  {
    name: 'Michael T.',
    date: 'April 7, 2026',
    avatar: '/images/testimonials/testimonial-male-1.jpg',
    text: "I was hesitant about finding a puppy online, but the 1-on-1 WhatsApp support changed everything. Our advisor matched us with a Luna, a beautiful Golden Retriever, and walked us through every step. She arrived happy, healthy, and already part of the family.",
    rating: 5,
  },
  {
    name: 'Sarah K.',
    date: 'May 24, 2026',
    avatar: '/images/testimonials/testimonial-female-2.jpg',
    text: "The team really listened to what we wanted — a calm, apartment-friendly companion. They recommended a French Bulldog named Coco, and it was the perfect fit. The entire experience felt personal, not transactional at all.",
    rating: 5,
  },
  {
    name: 'James L.',
    date: 'July 3, 2026',
    avatar: '/images/testimonials/testimonial-male-2.jpg',
    text: "From the first WhatsApp message to the day our Dalmatian arrived, everything was seamless. The advisors were responsive, honest, and genuinely cared about matching us with the right puppy. I'd recommend Cloverwood Pups to anyone.",
    rating: 5,
  },
  {
    name: 'Jessica P.',
    date: 'August 29, 2026',
    avatar: '/images/testimonials/testimonial-female-1.jpg',
    text: "Our Cavalier King Charles Spaniel has been the light of our home. The team helped us understand the breed's temperament and what to expect. The delivery was smooth and the follow-up support was excellent.",
    rating: 5,
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  const next = useCallback(() => setIdx((i) => (i + 1) % count), [count]);
  const prev = () => setIdx((i) => (i - 1 + count) % count);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section id="reviews" className="bg-emerald-50 py-16 md:py-20 px-4 scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900">
            What Families Say
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            Real stories from happy puppy parents
          </p>
        </div>
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-emerald-100">
            <Quote className="w-8 h-8 text-emerald-200 mb-4" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: TESTIMONIALS[idx].rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed">
              "{TESTIMONIALS[idx].text}"
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img
                src={TESTIMONIALS[idx].avatar}
                alt={TESTIMONIALS[idx].name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover object-center shrink-0"
              />
              <div>
                <p className="font-bold text-slate-900 text-sm md:text-base">
                  {TESTIMONIALS[idx].name}
                </p>
                <p className="text-xs md:text-sm text-slate-500">
                  Verified Cloverwood Pups Family · {TESTIMONIALS[idx].date}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-50"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-50"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === idx ? 'bg-emerald-600' : 'bg-emerald-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== LIFESTYLE ===================== */
interface LifestyleProps {
  onCategorySelect: (breeds: string[]) => void;
}

export function Lifestyle({ onCategorySelect }: LifestyleProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  const handleClick = (breeds: string[]) => {
    onCategorySelect(breeds);
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900">
            Find by Lifestyle
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            Discover breeds that match your way of living
          </p>
        </div>
        <div className="relative">
          {canLeft && (
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-600 hover:bg-slate-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canRight && (
            <button
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-600 hover:bg-slate-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scroll-smooth snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {lifestyleCategories.map((cat) => {
              const samplePuppy = allPuppies.find((p) =>
                cat.breeds.includes(p.breed),
              );
              return (
                <button
                  key={cat.key}
                  onClick={() => handleClick(cat.breeds)}
                  className="snap-center shrink-0 w-36 md:w-44 flex flex-col items-center text-center group"
                >
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-emerald-100 group-hover:border-emerald-300 transition-colors">
                    {samplePuppy && (
                      <img
                        src={samplePuppy.image}
                        alt={cat.label}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <h3 className="mt-4 text-sm md:text-base font-bold text-slate-900">
                    {cat.label}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500">{cat.sub}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== QUIZ CTA ===================== */
export function QuizCTA() {
  return (
    <section className="py-14 md:py-16 px-4 bg-emerald-50">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Expert Advice
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900">
          Not sure which breed is right for you?
        </h2>
        <p className="mt-4 text-sm md:text-lg text-slate-600">
          Tell us a little about your lifestyle, home, and what you're looking
          for. We'll help you narrow down the breeds that may be a good fit.
        </p>
        <a
          href={whatsappLink(WHATSAPP_MESSAGES.quiz)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 md:mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          Take the Quiz
        </a>
      </div>
    </section>
  );
}

/* ===================== COVERAGE ACROSS AMERICA ===================== */
const REAL_STATES = [
  'Texas', 'Oklahoma', 'Arkansas', 'Louisiana', 'New Mexico',
  'Kansas', 'Colorado', 'Tennessee', 'Florida', 'California',
];

const COVERAGE_STATES = [
  'Mississippi', 'Alabama', 'Missouri', 'Kentucky', 'Illinois',
  'Indiana', 'Ohio', 'Michigan', 'Pennsylvania', 'North Carolina',
];

const REAL_STATE_SET = new Set(REAL_STATES);

const seededShuffleStates = <T,>(arr: T[], seed: number): T[] => {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const SHUFFLED_STATES = seededShuffleStates(
  [...REAL_STATES, ...COVERAGE_STATES],
  20260831,
);

interface LocationGridProps {
  onSelectState: (state: string) => void;
}

export function LocationGrid({ onSelectState }: LocationGridProps) {
  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900">
            Where We Help Families Find Their Pup
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            Browse current online listings by state, or reach out if you don't see your area.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {SHUFFLED_STATES.map((s) => (
            <button
              key={s}
              onClick={() => onSelectState(s)}
              className="flex items-center gap-2 px-3 md:px-4 py-3 rounded-xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-colors group text-left"
            >
              <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">
                {s}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export { REAL_STATE_SET };

/* ===================== FOOTER ===================== */
export function Footer() {
  const cols = [
    {
      title: 'For Buyers',
      links: [
        { label: 'Browse Puppies', href: '#available-puppies' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Health Guarantee', href: pageLink('health-guarantee') },
        { label: 'Delivery Info', href: pageLink('delivery-info') },
      ],
    },
    {
      title: 'For Breeders',
      links: [
        { label: 'Become a Breeder', href: pageLink('become-a-breeder') },
        { label: 'Breeder Guidelines', href: pageLink('breeder-guidelines') },
        { label: 'Verification Process', href: pageLink('verification-process') },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Puppy Guide', href: pageLink('puppy-guide') },
        { label: 'Puppy Care Tips', href: pageLink('puppy-care-tips') },
        { label: 'FAQ', href: pageLink('faq') },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', href: pageLink('contact') },
        { label: 'WhatsApp Support', href: whatsappLink(WHATSAPP_MESSAGES.general), external: true },
        { label: 'Privacy Policy', href: pageLink('privacy-policy') },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 text-white pt-14 md:pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/images/cloverwood-pups-logo.png"
                alt="Cloverwood Pups"
                className="h-10 w-10 object-contain shrink-0"
              />
              <span className="text-base md:text-lg font-extrabold">Cloverwood Pups</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs">
              Healthy Pups, Happy Homes — connecting families with healthy,
              well-cared-for puppies.
            </p>
            <div className="flex gap-3 mt-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <span
                  key={i}
                  aria-label="Social media coming soon"
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-500"
                >
                  <Icon className="w-4 h-4" />
                </span>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-bold mb-4">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => {
                  const isExternal = 'external' in l && l.external;
                  return (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...(isExternal
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 md:mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © 2024 Cloverwood Pups. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-slate-500">
            <span className="text-xs">We accept</span>
            <div className="flex gap-1.5">
              {['VISA', 'MC', 'AMEX', 'PP'].map((p) => (
                <span
                  key={p}
                  className="px-2 py-1 rounded bg-slate-800 text-[10px] font-bold text-slate-300"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-400 flex items-center gap-1.5">
            Made with <span className="text-red-500">♥</span> for puppies everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
