document.addEventListener('DOMContentLoaded', function () {
    let userCoins = 100;
    if (window.localStorage.getItem('points')) {
        userCoins = window.localStorage.getItem('points');
    }
    document.getElementById('coins').innerText = userCoins;

    const triviaPlay = document.getElementById("trivia");
    const gachaPlay = document.getElementById("gacha");
    const gachaHome = document.getElementById("gachaHome");
    const homeHTML = document.getElementById("homeHTML");

    if (homeHTML) {
        //for right now, this is just for playtesting. These are temporary
        const resetCoins = document.getElementById("resetCoins")
        const resetGacha = document.getElementById("resetGacha")

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
    if (triviaPlay) {
        //Trivia
        console.log("Trivia Page");

        const submit = document.getElementById('submit');
        const answer = document.getElementById('answer');
        const next = document.getElementById('next');


        submit.addEventListener("click", checkInput);
        answer.addEventListener("keyup", validateTextInput);
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


        function checkInput() {
            //This will be where I will draw from the backend for data. For now, it will be static
            const storedQuestion = window.localStorage.getItem('question');
            const rightAnswer = document.getElementById('rightAnswer');
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

                // Update displayed coins
                document.getElementById('coins').innerText = userCoins;
            }
        }

        function nextQuestion() {
            //This will be where I will draw from the backend for data.
            const rightAnswer = document.getElementById('rightAnswer');
            const question = {
                question: "Random number for now",
                correct: Math.floor(Math.random() * 2) + 1,
                points: 10
            }
            console.log(question.correct);
            window.localStorage.setItem('question', JSON.stringify(question));
            answer.style.backgroundColor = "white";
            answer.value = "";
            rightAnswer.value = "";

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

    if (gachaPlay) {
        const drawButton = document.getElementById("draw");
        const gacha = document.getElementById("questionMark");
        let gachaList = [];
        if (window.localStorage.getItem('gacha')) {
            gachaList = JSON.parse(window.localStorage.getItem('gacha'));
        } else {
            window.localStorage.setItem('gacha', JSON.stringify(gachaList));
        }

        drawButton.addEventListener("click", drawGacha);

        function drawGacha() {
            let x = Math.floor(Math.random() * 10);
            //When I add the backend, it will instead add a gacha object to the list instead of a simple number
            gachaList.push(x);
            window.localStorage.setItem('gacha', JSON.stringify(gachaList));
            console.log(gachaList);
            userCoins = parseInt(userCoins)
            userCoins -= 25;
            window.localStorage.setItem('points', userCoins);
            document.getElementById('coins').innerText = userCoins;
        }
    }

    if (gachaHome) {
        let grid = document.getElementById("grid");
        const x = JSON.parse(window.localStorage.getItem('gacha'));
        Object.keys(x).forEach(card => {
            let newCard = document.createElement("div");
            newCard.textContent = x[card];

            grid.appendChild(newCard);
        });
    }
});