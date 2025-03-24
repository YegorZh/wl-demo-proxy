import { DemoType } from "@/pages/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startTrigger = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_RETOOL_START_TRIGGER_URL ?? "",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Workflow-Api-Key":
                process.env.NEXT_PUBLIC_RETOOL_WORKFLOW_API_KEY ?? "",
            },
            body: JSON.stringify({
              demoType: DemoType.Businesses,
              token: process.env.NEXT_PUBLIC_UNIT_TOKEN,
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to start trigger");
        }

        const data = await res.json();
        console.log(data);
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
    unit.setAttribute("theme", "{{themeUrl}}");
    unit.setAttribute("jwt-token", "{{JwtToken}}");
    unit.setAttribute("language", "{{languageUrl}}");
    document.querySelector("#unit-app-placeholder")?.append(unit);
  }, [isLoading]);

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
