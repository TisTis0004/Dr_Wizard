const scrollUpButton = document.getElementById("scrollUpButton");
const scrollToPosition = 200;

window.addEventListener("scroll", function () {
  if (window.scrollY > 200) {
    scrollUpButton.style.visibility = "visible";
    scrollUpButton.style.opacity = "1";
  } else {
    scrollUpButton.style.visibility = "hidden";
    scrollUpButton.style.opacity = "0";
  }
});

scrollUpButton.addEventListener("click", function () {
  window.scrollTo({
    top: scrollToPosition,
    behavior: "smooth",
  });
});

let globalVars = null;
function categorizeAge(age) {
  if (age >= 3 && age <= 12) {
    ageImg.src = "Assets/images/boy.png";
  } else if (age >= 13 && age <= 19) {
    ageImg.src = "Assets/images/teenager.png";
  } else if (age >= 20 && age <= 39) {
    ageImg.src = "Assets/images/adult.png";
  } else if (age >= 40 && age <= 59) {
    ageImg.src = "Assets/images/middle_aged.png";
  } else if (age >= 60 && age <= 100) {
    ageImg.src = "Assets/images/old.png";
  }
}

const rangeInput = document.querySelector(".age-range");
const rangeValue = document.querySelector(".range-value");
const ageImg = document.querySelector(".age-img");

rangeInput.addEventListener("input", function () {
  const age = parseInt(this.value);
  if (age < 10) {
    rangeValue.innerHTML = "0" + age;
  } else {
    rangeValue.innerHTML = age;
  }
  categorizeAge(parseInt(rangeValue.innerHTML));
  checkInputs();
});

let gender;
const genderSymbol = document.querySelector(".gender-symbol");
const genderArrow = document.querySelector(".gender-arrow");
const arrowHead = document.querySelector(".arrow-head");
const cross = document.querySelector(".female-cross");
const genderImage = document.querySelector(".gender-image");
const eyes = document.querySelector(".eye");
const radioMale = document.getElementById("male");
const radioFemale = document.getElementById("female");
const maleLabel = document.querySelector(".gender-label-male");
const femaleLabel = document.querySelector(".gender-label-female");

function updateGenderSymbol() {
  if (radioMale.checked) {
    gender = "m";
    genderSymbol.classList.add("male-color");
    genderSymbol.classList.remove("female-color");
    maleLabel.classList.add("gender-label-male-active");
    femaleLabel.classList.remove("gender-label-female-active");
    gsap.to(genderArrow, {
      y: 0,
      x: 0,
      scaleY: 15,
      rotate: 45,
      duration: 1,
      background: "#295511",
      ease: "ease",
    });
    gsap.fromTo(arrowHead, { y: -50 }, { duration: 1, y: 0, ease: "ease" });
    gsap.to(cross, {
      y: -50,
      x: 0,
      duration: 1,
      rotate: -90,
      background: "transparent",
      ease: "ease",
    });
    gsap.to(genderImage, {
      scale: 0.6,
      rotate: 10,
      x: -30,
      y: -50,
    });
    gsap.to(genderImage, {
      // background: "#64399b",
      duration: 0.01,
    });
    arrowHead.style.borderBottomColor = "#295511";
    genderImage.style.visibility = "visible";
    genderImage.src = "Assets/images/wizard_hat.webp";
  } else if (radioFemale.checked) {
    gender = "f";
    genderSymbol.classList.add("female-color");
    genderSymbol.classList.remove("male-color");
    femaleLabel.classList.add("gender-label-female-active");
    maleLabel.classList.remove("gender-label-male-active");
    gsap.to(genderArrow, {
      y: 113,
      x: -45,
      scaleY: 15,
      rotate: 0,
      duration: 1,
      background: "#863562",
      ease: "ease",
    });
    gsap.to(arrowHead, {
      y: -50,
    });
    gsap.to(cross, {
      y: 75,
      x: 65,
      duration: 1,
      rotate: 90,
      background: "#863562",
      ease: "ease",
    });
    genderImage.style.visibility = "visible";
    genderImage.src = "Assets/images/witch_hat.webp";
    arrowHead.style.borderBottomColor = "transparent";
    gsap.to(genderImage, {
      scale: 0.6,
      rotate: -10,
      x: 30,
      y: -50,
    });
    gsap.to(genderImage, {
      background: "transparent",
      duration: 0.01,
    });
  }
  gsap.to(eyes, {
    scale: 1,
    x: 28,
    y: 10,
  });
  checkInputs();
}

radioMale.addEventListener("change", updateGenderSymbol);
radioFemale.addEventListener("change", updateGenderSymbol);

const numberInputs = document.querySelectorAll(".number-input");
const submitButton = document.querySelector(".submit-container");
const submitIndicator = document.querySelector(".submit-indicator");

function checkInputs() {
  let allFilled = true;

  if (rangeInput.value === "") {
    allFilled = false;
  }

  numberInputs.forEach((input) => {
    if (input.value === "") {
      allFilled = false;
    }
  });

  if (!radioMale.checked && !radioFemale.checked) {
    allFilled = false;
  }

  if (allFilled) {
    submitButton.classList.add("submit-container-active");
    submitButton.classList.remove("submit-container-inactive");
  } else {
    submitButton.classList.remove("submit-container-active");
    submitButton.classList.add("submit-container-inactive");
  }
}

numberInputs.forEach((input) => {
  input.addEventListener("input", checkInputs);
});

submitButton.addEventListener("click", function () {
  if (submitButton.classList.contains("submit-container-active")) {
    globalVars = {
      Gender: gender,
      Age: age.value,
      Height: numberInputs[0].value,
      Waist: numberInputs[1].value,
      Hips: numberInputs[2].value,
      Weight: numberInputs[3].value,
    };
    calculateFormula();
  }
  let vowel;
  if (globalVars.Age == 8 || (globalVars.Age > 79 && globalVars.Age < 90)) {
    vowel = "An";
  } else {
    vowel = "A";
  }
  let genderString;
  if (globalVars.Gender == "m") {
    genderString = "gentleman";
  } else {
    genderString = "lady";
  }
  submitIndicator.innerHTML = `${vowel} ${globalVars.Age} years old ${genderString}, has visited the clinic.`;
  submitIndicator.classList.add("submit-indicator-active");
  navigator.clipboard.writeText(submitIndicator.innerHTML);
  copyAlert("The patient");
});

// PHQ-9
const rangePHQ1 = document.getElementById("PHQ-1");
const rangePHQ2 = document.getElementById("PHQ-2");
const PHQ = document.querySelector(".PHQ-9");
rangePHQ1.addEventListener("input", () => {
  if (parseInt(rangePHQ1.value) + parseInt(rangePHQ2.value) >= 3) {
    PHQ.classList.add("PHQ-9-positive");
  } else {
    PHQ.classList.remove("PHQ-9-positive");
    for (let i = 2; i < PHQRanges.length; i++) {
      PHQRanges[i].value = 0;
    }
  }
});
rangePHQ2.addEventListener("input", () => {
  if (parseInt(rangePHQ1.value) + parseInt(rangePHQ2.value) >= 3) {
    PHQ.classList.add("PHQ-9-positive");
  } else {
    PHQ.classList.remove("PHQ-9-positive");
    for (let i = 2; i < PHQRanges.length; i++) {
      PHQRanges[i].value = 0;
    }
  }
});

const GADRanges = document.querySelectorAll(".GAD-range");
const PHQRanges = document.querySelectorAll(".PHQ-range");
const orbImg = document.querySelector(".orb");
const orbIndicator = document.querySelector(".orb-indicator");
const orbContainer = document.querySelector(".orb-indicator-container");
const GADTotal = document.querySelector(".GAD-total");
const PHQTotal = document.querySelector(".PHQ-total");

let GADsum;
let PHQTemp;
let PHQTempValues = [];
GADRanges.forEach((range) => {
  range.addEventListener("input", () => {
    GADTempValues = [];
    GADTemp = [];
    PHQRanges.forEach((range, i) => {
      PHQTempValues.push(range.value);
      if (range.value > 0) PHQTemp.push(i);
      range.value = 0;
    });
    PHQ.classList.remove("PHQ-9-positive");
    // PHQTotal.innerHTML = "0";
    GADsum = 0;
    for (let i = 0; i < GADRanges.length; i++) {
      GADsum += parseInt(GADRanges[i].value);
    }
    if (GADsum >= 0 && GADsum <= 4) {
      orbImg.src = "Assets/images/happy_orb.webp";
    } else if (GADsum >= 5 && GADsum <= 9) {
      orbImg.src = "Assets/images/GAD_mild.webp";
    } else if (GADsum >= 10 && GADsum <= 14) {
      // orbImg.src = "Assets/images/GAD_moderate.webp";
      orbImg.src = "Assets/images/GAD_moderate_test.png";
    } else {
      orbImg.src = "Assets/images/GAD_severe.webp";
    }
    orbIndicator.classList.remove("orb-indicator-alt");
    orbContainer.style.opacity = "1";
    orbContainer.style.visibility = "visible";

    if (GADsum < 10 && GADsum != 0) {
      GADTotal.innerHTML = "0" + GADsum;
    } else {
      GADTotal.innerHTML = GADsum;
    }
  });
});
let PHQsum;
let GADTemp;
let GADTempValues = [];
PHQRanges.forEach((range) => {
  range.addEventListener("input", () => {
    PHQTempValues = [];
    PHQTemp = [];
    GADRanges.forEach((range, i) => {
      GADTempValues.push(range.value);
      if (range.value > 0) GADTemp.push(i);
      range.value = 0;
    });
    PHQsum = 0;
    for (let i = 0; i < PHQRanges.length; i++) {
      PHQsum += parseInt(PHQRanges[i].value);
    }
    if (PHQsum >= 0 && PHQsum <= 4) {
      orbImg.src = "Assets/images/happy_orb.webp";
    } else if (PHQsum >= 5 && PHQsum <= 9) {
      orbImg.src = "Assets/images/PHQ_mild.webp";
    } else if (PHQsum >= 10 && PHQsum <= 14) {
      orbImg.src = "Assets/images/PHQ_moderate.webp";
    } else {
      orbImg.src = "Assets/images/PHQ_severe.webp";
    }
    orbIndicator.classList.add("orb-indicator-alt");
    orbContainer.classList.add(".orb-indicator-container-alt");
    orbContainer.style.opacity = "1";
    orbContainer.style.visibility = "visible";

    if (PHQsum < 10 && PHQsum != 0) {
      PHQTotal.innerHTML = "0" + PHQsum;
    } else {
      PHQTotal.innerHTML = PHQsum;
    }
  });
});
const GADcopy = document.querySelector(".GAD-copy");
const PHQcopy = document.querySelector(".PHQ-copy");
const GADLabels = document.querySelectorAll(".GAD-label");
GADcopy.addEventListener("click", () => {
  let GADLabelTextCopy = `GAD-7 Results:\n`;
  GADRanges.forEach((range, i) => {
    if (range.value > 0) {
      GADLabelTextCopy += `${GADLabels[i].innerText} ${range.value} \n`;
    }
  });
  let GADCondition;
  if (GADsum >= 0 && GADsum <= 4) {
    GADCondition = "Happy.";
  } else if (GADsum >= 5 && GADsum <= 9) {
    GADCondition = "Mild anxiety.";
  } else if (GADsum >= 10 && GADsum <= 14) {
    GADCondition = "Moderate anxiety.";
  } else {
    GADCondition = "Severe anxiety.";
  }
  GADLabelTextCopy += `Total Score: ${GADsum} → ${GADCondition}`;
  if (
    GADLabelTextCopy ===
    `GAD-7 Results:\nTotal Score: ${GADsum} → ${GADCondition}`
  ) {
    GADLabelTextCopy = `GAD-7 Results:\n`;
    GADTemp.forEach((i) => {
      GADLabelTextCopy += `${GADLabels[i].innerHTML.trim()} ${
        GADTempValues[i]
      } \n`;
    });
    GADLabelTextCopy += `Total Score: ${GADsum} → ${GADCondition}`;
  }
  navigator.clipboard.writeText(GADLabelTextCopy);
  copyAlert("GAD-7 results");
});

const PHQLabels = document.querySelectorAll(".PHQ-label");
PHQcopy.addEventListener("click", () => {
  let PHQLabelTextCopy = `PHQ-9 Results:\n`;
  PHQRanges.forEach((range, i) => {
    if (range.value > 0) {
      PHQLabelTextCopy += `${PHQLabels[i].innerText} ${range.value} \n`;
    }
  });
  let PHQCondition;
  if (PHQsum >= 0 && PHQsum <= 4) {
    PHQCondition = "Happy.";
  } else if (PHQsum >= 5 && PHQsum <= 9) {
    PHQCondition = "Mild depression.";
  } else if (PHQsum >= 10 && PHQsum <= 14) {
    PHQCondition = "Moderate depression.";
  } else {
    PHQCondition = "Severe depression.";
  }
  PHQLabelTextCopy += `Total Score: ${PHQsum} → ${PHQCondition}`;
  if (
    PHQLabelTextCopy ===
    `PHQ-9 Results:\nTotal Score: ${PHQsum} → ${PHQCondition}`
  ) {
    PHQLabelTextCopy = `PHQ-9 Results:\n`;
    PHQTemp.forEach((i) => {
      PHQLabelTextCopy += `${PHQLabels[i].innerHTML.trim()} ${
        PHQTempValues[i]
      } \n`;
    });
    PHQLabelTextCopy += `Total Score: ${PHQsum} → ${PHQCondition}`;
  }
  navigator.clipboard.writeText(PHQLabelTextCopy);
  copyAlert("PHQ-9 results");
});

//todo==================================Formulas======================================
import {
  TSAT,
  Mentz,
  ESR,
  CRP,
  W_to_H,
  GFR,
  ABW,
  BMI,
  CrCl,
  GA,
  ASCVD,
} from "./Calcualtions/JS/calculations.js";
const gestationalEDD = document.getElementById("Gestational-EDD");
const idealAdjusted_waistToHips_bmi = document.getElementById(
  "Ideal_weight-Adjusted_weight-waist_to_hips-BMI"
);
const ascvd = document.getElementById("ASCVD");
const tsat_mentz = document.getElementById("TSAT-Mentz");
const egfr_CrCl = document.getElementById("eGFR-CrCl");
const crp_esr = document.getElementById("CRP-ESR");
const formulasBtns = [
  gestationalEDD,
  idealAdjusted_waistToHips_bmi,
  ascvd,
  tsat_mentz,
  egfr_CrCl,
  crp_esr,
];
const inputDivs = document.querySelectorAll(".formula-inputs-sub-container");
const hdl = document.getElementById("hdl");
const chol = document.getElementById("chol");
const bp = document.getElementById("bp");
const lmp = document.getElementById("lmp");
const creatinine = document.getElementById("creatinine");
const cystatin = document.getElementById("cystatin");
const TIBC = document.getElementById("TIBC");
const Fe = document.getElementById("Fe");
const MCV = document.getElementById("MCV");
const RBC = document.getElementById("RBC");
const black = document.getElementById("black");
const smoker = document.getElementById("smoker");
const hypertensive = document.getElementById("hypertensive");
const diabetic = document.getElementById("diabetic");
const formulasShowInputs = {
  "Gestational age + EDD": [inputDivs[3]],
  "ASCVD Risk": [inputDivs[0], inputDivs[1], inputDivs[2], inputDivs[10]],
  "eGFR + CrCl": [inputDivs[4], inputDivs[5]],
  "TSAT + Mentz": [inputDivs[6], inputDivs[7], inputDivs[8], inputDivs[9]],
  "Ideal/Adjusted Weight + Waist to Hips Ratio + BMI": [],
  "CRP + ESR": [],
};
let calculation;
formulasBtns.forEach((formula) => {
  formula.addEventListener("click", () => {
    formulaResult.classList.remove("big");
    formulaResult.classList.remove("medium");
    formulaResult.classList.remove("small");
    fillRequiredFields(formulasShowInputs[formula.innerText]);
    calculation = formula.innerText;
    inputDivs.forEach((box) => {
      box.style.display = "none";
    });
    formulasShowInputs[formula.innerText].forEach((box) => {
      box.style.display = "block";
    });
    if (calculation == "CRP + ESR") {
      if (globalVars == null) {
        alertCraftPatient();
      } else {
        let copyText = `${CRP(globalVars["Age"], globalVars["Gender"])} \n${ESR(
          globalVars["Age"],
          globalVars["Gender"]
        )}`;
        formulaResult.innerText = copyText;
        navigator.clipboard.writeText(copyText);
        copyAlert(calculation);
        formulaResult.classList.add("big");
      }
    } else if (
      calculation == "Ideal/Adjusted Weight + Waist to Hips Ratio + BMI"
    ) {
      if (globalVars == null) {
        alertCraftPatient();
      } else {
        let copyText = `${
          ABW(
            globalVars["Height"],
            globalVars["Weight"],
            globalVars["Gender"]
          )[0]
        }\n${W_to_H(
          globalVars["Waist"],
          globalVars["Hips"],
          globalVars["Gender"]
        )}\n${BMI(globalVars["Weight"], globalVars["Height"])}`;
        formulaResult.innerText = copyText;
        navigator.clipboard.writeText(copyText);
        copyAlert(calculation);
        formulaResult.classList.add("small");
      }
    }
  });
});
//     formulaResult.innerText = formulas[formula.id];
//     navigator.clipboard.writeText(formulaResult.textContent);
//     copyAlert(formula.id);
const formulasInputs = [
  hdl,
  chol,
  bp,
  lmp,
  creatinine,
  cystatin,
  TIBC,
  Fe,
  MCV,
  RBC,
  black,
  smoker,
  hypertensive,
  diabetic,
];
const style = `
          background-color: #ff000086;
          border-color:#ff0000
        `;
function clearInputStyle() {
  formulasInputs.forEach((input) => {
    input.style.cssText = "";
  });
}
function fillRequiredFields(inputs) {
  formulaResult.innerText = "Please fill the required fields";
  inputs.forEach((input) => {
    if (input.value == "") input.style.cssText = style;
  });
}
function alertCraftPatient() {
  formulaResult.innerText = "Please craft your patient";
  gsap.fromTo(
    scrollUpButton,
    {
      scale: 1.5,
      duration: 1.5,
      boxShadow: "1px 1px 30px #f00",
      ease: "ease",
    },
    {
      scale: 1,
      duration: 1.5,
      boxShadow: "1px 1px 0px #000",
      scale: 1,
      ease: "ease",
    }
  );
}
// formulasInputs.forEach((input) => {
//   input.addEventListener("change", () => {
//     calculateFormula();
//   });
// });
formulasInputs.forEach((input) => {
  input.addEventListener("input", () => {
    calculateFormula();
  });
});
function calculateFormula() {
  if (calculation == "TSAT + Mentz") {
    if (
      MCV.value == "" &&
      RBC.value == "" &&
      Fe.value == "" &&
      TIBC.value == ""
    ) {
      clearInputStyle();
    } else if (
      (MCV.value == "" || RBC.value == "") &&
      Fe.value == "" &&
      TIBC.value == ""
    ) {
      fillRequiredFields([MCV, RBC]);
    } else if (
      (Fe.value == "" || TIBC.value == "") &&
      MCV.value != "" &&
      RBC.value != ""
    ) {
      let copyText = `${Mentz(parseFloat(MCV.value), parseFloat(RBC.value))}`;
      clearInputStyle();
      navigator.clipboard.writeText(copyText);
      copyAlert(calculation);

      formulaResult.classList.add("medium");
    } else if (globalVars == null) {
      alertCraftPatient();
    } else if (
      (Fe.value == "" || TIBC.value == "") &&
      MCV.value == "" &&
      RBC.value == ""
    ) {
      fillRequiredFields([Fe, TIBC]);
    } else if (
      (MCV.value == "" || RBC.value == "") &&
      Fe.value != "" &&
      TIBC.value != ""
    ) {
      let copyText = `${TSAT(Fe.value, TIBC.value, globalVars["Gender"])}`;
      clearInputStyle();
      formulaResult.innerText = copyText;
      navigator.clipboard.writeText(copyText);
      copyAlert(calculation);

      formulaResult.classList.add("medium");
    } else if (
      (TIBC.value != "" &&
        MCV.value != "" &&
        RBC.value == "" &&
        Fe.value == "") ||
      (Fe.value != "" &&
        MCV.value != "" &&
        RBC.value == "" &&
        TIBC.value == "") ||
      (Fe.value != "" &&
        RBC.value != "" &&
        TIBC.value == "" &&
        MCV.value == "") ||
      (RBC.value != "" && TIBC.value != "" && Fe.value == "" && MCV.value == "")
    ) {
      fillRequiredFields([Fe, MCV, RBC, TIBC]);
    } else {
      let copyText = `${TSAT(
        parseFloat(Fe.value),
        parseFloat(TIBC.value),
        globalVars["Gender"]
      )} \n${Mentz(parseFloat(MCV.value), parseFloat(RBC.value))}`;
      clearInputStyle();
      formulaResult.innerText = copyText;
      navigator.clipboard.writeText(copyText);
      copyAlert(calculation);

      formulaResult.classList.add("medium");
    }
  } else if (calculation == "eGFR + CrCl") {
    if (globalVars == null) {
      alertCraftPatient();
    } else if (cystatin.value != "" && creatinine.value == "") {
      clearInputStyle();
      fillRequiredFields([creatinine]);
    } else if (creatinine.value == "" && creatinine.value == "") {
      fillRequiredFields([creatinine, cystatin]);
    } else {
      let copyText = `${GFR(
        globalVars["Age"],
        parseFloat(creatinine.value),
        globalVars["Gender"],
        isNaN(parseFloat(cystatin.value)) ? 0 : parseFloat(cystatin.value)
      )} \n${CrCl(
        parseFloat(creatinine.value),
        globalVars["Age"],
        globalVars["Height"],
        globalVars["Weight"],
        globalVars["Gender"]
      )}`;
      clearInputStyle();
      formulaResult.innerText = copyText;
      navigator.clipboard.writeText(copyText);
      copyAlert(calculation);

      formulaResult.classList.add("medium");
    }
  } else if (calculation == "Gestational age + EDD") {
    const [year, month, day] = lmp.value.split("-");
    let copyText = GA(parseInt(day), parseInt(month), parseInt(year));
    formulaResult.innerText = copyText;
    navigator.clipboard.writeText(copyText);
    copyAlert(calculation);

    formulaResult.classList.add("big");
  } else if (calculation == "ASCVD Risk") {
    let tempInputs = [hdl.value == "", chol.value == "", bp.value == ""];
    if (
      !black.checked &&
      !smoker.checked &&
      !hypertensive.checked &&
      !diabetic.checked &&
      hdl.value == "" &&
      chol.value == "" &&
      bp.value == ""
    ) {
      clearInputStyle();
    } else if (globalVars == null) {
      alertCraftPatient();
    } else if (tempInputs.includes(true)) {
      formulaResult.innerText = "Please fill the required fields";
    } else {
      let isMale = globalVars["Gender"] == "m" ? true : false;
      let copyText = ASCVD(
        isMale,
        black.checked,
        smoker.checked,
        hypertensive.checked,
        diabetic.checked,
        parseInt(globalVars["Age"]),
        parseFloat(bp.value),
        parseFloat(chol.value),
        parseFloat(hdl.value)
      );
      formulaResult.innerText = copyText;
      navigator.clipboard.writeText(copyText);
      copyAlert(calculation);
      formulaResult.classList.add("big");
    }
  }
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function removeCopyBoxes() {
  const boxes1 = document.querySelectorAll(".copy-hide");
  const boxes2 = document.querySelectorAll(".press-alert-hide");
  boxes1.forEach((box) => {
    box.remove();
  });
  boxes2.forEach((box) => {
    box.remove();
  });
}
const formulaResult = document.querySelector(".formula-result");
const EXCLUDED_STRINGS = new Set([
  "GAD-7 results",
  "PHQ-9 results",
  "The patient",
]);
function copyAlert(copiedText) {
  copiedText = String(copiedText);
  if (!EXCLUDED_STRINGS.has(copiedText)) {
    copiedText = copiedText.replaceAll("_", " ");

    copiedText = copiedText.replaceAll("-", ", ");
  }
  const copyAlertMessage = document.createElement("div");
  let singularPlural;
  if (copiedText.includes("patient") || copiedText.includes("ASCVD")) {
    singularPlural = "has";
  } else {
    singularPlural = "have";
  }
  copyAlertMessage.innerHTML = `
        <svg style="width: 18px; height: 18px; fill: currentColor;" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        <span>${copiedText} ${singularPlural} been copied to clipboard</span>
    `;

  copyAlertMessage.classList.add("copy-alert");
  copyAlertMessage.classList.remove("copy-hide");
  copyAlertMessage.classList.add("copy-show");
  document.body.appendChild(copyAlertMessage);
  setTimeout(() => {
    copyAlertMessage.classList.remove("copy-show");
    copyAlertMessage.classList.add("copy-hide");
  }, 2500);
  setTimeout(() => {
    removeCopyBoxes();
  }, 3000);
}
//todo=========================================== Conversion ===========================================
import {
  Glucose_mg_to_mmol,
  Glucose_mmol_to_mg,
  Triglyceride_mg_to_mmol,
  Triglyceride_mmol_to_mg,
  Cholesterol_mg_to_mmol,
  Cholesterol_mmol_to_mg,
  Calcium_mg_to_mmol,
  Calcium_mmol_to_mg,
  Hgb1ac_percent_to_unit,
  hijri_to_gregorian,
} from "./Calcualtions/JS/conversions.js";
const options = document.querySelectorAll(".option");
const dropBtnText = document.getElementById("button-text");
const convHead1 = document.querySelector(".conversion-sub-heading-1");
const conversionsMmolMg = {
  Glucose: [Glucose_mg_to_mmol, Glucose_mmol_to_mg],
  Triglyceride: [Triglyceride_mg_to_mmol, Triglyceride_mmol_to_mg],
  Cholesterol: [Cholesterol_mg_to_mmol, Cholesterol_mmol_to_mg],
  Calcium: [Calcium_mg_to_mmol, Calcium_mmol_to_mg],
};
const otherConversions = {
  Hgb1Ac: Hgb1ac_percent_to_unit,
  gregorian: hijri_to_gregorian,
};
function showGregorian(show) {
  if (show) {
    conversionBox1.style.display = "none";
    conversionBox2.style.display = "none";
    conversionBoxResult[0].style.display = "none";
    conversionBoxResult[1].style.display = "none";
    conversionBoxDay.style.display = "block";
    conversionBoxMonth.style.display = "block";
    conversionBoxYear.style.display = "block";
    conversionBoxDateResult.style.display = "block";
  } else {
    conversionBox1.style.display = "block";
    conversionBox2.style.display = "block";
    conversionBoxResult[0].style.display = "block";
    conversionBoxResult[1].style.display = "block";
    conversionBoxDay.style.display = "none";
    conversionBoxMonth.style.display = "none";
    conversionBoxYear.style.display = "none";
    conversionBoxDateResult.style.display = "none";
  }
}
let currentConversion;
options.forEach((option) => {
  option.addEventListener("click", () => {
    dropBtnText.innerText = option.innerText;
    currentConversion = option.innerText;
    convHead1.innerText = option.innerText + " conversion";
    conversionBox1.value = "";
    conversionBox2.value = "";
    if (currentConversion.includes("Hgb1Ac")) {
      showGregorian(false);
      conversionBoxResult[0].innerText = "%";
      conversionBoxResult[1].innerText = "mg/dL";
    } else if (currentConversion.includes("gregorian")) {
      showGregorian(true);
    } else {
      showGregorian(false);
      conversionBoxResult[0].innerText = "mg";
      conversionBoxResult[1].innerText = "mmol";
    }
  });
});
const conversionBoxResult = document.querySelectorAll(".conversion-result");
const conversionBox1 = document.getElementById("conversion-input-1");
const conversionBox2 = document.getElementById("conversion-input-2");
const conversionBoxDay = document.getElementById("conversion-input-day");
const conversionBoxMonth = document.getElementById("conversion-input-month");
const conversionBoxYear = document.getElementById("conversion-input-year");
const conversionBoxDateResult = document.getElementById(
  "conversion-input-date-result"
);

mmolMgConversions(conversionBox1, conversionBox2, true);
mmolMgConversions(conversionBox2, conversionBox1, false);

function mmolMgConversionCopy(input, output, toMmol) {
  let first, second;
  if (toMmol) {
    first = "mg";
    second = "mmol";
  } else {
    first = "mmol";
    second = "mg";
  }
  let copyText = currentConversion.split(" ")[0];
  let s = `${input.value} ${first} of ${copyText} is equivalent to ${output.value} ${second}`;
  navigator.clipboard.writeText(s);
  copyAlert(copyText);
}
function mmolMgConversions(input, output, toMmol) {
  let index = toMmol ? 0 : 1;
  input.addEventListener("input", () => {
    if (currentConversion == undefined) {
      convHead1.innerText = "Please select a conversion";
      gsap.fromTo(
        convHead1,
        {
          duration: 0.8,
          scale: 1.1,
          color: "#F00",
          ease: "ease",
        },
        {
          scale: 1,
          duration: 0.8,
          color: "#C8C8C8",
          ease: "ease",
        }
      );
    } else if (
      conversionBox1.value.includes("-") ||
      conversionBox2.value.includes("-")
    ) {
      output.value = "0.00";
    } else if (currentConversion.includes("Glucose")) {
      output.value = conversionsMmolMg["Glucose"][index](input.value);
      mmolMgConversionCopy(input, output, toMmol);
    } else if (currentConversion.includes("Triglyceride")) {
      output.value = conversionsMmolMg["Triglyceride"][index](input.value);
      mmolMgConversionCopy(input, output, toMmol);
    } else if (currentConversion.includes("Cholesterol")) {
      output.value = conversionsMmolMg["Cholesterol"][index](input.value);
      mmolMgConversionCopy(input, output, toMmol);
    } else if (currentConversion.includes("Calcium")) {
      output.value = conversionsMmolMg["Calcium"][index](input.value);
      mmolMgConversionCopy(input, output, toMmol);
    } else if (currentConversion.includes("Hgb1Ac")) {
      if (conversionBox1.value == "") {
        conversionBox2.value = "";
      } else {
        conversionBox2.style.caretColor = "#fff";
        conversionBox2.value = Hgb1ac_percent_to_unit(
          parseFloat(conversionBox1.value)
        );
        let copyText = currentConversion.split(" ")[0];
        let s = `${conversionBox1.value}% of Hgb1Ac is equivalent to ${conversionBox2.value} mg/dL`;
        navigator.clipboard.writeText(s);
        copyAlert(copyText);
      }
    }
  });
}
let dateboxes = [conversionBoxDay, conversionBoxMonth, conversionBoxYear];

dateboxes.forEach((box) => {
  box.addEventListener("input", () => {
    if (
      conversionBoxDay.value == "" ||
      conversionBoxMonth.value == "" ||
      conversionBoxYear.value == ""
    ) {
      conversionBoxDateResult.value = "";
    } else {
      if (
        parseInt(conversionBoxYear.value) == 1999 &&
        parseInt(conversionBoxMonth.value) == 2 &&
        parseInt(conversionBoxDay.value) == 27
      ) {
        window.open("SUR.html");
      } else if (
        parseInt(conversionBoxYear.value) < 0 ||
        parseInt(conversionBoxYear.value) > 9999
      ) {
        conversionBoxDateResult.value = "Invalid Year";
        parseInt(conversionBoxMonth.value);
        parseInt(conversionBoxDay.value);
      } else if (
        parseInt(conversionBoxDay.value) <= 0 ||
        parseInt(conversionBoxDay.value) > 31
      ) {
        conversionBoxDateResult.value = "Invalid Day";
      } else if (
        parseInt(conversionBoxMonth.value) <= 0 ||
        parseInt(conversionBoxMonth.value) > 12
      ) {
        conversionBoxDateResult.value = "Invalid Month";
      } else {
        conversionBoxDateResult.value = hijri_to_gregorian(
          parseInt(conversionBoxYear.value),
          parseInt(conversionBoxMonth.value),
          parseInt(conversionBoxDay.value)
        );
        let copyText = currentConversion.split(" ")[1];
        copyText =
          copyText[0].toUpperCase() + copyText.slice(1, copyText.length);
        let s = `The estimated Gregorian date from Hijri is: ${conversionBoxDateResult.value}`;
        navigator.clipboard.writeText(s);
        copyAlert(copyText);
      }
    }
  });
});
const randomPress = document.querySelector(".random-press");
const allSentences = {
  x: [
    "🔥 Press [X] to cast Health Spell.",
    "⚔️ Slaying confusion with pixelated precision!  ",
  ],
  h: [
    "🌞 Press [H] to harvest wisdom.",
    "📟 Calculating your health, one pixel at a time!",
  ],
  " ": [
    "🌌 Press [SPACE] to continue your journey.",
    "📺 Now loading... 8-bit health wisdom.",
  ],
  Escape: [
    "⌨️ Press [ESC] to exit reality.",
    "🕹️ Player 1: Ready! Player 2: Your patient.",
  ],
};
let randomSentenceIndex;
function generateRandomSentence() {
  randomSentenceIndex = Math.floor(Math.random() * 4);
  randomPress.innerHTML = `<span>${
    allSentences[Object.keys(allSentences)[randomSentenceIndex]][0]
  }</span>`;
}
generateRandomSentence();
setInterval(() => {
  generateRandomSentence();
}, 6000);
function pressAlert(text) {
  const pressAlertMessage = document.createElement("div");
  pressAlertMessage.innerHTML = `
        <span>${text}</span>
    `;

  pressAlertMessage.classList.add("press-alert");
  pressAlertMessage.classList.remove("press-alert-hide");
  pressAlertMessage.classList.add("press-alert-show");
  document.body.appendChild(pressAlertMessage);
  setTimeout(() => {
    pressAlertMessage.classList.remove("press-alert-show");
    pressAlertMessage.classList.add("press-alert-hide");
  }, 2500);
  setTimeout(() => {
    removeCopyBoxes();
  }, 3000);
}
document.addEventListener("keydown", (key) => {
  if (key.key == Object.keys(allSentences)[randomSentenceIndex]) {
    pressAlert(allSentences[key.key][1]);
  }
});
