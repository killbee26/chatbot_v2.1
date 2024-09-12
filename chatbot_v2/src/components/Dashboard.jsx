import Card from './Card';
import { Input } from "@/components/ui/input";
import { DollarSignIcon, UsersIcon, CreditCardIcon, ActivityIcon } from './Icons';
import Chatbox from "@/components/Chatbox"; // Adjust the path as necessary
import { useState } from 'react';

const Dashboard = () => {
  const [isChatboxVisible, setChatboxVisible] = useState(false);

  const handleInputClick = () => {
    setChatboxVisible(true);
  };

  return (
    <main className="flex flex-col pt-[150px] sm:pl-20 max-w-screen min-h-screen">
     
      <div className="flex flex-row w-full h-full">
        <div className="flex-1 p-4 max-w-[65%]"> {/* Wider card section */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card title="Total Revenue" value="$45,231.89" icon={<DollarSignIcon />} />
            <Card title="Subscriptions" value="+2350" icon={<UsersIcon />} />
            <Card title="Sales" value="+12,234" icon={<CreditCardIcon />} />
            <Card title="Active Now" value="+573" icon={<ActivityIcon />} />

            <Card title="New Users" value="+150" icon={<UsersIcon />} />
            <Card title="Pending Orders" value="20" icon={<CreditCardIcon />} />
            <Card title="Feedback Received" value="45" icon={<ActivityIcon />} />
            <Card title="Total Visits" value="1,234" icon={<DollarSignIcon />} />
          </div>
        </div>
        <div className="flex-none w-[30%] p-4"> {/* Reduced width for Chatbox */}
          <Chatbox /> {/* Always show Chatbox */}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;