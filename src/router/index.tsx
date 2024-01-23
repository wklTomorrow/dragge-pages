import React, { useState, useEffect, FC, PropsWithChildren } from 'react';
import {
  HashRouter,
  useRoutes,
  RouteObject,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Index from '../pages/index';
import Preview from '../pages/preview/preview';

const RedirectWrap = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/index');
  }, []);
  return <></>;
};

const rootRouter: Array<RouteObject> = [
  {
    path: '/index',
    element: <Index />,
  },
  {
    path: '/preview',
    element: <Preview />,
  },
  {
    path: '*',
    element: <RedirectWrap />,
  },
];

const WrapperRoutes = () => {
  return useRoutes(rootRouter);
};

export default WrapperRoutes;
