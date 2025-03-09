"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/button";
import { Calendar } from "@/components/UI/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/popover";

export function DatePickerDemo() {
  const [date, setDate] = React.useState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " font-normal bg-colorForm hover:border-[#5F6952] ",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
            format(date, "yyyy-MM-dd")
          ) : (
            <span className="text-[#9CA3B0] font-Inter">Datum</span>
          )}
          <CalendarIcon className="mr-2 h-4 w-4 text-[#9CA3B0]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
