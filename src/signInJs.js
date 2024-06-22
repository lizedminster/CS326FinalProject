const signIn = document.getElementById("signIn");
    if (signIn) {
        const submit = document.getElementById("signInButton");
        const username = document.getElementById("username");
        const password = document.getElementById("password")

        submit.addEventListener('click', function () {
            if (username.value === "liz" && password.value === "123") {
                window.location.href = 'app.html';
                console.log("request went through");
            }else{
                username.style.backgroundColor = "red";
                password.style.backgroundColor = "red";
                username.value = "";
                password.value = "";
            }
        })
    }