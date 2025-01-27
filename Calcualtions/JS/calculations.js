import computeTenYearScore from "./helpers/ascvd_smol.js";

function TSAT(Fe, TIBC, gender) {
  let tsat = (Fe / TIBC) * 100;
  if (gender.toLowerCase() === "m") {
    return `TSAT = ${tsat.toFixed(
      2
    )}, < 12%, IDA!!!!DANGER!!! ur gonna dieee!! I am watching u 👁️  👁️`;
  } else if (gender.toLowerCase() === "f") {
    return `TSAT = ${tsat.toFixed(2)}, < 15%, IDA`;
  } else {
    return "GAYYYYYYYYYY!";
  }
}

function Mentz(MCV, RBC) {
  let mentz = MCV / RBC;
  if (mentz > 13) {
    return `Mentz = ${mentz.toFixed(2)}, IDA.`;
  } else if (mentz < 13) {
    return `Mentz = ${mentz.toFixed(2)}, Beta thal.`;
  } else {
    return `Mentz = ${mentz.toFixed(2)}, IDA + Beta thal, ur cooked!`;
  }
}

function ESR(age, gender) {
  if (gender.toLowerCase() === "m") {
    return `upper range of ESR = ${(age / 2).toFixed(2)}`;
  } else if (gender.toLowerCase() === "f") {
    return `upper range of ESR = ${((age + 10) / 2).toFixed(2)}`;
  } else {
    return "GAYYYYYYYYYY!";
  }
}

function CRP(age, gender) {
  if (gender.toLowerCase() === "m") {
    return `upper range of CRP = ${(age / 50).toFixed(2)}`;
  } else if (gender.toLowerCase() === "f") {
    return `upper range of CRP = ${(age / 50 + 0.6).toFixed(2)}`;
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
  return `GFR = ${gfr.toFixed(2)} ml/min/1.73 m²`;
}

function IBW(height, gender) {
  // Convert height cm -> inches
  height /= 2.54;
  let ibw = 2.3 * (height - 60);
  if (gender.toLowerCase() === "f") {
    return ibw + 45.5;
  } else if (gender.toLowerCase() === "m") {
    return ibw + 50;
  } else {
    return "GAYYYYYYYYYY!";
  }
}

function ABW(height, actualWeight, gender) {
  let ibw = IBW(height, gender);
  return ibw + 0.4 * (actualWeight - ibw);
}

function BMI(weight, height) {
  return `${(weight / Math.pow(height, 2)).toFixed(2)} kg/m²`;
}

function isObese(weight, height, gender) {
  let ibw = IBW(height, gender);
  return weight > ibw;
}

function CrCl(creatinine, age, height, actualWeight, gender) {
  creatinine /= 88.4;
  let abw = ABW(height, actualWeight, gender);
  let crcl = ((140 - age) * abw) / (creatinine * 72);
  if (gender.toLowerCase() === "f") {
    return crcl * 0.85;
  } else if (gender.toLowerCase() === "m") {
    return crcl;
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
  return `EDD = (${newDay}, ${newMonth}, ${newYear})`;
}

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
