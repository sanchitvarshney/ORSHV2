import {
  BellRing,

  Home,
  
  Mail,

} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CustomTooltip from '@/components/reusable/CustomTooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DownloadIndecator from '@/components/shared/DownloadIndicater';
import { Badge } from '@/components/ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,

} from '@/components/ui/sidebar';
import { LuMenuSquare } from 'react-icons/lu';
import { Separator } from '@/components/ui/separator';
import { FaChevronDown } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

interface Props {
  children: React.ReactNode;
}
const MainLayout: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40">
      <Sidebar open={open} onOpenChange={setOpen}>
        <SidebarContent
          onInteractOutside={(e) => e.preventDefault()}
          side={'left'}
          className="top-[30px] left-[30px] bottom-[30px] h-auto rounded-xl bg-teal-600 border-0 min-w-[300px] shadow shadow-stone-400 p-[20px]"
        >
          <Button
            variant={'outline'}
            onClick={() => setOpen(false)}
            className="h-[20px] cursor-pointer p-0 hover:bg-white hover:text-slate-600 w-[20px] bg-teal-500 absolute top-[10px] right-[10px] text-white rounded-md flex justify-center items-center"
          >
            <RxCross2 className="" />
          </Button>
          <SidebarHeader className="bg-white rounded-lg p-[20px] mt-[20px]">
            <img src="/main-logo.svg" alt="" />
          </SidebarHeader>
          <aside className="flex-col bg-teal-500 mt-[20px] rounded-lg">
            <nav className="flex flex-col gap-[5px] p-[20px]">
              <NavLink
                to="/"
                className={(active) =>
                  ` font-[500] flex items-center   gap-[10px] hover:bg-white hover:text-slate-600 py-[5px] px-[10px] rounded-md ${
                    active && 'bg-white text-slate-600'
                  }`
                }
              >
                <Home className="w-5 h-5" />
                Dashboard
              </NavLink>
              <Link
                to="#"
                className=" font-[500] flex items-center  text-white gap-[10px] hover:bg-white hover:text-slate-600 py-[5px] px-[10px] rounded-md"
              >
                <Mail className="w-5 h-5" />
                Invitation
              </Link>
            </nav>
          </aside>
          <SidebarFooter className="absolute bottom-[20px] left-[20px] right-[20px] bg-white rounded-lg p-[10px]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-between w-full cursor-pointer">
                  <div className="flex items-center gap-[5px]">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Separator orientation="vertical" className="" />
                    <div className="flex flex-col font-[500] gap-0">
                      Sachin Maurya
                      <span className="text-[13px] font-[400]">
                        Software Developer
                      </span>
                    </div>
                  </div>
                  <div>
                    <FaChevronDown className="h-[20px] w-[20px] text-slate-400 mr-[10px]" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
              
                className="shadow-sm shadow-stone-500 ml-[30px]"
                side='right'
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-col w-full">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4  sm:static sm:h-auto sm:border-0  bg-[#fff] min-h-[50px] px-[10px] shadow shadow-slate-300">
          <div>
            <CustomTooltip message="Menubar" side="right">
              <div>
                <LuMenuSquare
                  className="text-2xl cursor-pointer text-slate-600"
                  onClick={() => setOpen(true)}
                />
              </div>
            </CustomTooltip>
          </div>
          <div className="flex items-center gap-[20px]">
            <div>
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Choose Company" />
                </SelectTrigger>
                <SelectContent className="shadow-sm shadow-stone-500">
                  <SelectItem value="dark">Company 1</SelectItem>
                  <SelectItem value="system">Company-2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="download">
              <DownloadIndecator />
            </div>

            <CustomTooltip message="Notification" side="bottom">
              <div className="relative flex items-center justify-center bg-indigo-50 cursor-pointer notification max-w-max p-[5px] rounded-md">
                <BellRing className="h-[25px] w-[25px] text-slate-600" />
                <Badge className="bg-teal-600 hover:bg-teal-600 h-[15px] w-[15px] rounded-full p-0 flex justify-center items-center absolute top-[-1px] right-[2px]">
                  0
                </Badge>
              </div>
            </CustomTooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="shadow-sm shadow-stone-500"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="grid items-start flex-1 gap-4  sm:py-0 md:gap-8 bg-neutral-200 min-h-[calc(100vh-50px)]">
          {children}
        </main>
      </div>
    </div>
  );
};
export default MainLayout;
