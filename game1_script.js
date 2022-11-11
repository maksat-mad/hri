const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const score = document.getElementById('score')

let shuffledQuestions

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    score.classList.remove('hide');
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions.sort((a, b) => b.prior - a.prior)[0])
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showQuestion(question) {
    askQuestion(question.question);
    score.innerText = shuffledQuestions.filter(x => x.prior === 0).length + ' / ' + shuffledQuestions.length
    score.style.fontSize = "3rem";
    score.style.textAlign = "center";
    questionElement.innerText = question.question
    questionElement.style.fontSize = "3rem";
    questionElement.style.textAlign = "center";

    let index1 = 0, index2 = 0;
    while (0 === index1) {
        index1 = Math.floor(Math.random() * shuffledQuestions.length);
    }
    while (index2 === 0 || index1 === index2) {
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
    let obj = shuffledQuestions.filter(obj => e.target.src.includes(obj.src))[0];
    if (correct) {
        rightAnswer();
        obj.prior--;
    } else {
        wrongAnswer();
        obj.prior += 1;
        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct) {
                let obj = shuffledQuestions.filter(obj => button.src.includes(obj.src))[0];
                obj.prior += 2;
            }
        })
    }
    console.log(shuffledQuestions.sort((a, b) => b.prior - a.prior).map(question => {
        return question.question.substring(9, question.question.length - 1) + ' = ' + question.prior;
    }));

    if (shuffledQuestions.filter(x => x.prior !== 0).length > 0) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart Priority Game'
        startButton.classList.remove('hide')
        questions.forEach(x => {
            x.prior = 2;
        });
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
        src: '/images/apple.jpg',
        prior: 2
    },
    {
        question: 'Where is avocado?',
        src: '/images/avocado.jpg',
        prior: 2
    },
    {
        question: 'Where is banana?',
        src: '/images/banana.jpg',
        prior: 2
    },
    {
        question: 'Where is grapes?',
        src: '/images/grapes.jpg',
        prior: 2
    },
    {
        question: 'Where is kiwi?',
        src: '/images/kiwi.jpg',
        prior: 2
    },
    {
        question: 'Where is lemon?',
        src: '/images/lemon.jpg',
        prior: 2
    },
    {
        question: 'Where is orange?',
        src: '/images/orange.jpg',
        prior: 2
    },
    {
        question: 'Where is pear?',
        src: '/images/pear.jpg',
        prior: 2
    },
    {
        question: 'Where is pineapple?',
        src: '/images/pineapple.jpg',
        prior: 2
    },
    {
        question: 'Where is watermelon?',
        src: '/images/watermelon.jfif',
        prior: 2
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