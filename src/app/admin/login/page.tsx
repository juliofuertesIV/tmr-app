import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
    return (
        <section className="w-full h-full min-h-screen">
            <header className=" py-8 pb-12 text-center">
                <h1>Login</h1>
            </header>
            <div className="flex flex-col justify-start items-center">
                <LoginForm/>
            </div>
        </section>
    
    )
}
