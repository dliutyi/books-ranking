import React, { useState, PropsWithChildren } from 'react';

import WelcomePage from '../pages/Welcome';
import AuthenticatedLayout from './AuthenticatedLayout';
import GuestLayout from './GuestLayout';
import {
  Routes,
  Route,
} from "react-router-dom";

const RouterLayout : React.FC = () => {
  return (
      <GuestLayout>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
          </Routes>
      </GuestLayout>
)}

export default RouterLayout;