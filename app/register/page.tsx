"use client";

import { useState } from "react";
import { registerUser } from "@/app/actions/register";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit() {
        setLoading(true);
        setError(null);

        try {
            await registerUser(email, password, name);
            router.push("/login");
        } catch (err) {
            setError("Something went wrong. Email may already exist.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-4">Create account</h1>

                {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                )}

                <input
                    className="w-full border p-2 rounded mb-3"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="w-full border p-2 rounded mb-3"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full border p-2 rounded mb-4"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
                >
                    {loading ? "Creating account..." : "Register"}
                </button>

                <p className="text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
