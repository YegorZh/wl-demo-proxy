import { StartTriggerResponse } from "@/pages/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [res, setRes] = useState<StartTriggerResponse | null>(null);

  useEffect(() => {
    const startTrigger = async () => {
      try {
        console.log("Making request to API route");
        const res = await fetch("/api/start-trigger", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.error("Response status:", res.status);
          console.error("Response status text:", res.statusText);
          const errorText = await res.text();
          console.error("Error response:", errorText);
          throw new Error(
            `Failed to start trigger: ${res.status} ${res.statusText}`
          );
        }

        const data: StartTriggerResponse = await res.json();
        setRes(data);
        console.log("Success response:", data);
        setIsLoading(false);
      } catch (error) {
        console.error("Detailed error:", error);
        if (
          error instanceof TypeError &&
          error.message.includes("Failed to fetch")
        ) {
          console.error(
            "Network error - Check VPN connection and DNS settings"
          );
        }
        setIsLoading(false);
      }
    };

    startTrigger();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const unit = document.createElement("unit-elements-white-label-app");
    unit.setAttribute("theme", process.env.NEXT_PUBLIC_UNIT_THEME_URL ?? "");
    console.log("Setting customer token:", res);
    unit.setAttribute("customer-token", res?.customerToken ?? "");
    document.querySelector("#unit-app-placeholder")?.append(unit);
  }, [isLoading, res]);

  return (
    <>
      {isLoading ? (
        <div className={"loader"}></div>
      ) : (
        <>
          <div id="unit-app-placeholder"></div>
        </>
      )}
    </>
  );
}
