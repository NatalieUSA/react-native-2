
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmjEenxpsTfWUHgv1A6bwSkMCNO_-xPCQ",
  authDomain: "goit-rnative.firebaseapp.com",
  databaseURL: "https://goit-rnative.firebaseio.com",
  projectId: "goit-rnative",
  storageBucket: "goit-rnative.appspot.com",
  messagingSenderId: "774413772887",
  appId: "1:774413772887:web:cf4ce84cab7b9df93b1b12",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);