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

function updateGenderSymbol() {
  if (radioMale.checked) {
    gender = 1;
    genderSymbol.classList.add("male-color");
    genderSymbol.classList.remove("female-color");
    gsap.to(genderArrow, {
      y: 0,
      x: 0,
      scaleY: 15,
      rotate: 45,
      duration: 1,
      background: "#AEC6CF",
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
      rotate: -25,
      x: -30,
      y: -50,
    });
    gsap.to(genderImage, {
      background: "#64399b",
      duration: 0.01,
    });
    arrowHead.style.borderBottomColor = "#AEC6CF";
    genderImage.style.visibility = "visible";
    genderImage.src = "Assets/images/magician_hat.svg";
  } else if (radioFemale.checked) {
    gender = 0;
    genderSymbol.classList.add("female-color");
    genderSymbol.classList.remove("male-color");
    gsap.to(genderArrow, {
      y: 113,
      x: -45,
      scaleY: 15,
      rotate: 0,
      duration: 1,
      background: "#ffc5d3",
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
      background: "#ffc5d3",
      ease: "ease",
    });
    genderImage.style.visibility = "visible";
    genderImage.src = "Assets/images/wizard_hat.svg";
    arrowHead.style.borderBottomColor = "transparent";
    gsap.to(genderImage, {
      scale: 0.6,
      rotate: 25,
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
  }
});
// PHQ-9
const rangePHQ1 = document.getElementById("PHQ-1");
const rangePHQ2 = document.getElementById("PHQ-2");
const PHQ = document.querySelector(".PHQ-9");
rangePHQ1.addEventListener("input", () => {
  if (parseInt(rangePHQ1.value) + parseInt(rangePHQ2.value) >= 3) {
    PHQ.classList.add("PHQ-9-positive");
    console.log(rangePHQ1.value + rangePHQ2.value);
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
GADRanges.forEach((range) => {
  range.addEventListener("input", () => {
    PHQRanges.forEach((range) => {
      range.value = 0;
    });
    PHQ.classList.remove("PHQ-9-positive");
    let sum = 0;
    for (let i = 0; i < GADRanges.length; i++) {
      sum += parseInt(GADRanges[i].value);
    }
    if (sum >= 0 && sum <= 4) {
      orbImg.src = "Assets/images/happy_orb.webp";
    } else if (sum >= 5 && sum <= 9) {
      orbImg.src = "Assets/images/GAD_mild.webp";
    } else if (sum >= 10 && sum <= 14) {
      orbImg.src = "Assets/images/GAD_moderate.webp";
    } else {
      orbImg.src = "Assets/images/GAD_severe.webp";
    }
    orbIndicator.style.background =
      "linear-gradient(to right, #b064c3, #660088, #360145)";
    document.querySelector(".orb-indicator-container").style.visibility =
      "visible";
    document.querySelector(".orb-indicator-container").style.opacity = "1";
  });
});
PHQRanges.forEach((range) => {
  range.addEventListener("input", () => {
    GADRanges.forEach((range) => {
      range.value = 0;
    });
    let sum = 0;
    for (let i = 0; i < PHQRanges.length; i++) {
      sum += parseInt(PHQRanges[i].value);
    }
    if (sum >= 0 && sum <= 4) {
      orbImg.src = "Assets/images/happy_orb.webp";
    } else if (sum >= 5 && sum <= 9) {
      orbImg.src = "Assets/images/PHQ_mild.webp";
    } else if (sum >= 10 && sum <= 14) {
      orbImg.src = "Assets/images/PHQ_moderate.webp";
    } else {
      orbImg.src = "Assets/images/PHQ_severe.webp";
    }
    orbIndicator.classList.add("orb-indicator-alt");
    document.querySelector(".orb-indicator-container").style.visibility =
      "visible";
    document.querySelector(".orb-indicator-container").style.opacity = "1";
    console.log("orb color changed");
    orbIndicator.style.background =
      "linear-gradient(to right, #6a7fdf, #2e27a1, #060069)";
  });
});
