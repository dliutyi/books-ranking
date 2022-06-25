import React, { useCallback, useContext, useEffect, useState } from "react";

import WelcomePage from "../pages/WelcomePage";
import GuestLayout from "./GuestLayout";
import { Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../contexts/UserContext";
import AuthenticatedLayout from "./AuthenticatedLayout";
import NotFoundPage from "../pages/NotFoundPage";

const RouterLayout: React.FC = () => {
  const [isUserSynced, setUserSynced] = useState(false);
  const { updateUser } = useContext(UserContext);
  const auth = getAuth();

  const onUserStateChanged = useCallback(() => {
    onAuthStateChanged(auth, (user) => {
      setUserSynced(true);
      console.log("UserContext changed user state");
      updateUser({ displayName: user?.displayName ?? "" });
    });
  }, [auth, updateUser, setUserSynced]);

  useEffect(() => {
    onUserStateChanged();
  }, [onUserStateChanged]);

  if (!isUserSynced) {
    return <></>;
  }

  if (auth.currentUser) {
    return (
      <Routes>
        <Route path="/" element={<AuthenticatedLayout />}>
          <Route path="/" element={<WelcomePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route path="/" element={<WelcomePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RouterLayout;
