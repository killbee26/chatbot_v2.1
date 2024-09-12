import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Chatbox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // Send user message to Rasa chatbot
    try {
      const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender: "user", message: input }),
      });

      const botMessages = await response.json();
      botMessages.forEach((message) => {
        setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: message.text }]);
      });
    } catch (error) {
      console.error("Error sending message to Rasa:", error);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-full h-auto max-w-md bg-background rounded-lg shadow-lg overflow-hidden">
      <div className="flex-1 overflow-auto p-4 h-[550px]">
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : ""} items-start gap-3`}>
              {message.sender === "bot" && (
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarImage src="/bot-avatar.jpg" alt="Bot Avatar" />
                  <AvatarFallback>Bot</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                } rounded-lg p-3 max-w-[70%]`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              {message.sender === "user" && (
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarImage src="/user-avatar.jpg" alt="User Avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border p-2">
        <div className="relative">
          <Textarea
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            className="pr-16 min-h-[48px] rounded-2xl resize-none p-3 border border-neutral-400 shadow-sm"
          />
          <Button
            type="button"
            size="icon"
            onClick={sendMessage}
            className="absolute w-8 h-8 top-3 right-3"
          >
            <SendIcon className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
