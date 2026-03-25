import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth'
import { app } from './firebase'

WebBrowser.maybeCompleteAuthSession()

const auth = getAuth(app)

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_EXPO_CLIENT_ID',
  })

  const handleGoogleLogin = async () => {
    const result = await promptAsync()

    if (result.type === 'success') {
      const { id_token } = result.params

      const credential = GoogleAuthProvider.credential(id_token)

      return signInWithCredential(auth, credential)
    }
  }

  return { handleGoogleLogin }
}