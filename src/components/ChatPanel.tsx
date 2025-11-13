import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "client" | "agency";
  timestamp: Date;
}

interface ChatPanelProps {
  clientName: string;
}

export const ChatPanel = ({ clientName }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Como posso ajudar?",
      sender: "agency",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      text: "Preciso de informações sobre o projeto X",
      sender: "client",
      timestamp: new Date(Date.now() - 1800000),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "agency",
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="dark h-full flex flex-col bg-card border-l border-border">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Chat com {clientName}</h3>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
        {/* <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button> */}
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "agency" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === "agency"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="bg-background border-border"
          />
          <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
