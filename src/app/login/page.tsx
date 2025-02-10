import LoginForm from "./_components/LoginForm";
import TMRLogo from "../admin/_layout/design/TmrLogo";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    
    const manager = await getSession()

    if (manager) redirect("/admin");

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
