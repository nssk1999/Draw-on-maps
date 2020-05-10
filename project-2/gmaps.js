
const red='#FF0000'
const green='#00FF00';
const blue='#0000FF';
const purple='#FF00FF';
const yellow='#FFFF00';
const form = document.querySelector("#f1");

// #########################################################################################################
var map;
var apt,brn,vil,cml,gh;
var mvsr = {lat: 17.281277,lng: 78.539145};
var pos;
var posquads=[];
const renderPolygons=()=>{
  posquads = [
    {lat: pos["lat"]+0.000208,lng: pos["lng"]-0.000204},
    {lat: pos["lat"]+0.000208,lng: pos["lng"]+0.000204},
    {lat:pos["lat"]-0.000208,lng:pos["lng"]+0.000204},
    {lat:pos["lat"]-0.000208,lng:pos["lng"]-0.000204}
  ];
  apt = new google.maps.Polygon({
    paths: posquads,
    strokeColor: red,
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: red,
    fillOpacity: 0.35,
    editable:true
  });
  brn = new google.maps.Polygon({
    paths: posquads,
    strokeColor: yellow,
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: yellow,
    fillOpacity: 0.35,
    editable:true
  });
  vil = new google.maps.Polygon({
    paths: posquads,
    strokeColor: purple,
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: purple,
    fillOpacity: 0.35,
    editable:true
  });
  cml = new google.maps.Polygon({
    paths: posquads,
    strokeColor: green,
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: green,
    fillOpacity: 0.35,
    editable:true
  });
  gh = new google.maps.Polygon({
    paths: posquads,
    strokeColor: blue,
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: blue,
    fillOpacity: 0.35,
    editable:true
  });
}
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 19,
    center: {lat: 17.281277,lng: 78.539145}
    // mapTypeId: 'terrain'
  });
  // var posquads=[];
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var marker = new google.maps.Marker({position: pos, map: map});
      renderPolygons();

      form.addEventListener('submit', evt => {
        evt.preventDefault();
        // console.log("submit initited and asked to show: "+form.sets.value );
        run(form.sets.value);
      });      

      form.sets.addEventListener('change', evt => {
        evt.preventDefault();
        console.log("submit initited and asked to show: "+form.sets.value );
        switch(form.sets.value){
          case "apartments":
            gh.setMap(null);
            cml.setMap(null);
            brn.setMap(null);
            vil.setMap(null);
            apt.setMap(map);
            break;
          case "commercials":
            gh.setMap(null);
            cml.setMap(map);
            brn.setMap(null);
            vil.setMap(null);
            apt.setMap(null);
            break;
          case "guest_homes":
            gh.setMap(map);
            cml.setMap(null);
            brn.setMap(null);
            vil.setMap(null);
            apt.setMap(null);
            break;
          case "villas":
            gh.setMap(null);
            cml.setMap(null);
            brn.setMap(null);
            vil.setMap(map);
            apt.setMap(null);
            break;
          case "barrens": 
            gh.setMap(null);
            cml.setMap(null);
            brn.setMap(map);
            vil.setMap(null);
            apt.setMap(null);
            break;
        }
        // run(form.sets.value);
      });
      // apt.setMap(map);
      map.setCenter(pos);
    }, function() {
      console.log("if function toggle")
    });
  } else {
    // Browser doesn't support Geolocation
    console.log("geoloaction failed and else toggles")
  }
}
// ##########################################################################################################################
function run(value){
  var set=[]; 
  switch(form.sets.value){
    case "apartments":
      for (var i =0; i < apt.getPath().getLength(); i++) {
        var xy = apt.getPath().getAt(i);
        set.push({lat:xy.lat(),lng:xy.lng()});
      }
      break;
    case "commercials":
      for (var i =0; i < cml.getPath().getLength(); i++) {
        var xy = cml.getPath().getAt(i);
        set.push({lat:xy.lat(),lng:xy.lng()});
      }
      break;
    case "guest_homes":
      for (var i =0; i < gh.getPath().getLength(); i++) {
        var xy = gh.getPath().getAt(i);
        set.push({lat:xy.lat(),lng:xy.lng()});
      }
      break;
    case "villas":
      for (var i =0; i < vil.getPath().getLength(); i++) {
        var xy = vil.getPath().getAt(i);
        set.push({lat:xy.lat(),lng:xy.lng()});
      }
      break;
    case "barrens": 
      for (var i =0; i < brn.getPath().getLength(); i++) {
        var xy = brn.getPath().getAt(i);
        set.push({lat:xy.lat(),lng:xy.lng()});
      }
      break;
  }
  
  db.collection(value).add({
      loc:set
  })
  // console.log(set);
  alert("Interted succesfully");
  location.assign("/")
}


