
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Mail, UserCheck, UserX } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockCustomers = [
  {
    id: 1,
    name: 'Marie Dupont',
    email: 'marie.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    orders: 8,
    totalSpent: 1245.50,
    lastOrder: '2024-01-15',
    status: 'Actif'
  },
  {
    id: 2,
    name: 'Jean Martin',
    email: 'jean.martin@email.com',
    phone: '+33 6 98 76 54 32',
    orders: 3,
    totalSpent: 456.75,
    lastOrder: '2024-01-10',
    status: 'Actif'
  },
  {
    id: 3,
    name: 'Sophie Bernard',
    email: 'sophie.bernard@email.com',
    phone: '+33 6 55 44 33 22',
    orders: 12,
    totalSpent: 2890.00,
    lastOrder: '2024-01-14',
    status: 'VIP'
  },
  {
    id: 4,
    name: 'Pierre Dubois',
    email: 'pierre.dubois@email.com',
    phone: '+33 6 11 22 33 44',
    orders: 1,
    totalSpent: 89.99,
    lastOrder: '2024-01-05',
    status: 'Nouveau'
  },
  {
    id: 5,
    name: 'Anna Silva',
    email: 'anna.silva@email.com',
    phone: '+33 6 77 88 99 00',
    orders: 0,
    totalSpent: 0,
    lastOrder: '-',
    status: 'Inactif'
  },
];

export const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'VIP':
        return <Badge className="bg-gold-100 text-gold-800">VIP</Badge>;
      case 'Actif':
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case 'Nouveau':
        return <Badge className="bg-blue-100 text-blue-800">Nouveau</Badge>;
      case 'Inactif':
        return <Badge variant="secondary">Inactif</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Gestion des clients</h2>
        <p className="text-gray-600">Gérez votre base de clients Syna-shop</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">2,847</p>
                <p className="text-sm text-gray-600">Clients actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">143</p>
                <p className="text-sm text-gray-600">Nouveaux ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-gray-600">Clients VIP</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <UserX className="h-8 w-8 text-gray-600" />
              <div>
                <p className="text-2xl font-bold">234</p>
                <p className="text-sm text-gray-600">Inactifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des clients</CardTitle>
          <CardDescription>
            {mockCustomers.length} clients trouvés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Commandes</TableHead>
                <TableHead>Total dépensé</TableHead>
                <TableHead>Dernière commande</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500">ID: {customer.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{customer.orders}</TableCell>
                  <TableCell className="font-medium">€{customer.totalSpent}</TableCell>
                  <TableCell>
                    {customer.lastOrder !== '-' 
                      ? new Date(customer.lastOrder).toLocaleDateString('fr-FR')
                      : customer.lastOrder
                    }
                  </TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
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
