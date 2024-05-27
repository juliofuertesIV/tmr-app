import { cookies } from "next/headers";
import LoginForm from "./_components/LoginForm";
import { decryptJWT } from "@/auth";
import TMRLogo from "../admin/_layout/_design/TmrLogo";

export default async function LoginPage() {

    const currentSession = cookies().get('session')
    
    const manager = currentSession ? await decryptJWT(currentSession?.value) : null

    return (
        <section className="w-full h-full min-h-screen">
            <header className="py-8 pb-12 text-center flex flex-col justify-center items-center">
                <TMRLogo/>
            </header>
            {
                !!manager && (<p className=" text-center">Sesión iniciada como { manager.name }</p>)
            }
                <div className="flex flex-col justify-start items-center">
                    <LoginForm manager={ manager }/>
                </div>
        </section>
    
    )
}
