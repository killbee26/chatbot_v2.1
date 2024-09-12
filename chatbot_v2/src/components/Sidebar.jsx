// import { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { LayoutDashboardIcon, CommandIcon } from "./Icons";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r bg-background transition-all duration-300 ${isExpanded ? 'w-40' : 'w-14'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="flex flex-col items-center gap-4 px-2 py-5 pt-28">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/dashboard" className="h-9 w-9 flex items-center justify-center rounded-lg">
                <LayoutDashboardIcon className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/orders" className="h-9 w-9 flex items-center justify-center rounded-lg">
                <CommandIcon className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Orders</TooltipContent>
          </Tooltip>
          {/* Expand the text visibility based on the sidebar state */}
          {isExpanded && (
            <div className="mt-4">
              <Link to="/dashboard" className="text-white">Dashboard</Link>
              <Link to="/orders" className="mt-2 text-white">Orders</Link>
            </div>
          )}
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
