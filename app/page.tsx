import Link from "next/link";

export default async function HomePage() {

  return (
    <main className="p-8">
      <Link href={"/products"}>Go to Products</Link>
    </main>
  );
}
