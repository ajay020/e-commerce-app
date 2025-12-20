"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    async function loginUser() {
        setError(null);

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password");
            return;
        }

        router.push("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
                <h1 className="text-2xl text-black font-bold mb-4">Sign In</h1>
                {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                )}

                <input
                    className="w-full border p-2 text-black rounded mb-3"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-full border p-2 text-black rounded mb-3"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={loginUser}
                    className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
                >
                    Login
                </button>

                <p className="text-sm text-gray-600 mt-4">
                    Already registered?{" "}
                    <a href="/register" className="underline">
                        Register
                    </a>
                </p>

            </div>
        </div>
    );
}
