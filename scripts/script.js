$(document).ready(function () {

    let result = new Object();
    getData();
});

function getData() {
    $.ajax({
        url: "https://bwf-api.herokuapp.com/api/mixed-doubles",
    })
        .done(function (response) {console.log(response);
            showResult(response);
        })
        .fail(function (error) {
            console.log("Erreur !");
            console.log(error);
        })
}

function showResult(data) {
    let newArticle = ("<article>");
    $("h1").after(newArticle);
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