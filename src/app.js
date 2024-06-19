document.addEventListener("DOMContentLoaded", () => {
    function navigate(viewId) {
        // Hide all views
        document.querySelectorAll(".view").forEach((view) => {
            view.style.display = "none";
        });

        // Show the requested view
        document.getElementById(viewId).style.display = "block";
    }

    document
        .getElementById("homepage")
        .addEventListener("click", () => navigate("homepageView"));
    document
        .getElementById("trivia")
        .addEventListener("click", () => navigate("triviaView"));
    document
        .getElementById("gacha")
        .addEventListener("click", () => navigate("gachaView"));
    document
        .getElementById("gachaHomepage")
        .addEventListener("click", () => navigate("gachaHomepageView"));
    document
        .getElementById("gachaPlaypage")
        .addEventListener("click", () => navigate("gachaPlaypageView"));
    document
        .getElementById("triviaHomepage")
        .addEventListener("click", () => navigate("triviaHomepageView"));
    document
        .getElementById("triviaPlaypage")
        .addEventListener("click", () => navigate("triviaPlaypageView"));

    // Initialize with the home view
    navigate("homepageView");
});
