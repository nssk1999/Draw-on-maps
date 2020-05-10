// const firebaseConfig = {
//     apiKey: "AIzaSyB2G6me0hyP9lcRFuG-DtQOLpJVaTNDcjI",
//     authDomain: "curency-trans.firebaseapp.com",
//     databaseURL: "https://curency-trans.firebaseio.com",
//     projectId: "curency-trans",
//     storageBucket: "curency-trans.appspot.com",
//     messagingSenderId: "992432079602",
//     appId: "1:992432079602:web:917d56b2913b6a6770c66b",
//     measurementId: "G-RLNJNBHNWM"
//     };
//   firebase.initializeApp(firebaseConfig);
//   const db = firebase.firestore();
//   firebase.analytics();
var apts=[];
var vils=[];
var cmls=[];
var brns=[];
var ghs=[];

var pp;
var pos;
var map;
const red='#FF0000';
const green='#00FF00';
const blue='#0000FF';
const purple='#FF00FF';
const yellow='#FFFF00';
const setting=(set)=>{
  for(var i=0;i<set.length;i++)
    set[i].setMap(map);
};
const desetting=(set)=>{
  for(var i=0;i<set.length;i++)
    set[i].setMap(null);
};
const renderdata=()=>{
  db.collection("apartments").get().then(function(querySnapshot) {
    
    querySnapshot.forEach(function(doc) {
        // accesing location data
        pp=doc.data().loc;
        var apt = new google.maps.Polygon({
          paths: pp,
          strokeColor: red,
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: red,
          fillOpacity: 0.35
        });
        apts.push(apt);
        apt.setMap(map);
    });
  });
  db.collection("commercials").get().then(function(querySnapshot) {
    
    querySnapshot.forEach(function(doc) {
        // accesing location data
        pp=doc.data().loc;
        var cml = new google.maps.Polygon({
          paths: pp,
          strokeColor: green,
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: green,
          fillOpacity: 0.35
        });
        cmls.push(cml);
        cml.setMap(map);
    });
  });
  db.collection("guest_homes").get().then(function(querySnapshot) {
    
    querySnapshot.forEach(function(doc) {
        // accesing location data
        pp=doc.data().loc;
        var gh = new google.maps.Polygon({
          paths: pp,
          strokeColor: blue,
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: blue,
          fillOpacity: 0.35
        });
        ghs.push(gh);
        gh.setMap(map);
    });
  });
  db.collection("villas").get().then(function(querySnapshot) {
    
    querySnapshot.forEach(function(doc) {
        // accesing location data
        pp=doc.data().loc;
        var vil = new google.maps.Polygon({
          paths: pp,
          strokeColor: purple,
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: purple,
          fillOpacity: 0.35
        });
        vils.push(vil);
        vil.setMap(map);
    });
  });
  db.collection("barrens").get().then(function(querySnapshot) {
    
    querySnapshot.forEach(function(doc) {
        // accesing location data
        pp=doc.data().loc;
        var brn = new google.maps.Polygon({
          paths: pp,
          strokeColor: yellow,
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: yellow,
          fillOpacity: 0.35
        });
        brns.push(brn);
        brn.setMap(map);
    });
  });

};

//map initiation
function initMap() {
  //geo location activation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var marker = new google.maps.Marker({position: pos, map: map}); 
    }, function() {
      console.log("if function toggle")
    });
  } else {
    // Browser doesn't support Geolocation
    console.log("geoloaction failed and else toggles")
  }
  // mao decalration
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17, 
    center: pos,
    streetViewControl: false
  });
  //  rendering data 
  renderdata();    
}

function run(value){
  switch(value){
    case "apartments":
      setting(apts);
      desetting(cmls);
      desetting(ghs);
      desetting(vils);
      desetting(brns);
      break;
    case "commercials":
      desetting(apts);
      desetting(ghs);
      desetting(vils);
      desetting(brns);
      setting(cmls);
      break;
    case "guest_homes":
      desetting(apts);
      desetting(vils);
      desetting(brns);
      desetting(cmls);
      setting(ghs);
      break;
    case "villas":
      setting(vils);
      desetting(apts);
      desetting(ghs);
      desetting(brns);
      desetting(cmls);
      break;
    case "barrens": 
      setting(brns);
      desetting(apts);
      desetting(ghs);
      desetting(vils);
      desetting(cmls);
      break;
    default:
      setting(apts);
      setting(cmls);
      setting(ghs);
      setting(vils);
      setting(brns);
  }
}

