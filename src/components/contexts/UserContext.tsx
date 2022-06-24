import React, { createContext, PropsWithChildren, useState } from "react";

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

interface UserContextProps {
  updateUser: React.Dispatch<React.SetStateAction<UserProps>>;
}

interface UserProps {
  displayName: string;
}

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [, updateUser] = useState<UserProps>({
    displayName: "",
  });

  return (
    <UserContext.Provider value={{ updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
