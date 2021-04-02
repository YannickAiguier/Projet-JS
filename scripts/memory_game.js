// menu du jeu memory
$(".difficulty__btn").on("click", function() {
    $(".diff_menu-content").toggleClass("show");
})
$(".diff_menu-content").on("mouseout", function() {
    $(this).toggleClass("show");
})

// réaction au choix du niveau
$("#easyGame").on("click", function(){
    createBoard(2, 'animals');
})
$("#normalGame").on("click", function(){
    createBoard(4, 'animals');
})
$("#difficultGame").on("click", function(){
    createBoard(6, 'animals');
})

// fonction de creation du plateau de jeu : 5 cases en largeur
// 2 (facile), 4 (normal) ou 6 (difficile) en hauteur
function createBoard(nbHeightBoxes, theme) {
    // d'abord effacer le plateau s'il existe
    $(".memory>div").remove();

    // puis créer le plateau
    for (let i = 0; i < nbHeightBoxes; i++) {
        $(".memory").append("<div>");
        $(".memory div:last").addClass("memoryLine" + (i)).addClass("memoryLine");
        createLineOfBoxes(i);
    }

    getMemoryImages(nbHeightBoxes * 2.5, theme);
    // getPixabay(theme);

    // puis les listener pour le clic sur les cases
    $(".memoryBox").on("click", function () {
        console.log($("img", this).attr("src"));
    })
}

function createLineOfBoxes(line) {
    for (let i = 0; i < 5; i++) {
        $(".memoryLine" + line).append("<div>");
        $(".memoryLine" + line + " div:last").addClass("memoryBox" + (line * 5 + i)).addClass("memoryBox");
    }
}

// fonction pour tester l'API de Pixabay
function getPixabay(theme) {
    let api_key = '20928431-e70c111662cf3248b59e19e1c';
    let url = "https://pixabay.com/api/?key=" + api_key + "&q=" + encodeURIComponent(theme);
    $.getJSON(url, function (result) {
        if (parseInt(result.totalHits) > 0) {
            $.each(result.hits, function (i, hit) {
                console.log(hit.previewURL);
            })
        } else {
            console.log('No result');
        }
    })
}

// fonction pour aller chercher nb images sur un thème pour le memory
function getMemoryImages(nb, theme) {
    let api_key = '20928431-e70c111662cf3248b59e19e1c';
    let url = "https://pixabay.com/api/?key=" + api_key + "&q=" + encodeURIComponent(theme) + "&per_page=" + nb + "&orientation=horizontal";
    $.getJSON(url)
    .done(function (result) {
        // fonction de callback, asynchrone !!!!
        affectImages(result);
    });
}

// fonction qui affecte les images aux cases
function affectImages(result) {
    // on récupère le tableau des nb images
    let images = result.hits;
    let images2 = result.hits;
    
    // on le recopie à la fin de lui-même (puisque qu'il nous faut des paires)
    images = images.concat(images2);

    // boucle : tirage d'un nombre aléatoire, on affecte l'image correspondante au nouveau tableau d'images,
    // puis on supprime cette image du tableau des possibilités
    let boardOrderedImages = [];
    while (images.length > 0) {
        let random = Math.floor(Math.random() * (images.length));
        boardOrderedImages.push(images[random]);
        images.splice(random, 1);
    }

    console.log(boardOrderedImages.length);

    // boucle : affecter les images aux cases, dans l'ordre
    for (let i = 0; i < boardOrderedImages.length; i++) {
        $(".memoryBox" + i).append("<img>");
        $(".memoryBox" + i + " img:last").attr("src", boardOrderedImages[i].previewURL);
    }
}