import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  MessageCircle,
  Truck,
  Heart,
  Check,
  Ruler,
  Weight,
  Dog,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';
import {
  Puppy,
  getPuppyById,
  getRelatedPuppies,
  whatsappLink,
  WHATSAPP_MESSAGES,
} from '@/data/puppies';
import { getGalleryImages } from '@/data/gallery';
import { puppyDetailLink, homeLink } from '@/hooks/useHashRoute';
import { Header } from '@/components/Header';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Sections';
import { cn } from '@/lib/utils';


interface Props {
  puppyId: number;
  onNavigate: (path: string) => void;
}

function SpecCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3">
      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-slate-900 truncate">{value}</p>
      </div>
    </div>
  );
}

function RelatedCard({ puppy }: { puppy: Puppy }) {
  return (
    <a
      href={puppyDetailLink(puppy.id)}
      className="group flex flex-col bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={puppy.image}
          alt={`${puppy.breed} puppy named ${puppy.name}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900">{puppy.name}</h4>
          <div className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-slate-700">{puppy.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-xs text-slate-500">{puppy.breed}</p>
        <p className="text-sm font-extrabold text-emerald-600 mt-1">${puppy.price.toLocaleString()}</p>
      </div>
    </a>
  );
}

function formatHeight(height: string): string {
  if (!height || height === 'N/A' || height === 'null') return 'N/A';
  return `${height} inches`;
}

const BREED_FACTS: Record<string, string> = {
  'Golden Retriever': 'Golden Retrievers were originally bred in Scotland to retrieve waterfowl during hunting — their soft mouths let them carry game gently without damaging it.',
  'Labrador Retriever': 'Labradors have a water-resistant double coat and webbed toes, making them natural swimmers originally bred to help fishermen pull in nets.',
  'French Bulldog': 'French Bulldogs were bred as lacemakers\' companions in England and later became a symbol of Parisian cafe culture.',
  'German Shepherd': 'German Shepherds were developed in 1899 by Max von Stephanitz specifically for herding and guarding, and are still one of the most versatile working breeds worldwide.',
  'Poodle': 'Poodles originally worked as water retrievers in Germany — their famous haircut started as a practical way to keep joints warm in cold water.',
  'Dachshund': 'Dachshunds were bred with their long, low bodies to hunt badgers underground, and their name literally translates to "badger dog" in German.',
  'Beagle': 'Beagles have an exceptionally strong sense of smell and were originally bred to track small game by scent — they can distinguish between nearly 50 different scents simultaneously.',
  'Shih Tzu': 'Shih Tzus were treasured by Chinese emperors and were bred for centuries to sit in the laps of royalty as companion dogs.',
  'Bulldog': 'Bulldogs were originally bred in 13th-century England for bull-baiting, but were selectively transformed into the gentle, mellow companions we know today after the sport was banned.',
  'Siberian Husky': 'Siberian Huskies were bred by the Chukchi people of northeastern Siberia to pull sleds over long distances in harsh Arctic conditions — they can run over 100 miles in a day.',
  'Shiba Inu': 'Shiba Inus are one of the oldest and smallest native breeds of Japan, originally bred for hunting in dense mountain brush.',
  'Cavalier King Charles Spaniel': 'Cavalier King Charles Spaniels were the favorite lap dogs of King Charles II of England, who rarely went anywhere without his small spaniels at his side.',
  'Australian Shepherd': 'Despite their name, Australian Shepherds were actually developed in the western United States — their ancestors traveled from Europe via Australia.',
  'Boxer': 'Boxers were developed in Germany in the late 1800s from the now-extinct Bullenbeisser, a breed used for hunting large game like wild boar and bear.',
  'Maltipoo': 'Maltipoos are a cross between a Maltese and a Poodle, combining the Maltese\'s affectionate nature with the Poodle\'s intelligence and low-shedding coat.',
  'Havanese': 'Havanese are the national dog of Cuba and were bred as companion dogs for the Cuban aristocracy — they are known as "Velcro dogs" for how closely they stick to their owners.',
  'Bichon Frise': 'Bichon Frises were popular with European nobility and later became beloved circus performers thanks to their cheerful disposition and trainability.',
  'Akita': 'Akitas originate from the mountainous northern regions of Japan and were originally bred to hunt bears — they are one of the most loyal and protective breeds in the world.',
  'Staffordshire Bull Terrier': 'Staffordshire Bull Terriers were bred in 19th-century England and are famously gentle with children, earning them the nickname "nanny dog" in their homeland.',
  'Pomeranian': 'Pomeranians descend from large Arctic sled dogs and were bred down in size by Queen Victoria, who fell in love with a small Pomeranian during a trip to Italy.',
  'Yorkshire Terrier': 'Yorkshire Terriers were originally bred in English mills to catch rats — their small size and fearless attitude made them perfect for chasing rodents in tight spaces.',
  'Great Dane': 'Great Danes were originally bred to hunt wild boar in Germany — despite their massive size, they are known as "gentle giants" for their sweet, patient temperament.',
  'Pembroke Welsh Corgi': 'Pembroke Welsh Corgis were bred to herd cattle and sheep in Wales — their low stature let them nip at heels while avoiding kicks from larger animals.',
  'Pomsky': 'Pomskies are a designer cross between a Pomeranian and a Siberian Husky, combining the Husky\'s striking looks with a more compact, apartment-friendly size.',
  'Goldendoodle': 'Goldendoodles are a cross between a Golden Retriever and a Poodle, combining the Golden\'s friendly temperament with the Poodle\'s low-shedding coat.',
  'Bernedoodle': 'Bernedoodles are a cross between a Bernese Mountain Dog and a Poodle, blending the Bernese\'s loyal, calm nature with the Poodle\'s intelligence and low-shedding coat.',
  'Cavapoo': 'Cavapoos are a cross between a Cavalier King Charles Spaniel and a Poodle, known for their affectionate, people-pleasing personality and soft, wavy coat.',
};

const BREED_BLURBS: Record<string, string[]> = {
  'Golden Retriever': [
    'Goldens are known for their gentle, patient nature — wonderful with kids and quick to bond with the whole family.',
    'This breed thrives on companionship and does best in homes where someone is around often.',
  ],
  'Labrador Retriever': [
    'Labs are one of the most popular family breeds in America thanks to their even temperament and boundless enthusiasm.',
    'Plenty of exercise and a yard to run in will keep this pup happy and well-behaved.',
  ],
  'French Bulldog': [
    'Frenchies are compact, easygoing companions that adapt beautifully to apartment living.',
    'Their charming, low-energy personality makes them a great pick for first-time owners.',
  ],
  'German Shepherd': [
    'German Shepherds are intelligent, loyal, and naturally protective — they excel with active families who enjoy training.',
    'Early socialization and consistent leadership bring out the best in this breed.',
  ],
  'Poodle': [
    'Poodles are highly intelligent and quick to learn, making training sessions a genuine pleasure.',
    'Their low-shedding coat is a bonus for allergy-sensitive households.',
  ],
  'Dachshund': [
    'Dachshunds are clever, spunky little dogs with big personalities packed into a small frame.',
    'They love burrowing under blankets and staying close to their favorite person.',
  ],
  'Beagle': [
    'Beagles are merry, curious hounds that love following their nose and being part of family activities.',
    'A secure yard and daily walks will keep this scent-driven breed content.',
  ],
  'Shih Tzu': [
    'Shih Tzus were bred for companionship — they are happiest sitting in a lap and being adored.',
    'Their calm, affectionate nature makes them ideal for quieter households.',
  ],
  'Bulldog': [
    'Bulldogs are mellow, stocky companions known for their calm demeanor and lovable wrinkled faces.',
    'They are happy with moderate exercise and plenty of nap time.',
  ],
  'Siberian Husky': [
    'Huskies are energetic, free-spirited dogs that need plenty of exercise and mental stimulation.',
    'A home with space to roam and an active routine will suit this breed best.',
  ],
  'Shiba Inu': [
    'Shiba Inus are alert, independent dogs with a fox-like appearance and a spirited personality.',
    'They are clean, quiet, and do best with patient, consistent training.',
  ],
  'Cavalier King Charles Spaniel': [
    'Cavaliers are sweet, gentle lap dogs that form deep bonds with their people.',
    'Their small size and easygoing nature make them wonderful apartment companions.',
  ],
  'Australian Shepherd': [
    'Aussies are brilliant, energetic herders that thrive when given a job to do.',
    'They are a fantastic match for active families who enjoy the outdoors.',
  ],
  'Boxer': [
    'Boxers are playful, loyal, and endlessly energetic — they love being in the middle of family fun.',
    'Regular exercise and clear boundaries keep this breed at its best.',
  ],
  'Maltipoo': [
    'Maltipoos are affectionate, low-shedding companions that adapt well to apartment life.',
    'Their gentle disposition makes them a popular choice for first-time owners.',
  ],
  'Havanese': [
    'Havanese are cheerful, social dogs that love being the center of attention.',
    'They are quick to bond and do not like being left alone for long stretches.',
  ],
  'Bichon Frise': [
    'Bichons are cheerful, hypoallergenic companions with a powder-puff coat and a playful spirit.',
    'They thrive on attention and are well suited to families and seniors alike.',
  ],
  'Akita': [
    'Akitas are dignified, loyal dogs with a strong protective instinct.',
    'They do best with experienced owners who provide consistent, respectful training.',
  ],
  'Staffordshire Bull Terrier': [
    'Staffies are stocky, affectionate dogs known for their love of people and surprising gentleness with children.',
    'They are energetic and do best with daily exercise and plenty of family interaction.',
  ],
  'Pomeranian': [
    'Pomeranians are lively, confident little dogs with a fluffy coat and a big-dog attitude.',
    'They are alert watchdogs and devoted companions in a compact package.',
  ],
};

function buildAboutText(puppy: Puppy, pronoun: string, posPronoun: string): string {
  const traits = puppy.temperament.split(',').map((t) => t.trim()).filter(Boolean);
  const traitList = traits.length > 0
    ? traits.length === 1
      ? traits[0]
      : traits.slice(0, -1).join(', ') + ' and ' + traits[traits.length - 1]
    : '';

  const heightNum = parseFloat(puppy.height);
  const weightNum = parseFloat(puppy.weight);
  const hasHeight = !isNaN(heightNum) && puppy.height !== 'N/A';
  const hasWeight = !isNaN(weightNum) && puppy.weight !== 'N/A';

  const measurementPart = (() => {
    if (hasHeight && hasWeight) {
      return ` At ${heightNum} inches tall and ${weightNum} lbs, ${pronoun} is growing steadily`;
    }
    if (hasHeight) {
      return ` At ${heightNum} inches tall, ${pronoun} is growing steadily`;
    }
    if (hasWeight) {
      return ` At ${weightNum} lbs, ${pronoun} is growing steadily`;
    }
    return '';
  })();

  const baseDesc = puppy.description || `${puppy.name} is a ${puppy.age.toLowerCase()} ${puppy.breed} puppy looking for a loving forever home.`;

  const blurbPool = BREED_BLURBS[puppy.breed];
  const breedBlurb = blurbPool
    ? blurbPool[puppy.id % blurbPool.length]
    : '';

  const sizeNote = (() => {
    switch (puppy.size) {
      case 'Small':
        return ` As a small-sized breed, ${pronoun} will stay compact and manageable even when fully grown.`;
      case 'Medium':
        return ` ${puppy.name} will grow into a medium-sized dog — a great balance of energy and adaptability.`;
      case 'Medium-Large':
        return ` Expect ${puppy.name} to grow into a medium-to-large companion with plenty of energy and presence.`;
      case 'Large':
        return ` As a large breed, ${pronoun} will need space to stretch ${posPronoun} legs and regular exercise.`;
      default:
        return '';
    }
  })();

  const temperamentNote = traitList
    ? ` ${puppy.name}'s temperament leans ${traitList.toLowerCase()}, which shapes how ${pronoun} interacts with people and new situations.`
    : '';

  const closing = ` ${puppy.name} would thrive in a home that matches ${posPronoun} energy and is ready to welcome a new family member.`;

  return [baseDesc, measurementPart, temperamentNote, sizeNote, breedBlurb, closing]
    .filter(Boolean)
    .join('');
}

export function PuppyDetail({ puppyId, onNavigate }: Props) {
  const [imgError, setImgError] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const puppy = getPuppyById(puppyId);

  if (!puppy) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <FloatingWhatsApp />
        <div className="max-w-md mx-auto py-24 text-center px-4">
          <h1 className="text-2xl font-bold text-slate-900">Puppy not found</h1>
          <p className="mt-2 text-slate-500">This listing may no longer be available.</p>
          <a
            href={homeLink()}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Puppies
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  const related = getRelatedPuppies(puppy, 4);
  const temperamentTraits = puppy.temperament.split(',').map((t) => t.trim()).filter(Boolean);
  const pronoun = puppy.gender === 'Male' ? 'he' : 'she';
  const posPronoun = puppy.gender === 'Male' ? 'him' : 'her';
  const aboutText = buildAboutText(puppy, pronoun, posPronoun);

  const galleryImages = useMemo(
    () => getGalleryImages(puppy.name, puppy.image),
    [puppy.name, puppy.image],
  );

  const takeHomeLink = whatsappLink(WHATSAPP_MESSAGES.detailTakeHome(puppy.name, puppy.breed, puppy.gender));
  const advisorLink = whatsappLink(WHATSAPP_MESSAGES.detailAdvisor(puppy.name, puppy.breed));

  const statusBadge = puppy.featured
    ? { text: 'Featured', cls: 'bg-amber-100 text-amber-800' }
    : { text: 'Available', cls: 'bg-emerald-100 text-emerald-700' };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <FloatingWhatsApp />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <a
          href={homeLink()}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('');
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Puppies
        </a>
      </div>

      {/* Top section: image + info */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT: image gallery */}
          <div className="flex flex-col">
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-100 aspect-[4/3] w-full">
              {!imgError ? (
                <img
                  src={galleryImages[activeImgIdx] ?? puppy.image}
                  alt={`${puppy.breed} puppy named ${puppy.name}`}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-300">
                  <span className="text-6xl font-bold">{puppy.name[0]}</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="mt-3 flex gap-2 sm:gap-3">
                {galleryImages.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImgIdx(i)}
                    className={cn(
                      'flex-1 max-w-[120px] aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all',
                      i === activeImgIdx
                        ? 'border-emerald-600 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:border-emerald-400',
                    )}
                    aria-label={`View photo ${i + 1}`}
                    aria-pressed={i === activeImgIdx}
                  >
                    <img
                      src={img}
                      alt={`${puppy.name} photo ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Badges below photo */}
            <div className="mt-4 flex flex-wrap gap-2">
              {puppy.available && (
                <span
                  className={cn(
                    'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold',
                    statusBadge.cls,
                  )}
                >
                  {statusBadge.text}
                </span>
              )}
              {puppy.championBloodline && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-amber-300">
                  <Award className="w-3 h-3" />
                  Champion Bloodline
                </span>
              )}
              {puppy.reserved && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-600">
                  Reserved
                </span>
              )}
            </div>
          </div>

          {/* RIGHT: info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">{puppy.name}</h1>
            <p className="mt-1 text-lg text-slate-500">{puppy.breed}</p>
            <p className="mt-2 text-sm text-slate-500">
              {temperamentTraits.slice(0, 3).join(' · ')}
            </p>

            <div className="mt-4 flex items-center gap-2">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900">{puppy.rating.toFixed(1)}</span>
              <span className="text-sm text-slate-400">({puppy.reviewCount} reviews)</span>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <span className="text-xs text-slate-400">Price</span>
                <p className="text-3xl font-extrabold text-slate-900">${puppy.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="w-4 h-4" />
              {puppy.location}, {puppy.state}
            </div>

            {/* Spec cards */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <SpecCard icon={Dog} label="Gender" value={puppy.gender} />
              <SpecCard icon={Clock} label="Age" value={puppy.age} />
              <SpecCard icon={Ruler} label="Height" value={formatHeight(puppy.height)} />
              <SpecCard icon={Dog} label="Breed" value={puppy.breed} />
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={takeHomeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors"
              >
                <Heart className="w-5 h-5" />
                Take Me Home
              </a>
              <a
                href={takeHomeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Health-checked · Verified breeder · Safe delivery available
            </div>
          </div>
        </div>
      </section>

      {/* About + Facts */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900">About {puppy.name}</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">{aboutText}</p>

            {/* Temperament */}
            <h3 className="mt-8 text-lg font-bold text-slate-900">Personality &amp; Temperament</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {temperamentTraits.map((trait) => (
                <span
                  key={trait}
                  className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Did You Know? */}
          <div className="lg:col-span-1">
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Did You Know?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {BREED_FACTS[puppy.breed] ||
                  `${puppy.breed}s make wonderful companions and are loved by families everywhere.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Nationwide Door-to-Door Delivery</h3>
              <p className="mt-1 text-sm text-slate-600 max-w-lg">
                Connect with us to learn about availability, delivery options, and the next steps for bringing your puppy home.
              </p>
            </div>
          </div>
          <a
            href={advisorLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with Us
          </a>
        </div>
      </section>

      {/* Related puppies */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {related.map((rp) => (
            <RelatedCard key={rp.id} puppy={rp} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
