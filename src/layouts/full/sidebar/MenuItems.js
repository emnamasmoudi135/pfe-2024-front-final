import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Proxmox',
  },
  {
    id: uniqueId(),
    title: 'proxmox dashboard',
    icon: IconTypography,
    href: '/proxmox',
  },
  {
    navlabel: true,
    subheader: 'Settings',
  },
  {
    id: uniqueId(),
    title: 'ENVIRONMENT ',
    icon: IconAperture,
    href: '/settings',
  },
  {
    navlabel: true,
    subheader: 'Ansible',
  },
  {
    id: uniqueId(),
    title: 'Ansible Managment',
    icon: IconAperture,
    href: '/ansible',
  },
  {
    navlabel: true,
    subheader: 'Terraform',
  },
  {
    id: uniqueId(),
    title: 'Terraform Managment',
    icon: IconAperture,
    href: '/terraform',
  },
];

export default Menuitems;
