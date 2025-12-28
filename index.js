let strBtn = document.getElementById("startBtn");
let timerEl = document.getElementById("timer");
let quoteEl = document.getElementById("quoteDisplay");
let resEl = document.getElementById("result");
let inpEl = document.getElementById("quoteInput");
let subBtn = document.getElementById("submitBtn");
let resBtn = document.getElementById("resetBtn");
let spinEl = document.getElementById("spinner");
let wpmEl = document.getElementById("wpm");
let errEl = document.getElementById("err");
let spacesCount = 1; // no of words
let time = 1;
let inctimer = null; //for setInterval function

function strTimer() {
    time = 1;
    inctimer = setInterval(function() {
        timerEl.textContent = time;
        let spanEl = document.createElement("span");
        spanEl.textContent = " seconds";
        spanEl.classList.add("span");
        timerEl.appendChild(spanEl);
        time += 1;
    }, 1000);
}

function getContent() {
    quoteEl.classList.add("d-none");
    spinEl.classList.remove("d-none");
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET"
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            spinEl.classList.add("d-none");
            quoteEl.classList.remove("d-none");
            quoteEl.textContent = data.content;
        });
}

function calWpm(inptext) {
    spacesCount = 1;
    for (let i of inptext) {
        if (i === " ") {
            spacesCount += 1;
        }
    }
}

strBtn.addEventListener("click", function() {
    strBtn.classList.add("d-none");
    let card = document.getElementById("card");
    card.classList.remove("d-none");
    subBtn.classList.remove("d-none");
    resBtn.classList.remove("d-none");
    strTimer();
    getContent();
});


resBtn.addEventListener("click", function() {
    inpEl.value = "";
    resEl.textContent = "";
    errEl.textContent = "";
    wpmEl.textContent = "";
    clearInterval(inctimer); // to end the previous timer
    strTimer(); // to start a new timer after tapping reset
    getContent();
    time = 0;
    timerEl.textContent = time;
    let spanEl = document.createElement("span");
    spanEl.textContent = " seconds";
    spanEl.classList.add("span");
    timerEl.appendChild(spanEl);
});

subBtn.addEventListener("click", function() {
    let inptext = inpEl.value;
    let quote = quoteEl.textContent;
    if (quote === inptext) {
        errEl.textContent = "";
        clearInterval(inctimer);
        calWpm(inptext);
        let wpm = Math.ceil(spacesCount * 60 / (time - 1));
        resEl.textContent = "You typed in " + timerEl.textContent;
        resEl.style.color = "green";
        wpmEl.textContent = "WPM: " + wpm + " (words per minute)";
    } else {
        resEl.textContent = "You typed incorrect sentence";
        resEl.style.color = "red";
        wpmEl.textContent = "";
        errEl.textContent = "Errors(_):  ";

        for (let i = 0; i < quote.length; i++) {
            if (inptext[i] === quote[i]) {
                let redEl = document.createElement("span");
                redEl.textContent = inptext[i];
                errEl.appendChild(redEl);
            } else {
                let redEl = document.createElement("span");
                redEl.textContent = "_ ";
                redEl.classList.add("reds");
                errEl.appendChild(redEl);
            }
        }

    }
});