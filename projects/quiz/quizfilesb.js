let jsonData;

window.onload = function() {
    document.querySelector("#tabs-container")
            .addEventListener("click", TabChange);
    document.querySelector("#submit-button").addEventListener("click", OnSubmit);
    AJAX("./quizFiles/MathQuiz.json");
}

function OnSubmit() {
    let userAnswers = document.querySelectorAll("input[type='radio']:checked");
    if(userAnswers.length < jsonData.questions.length) {
        RenderBanner(false)
        return;
    }
    RenderTable(userAnswers);
    RenderBanner(true);
}

function AJAX (fileName) {
    let url = fileName;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            jsonData = JSON.parse(xhr.responseText);
            RenderCards();
            TabRender();
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

function RenderBanner(isValid) {
    let ref = document.querySelector("#banner-container");
    if(!isValid){
        ref.innerHTML = "<div> Please complete all of the Quiz questions </div>";
        return;
    }

    let valueArray = document.querySelectorAll("#score-location");
    let counter = 0
    for(let i = 0; i <valueArray.length; i++){
        if(valueArray[i].innerHTML === "1") {
            counter++
        }
    }

    ref.innerHTML = `<div>Your Score: ${counter}/${jsonData.questions.length} </div>`;
}

function RenderTable(answerArray) {
    let ref = document.querySelector("#quiz-container");

    let html = "<table>";
    html += "<tr>"
    html+= "<td>Question # </td>";
    html+= "<td>Question text </td>";
    html+= "<td>Correct Answer </td>";
    html+= "<td>Your Answer </td>";
    html+= "<td>Score </td>";
    html+= "</tr>";

    for(let i = 0; i < jsonData.questions.length; i++) {
        let currentQuestion = jsonData.questions[i];
        let correctIndex = currentQuestion.answer;
        let correctChoice = currentQuestion.choices[correctIndex];
        let correct = correctChoice === answerArray[i].value;
        if(correct) {
            html += "<tr>"
        }
        else {
            html += "<tr class = 'incorrect'>"
        }
        
         html += `<td>Question ${i + 1}</td>`
         html += `<td>${currentQuestion.questionText}</td>`
         html += `<td>${correctChoice}</td>`
         html += `<td>${answerArray[i].value}</td>`
         if(correct) {
            html += `<td id = 'score-location'>1</td>`
         }
         else {
             html += `<td id = 'score-location'>0</td>`
         }
        html += "</tr>"
    }

    html += "</table>";

    ref.innerHTML = html;
}

function TabRender() {
    let ref = document.querySelector("#tabs-container");

    let html = "";
    html = "<div class='tabs'>";
        for (let i = 0; i < jsonData.questions.length; i++) {
            html += `<div class= 'tab'>Question ${i + 1}</div>`;
        }
    html += "</div>";

    ref.innerHTML = html;
}

function TabChange(e) {
    let pickedItem = e.target;
    if(pickedItem.innerHTML.split(" ").length > 2) {
        return;
    }

    let cards = document.querySelectorAll(".card");

    for (let i = 0; i < cards.length; i++) {
        cards [i].classList.add("hidden");
    }
    let itemArray = pickedItem.innerHTML.split(" ");
    let cardIndex = Number(itemArray[1]);
    cards[cardIndex -1].classList.remove("hidden");
}

function RenderCards() {
    let ref = document.querySelector("#cards-container");
    let html = "";

    for (let i = 0; i < jsonData.questions.length; i++) {
        let q = jsonData.questions[i];
        let questionNum = i + 1;

        html += "<div class='card hidden'>";

        html += "<div class='card-title'>Question " + questionNum + "</div>";
        html += "<div class='card-body'>";
        html += "<div class='question'>" + q.questionText + "</div>";

        html += "<div class='radio-container'>";

        for (let j = 0; j < q.choices.length; j++) {
            html += "<div class='answer-container'>";
            html += "<input type='radio' name='" + questionNum + "' id='" + questionNum + j + "' value='" + q.choices[j] + "'>";
            html += "<label for='" + questionNum + j + "'>" + q.choices[j] + "</label>";
            html += "</div>";
        }

        html += "</div>";
        html += "</div>";
        html += "</div>"; 
    }

    ref.innerHTML = html;
}

function AllCardBuilder() {
    let html = "";
    let questionsArray = jsonData.questions;
    for (let i = 0; i < questionsArray.length; i++) {
        let questionNum = i + 1;
        let questionText = questionsArray[i].questionText;
        let answerArray = questionsArray[i].choices;
        html += RenderCards(questionNum, questionText, answerArray);
    }

    return html;
}