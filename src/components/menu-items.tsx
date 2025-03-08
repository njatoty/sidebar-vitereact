import React, { createContext, useState, useContext } from 'react';
import { cn } from '../utils';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';

interface DropDownMenuProps {
    children: React.ReactNode;
    className?: string;
    hideArrow?: boolean;
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
    hideLabel?: boolean;
    union?: boolean;
}

interface DropDownMenuLabel {
    children?: React.ReactNode;
    className?: string;
}

interface DropDownMenuFloating {
    children?: React.ReactNode;
    className?: string;
    show?: boolean
}

// Define a context for sharing the 'open' state
const DropDownContext = createContext<{ open: boolean; hideArrow: boolean; toggleOpen: () => void } | undefined>(undefined);

// Custom Hook
const useDropDown = () => {
  const context = useContext(DropDownContext);
  if (!context) throw new Error("useDropDown must be used within DropDownProvider");
  return context;
};

export function DropDownMenu({ children, className, hideArrow=false }: DropDownMenuProps) {
  const [open, setOpen] = useState(false);

  // Function to toggle the dropdown state
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    // Provide the open state and the toggle function to the context
    <DropDownContext.Provider value={{ open, toggleOpen, hideArrow }}>
        <div className={cn(className)}>
          {children}
        </div>
    </DropDownContext.Provider>
  );
}

DropDownMenu.Button = React.memo(function Button({ children, className } : DropDownMenuButton) {

  const { open, toggleOpen, hideArrow } = useDropDown();

  return (
    <button type="button" onClick={toggleOpen}
        className={cn(
            'flex items-center justify-between w-full py-4 px-4 rounded-xl',
            'hover:bg-[#331516] text-base relative z-10 border border-transparent hover:border-[#462329]',
            open ? "bg-[#331516] text-white" : "text-light",
            className)
        }
    >
      <span className="flex items-center gap-2">
        {children}
      </span>
      <ChevronDownIcon className={cn('w-5 h-5', open && 'rotate-180', hideArrow && 'hidden')} />
    </button>
  );
});

DropDownMenu.List = React.memo(function List({ children, className} : DropDownMenuList) {
    const { open } = useDropDown();
    return (
      <AnimatePresence>
        {
          open && 
          <motion.div
            initial={{ height: 0 }} // Start collapsed
            exit={{ height: 0 }} // reStart collapsed
            animate={{ height: open ? "auto" : 0, }} // Expand/collapse
            className={cn("relative w-full pl-4 py-2 overflow-hidden", open ? "flex flex-col" : "hidden", className)}
          >
            {children}
          </motion.div>
        }
      </AnimatePresence>
    )
});


DropDownMenu.ListItem = function ({ children, className, union=true, hideLabel=false } : DropDownMenuListItem) {

  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex items-center w-full gap-4">

        <div className={cn("w-7", !union && "hidden")}>
          <div className={cn("border-l-2 border-b-2 border-[#4A3434] w-4 h-12 rounded-bl-xl -translate-y-1/2 translate-x-full",
          "relative before:absolute before:w-full before:h-full before:border-[#4A3434] before:inset-0 before:border-l-2 before:-top-3 before:-left-[2px]",
          )} />
        </div>
        
        {
          !hideLabel &&
          <DropDownMenu.Label>
            {children}
          </DropDownMenu.Label>
        }
        
      </div>
    </div>
  )
}

DropDownMenu.Label = function ({ children, className } : DropDownMenuLabel) {

  return (
    <div className={cn("px-3 py-2 rounded-xl hover:bg-[#522916] hover:text-white border border-transparent hover:border-[#462329] text-light w-full", className)}>
      {children}
    </div>
  )
}

DropDownMenu.Floating = function Floating({ children, className, show=false } : DropDownMenuFloating) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: .3 }}
      className={cn("w-[166px] p-1 rounded-xl bg-[#331516] fixed left-[72px] shadow-md", !show && "!hidden", className)}
    >
      <div className="relative flex flex-col w-full gap-1">
        { children}
      </div>
    </motion.div>
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