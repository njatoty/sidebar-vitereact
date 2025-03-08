import { WalletIcon, BellIcon, NewspaperIcon, Squares2X2Icon, UserIcon } from '@heroicons/react/24/outline';
import { ComponentType } from 'react';

// sidebar data
type SideBarMenu = {
  label: string;
  Icon?: React.FC;
} & ({
  type: "dropdown"
  items: {
    label: string;
    href?: string;
  } []
} | {
  type: "link";
  href?: string;
})

export const withIconSize = (IconComponent: ComponentType<{ className?: string }>) => {
    return function IconSize() {
        return <IconComponent className="w-7 h-7" />
    }
}

export const useSideBarMenuData = function SideBarMenuData(): SideBarMenu[] {
    return [
      {
        label: "DashBoard",
        Icon: withIconSize(Squares2X2Icon),
        type: "dropdown",
        items: [
          { label: "Activity", href: "#" },
          { label: "Trafic", href: "#" },
          { label: "Statistic", href: "#" },
          { label: "Additional Menu...", href: "#" },
        ]
      },
      {
        label: "Invoices",
        Icon: withIconSize(NewspaperIcon),
        type: "link"
      },
      {
        label: "User",
        Icon: withIconSize(UserIcon),
        type: "link"
      },
      {
        label: "Wallet",
        Icon: withIconSize(WalletIcon),
        type: "link"
      },
      {
        label: "Notifications",
        Icon: withIconSize(BellIcon),
        type: "link"
      },
    ]
}
