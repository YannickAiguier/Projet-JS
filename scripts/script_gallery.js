$(document).ready(function () {

    // clic sur le bouton menu : affiche/masque le menu
    $(".menu__btn").on("click", function () {
        toggleMenu();
    })

    // la souris quitte le menu : il disparait
    $(".menu-content").on("mouseout", function () {
        toggleMenu();
    })
});


// fonction pour afficher/masquer le menu
function toggleMenu() {
    $(".menu-content").toggleClass("show");
}