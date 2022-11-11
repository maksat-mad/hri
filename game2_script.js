const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const score = document.getElementById('score')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  score.classList.remove('hide');
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showQuestion(question) {
  askQuestion(question.question);
  score.innerText = currentQuestionIndex + 1 + ' / ' + questions.length
  score.style.fontSize = "3rem";
  score.style.textAlign = "center";
  questionElement.innerText = question.question
  questionElement.style.fontSize = "3rem";
  questionElement.style.textAlign = "center";

  let index1 = currentQuestionIndex, index2 = currentQuestionIndex;
  while (currentQuestionIndex == index1) {
    index1 = Math.floor(Math.random() * shuffledQuestions.length);
  }
  while (index2 == currentQuestionIndex || index1 == index2) {
    index2 = Math.floor(Math.random() * shuffledQuestions.length);
  }
  answers = [
    {
      src: question.src,
      correct: true
    },
    {
      src: shuffledQuestions[index1].src,
      correct: false
    },
    {
      src: shuffledQuestions[index2].src,
      correct: false
    }
  ];
  shuffleArray(answers);
  answers.forEach(answer => {
    const button = document.createElement('img');
    button.style.height = "14rem";
    button.style.width = "14rem";
    button.src = answer.src;
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  setStatusClass(selectedButton, correct)
  if (correct) {
    rightAnswer();
  } else {
    wrongAnswer();
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart Standard Game'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Where is apple?',
    src: './images/apple.jpg'
  },
  {
    question: 'Where is avocado?',
    src: './images/avocado.jpg'
  },
  {
    question: 'Where is banana?',
    src: './images/banana.jpg'
  },
  {
    question: 'Where is grapes?',
    src: './images/grapes.jpg'
  },
  {
    question: 'Where is kiwi?',
    src: './images/kiwi.jpg'
  },
  {
    question: 'Where is lemon?',
    src: './images/lemon.jpg'
  },
  {
    question: 'Where is orange?',
    src: './images/orange.jpg'
  },
  {
    question: 'Where is pear?',
    src: './images/pear.jpg'
  },
  {
    question: 'Where is pineapple?',
    src: './images/pineapple.jpg'
  },
  {
    question: 'Where is watermelon?',
    src: './images/watermelon.jfif'
  }
]

function rightAnswer() {
  // var url = prompt("Please enter QTrobot rosbridge url:", "ws://192.168.100.2:9091");
  // url = (url == null) ? 'ws://127.0.0.1:9091' : url;
  // var qtrobot = null;
  // document.addEventListener('DOMContentLoaded', function () {
  //     console.log("connecting to QTrobot (please wait...)");
  //     qtrobot = new QTrobot({
  //         url: url,
  //         connection: function () {
  //             console.log("connected to " + url);
  //             qtrobot.talk_text('Hello! my name is QT!', function () {
  //                 qtrobot.show_emotion('QT/happy');
  //             });
  //         },
  //         error: function (error) {
  //             console.log(error);
  //         },
  //         close: function () {
  //             console.log("disconnected.");
  //         }
  //     }); //end of qtrobot

  // }); // end of DOMContentLoaded
}

function wrongAnswer() {
  // var url = prompt("Please enter QTrobot rosbridge url:", "ws://192.168.100.2:9091");
  // url = (url == null) ? 'ws://127.0.0.1:9091' : url;
  // var qtrobot = null;
  // document.addEventListener('DOMContentLoaded', function () {
  //     console.log("connecting to QTrobot (please wait...)");
  //     qtrobot = new QTrobot({
  //         url: url,
  //         connection: function () {
  //             console.log("connected to " + url);
  //             qtrobot.talk_text('Hello! my name is QT!', function () {
  //                 qtrobot.show_emotion('QT/happy');
  //             });
  //         },
  //         error: function (error) {
  //             console.log(error);
  //         },
  //         close: function () {
  //             console.log("disconnected.");
  //         }
  //     }); //end of qtrobot

  // }); // end of DOMContentLoaded
}

function askQuestion(question) {
  // var url = prompt("Please enter QTrobot rosbridge url:", "ws://192.168.100.2:9091");
  // url = (url == null) ? 'ws://127.0.0.1:9091' : url;
  // var qtrobot = null;
  // document.addEventListener('DOMContentLoaded', function () {
  //     console.log("connecting to QTrobot (please wait...)");
  //     qtrobot = new QTrobot({
  //         url: url,
  //         connection: function () {
  //             console.log("connected to " + url);
  //             qtrobot.talk_text('Hello! my name is QT!', function () {
  //                 qtrobot.show_emotion('QT/happy');
  //             });
  //         },
  //         error: function (error) {
  //             console.log(error);
  //         },
  //         close: function () {
  //             console.log("disconnected.");
  //         }
  //     }); //end of qtrobot

  // }); // end of DOMContentLoaded
}