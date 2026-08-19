import type { Metadata } from "next";
import { DashboardInteractive } from "./DashboardInteractive";

export const metadata: Metadata = { title: "Links — Click Scope" };

export default function DashboardPage() {
  return <DashboardInteractive />;
}
