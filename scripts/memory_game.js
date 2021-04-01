// fonction de creation du plateau de jeu : 5 cases en largeur
// 2 (facile), 4 (normal) ou 6 (difficile) en hauteur
function createBoard(nbHeightBoxes, theme) {
    // d'abord effacer le plateau s'il existe
    $(".memoryBox").remove();

    // puis créer le plateau
    for (let i = 0; i < nbHeightBoxes; i++) {
        $(".memory").append("<div>");
        $(".memory div:last").addClass("memoryLine" + (i+1));
        createLineOfBoxes(i);
    }

    getMemoryImages(nbHeightBoxes * 2.5, theme);

    // puis les listener pour le clic sur les cases
    $(".memoryBox").on("click", function () {
        alert('Ok');
    })
}

function createLineOfBoxes(line) {
    for (let i = 0; i < 5; i++) {
        $(".memoryLine" + (line+1)).append("<div>");
        $(".memoryLine" + (line+1) + " div:last").addClass("memoryBox" + (line*5 + i+1));
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
    let url = "https://pixabay.com/api/?key=" + api_key + "&q=" + encodeURIComponent(theme) + "&per_page=" + nb;
    $.getJSON(url, function(result) {
        // fonction de callback, asynchrone !!!!
       affectImages(nb, result);
    });   
}

// fonction qui affecte les images aux cases
function affectImages(nb, result) {
    // on récupère le tableau des nb images
    let images = result.hits;
    // on le recopie à la fin de lui-même (puisque qu'il nous faut des paires)
    Array.prototype.push.apply(images, images);
    // boucle : tirage d'un nombre aléatoire, on prend l'image correspondante et on l'affecte au nouveau tableau d'images
    let boardOrderedImages = [];
    while(images.length>0) {
        let random = Math.floor(Math.random() * (images.length));
        boardOrderedImages.push(images[random]);
        images.splice(random, 1);
    }
    // boucle : affecter les images aux cases, dans l'ordre
    for(let i=0; i<boardOrderedImages.length; i++) {
        let newImg = ("<img>");
        $("memoryBox" + (i+1)).append(newImg);
        $("memoryBox" + (i+1) + " imglast").attr("src", boardOrderedImages[i]);
    }
}