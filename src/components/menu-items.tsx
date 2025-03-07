import React, { createContext, useState, useContext } from 'react';
import { cn } from '../utils';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

// Define a context for sharing the 'open' state
const DropDownContext = createContext<{ open: boolean; toggleOpen: () => void } | undefined>(undefined);

interface DropDownMenuProps {
    children: React.ReactNode;
    className?: string;
}

interface DropDownMenuButton {
    children?: React.ReactNode;
    className?: string;
}

interface DropDownMenuList {
    children?: React.ReactNode;
    className?: string;
}

interface DropDownMenuListItem {
    children?: React.ReactNode;
    className?: string;
}

export function DropDownMenu({ children, className }: DropDownMenuProps) {
  const [open, setOpen] = useState(false);

  // Function to toggle the dropdown state
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    // Provide the open state and the toggle function to the context
    <DropDownContext.Provider value={{ open, toggleOpen }}>
        <div className={cn(className)}>
          {children}
        </div>
    </DropDownContext.Provider>
  );
}

DropDownMenu.Button = function ({ children, className } : DropDownMenuButton) {
  // Consume the context to get the open state
  const context = useContext(DropDownContext);

  if (!context) {
    throw new Error('Button must be used within a DropDownMenu');
  }

  const { open, toggleOpen } = context;

  return (
    <button type="button" onClick={toggleOpen}
        className={cn(
            'flex items-center justify-between w-full py-4 px-4 rounded-xl',
            'bg-[radial-gradient(circle_at_bottom-right,_#B86E9F,_#662525)]',
            'hover:bg-[#331516] text-base relative z-10 border border-transparent hover:border-[#462329]',
            open ? "bg-[#331516] text-white" : "text-light",
            className)
        }
    >
      <span className="flex items-center gap-2">
        {children}
      </span>
      <ChevronDownIcon className={cn('w-5 h-5', open && 'rotate-180')} />
    </button>
  );
};

DropDownMenu.List = function ({ children, className} : DropDownMenuList) {

    const context = useContext(DropDownContext);

    if (!context) {
        throw new Error('Button must be used within a DropDownMenu');
    }

    const { open } = context;

    return (
        <div className={cn("w-full pl-8 py-2", open ? "flex flex-col" : "hidden", className)}>
            {children}
        </div>
    )
}


DropDownMenu.ListItem = function ({ children, className} : DropDownMenuListItem) {

    return (
        <div className={cn("relative w-full", className)}>
            <div className='border-l-2 border-b-2 border-[#4A3434] w-4 h-14 rounded-bl-xl -translate-y-1/2 absolute -left-1 -top-1' />
            <div className='ml-4 p-3 rounded-xl bg-[#1E0B0D] hover:bg-[#331516] border border-transparent hover:border-[#462329] text-light'>
                {children}
            </div>
        </div>
    )
}


interface MenuItemLinkProps {
  children?: React.ReactNode;
  className?: string;
  href: string
}

export function MenuItemLink({ children, className, href } : MenuItemLinkProps) {

  return (
    <a href={href} type="button"
        className={cn(
            'flex items-center justify-between w-full py-4 px-4 rounded-xl',
            'bg-[radial-gradient(circle_at_bottom-right,_#B86E9F,_#662525)]',
            'hover:bg-[#331516] text-base relative z-10 border border-transparent hover:border-[#462329]',
            "text-light hover:!text-white",
            className)
        }
    >
      <span className="flex items-center gap-2">
        {children}
      </span>
    </a>
  );
};