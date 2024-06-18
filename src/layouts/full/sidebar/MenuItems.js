import {
  IconAperture, IconCopy, IconLayoutDashboard, IconTypography, IconUserPlus
} from '@tabler/icons';
import { uniqueId } from 'lodash';

const allMenuItems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
    roles: ['user', 'admin'],
  },
  {
    navlabel: true,
    subheader: 'Proxmox',
  },
  {
    id: uniqueId(),
    title: 'Proxmox Dashboard',
    icon: IconTypography,
    href: '/proxmox',
    roles: ['user', 'admin'],
  },
  {
    id: uniqueId(),
    title: 'Prometheus Dashboard',
    icon: IconTypography,
    href: '/prometheus',
    roles: ['user', 'admin'],
  },
  {
    navlabel: true,
    subheader: 'Settings',
  },
  {
    id: uniqueId(),
    title: 'User Management',
    icon: IconAperture,
    href: '/userTable',
    roles: ['admin'],
  },
  {
    id: uniqueId(),
    title: 'Environment',
    icon: IconAperture,
    href: '/settings',
    roles: ['admin'],
  },
  {
    navlabel: true,
    subheader: 'Ansible',
  },
  {
    id: uniqueId(),
    title: 'Ansible Management',
    icon: IconAperture,
    href: '/ansible',
    roles: ['user', 'admin'],
  },
  {
    navlabel: true,
    subheader: 'Terraform',
  },
  {
    id: uniqueId(),
    title: 'Terraform Management',
    icon: IconAperture,
    href: '/terraform',
    roles: ['user', 'admin'],
  },
];

export const getMenuItems = (role) => {
  return allMenuItems.filter(item => !item.roles || item.roles.includes(role));
};

export default allMenuItems;
