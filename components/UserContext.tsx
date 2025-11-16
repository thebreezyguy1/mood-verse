import React, { createContext, useContext, useState } from "react";
import { CountryCode } from "react-native-country-picker-modal";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  zipCode: string;
  countrycode: CountryCode;
  phone: string;
};

const UserContext = createContext<{
  user: User;
  setUser: (u: User) => void;
} | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    firstName: "Dorian",
    lastName: "Taponzing Donfack",
    email: "doriantaponzing@gmail.com",
    streetAddress1: "3920 Snipes Court",
    streetAddress2: "",
    city: "Lilburn",
    zipCode: "30047",
    countrycode: "US",
    phone: "14704399907",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside useProvider");
  return ctx;
};
