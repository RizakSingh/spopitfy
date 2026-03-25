import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'

export const uploadImage = async (uri: string, userId: string) => {
  try {
    console.log("📸 Uploading image:", uri)

    const response = await fetch(uri)
    const blob = await response.blob()

    const fileName = `proofs/${userId}/${Date.now()}.jpg`
    const storageRef = ref(storage, fileName)

    await uploadBytes(storageRef, blob)

    const downloadURL = await getDownloadURL(storageRef)

    console.log("✅ Uploaded URL:", downloadURL)

    return downloadURL
  } catch (error) {
    console.log("❌ Upload error:", error)
    throw error
  }
}