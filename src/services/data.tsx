import { httpClient } from "@/lib/http-client"

export async function timeLineMessage(start_date: string, end_date: string) {
    try {
        const res = await httpClient.get("/data/timeline-message", {
            params: {
                start_date,
                end_date
            }
        });

        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function timeLineKeyword(start_date: string, end_date: string) {
    try {
        const res = await httpClient.get("/data/timeline-keyword", {
            params: {
                start_date,
                end_date
            }
        });
        console.log(res.data.length)
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function timeLineEngagement(start_date: string, end_date: string) {
    try {
        const res = await httpClient.get("/data/timeline-engagement", {
            params: {
                start_date,
                end_date
            }
        });
        return res.data;
    } catch (err) {
        throw err;
    }
}
