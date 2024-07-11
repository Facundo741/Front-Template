import React, { createContext, useState, useContext, useEffect} from "react";
import instance from "../api/axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};

const normalizeUser = (user) => {
  if ("id" in user && !("_id" in user)) {
    user._id = user.id;
    delete user.id;
  }
  return user;
};

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const checkLogin = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const userStr = sessionStorage.getItem('user');
      if (token && userStr) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await instance.get('/user/verify-token');
        if (res.status === 200) {
          const normalizedUser = normalizeUser(JSON.parse(userStr));
          setUser(normalizedUser);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const signup = async (user) => {
    try {
      const res = await instance.post('/user/create', user);
      const normalizedUser = normalizeUser(res.data);
      setUser(normalizedUser);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (user) => {
    try {
      const res = await instance.post("/user/login", user);
      const token = res.data.token;
      const normalizedUser = normalizeUser(res.data);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(normalizedUser));
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(normalizedUser);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    delete instance.defaults.headers.common['Authorization'];
    navigate("/login");
  };

  const updatePassword = async (user) => {
    try {
      await instance.patch('/user/update-password', user);  
      logout();
    } catch (error) {
      setErrors(["Error al actualizar la contraseña."]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const contextValues = {
    signup,
    signin,
    setUser,
    user,
    isAuthenticated,
    setIsAuthenticated,
    errors,
    logout,
    updatePassword
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
