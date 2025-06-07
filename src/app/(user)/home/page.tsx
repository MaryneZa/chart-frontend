"use client";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import "@/app/globals.css";
import { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { format } from 'date-fns';
import TimelineMessageChart from "@/components/charts/timeline/message";
import TimelineKeywordChart from "@/components/charts/timeline/keyword";
import TimelineEngagementChart from "@/components/charts/timeline/engagement";
export default function HomePage() {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [range, setRange] = useState<DateRange | undefined>({
        from: new Date(new Date().setDate(new Date().getDate() - 7)),
        to: new Date()
    });
    const [currentRange, setCurrentRange] = useState<DateRange | undefined>(range)


    // format(range?.from || new Date(), 'yyyy-MM-dd')


    const toggleDatePicker = () => setIsDatePickerOpen(!isDatePickerOpen);

    const handleCancelDatePicker = () => {
        toggleDatePicker();
        setRange(currentRange);
    }

    const handleApplyDatePicker = () => {
        toggleDatePicker();
        setCurrentRange(range);
    }

    return (
        <div className="relative p-6 text-black ">
            <div className="flex mb-4 justify-end">
                <button
                    onClick={toggleDatePicker}
                    className="flex items-center space-x-4 border-2 border-zinc-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-700"
                >
                    <CalendarDays size={18} color="gray" />
                    <span>
                        {range?.from?.toLocaleDateString() || "-"} -{" "}
                        {range?.to?.toLocaleDateString() || "-"}
                    </span>
                    <ChevronDown size={18} />
                </button>

                {isDatePickerOpen && (
                    <div className="absolute mt-10 z-50 bg-white p-4 border-2 border-gray-200 rounded-md shadow-md">
                        <DayPicker
                            mode="range"
                            selected={range}
                            onSelect={setRange}
                            disabled={{ after: new Date() }}
                        />
                        <div className="mt-2 flex justify-end gap-2">
                            <button
                                onClick={handleCancelDatePicker}
                                className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApplyDatePicker}
                                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Apply
                            </button>
                        </div>

                    </div>
                )}
            </div>

            {
                currentRange?.from && currentRange?.to && (
                    <div>
                        <TimelineMessageChart start={format(currentRange?.from, 'yyyy-MM-dd')} end={format(currentRange?.to, 'yyyy-MM-dd')} />
                        <TimelineKeywordChart start={format(currentRange?.from, 'yyyy-MM-dd')} end={format(currentRange?.to, 'yyyy-MM-dd')} />
                        <TimelineEngagementChart start={format(currentRange?.from, 'yyyy-MM-dd')} end={format(currentRange?.to, 'yyyy-MM-dd')} />

                    </div>

                )
            }
        </div>
    );
}
