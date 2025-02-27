const title = document.querySelector("title");
const hearts = ["💙", "💚", "🩷", "💛", "💜", "❤️", "💗", "🧡", "🩵", "🤍"];
title.text += hearts[1];
setInterval(() => {
  title.text = "Happy Birthday!";
  let i = Math.floor(Math.random() * hearts.length);
  title.text += hearts[i];
}, 2000);
const overlay = document.getElementById("overlay");

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
const timeSince = document.getElementById("timeSince");
const timeLeft = document.getElementById("timeLeft");

setInterval(() => {
  updateTimeSince();
  updateTimeLeft();
}, 1000);

function checkTime(i) {
  return i < 10 ? "0" + i : i;
}

function getNextBirthday() {
  let now = new Date();
  let year = now.getFullYear();
  let nextBirthday = new Date(`27-Feb-${year}`);

  if (now > nextBirthday) {
    nextBirthday = new Date(`27-Feb-${year + 1}`);
  }

  return nextBirthday.getTime();
}

function updateTimeSince() {
  let now = new Date().getTime();
  let lastBirthday = new Date("27-Feb-2025").getTime();

  if (now < lastBirthday) {
    timeSince.innerText = "Birthday hasn't happened yet!";
    return;
  }

  let distance = now - lastBirthday;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (days > 0) {
    timeSince.innerText = `${days} Days ${checkTime(hours)}:${checkTime(
      minutes
    )}:${checkTime(seconds)}`;
  } else {
    timeSince.innerText = `${checkTime(hours)}:${checkTime(
      minutes
    )}:${checkTime(seconds)}`;
  }
}

function updateTimeLeft() {
  let now = new Date().getTime();
  let nextBirthday = getNextBirthday();
  let distance = nextBirthday - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (days > 0) {
    timeLeft.innerText = `${days} Days ${checkTime(hours)}:${checkTime(
      minutes
    )}:${checkTime(seconds)}`;
  } else {
    timeLeft.innerText = `${checkTime(hours)}:${checkTime(minutes)}:${checkTime(
      seconds
    )}`;
  }
}

updateTimeSince();
updateTimeLeft();

//todo===================================================================================

const generatePunButton = document.getElementById("generate-pun-button");
const generateDadButton = document.getElementById("generate-dad-button");
const revealButton = document.getElementById("reveal-punch-button");
const jokeResult = document.querySelector(".joke-result");

let currentJokeData = null;

generatePunButton.addEventListener("click", () => {
  generatePun();
});

generateDadButton.addEventListener("click", () => {
  generateDadJoke();
});

revealButton.addEventListener("click", () => {
  revealPunchline();
});

function generatePun() {
  const punUrl =
    "https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,explicit";
  fetch(punUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      currentJokeData = data;
      if (data.type === "single") {
        revealButton.classList.add("hide-reveal");
        revealButton.classList.remove("show-reveal");
        jokeResult.innerText = `${data.joke}`;
      } else if (data.type === "twopart") {
        revealButton.classList.add("show-reveal");
        revealButton.classList.remove("hide-reveal");
        jokeResult.innerText = `Setup: ${data.setup}`;
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function generateDadJoke() {
  const dadJokeUrl =
    "https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Spooky,Christmas?blacklistFlags=nsfw,religious,explicit";
  fetch(dadJokeUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      currentJokeData = data;
      if (data.type === "single") {
        revealButton.classList.add("hide-reveal");
        revealButton.classList.remove("show-reveal");
        jokeResult.innerText = `${data.joke}`;
      } else if (data.type === "twopart") {
        revealButton.classList.add("show-reveal");
        revealButton.classList.remove("hide-reveal");
        jokeResult.innerText = `Setup: ${data.setup}`;
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function revealPunchline() {
  if (currentJokeData && currentJokeData.type === "twopart") {
    jokeResult.innerText = `Setup: ${currentJokeData.setup}\nDelivery: ${currentJokeData.delivery}`;
  }
}
document.querySelector(".modal-body").addEventListener("click", () => {
  document.getElementById("marquee").setAttribute("scrollamount", 1.5);
});
