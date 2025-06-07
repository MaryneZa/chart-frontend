"use client";

import React, { useEffect, useState } from "react";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { timeLineKeyword, timeLineMessage } from "@/services/data";
import * as NoDataToDisplay from "highcharts/modules/no-data-to-display";

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

export default function TimelineKeywordChart({ start, end }: RangeDate) {
    const [options, setOptions] = useState<Highcharts.Options>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await timeLineKeyword(start, end);
                if (!data || data.length === 0) {
                    console.log("data.length:", data.length)
                    setOptions({
                        chart: {
                            type: "line"
                        },
                        title: {
                            text: "Daily Keyword Count"
                        },
                        xAxis: {
                            type: "datetime"
                        },
                        yAxis: {
                            title: { text: "Count" }
                        },
                        series: [
                            {
                                data: [],
                                type: "line",
                                showInLegend: false,
                            }
                        ],
                        subtitle: {
                            text: "No data available for this date range",
                            align: "center",
                            verticalAlign: "middle"
                        }
                    });
                    return
                }

                const filledArray: Highcharts.SeriesOptionsType[] = [];
                data.forEach((d: any) => {
                    const filled = fillMissingDates(
                        d.dates ?? [],
                        d.counts ?? [],
                        start,
                        end
                    );
                    const seriesData: [number, number][] = filled.dates.map((d, i) => [
                        new Date(d).getTime(),
                        filled.counts[i],
                    ]);
                    const object: Highcharts.SeriesLineOptions = {
                        name: d.keywords,
                        data: seriesData,
                        type: "line"
                    }
                    filledArray.push(object)
                })


                setOptions({
                    chart: {
                        type: "line",
                    },
                    title: {
                        text: "Daily Keyword Count",
                    },
                    xAxis: {
                        type: "datetime",
                    },
                    yAxis: {
                        title: { text: "count" }
                    },
                    tooltip: {
                        xDateFormat: "%Y-%m-%d",
                    },
                    series: filledArray
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
