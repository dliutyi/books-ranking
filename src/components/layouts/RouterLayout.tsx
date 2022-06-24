import React, { useCallback, useContext, useEffect } from "react";

import WelcomePage from "../pages/Welcome";
import GuestLayout from "./GuestLayout";
import { Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../contexts/UserContext";
import AuthenticatedLayout from "./AuthenticatedLayout";

const RouterLayout: React.FC = () => {
  const { updateUser } = useContext(UserContext);
  const auth = getAuth();

  const onUserStateChanged = useCallback(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("UserContext changed user state");
      updateUser({ displayName: user?.displayName ?? "" });
    });
  }, [auth, updateUser]);

  useEffect(() => {
    onUserStateChanged();
  }, [onUserStateChanged]);

  if (auth.currentUser) {
    return (
      <AuthenticatedLayout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </AuthenticatedLayout>
    );
  }

  return (
    <GuestLayout>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </GuestLayout>
  );
};

export default RouterLayout;
