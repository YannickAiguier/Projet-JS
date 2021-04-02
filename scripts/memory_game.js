let firstClic = '';
let boardOrderedPictures = [];
let nbToFind = 0;
let nbFound = 0;

// gestion du formulaire
$(".btn-ok").on("click", function (event) {
    event.preventDefault();
    // console.log($("#difficulty")[0].value, $("#theme")[0].value);
    firstClic = '';
    boardOrderedPictures = [];
    nbToFind = 0;
    nbFound = 0;
    createBoard($("#difficulty")[0].value, $("#theme")[0].value);
});

// fonction de creation du plateau de jeu : 5 cases en largeur
// 2 (facile), 4 (normal) ou 6 (difficile) en hauteur
function createBoard(nbHeightBoxes, theme) {
    // d'abord effacer le plateau s'il existe
    $(".memory>div").remove();
    nbToFind = nbHeightBoxes * 2.5;

    // puis créer le plateau
    for (let i = 0; i < nbHeightBoxes; i++) {
        $(".memory").append("<div>");
        $(".memory div:last").addClass("memoryLine" + (i)).addClass("memoryLine");
        createLineOfBoxes(i);
    }

    getMemoryPictures(nbToFind, theme);
    // getPixabay(theme);

    // puis les listener pour le clic sur les cases
    $(".memoryBox").on("click", function (element) {
        // appeler la fonction qui gère le clic sur image
        pictureClic(element);
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
function getMemoryPictures(nb, theme) {
    let api_key = '20928431-e70c111662cf3248b59e19e1c';
    let url = "https://pixabay.com/api/?key=" + api_key + "&q=" + encodeURIComponent(theme) + "&per_page=" + nb + "&orientation=horizontal&lang=fr";
    $.getJSON(url)
        .done(function (result) {
            console.log(result);
            if (result.hits.length = nb) {
                // fonction de callback, asynchrone !!!!
                affectPictures(result);
            } else {
                alert("Pas assez d'images sur ce thème, merci d'en changer");
            }

        });
}

// fonction qui affecte les images aux cases
function affectPictures(result) {
    // on récupère le tableau des nb images
    let pictures = result.hits;
    let pictures2 = result.hits;

    // on le recopie à la fin de lui-même (puisque qu'il nous faut des paires)
    pictures = pictures.concat(pictures2);

    // boucle : tirage d'un nombre aléatoire, on affecte l'image correspondante au nouveau tableau d'images,
    // puis on supprime cette image du tableau des possibilités
    while (pictures.length > 0) {
        let random = Math.floor(Math.random() * (pictures.length));
        boardOrderedPictures.push(pictures[random].previewURL);
        pictures.splice(random, 1);
    }


    // boucle : affecter les images aux cases, dans l'ordre
    for (let i = 0; i < boardOrderedPictures.length; i++) {
        $(".memoryBox" + i).append("<img>");
        // $(".memoryBox" + i + " img:last").attr("src", boardOrderedPictures[i]);
        $(".memoryBox" + i + " img:last").attr("src", "./images/jeux/memory/memory.svg");
    }
}

// fonction qui gère le clic sur image 
function pictureClic(element) {
    // nom de la div cliquée
    let div = "." + $(element.currentTarget.classList)[0];
    let nb = div.slice(10);
    // clic = url de l'image
    let clic = boardOrderedPictures[nb];
    // affichage de l'image
    $("img", div).attr("src", clic);
    if (firstClic !== '') {
        if (clic !== firstClic) {
            // pas une paire;

            setTimeout(function () {
                // chacher les 2 images
                $(".img1").attr("src", "./images/jeux/memory/memory.svg");
                $("img", div).attr("src", "./images/jeux/memory/memory.svg");
                $(".img1").removeClass("img1");
                firstClic = '';
            }, 1000);


        } else {
            // paire trouvée
            setTimeout(function () {
                firstClic = '';
                $(div).addClass("memoryFound").off("click");
                $("img", div).attr("src", '');
                $(".img1").parent().off("click");
                $(".img1").attr("src", '');
                $(".img1").addClass("memoryFound").removeClass("img1");
                nbFound++;
                if (nbFound == nbToFind) {
                    alert('Vous avez gagné !');
                }
            }, 1000);
        }
    } else {
        $("img", div).addClass("img1");
        firstClic = clic;
    }
}