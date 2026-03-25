import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

/* =========================
   👤 CREATE USER
========================= */
export const createUserDoc = async (userId: string, email: string) => {
  await setDoc(doc(db, 'users', userId), {
    email,
    createdAt: serverTimestamp(),
    streak: 0,
    lastUploadDate: null,
  })
}

/* =========================
   📸 CREATE POST
========================= */
export const createPost = async (userId: string, imageUrl: string) => {
  await addDoc(collection(db, 'posts'), {
    userId,
    imageUrl,
    createdAt: serverTimestamp(),
  })
}

/* =========================
   📊 GET USER DATA
========================= */
export const getUserData = async (userId: string) => {
  const ref = doc(db, 'users', userId)
  const snap = await getDoc(ref)

  if (!snap.exists()) return null

  return snap.data()
}

/* =========================
   🖼️ GET USER POSTS (FEED)
========================= */
export const getUserPosts = async (userId: string) => {
  const q = query(
    collection(db, 'posts'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

/* =========================
   🔥 UPDATE STREAK
========================= */
export const updateStreak = async (userId: string) => {
  const userRef = doc(db, 'users', userId)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) return

  const data = userSnap.data()

  const today = new Date().toISOString().split('T')[0]
  const lastDate = data.lastUploadDate

  let newStreak = data.streak || 0

  // ✅ First upload ever
  if (!lastDate) {
    newStreak = 1
  }
  // ✅ Already uploaded today
  else if (lastDate === today) {
    return
  }
  else {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    // ✅ Continue streak
    if (lastDate === yesterdayStr) {
      newStreak += 1
    }
    // ❌ Break streak → reset
    else {
      newStreak = 1
    }
  }

  await updateDoc(userRef, {
    streak: newStreak,
    lastUploadDate: today,
  })
}