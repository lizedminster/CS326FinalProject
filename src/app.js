let userCoins = 100;
if(window.localStorage.getItem('points')){
    userCoins = window.localStorage.getItem('points');
}
document.getElementById('coins').innerText = userCoins;

//Trivia
{
const answer = document.getElementById('answer');
const submit = document.getElementById('submit');
const next = document.getElementById('next');

answer.addEventListener("keyup", validateTextInput);
submit.addEventListener("click", checkInput);
next.addEventListener("click", nextQuestion);

restoreState();

function validateTextInput() {
    const answerVal = answer.value;
    
    if (!/^[0-9\.]+$/.test(answerVal)) {
        alert('Only Numerical Values, Please!');
    } else {
        // Store valid input in local storage
        window.localStorage.setItem('answer', answerVal);
    }
}

function checkInput(){
    //This will be where I will draw from the backend for data. For now, it will be static
    const storedQuestion = window.localStorage.getItem('question');
    if (storedQuestion) {
        const questionObj = JSON.parse(storedQuestion);

        const correct = questionObj.correct;
        const points = questionObj.points;

        const answerVal = answer.value;

        if (answerVal === correct.toString()) {
            answer.style.backgroundColor = "green";
            window.localStorage.setItem('points', userCoins);
            userCoins += points;
            window.localStorage.setItem('points', userCoins);
        } else {
            answer.style.backgroundColor = "red";
        }

        // Update displayed coins
        document.getElementById('coins').innerText = userCoins;
    }
}

function nextQuestion(){
    //This will be where I will draw from the backend for data.
    const question = {question: "Random number for now",
    correct: Math.floor(Math.random() * 2) + 1,
    points: 10
    }
    console.log(question.correct);
    window.localStorage.setItem('question', JSON.stringify(question)); 
    answer.style.backgroundColor = "white";
    answer.value= "";
    
}

function restoreState() {
    const storedAnswer = window.localStorage.getItem('answer');
    if (storedAnswer) {
        answer.value = storedAnswer;
    }

    const storedQuestion = window.localStorage.getItem('question');
    if (storedQuestion) {
        const questionObj = JSON.parse(storedQuestion);
        const questionBox = document.getElementById('question');
        questionBox.innerText = questionObj.question;
    }

};
}

//Gacha
{
    console.log("hello world")
}