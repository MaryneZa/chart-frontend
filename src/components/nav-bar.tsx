"use client"
import NavBarComponent from "@/components/navbar-component";
import { logout } from "@/services/auth";
import { useAuthStore } from "@/context/auth-store";
import { useRouter } from "next/navigation";
export default function NavBar() {
    const { user, clearAuth } = useAuthStore();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await logout();
            clearAuth();
            router.push("/auth")
        } catch (err) {
            console.error("Logout Failed:", err)
        }
    }

    return (
        <div className="flex bg-white justify-center px-10 py-5 w-full">
            {!user ?
                <NavBarComponent href="/auth" link_text="SignUp | Login" /> :
                <div className="flex justify-between items-center w-full">
                    <NavBarComponent href="/home" link_text="Home" />
                    <div className="flex space-x-10 items-center">
                        <p className="text-black">{user.email}</p>
                        <NavBarComponent link_text="Logout" onClick={handleLogout} />
                    </div>

                </div>
            }

        </div>
    )
}