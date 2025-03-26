import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// Dynamically import the widget with no SSR
const UnitTriggerDemoWidget = dynamic(
  () => import("../components/UnitTriggerDemoWidget"),
  {
    ssr: false,
  }
);

export default function UnitStartTriggerWidgetPage() {
  const router = useRouter();
  const { width, height } = router.query;

  return (
    <div className="widget-page">
      <UnitTriggerDemoWidget
        width={width as string}
        height={height as string}
      />
    </div>
  );
}
