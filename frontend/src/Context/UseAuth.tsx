import React, { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User"; // Import the 'UserProfile' type
import { toast } from "react-toastify"; // Import the 'toast' function
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { loginAPI, registerAPI } from "../services/AuthService";
import axios from "axios"; // Import the 'axios' library

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);


useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
        setUser(JSON.parse(user));
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set the 'Authorization' header with the token
    }
    setIsReady(true);
}, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          const userObj = {
            userName: res?.data.username,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token);
          setUser(userObj!);
          toast.success("Login successful!"); // Call the 'toast' function with the desired message
          navigate("/favorites");
        }
      })
      .catch((e) => toast.warning("Server error occurred!"));
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          const userObj = {
            userName: res?.data.username,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token);
          setUser(userObj!);
          toast.success("Login successful!"); // Call the 'toast' function with the desired message
          navigate("/favorites");
        }
      })
      .catch((e) => toast.warning("Server error occurred!"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const UseAuth = () => React.useContext(UserContext);
