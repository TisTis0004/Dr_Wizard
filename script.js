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
});
