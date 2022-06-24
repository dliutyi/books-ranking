import { User } from "firebase/auth";
import React, { PropsWithChildren, createContext, Dispatch, SetStateAction, useState } from "react";

interface ModalProps {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

export const UserContext = createContext<ModalProps>({} as ModalProps);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
