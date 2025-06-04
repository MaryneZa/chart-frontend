"use client"
import { useAuthStore } from "@/context/auth-store";
import { getMe } from "@/services/user";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "../loading";

export default function AuthLayout({children}: {children: React.ReactNode}) {

    const router = useRouter();
    const { user, setUser } = useAuthStore();

    useEffect(()=>{

        const fetchMe = async () => {
            try {
                if (!user) {
                    const me = await getMe();
                    if (me) {
                        setUser(me);
                        return
                    }
                    throw new Error("");
                }
            } catch (err) {
                router.push('/auth')
            }
        }
        fetchMe();
    },[user, setUser])

    if (!user) return <Loading/>;

    return <>{children}</>;

}