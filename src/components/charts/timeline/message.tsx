"use client";

import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { timeLineMessage } from "@/services/data";


interface FilledData {
    dates: string[];
    counts: number[];
}

interface RangeDate {
    start: string;
    end: string;
}

// Fill missing dates
function fillMissingDates(
    dates: string[],
    counts: number[],
    startDate: string,
    endDate: string
): FilledData {
    const map: Record<string, number> = {};
    dates.forEach((date, i) => (map[date] = counts[i]));

    const result: FilledData = { dates: [], counts: [] };

    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const iso = d.toISOString().split("T")[0];
        result.dates.push(iso);
        result.counts.push(map[iso] ?? 0); // fill missing with 0
    }

    return result;
}

export default function TimelineMessageChart({ start, end }: RangeDate) {
    const [options, setOptions] = useState<Highcharts.Options>({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await timeLineMessage(start, end);

                const filled = fillMissingDates(
                    data?.dates ?? [],
                    data?.counts ?? [],
                    start,
                    end
                );

                const seriesData: [number, number][] = filled.dates.map((d, i) => [
                    new Date(d).getTime(),
                    filled.counts[i],
                ]);

                setOptions({
                    chart: {
                        type: "line",
                    },
                    title: {
                        text: "Daily Message Count",
                    },
                    xAxis: {
                        type: "datetime",
                    },
                    yAxis: {
                        title: { text: "Messages" }
                    },
                    tooltip: {
                        xDateFormat: "%Y-%m-%d",
                        valueSuffix: " messages",
                    },
                    series: [
                        {
                            name: "Messages",
                            data: seriesData,
                            type: "line",
                        },
                    ],
                });
            } catch (err) {
                console.error("Failed to load data:", err);
                setOptions({
                    title: { text: "No Data Available" },
                    series: [],
                });
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [start, end]);

    if (isLoading) return <p>Loading chart...</p>;

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}
