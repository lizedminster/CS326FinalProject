//once the document has loaded...
import { trivia } from "./trivia.js";
document.addEventListener('DOMContentLoaded', function () {
    const URL = "http://localhost:3260";

    //set up coins (sometimes refered to as points)
    let userCoins = 100;
    if (window.localStorage.getItem('points')) {
        userCoins = window.localStorage.getItem('points');
    }
    document.getElementById('coins').innerText = userCoins;
    //give names to the 4 js required pages (sign in has it's own and trivia home has no js)
    const triviaPlay = document.getElementById("trivia");
    const gachaPlay = document.getElementById("gacha");
    const gachaHome = document.getElementById("gachaHome");
    const homeHTML = document.getElementById("homeHTML");

    //in the home page
    if (homeHTML) {
        //for right now, this is just for playtesting. These are temporary
        const resetCoins = document.getElementById("resetCoins")
        const resetGacha = document.getElementById("resetGacha")
        const user = document.getElementById("userNames");
        user.innerText = "Hello, " + window.localStorage.getItem("user") + "!";

        resetCoins.addEventListener("click", function () {
            userCoins = 100;
            window.localStorage.setItem('points', userCoins);
            document.getElementById('coins').innerText = userCoins;
        });
        resetGacha.addEventListener("click", function () {
            let gachaList = [];
            window.localStorage.setItem('gacha', JSON.stringify(gachaList));
        });
    }

    //in the trivia play page
    if (triviaPlay) {
        //Trivia
        console.log("Trivia Page");

        const submit = document.getElementById('submit');
        const answer = document.getElementById('answer');
        const next = document.getElementById('next');


        submit.addEventListener("click", checkInput);
        answer.addEventListener("keyup", validateTextInput);
        next.addEventListener("click", nextQuestion);
        let questions = trivia;
        const questionBox = document.getElementById('question');
        if(questionBox.innerText === "QUESTION"){
            nextQuestion();
        }
        //add persistency 
        restoreState();

        //this function checks if the text input is a number. If it is, it saves it to the local Storage. If not, it throws an alert)
        function validateTextInput() {
            const answerVal = answer.value;

            if (!/^[0-9\.]+$/.test(answerVal)) {
                alert('Only Numerical Values, Please!');
            } else {
                // Store valid input in local storage
                window.localStorage.setItem('answer', answerVal);
            }
        }

        //This function checks if the user's input matches the desired input.
        //If it is correct, it makes the box green, generates a new question, and adds points (coins)
        //Else, it makes the box red. 
        function checkInput() {
            //This will be where I will draw from the backend for data. For now, it will be static
            const storedQuestion = window.localStorage.getItem('question');
            const rightAnswer = document.getElementById('rightAnswer');
            const coinsAdded = document.getElementById('coinsAdded');
            if (storedQuestion) {
                const questionObj = JSON.parse(storedQuestion);

                const correct = questionObj.correct;
                const points = questionObj.points;

                const answerVal = answer.value;

                if (answerVal === correct.toString()) {
                    answer.style.backgroundColor = "green";
                    window.localStorage.setItem('points', userCoins);
                    userCoins = parseInt(userCoins);
                    userCoins += parseInt(points);
                    window.localStorage.setItem('points', userCoins);
                } else {
                    answer.style.backgroundColor = "red";
                }
                rightAnswer.value = correct;

                coinsAdded.innerText = points;

                // Update displayed coins
                document.getElementById('coins').innerText = userCoins;
            }
        }

        //After the user is done reviewing the correct answer (or if they just want to skip a question) they can click the next button to generate a new question
        //It then resets the text boxes so that new answers can be submitted
        function nextQuestion() {
            //This will be where I will draw from the backend for data.
            const rightAnswer = document.getElementById('rightAnswer');
            const questionIndex = Math.floor(Math.random() * questions.length);
            const question = questions[questionIndex];

            window.localStorage.setItem('question', JSON.stringify(question));
            document.getElementById('question').innerText = question.question;
            
            console.log(question.correct);
            window.localStorage.setItem('question', JSON.stringify(question));
            answer.style.backgroundColor = "white";
            answer.value = "";
            rightAnswer.value = "";

        }

        //this function just takes the text from local storage that the user was inputting & the question itself to maintain persistency 
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
        }
    }

    //in the gacha playpage
    if (gachaPlay) {
        const drawButton = document.getElementById("draw");
        const gacha = document.getElementById("questionMark");

        //The gacha list is the list of all gacha that the user has collected
        let gachaList = [];
        if (window.localStorage.getItem('gacha')) {
            gachaList = JSON.parse(window.localStorage.getItem('gacha'));
        } else {
            window.localStorage.setItem('gacha', JSON.stringify(gachaList));
        }

        drawButton.addEventListener("click", drawGacha);

        //When the user chooses to draw for a gacha, they recieve a random gacha from all available gacha
        //25 coins are taken away from their coin total. 
        async function drawGacha() {
            if (parseInt(userCoins) < 25) {
                console.log("Not enough coins.");
                gacha.src = "https://static.vecteezy.com/system/resources/previews/021/248/602/original/distressed-woman-with-empty-wallet-png.png";
                return;
            }
        
            try {
                const response = await fetch(`${URL}/random`);
                //draw a random gacha
                const randomGacha = await response.json();
                console.log("gacha list:" + gachaList);
                //if the gacha is not in gacha list...
                if (!gachaList.find(g => g._id === randomGacha._id)) {
                    //add it to gacha list
                    gachaList.push(randomGacha);
                    userCoins = parseInt(userCoins) - 25;
                    //update coins
                    window.localStorage.setItem('points', userCoins);
                    //add the gacha to the list of owned gachas
                    window.localStorage.setItem('gacha', JSON.stringify(gachaList));
                    document.getElementById('coins').innerText = userCoins;
                    gacha.src = randomGacha.img;
                    console.log("gacha list:" + gachaList[0].img);
                } else {
                    console.log("Duplicate gacha.");
                    userCoins = parseInt(userCoins) - 10; // Adjust coins deduction for duplicates
                    document.getElementById('coins').innerText = userCoins;
                    window.localStorage.setItem('points', userCoins);
                    gacha.src = "https://cdn11.bigcommerce.com/s-p79ialmurd/images/stencil/500x659/products/1647/5734/DUP_CARDS__18956.1581623417.png?c=2";
                }
            } catch (error) {
                console.error("Failed to draw gacha:", error);
                gacha.src = "https://static.vecteezy.com/system/resources/previews/021/248/602/original/distressed-woman-with-empty-wallet-png.png";
            }
        }
    }

    //in the gacha homepage
    if (gachaHome) {

        //grid is the parent element
        let grid = document.getElementById("grid");
        const x = JSON.parse(window.localStorage.getItem('gacha'));

        //this takes all of the available gacha and puts them into a display grid 
        Object.keys(gachaList).forEach(card => {
            let newCard = document.createElement("div");
            console.log(card.name);
            let img = document.createElement("img");
            img.src = gachaList[card].img; 
            img.alt = gachaList[card].name;
    
            newCard.appendChild(img);
            grid.appendChild(newCard);
        });
    }
});