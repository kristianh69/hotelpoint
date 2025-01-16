//@ts-nocheck

"use client";

import * as React from "react";
import { differenceInDays, format, addDays } from "date-fns";
import { Calendar as CalendarIcon, TriangleAlert } from "lucide-react";
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
  const [isOpen, setIsOpen] = React.useState(false); // Stav pre otvorenie Popoveru

  const MAX_NIGHTS = 21;

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

  const togglePopover = () => {
    setIsOpen(!isOpen); // Ručne prepínať stav Popoveru
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={togglePopover}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full sm:w-[300px] justify-start text-left font-normal", // Zabezpečí plnú šírku na mobiloch
              !date && "text-muted-foreground"
            )}
            onClick={togglePopover} // Pri kliknutí na tlačidlo sa otvorí Popover
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
        {isOpen && (
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
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
            />
          </PopoverContent>
        )}
      </Popover>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
