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
let formulas = null;
function categorizeAge(age) {
  if (age >= 3 && age <= 12) {
    ageImg.src = "Assets/images/boy.png";
  } else if (age >= 13 && age <= 19) {
    ageImg.src = "Assets/images/teenager.png";
  } else if (age >= 20 && age <= 39) {
    ageImg.src = "Assets/images/adult.png";
  } else if (age >= 40 && age <= 59) {
    ageImg.src = "Assets/images/middle_aged.png";
  } else if (age >= 60 && age <= 99) {
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
    console.log(globalVars);
    formulas = {
      "Gestational-EDD": { inputs: ["LMP"], result: null }, //GA(5, 5, 2024)
      "Ideal_weight-Adjusted_weight-waist_to_hips-BMI": `${
        ABW(globalVars["Height"], globalVars["Weight"], globalVars["Gender"])[0]
      } \n${W_to_H(
        globalVars["Waist"],
        globalVars["Hips"],
        globalVars["Gender"]
      )} \n${BMI(globalVars["Weight"], globalVars["Height"])}`,
      ASCVD: null, //ASCVD,
      "TSAT-Mentz": { inputs: ["MCV", "RBC", "Fe", "TIBC"], result: null }, //`${TSAT(7, 40, globalVars["Gender"])} \n${Mentz(91, 7)}`,
      "eGFR-CrCl": { inputs: ["creatinine", "cystatin"], result: null },
      // `${GFR(
      //   globalVars["Age"],
      //   80,
      //   globalVars["Gender"]
      // )} \n${CrCl(
      //   80,
      //   globalVars["Age"],
      //   globalVars["Height"],
      //   globalVars["Weight"],
      //   globalVars["Gender"]
      // )}`,
      "CRP-ESR": `${CRP(globalVars["Age"], globalVars["Gender"])} \n${ESR(
        globalVars["Age"],
        globalVars["Gender"]
      )}`,
    };
    console.log(formulas);
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
];
formulasBtns.forEach((formula) => {
  formula.addEventListener("click", () => {
    formulaResult.innerText = formulas[formula.id];
    navigator.clipboard.writeText(formulaResult.textContent);
    copyAlert(formula.id);
  });
});
formulasInputs.forEach((input) => {
  input.addEventListener("input", () => {
    console.log("koko wawa");
  });
});
const formulaResult = document.querySelector(".formula-result");
const EXCLUDED_STRINGS = new Set([
  "GAD-7 results",
  "PHQ-9 results",
  "ASCVD",
  "The patient",
]);
function copyAlert(copiedText) {
  copiedText = String(copiedText);
  if (!EXCLUDED_STRINGS.has(copiedText)) {
    copiedText = copiedText.replaceAll("_", " ");

    copiedText = copiedText.replaceAll("-", ", ");
    let lastIndex = copiedText.lastIndexOf(", ");
    console.log(lastIndex);
    copiedText =
      copiedText.substring(0, lastIndex) +
      " and " +
      copiedText.substring(lastIndex + 1);
  }
  const copyAlertMessage = document.createElement("div");
  let singularPlural;
  if (copiedText.includes("and")) {
    singularPlural = "have";
  } else {
    singularPlural = "has";
  }
  copyAlertMessage.innerHTML = `
        <svg style="width: 18px; height: 18px; fill: currentColor;" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        <span>${copiedText} ${singularPlural} been copied to clipboard!</span>
    `;

  copyAlertMessage.classList.add("copy-alert");
  copyAlertMessage.classList.remove("copy-hide");
  copyAlertMessage.classList.add("copy-show");
  document.body.appendChild(copyAlertMessage);
  setTimeout(() => {
    copyAlertMessage.classList.remove("copy-show");
    copyAlertMessage.classList.add("copy-hide");
  }, 2500);
}
//todo=========================================== Formulas Inputs ===========================================
