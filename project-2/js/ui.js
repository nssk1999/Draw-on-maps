const classes = document.querySelector('.classes');
// var fromid=document.getElementById("addform");

// console.log(forme.titleioe);
var dateset=[];
document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add classo form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {dropdownOptions:true});
});


// function initMap() {
//   // The location of Uluru
//   var uluru = {lat: -25.344, lng: 131.036};
//   // The map, centered at Uluru
//   var map = new google.maps.Map(
//       document.getElementById('map'), {zoom: 4, center: uluru});
//       console.log("loaded");
//   // The marker, positioned at Uluru
//   var marker = new google.maps.Marker({position: uluru, map: map});
//   }