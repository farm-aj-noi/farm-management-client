import React, { createContext, useState, useEffect } from "react"
import Router from "next/router"
import Cookies from "js-cookie"

export const AuthContext = createContext()

const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useState(userData)

  //  console.log(user)

  useEffect(() => {
    const syncLogout = e => {
      if (e.key === "logout") {
        setUser(null)
        Router.push("/")
      }
    }

    window.addEventListener("storage", syncLogout)

    return () => {
      window.removeEventListener("storage", syncLogout)
      window.localStorage.removeItem("logout")
    }
  }, [])

  const setAuthUser = userInfo => setUser(userInfo)

  const signout = () => {
    Cookies.remove("jwt")
    setUser(null)
    localStorage.setItem("logout", Date.now())
    Router.reload("/")
  }

  return (
    <AuthContext.Provider value={{ user, setAuthUser, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider