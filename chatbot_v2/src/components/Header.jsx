import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MountainIcon } from "./Icons";
import { Button } from "@/components/ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
import { Bold } from "lucide-react";
const Header = () => (
  <header className="fixed top-0 z-40 flex h-20 w-full items-center justify-between border-b bg-background px-4 sm:px-6">
    <div className="flex items-center gap-4">
      <Link to="/" className="flex items-center gap-2">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <input type="search" placeholder="Search..." className="w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]" />
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
          <PersonIcon width={20} height={20} ></PersonIcon>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem><Link to="/profile">Profile</Link></DropdownMenuItem>
        <DropdownMenuItem><Link to="/settings">Settings</Link></DropdownMenuItem>
        <DropdownMenuItem><Link to="/logout">Logout</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
);

export default Header;
