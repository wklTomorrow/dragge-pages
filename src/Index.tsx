import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, FC, PropsWithChildren } from 'react';
import {
  HashRouter,
  useRoutes,
  RouteObject,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import WrapperRoutes from './router';
import { StoresProvider, stores, useStore } from './stores/index';

const Index = () => {
  return (
    <StoresProvider value={stores}>
      <HashRouter>
        <WrapperRoutes />
      </HashRouter>
    </StoresProvider>
  );
};

export default Index;
