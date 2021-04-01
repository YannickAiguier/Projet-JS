let userScore = 0;
let computerScore = 0;
let userScoreP = $(".userScore p");
let computerScoreP = $(".computerScore p");

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

    // clic sur les photos pour choix du jeu
    $(".shifumiChoice").on("click", function() {
        $(".shifumiGame").addClass("show");
        $(".memoryGame").removeClass("show");
    })
    $(".memoryChoice").on("click", function() {
        $(".memoryGame").addClass("show");
        $(".shifumiGame").removeClass("show");
    })

    // menu du jeu memory
    $(".difficulty__btn").on("click", function() {
        $(".diff_menu-content").toggleClass("show");
    })
    $(".diff_menu-content").on("mouseout", function() {
        $(this).toggleClass("show");
    })

    // sur les 3 images : clic = afficher les images dans les cadres joueur et ordinateur
    // puis déterminer le vainqueur et afficher le résultat et MAJ du score

    userScoreP.text(userScore);
    computerScoreP.text(computerScore);
    $(".scissors, .leaf, .stone").on("click", function () {
        eraseChoices();
        selectUserChoice(this);
        let userChoice = this.className;
        let computerChoice = getComputerChoice();
        let choice = $("." + computerChoice)[0];
        selectComputerChoice(choice);

        let result = findWinner(userChoice, computerChoice);
        showResult(result);
    })
});

// fonction pour afficher/masquer le menu
function toggleMenu() {
    $(".menu-content").toggleClass("show");
}

// fonction pour afficher le symbole choisi (param choice) dans la case du joueur
function selectUserChoice(choice) {
    let imgSrc = choice.querySelector("img").attributes["src"].value;
    let newImg = ("<img>");
    $(".userSymbol").append(newImg);
    $(".userSymbol img").attr("src", imgSrc);
}

// fonction pour afficher le symbole choisi (param choice) dans la case de l'ordinateur
function selectComputerChoice(choice) {
    let imgSrc = choice.querySelector("img").attributes["src"].value.replace('_gauche', '_droite');
    let newImg = ("<img>");
    $(".computerSymbol").append(newImg);
    $(".computerSymbol img").attr("src", imgSrc);
}

// fonction pour effacer les symboles joueur et ordinateur
function eraseChoices() {
    $(".userSymbol img").remove();
    $(".computerSymbol img").remove();
}

// fonction pour déterminer le symbole de l'ordinateur
function getComputerChoice() {
    let choices = ['stone', 'leaf', 'scissors'];
    return choices[Math.floor(Math.random() * Math.floor(3))];
}

function findWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'Tied';
    } else {
        if (playerChoice === 'stone') {
            if (computerChoice === 'scissors') {
                return 'Won';
            } else {
                return 'Lost';
            }
        } else if (playerChoice === 'leaf') {
            if (computerChoice === 'stone') {
                return 'Won';
            } else {
                return 'Lost';
            }
        } else {
            if (computerChoice === 'leaf') {
                return 'Won';
            } else {
                return 'Lost';
            }
        }
    }
}

// fonction d'affichage du résultat et du score
function showResult(result) {
    let p = $(".result p");
    switch (result) {
        case "Tied":
            p.text("Egalité").removeClass("won lost").addClass("tied");
            break;
        case "Won":
            p.text("Gagné").removeClass("tied lost").addClass("won");
            userScore++;
            userScoreP.text(userScore);
            break;
        case "Lost":
            p.text("Perdu").removeClass("won tied").addClass("lost");
            computerScore++;
            computerScoreP.text(computerScore);
            break;
    }
}