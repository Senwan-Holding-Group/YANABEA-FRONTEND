import { useContext } from "react";
import {  UserContext, type UserContextType  } from "./userContext";

export const useUserContext = (): UserContextType => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return userContext;
};