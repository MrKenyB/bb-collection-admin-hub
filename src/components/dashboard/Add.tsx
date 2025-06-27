import { assets } from '@/asset'
import React, { FormEvent, useState } from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScaleLoader } from "react-spinners"
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { usePanel } from '@/hooks/usePanel';

function Add() {
   const [image, setImage] = useState<File | null>(null);
   const [taille, setTaille] = useState('');
   const [loading, setLoading] = useState(false)
   const { toast } = useToast();
   const {backendUrl} = usePanel()

   const [formData, setFormData] = useState({
      nom: '',
      prix: 0,
      description: '',
      categorie: '',
      tailles: [],
      isActive: true,
      stock: 0
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: name === 'prix' || name === 'stock' ? Number(value) : value,
      }));
   };

   const handleDisponibleChange = (e) => {
      const value = e.target.value;
      setFormData((prev) => ({
         ...prev,
         isActive: value === 'oui',
      }));
   };

   const ajouterTaille = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         e.preventDefault();
         if (taille.trim() !== '') {
            setFormData((prev) => ({
               ...prev,
               tailles: [...prev.tailles, taille.trim()],
            }));
            setTaille('');
         }
      }
   };

   const supprimerTaille = (index: number) => {
      setFormData((prev) => ({
         ...prev,
         tailles: prev.tailles.filter((_, i) => i !== index),
      }));
   };
   

   const enregistrer = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      if (!image) {
   
         toast({
            title: 'Image',
            description: 'Veuillez inclure une image',
         });
         setLoading(false); 
         return;
      }

      try {
         const data = new FormData();

         data.append("image", image);                            
         data.append("nom", formData.nom);
         data.append("prix", JSON.stringify(formData.prix));     
         data.append("stock", JSON.stringify(formData.stock));   
         data.append("isActive", JSON.stringify(formData.isActive)); 
         data.append("description", formData.description);
         data.append("categorie", formData.categorie);

         // tableau des tailles
         formData.tailles.forEach((taille, index) => {
            data.append(`tailles[${index}]`, taille);
         });
         
         const res = await axios.post(`${backendUrl}/api/article/add`, data)
         console.log('====================================');
         console.log(res.data);
         console.log('====================================');

         if (res.data.success) {
            setLoading(false)
            setFormData({
               nom: '',
               prix: 0,
               description: '',
               categorie: '',
               tailles: [],
               isActive: true,
               stock: 0
            });

            setImage(null)
         }
      } catch (err) {
         setLoading(false)
         console.log('====================================');
         console.log(err);
         console.log('====================================');
         toast({
            title: 'Erreur',
            description: err.message || 'Une erreur est survenue',
            variant: 'destructive',
         });
      }
      
   }

   return (
      <div>
         <form onSubmit={enregistrer} className="w-full flex flex-col items-center justify-center gap-6">
            <label htmlFor="image" className="w-[200px] h-[200px] cursor-pointer overflow-hidden rounded-md">
               <img
                  className="w-full h-full object-cover"
                  src={!image ? assets.uploadArea : URL.createObjectURL(image)}
                  alt="utilisateur"
               />
               <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  name="image"
                  hidden
               />
            </label>

            <div className="w-full flex items-center justify-between gap-4">
               <div className="w-[90%]">
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                     id="nom"
                     name="nom"
                     type="text"
                     value={formData.nom}
                     onChange={handleChange}
                     placeholder="Nom de l'article"
                     required
                  />
               </div>
               <div className="w-[90%]">
                  <Label htmlFor="prix">Prix</Label>
                  <Input
                     id="prix"
                     name="prix"
                     type="number"
                     value={formData.prix}
                     onChange={handleChange}
                     placeholder="12"
                     required
                  />
               </div>
            </div>

            <div className="w-full flex items-center justify-between gap-4">
               <div className="w-[90%]">
                  <Label htmlFor="description">Description</Label>
                  <Input
                     id="description"
                     name="description"
                     type="text"
                     value={formData.description}
                     onChange={handleChange}
                     placeholder="Description en une ligne"
                     required
                  />
               </div>
               <div className="w-[90%]">
                  <Label htmlFor="categorie">Catégorie</Label>
                  <select
                     id="categorie"
                     name="categorie"
                     value={formData.categorie}
                     onChange={handleChange}
                     className="flex h-10 w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                     <option value="" disabled hidden>Choisir une catégorie</option>
                     <option value="vetement">Vêtement</option>
                     <option value="chaussure">Chaussure</option>
                     <option value="accessoire">Accessoire</option>
                     <option value="autre">Autre</option>
                  </select>
               </div>
            </div>

            <div className="w-full">
               <Label htmlFor="taille">Tailles</Label>
               <Input
                  id="taille"
                  type="text"
                  placeholder="Exemple: XL, L ou 21, 34, 56"
                  value={taille}
                  onChange={(e) => setTaille(e.target.value)}
                  onKeyDown={ajouterTaille}
               />
               {formData.tailles.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-4">
                     {formData.tailles.map((t, idx) => (
                        <span
                           key={idx}
                           className="bg-gray-200 font-bold px-2 py-1 rounded flex items-center gap-1"
                        >
                           {t}
                           <sup className = "px-1.5 py-2 rounded-full bg-red-600/15">
                              <button
                                 type="button"
                                 onClick={() => supprimerTaille(idx)}
                                 className="text-[.5rem] font-normal text-red-700 hover:text-red-800 font-bold"
                              >
                                 ✕
                              </button>
                           </sup>
                        </span>
                     ))}
                  </div>
               )}
            </div>

            <div className="w-full flex items-center justify-between gap-4">
               <div className="w-[90%]">
                  <Label htmlFor="disponible">Actuellement disponible ?</Label>
                  <select
                     id="disponible"
                     onChange={handleDisponibleChange}
                     className="flex h-10 w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                     <option value="oui">Oui</option>
                     <option value="non">Non</option>
                  </select>
               </div>
               <div className="w-[90%]">
                  <Label htmlFor="stock">Quantité</Label>
                  <Input
                     id="stock"
                     name="stock"
                     type="number"
                     min={0}
                     value={formData.stock}
                     onChange={handleChange}
                     placeholder="0"
                     required
                  />
               </div>
            </div>

            <div className="w-full text-white font-bold flex items-center justify-center my-[2rem]">
               {
                  loading ? 
                     <ScaleLoader/>
                     :
                     <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-700 hover:to-purple-700 hover:scale-95 transition-all duration-200 px-4 py-2 rounded-md"
                     >
                        Enregistrer
                     </button>
               }
            </div>
         </form>
      </div>
   );
}

export default Add;
