import type { Metadata } from "next";
import { MockKioskApp } from "@/components/kiosk/MockKioskApp";

export const metadata: Metadata = {
  title: "受付モック | 株式会社 Y Agency",
};

export default function MockPage() {
  return <MockKioskApp />;
}
