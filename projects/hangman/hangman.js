let jsonData;
/*no this is going to be a counter for remaining guesses, why would we do that*/
let hangmanRemainingGuesses = 6;
let SecretWord = "";
let guessedword= "";

//split the alphabet so the table is not one long line, fix if you care
const alphabet1 = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
//it got mad at me for trying to use .tolower
const alphabet2 = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

window.onload = function() {
    document.querySelector("#NewGame-button").addEventListener("click", ViewGame);
    AJAX("./vocabularies.json");
}

function AJAX(FileName){
    let url = FileName
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
        jsonData = JSON.parse(xhr.responseText);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

function ViewGame() {
    GetSecretWord();

    if(SecretWord === ""){
        return;
    }

    GameController.newGame(SecretWord);
    hangmanRemainingGuesses = 6;

    guessedword = "";
    for(let i = 0; i < SecretWord.length; i++){
        guessedword += "*";
    }

    document.querySelector("#result").innerText = "";

    buildLetterTable();
    SendThemToTheGallows();
    ShowGuessedWord();
    ShowGuessesRemaining();
}

function ViewResult() {
    document.querySelector("#Category-Selector").classList.remove("hidden");
    document.querySelector("#Select-Screen").classList.add("hidden");
    document.querySelector("#Game-Screen").classList.add("hidden");

}
//makes the secert word based on the catagory selected, unless its not selected
function GetSecretWord(){
    let word = "";
    let selectedCatagory = document.querySelector('#Category'); 
    let value = selectedCatagory.value; //finds the catagry chosen to make the word with
    if(value === "0"){
        return;
    }
    else if(value === "1" ){
        let randomIndex = Math.floor(Math.random() * jsonData.vocabularies[0].words.length);
        word = jsonData.vocabularies[0].words[randomIndex];
        console.log(word);
        document.querySelector("#NewGame-button").disabled = true;
    }
    else if(value === "2" ){
        let randomIndex = Math.floor(Math.random() * jsonData.vocabularies[1].words.length);
        word = jsonData.vocabularies[1].words[randomIndex];
        console.log(word);
        document.querySelector("#NewGame-button").disabled = true;
    }
    else if(value === "3" ){
        let randomIndex = Math.floor(Math.random() * jsonData.vocabularies[2].words.length);
        word = jsonData.vocabularies[2].words[randomIndex];
        console.log(word);
        document.querySelector("#NewGame-button").disabled = true;
    }
    else if(value ==="4"){
        let randomIndex = Math.floor(Math.random() * jsonData.vocabularies[3].words.length);
        word = jsonData.vocabularies[3].words[randomIndex];
        console.log(word);
        document.querySelector("#NewGame-button").disabled = true;
    }
    SecretWord = word; //sets the word to use 
    console.log(SecretWord);
}
//makes a table of all the letters to guess
function buildLetterTable(){
    let html = "";
  
    for(let i = 0; i < alphabet1.length; i++){
        html += '<button class="letter">'+alphabet1[i]+"</button>";
    }

    let ref = document.querySelector("#letters");
    ref.innerHTML = html;
    LetterBtn();
}

function LetterBtn(){
    let letter = document.querySelectorAll(".letter");
    for(let i = 0; i < letter.length; i++) {
        letter[i].addEventListener("click", guessLetter)
    }
}

//checks the selected letter and sends it to update the guessed letter, if it fails it updates the gallows image and lowers the guess count
function Check(l){
    let changes = 0;
    let letter = l.toLowerCase();
    let hiddenword = SecretWord.split("");
    let tempguess = guessedword.split("");
    let newguessedword = "";
    for(let i=0 ; i < hiddenword.length; i++){
        if(letter === hiddenword[i]){
            newguessedword += hiddenword[i];
            changes ++;
        }
        else
            if(hiddenword[i] === tempguess[i]){
                newguessedword += tempguess[i];
            }
            else{
            newguessedword += "*";
            }    
        }
    guessedword = newguessedword;
    console.log(newguessedword);
    console.log(guessedword);
    if(changes === 0){
        return false;
    }else{
        return true;
    }
    }
// takes in guess letter to see if it had a correct letter
 function guessLetter(e){
    let letter = e.target.innerHTML;
    console.log(letter);
    if(hangmanRemainingGuesses > 0){
       let goodGuess = Check(letter);

       e.target.disabled = true;

       if(goodGuess === false){
           e.target.classList.add("incorrect");
           hangmanRemainingGuesses--;
           SendThemToTheGallows();
       }
       else{
            e.target.classList.add("correct");

            if(guessedword === SecretWord){
                gameEnd("win");
            }
        }

         ShowGuessedWord();
        ShowGuessesRemaining();
    }
 }
//manages the image of the gallows
function SendThemToTheGallows(){
    let pngstate = "";

    switch(hangmanRemainingGuesses){
    case 5:
        pngstate = "gallows1.png";
    break;
    case 4:
        pngstate =  "gallows2.png";
    break;
    case 3:
        pngstate = "gallows3.png";
    break;
    case 2:
        pngstate = "gallows4.png";
    break;
    case 1:
        pngstate = "gallows5.png";
    break;
    case 0:
        pngstate = "gallows6.png";
        gameEnd("lose");
    break;
    default:
        pngstate = "gallows0.png";
    break;
    }
    console.log(pngstate);
    let ref = document.querySelector("#Images");
    ref.innerHTML = `<img src="`+ pngstate +`">`;
    
}

function ShowGuessedWord(){
    let display = "";

    for(let i = 0; i < guessedword.length; i++){
        display += guessedword[i] + " ";
    }

    document.querySelector("#word-display").innerText = display;
}

function ShowGuessesRemaining(){
    document.querySelector("#guesses").innerText =
        "Guesses Remaining: " + hangmanRemainingGuesses;
}

function gameEnd(End){
    let ending = "";

    if (End === "win"){
        ending = `You Win, Word was ${SecretWord}`;
    }
    if (End === "lose"){
        ending = `You Lose, Word Was ${SecretWord}`;
    }

    document.querySelector("#result").innerText = ending;
    document.querySelector("#NewGame-button").disabled = false;

    let buttons = document.querySelectorAll("#letters button");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].disabled = true;
    }
}