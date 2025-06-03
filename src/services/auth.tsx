import { httpClient } from "@/lib/http-client";

export async function signup(email: string, password: string) {
    try {
        const res = await httpClient.post("/auth/signup", {email, password})
        return res
    } catch (err) {
        throw err
    }
}

export async function login(email: string, password: string) {
    try {
        const res = await httpClient.post("/auth/login", {email, password})
        return res
    } catch (err) {
        throw err
    }
}

export async function logout() {
    try {
        const res = await httpClient.post("/auth/logout")
        return res
    } catch (err) {
        throw err
    }
}