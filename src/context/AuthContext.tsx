// AuthContext.tsx

import { createContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const AuthContext = createContext({
    user: null,
})
interface AuthProviderProps {
    children: React.ReactNode
  }

  export async function signUp(email: any,password: any) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
  }
  export async function signInWithEmail(email: any,password: any) {
    const { error, user } = await supabase.auth.signInWithPassword({
      email,
      password,
    }) as any
    if (error) throw error
    console.log('user', user)
  }

  export async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  export async function validateUserName(username: any) {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
    if (error) {
      console.log(error)
    }
    console.log(data)
    // if (data) {
    //   return false
    // } else {
    //   return true
    // }
    if(data === null){
      return false
    }
    if(data.length > 0){
      return true
    } 
    return false
  }
  
export const AuthProvider = ({ children }:AuthProviderProps) => {
  const [user, setUser] = useState<any|null>()
console.log('current user', user)
  // Check active sessions and sets the user
  useEffect(() => {
    const session:any = supabase.auth.getSession()

    setUser(session?.user ?? null)

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session)
    })

    return () => {
      (listener as any).unsubscribe()
    }
  }, [])

  // Rest of context provider
console.log(children)
  return (
    <AuthContext.Provider value={{ user }}>
      {children} 
    </AuthContext.Provider>
  )
}