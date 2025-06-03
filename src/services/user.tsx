import { httpClient } from "@/lib/http-client";

export async function getMe() {
    try {
        const res = await httpClient.get("/user/me");
        const data = res.data;
        return data.user
    } catch (err) {
        throw err
    }
}