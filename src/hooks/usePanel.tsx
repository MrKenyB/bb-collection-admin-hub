import { PanelContext } from "@/context/PanelContext"
import { useContext } from "react"



export const usePanel = () => {
   const context = useContext(PanelContext)
   if (!context) {
      throw new Error("usePanel doit être utilisé à l'intérieur d'un PanelProvider")
   }
   return context
}