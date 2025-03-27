import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// Dynamically import the widget with no SSR
const UnitTriggerDemoWidget = dynamic(
  () => import("../components/UnitTriggerDemoWidget"),
  {
    ssr: false,
  }
);

export default function Home() {
  const router = useRouter();
  const { width, height } = router.query;

  return (
    <div
      className="widget-page"
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      <UnitTriggerDemoWidget
        width={(width as string) || "100vw"}
        height={(height as string) || "100vh"}
      />
    </div>
  );
}
