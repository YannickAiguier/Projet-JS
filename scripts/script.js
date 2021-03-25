$(document).ready(function() {

    getAllTeams();

});

function getAllTeams() {
    $.ajax({
        url: "https://statsapi.web.nhl.com/api/v1/teams",
    })
    .done(function(response) {
        console.log("Réponse :");
        console.log(response);
    })
    .fail(function(error) {
        console.log("Erreur !");
        console.log(error);
    })
}