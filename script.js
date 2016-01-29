Parse.initialize("EJ3swVy8iVnXKAO6XvT2LhGhYJ4BKLjFqRiuuxyX", "U5KZUB7IOm6JTwhdicpaBGxhVRtcJh2lOpHfH519");


var loginForm = $("#loginForm");
var signupForm = $("#signupForm");
var mainDiv = $("#mainDiv");

var loginBtn = $('#loginBtn');
var signupBtn = $('#signupBtn');
var createBtn = $('#createBtn');
var backBtn = $('#backBtn');

function displayPage() {
    loginForm.addClass("hidden")
    signupForm.addClass("hidden");
    mainDiv.removeClass("hidden");
}

function displayLoginForm() {
    loginForm.removeClass("hidden");
    signupForm.addClass("hidden");
    mainDiv.addClass("hidden");
}

function displaySignupForm() {
    loginForm.addClass("hidden")
    signupForm.removeClass("hidden");
    mainDiv.addClass("hidden");
}

loginBtn.click(displayPage);
signupBtn.click(displaySignupForm);
createBtn.click(
    function () {
        var username = $("#username").value;
        alert(username);
    }
);
backBtn.click(displayLoginForm);

var currentUser = Parse.User.current();

if (currentUser) {
    displayPage();
}
else {
    displayLoginForm();
}




