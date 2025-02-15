import computeTenYearScore from "./helpers/ascvd_smol.js";

//!Pre-calculated Input (input should be: Fe / TIBC, e.g. 5/2)
function TSAT(Fe, TIBC, gender) {
  let tsat = ((Fe / TIBC) * 100).toFixed(2);
  if (gender.toLowerCase() === "m") {
    if (tsat <= 20) {
      return `TSAT: ${tsat}%, Iron Deficiency Anemia is likely due to Transferrin saturation less than 20%.`;
    } else {
      return `TSAT: ${tsat}%, Iron Deficiency Anemia is Unlikely.`;
    }
  } else if (gender.toLowerCase() === "f") {
    if (tsat <= 15) {
      return `TSAT: ${tsat}%, Iron Deficiency Anemia is likely due to Transferrin saturation less than 15%.`;
    } else {
      return `TSAT: ${tsat}%, Iron Deficiency Anemia is Unlikely.`;
    }
  } else {
    return "GAYYYYYYYYYY!";
  }
}

//!Pre-calculated Input (input should be: MCV / RBC, e.g. 5/2)
function Mentz(MCV, RBC) {
  let mentz = (MCV / RBC).toFixed(2);
  if (mentz > 13) {
    return `Mentz: ${mentz}, Iron Deficiency Anemia is likely due to Mentzer Index more than 13.`;
  } else if (mentz < 13) {
    return `Mentz: ${mentz}, Beta thalassemia is likely due to Mentzer Index less than 13.`;
  } else {
    return `Mentz: ${mentz}, A combination of Iron Deficiency Anemia and Beta thalassemia are likely due to Mentzer Index equals to 13.`;
  }
}

function ESR(age, gender) {
  age = parseFloat(age);
  if (gender.toLowerCase() === "m") {
    return `ESR upper limit: ${Math.round(age / 2)}`;
  } else if (gender.toLowerCase() === "f") {
    return `ESR upper limit: ${Math.round((age + 10) / 2)}`;
  } else {
    return "GAYYYYYYYYYY!";
  }
}

function CRP(age, gender) {
  if (gender.toLowerCase() === "m") {
    return `CRP upper limit: ${(age / 50).toFixed(2)}`;
  } else if (gender.toLowerCase() === "f") {
    return `CRP upper limit: ${(age / 50 + 0.6).toFixed(2)}`;
  } else {
    return "GAYYYYYYYYYY!";
  }
}

function W_to_H(w, h, gender) {
  let ratio = w / h;
  if (gender.toLowerCase() === "m") {
    if (ratio > 0.9 || w > 102) {
      return `W:H = ${ratio.toFixed(2)}, Abnormal.`;
    } else {
      return `W:H = ${ratio.toFixed(2)}, Optimal ^_^.`;
    }
  } else if (gender.toLowerCase() === "f") {
    if (ratio > 0.85 || w > 88) {
      return `W:H = ${ratio.toFixed(2)}, Abnormal.`;
    } else {
      return `W:H = ${ratio.toFixed(2)}, Optimal ^_^.`;
    }
  } else {
    return "GAYYYYYYYYYY!";
  }
}

function GFR(age, creatinine, gender, cystatin = 0.0) {
  creatinine /= 88.4; // Fix the conversion
  if (!["f", "m"].includes(gender.toLowerCase())) {
    return "GAYYYYYYYYYY!";
  }
  let A, C, B, D, gfr;
  if (cystatin !== 0) {
    if (gender.toLowerCase() === "f") {
      A = 0.7;
      C = 0.8;
      if (cystatin <= 0.8) {
        if (creatinine <= 0.7) {
          D = -0.323;
          B = -0.219;
        } else {
          D = -0.323;
          B = -0.544;
        }
      } else {
        if (creatinine <= 0.7) {
          D = -0.778;
          B = -0.219;
        } else {
          D = -0.778;
          B = -0.544;
        }
      }
    } else if (gender.toLowerCase() === "m") {
      A = 0.9;
      C = 0.8;
      if (cystatin <= 0.8) {
        if (creatinine <= 0.9) {
          D = -0.323;
          B = -0.144;
        } else {
          D = -0.323;
          B = -0.544;
        }
      } else {
        if (creatinine <= 0.9) {
          D = -0.778;
          B = -0.144;
        } else {
          D = -0.778;
          B = -0.544;
        }
      }
    }
    gfr =
      135 *
      Math.pow(creatinine / A, B) *
      Math.pow(cystatin / C, D) *
      Math.pow(0.9961, age);
  } else {
    if (gender.toLowerCase() === "f") {
      A = 0.7;
      B = creatinine <= 0.7 ? -0.241 : -1.2;
    } else if (gender.toLowerCase() === "m") {
      A = 0.9;
      B = creatinine <= 0.9 ? -0.302 : -1.2;
    }
    gfr = 142 * Math.pow(creatinine / A, B) * Math.pow(0.9938, age);
  }
  return `eGFR: ${gfr.toFixed(2)} ml/min/1.73 m².`;
}

function IBW(height, gender) {
  // Convert height cm -> inches
  height /= 2.54;
  let ibw = 2.3 * (height - 60);
  if (gender.toLowerCase() === "f") {
    return Math.round(ibw + 45.5);
  } else if (gender.toLowerCase() === "m") {
    return Math.round(ibw + 50);
  } else {
    return "GAYYYYYYYYYY!";
  }
}

function ABW(height, actualWeight, gender) {
  let ibw = IBW(height, gender);
  return [
    `Ideal body weight: ${Math.round(
      ibw
    )} kg, Adjusted body weight: ${Math.round(
      ibw + 0.4 * (actualWeight - ibw)
    )} kg.`,
    ibw,
  ];
}

function BMI(weight, height) {
  let heightInMeters = height / 100;
  let bmi = (weight / Math.pow(heightInMeters, 2)).toFixed(2);
  return `BMI: ${bmi} kg/m².`;
}

// function isObese(weight, height, gender) {
//   let ibw = IBW(height, gender);
//   return weight > ibw;
// }

function CrCl(creatinine, age, height, actualWeight, gender) {
  creatinine /= 88.4;
  age = age;
  height = height;
  actualWeight = actualWeight;
  let abw = ABW(height, actualWeight, gender)[1];
  let ibw = IBW(height, gender);
  let crclActual = ((140 - age) * actualWeight) / (creatinine * 72);
  let crclAdjusted = ((140 - age) * abw) / (creatinine * 72);
  let crclIdeal = ((140 - age) * ibw) / (creatinine * 72);
  let finalCrcl, whichCalc;

  if (actualWeight > ibw) {
    finalCrcl = crclAdjusted;
    whichCalc = "adjusted weight";
  } else if (actualWeight < ibw) {
    finalCrcl = crclActual;
    whichCalc = "actual weight";
  } else {
    finalCrcl = crclIdeal;
    whichCalc = "ideal weight";
  }
  if (gender.toLowerCase() === "f") {
    return `Creatinine clearance: ${Math.round(
      finalCrcl * 0.85
    )} mL/min, via (${whichCalc}).`;
  } else if (gender.toLowerCase() === "m") {
    return `Creatinine clearance: ${Math.round(
      finalCrcl.toFixed(1)
    )} mL/min, via (${whichCalc}).`;
  } else {
    return "GAYYYYYYYYYY!";
  }
}

// LMP calculation
function LMP(day, month, year) {
  let newMonth, newYear, newDay;
  if (month <= 3) {
    newMonth = month + 9;
    newYear = year;
  } else {
    newMonth = month - 3;
    newYear = year + 1;
  }

  newDay = day + 7;

  if (newDay > 31) {
    if ([1, 3, 5, 7, 8, 10, 12].includes(newMonth)) {
      newDay -= 31;
      newMonth += 1;
    } else {
      newDay -= 30;
      newMonth += 1;
    }
  }

  return [newDay, newMonth, newYear];
}

function GA(day, month, year) {
  let lmp = LMP(day, month, year);
  const date = new Date();

  let currentDay = date.getDate();
  let currentMonth = date.getMonth() + 1;
  let currentYear = date.getFullYear();

  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const endDate = new Date(currentYear, currentMonth - 1, currentDay);
  const startDate = new Date(year, month - 1, day);
  const diffMs = Math.abs(endDate - startDate);
  let weekDifference = diffMs / msPerWeek;
  let daysDifference = Math.round(
    (weekDifference - Math.floor(weekDifference)) * 7
  );

  startDate.setDate(startDate.getDate() + 279);

  const newDay = startDate.getDate();
  const newMonth = startDate.getMonth() + 1;
  const newYear = startDate.getFullYear();

  return `EDD: ${lmp[0]}-${lmp[1]}-${lmp[2]}, Gestational age: ${Math.floor(
    weekDifference
  )} weeks and ${daysDifference} days.`;
}

function ASCVD(
  isMale,
  isBlack,
  smoker,
  hypertensive,
  diabetic,
  age,
  systolicBloodPressure,
  totalCholesterol,
  hdl
) {
  computeTenYearScore(
    isMale,
    isBlack,
    smoker,
    hypertensive,
    diabetic,
    age,
    systolicBloodPressure,
    totalCholesterol,
    hdl
  );
}
export {
  TSAT,
  Mentz,
  ESR,
  CRP,
  W_to_H,
  GFR,
  IBW,
  ABW,
  BMI,
  CrCl,
  LMP,
  GA,
  ASCVD,
};
//? Testing
// console.log(TSAT(150, 400, "f"));

// console.log(Mentz(80, 8));

// console.log(ESR(25, "f"));

// console.log(CRP(25, "f"));

// console.log(W_to_H(85, 1.6, "f"));

// console.log(GFR(40, 1.5, "f"));

// console.log(IBW(160, "f"));

// console.log(ABW(160, 70, "f"));

// console.log(BMI(80, 1.7));

// console.log(isObese(70, 1.7, "f"));

// console.log(CrCl(1.1, 28, 160, 65, "f"));

// console.log(LMP(30, 10, 2025));
