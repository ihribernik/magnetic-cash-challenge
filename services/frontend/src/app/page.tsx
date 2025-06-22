"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { H1, H2, P, List } from "@/components/typography";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <nav className="w-full flex items-center justify-between py-4 px-6 bg-background shadow mb-8 rounded-b-xl border-b">
        <span className="text-xl font-bold text-primary">
          Magnetic Cash Shoes
        </span>
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10"
          onClick={() => router.push("/auth/login")}
        >
          Iniciar sesión
        </Button>
      </nav>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="bg-background rounded-xl shadow-lg p-8 max-w-xl w-full text-center border">
          <H1 className="text-3xl font-bold text-primary mb-4">
            Magnetic Cash Shoes
          </H1>
          <H2 className="text-xl font-semibold text-muted-foreground mb-6">
            Desafío Técnico - Programador/a Full Stack
          </H2>
          <P>
            Bienvenido/a a la tienda de calzado desarrollada para el desafío
            técnico de Magnetic Cash.
          </P>
          <List className="text-left text-foreground mb-6 list-disc list-inside space-y-1">
            <li>Visualiza entre 10 y 15 productos de calzado.</li>
            <li>Agrega productos al carrito y revisa tu pedido.</li>
            <li>Simula el proceso de compra con un pseudo-checkout.</li>
            <li>
              Frontend en React, Backend en Django, orquestado con Docker.
            </li>
          </List>
          <P className="text-muted-foreground text-sm mb-2">
            El objetivo es demostrar habilidades Full Stack modernas, buenas
            prácticas y enfoque integral.
          </P>
          <P className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Magnetic Cash. Desafío confidencial.
          </P>
        </div>
      </div>
    </main>
  );
}
