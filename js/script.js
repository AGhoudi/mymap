/*Creation de la carte*/

const mymap = L.map('mapid').setView([48.8588377, 2.3120389], 10);




/*Ajout de l'API MAPBOX*/
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoibm94eCIsImEiOiJjanVqaHVzYjUwcmhqM3luN25mcnp0ZHJxIn0.L3yP3h3v0uRxLFe6wttJ0A'
}).addTo(mymap);



/* Utilisation de l'api  */
const api = "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=10000&facet=overflowactivation&facet=creditcard&facet=kioskstate&facet=station_state";
$( document ).ready(function() {
    
    $.get(api, function(data, status){

        let markerClusters = L.markerClusterGroup();

        //Création d'une boucle afin de placer les marqueurs        
        for (let i = 0; i < data.records.length; i++) {
            const marker = L.marker([data.records[i]["geometry"]["coordinates"][1], data.records[i]["geometry"]["coordinates"][0]]);


        //Récupération des infos pour le tableau
            markerClusters.addLayer(marker);
              marker.on('click', function(){
            document.getElementById("name").innerHTML = data.records[i]["fields"]["station_name"];
            document.getElementById("place").innerHTML = data.records[i]["fields"]["nbedock"];
            document.getElementById("dispo").innerHTML = data.records[i]["fields"]["nbebike"];
            
        }
            );

        }
            mymap.addLayer(markerClusters);

        
    });
});

