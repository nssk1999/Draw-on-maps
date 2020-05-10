

var email=document.getElementById("mail");
var pwd=document.getElementById("pwed");
var login_p=document.getElementById("login-set");
var logout_p=document.getElementById("logout-p");
var lo_icon=document.getElementById("lo");
var ff=document.getElementById("f1");
var mm=document.getElementById("map");
// mm.style.display="none";
// ff.style.display-"none";
const forml = document.querySelector("#f2");
  // console.log(form.title)
  forml.addEventListener('submit', evt => {
    evt.preventDefault();
    login();
    lo_icon.classList.remove("hide");
  });


function login(){
	var userEmail = email.value;
	var userPass = pwd.value;
    console.log("login initisted")
	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
	  // ...
	  window.alert("Error "+ errorMessage);
	});
}
function logout(){
    firebase.auth().signOut();
    console.log("signied out");
    lo_icon.classList.add("hide");
    location.reload();
}

// login-set 
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
  // User is signed in.
  var user = firebase.auth().currentUser;
  if (user != null) {
    // anchor1.href = "/page-2.html";
    // anchor1.click();
      var email_id = user.email;
      var email_verified = user.emailVerified;
      if (email_verified != true) {
       login_p.style.display="none";
       logout_p.style.display="block";
       mm.style.display="block";
       ff.style.display="block";
       lo_icon.classList.remove("hide");
      //  if(fromid.classList.contains("hide")) fromid.classList.remove("hide");

    //    send_verification();
      }else{
        lo_icon.classList.remove("hide");
        login_p.style.display="none";
        logout_p.style.display="block";
        mm.style.display="block";
        ff.style.display="block";
        // if(fromid.classList.contains("hide")) fromid.classList.remove("hide");
       /*document.getElementById("user_email_show").innerHTML = "Welcome user : " + email_id +
       "</br> Verified : " + email_verified;*/
      }
      
  }
} else {
    login_p.style.display="block";
    logout_p.style.display="none";
    mm.style.display="none";
    ff.style.display="none";
    // if(!fromid.classList.contains("hide")) fromid.classList.add("hide");
  // No user is signed in.

}
});