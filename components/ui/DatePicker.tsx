"use client";

import * as React from "react";
import { format, addDays, differenceInDays, startOfToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange?: (numberOfNights: number, fromDate: Date, toDate: Date) => void;
}

export function DatePickerWithRange({
  className,
  onDateChange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [error, setError] = React.useState<string | null>(null);

  const MAX_NIGHTS = 21;
  const today = startOfToday();

  const handleDateChange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      const nights = differenceInDays(range.to, range.from);

      if (nights > MAX_NIGHTS) {
        return;
      } else {
        setError(null);
      }

      if (onDateChange) {
        onDateChange(nights, new Date(range.from), new Date(range.to));
      }
    }

    setDate(range);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full sm:w-[300px] justify-start text-left font-normal", // Zabezpečí plnú šírku na mobiloch
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="overflow-hidden">
            <Calendar
              mode="range"
              selected={date}
              onSelect={(range) => {
                // Obmedzenie výberu maximálne na 21 nocí
                if (range?.from && range?.to) {
                  const maxToDate = addDays(range.from, MAX_NIGHTS);
                  if (range.to > maxToDate) {
                    range.to = maxToDate;
                    toast.warning(`Maximálny počet nocí je ${MAX_NIGHTS}`);
                    // Automaticky obmedzíme koncový dátum
                  }
                }
                handleDateChange(range);
              }}
              numberOfMonths={2}
              disabled={{ before: today }}
            />
          </div>
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
