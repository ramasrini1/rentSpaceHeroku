import { useContext, createContext } from 'react'
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext(null)

export const AuthProvider = ( {children} ) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useLocalStorage("user", null);


  function login(user){
    setUser(user.username);
    let auth_token = user.token;
    setToken(auth_token);
  }

  const logout = () => {
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}





