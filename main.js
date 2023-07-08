let words = [  
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];

// Levels
let lvls = { 
    "Easy": 6,
    "Normal": 5,
    "Hard": 3,
};
// default Level
let defultLevelName = "Normal";
let defultLevelSecond = lvls[defultLevelName];

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let againButton = document.querySelector(".again");
let levels = document.querySelectorAll("option")
let selectLevels = document.querySelector("#levels");
let scoreData = document.querySelector(".data-score")

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defultLevelName;
secondsSpan.innerHTML = defultLevelSecond;
timeLeftSpan.innerHTML = defultLevelSecond;
scoreTotal.innerHTML = words.length;

// Start Game
startButton.addEventListener("click", () => {
    // Remove Button
    startButton.remove()
    // Remove input 
    input.value = ""
    // Disable Paste Event
    input.addEventListener("paste", (e) => {
        e.preventDefault()
    })
    // Remove select levels 
    selectLevels.style.display = "none"
    // Remove Score Data 
    scoreData.style.display = "none"
    // Focus input
    input.focus()
    // Generate Word Function
    generateWord()
})

function generateWord() {
    // random Word From Array 
    let randomWord = words[Math.floor(Math.random() * words.length)]
    // Show The Random Word
    theWord.innerHTML = randomWord
    // Get Index And Remove word From Array
    let wordIndex = words.indexOf(randomWord)
    words.splice(wordIndex, 1)
    // Empty upcomingWords
    upcomingWords.innerHTML = ""
    // Generate upcomingWords 
    for (let i = 0; i < words.length; i++) {
        // Create Div Element
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    // Start Time 
    startTime()
}

// Time Function
function startTime() {
    timeLeftSpan.textContent = defultLevelSecond;
    // Add 3 Second To Frist Word
    // if (words.length == 29) {
    //     timeLeftSpan.innerHTML = defultLevelSecond + 3;
    // }
    let start = setInterval(() => {
        timeLeftSpan.textContent--
        if (timeLeftSpan.textContent == 0) {
            // Stop Time
            clearInterval(start)
            // Comapare Word
            if (input.value.toLowerCase() === theWord.innerHTML.toLowerCase()) {
                // Empty Input
                input.value = ""
                // Increase Score
                scoreGot.innerHTML++
                // Repeat Generate Word Function
                if (words.length > 0) {
                    generateWord()
                } else {
                    let span = document.createElement("span");
                    span.className = 'good';
                    let spanText = document.createTextNode("Congratz");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                }
            } else {
                let span = document.createElement("span");
                span.className = 'bad';
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
                // Show Again Button
                againButton.style.display = "block"
                // Save score to LocalStorage
                saveScore(scoreGot.innerHTML)
                // Show Select Levels 
                selectLevels.style.display = "block"
                // Show Score Data Again 
                scoreData.style.display = "grid"
                // Declear LastScore 
                lastScore()
                // Declear BestScore
                bestScore()
            }
        }
    }, 1000)
}

// Again Game When Game over
againButton.addEventListener("click", () => {
    words = [  
        "Hello",
        "Programming",
        "Code",
        "Javascript",
        "Town",
        "Country",
        "Testing",
        "Youtube",
        "Linkedin",
        "Twitter",
        "Github",
        "Leetcode",
        "Internet",
        "Python",
        "Scala",
        "Destructuring",
        "Paradigm",
        "Styling",
        "Cascade",
        "Documentation",
        "Coding",
        "Funny",
        "Working",
        "Dependencies",
        "Task",
        "Runner",
        "Roles",
        "Test",
        "Rust",
        "Playing"
    ];
    startButton.click()
    againButton.style.display = "none";
    finishMessage.innerHTML = "";
    scoreGot.textContent = 0;
})

// Save Score To LocalStorage With Date
let scoreArray = [];
let data = window.localStorage.getItem("score");
if (data) {
    scoreArray = JSON.parse(data)
}
function saveScore(score) {
        let storageScore = {
            score:  score,
            date: new Date().toUTCString()
        };
        scoreArray.unshift(storageScore)
        window.localStorage.setItem("score", JSON.stringify(scoreArray))
    };

// Change Level
selectLevels.addEventListener("click", (e) => {
    if (e.currentTarget.value == "easy") {
        defultLevelName = "Easy";
        defultLevelSecond = lvls[defultLevelName];
    } else if (e.currentTarget.value == "normal") {
        defultLevelName = "Normal";
        defultLevelSecond = lvls[defultLevelName];
    } else if (e.currentTarget.value == "hard") {
        defultLevelName = "Hard";
        defultLevelSecond = lvls[defultLevelName];
    }
    lvlNameSpan.innerHTML = defultLevelName;
    secondsSpan.innerHTML = defultLevelSecond;
    timeLeftSpan.innerHTML = defultLevelSecond;
});

// Show Last Score To Inner HTML
function lastScore() {
    if (scoreArray.length !== 0) {
        let lastscore = scoreArray[0].score;
        let lastDate = scoreArray[0].date;
        document.querySelector(".last-score").innerHTML = lastscore;
        document.querySelector(".last-date").innerHTML = lastDate;
    }
}
lastScore()

// Show Best Score To Inner HTML
function bestScore() {
    if (scoreArray.length !== 0) {
        let maxScore = Math.max(...scoreArray.map(obj => { return obj.score; }));
        let maxObj = scoreArray.find(obj => { return obj.score == maxScore; });
        document.querySelector(".best-score").innerHTML = maxScore;
        document.querySelector(".best-date").innerHTML = maxObj.date;
        
    }
}
bestScore()