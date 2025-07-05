
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { usePanel } from '@/hooks/usePanel';




export const ProductsPage = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast();
  const {backendUrl} = usePanel()



  const getStatusBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Rupture</Badge>;
    } else if (stock < 10) {
      return <Badge variant="secondary">Stock faible</Badge>;
    } else {
      return <Badge variant="default" className="bg-green-100 text-green-800">Disponible</Badge>;
    }
  };

  const getarticles = async() => {
    try {
      setLoading(true)
      const res = await axios.get(`${backendUrl}/api/article/articles`)
      
      console.log('====================================');
      console.log(res.data);
      console.log('====================================');

      if (res.data.success) {
        setLoading(false)
        setArticles(res.data.articles.reverse())
      }

    } catch (error) {
      setLoading(false)
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      toast({
          title: 'Erreur',
          description: error.message || 'Une erreur est survenue',
          variant: 'destructive',
      });
    }
  }

  useEffect(() => {
    getarticles()
  }, [])
  
  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Gestion des produits</h2>
          <p className="text-gray-600">Gérez votre catalogue de produits BB_COLLECTION</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau produit
        </Button>
      </div>


      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {
                  articles.map((item, ind) => (
                    <SelectItem key={ind} value={ item.categorie}>{item.categorie}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des produits</CardTitle>
          <CardDescription>
            {articles?.length} produits au total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image[0]}
                        alt={product.nom}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{product.nom}</div>
                        {/* <div className="text-sm text-gray-500">ID: {product.id}</div> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.categorie}</TableCell>
                  <TableCell className="font-medium">{product.prix} F</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{getStatusBadge(product.stock)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
