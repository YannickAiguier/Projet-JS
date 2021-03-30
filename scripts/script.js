let discipline = randomDiscipline();
$("h1").text(discipline);

$(document).ready(function () {

    // mise en place du carrousel
    $('.carrousel').slick({
        accessibility: true,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        centerMode: true,
        centerPadding: '0px',
        dots: true,
        infinite: true,
    });

    // appel de la fonction home pour afficher les infos de la page d'accueil
    home();

    let addButton = document.getElementById("addButton");
    addButton.addEventListener("click", function (event) {
        event.preventDefault();
        let form = document.getElementById("addForm");
        let rankRegExp = /^[0-9]+$/;
        // si autre chose qu'un nombre entier alerter l'utilisateur
        if (!rankRegExp.test(form.addRank.value)) {
            alert('Entrez un nombre pour le rang svp.');form.addRank.innerHTML = "";
        } else {
            createFeedElement(createFormElement());
            addErasableClass();
        }
        
    })

    // gestion du clic sur le bouton actualiser :
    // on efface le feed existant puis
    // on rappelle la fonction home pour recréer l'affichage à jour
    $(".btn-refresh").on("click", function () {
        $("article").remove();
        discipline = randomDiscipline();
        home();
    })

    // clic sur le bouton menu : affiche/masque le menu
    $(".menu__btn").on("click", function () {
        toggleMenu();
    })

    // la souris quitte le menu : il disparait
    $(".menu-content").on("mouseout", function () {
        toggleMenu();
    })

    // bouton pour supprimer
    $(".btn-delete").on("click", function(event) {
        event.preventDefault();
        // passer toutes les div isErasable en mode "hover : change curseur"
        $(".isErasable").addClass("readyToErase");
    })
});

// fonction qui défini l'url de l'api et appelle la fonction getData
function home() {
    let myUrl = "https://bwf-api.herokuapp.com/api/" + discipline;
    getData(myUrl);
}

// fonction qui renvoie la discipline tirée au sort
function randomDiscipline() {
    let discipline = ["men-singles", "women-singles", "men-doubles", "women-doubles", "mixed-doubles"];
    let index = Math.floor(Math.random() * 5);
    return discipline[index];
}

// fonction qui fait la requête API puis appelle la fonction de traitement des données
function getData(apiUrl) {
    $.ajax({
        url: apiUrl,
    })
        .done(function (response) {
            showResult(response);
        })
        .fail(function (error) {
            console.log("Erreur !");
            console.log(error);
        })
}

// fonction qui crée le feed
function showResult(data) {
    $("h1").text(discipline);
    let newArticle = ("<article>");
    $("#addForm").after(newArticle);
    data.forEach(entity => {
        createFeedElement(entity);
    });
}

// fonction qui crée un élément du feed
function createFeedElement(element) {
    let newSection = ("<section>");
    $("article").append(newSection);
    let newH2 = ("<h2>");
    $("section:last").append(newH2);
    $("h2:last").text(`${element.rank}. ${element.name} (${element.country})`);
    let newP = ("<p>");
    $("section:last").append(newP);
    $("p:last").text(`${element.points} points`);
    $("section:last").append(newP);
    $("p:last").text(`${element.tmntsPlayed} tournois joués, ${element.earnings} de gains, ${element.ranking_change} places gagnées`);
    $("section:last").append(newP);
    $("p:last").text(`Carrière : ${element.win} pour ${element.loss} défaites`);
}

// fonction pour afficher/masquer le menu
function toggleMenu() {
    $(".menu-content").toggleClass("show");
}

// fonction qui crée et retourne un objet depuis les données du formulaire
function createFormElement () {
    let form = document.getElementById("addForm");
    let element = {country: form.addCountry.value, earnings: "$" + form.addEarnings.value, loss: form.addLoss.value, name: form.addName.value,
        points: form.addPoints.value, rank: form.addRank.value, ranking_change: 0, tmntsPlayed: form.addPlayed.value, win: form.addWin.value};
    return element;
}

// fonction pour ajouter une classe qui désigne l'élément du feed comme effaçable
function addErasableClass() {
    $("section:last").addClass("isErasable");
}