// AuthContext.tsx

import { createContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface User {
  user: any
  id: string
}

interface AuthContextValue {
  user: User | null
}
export const AuthContext = createContext<AuthContextValue>({
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
  export async function registerName(username: any, userID:any) {
    console.log(userID)
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ username, id: userID }])
    if (error) {
      console.log(error)
    }
    console.log(data)
  }
  export async function getUser(userID: string) {
    userID.trim()
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', userID)
    if (error) {
      console.log(error)
    }
    console.log(data)
    return data
  }
  export async function getAllPosts(){
    const { data, error } = await supabase
      .from('posts')
      .select('*')
    if (error) {
      console.log(error)
    }
    console.log(data)
    return data
  }
  export async function makeAPost(content: string, userID: string, username: string){
    const { data, error } = await supabase
      .from('posts')
      .insert([{ content, user_id: userID, username }])
    if (error) {
      console.log(error)
    }
    console.log(data)
    return data
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
  return (
    <AuthContext.Provider value={{ user }}>
      {children} 
    </AuthContext.Provider>
  )
}

export type {User}