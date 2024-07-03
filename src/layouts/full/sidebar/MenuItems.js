import {
  IconAperture, IconTypography, IconLayoutDashboard,
} from '@tabler/icons';
import { uniqueId } from 'lodash';
import getUserRole from './getUserRole'; // Assurez-vous de corriger le chemin d'importation

const userRole = getUserRole();

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
    title: 'Proxmox Dashboard',
    icon: IconTypography,
    href: '/proxmox',
  },
  {
    id: uniqueId(),
    title: 'Prometheus Dashboard',
    icon: IconTypography,
    href: '/prometheus',
  },
  // Ajoutez les éléments suivants conditionnellement
  ...(userRole === 'admin' ? [
    {
      navlabel: true,
      subheader: 'Settings',
    },
    {
      id: uniqueId(),
      title: 'User Management',
      icon: IconAperture,
      href: '/userTable',
    },
    {
      id: uniqueId(),
      title: 'ENVIRONMENT',
      icon: IconAperture,
      href: '/settings',
    },
  ] : []),
  {
    navlabel: true,
    subheader: 'Ansible',
  },
  {
    id: uniqueId(),
    title: 'Ansible Management',
    icon: IconAperture,
    href: '/ansible',
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
    },
  
];

export default Menuitems;
