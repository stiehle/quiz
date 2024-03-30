const statisticEL = document.querySelector(".statistic");

LOCAL_STORAGE_KEY = "quiz-game-status";

const gameStatus = loadGameStatusFromLocalStorage();

if (gameStatus !== undefined) {
  showStatistics();
} else {
  newGame();
}

function newGame() {
  window.open("index.html", "_self");
}

function showStatistics() {
  let answers = gameStatus.questionsTotal - gameStatus.missingAnswers - gameStatus.countWrong;

  let percent = ((answers * 100) / gameStatus.questionsTotal).toFixed(2);

  statisticEL.innerHTML =
    "<h2>Your Statistic !</h2>" +
    "<div class='center'>" +
    "<p>" +
    `<span>Questions: </span><span>${gameStatus.questionsTotal}</span>` +
    "</p>" +
    "<p>" +
    `<span>Right Answers: </span><span>${answers}</span>` +
    "</p>" +
    "<p>" +
    `<span>Wrong Answers: </span><span>${gameStatus.countWrong}</span>` +
    "</p>" +
    "<p>" +
    `<span>Missing Answers: </span><span>${gameStatus.missingAnswers}</span>` +
    "</p>" +
    "</div>" +
    `<h2>RESULT: ${answers} Right</h2>` +
    `<h2>[ ${percent}% ]</h2>`;

  statisticEL.innerHTML += "<div class='center'>" + "<div class='chart'></div>" + "</div>";
  const chartWidthEL = document.querySelector(".chart");
  chartWidthEL.style["width"] = `${percent}%`;
}

function loadGameStatusFromLocalStorage() {
  const gameStatus = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (gameStatus !== null) {
    return gameStatus;
  }
}
