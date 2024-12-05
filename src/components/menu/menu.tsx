'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import Image from 'next/image'; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { RootState } from '@/redux/store/store'; 

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  duration?: string;
};

type OrderItem = {
  product: Product;
  quantity: number;
  notes: string;
};

const categories = ['Platos Principales', 'Pasteleria', 'Postres', 'Tragos'];

export default function Menu() {
  const [dishes, setDishes] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedDish, setSelectedDish] = useState<Product | null>(null);
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [tableNumber, setTableNumber] = useState(''); 


  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/products'); 
        if (!response.ok) throw new Error('Error al obtener los productos');
        const data = await response.json();
  
       
        const transformedData: Product[] = data.map((product: any) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: parseFloat(product.price), 
          image: product.images?.[0]?.url || '/images/sin-imagen.webp', 
          category: product.category,
          subcategory: product.subcategory,
          duration: product.duration,
        }));
  
        setDishes(transformedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  
    fetchProducts();
  }, []);

  const openModal = (dish: Product) => {
    setSelectedDish(dish);
    setQuantity(1);
    setNotes('');
  };

  const closeModal = () => {
    setSelectedDish(null);
  };

  const addToOrder = () => {
    if (selectedDish) {
      const existingItemIndex = order.findIndex(item => item.product.id === selectedDish.id);
      if (existingItemIndex !== -1) {
        const updatedOrder = [...order];
        updatedOrder[existingItemIndex].quantity += quantity;
        updatedOrder[existingItemIndex].notes +=
          (updatedOrder[existingItemIndex].notes ? '\n' : '') + notes;
        setOrder(updatedOrder);
      } else {
        setOrder([...order, { product: selectedDish, quantity, notes }]);
      }
      closeModal();
    }
  };

  const removeFromOrder = (index: number) => {
    const updatedOrder = order.filter((_, i) => i !== index);
    setOrder(updatedOrder);
  };

  const submitOrder = async () => {
    if (!tableNumber) {
      alert('Por favor, selecciona un número de mesa');
      return;
    }
    if (!user) {
      alert('No se pudo obtener el ID del mozo. Intenta iniciar sesión nuevamente.');
      return;
    }

    try {
      const mozoId = user.uuid;

      for (const item of order) {
        const pedidoData = {
          productoId: item.product.id,
          cantidad: item.quantity,
          notasAdicionales: item.notes,
          mozoId,
          tableNumber,
        };

        const response = await fetch('http://localhost:3000/pedidos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pedidoData),
        });

        if (!response.ok) {
          throw new Error('Error al enviar el pedido');
        }

        const data = await response.json();
        console.log('Producto enviado con éxito:', data);
      }

      setOrder([]); 
      setTableNumber('');
    } catch (error) {
      console.error('Error enviando el pedido:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-secondary mb-6">Nuestro Menú</h1>
      <div className="mb-4">
        <label htmlFor="tableNumber" className="block text-sm font-medium">
          Número de Mesa:
        </label>
        <Input
          id="tableNumber"
          type="text"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="Ingrese el número de la mesa"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Tabs defaultValue={categories[0]} className="w-full" onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map(category => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dishes
                    .filter(dish => dish.category === category)
                    .map(dish => (
                      <div
                        key={dish.id}
                        onClick={() => openModal(dish)}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                      >
            <Image
  src={dish.image || '/images/sin-imagen.webp'}  
  alt={dish.name}
  width={200}
  height={200}
  className="rounded-lg mx-auto my-4"
/>

                        <h3 className="font-semibold">{dish.name}</h3>
                        <p className="text-sm text-gray-500">${parseFloat(dish.price.toString()).toFixed(2)}</p>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Orden Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                {order.map((item, index) => (
                  <div key={index} className="flex justify-between items-start mb-4 p-2 border-b">
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm">Cantidad: {item.quantity}</p>
                      <p className="text-sm text-gray-500">${(item.product.price * item.quantity).toFixed(2)}</p>
                      {item.notes && <p className="text-xs text-gray-400">Notas: {item.notes}</p>}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFromOrder(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
              <div className="mt-4">
                <Button className="w-full mt-2" onClick={submitOrder} disabled={order.length === 0}>
                  Enviar Orden
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedDish && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedDish.name}</h2>
            <Image
              src={selectedDish.image || '/images/sin-imagen.webp'}
              alt={selectedDish.name}
              width={200}
              height={200}
              className="rounded-lg mx-auto my-4"
            />
            <p>{selectedDish.description}</p>
            <p className="font-bold mt-2">Precio: ${parseFloat(selectedDish.price.toString()).toFixed(2)}</p>

            <div className="flex items-center space-x-2 mt-4">
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16"
                min={1}
                max={10}
              />
              <Textarea
                placeholder="Notas adicionales"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full"
              />
            </div>
            <Button className="w-full mt-4" onClick={addToOrder}>
              Añadir a la orden
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
