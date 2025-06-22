import Loading from "@/app/dashboard/loading";
import Dashboard from "@/components/dashboard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

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

export default async function Page() {
  const session = await getServerSession(authOptions);
  const jwt = session?.accessToken;

  const response = await fetch("http://localhost:8000/api/v1/products/", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Error fetching data:", response.status, data);

    return (
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-md shadow-md">
          <svg
            className="w-12 h-12 text-red-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01"
            />
          </svg>
          <h1 className="text-2xl font-semibold text-red-600 mb-2">
            Error fetching data
          </h1>
          <p className="text-red-500 mb-1">Status: {response.status}</p>
          <p className="text-gray-500">
            Please try again later or contact support.
          </p>
        </div>
      </Suspense>
    );
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Dashboard
          count={data.count}
          next={data.next}
          previous={data.previous}
          results={data.results}
        />
      </Suspense>
    </>
  );
}
