import LoginForm from "./_components/LoginForm";
import { redirect } from "next/navigation";
import TMRLogo from "../admin/_layout/design/TmrLogo";
import { getManagerFromSession } from "@/lib/auth/session";

export default async function LoginPage() {
    
    const manager = await getManagerFromSession()

    if (!!manager) redirect("/admin");

    return (
        <section className="w-full h-full min-h-screen flex flex-col justify-center items-center">
            <header className="text-center flex flex-col justify-center items-center mb-8">
                <div className="w-36">
                    <TMRLogo classname="w-full max-w-full"/>
                </div>
            </header>
                <div className="flex flex-col justify-start items-center w-full max-w-2xl mb-12">
                    <LoginForm/>
                </div>
        </section>
    
    )
}
