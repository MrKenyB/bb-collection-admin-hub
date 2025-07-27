import { assets } from '@/asset'
import React, { FormEvent, useState } from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScaleLoader } from "react-spinners"
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { usePanel } from '@/hooks/usePanel';

function Add() {
   const [image1, setImage1] = useState<File | null>(null);
   const [image2, setImage2] = useState<File | null>(null);
   const [image3, setImage3] = useState<File | null>(null);
   const [image4, setImage4] = useState<File | null>(null);
   const [taille, setTaille] = useState('');
   const [caracteristique, setCaracteristique] = useState('');
   const [loading, setLoading] = useState(false)
   const { toast } = useToast();
   const {backendUrl} = usePanel()

   const [formData, setFormData] = useState({
      nom: '',
      prix: '',
      fakePrix: '',
      description: '',
      categorie: '',
      sexe:"",
      tailles: [],
      caracteristiques: [],
      isActive: true,
      stock: ''
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      const numberFields = ['prix', 'stock', 'fakePrix'];
      setFormData((prev) => ({
         ...prev,
         [name]: numberFields.includes(name) ? Number(value) : value,
      }));
   };

   const handleDisponibleChange = (e) => {
      const value = e.target.value;
      setFormData((prev) => ({
         ...prev,
         isActive: value === 'oui',
      }));
   };

   // tailles
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

   // caracteristiques
   const ajouterCaracteristique = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         e.preventDefault();
         if (caracteristique.trim() !== '') {
            setFormData((prev) => ({
               ...prev,
               caracteristiques: [...prev.caracteristiques, caracteristique.trim()],
            }));
            setCaracteristique('');
         }
      }
   };

   const supprimerTaille = (index: number) => {
      setFormData((prev) => ({
         ...prev,
         tailles: prev.tailles.filter((_, i) => i !== index),
      }));
   };
   const supprimerCaracteristique = (index: number) => {
      setFormData((prev) => ({
         ...prev,
         caracteristiques: prev.caracteristiques.filter((_, i) => i !== index),
      }));
   };
   

   const enregistrer = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      if (!image1) {
   
         toast({
            title: 'Image',
            description: 'Veuillez inclure une image',
         });
         setLoading(false); 
         return;
      }

      if (!formData.nom || !formData.categorie || !formData.sexe || !formData.tailles.length) {
         toast({
            title: 'Champs manquants',
            description: 'Veuillez remplir tous les champs requis.',
            variant: 'destructive',
         });
         setLoading(false);
         return;
      }

      
      try {
         const data = new FormData();

         data.append("image1", image1);                            
         data.append("image2", image2);                            
         data.append("image3", image3);                            
         data.append("image4", image4);                            
         data.append("nom", formData.nom);
         data.append("prix", JSON.stringify(formData.prix));     
         data.append("fakePrix", JSON.stringify(formData.fakePrix));     
         data.append("stock", JSON.stringify(formData.stock));   
         data.append("isActive", JSON.stringify(formData.isActive)); 
         data.append("description", formData.description);
         data.append("categorie", formData.categorie);
         data.append("sexe", formData.sexe);

         // tableau des tailles
         formData.tailles.forEach((taille, index) => {
            data.append(`tailles[${index}]`, taille);
         });
         

         // tableau des caracteristiques
         formData.caracteristiques.forEach((caracteristique, index) => {
            data.append(`caracteristiques[${index}]`, caracteristique);
         });
         
         const res = await axios.post(`${backendUrl}/api/article/add`, data)
         console.log('====================================');
         console.log(res.data);
         console.log('====================================');

         if (res.data.success) {
            setLoading(false)
            setFormData({
               nom: '',
               prix: '',
               fakePrix: '',
               description: '',
               categorie: '',
               sexe: '',
               tailles: [],
               caracteristiques : [],
               isActive: true,
               stock: ''
            });

            setImage1(null)
            setImage2(null)
            setImage3(null)
            setImage4(null)
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
            
            <div className='grid grid-cols-4 gap-6'>

               <label htmlFor="image1" className="w-[100px] h-[100px] cursor-pointer overflow-hidden rounded-md">
                  <img
                     className="w-full h-full object-cover"
                     src={!image1 ? assets.uploadArea : URL.createObjectURL(image1)}
                     alt="utilisateur"
                  />
                  <input
                     onChange={(e) => setImage1(e.target.files[0])}
                     type="file"
                     id="image1"
                     name="image1"
                     hidden
                  />
               </label>
               

               <label htmlFor="image2" className="w-[100px] h-[100px] cursor-pointer overflow-hidden rounded-md">
                  <img
                     className="w-full h-full object-cover"
                     src={!image2 ? assets.uploadArea : URL.createObjectURL(image2)}
                     alt="utilisateur"
                  />
                  <input
                     onChange={(e) => setImage2(e.target.files[0])}
                     type="file"
                     id="image2"
                     name="image2"
                     hidden
                  />
               </label>

               <label htmlFor="image3" className="w-[100px] h-[100px] cursor-pointer overflow-hidden rounded-md">
                  <img
                     className="w-full h-full object-cover"
                     src={!image3 ? assets.uploadArea : URL.createObjectURL(image3)}
                     alt="utilisateur"
                  />
                  <input
                     onChange={(e) => setImage3(e.target.files[0])}
                     type="file"
                     id="image3"
                     name="image3"
                     hidden
                  />
               </label>

               <label htmlFor="image4" className="w-[100px] h-[100px] cursor-pointer overflow-hidden rounded-md">
                  <img
                     className="w-full h-full object-cover"
                     src={!image4 ? assets.uploadArea : URL.createObjectURL(image4)}
                     alt="utilisateur"
                  />
                  <input
                     onChange={(e) => setImage4(e.target.files[0])}
                     type="file"
                     id="image4"
                     name="image4"
                     hidden
                  />
               </label>

            </div>

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
                  <Label htmlFor="description">Au lieu de : </Label>
                  <Input
                     id="fakePrix"
                     name="fakePrix"
                     type="number"
                     value={formData.fakePrix}
                     onChange={handleChange}
                     placeholder="Prix barré"
                     required
                  />
               </div>
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
            </div>

            <div className="w-full flex items-center justify-between gap-4">
            <div className="w-[90%]">
                  <Label htmlFor="categorie">Sexe</Label>
                  <select
                     id="sexe"
                     name="sexe"
                     value={formData.sexe}
                     onChange={handleChange}
                     className="flex h-10 w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                     <option value="" disabled hidden>Choisir un sexe</option>
                     <option value="homme">Masculin</option>
                     <option value="femme">Feminin</option>
                  </select>
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
                     <option value="sac">Sac</option>
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
                                 className="text-[.5rem]  text-red-700 hover:text-red-800 font-bold"
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

            <div className="w-full">
               <Label className='mb-1' htmlFor="caracteristique">Caracteristiques</Label>
               <Input
                  id="caracteristique"
                  type="text"
                  placeholder="Exemple: tres resistant(e)"
                  value={caracteristique}
                  onChange={(e) => setCaracteristique(e.target.value)}
                  onKeyDown={ajouterCaracteristique}
               />
               {formData.caracteristiques.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-4">
                     {formData.caracteristiques.map((t, idx) => (
                        <span
                           key={idx}
                           className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
                        >
                           {t}
                           <sup className = "px-1.5 py-2 rounded-full bg-red-600/15">
                              <button
                                 type="button"
                                 onClick={() => supprimerCaracteristique(idx)}
                                 className="text-[.5rem]  text-red-700 hover:text-red-800 font-bold"
                              >
                                 ✕
                              </button>
                           </sup>
                        </span>
                     ))}
                  </div>
               )}
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
