// Fire Weather Index danger classes (EFFIS scale). Green → dark red gradient,
// deliberately distinct from the yellow→crimson fire-power ramp.
export interface RiskClass {
  key: string;
  label: string;
  color: string;
}

export const RISK_CLASSES: RiskClass[] = [
  { key: "very-low", label: "Very low", color: "#16a34a" },
  { key: "low", label: "Low", color: "#84cc16" },
  { key: "moderate", label: "Moderate", color: "#eab308" },
  { key: "high", label: "High", color: "#f97316" },
  { key: "very-high", label: "Very high", color: "#ef4444" },
  { key: "extreme", label: "Extreme", color: "#991b1b" },
];

const byKey = new Map(RISK_CLASSES.map((c) => [c.key, c]));

export function riskColor(cls: string): string {
  return byKey.get(cls)?.color ?? "#eab308";
}

export function riskLabel(cls: string): string {
  return byKey.get(cls)?.label ?? "Moderate";
}
