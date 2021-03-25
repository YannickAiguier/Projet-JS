$(document).ready(function () {

    let teams = new Object();
    getAllTeams();
});

function getAllTeams() {
    $.ajax({
        url: "https://statsapi.web.nhl.com/api/v1/teams",
    })
        .done(function (response) {
            console.log("Réponse :");
            teams = response.teams;
            console.log(teams);
            showTeams();
        })
        .fail(function (error) {
            console.log("Erreur !");
            console.log(error);
        })
}

function showTeams() {
    let newArticle = ("<article>");
    $("h1").after(newArticle);
    teams.forEach(team => {
        console.log(team);
        let newSection = ("<section>");
        $("article").append(newSection);
        let newH2 = ("<h2>");
        $("section:last").append(newH2);
        $("h2:last").text(`${team.name} (${team.abbreviation})`);
        let newP = ("<p>");
        $("section:last").append(newP);
        $("p:last").text(`1° année en NHL : ${team.firstYearOfPlay}`);
        $("section:last").append(newP);
        $("section p:last").text(`Division ${team.division.name} dans la conférence ${team.conference.name}`);
        $("section:last").append(newP);
        $("section p:last").text(`Joue au ${team.venue.name} à ${team.venue.city}`);
        $("section:last").append(newP);
        $("section p:last").html(`Site officiel : <a href="${team.officialSiteUrl}">${team.officialSiteUrl}</a>`);
    });
}