import { ReactNode, useState, createContext, useContext } from "react";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  login: (data: UserData) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAManager: boolean;
}

interface UserData {
  name: string;
  email: string;
  avatar: string;
  venueManager: boolean;
  accessToken: string;
}

const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );
  const [isAManager, setIsAManager] = useState<boolean>(
    localStorage.getItem("isManager") === "true" || false
  );

  const login = (data: UserData) => {
    setAuthToken(data.accessToken);
    localStorage.setItem("authToken", data.accessToken);

    setIsAManager(data.venueManager);
    localStorage.setItem("isAManager", JSON.stringify(data.venueManager));
    console.log(isAManager);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAManager");
  };

  const isAuthenticated: boolean = !!authToken;

  return (
    <AuthContext.Provider
      value={{ login, isAuthenticated, isAManager, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
