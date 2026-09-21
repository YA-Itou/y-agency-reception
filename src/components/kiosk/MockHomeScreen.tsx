"use client";

import { HomeScreen, type HomeId } from "./HomeScreen";

export type MockHomeId = HomeId;

export function MockHomeScreen({ onSelect }: { onSelect: (id: MockHomeId) => void }) {
  return <HomeScreen onSelect={onSelect} />;
}
