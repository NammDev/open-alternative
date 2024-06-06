"use client";

import { Badge } from "@/components/app-ui/Badge";
import { Button } from "@/components/app-ui/Button";
import { Calendar } from "@/components/app-ui/Calendar";
import { DAY_IN_MS } from "@/lib/constants";
import { cx } from "@/lib/cva";
import {
  adjustSponsoringDuration,
  calculateSponsoringPrice,
} from "@/lib/sponsoring";
import { type HTMLAttributes, useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import useSWR from "swr";

export const Sponsoring = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  const [date, setDate] = useState<DateRange>();
  const [price, setPrice] =
    useState<ReturnType<typeof calculateSponsoringPrice>>();
  const [disabledDates, setDisabledDates] = useState<DateRange[]>([]);

  // Calculate the duration in days
  useEffect(() => {
    if (!date?.from || !date?.to) {
      setPrice(undefined);
      return;
    }

    const duration = Math.ceil(
      (date.to.getTime() - date.from.getTime()) / DAY_IN_MS,
    );
    const adjustedDuration = adjustSponsoringDuration(
      duration,
      date.from,
      date.to,
      disabledDates,
    );
    const price = calculateSponsoringPrice(adjustedDuration + 1);

    // Set the price
    setPrice(price);
  }, [date, disabledDates]);

  const onCreateCheckout = () => {
    console.log("hello");
  };

  return (
    <div className={cx("flex flex-col gap-4", className)} {...props}>
      <div className="flex flex-col divide-y rounded-md border">
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          className="p-4"
        />

        <div className="flex flex-col justify-between gap-4 p-4 text-center text-sm text-muted sm:flex-row sm:items-center sm:text-start">
          {price ? (
            <p>
              {price.days} day × ${price.price} ={" "}
              <strong className="font-medium text-foreground">
                ${price.fullPrice}
              </strong>
              <Badge className="ml-3">{price.discountPercentage}% off</Badge>
            </p>
          ) : (
            <p>Please select a date range.</p>
          )}

          <Button
            variant="fancy"
            size="lg"
            disabled={!price}
            className="-my-2"
            onClick={onCreateCheckout}
          >
            Purchase Now
          </Button>
        </div>
      </div>
    </div>
  );
};
