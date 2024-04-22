import { addContest } from "@/app/_fetch/post";
import { Metadata } from "next";
import { contest } from "../_forms";

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
                <h2 className="uppercase my-4">Creación de concurso</h2>
                <form 
                    className="flex flex-col gap-2 w-full"
                    action={ addContest }
                >
                    {
                        contest.map((field, index) => {
                            return (
                                <label key={ index } className="w-full flex flex-col pb-1">
                                    <div className="w-full">{ field.label }</div>
                                    <input className="w-full rounded-sm" type="text" name={ field.name }/>
                                </label>
                            )
                        })
                    }
                    <input type="submit" value={ 'Crear' }/>
                </form>
            </div>
        </main>
    )
}
