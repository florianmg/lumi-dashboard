"use client";

import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import nookies from 'nookies';
import { User, onIdTokenChanged } from 'firebase/auth';

import { auth } from '@/firebase/client.firebase';

export type PremiumLevel = 'premium' | null; // list all plans here synced with firebaseRole metadata in stripe

export const AuthContext = createContext<{
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isPremium: boolean;
  premiumLevel: PremiumLevel;
  isLoadingUser: boolean;
  isFreeTrial: boolean;
}>({
  user: null,
  setUser: () => null,
  isPremium: false,
  premiumLevel: null,
  isLoadingUser: false,
  isFreeTrial: false,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  const [premiumLevel, setPremiumLevel] = useState<PremiumLevel>(null); // used if multiple plans
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        setIsLoadingUser(false);
        setIsPremium(false);
        setPremiumLevel(null);
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken(true);
        nookies.set(undefined, 'token', token, { path: '/' });
        setUser(user);
        setIsLoadingUser(false);
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(
      async () => {
        const user = auth.currentUser;
        if (user) await user.getIdToken(true);
      },
      10 * 60 * 1000
    );

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isPremium,
        premiumLevel,
        isLoadingUser,
        isFreeTrial,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};