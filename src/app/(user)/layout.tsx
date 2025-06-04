import React from "react";
import AuthLayout from "@/components/layout/auth-layout";
export default function ProtectedLayout({children} : {children: React.ReactNode}) {
    return <AuthLayout>{children}</AuthLayout>
}