"use client";
import { cartAtom } from "@/atoms/cart";
import { useAtom } from "jotai";
import { useState } from "react";
import { toast } from "sonner";

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  stock: number;
};

type DashboardProps = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
};

function Dashboard({ count, next, previous, results }: DashboardProps) {
  const [cart, setCart] = useAtom(cartAtom);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.filter(
        (item) => item.id === String(product.id)
      );

      if (existingItem.length > product.stock) {
        toast.error("No puedes agregar más productos de los que hay en stock.");
        return prev;
      }

      if (product.stock <= 0) {
        toast.error("No hay stock disponible para este producto.");
        return prev;
      }

      const newItem = {
        id: String(product.id),
        name: product.name,
        price: parseFloat(product.price),
        quantity: 1,
      };

      toast.success("Producto agregado al carrito.");
      return [...prev, newItem];
    });
  };

  return (
    <>
      {results.map((product: Product) => (
        <div key={product.id} className="p-4 border rounded mb-4">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-green-600">${product.price}</p>
          <p className="text-gray-500">Stock: {product.stock}</p>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto mt-2"
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
          </button>
        </div>
      ))}
    </>
  );
}

export default Dashboard;
