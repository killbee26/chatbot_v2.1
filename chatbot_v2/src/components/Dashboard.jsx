import { useEffect, useState } from 'react';
import Card from './Card';
import Chatbox from "@/components/Chatbox";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="flex flex-col pt-[150px] sm:pl-20 max-w-screen min-h-screen">
      <div className="flex flex-row w-full h-full">
        <div className="flex-1 p-4 max-w-[65%]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {events.map((event, index) => (
              <Card
                key={index}
                title={event.name}
                value={
                  <>
                    <img src={event.imageUrl} alt={event.name} className="w-full h-32 object-cover rounded-lg" />
                    <div>Venue: {event.venue}</div>
                    <div>Date: {new Date(event.date).toLocaleDateString()}</div>
                    <div>Time: {event.timeSlot}</div>
                  </>
                }
                icon={null} // You can adjust the icon as needed
              />
            ))}
          </div>
        </div>
        <div className="flex-none w-[30%] p-4">
          <Chatbox />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
