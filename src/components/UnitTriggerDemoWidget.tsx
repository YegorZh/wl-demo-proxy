import { useEffect, useState } from "react";
import { StartTriggerResponse } from "@/pages/types";

interface UnitTriggerDemoWidgetProps {
  width?: string;
  height?: string;
}

const CUSTOMER_TOKEN_KEY = "unit_demo_customer_token";
const TOKEN_TIMESTAMP_KEY = "unit_demo_token_timestamp";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000; // One year in milliseconds

export default function UnitTriggerDemoWidget({
  width = "100%",
  height = "600px",
}: UnitTriggerDemoWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [res, setRes] = useState<StartTriggerResponse | null>(null);

  useEffect(() => {
    // Check localStorage first
    const storedToken = localStorage.getItem(CUSTOMER_TOKEN_KEY);
    const storedTimestamp = localStorage.getItem(TOKEN_TIMESTAMP_KEY);

    if (storedToken && storedTimestamp) {
      const tokenAge = Date.now() - parseInt(storedTimestamp);
      if (tokenAge < ONE_YEAR_MS) {
        setRes({ customerToken: storedToken });
        setIsLoading(false);
        return;
      } else {
        // Token is older than one year, remove it
        localStorage.removeItem(CUSTOMER_TOKEN_KEY);
        localStorage.removeItem(TOKEN_TIMESTAMP_KEY);
      }
    }

    const startTrigger = async () => {
      try {
        const res = await fetch("/api/start-trigger", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: StartTriggerResponse = await res.json();
        // Store the token and current timestamp in localStorage
        localStorage.setItem(CUSTOMER_TOKEN_KEY, data.customerToken);
        localStorage.setItem(TOKEN_TIMESTAMP_KEY, Date.now().toString());
        setRes(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    startTrigger();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const unit = document.createElement("unit-elements-white-label-app");
    unit.setAttribute("theme", process.env.NEXT_PUBLIC_UNIT_THEME_URL ?? "");
    unit.setAttribute("customer-token", res?.customerToken ?? "");
    unit.style.width = width;
    unit.style.height = height;

    const container = document.getElementById(
      "unit-trigger-demo-widget-container"
    );

    if (container) {
      container.innerHTML = ""; // Clear previous content
      container.appendChild(unit);
    }
  }, [isLoading, res, width, height]);

  return (
    <div id="unit-trigger-demo-widget-container" style={{ width, height }}>
      {isLoading && (
        <div className="loaderContainer">
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="loaderText">Building your banking experience</p>
        </div>
      )}
    </div>
  );
}
