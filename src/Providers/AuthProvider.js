import { useState, createContext, useContext, useEffect } from "react";

const AthProviderContext = createContext();
const AthProviderContextDispatcher = createContext();
const LOCAL_STORAGE_AUTH_KEY = "authState";
function AuthProvider({ children }) {
  const [state, setState] = useState(false);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) || false;
    setState(userData);
  }, []);

  useEffect(() => {
    const data = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, data);
  }, [state]);

  return (
    <AthProviderContext.Provider value={state}>
      <AthProviderContextDispatcher.Provider value={setState}>
        {children}
      </AthProviderContextDispatcher.Provider>
    </AthProviderContext.Provider>
  );
}

export default AuthProvider;

export const useAth = () => useContext(AthProviderContext);
export const useAuthActions = () => useContext(AthProviderContextDispatcher);
