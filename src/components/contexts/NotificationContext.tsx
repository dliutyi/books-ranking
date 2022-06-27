import { AlertColor, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import React, {
  PropsWithChildren,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface NotificationModel {
  value: string;
  type: AlertColor;
}

interface NotificationProps {
  setNotification: Dispatch<SetStateAction<NotificationModel | undefined>>;
}

export const NotificationContext = createContext<NotificationProps>(
  {} as NotificationProps
);

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [notification, setNotification] = useState<
    NotificationModel | undefined
  >(undefined);
  const handleClose = () => setNotification(undefined);

  return (
    <NotificationContext.Provider value={{ setNotification }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={notification ? true : false}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert elevation={6} variant="filled" severity={notification?.type}>
          {notification?.value}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
