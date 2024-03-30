const questionEL = document.getElementById("game-question");
const gameCounter = document.querySelector(".game-counter");

LOCAL_STORAGE_KEY = "quiz-game-status";

let gameStop = false;
let correctAnswerNumber = 0;
let answerNumber = null;

const gameStatus = {
  countWrong: 0,
  questionsTotal: 10,
  numberFromQuestions: 0,
  missingAnswers: 0,
};

showStatus();
createGameField();

function getRandomQuestion() {
  let number = 0;

  const numberOfQuestions = newQuestions.results.length;

  for (let i = 0; i < 5; i++) {
    const questionRandomNumber = getRandomNumber(numberOfQuestions);
    number = questionRandomNumber;

    if (!newQuestions.results[questionRandomNumber].selected) {
      break;
    }
  }

  newQuestions.results[number].selected = true;
  return newQuestions.results[number];
}

function createGameField() {
  const randomQuestion = getRandomQuestion();

  questionEL.innerHTML = randomQuestion.question;

  correctAnswerNumber = getRandomNumber(4);

  getAnswerButtonEL(correctAnswerNumber).innerHTML = randomQuestion.correct_answer;

  const incorrectAnswers = randomQuestion.incorrect_answers;

  for (let i = 0; i < 4; i++) {
    if (i !== correctAnswerNumber) {
      const incorrectAnswerEL = document.querySelector(`[data-answer="${i}"]`);
      const incorrectRandomNumber = getRandomNumber(incorrectAnswers.length);
      incorrectAnswerEL.innerHTML = randomQuestion.incorrect_answers[incorrectRandomNumber];
      incorrectAnswers.splice(incorrectRandomNumber, 1);
    }
  }

  changeDifficultyColor(randomQuestion.difficulty);
  gameStatus.numberFromQuestions += 1;
  showStatus();
}

function showStatus() {
  gameCounter.innerHTML = `${gameStatus.numberFromQuestions} / ${gameStatus.questionsTotal}`;
  saveGameStatusToLocalSorage();
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function showSolution(number) {
  if (number === undefined) {
    gameStatus.missingAnswers += 1;
    number = correctAnswerNumber;
  }

  if (!gameStop) {
    answerNumber = number;

    getAnswerButtonEL(correctAnswerNumber).classList.add("solution-right");

    if (number !== correctAnswerNumber) {
      getAnswerButtonEL(answerNumber).classList.add("solution-wrong");
      gameStatus.countWrong += 1;
    }
  }
  gameStop = true;
}

function getNextQuestion() {
  if (answerNumber !== null) {
    getAnswerButtonEL(correctAnswerNumber).classList.remove("solution-right");
    getAnswerButtonEL(answerNumber).classList.remove("solution-wrong");
    answerNumber = null;
  } else {
    gameStatus.missingAnswers += 1;
  }

  if (gameStatus.numberFromQuestions === gameStatus.questionsTotal) {
    finishGame();
  } else {
    createGameField();
    gameStop = false;
  }
}

function getAnswerButtonEL(number) {
  const button = document.querySelector(`[data-answer="${number}"]`);
  return button;
}

function changeDifficultyColor(difficulty) {
  root = document.querySelector(":root");

  if (difficulty === "easy") {
    root.style.setProperty("--game-field-difficulty-color", "#adff2f");
  } else if (difficulty === "medium") {
    root.style.setProperty("--game-field-difficulty-color", "coral");
  } else {
    root.style.setProperty("--game-field-difficulty-color", "red");
  }
}

function finishGame() {
  saveGameStatusToLocalSorage();
  window.open("finish.html", "_self");
}

function saveGameStatusToLocalSorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameStatus));
}
