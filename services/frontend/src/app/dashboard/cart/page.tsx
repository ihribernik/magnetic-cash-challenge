"use client";

import { cartAtom } from "@/atoms/cart";
import { H1, H2, List, P } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { DJANGO_API_URL } from "@/constants/auth";
import { getValidAccessToken } from "@/lib/auth";
import { CustomSession } from "@/types/auth";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type OrderItem = {
  product_id: string;
  amount: number;
};

type Order = {
  client_name: string;
  purchase_date: string;
  items: OrderItem[];
};

function CartPage() {
  const { data: session } = useSession() as {
    data: CustomSession | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };
  const [cart, setCart] = useAtom(cartAtom);

  const handleClearCart = () => setCart([]);

  const handleCheckout = async () => {
    const accessToken = await getValidAccessToken(session);

    const order: Order = {
      client_name: session?.user.username || "Guest",
      purchase_date: new Date().toISOString(),
      items: cart.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.product_id === item.id);
        if (existingItem) {
          existingItem.amount += 1;
        } else {
          acc.push({
            product_id: item.id,
            amount: 1,
          });
        }
        return acc;
      }, [] as OrderItem[]),
    };

    console.log("DJANGO_API_URL:", DJANGO_API_URL);

    const response = await fetch(`${DJANGO_API_URL}/api/v1/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(order),
    });

    console.log("Checkout response:", response);

    if (response.ok) {
      toast.success("Order placed successfully!");
      setCart([]);
    } else {
      const errorMessage = response.statusText || "Failed to place order";
      toast.error(`Error placing order: ${errorMessage}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="max-w-xl mx-auto p-4 w-full">
        <H1 className="text-3xl font-bold text-primary mb-4 text-center">
          Cart
        </H1>
        <H2 className="text-lg mb-2 text-center">Cart Summary</H2>
        <div className="flex flex-col sm:flex-row sm:justify-between mb-2 gap-2">
          <P>Total Items: {cart.length}</P>
          <P>
            Total Price: $
            {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
          </P>
        </div>
        <List className="mb-4 divide-y divide-muted">
          {cart.map((item, index) => (
            <li key={index} className="py-2 flex justify-between items-center">
              <span className="truncate">{item.name}</span>
              <span className="ml-2 font-semibold">${item.price}</span>
            </li>
          ))}
        </List>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant={"destructive"}
            onClick={handleClearCart}
            disabled={cart.length === 0}
            className="w-full sm:w-auto"
          >
            Clear Cart
          </Button>
          <Button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full sm:w-auto"
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
