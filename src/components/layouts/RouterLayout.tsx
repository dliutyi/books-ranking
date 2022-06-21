import React  from 'react';

import WelcomePage from '../pages/Welcome';
import GuestLayout from './GuestLayout';
import { Routes, Route } from "react-router-dom";

const RouterLayout : React.FC = () => {
  return (
    <GuestLayout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
        </Routes>
    </GuestLayout>
)}

export default RouterLayout;