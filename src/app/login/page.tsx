import LoginForm from "./_components/LoginForm";
import { redirect } from "next/navigation";
import TMRLogo from "../admin/_layout/design/TmrLogo";
import { getManagerFromSession } from "@/lib/auth/session";

export default async function LoginPage() {
    
    const manager = await getManagerFromSession()

    if (!!manager) redirect("/admin");

    return (
        <section className="w-full h-full min-h-screen">
            <header className="py-8 pb-12 text-center flex flex-col justify-center items-center">
                <TMRLogo/>
            </header>
                <div className="flex flex-col justify-start items-center">
                    <LoginForm/>
                </div>
        </section>
    
    )
}
