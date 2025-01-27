const line = document.querySelector(".line");
const circle = document.querySelector(".circle");

const maleBtn = document.querySelector("button");
maleBtn.addEventListener("click", () => {
  line.classList.toggle("make-male");
  circle.classList.toggle("male-color");
  line.classList.toggle("male-color");
});

const femaleBtn = document.querySelector("button:last-child");
femaleBtn.addEventListener("click", () => {
  line.classList.toggle("make-female");
  circle.classList.toggle("female-color");
  line.classList.toggle("female-color");
});
