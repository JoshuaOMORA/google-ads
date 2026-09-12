import { Dog, MessageCircle } from 'lucide-react';
import { whatsappLink, WHATSAPP_MESSAGES } from '@/data/puppies';

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 max-w-[calc(100vw-32px)]">
      <a
        href={whatsappLink(WHATSAPP_MESSAGES.custom)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-emerald-300 bg-white text-emerald-700 text-xs sm:text-sm font-semibold shadow-lg hover:scale-[1.02] transition-transform max-w-full"
      >
        <Dog className="w-5 h-5 shrink-0" />
        <span className="leading-tight">Tell us exactly what dog you want</span>
      </a>
      <a
        href={whatsappLink(WHATSAPP_MESSAGES.general)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-semibold shadow-xl hover:bg-emerald-700 hover:scale-[1.02] transition-all max-w-full"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="leading-tight">Chat with us on WhatsApp</span>
      </a>
    </div>
  );
}
