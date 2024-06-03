import { createContext, useState, useEffect } from 'react';

// Créer un contexte d'authentification
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ teacherId: null, teacherName: null });
  const [loading, setLoading] = useState(true);

  // Utiliser useEffect pour récupérer les informations d'authentification depuis le localStorage
  useEffect(() => {
    const teacherId = localStorage.getItem('teacherId');
    const teacherName = localStorage.getItem('teacherName');
    if (teacherId && teacherName) {
      setAuth({ teacherId, teacherName });
    }
    setLoading(false);
  }, []);

  // Fonction pour déconnecter l'utilisateur
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

export { AuthProvider, AuthContext };
