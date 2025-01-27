import { hijriToGregorian } from "./helpers/hijri_converter.js";

// Glucose units
function Glucose_mg_to_mmol(mg) {
  return (mg / 18.0182).toFixed(2);
}

function Glucose_mmol_to_mg(mmol) {
  return (mmol * 18.0182).toFixed(2);
}

// Triglyceride units
function Triglyceride_mg_to_mmol(mg) {
  return (mg * 0.01129).toFixed(2);
}

function Triglyceride_mmol_to_mg(mmol) {
  return (mmol * 88.545).toFixed(2);
}

// Cholesterol units
function Cholesterol_mg_to_mmol(mg) {
  return (mg / 38.67).toFixed(2);
}

function Cholesterol_mmol_to_mg(mmol) {
  return (mmol * 38.67).toFixed(2);
}

// Calcium units
function Calcium_mg_to_mmol(mg) {
  return (mg * 0.2495).toFixed(2);
}

function Calcium_mmol_to_mg(mmol) {
  return (mmol / 0.2495).toFixed(2);
}

// Hgb1ac percentage to unit
function Hgb1ac_percent_to_unit(percent) {
  return `Hgb1ac = ${(28.7 * percent - 46.7).toFixed(2)} mg/dL`;
}

// Date conversion
function hijri_to_gregorian(h_year, h_month, h_day) {
  return hijriToGregorian(h_year, h_month, h_day);
}

// Get current time
//! console.log(new Date().toLocaleString()); keep it for (gestational age: LMP - Today's date)

console.log(hijri_to_gregorian(1445, 12, 15));
