$(document).ready(function () {

    // les listeners
    // clic sur le bouton menu : affiche/masque le menu
    $(".menu__btn").on("click", function () {
        toggleMenu();
    })

    // la souris quitte le menu : il disparait
    $(".menu-content").on("mouseout", function () {
        toggleMenu();
    })

    // sur les 3 images : clic = afficher l'image dans le cadre joueur
    $(".scissors, .leaf, .stone").on("click", function() {
        selectChoice(this, ".userSymbol");
        let computer = "." + getComputerChoice();
        let choice = $(computer);
        selectChoice(choice[0], ".computerChoice");
    })
});


// fonction pour afficher/masquer le menu
function toggleMenu() {
    $(".menu-content").toggleClass("show");
}

// fonction pour afficher le symbole choisi dans la case du joueur
function selectChoice(choice, target) {
    let imgSrc = choice.querySelector("img").attributes["src"].value;
    let newImg = ("<img>");
    $(target).append(newImg);
    //$(target + ":img").attr("src", imgSrc);
    $(target + " img").attr("src", imgSrc);
}

// fonction pour déterminer le symbole de l'ordinateur
function getComputerChoice() {
    let choices = ['stone', 'leaf', 'scissors'];
    return choices[Math.floor(Math.random() * Math.floor(3))];
}