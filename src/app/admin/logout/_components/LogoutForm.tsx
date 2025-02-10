'use client'

import { useState } from "react";

const redirectToLoginPage = () => window.location.href = "/login";  

export default function LogoutForm() {
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogout = async (e: React.FormEvent) => {
            
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/protected/auth/logout", { method: "POST" });

            if (!response.ok) throw new Error("Logout fallido.");

            redirectToLoginPage()

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-semibold">Confirmar cierre de sesión</h1>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={ handleLogout } className="mt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    { loading ? "Cerrando sesión..." : "Cerrar sesión" }
                </button>
            </form>
        </div>
    );
}
