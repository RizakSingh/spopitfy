import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from './firebase'

const storage = getStorage(app)

export const uploadImage = async (uri: string, userId: string) => {
  const response = await fetch(uri)
  const blob = await response.blob()

  const storageRef = ref(storage, `proofs/${userId}/${Date.now()}.jpg`)

  await uploadBytes(storageRef, blob)

  return await getDownloadURL(storageRef)
}