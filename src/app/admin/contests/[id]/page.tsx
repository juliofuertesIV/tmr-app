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
            <div className="w-full max-w-xl mx-auto">
                <h2 className="uppercase my-4">Concurso</h2>
            </div>
        </main>
    )
}
