"use client";

import { cartAtom } from "@/atoms/cart";
import { H1, P, List, H2, H3, H4, H5 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import React from "react";

function CartPage() {
  const [cart, setCart] = useAtom(cartAtom);
  return (
    <div>
      <H1>Cart</H1>
      <P>Items in your cart: {cart.length}</P>
      <List>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </List>
      <Button onClick={() => setCart([])}>Clear Cart</Button>
      <Button
        onClick={() => alert("Checkout functionality not implemented yet")}
      >
        Checkout
      </Button>

      <P>
        Note: This is a simple cart page. In a real application, you would
        likely have more complex state management and API calls.
      </P>
      <P>
        Feel free to add more items to the cart or implement additional
        features!
      </P>

      <H2>Cart Management</H2>
      <P>You can add items to the cart from other parts of the application.</P>
      <P>
        For example, you might have a product listing page where users can
        select items to add to their cart.
      </P>

      <H3>Example Item</H3>
      <P>Item: Sample Product</P>
      <P>Price: $10.00</P>
      <Button
        onClick={() =>
          setCart([...cart, { name: "Sample Product", price: 10 }])
        }
      >
        Add Sample Product
      </Button>

      <H3>Cart Summary</H3>
      <P>Total Items: {cart.length}</P>
      <P>
        Total Price: $
        {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
      </P>

      <H4>Thank you for using our cart system!</H4>
      <P>We hope you enjoy shopping with us.</P>
      <P>If you have any questions or feedback, feel free to reach out.</P>

      <H5>Happy Shopping!</H5>
    </div>
  );
}

export default CartPage;
