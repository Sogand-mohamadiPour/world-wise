import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();



function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login({ email, password }) {}

  function logout() {}

  return (
    <AuthContext.Provider value={(user, isAuthenticated, login, logout)}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside Authprovider");
  }
}

export { AuthProvider, useAuth };
