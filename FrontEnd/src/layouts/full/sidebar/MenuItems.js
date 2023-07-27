import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons';

import { uniqueId } from 'lodash';
import { gettoken } from '../token/gettoken';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/auth/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Notes',
    icon: IconTypography,
    href: '/auth/ui/typography',
  },
  // Conditionally include the "Users" menu item if the user has the admin role
  ...(gettoken !== null && gettoken.role === 'admin'
    ? [
        {
          id: uniqueId(),
          title: 'Users',
          icon: IconCopy,
          href: '/auth/ui/shadow',
        },
      ]
    : []
  ),
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/auth/icons',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/auth/sample-page',
  },
];

export default Menuitems;
