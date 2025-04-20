import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: null,
    token: null,
  });

  const login = (userId, token) => {
    setUser({ userId, token });
  };

  const logout = () => {
    setUser({ userId: null, token: null });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
