import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
// const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Proxmox = Loadable(lazy(() => import('../views/Proxmox/Proxmox')));
const Ansible = Loadable(lazy(() => import('../views/ansible/Ansible')));
const PlaybookDetail = Loadable(lazy(() => import('../views/ansible/PlaybookDetail')));
const EditPlaybook = Loadable(lazy(() => import('../views/ansible/EditPlaybook')));
const Reglages = Loadable(lazy(() => import('../views/reglages/Reglages')));
const Terraform = Loadable(lazy(() => import('../views/terraform/terraform')));
const Signup = Loadable(lazy(() => import('../views/auth/Signup')));
const Login = Loadable(lazy(() => import('../views/auth/Login')));
const Logout = Loadable(lazy(() => import('../views/auth/Logout')));



const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/proxmox', exact: true, element: <Proxmox /> },
      { path: '/ansible', exact: true, element: <Ansible /> },
      { path: "/playbook/:name", exact: true, element: <PlaybookDetail /> },
      { path: "/edit-playbook/:editType/:name", exact: true, element: <EditPlaybook /> },
      { path: "/terraform", exact: true, element: <Terraform /> },
      { path: "/settings", exact: true, element: <Reglages /> },



      { path: "/auth/register", exact: true, element: <Register /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/signup', element: <Signup /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/logout', element: <Logout /> },

      
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;


