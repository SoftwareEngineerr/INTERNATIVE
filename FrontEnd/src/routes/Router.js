import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { Verify } from '../layouts/blank/verify';
import { gettoken } from '../layouts/full/token/gettoken';

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
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Userpost = Loadable(lazy(() => import('../views/admin/adminshowuser')));


const isAdmin = gettoken != undefined ? gettoken.role === "admin" : null; // Check if the user has an admin role

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Navigate to="/login" /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: (
      <>
        <Verify />
        <FullLayout />
      </>
    ),
    children: [
      { path: '/auth/', element: <Navigate to="/dashboard" /> },
      { path: '/auth/dashboard', exact: true, element: <Dashboard /> },
      { path: '/auth/sample-page', exact: true, element: <SamplePage /> },
      { path: '/auth/icons', exact: true, element: <Icons /> },
      { path: '/auth/ui/typography', exact: true, element: <TypographyPage /> },
      // Only include the Shadow route if the user has an admin role
      ...(isAdmin ? [{ path: '/auth/ui/shadow', exact: true, element: <Shadow /> }, { path: '/auth/adminshowuser/:id', exact: true, element: <Userpost /> }] : []),
      { path: '/auth/*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
