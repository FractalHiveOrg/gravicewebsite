"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { CAL_USERNAME } from "@/lib/cal";
import { setClarityTag, trackEvent, upgradeSession } from "@/lib/clarity";

type CalBookerProps = {
  eventSlug: string;
  username?: string;
};

export function CalBooker({
  eventSlug,
  username = CAL_USERNAME,
}: CalBookerProps) {
  const calLink = `${username}/${eventSlug}`;
  const namespace = `demo-${eventSlug}`;

  useEffect(() => {
    let cancelled = false;
    const onBooked = () => {
      trackEvent("booking_completed");
      setClarityTag("booking_event", eventSlug);
      upgradeSession("booking_completed");
    };
    const onFailed = () => trackEvent("booking_widget_failed");
    const calApi = getCalApi({ namespace });

    void (async () => {
      const cal = await calApi;
      if (cancelled) return;
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": "#F6682E" },
          dark: { "cal-brand": "#F6682E" },
        },
      });
      cal("on", { action: "bookingSuccessfulV2", callback: onBooked });
      cal("on", { action: "linkFailed", callback: onFailed });
    })();

    return () => {
      cancelled = true;
      void calApi.then((cal) => {
        cal("off", { action: "bookingSuccessfulV2", callback: onBooked });
        cal("off", { action: "linkFailed", callback: onFailed });
      });
    };
  }, [namespace, eventSlug]);

  return (
    <div className="cal-booker-shell w-full min-w-0 min-h-[680px] overflow-hidden rounded-[20px] border border-navy-100 bg-white sm:min-h-[720px]">
      <Cal
        namespace={namespace}
        calLink={calLink}
        style={{ width: "100%", height: "100%", minHeight: "680px", overflow: "scroll" }}
        config={{
          layout: "month_view",
          theme: "light",
          useSlotsViewOnSmallScreen: "true",
        }}
      />
    </div>
  );
}
