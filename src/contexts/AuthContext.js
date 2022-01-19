const { createContext, useState } = require('react');

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userId: sessionStorage.getItem('userId'),
    isLogin: sessionStorage.getItem('userId') ? true : false,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
