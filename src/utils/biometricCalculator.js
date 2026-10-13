/**
 * Visbody Biomechanical & Bioelectrical Impedance Clinical Calculation Engine
 */

export function calculateEffectiveCervicalLoad(headWeightKg, forwardHeadDegrees) {
  // Head weighs ~5kg. Every 1 degree forward adds roughly 0.95 kg of equivalent cervical spinal torque
  const safeDegrees = Math.max(0, forwardHeadDegrees);
  return Number((headWeightKg + safeDegrees * 0.95).toFixed(1));
}

export function calculateHealthScore(posture) {
  const { forwardHead, shoulderTilt, pelvicTilt, bodyFat } = posture;
  const penalty = (forwardHead * 1.5) + (shoulderTilt * 4) + (pelvicTilt * 2.2) + (Math.abs(bodyFat - 18) * 0.8);
  return Math.max(42, Math.min(99, Math.round(100 - penalty)));
}

export function calculateBodyComposition(weight, bodyFat, muscleMass) {
  const fatMass = Number(((weight * bodyFat) / 100).toFixed(1));
  const leanMass = Number((weight - fatMass).toFixed(1));
  const tbw = Number((leanMass * 0.732).toFixed(1)); // Total Body Water
  const icw = Number((tbw * 0.62).toFixed(1));       // Intracellular Water
  const ecw = Number((tbw * 0.38).toFixed(1));       // Extracellular Water
  const edemaRatio = Number((ecw / tbw).toFixed(2));
  const bmr = Math.round(370 + 21.6 * leanMass);
  const phaseAngle = Number((6.4 + (muscleMass - 30) * 0.08).toFixed(1));

  return {
    weight,
    fatMass,
    leanMass,
    tbw,
    icw,
    ecw,
    edemaRatio,
    bmr,
    phaseAngle
  };
}

export function calculateClinicRoi(clientCount, pricePerScan, upsellRate) {
  const directScanRevenue = clientCount * pricePerScan;
  const packageUpsellRevenue = clientCount * (upsellRate / 100) * 2200;
  const totalMonthlyRevenue = directScanRevenue + packageUpsellRevenue;
  const annualRevenue = totalMonthlyRevenue * 12;
  const paybackMonths = Math.max(1.0, Number((380000 / totalMonthlyRevenue).toFixed(1)));

  return {
    directScanRevenue,
    packageUpsellRevenue,
    totalMonthlyRevenue,
    annualRevenue,
    paybackMonths
  };
}
