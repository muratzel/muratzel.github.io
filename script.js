Parse.initialize("EJ3swVy8iVnXKAO6XvT2LhGhYJ4BKLjFqRiuuxyX", "U5KZUB7IOm6JTwhdicpaBGxhVRtcJh2lOpHfH519");

var loginForm = $("#loginForm");
var signupForm = $("#signupForm");
var mainPageDiv = $("#mainPageDiv");

function displayMainPage() {
    loginForm.addClass("hidden");
    signupForm.addClass("hidden");
    mainPageDiv.removeClass("hidden");
}
function displayLoginForm() {
    loginForm.removeClass("hidden");
    signupForm.addClass("hidden");
    mainPageDiv.addClass("hidden");
}
function displaySignupForm() {
    loginForm.addClass("hidden");
    signupForm.removeClass("hidden");
    mainPageDiv.addClass("hidden");
}

var currentUser = Parse.User.current();

if (currentUser) {
    displayMainPage();
}
else {
    displayLoginForm();
}





