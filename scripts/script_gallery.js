// tableau contenant le nom des images
let images = ["ms01.jpg", "ws01.jpg", "md01.jpg", "wd01.jpg", "mx01.jpg", "mx02.jpg"];

$(document).ready(function () {

    // création dynamique de la gallerie
    createGallery();

    // Ici tous les listeners
    // clic sur le bouton menu : affiche/masque le menu
    $(".menu__btn").on("click", function () {
        toggleMenu();
    })

    // la souris quitte le menu : il disparait
    $(".menu-content").on("mouseout", function () {
        toggleMenu();
    })

    // bouton d'affichage de la gallerie en mosaïque
    $(".mosaicButton").on("click", function () {
        $("article").removeClass("articleGalleryColumn").addClass("articleGalleryMosaic");
    })

    // bouton d'affichage de la gallerie en colonne
    $(".columnButton").on("click", function () {
        $("article").removeClass("articleGalleryMosaic").addClass("articleGalleryColumn");
    })

    // bouton d'ajout d'image à la gallerie (affiche/masque la div du formulaire)
    $(".addImgButton").on("click", function () {
        toggleImgForm();
    });

    // bouton pour confirmer l'ajout
    $("#addImgButton").on("click", function (event) {
        event.preventDefault();
        addToGallery();
    })

    // bouton pour supprimer
    $(".delImgButton").on("click", function() {
        // passer toutes les div isErasable en mode "hover : change curseur, clic = delete"
        $(".isErasable").addClass("readyToErase");
        $(".isErasable").on("click", function() {
            $(this).remove();
        })
    })
});


// fonction pour afficher/masquer le menu
function toggleMenu() {
    $(".menu-content").toggleClass("show");
}

// fonction qui crée la gallerie
function createGallery() {
    let newArticle = ("<article>");
    $("#addImgDiv").after(newArticle);
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

// fonction pour afficher/masquer le firmulaire d'ajour d'image
function toggleImgForm() {
    $("#addImgDiv").toggle("show");
}

// fonction pour gérer l'ajout d'image à la gallerie depuis l'url du formulaire
function addToGallery() {
    let form = document.getElementById("addImgForm");
    let imageUrl = form.addImg.value;
    let newDiv = ("<div>");
    $("article").append(newDiv);
    $("div:last").addClass("divgallery");
    let newImg = ("<img>");
    $("div:last").append(newImg)
    $("img:last").attr("src", imageUrl);
    $("div:last").addClass("isErasable");
    toggleImgForm();
}