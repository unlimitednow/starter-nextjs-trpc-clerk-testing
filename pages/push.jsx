import { ClerkProvider, useUser, SignIn, SignedOut } from '@clerk/nextjs'


const Greeting = () => {
  // Use the useUser hook to get the Clerk.user object
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) {
    return null
  }
  return (<div>{user.firstName}</div>)
}

export default Greeting
