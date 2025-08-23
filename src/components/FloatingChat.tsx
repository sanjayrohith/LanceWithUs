import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

// --- Custom SVG Icon Components ---
// I've created these based on your images to avoid any import/export issues.

const EmailIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsAppIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.08 17.29a12.44 12.44 0 0 1-1.46.72 1.48 1.48 0 0 1-1.78-.42l-.1-.13a10.45 10.45 0 0 1-1.5-2.3,4.64 4.64 0 0 1-.22-.68 1 1 0 0 1 .43-1l.7-.7a1 1 0 0 0 0-1.41l-2.12-2.12a1 1 0 0 0-1.41 0l-.53.53a1 1 0 0 1-1.09.22,10.32 10.32 0 0 1-4.4-2.78 1 1 0 0 1-.1-1.46l.52-.63a1 1 0 0 0 0-1.41L4.44 3.29a1 1 0 0 0-1.41 0l-.7.7a1 1 0 0 0-.29.77 5.17 5.17 0 0 0 .88 2.89 15.42 15.42 0 0 0 7.18 7.18 5.17 5.17 0 0 0 2.89.88 1 1 0 0 0 .77-.29l.7-.7a1 1 0 0 0 0-1.41z" /></svg>
);

const DiscordIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.32 5.08a10.51 10.51 0 0 0-1.8-1.8A10.51 10.51 0 0 0 16.71 2h-.19a.2.2 0 0 0-.2.15L15.38 4a10.06 10.06 0 0 1-6.76 0L7.68 2.15a.2.2 0 0 0-.2-.15h-.19a10.51 10.51 0 0 0-1.8 1.28 10.51 10.51 0 0 0-1.8 1.8A10.51 10.51 0 0 0 2 6.89v.19a.2.2 0 0 0 .15.2L4 8.22a10.06 10.06 0 0 1 0 6.76L2.15 17a.2.2 0 0 0-.15.2v.19a10.51 10.51 0 0 0 1.28 1.8 10.51 10.51 0 0 0 1.8 1.8 10.51 10.51 0 0 0 1.8 1.28h.19a.2.2 0 0 0 .2-.15L8.22 20a10.06 10.06 0 0 1 6.76 0l1.81 1.81a.2.2 0 0 0 .2.15h.19a10.51 10.51 0 0 0 1.8-1.28 10.51 10.51 0 0 0 1.8-1.8 10.51 10.51 0 0 0 1.28-1.8v-.19a.2.2 0 0 0-.15-.2L20 15.78a10.06 10.06 0 0 1 0-6.76l1.81-1.81a.2.2 0 0 0 .15-.2v-.19a10.51 10.51 0 0 0-1.28-1.8zM8.5 13.5A1.5 1.5 0 0 1 7 12a1.5 1.5 0 0 1 1.5-1.5A1.5 1.5 0 0 1 10 12a1.5 1.5 0 0 1-1.5 1.5zm7 0a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 15.5 12a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 15.5 13.5z" /></svg>
);

export const FloatingChat = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const contactLinks = [
    { icon: <EmailIcon className="w-7 h-7 text-purple-400" />, label: "Email", subtext: "lancewithus@gmail.com", href: "mailto:lancewithus@gmail.com" },
    { icon: <LinkedInIcon className="w-7 h-7 text-blue-500" />, label: "LinkedIn", subtext: "Connect professionally", href: "https://www.linkedin.com/company/108362982/admin/dashboard/" },
    { icon: <WhatsAppIcon className="w-7 h-7 text-green-400" />, label: "WhatsApp", subtext: "Chat with me directly", href: "https://wa.me/8675478573" },
    { icon: <DiscordIcon className="w-7 h-7 text-indigo-400" />, label: "Discord", subtext: "Let's chat in a community", href: "https://discord.com/users/your-user-id" },
  ];

  return (
    <>
      {/* This is a standard button, replacing the custom one to fix the error. */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-all duration-300 z-40"
      >
        <MessageCircle className="w-8 h-8" />
      </button>

      {/* This section renders the popup when isPopupOpen is true */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
          onClick={() => setIsPopupOpen(false)}
        >
          {/* --- GLASSMORPHISM MODAL --- */}
          <div
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4 mx-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold">Questions, feedback, or collaboration?</h2>
              <p className="text-white/70 mt-1">Feel free to reach out!</p>
            </div>
            
            <div className="space-y-3 pt-4">
              {contactLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-white/5 rounded-xl hover:bg-white/20 border border-transparent hover:border-white/20 transition-all duration-200 group">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </div>
                  <div className="ml-4 flex-grow">
                    <p className="font-semibold">{link.label}</p>
                    <p className="text-sm text-white/60 truncate">{link.subtext}</p>
                  </div>
                </a>
              ))}
            </div>

             <button onClick={() => setIsPopupOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};