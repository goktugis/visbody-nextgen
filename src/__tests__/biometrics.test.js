import { describe, it, expect } from 'vitest';
import { 
  calculateEffectiveCervicalLoad, 
  calculateHealthScore, 
  calculateBodyComposition, 
  calculateClinicRoi 
} from '../utils/biometricCalculator';
import { productsData } from '../data/productsData';
import { clinicsData } from '../data/clinicsData';

describe('Visbody Biomechanical & Clinical Calculation Engine', () => {
  
  it('accurately calculates cervical spinal load based on forward head angle', () => {
    // Normal alignment: 0 degrees forward
    const normalLoad = calculateEffectiveCervicalLoad(5.0, 0);
    expect(normalLoad).toBe(5.0);

    // Tech neck with 15 degrees anterior shift
    const strainedLoad = calculateEffectiveCervicalLoad(5.0, 15);
    expect(strainedLoad).toBe(19.3); // 5 + 15 * 0.95 = 19.25 rounded to 19.3
  });

  it('computes realistic Biomechanical Health Score (bounded 42 to 99)', () => {
    // Perfect athlete posture
    const athleteScore = calculateHealthScore({
      forwardHead: 4,
      shoulderTilt: 0.5,
      pelvicTilt: 2,
      bodyFat: 12
    });
    expect(athleteScore).toBeGreaterThanOrEqual(80);
    expect(athleteScore).toBeLessThanOrEqual(99);

    // Severe postural deviations
    const severeScore = calculateHealthScore({
      forwardHead: 25,
      shoulderTilt: 5.0,
      pelvicTilt: 14,
      bodyFat: 35
    });
    expect(severeScore).toBeLessThan(60);
    expect(severeScore).toBeGreaterThanOrEqual(42);
  });

  it('calculates accurate Multi-Frequency BIA fluid and body composition metrics', () => {
    const comp = calculateBodyComposition(75, 20, 35);
    
    expect(comp.fatMass).toBe(15.0); // 75 * 0.20
    expect(comp.leanMass).toBe(60.0); // 75 - 15
    expect(comp.tbw).toBeCloseTo(43.9, 1); // 60 * 0.732
    expect(comp.icw).toBeCloseTo(27.2, 1); // 43.9 * 0.62
    expect(comp.ecw).toBeCloseTo(16.7, 1); // 43.9 * 0.38
    expect(comp.edemaRatio).toBe(0.38);    // normal physiological ECW/TBW ratio
    expect(comp.bmr).toBe(1666);           // 370 + 21.6 * 60
    expect(comp.phaseAngle).toBe(6.8);     // healthy cell integrity index
  });

  it('computes accurate clinic ROI and payback timeframe', () => {
    // 120 clients, 750 TL scan, 30% upsell
    const roi = calculateClinicRoi(120, 750, 30);
    
    expect(roi.directScanRevenue).toBe(90000); // 120 * 750
    expect(roi.packageUpsellRevenue).toBe(79200); // 120 * 0.3 * 2200
    expect(roi.totalMonthlyRevenue).toBe(169200);
    expect(roi.annualRevenue).toBe(2030400);
    expect(roi.paybackMonths).toBeCloseTo(2.2, 1); // 380,000 / 169,200
  });

});

describe('Domain Data Integrity', () => {
  it('contains verified Visbody hardware models with valid specifications', () => {
    expect(productsData.length).toBeGreaterThanOrEqual(4);
    
    const s30 = productsData.find(p => p.id === 's30');
    expect(s30).toBeDefined();
    expect(s30.name).toBe('Visbody S30');
    expect(s30.scanDuration).toContain('32');
    expect(s30.biaFrequencies).toContain('500 kHz');

    const m30 = productsData.find(p => p.id === 'm30');
    expect(m30).toBeDefined();
    expect(m30.name).toBe('Visbody M30');
    expect(m30.category).toContain('Smart Mirror');
  });

  it('contains certified Visbody Point clinics across Turkish metropolitan areas', () => {
    expect(clinicsData.length).toBeGreaterThanOrEqual(5);
    const cities = clinicsData.map(c => c.city);
    expect(cities).toContain('İstanbul');
    expect(cities).toContain('Ankara');
    expect(cities).toContain('İzmir');
  });
});
