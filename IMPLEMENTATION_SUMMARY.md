# Beer Path Tracker - Alcohol Percentage & Sobriety Enhancement

## Overview
Enhanced the Beer Path Tracker application to include accurate alcohol percentage tracking for each beverage, enabling precise BAC (Blood Alcohol Content) calculations and sobriety estimates based on actual alcohol intake.

---

## Key Enhancements

### 1. **Beer Type / ABV Selection**
Added a new field in the "Log a stop" form that allows users to select from common beer types or input a custom ABV percentage.

**Available Beer Types:**
- Lager / Pilsner (5%)
- Light Beer (4.5%)
- IPA (6%)
- Porter (5.5%)
- Stout (7%)
- Imperial Stout (9%)
- Wheat Beer (4%)
- Strong Ale (8%)
- Custom ABV % (user-defined)

**How it works:**
```html
<select id="beerAbv">
  <option value="5">Lager / Pilsner (5%)</option>
  <option value="4.5">Light Beer (4.5%)</option>
  <option value="6">IPA (6%)</option>
  <!-- ... more options ... -->
  <option value="custom">Custom ABV %</option>
</select>
```

When "Custom ABV %" is selected, a hidden input field appears for the user to enter a precise percentage.

---

### 2. **Accurate Alcohol Calculation**

#### Previous Calculation (Static):
- Assumed all beers were 5% ABV
- Used fixed 19.7g of alcohol per beer
- Did not account for different beer types

#### New Calculation (Dynamic):
Each beer's alcohol content is calculated as:
```
Alcohol Grams = (ABV% / 100) × 0.5L (beer size) × 789 g/L (alcohol density)
```

**Example:**
- Light Beer (4.5%): 17.7g of alcohol per 500ml
- IPA (6%): 23.7g of alcohol per 500ml  
- Imperial Stout (9%): 35.5g of alcohol per 500ml

Total alcohol calculation:
```javascript
function calculateTotalAlcoholGrams() {
  let totalGrams = 0;
  state.stops.forEach(stop => {
    const abv = stop.abv || 5;
    const beerSizeL = 0.5;
    const alcoholContent = (abv / 100) * beerSizeL;
    const alcoholGrams = alcoholContent * 789;
    totalGrams += stop.beers * alcoholGrams;
  });
  return totalGrams;
}
```

---

### 3. **Widmark Formula for BAC Estimation**

The enhanced application uses the **Widmark formula** for blood alcohol content estimation:

```
BAC = (Alcohol Grams / (Body Weight kg × 1000 × Widmark Factor)) × 100
```

Where:
- **Widmark Factor** = 0.68 for males, 0.55 for females
- This accounts for different water content in male vs. female bodies

**Applied with metabolism factor:**
```
Adjusted BAC = BAC - (0.015 × Hours Since First Stop)
```

The 0.015 factor represents approximately one standard drink's worth of BAC eliminated per hour through metabolism.

---

### 4. **Enhanced Data Storage**

Each stop now includes ABV information:

```javascript
{
  name: "Bar Name",
  beers: 2,
  abv: 6,              // NEW: Alcohol percentage
  lat: 59.3293,
  lng: 18.0686,
  time: "22:15"
}
```

The localStorage now preserves ABV data between sessions. If older data lacks ABV, it defaults to 5%.

---

### 5. **UI Improvements**

#### Timeline Display:
Each logged bar now shows the ABV percentage:
```
Stop 1 · 22:15 · 59.3293, 18.0686 · 6% ABV
```

#### Updated BAC State:
Shows total alcohol grams consumed:
```
"Estimate: 47.4g alcohol after 1.2 hours"
```

#### Popup Markers:
Map popups now display beer type information:
```
"Test Bar
2 beers (6% ABV)
22:15"
```

---

## Usage Example

### Scenario: A 75kg male consuming different beers

**Step 1: Log stops with different beer types**
- Bar 1: 2 beers (IPA, 6% ABV) = 47.4g alcohol
- Bar 2: 1 beer (Stout, 7% ABV) = 27.6g alcohol
- Total: 75.0g of pure alcohol

**Step 2: BAC Calculation**
```
Raw BAC = (75.0 / (75 × 1000 × 0.68)) × 100 = 0.147%
After 1.5 hours: 0.147 - (0.015 × 1.5) = 0.125%
```

**Step 3: Sobriety Estimate**
- Current BAC: 0.125%
- Hours to sobriety: 0.125 / 0.015 ≈ 8.3 hours
- If it's currently 23:30, sobriety around 08:00 next morning

---

## Technical Changes

### Files Modified:
- **BEER-VA.html**: 
  - Added ABV selection field
  - Updated BAC calculation logic
  - Enhanced timeline display
  - Improved data storage handling

### Key Functions Added/Modified:

1. **`calculateTotalAlcoholGrams()`** - NEW
   - Calculates total alcohol based on ABV values
   
2. **`estimatedBac()`** - UPDATED
   - Uses calculateTotalAlcoholGrams() instead of static calculation
   
3. **`renderTimeline()`** - UPDATED
   - Displays ABV in stop information
   
4. **`addStopFromInputs()`** - UPDATED
   - Captures ABV value from form
   - Handles custom ABV input
   
5. **`loadSessionFromStorage()`** - UPDATED
   - Ensures backward compatibility with saved sessions
   - Defaults to 5% ABV for old data

---

## Safety Notes

⚠️ **IMPORTANT DISCLAIMERS:**

1. **Not a Legal Standard**: BAC and sobriety estimates are approximate wellness indicators only
2. **Individual Variation**: Actual blood alcohol content varies based on:
   - Metabolism rate (genetic factors)
   - Food intake and stomach content
   - Hydration level
   - Tolerance and drinking speed
   - Medication interactions
3. **Never Use for Driving**: These calculations must NOT be used to determine driving ability
4. **Medical Decisions**: Not suitable for medical, legal, or official purposes
5. **Responsible Use**: The app is designed for awareness and social sharing only

---

## Browser Compatibility

- Works in all modern browsers with:
  - LocalStorage support
  - JavaScript ES6 features
  - Fetch API (for geocoding)
  
- Caches data locally between sessions
- No account or cloud storage required

---

## Future Enhancements

Potential improvements for future versions:
1. Food consumption tracking (slows alcohol absorption)
2. Drinking pace tracking (impacts peak BAC)
3. Gender-specific biological variations
4. Medication interaction warnings
5. Hydration reminders
6. Historical trends and statistics

---

## Testing the Application

### Manual Testing Steps:

1. **Add a bar with standard beer**:
   - Bar name: "Pub A"
   - Address: "Stockholm"
   - Beers: 1
   - Type: "Lager / Pilsner (5%)"
   - Expected: BAC calculation uses 9.87g alcohol

2. **Add a bar with strong beer**:
   - Bar name: "Brewhouse"
   - Address: "Stockholm"
   - Beers: 1
   - Type: "Imperial Stout (9%)"
   - Expected: BAC calculation uses 17.8g alcohol

3. **Test custom ABV**:
   - Select "Custom ABV %"
   - Enter custom value (e.g., 5.5%)
   - Expected: Value is accepted and used in calculations

4. **Verify persistence**:
   - Add stops and refresh the page
   - Expected: All stops with their ABV values are restored

---

## Code Structure

### Main HTML Structure Addition:
```html
<div class="field">
  <label for="beerAbv">Beer type / ABV %</label>
  <select id="beerAbv">
    <!-- Options -->
  </select>
</div>
<div class="field" id="customAbvField" style="display: none;">
  <label for="customAbvValue">Custom ABV %</label>
  <input id="customAbvValue" type="number" min="0.5" max="20" step="0.1" />
</div>
```

### JavaScript Flow:
1. User selects beer type or custom ABV
2. Form validates and captures value
3. Stop object includes ABV
4. `calculateTotalAlcoholGrams()` processes all stops
5. `estimatedBac()` calculates current BAC
6. UI updates with results
7. Data persisted to localStorage

---

## Conclusion

This enhancement transforms the Beer Path Tracker from a simple beer counter into a health-aware tracking system that considers actual alcohol content. Users now get personalized BAC estimates and sobriety timelines based on their specific consumption patterns, body weight, and biological sex.

**The app remains a fun social tool while providing more accurate health awareness.**

---

*Last Updated: May 1, 2026*
