import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Chatbox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey there! Enter book to continue" },
  ]);
  const [input, setInput] = useState("");
  const [showDateButtons, setShowDateButtons] = useState(false);
  const [showTimeButtons, setShowTimeButtons] = useState(false);
  const [showConfirmationButtons, setShowConfirmationButtons] = useState(false);
  const [showEventButtons, setShowEventButtons] = useState(false); // Add state for event buttons
  const [conversationStep, setConversationStep] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [selectedEvents, setSelectedEvents] = useState([]); // Track selected events

  const sendMessage = async (message) => {
    const userMessage = { sender: "user", text: message || input };
    setMessages([...messages, userMessage]);
    setInput("");

    let botResponse = "";

    switch (conversationStep) {
      case 0:
        if (message || input.toLowerCase().includes("book")) {
          botResponse = "On what date would you like to visit the museum?";
          setShowDateButtons(true);
          setShowTimeButtons(false);
          setShowConfirmationButtons(false);
          setShowEventButtons(false); // Hide event buttons
          setConversationStep(1);
        } else {
          botResponse =
            "Sorry, I didn't understand that. Could you please clarify?";
        }
        break;

      case 1:
        if (message || input.match(/\d{4}-\d{2}-\d{2}/)) {
          botResponse = "Here are the available events on your selected date:";
          setShowDateButtons(false);
          setShowEventButtons(true); // Show event buttons
          setShowTimeButtons(false);
          setShowConfirmationButtons(false);
          setConversationStep(2); // Move to event selection step
        } else {
          botResponse = "Please select a valid date.";
        }
        break;

      case 2: // Event selection step
        botResponse = "Now, please select a time slot:";
        setShowEventButtons(false); // Hide event buttons
        setShowTimeButtons(true); // Show time options
        setConversationStep(3); // Move to time slot selection step
        break;

      case 3:
        if (
          message ||
          input.toLowerCase().includes("am") ||
          input.toLowerCase().includes("pm")
        ) {
          botResponse = "How many people? Adults and children?";
          setShowTimeButtons(false);
          setConversationStep(4); // Move to people count step
        } else {
          botResponse = "Please select a valid time slot.";
        }
        break;

      case 4:
        if (adults >= 0 && children >= 0) {
          botResponse =
            `You selected ${adults} adult(s) and ${children} child(ren). ` +
            "Would you like to confirm your booking for these events? (yes/no)";
          setShowConfirmationButtons(true);
          setConversationStep(5); // Move to yes/no confirmation step
        } else {
          botResponse = "Please select the number of adults and children.";
        }
        break;

      case 5:
        if (
          message ||
          input.toLowerCase() === "yes" ||
          input.toLowerCase() === "no"
        ) {
          botResponse = "Please proceed to payment to complete your booking.";
          setShowConfirmationButtons(false);
          setConversationStep(0); // Reset the conversation step
        } else {
          botResponse = "Please respond with yes or no.";
        }
        break;

      default:
        botResponse =
          "Sorry, I didn't understand that. Could you please clarify?";
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: botResponse },
    ]);
  };

  const handleEventSelection = (event) => {
    setSelectedEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    );
  };

  const handleSubmit = async () => {
    const bookingData = {
      adults,
      children,
      events: selectedEvents,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/bookings/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );
      const data = await response.json();
      console.log("Booking created:", data);

      sendMessage(
        `Booking for ${adults} adults and ${children} children with events: ${selectedEvents.join(
          ", "
        )}.`
      );
    } catch (error) {
      console.error("Error creating booking:", error);
    }
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
        {/* Buttons for Event Selection */}
        {showEventButtons && (
          <div className="flex flex-col gap-2 mt-2">
            <Button
              onClick={() => handleEventSelection("Art Exhibition")}
              className={`${
                selectedEvents.includes("Art Exhibition")
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              Art Exhibition
            </Button>
            <Button
              onClick={() => handleEventSelection("Workshops")}
              className={`${
                selectedEvents.includes("Workshops")
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              Workshops
            </Button>
            <Button
              onClick={() => handleEventSelection("Guided Tours")}
              className={`${
                selectedEvents.includes("Guided Tours")
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              Guided Tours
            </Button>

            {/* Submit Button for Selected Events */}
            <Button
              onClick={() =>
                sendMessage(`You selected: ${selectedEvents.join(", ")}`)
              }
              className="mt-4"
            >
              Submit
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
        {/* Dropdown for People Count Selection */}
        {conversationStep === 4 && (
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2">
              <label>Adults: </label>
              <Select
                value={adults}
                onValueChange={(value) => setAdults(Number(value))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select Adults" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(11).keys()].map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <label>Children: </label>
              <Select
                value={children}
                onValueChange={(value) => setChildren(Number(value))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select Children" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(11).keys()].map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button for People Count */}
            <Button
              className="mt-4"
              onClick={() =>
                sendMessage(
                  `You selected ${adults} adult(s) and ${children} child(ren).`
                )
              }
            >
              Submit
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
