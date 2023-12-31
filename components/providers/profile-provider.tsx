"use client";

import { createContext, useContext } from "react";

const Context = createContext<Profile | undefined>(undefined);

export default function ProfileProvider({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  return <Context.Provider value={profile}>{children}</Context.Provider>;
}

export function useProfile() {
  let context = useContext(Context);

  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return context as Profile;
}
