"use client";

import { useCallback, useRef, useState } from "react";
import type { AppointmentMenuItem } from "@/lib/appointment-menu";
import { CALL_STAFF_MESSAGE, IDLE_MS } from "@/lib/constants";
import type { KioskStep, ReceptionPayload } from "@/lib/types";
import { useIdleReset } from "@/lib/use-idle-reset";
import { AppointmentMenuScreen } from "./AppointmentMenuScreen";
import { CompleteScreen, SalesScreen } from "./FlowScreens";
import { AppointmentScreen, InterviewScreen } from "./FormScreens";
import { HomeScreen } from "./HomeScreen";
import { KioskHeader } from "./KioskHeader";
import { KioskFrame } from "./ui";
import { WelcomeScreen } from "./WelcomeScreen";

const emptyForm = {
  companyName: "",
  visitorName: "",
  staffName: "",
};

export function KioskApp() {
  const [step, setStep] = useState<KioskStep>("welcome");
  const [form, setForm] = useState(emptyForm);
  const [selectedMenu, setSelectedMenu] = useState<AppointmentMenuItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const salesNotificationRef = useRef<Promise<void> | null>(null);
  const receptionSubmittingRef = useRef(false);

  const resetHome = useCallback(() => {
    setStep("welcome");
    setForm(emptyForm);
    setSelectedMenu(null);
    salesNotificationRef.current = null;
    receptionSubmittingRef.current = false;
  }, []);

  const goMenu = useCallback(() => {
    setForm(emptyForm);
    setSelectedMenu(null);
    setStep("home");
  }, []);

  const notify = useCallback(async (payload: ReceptionPayload) => {
    try {
      const response = await fetch("/api/reception", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("Reception notification failed", response.status);
      }
    } catch (error) {
      console.error("Reception notification failed", error);
    }
  }, []);

  const finish = useCallback(
    (payload: ReceptionPayload) => {
      if (receptionSubmittingRef.current) return;
      receptionSubmittingRef.current = true;
      setStep("complete");
      void notify(payload);
    },
    [notify],
  );

  const sendSalesIfNeeded = useCallback(() => {
    if (!salesNotificationRef.current) {
      setSubmitting(true);
      salesNotificationRef.current = notify({ visitType: "sales" }).finally(() => {
        setSubmitting(false);
      });
    }
    return salesNotificationRef.current;
  }, [notify]);

  const onIdle = useCallback(() => {
    if (step === "no-appointment") {
      void sendSalesIfNeeded().finally(resetHome);
      return;
    }
    resetHome();
  }, [resetHome, sendSalesIfNeeded, step]);

  useIdleReset(step !== "welcome", IDLE_MS, onIdle);

  return (
    <KioskFrame>
      <KioskHeader />
      {step === "welcome" && <WelcomeScreen onStart={() => setStep("home")} />}
      {step === "home" && (
        <HomeScreen
          onSelect={(id) => {
            if (id === "has-appointment") setStep("appointment-menu");
            if (id === "no-appointment") {
              salesNotificationRef.current = null;
              setStep("no-appointment");
            }
            if (id === "delivery") void finish({ visitType: "delivery" });
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
          submitting={submitting}
          onChange={(value) => setForm((current) => ({ ...current, visitorName: value }))}
          onBack={() => setStep("appointment-menu")}
          onSubmit={() => void finish({ visitType: "interview", visitorName: form.visitorName })}
        />
      )}
      {step === "appointment-form" && selectedMenu?.form === "appointment" && (
        <AppointmentScreen
          title={selectedMenu.label}
          companyName={form.companyName}
          visitorName={form.visitorName}
          staffName={form.staffName}
          submitting={submitting}
          onChange={(field, value) => setForm((current) => ({ ...current, [field]: value }))}
          onBack={() => setStep("appointment-menu")}
          onSubmit={() =>
            void finish({
              visitType: "appointment",
              companyName: form.companyName,
              visitorName: form.visitorName,
              staffName: form.staffName,
              appointmentPurpose: selectedMenu.label,
            })
          }
        />
      )}
      {step === "no-appointment" && (
        <SalesScreen
          submitting={submitting}
          onBack={goMenu}
          onConfirm={() => void sendSalesIfNeeded().finally(resetHome)}
        />
      )}
      {submitting && step !== "complete" && (
        <div className="pointer-events-none absolute inset-0 z-20 bg-[#f3eee4]/35" />
      )}
      {step === "complete" && <CompleteScreen message={CALL_STAFF_MESSAGE} onHome={resetHome} />}
    </KioskFrame>
  );
}
