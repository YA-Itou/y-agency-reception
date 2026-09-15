"use client";

import { useCallback, useState } from "react";
import { CARRIER_LABEL, COMPLETE_MESSAGE, IDLE_MS } from "@/lib/constants";
import type { CarrierId, CompleteKind, KioskStep, ReceptionPayload } from "@/lib/types";
import { useIdleReset } from "@/lib/use-idle-reset";
import { AppointmentScreen, InterviewScreen } from "./FormScreens";
import { CarrierScreen, CompleteScreen, DeliveryNeedScreen, OtherCarrierScreen, SalesScreen } from "./FlowScreens";
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
  const [carrier, setCarrier] = useState<CarrierId | null>(null);
  const [completeKind, setCompleteKind] = useState<CompleteKind>("appointment");
  const [submitting, setSubmitting] = useState(false);
  const [salesSent, setSalesSent] = useState(false);

  const resetHome = useCallback(() => {
    setStep("welcome");
    setForm(emptyForm);
    setCarrier(null);
    setSubmitting(false);
    setSalesSent(false);
  }, []);

  const goMenu = useCallback(() => {
    setForm(emptyForm);
    setCarrier(null);
    setStep("home");
  }, []);

  const notify = useCallback(async (payload: ReceptionPayload) => {
    await fetch("/api/reception", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }, []);

  const finish = useCallback(
    async (payload: ReceptionPayload, kind: CompleteKind) => {
      setSubmitting(true);
      try {
        await notify(payload);
      } finally {
        setCompleteKind(kind);
        setSubmitting(false);
        setStep("complete");
      }
    },
    [notify],
  );

  const sendSalesIfNeeded = useCallback(async () => {
    if (salesSent) return;
    setSalesSent(true);
    setSubmitting(true);
    try {
      await notify({ visitType: "sales" });
    } finally {
      setSubmitting(false);
    }
  }, [notify, salesSent]);

  const onIdle = useCallback(() => {
    if (step === "sales") {
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
            if (id === "appointment") setStep("appointment");
            if (id === "interview") setStep("interview");
            if (id === "delivery") setStep("delivery-carriers");
            if (id === "sales") {
              setSalesSent(false);
              setStep("sales");
            }
          }}
        />
      )}
      {step === "appointment" && (
        <AppointmentScreen
          companyName={form.companyName}
          visitorName={form.visitorName}
          staffName={form.staffName}
          submitting={submitting}
          onChange={(field, value) => setForm((current) => ({ ...current, [field]: value }))}
          onBack={goMenu}
          onSubmit={() =>
            void finish(
              {
                visitType: "appointment",
                companyName: form.companyName,
                visitorName: form.visitorName,
                staffName: form.staffName,
              },
              "appointment",
            )
          }
        />
      )}
      {step === "interview" && (
        <InterviewScreen
          visitorName={form.visitorName}
          submitting={submitting}
          onChange={(value) => setForm((current) => ({ ...current, visitorName: value }))}
          onBack={goMenu}
          onSubmit={() =>
            void finish(
              { visitType: "interview", visitorName: form.visitorName },
              "interview",
            )
          }
        />
      )}
      {step === "delivery-carriers" && (
        <CarrierScreen
          onBack={goMenu}
          onSelect={(id) => {
            setCarrier(id);
            if (id === "nash") {
              void finish(
                { visitType: "delivery", carrier: CARRIER_LABEL[id], deliveryNeed: "must_receive" },
                "delivery-call",
              );
              return;
            }
            if (id === "water") {
              void finish(
                { visitType: "delivery", carrier: CARRIER_LABEL[id], deliveryNeed: "must_receive" },
                "delivery-call",
              );
              return;
            }
            if (id === "other") {
              setForm((current) => ({ ...current, companyName: "" }));
              setStep("delivery-other");
              return;
            }
            setStep("delivery-need");
          }}
        />
      )}
      {step === "delivery-other" && (
        <OtherCarrierScreen
          companyName={form.companyName}
          submitting={submitting}
          onChange={(value) => setForm((current) => ({ ...current, companyName: value }))}
          onBack={() => setStep("delivery-carriers")}
          onSubmit={() => setStep("delivery-need")}
        />
      )}
      {step === "delivery-need" && carrier && (
        <DeliveryNeedScreen
          carrierLabel={
            carrier === "other" && form.companyName.trim()
              ? form.companyName.trim()
              : CARRIER_LABEL[carrier]
          }
          submitting={submitting}
          onBack={() => setStep(carrier === "other" ? "delivery-other" : "delivery-carriers")}
          onSelect={(need) =>
            void finish(
              {
                visitType: "delivery",
                carrier: CARRIER_LABEL[carrier],
                companyName: carrier === "other" ? form.companyName : undefined,
                deliveryNeed: need,
              },
              need === "drop_off" ? "delivery-dropoff" : "delivery-call",
            )
          }
        />
      )}
      {step === "sales" && (
        <SalesScreen
          submitting={submitting}
          onConfirm={() => void sendSalesIfNeeded().finally(resetHome)}
        />
      )}
      {submitting && step !== "complete" && (
        <div className="pointer-events-none absolute inset-0 z-20 bg-[#f3eee4]/35" />
      )}
      {step === "complete" && <CompleteScreen message={COMPLETE_MESSAGE[completeKind]} />}
    </KioskFrame>
  );
}
