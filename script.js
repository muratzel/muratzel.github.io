Parse.initialize("EJ3swVy8iVnXKAO6XvT2LhGhYJ4BKLjFqRiuuxyX", "U5KZUB7IOm6JTwhdicpaBGxhVRtcJh2lOpHfH519");

var Schedule = Parse.Object.extend("Schedule");

var loginForm = $("#loginForm");
var signupForm = $("#signupForm");
var mainDiv = $("#mainDiv");
var passwordsDontMatchDiv = $('#passwordsDontMatchDiv');
var successfulSigninDiv = $('#successfulSigninDiv');
var usernameExistsDiv = $('#usernameExistsDiv');
var wrongCredentialsDiv = $('#wrongCredentialsDiv');
var noScheduleSelectedDiv = $('#noScheduleSelectedDiv');
var scheduleSelectedDiv = $('#scheduleSelectedDiv');
var scheduleTitleP = $('#scheduleTitleP');
var scheduleDescriptionP = $('#scheduleDescriptionP');

var loginBtn = $('#loginBtn');
var signupBtn = $('#signupBtn');
var createBtn = $('#createBtn');
var backBtn = $('#backBtn');
var continueBtn = $('#continueBtn');
var createScheduleBtn = $('#createScheduleBtn');
var logoutBtn = $('#logoutBtn');

var scheduleList = $('#scheduleList');

function deleteSchedules() {
    var query = new Parse.Query(Schedule);
    query.find(
        {
            success: function (schedules) {
                for (var i = 0; i < schedules.length; i++) {
                    schedules[i].destroy();
                }
            }
        }
    );
}

function displayPage() {
    loginForm.addClass("hidden")
    signupForm.addClass("hidden");
    mainDiv.removeClass("hidden");
    passwordsDontMatchDiv.addClass("hidden");
    usernameExistsDiv.addClass("hidden");
    successfulSigninDiv.addClass("hidden");
}

function displayLoginForm() {
    loginForm.removeClass("hidden");
    signupForm.addClass("hidden");
    mainDiv.addClass("hidden");
    passwordsDontMatchDiv.addClass("hidden");
    usernameExistsDiv.addClass("hidden");
    successfulSigninDiv.addClass("hidden");
}

function displaySignupForm() {
    loginForm.addClass("hidden")
    signupForm.removeClass("hidden");
    mainDiv.addClass("hidden");
    passwordsDontMatchDiv.addClass("hidden");
    usernameExistsDiv.addClass("hidden");
    successfulSigninDiv.addClass("hidden");
}

function displaySuccessfulSignin() {
    loginForm.addClass("hidden")
    signupForm.addClass("hidden");
    mainDiv.addClass("hidden");
    passwordsDontMatchDiv.addClass("hidden");
    usernameExistsDiv.addClass("hidden");
    successfulSigninDiv.removeClass("hidden");
}

function populateScheduleList() {
    var query = new Parse.Query(Schedule);
    query.equalTo("username", Parse.User.current().get("username"));
    query.find(
        {
            success: function (schedules) {
                for (var i = 0; i < schedules.length; i++) {
                    scheduleList.append("<a href='#' id='" + schedules[i].id + "' onclick = 'displaySchedule(`" + schedules[i].id + "`);' class = 'list-group-item'>" + schedules[i].get('title') + "</a>");
                }
            },
            error: function (schedules, error) {

            }
        }
    );
}

function displaySchedule(id) {
    var query = new Parse.Query(Schedule);
    query.get(id,
        {
            success: function (schedule) {
                noScheduleSelectedDiv.addClass("hidden");
                scheduleSelectedDiv.removeClass("hidden");
                scheduleTitleP.html(schedule.get('title'));
                scheduleDescriptionP.html(schedule.get('description'));
            }
        }
    );
}

loginBtn.click(
    function () {
        var username = $("#usernameLogin").val();
        var password = $('#passwordLogin').val();

        Parse.User.logIn(username, password, {
            success: function (user) {
                location.reload();
            },
            error: function(user,error) {
                $('#usernameLogin').addClass('has-error');
                $('#passwordLogin').addClass('has-error');
                wrongCredentialsDiv.removeClass('hidden');
            }
        });
    }
);
signupBtn.click(displaySignupForm);
createBtn.click(
    function () {
        var username = $("#username").val();
        var password = $('#password').val();
        var passwordConfirm = $('#passwordConfirm').val();
        var email = $('#email').val();

        if (password.localeCompare(passwordConfirm)) {
            $('#passwordConfirmDiv').addClass('has-error');
            passwordsDontMatchDiv.removeClass('hidden');
            return;
        }
        else {
            var newUser = new Parse.User();
            newUser.set("username", username);
            newUser.set("password", password);
            newUser.set("email", email);
            newUser.signUp(null, {
                success: function (user) {
                    displaySuccessfulSignin();
                },
                error: function (user, error) {
                    if (error.code == 202) {
                        $('#username').addClass('has-error');
                        usernameExistsDiv.removeClass('hidden');
                    }
                }
            });
            return;
        }

    }
);
backBtn.click(function () {
    location.reload();
});
continueBtn.click(function () {
    location.reload();
});
createScheduleBtn.click(
    function () {
        var newSchedule = new Schedule();
        newSchedule.set("username", Parse.User.current().get("username"));
        newSchedule.set("title",$("#scheduleTitle").val());
        newSchedule.set("description", $("#scheduleDescription").val());
        newSchedule.save(null,
        {
            success: function (schedule) {
                scheduleList.append("<a href='#' id='" + newSchedule.id + "' onclick = 'displaySchedule(`" + newSchedule.id + "`);' class = 'list-group-item'>" + schedule.get('title') + "</a>");
            },
            error: function (schedule, error) {

            }
        }
        );
    }
);
logoutBtn.click(
    function () {
        Parse.User.logOut();
        location.reload();
    }
);

var currentUser = Parse.User.current();

if (currentUser) {
    displayPage();
    populateScheduleList();
}
else {
    displayLoginForm();
}




