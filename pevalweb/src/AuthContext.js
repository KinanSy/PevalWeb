import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, teacherId: null, teacherName: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const teacherId = localStorage.getItem('teacherId');
    const teacherName = localStorage.getItem('teacherName');
    if (token && teacherId && teacherName) {
      setAuth({ token, teacherId, teacherName });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('teacherId');
    localStorage.removeItem('teacherName');
    setAuth({ token: null, teacherId: null, teacherName: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
