"use client";

import { ShoppingCart } from "lucide-react";
import { useAtom } from "jotai";
import { cartAtom } from "@/atoms/cart";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function CartIcon() {
  const router = useRouter();
  const [cart] = useAtom(cartAtom);
  const count = cart.length;

  return (
    <Button
      variant="ghost"
      className="relative flex items-center justify-center p-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      onClick={() => router.push("/dashboard/cart")}
    >
      <ShoppingCart size={28} />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
          {count}
        </span>
      )}
    </Button>
  );
}
