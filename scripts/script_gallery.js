// tableau contenant le nom des images
let images = ["ms01.jpg", "ws01.jpg", "md01.jpg", "wd01.jpg", "mx01.jpg", "mx02.jpg"];

$(document).ready(function () {

    
    createGallery();

    // clic sur le bouton menu : affiche/masque le menu
    $(".menu__btn").on("click", function () {
        toggleMenu();
    })

    // la souris quitte le menu : il disparait
    $(".menu-content").on("mouseout", function () {
        toggleMenu();
    })

    $(".mosaicButton").on("click", function() {
        $("article").removeClass("articleGalleryColumn").addClass("articleGalleryMosaic");
    })

    $(".columnButton").on("click", function() {
        $("article").removeClass("articleGalleryMosaic").addClass("articleGalleryColumn");
    })
});


// fonction pour afficher/masquer le menu
function toggleMenu() {
    $(".menu-content").toggleClass("show");
}

// fonction qui crée la gallerie
function createGallery() {
    let newArticle = ("<article>");
    $("#buttonDiv").after(newArticle);
    $("article").addClass("articleGalleryMosaic");
    images.forEach(entity => {
        createGalleryElement(entity);
    });
}

// fonction qui crée une vignette de la gallery
function createGalleryElement(element) {
    let newDiv = ("<div>");
    $("article").append(newDiv);
    $("div:last").addClass("divgallery");
    let newImg = ("<img>");
    $("div:last").append(newImg)
    $("img:last").attr("src", "images/" + element);
}