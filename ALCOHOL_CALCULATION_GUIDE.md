# Alcohol & Sobriety Calculation Flow

## Visual Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER INPUT FORM                             │
├─────────────────────────────────────────────────────────────────┤
│  Bar Name: ________________                                      │
│  Address:  ________________                                      │
│  Beers:    [1 ▼]                                                 │
│  ABV Type: [Lager 5% ▼]  or [Custom ▼] [9.5%]                 │
│  [Log Stop Button]                                              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    (Form validated)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              STOP OBJECT CREATED & STORED                       │
├─────────────────────────────────────────────────────────────────┤
│  {                                                              │
│    name: "Bar Name",                                            │
│    beers: 1,                                                    │
│    abv: 5,          ← ALCOHOL BY VOLUME                         │
│    lat: 59.3293,                                                │
│    lng: 18.0686,                                                │
│    time: "22:15"                                                │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                  (calculateTotalAlcoholGrams)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│         CALCULATE TOTAL ALCOHOL CONTENT                         │
├─────────────────────────────────────────────────────────────────┤
│  For each stop:                                                 │
│  • ABV = 5%                                                     │
│  • Beer Size = 500ml = 0.5L                                     │
│  • Alcohol Volume = (5/100) × 0.5L = 0.025L                   │
│  • Alcohol Grams = 0.025L × 789 g/L = 19.725g                 │
│  • Total per stop = 19.725g × number_of_beers                  │
│                                                                 │
│  Multi-beer example (2 beers × 6% IPA):                         │
│  • Each beer: (6/100) × 0.5L × 789 = 23.67g                   │
│  • Total: 23.67g × 2 = 47.34g                                  │
│                                                                 │
│  RESULT: Total Alcohol Grams (sum of all stops)                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
              (estimatedBac using Widmark Formula)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              CALCULATE BLOOD ALCOHOL CONTENT                    │
├─────────────────────────────────────────────────────────────────┤
│  Formula: BAC = (Alcohol Grams / (Weight kg × 1000 × Factor)) │
│           × 100                                                 │
│                                                                 │
│  Widmark Factor:                                                │
│    • Male:   0.68  (more body water)                           │
│    • Female: 0.55  (less body water)                           │
│                                                                 │
│  Example (80kg male, 47.34g alcohol):                           │
│  • RAW BAC = (47.34 / (80 × 1000 × 0.68)) × 100               │
│  • RAW BAC = (47.34 / 54400) × 100 = 0.087%                   │
│                                                                 │
│  Metabolism Adjustment (0.015% per hour):                       │
│  • Hours since first stop: 1.5 hours                           │
│  • Metabolism reduction: 0.015 × 1.5 = 0.0225%                │
│  • ADJUSTED BAC = 0.087 - 0.0225 = 0.0645%                    │
│                                                                 │
│  RESULT: Current Estimated BAC                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
              (sobrietyEtaString calculating ETA)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│           CALCULATE TIME TO SOBRIETY                            │
├─────────────────────────────────────────────────────────────────┤
│  If BAC ≤ 0:                                                    │
│    → Return "Now" (already sober)                              │
│                                                                 │
│  Otherwise:                                                     │
│    Hours to Sobriety = Current BAC / 0.015                     │
│                                                                 │
│  Example (0.0645% BAC):                                         │
│    • Hours needed: 0.0645 / 0.015 = 4.3 hours                │
│    • Current time: 23:30                                       │
│    • Sobriety ETA: 03:48 (next morning)                        │
│                                                                 │
│  RESULT: Estimated Time to Sobriety                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  UPDATE UI DISPLAY                              │
├─────────────────────────────────────────────────────────────────┤
│  Total Beers:        ┌─────────────┐                           │
│                      │      3      │  (sum of all stops)        │
│                      └─────────────┘                           │
│                                                                 │
│  Bars Visited:       ┌─────────────┐                           │
│                      │      2      │  (number of stops)         │
│                      └─────────────┘                           │
│                                                                 │
│  Estimated BAC:      ┌──────────────┐                          │
│                      │  0.0645%     │  (current blood alcohol)  │
│                      └──────────────┘                          │
│                      "Estimate: 47.3g alcohol                  │
│                       after 1.5 hours"                         │
│                                                                 │
│  Sobriety ETA:       ┌──────────────┐                          │
│                      │    03:48     │  (time to sobriety)       │
│                      └──────────────┘                          │
│                      "Approximate time to return                │
│                       near 0.000%"                             │
│                                                                 │
│  Alert Status:       ┌──────────────┐                          │
│                      │ Within limit │  (vs. drink cap)          │
│                      └──────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Alcohol Content Reference Table

### Alcohol Grams per 500ml Beer (0.5L)

| Beer Type | ABV % | Alcohol/Beer | 2 Beers | 3 Beers |
|-----------|-------|--------------|---------|---------|
| Light Beer | 4.5% | 17.7g | 35.4g | 53.1g |
| **Lager / Pilsner** | **5%** | **19.7g** | **39.4g** | **59.1g** |
| Porter | 5.5% | 21.7g | 43.4g | 65.1g |
| IPA | 6% | 23.7g | 47.4g | 71.1g |
| Stout | 7% | 27.6g | 55.2g | 82.8g |
| Strong Ale | 8% | 31.6g | 63.2g | 94.8g |
| Imperial Stout | 9% | 35.5g | 71g | 106.5g |

---

## BAC to Impairment Level

| BAC Level | Typical Effects | Status |
|-----------|-----------------|--------|
| 0.000% | None | Sober |
| 0.02% | Mild relaxation | Minimal impairment |
| 0.05% | Slight impairment | Low impairment |
| 0.08% | Clear impairment | **Legal driving limit (US)** |
| 0.10% | Slurred speech | Obvious impairment |
| 0.15% | Impaired coordination | Significant impairment |
| 0.20% | Confusion | Severe impairment |
| 0.30%+ | Unconsciousness risk | Dangerous level |

---

## Time to Sobriety Calculator

At standard metabolism rate: 0.015% BAC per hour

| Starting BAC | Hours to 0.000% |
|--------------|-----------------|
| 0.05% | 3.3 hours |
| 0.08% | 5.3 hours |
| 0.10% | 6.7 hours |
| 0.15% | 10 hours |
| 0.20% | 13.3 hours |

---

## Body Weight Impact on BAC

Same consumption (3 beers, 5% ABV = 59.1g alcohol), different body weights:

| Weight | Male BAC | Female BAC | Difference |
|--------|----------|-----------|------------|
| 50 kg | 0.174% | 0.215% | +24% higher for female |
| 65 kg | 0.134% | 0.165% | +23% higher for female |
| 80 kg | 0.109% | 0.134% | +23% higher for female |
| 100 kg | 0.087% | 0.107% | +23% higher for female |

---

## Example Scenarios

### Scenario 1: Casual Friday Night
**Profile:** 75kg male, light drinking

| Stop | Bar | Beers | Type | ABV | Alcohol |
|------|-----|-------|------|-----|---------|
| 1 | Happy hour | 2 | Lager | 5% | 39.4g |
| 2 | Dinner | 1 | IPA | 6% | 23.7g |
| - | **TOTAL** | **3** | - | - | **63.1g** |

**After 2.5 hours:**
- Raw BAC: 0.117%
- Metabolism: -0.0375%
- **Adjusted BAC: 0.0795%**
- **ETA to sobriety: ~5.3 hours (1:30 AM if starting at 8:00 PM)**

### Scenario 2: Strong Beers at Brewpub
**Profile:** 65kg female, craft beers

| Stop | Bar | Beers | Type | ABV | Alcohol |
|------|-----|-------|------|-----|---------|
| 1 | Brewpub | 2 | Stout | 7% | 55.2g |
| - | **TOTAL** | **2** | - | - | **55.2g** |

**After 1 hour:**
- Raw BAC: 0.153%
- Metabolism: -0.015%
- **Adjusted BAC: 0.138%**
- **ETA to sobriety: ~9.2 hours**

---

## Notes on Accuracy

### Factors That WILL Affect Actual BAC:
✓ Food in stomach (slows absorption)  
✓ Drinking speed (rapid = higher peak)  
✓ Individual metabolism (genetic variation)  
✓ Medication interactions  
✓ Carbonation level  
✓ Hydration status  

### Factors This Calculator IGNORES:
✗ Stomach contents and digestion  
✗ Exact absorption timing  
✗ Individual genetic variations  
✗ Medication interactions  
✗ Previous drinking history  
✗ Tolerance levels  

**This is an ESTIMATE for social awareness only, not a medical or legal determination.**

---

*Created: May 1, 2026*
