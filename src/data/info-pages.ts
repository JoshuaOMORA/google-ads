import { whatsappLink, WHATSAPP_MESSAGES } from '@/data/puppies';
import { BUSINESS_EMAIL } from '@/config';

export interface InfoSection {
  heading?: string;
  body?: string;
  list?: string[];
  cta?: {
    label: string;
    href: string;
    external?: boolean;
  };
}

export interface InfoPageData {
  slug: string;
  title: string;
  intro: string;
  sections: InfoSection[];
  faq?: { q: string; a: string }[];
}

const wa = (msg: string) => whatsappLink(msg);

export const INFO_PAGES: Record<string, InfoPageData> = {
  'health-guarantee': {
    slug: 'health-guarantee',
    title: 'Health Guarantee',
    intro:
      "Puppy health and responsible care matter to us. Every puppy listed on Cloverwood Pups comes with a health guarantee and up-to-date vaccination records, and we encourage families to review all available health information before completing a purchase.",
    sections: [
      {
        heading: 'What to Expect',
        body: "All puppies come with comprehensive health guarantees and up-to-date vaccination records. We encourage you to review the available health information for any puppy you're considering and to ask questions before making a decision.",
      },
      {
        heading: 'Before You Bring Your Puppy Home',
        body: "Take time to review the puppy's details, ask any final questions about their health records, and confirm the arrangements. We're happy to help you understand what information is available.",
      },
      {
        heading: 'Have Questions About a Puppy\'s Health Information?',
        cta: {
          label: 'Chat with us on WhatsApp',
          href: wa(WHATSAPP_MESSAGES.general),
          external: true,
        },
      },
    ],
  },

  'delivery-info': {
    slug: 'delivery-info',
    title: 'Delivery & Pickup',
    intro:
      "We'll discuss the best delivery or pickup option based on your puppy and location. Delivery arrangements can vary depending on the puppy, breeder, destination, and circumstances.",
    sections: [
      {
        heading: 'Delivery Options',
        body: "Delivery arrangements can vary depending on the puppy, breeder, destination, and circumstances. We'll talk through what's available and help you understand the options for your specific situation.",
      },
      {
        heading: 'Pickup',
        body: 'Pickup may be an option where applicable. Details can be discussed directly so you know what to expect and how to plan.',
      },
      {
        heading: 'Texas & Nearby States',
        body: "Cloverwood Pups is Texas-based, with delivery options extending into Texas and nearby states. If you're outside Texas, we're still happy to discuss what may be available near you.",
      },
      {
        heading: 'Looking for a Puppy Near You?',
        body: "If you don't see the right puppy in the current online listings, reach out to us. Additional puppies may be available nearby, and we'd be happy to help you look.",
        cta: {
          label: 'Ask About Delivery',
          href: wa('Hi, I\'d like to learn more about delivery or pickup options for a puppy. Can you help?'),
          external: true,
        },
      },
    ],
  },

  'become-a-breeder': {
    slug: 'become-a-breeder',
    title: 'Become a Breeder',
    intro:
      "Interested in working with Cloverwood Pups? We'd be happy to learn more about you, your puppies, and how you care for them.",
    sections: [
      {
        heading: 'Tell Us About Yourself',
        body: 'Share some general information about your experience with dogs and breeding. We like to understand who we may be working with and how you approach puppy care.',
      },
      {
        heading: 'Tell Us About Your Puppies',
        body: 'Let us know about available puppies, breeds, ages, locations, and any health records you can provide. Accurate, honest information helps us feature your puppies responsibly.',
      },
      {
        heading: "Let's Talk",
        body: "Interested breeders can reach out directly to discuss next steps. There's no online registration or account system — we simply start with a conversation.",
        cta: {
          label: 'Chat with us on WhatsApp',
          href: wa('Hi, I\'m a breeder interested in working with Cloverwood Pups. I\'d like to learn more about the process.'),
          external: true,
        },
      },
    ],
  },

  'breeder-guidelines': {
    slug: 'breeder-guidelines',
    title: 'Breeder Guidelines',
    intro:
      'The following standards help keep Cloverwood Pups listings honest, clear, and helpful for families looking for a puppy.',
    sections: [
      {
        heading: 'Accurate Listings',
        list: [
          'Provide accurate puppy information.',
          'Use honest descriptions and current photos.',
          'Keep availability information up to date.',
        ],
      },
      {
        heading: 'Puppy Welfare',
        list: [
          'Prioritize the health, safety, and wellbeing of puppies.',
          'Provide appropriate care and socialization.',
        ],
      },
      {
        heading: 'Health Information',
        list: [
          'Provide available health and veterinary records honestly.',
          'Do not make unsupported health claims.',
        ],
      },
      {
        heading: 'Clear Communication',
        list: [
          'Respond honestly to questions.',
          'Clearly communicate pickup and delivery arrangements and expectations.',
        ],
      },
      {
        heading: 'Responsible Practices',
        list: [
          'Promote responsible breeding and appropriate puppy placement.',
        ],
      },
    ],
  },

  'verification-process': {
    slug: 'verification-process',
    title: 'Our Verification Process',
    intro:
      'Cloverwood Pups reviews breeder and puppy information before featuring listings and aims to maintain reliable, transparent listings.',
    sections: [
      {
        heading: '1. Initial Review',
        body: 'We start by reviewing basic breeder and listing information to understand who we may be working with.',
      },
      {
        heading: '2. Puppy Information',
        body: 'We review available details about the puppy, including age, breed, location, and health information where provided.',
      },
      {
        heading: '3. Listing Review',
        body: 'We make sure the information presented to potential families is clear and accurate before it appears on the site.',
      },
      {
        heading: '4. Ongoing Communication',
        body: 'We maintain communication when clarification or updated information is needed, so listings stay as helpful as possible.',
      },
    ],
  },

  'puppy-guide': {
    slug: 'puppy-guide',
    title: 'Puppy Guide',
    intro:
      "A little preparation goes a long way. Here are some things to think about as you get ready to choose and bring home a puppy.",
    sections: [
      {
        heading: 'Before You Choose',
        body: 'Consider your lifestyle, home environment, activity level, and the time you have available. Different breeds have different needs, so it helps to think about what kind of companion will fit well with your everyday life.',
      },
      {
        heading: 'Questions to Ask',
        list: [
          'Puppy age',
          'Breed',
          'Health information',
          'Veterinary records',
          'Temperament',
          'Feeding',
          'Current location',
          'Pickup and delivery options',
        ],
      },
      {
        heading: 'Preparing Your Home',
        list: [
          'A safe sleeping area',
          'Food and water supplies',
          'Puppy-proofing',
          'Basic training supplies',
          'A quiet, safe space for the puppy to settle in',
        ],
      },
      {
        heading: 'Before Bringing Your Puppy Home',
        body: "Review the puppy's details, ask any final questions, and confirm the arrangements. We're happy to help you feel confident before the big day.",
        cta: {
          label: 'Chat with us on WhatsApp',
          href: wa(WHATSAPP_MESSAGES.general),
          external: true,
        },
      },
    ],
  },

  'puppy-care-tips': {
    slug: 'puppy-care-tips',
    title: 'Puppy Care Tips',
    intro:
      'These are general tips to help you and your new puppy get off to a good start. For health-specific questions, always follow the advice of your veterinarian.',
    sections: [
      {
        heading: 'First Few Days',
        body: 'Give your puppy time to settle into their new environment. Keep things calm, offer a safe space, and let them explore at their own pace.',
      },
      {
        heading: 'Feeding',
        body: 'Follow age-appropriate feeding guidance and any recommendations provided by your puppy\'s veterinarian or breeder. Consistent mealtimes help build a routine.',
      },
      {
        heading: 'Sleep',
        body: 'Young puppies need plenty of rest. A quiet, comfortable sleeping area helps them recharge between play and training.',
      },
      {
        heading: 'Exercise & Play',
        body: 'Keep activity appropriate for your puppy\'s age and breed. Short, gentle play sessions are better than long, strenuous ones for very young puppies.',
      },
      {
        heading: 'Training',
        body: 'Consistent, positive early training builds good habits. Keep sessions short and rewarding.',
      },
      {
        heading: 'Socialization',
        body: 'Safe, appropriate exposure to people, environments, and experiences helps puppies grow into confident adults.',
      },
      {
        heading: 'Veterinary Care',
        body: 'Routine veterinary care is important. Follow professional veterinary advice for vaccinations, checkups, and any health concerns.',
      },
      {
        heading: 'Puppy-Proofing',
        body: 'Keep potentially dangerous household items — cleaners, medications, small objects, electrical cords — out of reach.',
      },
    ],
  },

  'faq': {
    slug: 'faq',
    title: 'Frequently Asked Questions',
    intro:
      "Here are some common questions we hear. If you don't see yours here, we're happy to help — just reach out.",
    sections: [],
    faq: [
      {
        q: 'How do I choose a puppy?',
        a: "Browse the puppies currently listed online and use the filters to narrow things down by breed, location, age, and other preferences. If you're not sure, reach out to us and we'll help you think it through.",
      },
      {
        q: 'Are the puppies shown online all of the puppies you have available?',
        a: "The puppies shown on the website are selected online listings. More puppies may be available near you — if you don't see quite the right match, reach out and we'll be happy to help you look.",
      },
      {
        q: "What if I don't see the breed or puppy I'm looking for?",
        a: "Reach out to us. Additional puppies may be available nearby that aren't currently shown in the online listings, and we'd be happy to help you find the right match.",
      },
      {
        q: 'Where are your puppies located?',
        a: "Our puppies come from trusted breeder connections in Texas and nearby states. Each listing shows the puppy's current location.",
      },
      {
        q: 'Do you offer delivery?',
        a: "Delivery options may be available across Texas and nearby states. Arrangements can vary depending on the puppy, breeder, destination, and circumstances. We'll discuss what's possible for your situation.",
      },
      {
        q: 'Can I arrange pickup?',
        a: 'Pickup may be an option where applicable. Details can be discussed directly so you know what to expect.',
      },
      {
        q: 'Can I ask questions before deciding?',
        a: "Absolutely. We encourage you to ask questions before making a decision. Chat with us on WhatsApp and a real person will be happy to help.",
      },
      {
        q: 'What health information is available?',
        a: "All puppies come with comprehensive health guarantees and up-to-date vaccination records. We encourage you to review the available health information for any puppy you're considering.",
      },
      {
        q: 'How do I contact Cloverwood Pups?',
        a: `You can chat with us on WhatsApp, or email us at ${BUSINESS_EMAIL}. We're happy to help with any questions about puppies, listings, delivery, or finding something nearby.`,
      },
      {
        q: 'Can I speak with someone directly?',
        a: "Yes. Chat with us on WhatsApp and you'll be talking with a real person, not an automated system.",
      },
    ],
  },

  'contact': {
    slug: 'contact',
    title: 'Contact Cloverwood Pups',
    intro:
      "Have a question about a puppy, a current listing, delivery, or finding something nearby? Reach out to us and we'll be happy to help.",
    sections: [
      {
        heading: 'WhatsApp',
        body: 'The fastest way to reach us is through WhatsApp. Chat with a real person and get help finding the right puppy or answering any questions.',
        cta: {
          label: 'Chat with us on WhatsApp',
          href: wa(WHATSAPP_MESSAGES.general),
          external: true,
        },
      },
      {
        heading: 'Email',
        body: `You can also email us at ${BUSINESS_EMAIL}. We'll get back to you as soon as we can.`,
      },
    ],
  },

  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    intro:
      'This policy explains generally how Cloverwood Pups handles information in connection with this website.',
    sections: [
      {
        heading: 'Information We May Receive',
        body: 'Information you voluntarily provide through contact or inquiry interactions — such as your name, phone number, or messages — may be received when you reach out to us.',
      },
      {
        heading: 'How Information Is Used',
        body: 'Information may be used to respond to your inquiries, communicate about puppies, and provide the assistance you request.',
      },
      {
        heading: 'WhatsApp Communications',
        body: 'If you choose to contact Cloverwood Pups through WhatsApp, that communication occurs through WhatsApp and is subject to WhatsApp\'s own terms and privacy practices.',
      },
      {
        heading: 'Questions',
        body: `If you have questions about this policy, you can reach us by email at ${BUSINESS_EMAIL} or through WhatsApp.`,
      },
    ],
  },
};
