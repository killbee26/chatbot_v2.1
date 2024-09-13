import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const systemDate = new Date();

const Chatbox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey there! Enter 'book' to continue", showDateButtons: false },
  ]);
  const [input, setInput] = useState("");
  const [conversationStep, setConversationStep] = useState(0); // Track the conversation step
  const [adults, setAdults] = useState(0); // Keep track of adults selected
  const [children, setChildren] = useState(0); // Keep track of children selected
  const [selectedDate, setSelectedDate] = useState(""); // Track selected date
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(""); // Track selected time slot

  const sendMessage = async (message) => {
    const userMessage = { sender: "user", text: message || input };
    setMessages([...messages, userMessage]);
    setInput("");

    let botResponse = {};
    switch (conversationStep) {
      case 0:
        if (message || input.toLowerCase().includes("book")) {
          botResponse = {
            sender: "bot",
            text: "On what date would you like to visit the museum?",
            showDateButtons: true,
          };
          setConversationStep(1);
        } else {
          botResponse = {
            sender: "bot",
            text: "Sorry, I didn't understand that. Could you please clarify?",
          };
        }
        break;

      case 1:
        if (message || input.match(/\d{4}-\d{2}-\d{2}/)) {
          if (message === "Today") {
            setSelectedDate(systemDate);
          } else if (message === "Tomorrow") {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setSelectedDate(tomorrow);
          } else {
            setSelectedDate(message);
          }

          botResponse = {
            sender: "bot",
            text: "Here are the available slots:",
            showTimeButtons: true,
          };
          setConversationStep(2);
        } else {
          botResponse = {
            sender: "bot",
            text: "Please select a valid date.",
          };
        }
        break;

      case 2:
        if (
          message ||
          input.toLowerCase().includes("am") ||
          input.toLowerCase().includes("pm")
        ) {
          setSelectedTimeSlot(message || input);
          botResponse = {
            sender: "bot",
            text: "How many people? Adults and children?",
            showPeopleCount: true,
          };
          setConversationStep(3);
        } else {
          botResponse = {
            sender: "bot",
            text: "Please select a valid time slot.",
          };
        }
        break;

      case 3:
        if (adults > 0 || children >= 0) {
          botResponse = {
            sender: "bot",
            text: `You selected ${adults} adult(s) and ${children} child(ren). Would you like to book for the art exhibition as well?`,
            showConfirmationButtons: true,
          };
          setConversationStep(4);
        } else {
          botResponse = {
            sender: "bot",
            text: "Please select the number of adults and children.",
          };
        }
        break;

      case 4:
        if (message.toLowerCase() === "yes" || message.toLowerCase() === "no") {
          botResponse = {
            sender: "bot",
            text: "Please proceed to payment to complete your booking.",
          };
          setConversationStep(0);
        } else {
          botResponse = {
            sender: "bot",
            text: "Please respond with yes or no.",
          };
        }
        break;

      default:
        botResponse = {
          sender: "bot",
          text: "Sorry, I didn't understand that. Could you please clarify?",
        };
    }

    setMessages((prevMessages) => [...prevMessages, botResponse]);
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

                {/* Conditionally render buttons and inputs */}
                {message.showDateButtons && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button onClick={() => sendMessage("Today")}>Today</Button>
                    <Button onClick={() => sendMessage("Tomorrow")}>
                      Tomorrow
                    </Button>
                    <Button onClick={() => sendMessage("2024-09-15")}>
                      2024-09-15
                    </Button>
                  </div>
                )}

                {message.showTimeButtons && (
                  <div className="flex flex-wrap gap-2 mt-2">
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

                {message.showPeopleCount && (
                  <div className="flex flex-col gap-2 mt-2">
                    <div>
                      <label htmlFor="adults">Adults: </label>
                      <input
                        id="adults"
                        type="number"
                        min="0"
                        value={adults}
                        onChange={(e) => setAdults(parseInt(e.target.value))}
                        className="border rounded-md p-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="children">Children: </label>
                      <input
                        id="children"
                        type="number"
                        min="0"
                        value={children}
                        onChange={(e) => setChildren(parseInt(e.target.value))}
                        className="border rounded-md p-1"
                      />
                    </div>
                    <Button onClick={() => sendMessage()}>Confirm</Button>
                  </div>
                )}

                {message.showConfirmationButtons && (
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => sendMessage("Yes")}>Yes</Button>
                    <Button onClick={() => sendMessage("No")}>No</Button>
                  </div>
                )}
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
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && sendMessage()
            }
            className="pr-16 min-h-[48px] rounded-2xl resize-none p-3 border border-neutral-400 shadow-sm"
          />
          <Button
            type="button"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => sendMessage()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
