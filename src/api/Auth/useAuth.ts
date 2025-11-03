import { useContext } from "react";
import { AuthContext, type AuthContextType } from "./authContext";

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return authContext;
};
