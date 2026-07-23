# Task: Fix Cars Not Showing on `/cars` Page

## Steps
- [x] Investigate root cause: CarsListing.jsx missing demoCars fallback
- [x] Fix 1: Add `import demoCars from '../data/demoCars'` to CarsListing.jsx
- [x] Fix 2: Add fallback logic in catch block to use filtered demoCars when API fails
- [x] Verify by running the dev server
- [x] Ensure car images load correctly from `/public/images/` and fall back gracefully

