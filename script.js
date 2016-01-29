Parse.initialize("EJ3swVy8iVnXKAO6XvT2LhGhYJ4BKLjFqRiuuxyX", "U5KZUB7IOm6JTwhdicpaBGxhVRtcJh2lOpHfH519");


var loginForm = document.getElementById("loginForm");
var signupForm = document.getElementById("signupForm");
var mainDiv = document.getElementById("mainDiv");

var currentUser = new Parse.User.current();

if (currentUser) {
    loginForm.style.display = "none";
    signupForm.style.display = "none";
    mainDiv.style.display = "initial";
}
else {
    loginForm.style.display = "initial";
    signupForm.style.display = "none";
    mainDiv.style.display = "none";
}


