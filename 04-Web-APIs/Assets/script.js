var divEl = document.createElement("div");
var questionArea = document.getElementById("questionArea");
var questionAsked = document.getElementById("questionAsked");
var openingPrompt = document.getElementById("openingPrompt");
var heading = document.getElementById("heading");
var divRightOrWrongEl = document.createElement("div");
var timerEl = document.getElementById("timer");
var theCorrectButton = "";
var secondsLeft = 75;
var timerPenalty = 0;
var quizFinished = false;

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        availableAnswers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: 3
    },
    {
        question: "The condition in an if/else statement is enclosed within ____.",
        availableAnswers: ["1. quotes", "2. curly brackets", "3. parantheses", "4. square brackets"],
        correctAnswer: 3
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        availableAnswers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: 4
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        availableAnswers: ["1. commas", "2. curly brackets", "3. quotes", "4. parantheses"],
        correctAnswer: 3
    },
    {
        question: "A very useful tool used during developement and debugging for printing content to the debugger is:",
        availableAnswers: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: 4
    }
];


var startQuizBtn = document.querySelector("#startQuiz");
startQuizBtn.addEventListener("click", startQuestions);


// function showHideStart() {
//     //  document.getElementById("openingPrompt").style.visibility = "hidden";
//     startQuestions();
// }

var questionNumber = 0;
function startQuestions() {
    //    console.log(questions);
    openingPrompt.removeChild(startQuizBtn);
    openingPrompt.removeChild(heading);
    openingPrompt.setAttribute("style", "text-align: left;")
    for (var i = 0; i < 4; i++) {
        var divAnswersEl = document.createElement("div");
        openingPrompt.appendChild(divAnswersEl);
        var buttonEl = document.createElement("button");

        buttonEl.setAttribute("class", "btn btn-primary btn-sm");
        buttonEl.setAttribute("style", "margin: 5px;");
        buttonEl.setAttribute("id", "button" + i)
        //console.log(buttonEl.textContent);
        divAnswersEl.appendChild(buttonEl);
        buttonEl.addEventListener('click', checkAnswer);
    }
    openingPrompt.appendChild(divRightOrWrongEl);
    setTime();
    askQuestion();
}

function askQuestion() {

    questionAsked.textContent = questions[questionNumber].question;
    console.log(questions[questionNumber].question);

    theCorrectButton = "button" + (questions[questionNumber].correctAnswer - 1);
    for (var j = 0; j < questions[questionNumber].availableAnswers.length; j++) {
        var buttonEl = document.getElementById("button" + j);
        buttonEl.textContent = questions[questionNumber].availableAnswers[j];
    }
}

function checkAnswer(buttonid) {
    //    alert("Clicked");
    console.log("Right answer: " + theCorrectButton);
    console.log("Button selection: " + event.target.id);
    if (theCorrectButton === event.target.id) {
        console.log("Correct");
        divRightOrWrongEl.setAttribute("style", "margin: 10px; font-size: 40px; color: green;");
        divRightOrWrongEl.textContent = "Correct";
        divRightOrWrongEl.style.display = "block";
    } else {
        console.log("Wrong");
        divRightOrWrongEl.setAttribute("style", "margin: 10px; font-size: 40px; color: red;");
        divRightOrWrongEl.textContent = "Wrong";
        divRightOrWrongEl.style.display = "block";
        timerPenalty = 10;
    }
    window.setTimeout(() => {
        divRightOrWrongEl.style.display = "none";
    }, 1000)

    questionNumber++;
    if (questionNumber < questions.length) {
        askQuestion();
    } else {
        window.setTimeout(() => {
            checkScores();
        }, 1000)

    }
}

function checkScores() {
    //  alert("The end");
    quizFinished = true;
    openingPrompt.innerHTML = "";
    var showScoreEl = document.createElement("div");
    openingPrompt.appendChild(showScoreEl);

    var h4El = document.createElement("h4");
    h4El.textContent = "All done!"
    showScoreEl.appendChild(h4El);

    var pEl = document.createElement("p");
    pEl.textContent = "Your score is " + secondsLeft;
    showScoreEl.appendChild(pEl);

    var formEl = document.createElement("form");
    formEl.setAttribute("class", "form-inline");
    showScoreEl.appendChild(formEl);

    var divScoreEl = document.createElement("div");
    divScoreEl.setAttribute("class", "form-group mb-2");
    formEl.appendChild(divScoreEl);

    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", "intitialsInput");
    labelEl.setAttribute("class", "col-sm-3 col-form-label");
    labelEl.textContent = "Enter initials: ";
    divScoreEl.appendChild(labelEl);

    var divInputEl = document.createElement("div");
    divInputEl.setAttribute("class", "form-group mx-sm-3 mb-2");
    formEl.appendChild(divInputEl);

    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("class", "form-control");
    inputEl.setAttribute("id", "intitialsInput");
    divInputEl.appendChild(inputEl);

    var buttonSubmitEl = document.createElement("button");
    buttonSubmitEl.setAttribute("type", "button");
    buttonSubmitEl.setAttribute("class", "btn btn-primary mb-2");
    buttonSubmitEl.textContent = "Submit";
    buttonSubmitEl.addEventListener('click', submitHighScore);
    formEl.appendChild(buttonSubmitEl);
}

function submitHighScore() {
    var highScore = localStorage.getItem("highScore");
    console.log("High score: " + highScore);
    console.log("New score: " + secondsLeft);

    if (secondsLeft > highScore) {
        localStorage.setItem("highScore", secondsLeft);
        var initials = document.getElementById("intitialsInput").value;
        console.log(initials);
        localStorage.setItem("initials", initials);
    }
    showHighScores();
}


var showHighestScores = document.querySelector("#highscores");
showHighestScores.addEventListener("click", showHighScores);

function showHighScores() {
    openingPrompt.innerHTML = "";

    var showHighScoreEl = document.createElement("div");
    openingPrompt.appendChild(showHighScoreEl);

    var h2El = document.createElement("h2");
    h2El.textContent = "High scores";
    showHighScoreEl.appendChild(h2El);

    var divScoreEl = document.createElement("div");
    divScoreEl.setAttribute("class", "alert alert-secondary");
    if (localStorage.getItem("highScore") === "" || localStorage.getItem("highScore") === null) {
        divScoreEl.textContent = "No high scores recorded";
    } else {
        divScoreEl.textContent = "1. " + localStorage.getItem("highScore") + " - " + localStorage.getItem("initials");
    }
    
    openingPrompt.appendChild(divScoreEl);

    var showBackAndHighButtons = document.createElement("div");
    openingPrompt.appendChild(showBackAndHighButtons);

    var buttonBackEl = document.createElement("button");
    buttonBackEl.setAttribute("class", "btn btn-primary btn-sm");
    buttonBackEl.setAttribute("style", "margin: 5px;");
    buttonBackEl.textContent = "Go Back"
    buttonBackEl.addEventListener('click', goBack);
    showBackAndHighButtons.appendChild(buttonBackEl);

    var buttonClearEl = document.createElement("button");
    buttonClearEl.setAttribute("class", "btn btn-primary btn-sm");
    buttonClearEl.setAttribute("style", "margin: 5px;");
    buttonClearEl.textContent = "Clear highscores"
    buttonClearEl.addEventListener('click', clearHigh);
    showBackAndHighButtons.appendChild(buttonClearEl);
}

function goBack() {
    window.location.reload(true);
}

function clearHigh() {
    localStorage.setItem("highScore", "");
    localStorage.setItem("initials", "");
    showHighScores();
}

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft = secondsLeft - timerPenalty - 1;
        timerPenalty = 0;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft < 1) {
            clearInterval(timerInterval);
            alert("Time up. Try again");
            window.location.reload(true);
        }
        if (quizFinished === true) {
            clearInterval(timerInterval);
        }

    }, 1000);
}