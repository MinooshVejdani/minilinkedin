import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const signup = (userData) => {
    console.log("Saving user:", userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const login = (email, password) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (!storedUser) {
    return { success: false, message: "No user found. Please sign up first." };
  }
  if (storedUser.email === email &&storedUser.password === password) {
    setUser(storedUser);
    return { success: true };
  }
  return { success: false, message: "Invalid credentials." };
};


  return (
    <AuthContext.Provider value={{ user, signup, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}
