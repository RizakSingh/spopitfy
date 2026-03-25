import { initializeApp } from "firebase/app"
import { initializeAuth, inMemoryPersistence  } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import AsyncStorage from "@react-native-async-storage/async-storage"
const firebaseConfig = {
  apiKey: "AIzaSyAGGsMn0D63Px-YXd9Kj9_EbzgfvH5FJ1c",
  authDomain: "propify-8792f.firebaseapp.com",
  projectId: "propify-8792f",
  storageBucket: "propify-8792f.firebasestorage.app",
  messagingSenderId: "539672907634",
  appId: "1:539672907634:web:7ad1404ce80732ea0157eb",
  measurementId: "G-CQCSX82GRW"
}

export const app = initializeApp(firebaseConfig)

// ✅ This stops the warning — explicitly tells Firebase to use memory persistence
export const auth = initializeAuth(app, {
  persistence: inMemoryPersistence
})

export const db = getFirestore(app)
export const storage = getStorage(app)