import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Panel de administración TMR | Gestión de concursos",
    description: "El buen admin panel"
  };

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <header className="flex py-8 justify-center">
                <h1>GESTIÓN DE CONCURSOS</h1>
            </header>
            <menu className="flex justify-center gap-4">

   
            </menu>
        </main>
    )
}
