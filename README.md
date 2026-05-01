# Beer Path Tracker - Enhanced Edition

A fun, privacy-first web app to log your bar crawl, track beers, and calculate accurate sobriety estimates with **alcohol percentage tracking**.

> **Safety First:** This app provides wellness estimates only. Never use for driving, legal, or medical decisions.

---

## 🆕 What's New (Enhanced Version)

### Accurate Alcohol Tracking
Instead of assuming all beers are 5% ABV, you now can:
- ✅ Select from 8 common beer types
- ✅ Input custom ABV percentages
- ✅ Get accurate BAC based on actual alcohol content
- ✅ Calculate precise sobriety timelines

### Smarter BAC Calculations
Uses the **Widmark formula** with:
- Your body weight
- Your biological sex (affects body water content)
- Actual alcohol grams consumed
- Time elapsed + metabolism
- Individual beer ABV percentages

### Better Data
Each logged stop now includes:
- Bar name and address
- Number of beers
- **Alcohol percentage (new!)**
- Time and location
- ABV is persisted and survives page refreshes

---

## 🎯 Core Features

### 🗺️ Map Tracking
- Log bars by address
- See your walking route
- Calculate total distance
- Geocoding via OpenStreetMap Nominatim

### 📊 Statistics Dashboard
- Total beers consumed
- Bars visited
- Distance traveled
- **Estimated BAC (blood alcohol content)**
- **Sobriety ETA (time to full sobriety)**
- Alert status vs. drink limit

### 📱 Social Overlay
- Export transparent PNG for social media
- Show your route and stats
- Perfect for Instagram/TikTok stories
- Displays drinks count, distance, pace

### 💾 Local Storage
- All data cached locally
- Works offline (after geocoding)
- No account needed
- Clear anytime you want

### 🎨 Light & Dark Themes
- Toggle theme with moon icon
- Auto-respects system preference
- Beautiful responsive design

---

## 🚀 Getting Started

### 1. Open the App
Open `BEER-VA.html` in any modern browser:
```bash
# Option 1: Direct file
open BEER-VA.html

# Option 2: Local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000/BEER-VA.html
```

### 2. Set Your Profile
- Enter your body weight (kg)
- Select your body factor (Male/Female)
- Set your drink alert limit

### 3. Log Your First Stop
- Bar name: e.g., "Murphy's Pub"
- Address: e.g., "Stockholm" or "Södermalm, Stockholm"
- Number of beers: e.g., 2
- **Beer type / ABV: Select or enter custom**
- Click "Log stop"

### 4. Watch Your Stats Update
- Map shows your route
- Stats update automatically
- See your BAC and sobriety time
- Export overlay when done

---

## 📖 How It Works

### Beer Type Selection
```html
<!-- Pre-defined options -->
Lager / Pilsner (5%)     ← Default, most common
Light Beer (4.5%)
IPA (6%)
Porter (5.5%)
Stout (7%)
Imperial Stout (9%)
Wheat Beer (4%)
Strong Ale (8%)
Custom ABV %             ← Enter your own value
```

### Alcohol Calculation
For each beer consumed:
```
Alcohol Grams = (ABV% / 100) × 0.5L × 789 g/L

Examples:
- Lager (5%):        19.7g per 500ml beer
- IPA (6%):          23.7g per 500ml beer
- Imperial Stout (9%): 35.5g per 500ml beer
```

### BAC Formula (Widmark)
```
BAC = (Total Alcohol Grams / (Body Weight kg × 1000 × Factor)) × 100
Factor = 0.68 (male) or 0.55 (female)

Adjusted for metabolism:
BAC = BAC - (0.015 × Hours Since First Stop)
```

### Sobriety Calculation
```
Hours to Sobriety = Current BAC / 0.015
ETA = Now + Hours to Sobriety
```

---

## 🛠️ Technical Details

### Technology Stack
- **Frontend:** Vanilla JavaScript (ES6+)
- **Mapping:** Leaflet.js + OpenStreetMap tiles
- **Geocoding:** Nominatim (OpenStreetMap)
- **Routing:** OSRM (Open Source Routing Machine)
- **Export:** html-to-image library
- **Storage:** Browser LocalStorage API

### Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Any browser with ES6 + Fetch API

### Files
```
BEER-VA.html              Main application file
script.js                 (Currently embedded in HTML)
styles.css                (Currently embedded in HTML)
IMPLEMENTATION_SUMMARY.md Technical documentation
ALCOHOL_CALCULATION_GUIDE.md Calculation details & examples
USER_GUIDE.md            User-facing documentation
README.md                This file
```

---

## 🔐 Privacy & Security

### Your Data
- ✅ Stored **locally** on your device
- ✅ Never sent to any server
- ✅ Only read by Nominatim for geocoding
- ✅ Cleared when you clear session
- ✅ No tracking, no analytics

### External Services (Required)
- **Nominatim** (nominatim.openstreetmap.org): Address geocoding
- **OSRM** (router.project-osrm.org): Route calculation
- **CARTO** (basemaps.cartocdn.com): Map tiles

> These services don't store your session data

---

## 📊 Example Scenarios

### Scenario 1: Casual Night (80kg male)
```
Stop 1: Murphy's Pub
  - 2 beers (Lager, 5%) = 39.4g alcohol

Stop 2: The Brewhouse
  - 1 beer (IPA, 6%) = 23.7g alcohol

Total: 3 beers, 63.1g alcohol, 2.5 hours

Calculation:
  Raw BAC = (63.1 / 54,400) × 100 = 0.116%
  Metabolism = 0.015 × 2.5 = 0.0375%
  Adjusted BAC = 0.116 - 0.0375 = 0.0785%
  Sobriety: 0.0785 / 0.015 = 5.2 hours
```

### Scenario 2: Strong Beers (65kg female)
```
Stop 1: Craft Brewery
  - 1 beer (Imperial Stout, 9%) = 35.5g alcohol
  - 1 beer (Strong Ale, 8%) = 31.6g alcohol

Total: 2 beers, 67.1g alcohol, 1 hour

Calculation:
  Raw BAC = (67.1 / 35,750) × 100 = 0.188%
  Metabolism = 0.015 × 1 = 0.015%
  Adjusted BAC = 0.188 - 0.015 = 0.173%
  Sobriety: 0.173 / 0.015 = 11.5 hours
```

---

## ⚠️ Important Disclaimers

### This App Does NOT
- ✗ Replace a breathalyzer
- ✗ Determine legal sobriety
- ✗ Account for food consumption
- ✗ Factor in drinking speed
- ✗ Adjust for metabolism variations
- ✗ Consider medication interactions

### This App IS
- ✓ A wellness awareness tool
- ✓ Based on simplified assumptions
- ✓ For social fun and awareness
- ✓ Designed for tracking patterns

### Legal Warning
- **NEVER** use this to determine if you can drive
- **ALWAYS** follow local laws
- **ALWAYS** use a verified breathalyzer if needed
- **ALWAYS** have a safe ride home planned

---

## 🔄 Updates & Changes

### Version 2.0 (Enhanced Edition) - May 2026
- ✨ Added alcohol percentage tracking
- ✨ Added beer type selection dropdown
- ✨ Added custom ABV input field
- ✨ Implemented Widmark formula for accurate BAC
- ✨ Enhanced timeline display with ABV
- ✨ Improved alcohol grams calculation
- 📚 Added comprehensive documentation

### Version 1.0 (Original)
- Map-based bar tracking
- Basic beer counting
- Social overlay export
- Route visualization
- Local storage persistence

---

## 🐛 Known Limitations

1. **Geocoding Accuracy**: Address lookup is approximate; results may not be exact
2. **No Internet**: Geocoding requires internet for address lookup
3. **Metabolism Model**: Uses fixed 0.015% per hour (real metabolism varies)
4. **No Food Tracking**: Doesn't account for food slowing absorption
5. **No Absorption Curve**: Treats all beers as absorbed instantly
6. **Browser Only**: No mobile app or cloud sync

---

## 🚀 Future Enhancements

Potential improvements for future versions:
- [ ] Save multiple sessions
- [ ] Statistics over time
- [ ] Friends' overlay comparison
- [ ] Food/meal tracking
- [ ] Advanced metabolism profiles
- [ ] API for external apps
- [ ] Mobile app (React Native)
- [ ] Serverless cloud backup
- [ ] Photo integration
- [ ] Export to multiple formats

---

## 📝 Development Notes

### To Modify the App
1. Open `BEER-VA.html` in a text editor
2. Modify the HTML/CSS/JavaScript as needed
3. Save and refresh browser
4. Test thoroughly

### To Deploy
1. Upload `BEER-VA.html` to any web server
2. Or use GitHub Pages
3. Or use any static file hosting

### To Extend Features
- Search for `calculateTotalAlcoholGrams()` to modify alcohol calculation
- Search for `estimatedBac()` to adjust BAC formula
- Search for `renderStats()` to change display output

---

## 🤝 Contributing

This is a personal project. If you have suggestions:
1. Test thoroughly
2. Document your changes
3. Consider edge cases
4. Add safety disclaimers

---

## 📚 Documentation Files

- **USER_GUIDE.md** - User-facing quick start guide
- **IMPLEMENTATION_SUMMARY.md** - Technical details of enhancements
- **ALCOHOL_CALCULATION_GUIDE.md** - Deep dive into calculation methods
- **README.md** - This file

---

## ⚖️ Legal

### License
Personal project, share freely for educational purposes.

### Disclaimer
This application is provided **AS IS** without any warranty. The developer is not responsible for:
- Incorrect BAC calculations
- Driving decisions
- Legal consequences
- Health impacts
- Any other outcomes

**USE AT YOUR OWN RISK**

---

## 🎉 Have Fun Responsibly!

Enjoy tracking your nights out. Remember:
- ✓ Drink responsibly
- ✓ Know your limits
- ✓ Always have a safe way home
- ✓ Look after your friends
- ✓ Use this for awareness, not permission

---

**Questions or issues? Check the USER_GUIDE.md or IMPLEMENTATION_SUMMARY.md first!**

*Last Updated: May 1, 2026*
