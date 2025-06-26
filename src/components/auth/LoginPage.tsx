/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { usePanel } from '@/hooks/usePanel';
import {PacmanLoader} from 'react-spinners'
import axios from 'axios'
import { sign } from 'crypto';
axios.defaults.withCredentials = true;



export const LoginPage = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { backendUrl, setIsLoggedIn } = usePanel();
  const [login, setLogin] = useState<boolean>(true);

  const signIn = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/administrateur/login`, { password, email });
      // console.log('================ connnexion ====================');
      // console.log(res.data);
      // console.log('====================================');

      if (res.data.success) {
        setIsLoading(false);
        setEmail('');
        setPassword('');
        toast({
          title: 'Connexion réussie',
          description: 'Bienvenue dans votre dashboard Syna-shop',
        });
        setIsLoggedIn(true);
      } else {
        setIsLoading(false);
        toast({
          title: 'Erreur de connexion',
          description: res.data.message,
          variant: 'destructive',
        });
      }
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'Erreur inconnue';
      setIsLoading(false);
      toast({
        title: 'Erreur',
        description: message,
        variant: 'destructive',
      });
    }
  };

  const signUp = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/administrateur/register`, {
        nom,
        prenom,
        email,
        password,
      });

      console.log('================ creation de compte ====================');
      console.log(res.data);
      console.log('====================================');

      if (res.data.success) {
        setIsLoading(false);
        setNom('');
        setPrenom('');
        setEmail('');
        setPassword('');
        toast({
          title: 'Inscription réussie',
          description: 'Votre compte a été créé avec succès.',
        });
        setLogin(true);
      } else {
        setLogin(false);
        setIsLoading(false);
      }
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'Erreur inconnue';
      setIsLoading(false);
      toast({
        title: 'Erreur',
        description: message,
        variant: 'destructive',
      });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    login ? signIn() : signUp();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full   max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center m">
            <span className="text-2xl font-bold text-white">SH</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Syna-Shop</CardTitle>
          <CardDescription>Dashboard Administrateur</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            
            {
              !login && (
                <div className="space-y-2">
                  <Label htmlFor="Name">Nom</Label>
                  <Input
                    id="nom"
                    type="text"
                    placeholder="Ex: Makaya"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                  />
                </div>
              )
            }
            {
              !login && (
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prenom</Label>
                  <Input
                    id="prenom"
                    type="text"
                    placeholder="Ex: pauline"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                  />
                </div>
              )
            }

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='w-full flex items-center justify-center'>

              {
                isLoading ?
                  <PacmanLoader />
                  :
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {login ? "Se connecter" : "Enregistrer"}
                  </Button>
              }
              
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            {
              login? 
                (
                  <div>
                    <p>Vous n'avez pas de compte ? </p>
                    <p className='text-blue-600 cursor-pointer font-bold' onClick={() => setLogin(false)}>Creer un compte</p>
                  </div>
                )
              : 
                (
                  <div>
                    <p>Vous avez deja un compte ? </p>
                    <p className='text-blue-600 cursor-pointer font-bold' onClick={() => setLogin(true)}>se connecter</p>
                  </div>
                )
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
