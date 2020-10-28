/*knop die ervoor zorgt dat u naam word weergegeven*/ 
let button = document.getElementById('button');
let Id ={};
let newData ={};
let index = 0;
let test =[];

const database = firebase.database();
const rootRef = database.ref('users')

/* 1*/ Data_username = () =>{
    let mylogin = document.getElementById("mylog");
    let myForm = new FormData(mylogin);
     Id.id = myForm.get("userId")
    naamuser.name = myForm.get("uname");
    let psw = myForm.get('psw');

    document.getElementById("userName").textContent="Welkom" + " " +  naamuser.name; 
    document.getElementById("id01").style.display="none";
    //data versturen naar firedatbase
    rootRef.child(Id.id).set({
        user_name:naamuser.name,
        password : psw
    })
}

filterColorlijst1 = (features) => {
    return {
      fillColor: '#DC143C',
      weight:4,
      opacity:0.2,
      color:"#228C22",
      fillOpacity:2
    }
  }

  filterColorlijst2 = (features) => {
    return {
      fillColor: '#DC523C',
      weight:4,
      opacity:0.2,
      color:"#228C22",
      fillOpacity:2
    }
  }

 /*2*/checkbox = (id,idlabel,idlabelomschrijving,keuze) => {

    let childData;
   
    if (id.checked == true && naamuser.name!==undefined) {
        let olfavo = document.getElementById('favo');
        let lifavo = document.createElement('li');
        console.log(keuze.innerHTML)
        index++;
          
            lifavo.appendChild(document.createTextNode(idlabel.textContent+", Omschrijving: "+idlabelomschrijving.textContent + ", Niveau: "+ keuze.textContent ));
            olfavo.appendChild(lifavo);
            
            newData = {
                naam : idlabel.innerHTML,
                omschrijving : idlabelomschrijving.innerHTML
            }
            rootRef.child(Id.id+'/favorieten/'+index).set(newData)

           lifavo.addEventListener('click', () => {
        /* deze deel is voor u stad */        
            if (keuze.textContent ==="stadsdeel") {

                if (buurtGeojson && stadsGeojson) {
                    buurtGeojson.remove();
                    stadsGeojson.remove();
                }
                    stadsGeojson = L.geoJSON(stadLi.data,{filter:function(feature ,layer){
                        if(feature.properties.NAAM === idlabel.textContent){
                          
                          return feature.properties;
                          
                        }
                      },onEachFeature:onEachFeature,style:filterColorlijst1}).addTo(mymap)
                }
                if (keuze.textContent ==="buurt") {

                    if (buurtGeojson && stadsGeojson) {
                        buurtGeojson.remove();
                        stadsGeojson.remove();
                    }
                        buurtGeojson = L.geoJSON(buurtLi.data,{filter:function(feature ,layer){
                            if(feature.properties.NAAM === idlabel.textContent){
                              
                              return feature.properties;
                              
                            }
                          },onEachFeature:onEachFeature,style:filterColorlijst2}).addTo(mymap)
                    }
           })
    }
    else {
        alert('Gelieve u in te loggen.')
    }
}
/*als op de knop:lijst klikt => als je hebt ingelogd krijg je je naam te zien anders niks */
button.addEventListener('click' , () => {
    let mylogin = document.getElementById("mylog");
    let myForm = new FormData(mylogin);
    naamuser.name = myForm.get("uname");
    if (naamuser.name === undefined) {
      document.getElementById('nameuser').textContent="meld u eerst aan u om u favorieten te kunnen zien";
    }
    else {
        document.getElementById('nameuser').textContent=naamuser.name + " uw favorieten lijst";
    }
})








