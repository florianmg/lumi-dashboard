import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '@/firebase/client.firebase';

export const googleAuth = async () =>
  new Promise(
    async (resolve: (credentials: UserCredential) => void, reject) => {
      {
        try {
          console.log('[AUTH][FIREBASE] googleAuth');
          const googleProvider = new GoogleAuthProvider();
          const credentials = await signInWithPopup(auth, googleProvider);
          resolve(credentials);
        } catch (error) {
          reject(error);
        }
      }
    }
  );

export const emailRegister = async (params: {
  email: string;
  password: string;
}) =>
  new Promise(
    async (resolve: (credentials: UserCredential) => void, reject) => {
      try {
        console.log('[AUTH][FIREBASE] emailRegister');
        const { email, password } = params;
        const credentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        resolve(credentials);
      } catch (error) {
        reject(error);
      }
    }
  );

export const emailLogin = async (params: { email: string; password: string }) =>
  new Promise(
    async (resolve: (credentials: UserCredential) => void, reject) => {
      try {
        console.log('[AUTH][FIREBASE] emailLogin');
        const { email, password } = params;
        const credentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        resolve(credentials);
      } catch (error) {
        reject(error);
      }
    }
  );

export const logout = () => signOut(auth);