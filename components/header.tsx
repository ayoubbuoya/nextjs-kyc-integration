import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky container mx-auto border-2 border-solid border-neutral-600 py-2 px-4 my-4 flex justify-between items-center bg-white rounded-md">
      <div>Buoya</div>
      <nav className="flex items-center justify-around gap-8">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
