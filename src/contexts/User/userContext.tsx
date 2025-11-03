import { createContext } from "react";

export type UserContextType = {
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: boolean;

};

export const UserContext = createContext<UserContextType | undefined>(undefined);