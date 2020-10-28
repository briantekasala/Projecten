const express = require('express');
const ejs = require('ejs');
const fetch = require('node-fetch');
let hash = {};
 hash.psw = (password) => {
    /*de hash functie aan zodat deze het PBKDF2 algoritme gebruikt om het passwoord te hashen.
    zo kan niemand dar zien*/
    return CryptoJS.PBKDF2(password, salt, {
        iterations: iterations
    }).toString(CryptoJS.enc.Hex);
  }
const site = express();
site.set('port', process.env.PORT || 3000);
site.set('view engine', 'ejs');
site.use(express.static(__dirname + '/public'));

site.get('/buurt', async (req,res) => {
   await fetch('https://opendata.arcgis.com/datasets/c96c56b2c36f48cc86fbe77ea872b555_850.geojson')
    .then(res => {
        return res.json();
    })
    .then(buurt => {
        res.json(buurt);
    })
})

site.get('/stad', async  (req,res)=> {
 await fetch('https://opendata.arcgis.com/datasets/593e9680b43e4332952d3ef249e1912a_854.geojson')
    .then(res => {
        return res.json();
    })
    .then(stad => {
        res.json(stad);
    })
})

site.get('/',(req,res)=> {
  
          res.render('index')
      });
 
site.get('/contacten',(req ,res)=> {
    res.render('contacten')
})      


site.listen(site.get('port'), () => {
    console.log(`Express started on http://localhost:${
      site.get('port')}; press Ctrl-C to terminate.`);
  });
