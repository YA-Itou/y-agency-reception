"use client";

import type { AppointmentMenuItem } from "@/lib/appointment-menu";
import { AppointmentMenuScreen } from "./AppointmentMenuScreen";

export function MockAppointmentMenuScreen({
  onBack,
  onSelect,
}: {
  onBack: () => void;
  onSelect: (item: AppointmentMenuItem) => void;
}) {
  return <AppointmentMenuScreen onBack={onBack} onSelect={onSelect} />;
}
