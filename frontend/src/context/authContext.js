"use client";
import React, { createContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const pathname = usePathname();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loginUserInfo, setLoginUserInfo] = useState(null);

  const [previousProfileInfo, setPreviousProfileInfo] = useState(null);
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${base_url}/check-auth`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      setIsLoggedin(data.authenticated);
      setLoginUserInfo(data.userInfo);
      setPreviousProfileInfo(data.userInfo);
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedin,
        setIsLoggedin,
        loginUserInfo,
        setLoginUserInfo,
        previousProfileInfo,
        setPreviousProfileInfo,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
