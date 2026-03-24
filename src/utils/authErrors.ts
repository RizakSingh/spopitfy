export const getAuthError = (code: string) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Account already exists'
    case 'auth/invalid-email':
      return 'Invalid email'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters'
    case 'auth/user-not-found':
      return 'No account found'
    case 'auth/wrong-password':
      return 'Incorrect password'
    default:
      return 'Something went wrong'
  }
}