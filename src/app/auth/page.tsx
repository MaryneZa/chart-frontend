"use client"
import React, { useState, useRef } from "react";
import { signup, login } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();
    const [isSignup, setIsSignup] = useState<boolean>(true);
    const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            setErrorMessage("")

            const formData = new FormData(e.currentTarget);
            const email = formData.get('email');
            const password = formData.get('password')
            if (typeof email !== 'string' || typeof password !== 'string') {
                throw new Error("Invalid form input");
            }
            await signup(email, password);
            setLoading(false);
            formRef.current?.reset();

            setIsSignup(false);

            // alert

        } catch (err: any) {
            console.error(err);
            setErrorMessage(err.message);
            setLoading(false);
        }
    }
    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            setErrorMessage("");

            const formData = new FormData(e.currentTarget);
            const email = formData.get('email');
            const password = formData.get('password')
            if (typeof email !== 'string' || typeof password !== 'string') {
                throw new Error("Invalid form input");
            }
            await login(email, password);
            setLoading(false);

            router.push('/dashboard')


        } catch (err: any) {
            console.error(err);
            setErrorMessage(err.message);
            setLoading(false);
        }

    }

    const handleLogin = () => {
        setErrorMessage("");
        setIsSignup(false);
        formRef.current?.reset();
    }

    const handleSignup = () => {
        setErrorMessage("");
        setIsSignup(true);
        formRef.current?.reset();
    }


    return (
        <div className="fixed inset-0 flex justify-center items-center text-black">

            <div className="flex flex-col space-y-3 justify-center items-center bg-gray-50 border-2 border-gray-100 rounded-md shadow-lg px-20 py-10">
                <div className="flex flex-col space-y-1 justify-center items-center">
                    <div className="text-2xl font-semibold">{isSignup ? "Signup" : "Login"}</div>
                    <div className="text-sm text-gray-400">{isSignup ? "create your account" : "log in to your account"}</div>
                </div>

                {isSignup ?
                    <>
                        <form ref={formRef} onSubmit={handleSignupSubmit} className="flex flex-col space-y-5">
                            <div className="flex flex-col space-y-1">
                                <p className="font-semibold text-sm">Email</p>
                                <input
                                    type="email"
                                    name="email"
                                    className="bg-zinc-100"
                                    placeholder="Please enter your email"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <p className="font-semibold text-sm">Password</p>
                                <input
                                    type="password"
                                    name="password"
                                    className="bg-zinc-100"
                                    placeholder="Please enter your password"
                                    required
                                />
                            </div>
                            <button type="submit" disabled={loading} className="cursor-pointer bg-blue-700 px-4 py-2 rounded-md text-white">{loading ? 'Loading ...' : 'Sign up'}</button>

                            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                        </form>
                    </> :
                    <>
                        <form ref={formRef} action="" onSubmit={handleLoginSubmit} className="flex flex-col space-y-5">
                            <div className="flex flex-col space-y-1">
                                <p className="font-semibold text-sm">Email</p>
                                <input
                                    type="email"
                                    name="email"
                                    className="bg-zinc-100"
                                    placeholder="Please enter your email"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <p className="font-semibold text-sm">Password</p>
                                <input
                                    type="password"
                                    name="password"
                                    className="bg-zinc-100"
                                    placeholder="Please enter your password"
                                    required
                                />
                            </div>
                            <button type="submit" disabled={loading} className="cursor-pointer bg-blue-700 px-4 py-2 rounded-md text-white">{loading ? 'Loading ...' : 'Sign in'}</button>

                            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                        </form>
                    </>
                }
                <div className="flex text-sm text-center text-gray-400 space-x-2">
                    <div>
                        {isSignup ? "Already have an account?" : "Don't have an account?"}
                    </div>
                    <div>

                        <button onClick={isSignup ? handleLogin : handleSignup} className="text-blue-700 hover:underline">
                            {isSignup ? "Log in" : "Sign up"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}