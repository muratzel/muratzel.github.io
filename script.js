Parse.initialize("EJ3swVy8iVnXKAO6XvT2LhGhYJ4BKLjFqRiuuxyX", "U5KZUB7IOm6JTwhdicpaBGxhVRtcJh2lOpHfH519");

//form handles
var loginForm = $("#loginForm");
var signupForm = $("#signupForm");

//divs handles
var mainPageDiv = $("#mainPageDiv");

//button handles
var loginButton = $('#loginButton');
var newAccountButton = $('#newAccountButton');
var signupButton = $('#signupButton');
var backButton = $('#backButton');

//display functions
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

//button functions
newAccountButton.click(displaySignupForm);
backButton.click(function () {
    location.reload();
});

var currentUser = Parse.User.current();

if (currentUser) {
    displayMainPage();
}
else {
    displayLoginForm();
}





