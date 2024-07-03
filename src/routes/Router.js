// src/routes/router.js
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const Error = Loadable(lazy(() => import('../views/auth/Error')));
const Proxmox = Loadable(lazy(() => import('../views/Proxmox/Proxmox')));
const Ansible = Loadable(lazy(() => import('../views/ansible/Ansible')));
const PlaybookDetail = Loadable(lazy(() => import('../views/ansible/PlaybookDetail')));
const EditPlaybook = Loadable(lazy(() => import('../views/ansible/EditPlaybook')));
const Reglages = Loadable(lazy(() => import('../views/reglages/Reglages')));
const Terraform = Loadable(lazy(() => import('../views/terraform/terraform')));
const Signup = Loadable(lazy(() => import('../views/auth/Signup')));
const Login = Loadable(lazy(() => import('../views/auth/Login')));
const Logout = Loadable(lazy(() => import('../views/auth/Logout')));
const Prometheus = Loadable(lazy(() => import('../views/prometheus/dashboardProxmox')));
const UserTable = Loadable(lazy(() => import('../views/auth/UserTable')));
const ForgotPassword = Loadable(lazy(() => import('../views/auth/ForgotPassword')));
const ResetPassword = Loadable(lazy(() => import('../views/auth/ResetPassword')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <PrivateRoute><Dashboard /></PrivateRoute> },
      { path: '/proxmox', exact: true, element: <PrivateRoute><Proxmox /></PrivateRoute> },
      { path: '/ansible', exact: true, element: <PrivateRoute><Ansible /></PrivateRoute> },
      { path: "/playbook/:name", exact: true, element: <PrivateRoute><PlaybookDetail /></PrivateRoute> },
      { path: "/edit-playbook/:editType/:name", exact: true, element: <PrivateRoute><EditPlaybook /></PrivateRoute> },
      { path: "/terraform", exact: true, element: <PrivateRoute><Terraform /></PrivateRoute> },
      { path: "/settings", exact: true, element: <AdminRoute><Reglages /></AdminRoute> },
      { path: "/prometheus", exact: true, element: <PrivateRoute><Prometheus /></PrivateRoute> },
      { path: "/userTable", exact: true, element: <AdminRoute><UserTable /></AdminRoute> },
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
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/reset-password', element: <ResetPassword /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
