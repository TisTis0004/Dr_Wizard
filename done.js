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
    window.open("SUR.html");
  } else {
    window.open("SUR.html");
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
