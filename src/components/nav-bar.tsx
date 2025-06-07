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
            router.push("/auth");
            clearAuth();
        } catch (err) {
            console.error("Logout Failed:", err)
        }
    }

    return (
        <div className="flex bg-white justify-center px-10 py-5 w-full shadow-md">
            {!user ?
                <div className="flex justify-between items-center w-full">
                    <p className="text-2xl font-extrabold text-white p-2 bg-blue-700">Data Chart</p>
                    <NavBarComponent href="/auth" link_text="SignUp | Login" /> 
                </div>
                :
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-10">
                        <p className="text-2xl font-extrabold text-white p-2 bg-blue-700">Data Chart</p>
                        <NavBarComponent href="/dashboard" link_text="Home" />
                    </div>
                    <div className="flex space-x-10 items-center">
                        <p className="text-black">{user.email}</p>
                        <NavBarComponent link_text="Logout" onClick={handleLogout} />
                    </div>

                </div>
            }

        </div>
    )
}