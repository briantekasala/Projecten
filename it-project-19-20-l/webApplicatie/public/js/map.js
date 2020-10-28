
let mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
let mapboxAttribution =  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

//normale layer
let mymap = L.map('mapContainer', {
  scrollWheelZoom: true,
  inertia: true,
  inertiaDeceleration: 3000,
  drawControl: true
}); 
mymap.setView([51.2194475 ,4.4024643], 13);

let layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    container: 'mapContainer',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibGVjdG9yd291dGVyIiwiYSI6ImNrNTJrbXVraDB6cWwzbHFuZmFpN3lrM3MifQ.hNfZWRybtm-L49c9TPZ-dQ'
}).addTo(mymap);


//tweede layer
let layer2 = mymap.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));	//base layer

//Routing Control voor leaflet routing machine
let leafletRouter = L.Routing.control({
  //voorbeelCoördinaten
  waypoints:[L.latLng(51.2194475 ,4.4024643),L.latLng(51.2194475 ,4.4024647)],
  router: L.Routing.mapbox('pk.eyJ1IjoiZ3JvZXBsIiwiYSI6ImNrYWUwNjgwejF2ZGEyem10cnJmbnp4cnkifQ.t2DUGHbexuunALFNF_VRag', {language: 'nl'})
}).addTo(mymap);
//
var markersLayer = new L.LayerGroup();	

mymap.addLayer(markersLayer);
let mijnLocatie;

//locatie bepalen
let locatie = mymap.locate({setView: true, maxZoom: 12, watch: true});
function onLocationFound(e) {
    var radius = e.accuracy/2;

    mijnLocatie = L.marker(e.latlng).addTo(mymap)
        .bindPopup("U bevindt zich " + radius + " meters van dit punt");
        
    L.circle(e.latlng, radius).addTo(mymap);
}

mymap.on('locationfound', onLocationFound);
function onLocationError(e) {
    alert(e.message);
}
mymap.on('locationerror', onLocationError);

//draagbare marker instellen
var marker = L.marker([51.2194475 ,4.4024643],{
draggable: true,

}).bindPopup('Markeer hiermee uw locatie(s)').addTo(mymap);
marker.on('dragend', function (e) {
updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
});
mymap.on('click', function (e) {
marker.setLatLng(e.latlng);
updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
})
onEachFeature = (feature, layer) => {

    
  if (feature.properties && feature.properties.OMSCHRIJVING) {
    let box  = "<input type='checkbox' class='box' name='ola' id='check' onclick ='checkbox(check,naam,omschrijving,Keuze)'> toevoegen aan u favorieten?";
    layer.bindPopup("<label for='name' id ='naam'>"+feature.properties.NAAM+"</label>"+ "<br>"+ "Omschrijving:" +"<label for='name' id ='omschrijving'>"+feature.properties.OMSCHRIJVING+"</label>" +"<br>"+"NIVEAU:"+"<label for='name' id ='Keuze'>" +feature.properties.NIVEAU +"</label>"+"<br>"+ box
      );
  
  }
};


var favorieten = L.layerGroup([marker]);
var mapbox = layer;
var osm = layer2;

var baseMaps = {
"Mapbox": mapbox,
"OpenStreetMaps": osm
};
var overlayMaps = {
"Marker": favorieten
};
L.control.layers(baseMaps, overlayMaps).addTo(mymap);

// API buurt
let reset = document.getElementById('opnieuw');
let buurtLi = {};
let stadLi = {};
let buurtGeojson;
let stadsGeojson;

// als je klikt op een van districten wordt dat opgeslagen
let clicklijstbuurt = document.getElementById("myOL");
let clicklijststad =document.getElementById('myOLStad')

  filterbasis = (features) => {
    return {
      fillColor:'#006400',
      weight:4,
      opacity:0.4,
      color:'#D2B48C',
      fillOpacity:1
    }
  }

  filterColor1 = (features) => {
    return {
      fillColor: '#3B9CA7',
      weight:4,
      opacity:0.2,
      color:"#228C22",
      fillOpacity:2
    }
  }

  filterColor2 = (features) => {
    return {
      fillColor : "#288830 ",
      weight :4 ,
      opacity:0.2,
      color:"228C22",
      fillOpacity:2
    }
  }
  //tonen op de map 

  /*buurt_____--)*/

  window.addEventListener('load' , async (event) => {
    await fetch('/stad')
    .then(res=> {
      return res.json()
    })
    .then(stad => {
      stadLi.data = stad;
      stadsGeojson = L.geoJSON(stad,{onEachFeature:onEachFeature,style:filterbasis}).addTo(mymap);

      clicklijststad.addEventListener("click" ,  (event) => {
        let target = event.target ||  event.srcElement;
        place.naam = event.target.innerHTML;
          if (buurtGeojson && stadsGeojson) {
          buurtGeojson.remove()
          stadsGeojson.remove()
        }
        stadsGeojson = L.geoJSON(stad,{filter:function(feature ,layer){
          if(feature.properties.DISTRICT === place.naam){
            
            return feature.properties;
          }
        },onEachFeature:onEachFeature,style:filterColor1}).addTo(mymap);
      });
      reset.addEventListener('click' ,() => {

        if(stadsGeojson || buurtGeojson){
          stadsGeojson.remove();
          buurtGeojson.remove();
        }
        stadsGeojson = L.geoJSON(stad,{onEachFeature:onEachFeature,style:filterbasis}).addTo(mymap);
      })
    })
     await fetch('/buurt')
    .then( antw => {
      return antw.json()
    })
    .then(buurt =>{
      buurtLi.data = buurt;
      buurtGeojson = L.geoJSON(buurt,{onEachFeature:onEachFeature,style:filterbasis}).addTo(mymap);
      clicklijstbuurt.addEventListener("click" ,  (event) => {
        let target = event.target ||  event.srcElement;
        place.naam = event.target.innerHTML;
          if (buurtGeojson && stadsGeojson) {
          buurtGeojson.remove()
          stadsGeojson.remove()
        }
        buurtGeojson = L.geoJSON(buurt,{filter:function(feature ,layer){
          if(feature.properties.DISTRICT === place.naam){
            return feature.properties;
          }
        },onEachFeature:onEachFeature,style:filterColor2}).addTo(mymap);
      });

      reset.addEventListener('click' ,() => {

        if(stadsGeojson || buurtGeojson){
          stadsGeojson.remove();
          buurtGeojson.remove();
        }

        buurtGeojson = L.geoJSON(buurt,{onEachFeature:onEachFeature,style:filterbasis}).addTo(mymap);

      })
    })
  })

 






















  

 




 

  