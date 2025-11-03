import { useEffect, useState } from "react";
import { UserContext } from "./User/userContext";
import { useAuth } from "@/api/Auth/useAuth";

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const { user } = useAuth();
  const isAdmin = user?.user_type === "A";
  const [userType, setUserType] = useState<string>("");
  
  useEffect(() => {
    if (user?.user_type) {
      setUserType(isAdmin ? "S" : user.user_type);
    }
  }, [user?.user_type, isAdmin]);
  
  return (
    <UserContext.Provider
      value={{
        userType,
        setUserType,
        isAdmin,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;