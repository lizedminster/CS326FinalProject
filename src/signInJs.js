const signIn = document.getElementById("signIn");
    if (signIn) {
        const submit = document.getElementById("signInButton");
        const username = document.getElementById("username");
        const password = document.getElementById("password")

        let users = [];
        async function loadUsers() {
            const response = await fetch('signIn.json');
            users = await response.json();
        }
        loadUsers();
        

        submit.addEventListener('click', function () {
            if (username.value === "x" && password.value === "x") {
                window.location.href = 'client/DevPage.html';
                console.log("request went through");
            }else{
                const user = users.find(user => user.username === username.value);
                if(user && user.password === password.value){
                    window.location.href = 'app.html';
                    console.log("request went through");
                    window.localStorage.setItem("user", username.value)
                }else{
                    username.style.backgroundColor = "red";
                    password.style.backgroundColor = "red";
                    username.value = "";
                    password.value = "";
                }
            }
        })
    }