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

    // gestion du clic sur le bouton actualiser :
    // on efface le feed existant puis
    // on rappelle la fonction home pour recréer l'affichage à jour
    $(".btn-refresh").on("click", function () {
        $("article").remove();
        discipline = randomDiscipline();
        home();
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
    $(".btn-refresh").after(newArticle);
    data.forEach(entity => {
        let newSection = ("<section>");
        $("article").append(newSection);
        let newH2 = ("<h2>");
        $("section:last").append(newH2);
        $("h2:last").text(`${entity.rank}. ${entity.name} (${entity.country})`);
        let newP = ("<p>");
        $("section:last").append(newP);
        $("p:last").text(`${entity.points} points`);
        $("section:last").append(newP);
        $("p:last").text(`${entity.tmntsPlayed} tournois joués, ${entity.earnings} de gains, ${entity.ranking_change} places gagnées`);
        $("section:last").append(newP);
        $("p:last").text(`Carrière : ${entity.win} pour ${entity.loss} défaites`);
    });
}

function showMenu() {
    
}