const genderSymbol = document.querySelector(".gender-symbol");
const genderArrow = document.querySelector(".gender-arrow");
const arrowHead = document.querySelector(".arrow-head");
const cross = document.querySelector(".female-cross");
const radioMale = document.getElementById("male");
const radioFemale = document.getElementById("female");

function updateGenderSymbol() {
  if (radioMale.checked) {
    genderSymbol.classList.add("male-color");
    genderSymbol.classList.remove("female-color");
    gsap.to(genderArrow, {
      y: 0,
      x: 0,
      scaleY: 15,
      rotate: 45,
      duration: 1,
      background: "#006aff",
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
    arrowHead.style.borderBottomColor = "#006aff";
  } else if (radioFemale.checked) {
    genderSymbol.classList.add("female-color");
    genderSymbol.classList.remove("male-color");
    gsap.to(genderArrow, {
      y: 113,
      x: -45,
      scaleY: 15,
      rotate: 0,
      duration: 1,
      background: "#d400ff",
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
      background: "#d400ff",
      ease: "ease",
    });
    arrowHead.style.borderBottomColor = "transparent";
  }
}
radioMale.addEventListener("change", updateGenderSymbol);
radioFemale.addEventListener("change", updateGenderSymbol);
