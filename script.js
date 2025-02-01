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
    alert("Form submitted successfully!");
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
