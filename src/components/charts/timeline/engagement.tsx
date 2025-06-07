"use client";

import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { timeLineEngagement } from "@/services/data";

interface EngagementData {
    engagement_view: number;
    engagement_comment: number;
    engagement_share: number;
    engagement_like: number;
    engagement_love: number;
    engagement_sad: number;
    engagement_wow: number;
    engagement_angry: number;
    date: string;
}

interface Props {
    data: EngagementData[];
}

interface RangeDate {
    start: string;
    end: string;
}

export default function TimelineEngagementChart({ start, end }: RangeDate) {
    const [options, setOptions] = useState<Highcharts.Options>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function fetchData() {
            try {
                const data = await timeLineEngagement(start, end)
                if (!data || data.length === 0) {
                    console.log("data.length:", data.length)
                    setOptions({
                        chart: {
                            type: "column"
                        },
                        title: {
                            text: null
                        },
                        xAxis: {
                            type: "datetime"
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: "Percent"
                            }
                        },
                        plotOptions: {
                            column: {
                                stacking: 'percent',
                            }
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

                const metrics = [
                    "engagement_comment",
                    "engagement_share",
                    "engagement_like",
                    "engagement_love",
                    "engagement_sad",
                    "engagement_wow",
                    "engagement_angry"
                ];
                const seriesMap: Record<string, [number, number][]> = {};
                metrics.forEach(metric => (seriesMap[metric] = []));

                data.forEach((d: any) => {
                    const dateTimestamp = new Date(d.date).getTime();
                    metrics.forEach(metric => {
                        seriesMap[metric].push([dateTimestamp, d[metric]]);
                    });
                });


                const series = metrics.map(metric => ({
                    name: metric.replace("engagement_", "").toUpperCase(),
                    data: seriesMap[metric],
                    type: "column",
                    stack: "engagement"
                }));

                setOptions({
                    chart: {
                        type: "column"
                    },
                    title: {
                        text: null

                    },
                    xAxis: {
                        type: "datetime"
                    },

                    yAxis: {
                        min: 0,
                        title: {
                            text: "Percent"
                        }
                    },

                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>' +
                            ': <b>{point.y}</b> ({point.percentage:.2f}%)<br/>',
                        shared: true
                    },

                    plotOptions: {
                        column: {
                            stacking: 'percent',
                        }
                    },
                    series: series,
                    subtitle: {
                        text: ""
                    }

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

    return (
        <div>
            <p className="text-2xl font-medium mb-8">Daily Engagement Count</p>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
};

