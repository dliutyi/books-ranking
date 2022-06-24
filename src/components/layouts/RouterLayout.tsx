import React, { useContext, useEffect }  from 'react';

import WelcomePage from '../pages/Welcome';
import GuestLayout from './GuestLayout';
import { Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserContext } from '../Contexts/UserContext';
import AuthenticatedLayout from './AuthenticatedLayout';

const RouterLayout : React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        console.log("UserContext changed user state");
        setUser(user == null ? undefined : user);
    })
}, [auth, setUser]);

  if(user) {
    return (
      <AuthenticatedLayout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </AuthenticatedLayout>
    )
  }

  return (
    <GuestLayout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
        </Routes>
    </GuestLayout>
)}

export default RouterLayout;