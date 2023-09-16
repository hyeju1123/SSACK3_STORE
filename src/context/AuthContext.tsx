import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

type HandleUser = (userData: UserContextValue) => void;
type HandleUserImg = (imageUrl: string) => void;

type UserContextValue = {
  userId: string;
  sub: string;
  role: string;
  exp: number;
  imageURL: string;
  handleUser: HandleUser;
  handleUserImg: HandleUserImg;
};

let userTypes: UserContextValue = {
  userId: '',
  sub: '',
  role: '',
  exp: 0,
  imageURL: '',
  handleUser: () => {},
  handleUserImg: () => {},
};

export const UserContext = createContext<UserContextValue>(userTypes);

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState({
    userId: '',
    sub: '',
    role: '',
    exp: 0,
    imageURL: '',
  });

  const handleUser = useCallback(userData => {
    console.log(userData, ' in handleUser');
    setUser({...userData});
  }, []);

  const handleUserImg = useCallback((imageUrl: string) => {
    setUser(prev => ({
      ...prev,
      IMAGE_URL: imageUrl,
    }));
  }, []);

  return (
    <UserContext.Provider
      value={{...user, handleUser: handleUser, handleUserImg: handleUserImg}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
