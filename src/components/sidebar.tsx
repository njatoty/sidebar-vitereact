import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import { DropDownMenu, MenuItemLink } from './menu-items';
import { ChatItem } from './messages';
import { PromoBlock, YellowButton } from './promo-block';
import { cn } from '../utils';
import { useToggle } from '../hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { useSideBarMenuData } from './sidebar-data';

function NavBar() {

  const { open: expanded, toggle } = useToggle(false);

  const fitWidthClass = cn(!expanded && "w-fit");

  const menuData = useSideBarMenuData();

  return (
    <div className={cn(
      "sidebar h-full bg-[#1E0B0D] py-4 flex flex-col gap-5 transition-all ease-out duration-500 text-nowrap",
      expanded ? "w-[256px] max-w-[256px]" : "w-[104px] min-w-fit"
    )}>

      <div className="relative">
        <div className={cn("user-profile w-full flex gap-2 items-center px-4 overflow-hidden", !expanded && "justify-center")}>
          <img src="/Avatar.png" alt="photo" className="w-[48px] h-[48px] aspect-square rounded-full bg-amber-100" />
          <div className={cn("flex flex-col", !expanded && "hidden")}>
            <span className="text-sm opacity-35 text-light">PRODUCT DESIGNER</span>
            <span className="text-white">Andrew Smith</span>
          </div>
        </div>
        {/* Button extend */}
        <button type="button"
          className="absolute text-white p-1 right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex items-center rounded-full bg-[#1E0B0D]"
          onClick={toggle}
        >
          <ChevronLeftIcon className={cn("w-5 h-5", !expanded && "rotate-180")} />
        </button>
      </div>

      <Separator />

      <div className={cn("h-full flex flex-col flex-grow w-full", expanded && "overflow-y-auto min-h-[250px]")}>
          {/* title */}
          <div className={cn("flex justify-between items-center gap-2", expanded && "px-8")}>
            <p className={cn('title text-muted  w-full pb-2', !expanded && "text-xs text-center")}>MAIN</p>
          </div>
          {/* List */}
          <div className="flex flex-col h-full gap-1 px-4 py-2 overflow-y-auto custom-scroll">
            {
              menuData.map((menu, index) => (

                menu.type === "link" ?
                <MenuItemLink key={index} href={menu.href || "#"} className={fitWidthClass}>
                  {menu.Icon && <menu.Icon />}
                  {expanded && menu.label}
                </MenuItemLink>
                : 
                <DropDownMenu key={index} hideArrow={!expanded} className={fitWidthClass}>
                  <DropDownMenu.Button>
                    {menu.Icon && <menu.Icon />}
                    {expanded && menu.label}
                  </DropDownMenu.Button>
                  <DropDownMenu.List>
                    {
                      menu.items.map((item, index) => (
                        <DropDownMenu.ListItem key={index} hideLabel={!expanded}>
                          {item.label}
                        </DropDownMenu.ListItem>
                      ))
                    }
                    <DropDownMenu.Floating show={!expanded}>
                      {
                        menu.items.map((item, index) => (
                          <DropDownMenu.ListItem key={index} union={false}>
                            {item.label}
                          </DropDownMenu.ListItem>
                        ))
                      }
                    </DropDownMenu.Floating>
                  </DropDownMenu.List>
                </DropDownMenu>
              ))
            }
          </div>
      </div>

      <Separator />
      
      <div className="flex flex-col flex-grow w-full h-full overflow-y-auto">
          {/* title */}
          <div className={cn("flex justify-between items-center gap-2", expanded && "px-8")}>
            <p className={cn('title text-muted pb-2 w-full', !expanded && "text-xs text-center")}>MESSAGES</p>
            <button type="button" className={cn(!expanded && "hidden")}>
              <PlusIcon className='w-5 h-5' />
            </button>
          </div>
          {/* List */}
          <div className={cn("flex flex-col h-full gap-1 px-4 py-2 overflow-y-auto custom-scroll", !expanded && "items-center")}>
            <ChatItem className={fitWidthClass}>
              <ChatItem.Profile status='active' />
              {expanded && <ChatItem.Username>Erik Gunsel</ChatItem.Username>}
            </ChatItem>

            <ChatItem className={fitWidthClass}>
              <ChatItem.Profile status='left' />
              {expanded && <ChatItem.Username>Emily Smith</ChatItem.Username>}
              
            </ChatItem>

            <ChatItem className={fitWidthClass}>
              <ChatItem.Profile status='hidden' />
              {expanded && <ChatItem.Username>Athur Adelk</ChatItem.Username>}
            </ChatItem>
          </div>
      </div>

      <div className="px-4 mt-auto">
        <AnimatePresence>
        {
          expanded ?
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: 100 }}
            transition={{ delay: 0.5 }}
          >
            <PromoBlock className='gap-3 text-wrap'>
              <p className="text-lg text-center text-white">Let's start</p>
              <span className='text-sm text-center text-light'>Creating or adding new tasks couldn't be easier.</span>
              <YellowButton className='flex items-center gap-1 mx-auto'>
                <PlusIcon className='w-6 h-6' /> Add New Task
              </YellowButton>
            </PromoBlock>
          </motion.div>
          :
            <YellowButton className='flex items-center gap-1 mx-auto'>
              <PlusIcon className='w-6 h-6' />
            </YellowButton>
        }
        </AnimatePresence>
      </div>
    </div>
  )
}

function Separator() {
  return <div className="h-[2px] w-full bg-gradient-to-r from-[#1E0B0D] via-amber-100/60 to-[#1E0B0D] opacity-40" />
}

export default NavBar