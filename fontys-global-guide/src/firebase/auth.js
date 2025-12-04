import { auth } from "./config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import { db } from "./config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
 
 
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
 
 
export const signupWithEmail = async (email, password, options = { saveToFirestore: true }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (options.saveToFirestore) {
    try {
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Kon gebruiker niet opslaan in Firestore:", err);
    }
  }
  return userCredential;
};
 
export const sendPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};
 
export const logout = () => {
  return signOut(auth);
};