Parse.initialize("EJ3swVy8iVnXKAO6XvT2LhGhYJ4BKLjFqRiuuxyX", "U5KZUB7IOm6JTwhdicpaBGxhVRtcJh2lOpHfH519");

var loginForm = document.getElementById("loginForm");
var signupForm = document.getElementById("signupForm");
var mainDiv = document.getElementById("loginForm");

var currentUser = Parse.User.current();

if (currentUser) {
    loginForm.style.visibility = "hidden";
    signupForm.style.visibility = "hidden";
    mainDiv.style.visibility = "visible";
}
else {
    loginForm.style.visibility = "visible";
    signupForm.style.visibility = "hidden";
    mainDiv.style.visibility = "hidden";
}


