import { isLastDayOfMonth } from "date-fns";
import { useContext, createContext, ReactNode, useState } from "react";
import React from "react";


interface PanelContextType{
   backendUrl: string,
   setIsLoggedIn: (state: boolean) => void,
   isLoggedIn: boolean
}




export const PanelContext = createContext<PanelContextType | null>(null);

export const PanelProvider = ({ children }: { children: ReactNode }) => {

   const backendUrl = import.meta.env.VITE_BACKEND_URL
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const value = {
      backendUrl,
      isLoggedIn,
      setIsLoggedIn
   }
   
   return <PanelContext.Provider value={value}>
      {children}
   </PanelContext.Provider>
}


