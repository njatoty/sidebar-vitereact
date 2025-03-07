import { NewspaperIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { DropDownMenu, MenuItemLink } from './menu-items';
import { WalletIcon } from '@heroicons/react/24/outline';
import { BellIcon } from '@heroicons/react/24/outline';
import { ChatItem } from './messages';
import { PromoBlock, YellowButton } from './promo-block';

function NavBar() {
  return (
    <div className="sidebar w-[256px] h-full bg-[#1E0B0D] p-4 flex flex-col gap-6">
      <div className="user-profile w-full flex gap-2 items-center">
        <img src="/Avatar.png" alt="photo" className="w-[48px] h-[48px] aspect-square rounded-full" />
        <div className="flex flex-col">
          <span className="opacity-35 text-light text-sm">PRODUCT DESIGNER</span>
          <span className="text-white">Andrew Smith</span>
        </div>
      </div>

      <Separator />

      <div className="main text-sm">
        {/* title */}
        <div className="flex justify-between items-center gap-2  px-4">
          <p className='title text-muted pb-2'>MAIN</p>
        </div>
        {/* List */}
        <div className="flex flex-col gap-1">
          <DropDownMenu>
            <DropDownMenu.Button>
              <Squares2X2Icon className="w-7 h-7" /> Dashboard
            </DropDownMenu.Button>
            <DropDownMenu.List>
              <DropDownMenu.ListItem>Activity</DropDownMenu.ListItem>
              <DropDownMenu.ListItem>Trafic</DropDownMenu.ListItem>
              <DropDownMenu.ListItem>Statistic</DropDownMenu.ListItem>
            </DropDownMenu.List>
          </DropDownMenu>
          
          <MenuItemLink href="#">
            <NewspaperIcon className='w-7 h-7' /> Invoices
          </MenuItemLink>
          
          <MenuItemLink href="#">
            <WalletIcon className='w-7 h-7' /> Wallet
          </MenuItemLink>
          
          <MenuItemLink href="#">
            <BellIcon className='w-7 h-7' /> Notifications
          </MenuItemLink>
        </div>
      </div>

      <Separator />
      
      <div className="main text-white text-sm">
        {/* title */}
        <div className="flex justify-between items-center gap-2  px-4">
          <p className='title text-muted pb-2'>MESSAGES</p>
          <button type="button">
            <PlusIcon className='w-5 h-5' />
          </button>
        </div>
        {/* List */}
        <div className="flex flex-col gap-1">
          <ChatItem>
            <ChatItem.Profile status='active' />
            <ChatItem.Username>Erik Gunsel</ChatItem.Username>
          </ChatItem>

          <ChatItem>
            <ChatItem.Profile status='left' />
            <ChatItem.Username>Emily Smith</ChatItem.Username>
          </ChatItem>

          <ChatItem>
            <ChatItem.Profile status='hidden' />
            <ChatItem.Username>Athur Adelk</ChatItem.Username>
          </ChatItem>
        </div>
      </div>

      <div className="mt-auto">
        <PromoBlock className='gap-3'>
          <p className="text-center text-lg text-white">Let's start</p>
          <span className='text-light text-sm text-center'>Creating or adding new tasks couldn't be easier.</span>
          <YellowButton className='flex items-center gap-2'>
            <PlusIcon className='w-6 h-6' /> Add New Task
          </YellowButton>
        </PromoBlock>
      </div>
    </div>
  )
}

function Separator() {
  return <div className="h-[1px] w-full bg-gradient-to-r from-[#1E0B0D] via-white to-[#1E0B0D] opacity-40" />
}

export default NavBar