"use client";

import { useCallback, useState } from "react";
import type { AppointmentMenuItem } from "@/lib/appointment-menu";
import { IDLE_MS } from "@/lib/constants";
import { useIdleReset } from "@/lib/use-idle-reset";
import { AppointmentMenuScreen } from "./AppointmentMenuScreen";
import { CompleteScreen, SalesScreen } from "./FlowScreens";
import { AppointmentScreen, InterviewScreen } from "./FormScreens";
import { KioskHeader } from "./KioskHeader";
import { MockHomeScreen } from "./MockHomeScreen";
import { KioskFrame } from "./ui";
import { WelcomeScreen } from "./WelcomeScreen";

type MockStep =
  | "welcome"
  | "home"
  | "appointment-menu"
  | "appointment-form"
  | "no-appointment"
  | "complete";

const emptyForm = {
  companyName: "",
  visitorName: "",
  staffName: "",
};

const CALL_STAFF_MESSAGE = "担当者を呼び出しました。\n少々お待ちください。";

export function MockKioskApp() {
  const [step, setStep] = useState<MockStep>("welcome");
  const [form, setForm] = useState(emptyForm);
  const [selectedMenu, setSelectedMenu] = useState<AppointmentMenuItem | null>(null);

  const resetHome = useCallback(() => {
    setStep("welcome");
    setForm(emptyForm);
    setSelectedMenu(null);
  }, []);

  const goMenu = useCallback(() => {
    setForm(emptyForm);
    setSelectedMenu(null);
    setStep("home");
  }, []);

  useIdleReset(step !== "welcome", IDLE_MS, resetHome);

  return (
    <KioskFrame>
      <KioskHeader />
      {step === "welcome" && <WelcomeScreen onStart={() => setStep("home")} />}
      {step === "home" && (
        <MockHomeScreen
          onSelect={(id) => {
            if (id === "has-appointment") setStep("appointment-menu");
            if (id === "no-appointment") setStep("no-appointment");
            if (id === "delivery") setStep("complete");
          }}
        />
      )}
      {step === "appointment-menu" && (
        <AppointmentMenuScreen
          onBack={goMenu}
          onSelect={(item) => {
            setForm(emptyForm);
            setSelectedMenu(item);
            setStep("appointment-form");
          }}
        />
      )}
      {step === "appointment-form" && selectedMenu?.form === "interview" && (
        <InterviewScreen
          title={selectedMenu.label}
          visitorName={form.visitorName}
          submitting={false}
          onChange={(value) => setForm((current) => ({ ...current, visitorName: value }))}
          onBack={() => setStep("appointment-menu")}
          onSubmit={() => setStep("complete")}
        />
      )}
      {step === "appointment-form" && selectedMenu?.form === "appointment" && (
        <AppointmentScreen
          title={selectedMenu.label}
          notice={null}
          companyName={form.companyName}
          visitorName={form.visitorName}
          staffName={form.staffName}
          submitting={false}
          onChange={(field, value) => setForm((current) => ({ ...current, [field]: value }))}
          onBack={() => setStep("appointment-menu")}
          onSubmit={() => setStep("complete")}
        />
      )}
      {step === "no-appointment" && (
        <SalesScreen submitting={false} onBack={goMenu} onConfirm={resetHome} />
      )}
      {step === "complete" && <CompleteScreen message={CALL_STAFF_MESSAGE} onHome={resetHome} />}
    </KioskFrame>
  );
}
