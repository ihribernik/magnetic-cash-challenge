export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="animate-spin rounded-full border-4 border-blue-500 border-t-transparent h-16 w-16"></div>
      <p className="mt-4 text-gray-500">Loading...</p>
    </div>
  );
}
