const questions = [
  {
    question: "What does the acronym HTML stand for?",
    answers: [
      { text: "High-Level Text Management Language", correct: false },
      { text: "Hyper Transfer Markup Language", correct: false },
      { text: " Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
    ],
  },
  {
    question: "What is the purpose of a pull request in GitHub?",
    answers: [
      { text: " To clone a repository", correct: false },
      { text: "To merge changes from one branch to another", correct: true },
      { text: "To create a new repository", correct: false },
      { text: "To revert commits", correct: false },
    ],
  },
  {
    question: "What does the acronym 'CSS' stand for?",
    answers: [
      { text: " Cascading Style Sheets", correct: true },
      { text: "Central Style Syntax", correct: false },
      { text: "Creative Style System", correct: false },
      { text: "Computer Style Sheets", correct: false },
    ],
  },
  {
    question:
      "What is the purpose of the 'addEventListener' method in JavaScript?",
    answers: [
      { text: "To create a new event", correct: false },
      { text: "To attach an event handler to an element", correct: true },
      { text: " To remove an event listener", correct: false },
      { text: "To modify the DOM structure", correct: false },
    ],
  },
  {
    question: "What is the purpose of the 'forEach' method in JavaScript?",
    answers: [
      { text: "To loop through elements of an array", correct: true },
      { text: "To filter an array", correct: false },
      { text: "To sort an array", correct: false },
      { text: "To create a new array", correct: false },
    ],
  },
  {
    question: "Which keyword is not used to declare a variable in JavaScript?",
    answers: [
      { text: "let", correct: false },
      { text: "variable", correct: true },
      { text: "var", correct: false },
      { text: "const", correct: false },
    ],
  },
  {
    question: "What is the purpose of the 'if' statement in programming?",
    answers: [
      { text: "To declare a variable", correct: false },
      { text: "To loop through an array", correct: false },
      { text: "To conditionally execute code", correct: true },
      { text: "To import external libraries", correct: false },
    ],
  },
  {
    question: "What does the term 'DRY' stand for in programming?",
    answers: [
      { text: "Don't Repeat Yourself", correct: true },
      { text: " Data Representation Yearning", correct: false },
      { text: "Declare Regular Yield", correct: false },
      { text: "Do Really Yearn", correct: false },
    ],
  },
  {
    question: "What command is used to create a new branch in Git?",
    answers: [
      { text: "git new-branch", correct: false },
      { text: "git create-branch", correct: false },
      { text: "git branch", correct: true },
      { text: "git init", correct: false },
    ],
  },
  {
    question:
      "Which CSS property is used to control the order of overlapping elements?",
    answers: [
      { text: "z-index", correct: true },
      { text: "position", correct: false },
      { text: "order", correct: false },
      { text: "layer-index", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
  startQuiz();
  document.querySelector(".container").style.display = "block";
  document.querySelector("#summary").style.display = "none";
});
let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 1200;
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
  startTimer();
}
function startTimer() {
  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    timerElement.textContent = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      showScore();
    } else {
      timeRemaining--;
    }
  }, 1000);
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  document.querySelector("#timer").style.display = "none";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
   
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
