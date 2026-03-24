import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
} from 'firebase/firestore'
import { app } from './firebase'

const db = getFirestore(app)

export const createUserDoc = async (userId: string, email: string) => {
  await setDoc(doc(db, 'users', userId), {
    email,
    createdAt: new Date(),
    streak: 0,
  })
}

export const createPost = async (userId: string, imageUrl: string) => {
  await addDoc(collection(db, 'posts'), {
    userId,
    imageUrl,
    createdAt: new Date(),
  })
}

export { db }