import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FloatingChat = () => {
  const handleChatClick = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <Button
      onClick={handleChatClick}
      size="lg"
      className="fixed bottom-5 right-5 bg-stellar-green hover:bg-stellar-green/90 w-14 h-14 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 z-50 p-0"
    >
      <MessageCircle className="w-8 h-8" />
    </Button>
  );
};