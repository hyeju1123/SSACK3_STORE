import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

type HandleModal = (show: boolean, message: string) => void;

type NotificationContextValue = {
  SHOW: boolean;
  MESSAGE: string;
  handleModal: HandleModal;
};

export const NotificationContext = createContext<NotificationContextValue>({
  SHOW: false,
  MESSAGE: '',
  handleModal: () => {},
});

export const NotificationProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [modal, setModal] = useState({SHOW: false, MESSAGE: ''});

  const handleModal = useCallback((show: boolean, message: string) => {
    setModal({SHOW: show, MESSAGE: message});
  }, []);

  return (
    <NotificationContext.Provider value={{...modal, handleModal}}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
