import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ teacherId: null, teacherName: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teacherId = localStorage.getItem('teacherId');
    const teacherName = localStorage.getItem('teacherName');
    if (teacherId && teacherName) {
      setAuth({ teacherId, teacherName });
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('teacherId');
    localStorage.removeItem('teacherName');
    setAuth({ teacherId: null, teacherName: null });
  };


  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
