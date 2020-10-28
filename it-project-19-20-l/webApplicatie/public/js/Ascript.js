let modal = document.getElementById('id01');
let contactpagina = document.getElementById('contact')
let ul = document.getElementById("myOLStad");
let ul2 = document.getElementById('myOL')
let div = document.createElement("div");
let div2 = document.createElement("div");
let divBuurt = document.createElement('div');
let divBuurt2 = document.createElement('div');
let naamuser = {};
let place = {};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal ) {
        modal.style.display = "none";
    }
}

window.addEventListener('click' , (event)=> {
  if(event.target == contactpagina){
    contactpagina.style.display="none";
  }
})
 myClosewindow =() =>{
    
    document.getElementById('id01').style.display='none'
}
let knopContact = document.getElementById('contactknop');
knopContact.addEventListener('click',()=> {
  document.getElementById('contact').style.display='block';
})

tonenvanStadGegevens = () => {
  fetch ('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek8/MapServer/854/query?where=1%3D1&outFields=*&outSR=4326&f=json')
  .then ((res) => {
    return res.json()
  })
  .then ((stadsdeel)=> {
    let arrayDistrict= [];
    for (let i = 0; i <= 40; i++) {
      arrayDistrict.push(stadsdeel.features[i].attributes.DISTRICT)
    }
    let a = Array.from(new Set(arrayDistrict));

    let aantalDistrict = a.length/2;
   
      for (let index = 0; index < aantalDistrict; index++) {
        let li = document.createElement('li');
      li.appendChild(document.createTextNode(a[index]));
      div.appendChild(li);
    }
    ul.appendChild(div)
    for (let k = aantalDistrict; k<a.length ; k++) {
      let li = document.createElement('li');
      li.appendChild(document.createTextNode(a[k]))
      div2.appendChild(li)
    }
    ul.appendChild(div2);
  })
}
tonenvanStadGegevens();

  tonenvanBuurtGegevens =  ()=> {
  fetch( 'https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek8/MapServer/850/query?where=1%3D1&outFields=*&outSR=4326&f=json')
  .then ((res)=>{
    return res.json();
  })
  .then ((buurtdata)=> {
    let arrayBuurt =[];
    for (let i = 0; i <243; i++) {
  
      arrayBuurt.push(buurtdata.features[i].attributes.DISTRICT);
  }
  let b = Array.from(new Set(arrayBuurt))

  let aantalBuurt = b.length / 2;
  for (let k = 0; k < aantalBuurt; k++) {
    let li  = document.createElement('li');
    li.appendChild(document.createTextNode(b[k]));
    divBuurt.appendChild(li)
  }
  ul2.appendChild(divBuurt);

  for (let index = 11; index < b.length; index++) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(b[index]))
    divBuurt2.appendChild(li);
  }
  ul2.appendChild(divBuurt2);
})
}
tonenvanBuurtGegevens()

mySearch = ()=> {
let input, filter, ol,olstad,listad, li,i, txtValue;
input = document.getElementById("myInput");
filter = input.value.toUpperCase();
ol = document.getElementById("myOL");
olstad =document.getElementById('myOLStad')
listad = olstad.getElementsByTagName("li")
li = ol.getElementsByTagName("li");

for (i = 0; i < li.length; i++) {
    
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
    } else {
        li[i].style.display = "none";
    }
  }

  for (let index = 0; index < listad.length; index++) {
    txtValue = listad[index].textContent || listad[index].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
        listad[index].style.display = "";
    } else {
        listad[index].style.display = "none";
    }
  }
}

 

 
   
 
 



 

