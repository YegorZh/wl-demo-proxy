import type { NextApiRequest, NextApiResponse } from "next";
import { DemoType } from "../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await fetch(process.env.RETOOL_START_TRIGGER_URL ?? "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Workflow-Api-Key": process.env.RETOOL_WORKFLOW_API_KEY ?? "",
      },
      body: JSON.stringify({
        demoType: DemoType.Businesses,
        token: `Bearer ${process.env.UNIT_TOKEN}`,
      }),
    });

    if (!response.ok) {
      console.error("HTTP error! status:", response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
