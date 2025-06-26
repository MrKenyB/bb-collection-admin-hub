import { isLastDayOfMonth } from "date-fns";
import { useContext, createContext, ReactNode, useState, useEffect } from "react";
import React from "react";
import axios  from 'axios'


interface PanelContextType{
   backendUrl: string,
   setIsLoggedIn: (state: boolean) => void,
   isLoggedIn: boolean
}




export const PanelContext = createContext<PanelContextType | null>(null);

export const PanelProvider = ({ children }: { children: ReactNode }) => {

   axios.defaults.withCredentials = true
   const backendUrl = import.meta.env.VITE_BACKEND_URL
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   // checker si le user est connecte

   const isAuth = async () => {
      try {
         const res = await axios.get(`${backendUrl}/api/administrateur/is-auth`)
         
         if (res.data.success) {
            setIsLoggedIn(true)
         } else {
            setIsLoggedIn(false)
         }
      } catch (error) {
         console.log('====================================');
         console.log(error);
         console.log('====================================');
         setIsLoggedIn(false)
      }
   }


   useEffect(() => {
      isAuth()
   }, [])
   
   const value = {
      backendUrl,
      isLoggedIn,
      setIsLoggedIn
   }
   
   return <PanelContext.Provider value={value}>
      {children}
   </PanelContext.Provider>
}


