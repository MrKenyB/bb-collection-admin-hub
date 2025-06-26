import { assets } from '@/asset'
import React, { useState } from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';



function Add() {

   const [image, setImage] = useState(null)
   const [formData, setFormData] = useState({
      nom: '',
      prix: 0,
      description: '',
      categorie: '',
      tailles: [],
      isActive: false,
      stock: 0
   })


   return (
      <div>
         <form className="w-full flex flex-col items-center justify-center gap-6">
            <label 
               htmlFor="image1" 
               className="w-[200px] h-[200px] cursor-pointer overflow-hidden rounded-md"
            >
               <img 
                  className="w-full h-full object-cover" 
                  src={!image ? assets.uploadArea : URL.createObjectURL(image)} 
                  alt="" 
               />
               <input 
                  onChange={(e) => setImage(e.target.files[0])} 
                  type="file" 
                  required 
                  id="image1" 
                  hidden 
               />
            </label>

            <div className='w-full flex items-center justify-between gap-4'>
               <div className="w-[90%]">
                  <Label htmlFor="Name">Nom</Label>
                  <Input
                     id="nom"
                     type="text"
                     placeholder="Nom de l'article"
                     required
                  />
               </div>
               <div className="w-[90%]">
                  <Label htmlFor="Prix">Prix</Label>
                  <Input
                     type="number"
                     placeholder="12"
                     required
                  />
               </div>
            </div>

            <div className='w-full flex items-center justify-between gap-4'>
               <div className="w-[90%]">
                  <Label htmlFor="Name">Description</Label>
                  <Input
                     type="text"
                     placeholder="Description en une ligne"
                     required
                  />
               </div>
               <div className="w-[90%]">
                  <Label htmlFor="Prix">Categorie</Label>
                  <select
                     className='flex h-10 w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                  >
                     <option value="vetement">vetement</option>
                     <option value="chaussure">chaussure</option>
                     <option value="accessoire">accessoire</option>
                     <option value="autre">autre</option>
                  </select>
               </div>
            </div>

            <div className="w-full">
               <Label htmlFor="Prix">Tailles</Label>
               <Input
                  type="text"
                  placeholder="Exemple: XL , L ou encore 21, 34, 56"
                  required
               />
            </div>

            <div className='w-full flex items-center justify-between gap-4'>
               <div className="w-[90%]">
                  <Label htmlFor="Prix">Actuellement disponible ?</Label>
                  <select
                     className='flex h-10 w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                  >
                     <option value="oui">Oui</option>
                     <option value="non">Non</option>
                  </select>
               </div>
               <div className="w-[90%]">
                  <Label htmlFor="Name">Quantite</Label>
                  <Input
                     type="Number"
                     min={0}
                     placeholder='0'
                     required
                  />
               </div>
            </div>

            <div className='w-full  text-white font-bold flex items-center justify-center my-[2rem]'>
               <button className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-700 transition-all duration-200 hover:to-purple-700 hover:scale-75 px-3 py-1 rounded-md'>Enregistrer</button>
            </div>
         </form>
      </div>
   )
}

export default Add