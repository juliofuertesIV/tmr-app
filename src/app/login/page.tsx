import { cookies } from "next/headers";
import LoginForm from "./_components/LoginForm";
import { decryptJWT } from "@/lib/auth";
import TMRLogo from "../admin/_layout/design/TmrLogo";
import { Manager } from '@/database/models';
import { IManager } from "@/types";

async function getManagerById() {
    const id = await getManagerIdBySession()

    return await Manager.findOne({ where: { id }}).then(data => data)
}

async function getManagerIdBySession() : Promise<string | null> {

    const currentSession = cookies().get('session');
    
    const manager = currentSession ? 
        await decryptJWT(currentSession?.value).then(data => data) 
        : null;

    return manager?.id || null;
}


export default async function LoginPage() {
    
    const manager = await getManagerById() as IManager | null;

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
