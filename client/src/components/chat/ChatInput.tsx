import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Sparkles } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, isLoading = false, placeholder }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const suggestions = [
    "Analyze Metformin for oncology indications",
    "Find repurposing opportunities for expired patents",
    "Compare aspirin vs ibuprofen for cardiovascular uses",
  ];

  return (
    <div className="border-t border-border bg-background p-4">
      {message.length === 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              onClick={() => setMessage(suggestion)}
              className="text-xs"
              data-testid={`button-suggestion-${suggestion.slice(0, 20)}`}
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {suggestion}
            </Button>
          ))}
        </div>
      )}
      
      <div className="flex items-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0"
          data-testid="button-attach"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Describe the drug or indication you want to analyze..."}
          className="min-h-[44px] max-h-32 resize-none"
          rows={1}
          data-testid="input-chat-message"
        />
        
        <Button
          onClick={handleSubmit}
          disabled={!message.trim() || isLoading}
          className="flex-shrink-0"
          data-testid="button-send-message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
