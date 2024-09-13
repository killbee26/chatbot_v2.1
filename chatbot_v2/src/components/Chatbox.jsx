import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Chatbox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [showDateButtons, setShowDateButtons] = useState(false);
  const [showTimeButtons, setShowTimeButtons] = useState(false);
  const [showConfirmationButtons, setShowConfirmationButtons] = useState(false);

  const sendMessage = async (message) => {
    const userMessage = { sender: "user", text: message || input };
    setMessages([...messages, userMessage]);
    setInput("");

    // Logic for handling conversation flow
    let botResponse = "";

    if (message || input.toLowerCase().includes("book")) {
      botResponse = "On what date would you like to visit the museum?";
      setShowDateButtons(true); // Show date options
    } else if (message || input.match(/\d{4}-\d{2}-\d{2}/)) {
      botResponse =
        "Here are the available slots: 10 AM - 12 PM, 1 PM - 3 PM, 4 PM - 6 PM.";
      setShowTimeButtons(true); // Show time options
    } else if (
      message ||
      input.toLowerCase().includes("am") ||
      input.toLowerCase().includes("pm")
    ) {
      botResponse = "How many people? Adults and children?";
      setShowConfirmationButtons(true); // Show yes/no for events
    } else if (message || input.match(/\d+/)) {
      botResponse =
        "There is an art exhibition on your selected date. Would you like to book for that as well? (yes/no)";
    } else if (
      message ||
      input.toLowerCase() === "yes" ||
      input.toLowerCase() === "no"
    ) {
      botResponse = "Please proceed to payment to complete your booking.";
    } else {
      botResponse =
        "Sorry, I didn't understand that. Could you please clarify?";
    }

    // Update messages with bot response
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: botResponse },
    ]);

    // Reset button visibility
    setShowDateButtons(false);
    setShowTimeButtons(false);
    setShowConfirmationButtons(false);
  };

  return (
    <div className="fixed bottom-5 right-5 w-full h-auto max-w-md bg-background rounded-lg shadow-lg overflow-hidden">
      <div className="flex-1 overflow-auto p-4 h-[550px]">
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : ""
              } items-start gap-3`}
            >
              {message.sender === "bot" && (
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarImage src="/bot-avatar.jpg" alt="Bot Avatar" />
                  <AvatarFallback>Bot</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
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
            onClick={() => sendMessage(input)}
            className="absolute w-8 h-8 top-3 right-3"
          >
            <SendIcon className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>

        {/* Buttons for Date Selection */}
        {showDateButtons && (
          <div className="flex gap-2 mt-2">
            <Button onClick={() => sendMessage("Today")}>Today</Button>
            <Button onClick={() => sendMessage("Tomorrow")}>Tomorrow</Button>
            <Button onClick={() => sendMessage("2024-09-15")}>
              2024-09-15
            </Button>
          </div>
        )}

        {/* Buttons for Time Slot Selection */}
        {showTimeButtons && (
          <div className="flex gap-2 mt-2">
            <Button onClick={() => sendMessage("10 AM - 12 PM")}>
              10 AM - 12 PM
            </Button>
            <Button onClick={() => sendMessage("1 PM - 3 PM")}>
              1 PM - 3 PM
            </Button>
            <Button onClick={() => sendMessage("4 PM - 6 PM")}>
              4 PM - 6 PM
            </Button>
          </div>
        )}

        {/* Yes/No Confirmation Buttons */}
        {showConfirmationButtons && (
          <div className="flex gap-2 mt-2">
            <Button onClick={() => sendMessage("Yes")}>Yes</Button>
            <Button onClick={() => sendMessage("No")}>No</Button>
          </div>
        )}
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
