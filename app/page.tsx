import CardIdForm from "@/components/cardIdForm";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto">
      <Header />
      <main className="border-2 border-solid border-black rounded-md p-24 ">
        <div className="py-4 w-full">
          <h1 className="text-center text-3xl mb-10">KYC with Card ID</h1>
          <CardIdForm />
        </div>
      </main>
    </div>
  );
}
