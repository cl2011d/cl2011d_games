const top_left = document.querySelector(".top_left")

if (top_left) {
    top_left.addEventListener("click", function() {
        window.location.href = "../main_menu/index.html"
    })
}

//Global Functions//

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

