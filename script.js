Parse.initialize("EJ3swVy8iVnXKAO6XvT2LhGhYJ4BKLjFqRiuuxyX", "U5KZUB7IOm6JTwhdicpaBGxhVRtcJh2lOpHfH519");

//parse objects
var Tutorial = Parse.Object.extend("Tutorial");
var Bonus = Parse.Object.extend("Bonus");

//form handles
var loginForm = $("#loginForm");
var signupForm = $("#signupForm");

//divs handles
var mainPageDiv = $("#mainPageDiv");
var tagListDiv = $('#tagListDiv');

//lists handles
var mainPageTutorialsDisplayUl = $('#mainPageTutorialsDisplayUl');
var mainPageMyTutorialsDisplayUl = $('#mainPageMyTutorialsDisplayUl');

//modal handles
var tutorialTitleInput = $('#tutorialTitleInput');
var tutorialDescriptionTextarea = $('#tutorialDescriptionTextarea');
var tutorialLinkInput = $('#tutorialLinkInput');
var tagListDiv = $('#tagListDiv');
var addTagInput = $('#addTagInput');
var tutorialTitleModalP = $('#tutorialTitleModalP');
var tutorialTypeModalP = $('#tutorialTypeModalP');
var tutorialDescriptionModalP = $('#tutorialDescriptionModalP');
var tutorialLinkModalP = $('#tutorialLinkModalP');
var tutorialTagsModalDiv = $('#tutorialTagsModalDiv');
var tutorialRatingModalP = $('#tutorialRatingModalP');
var tutorialVotesModalP = $('#tutorialVotesModalP');
var ratingModalSpan = $('#ratingModalSpan');
var tutorialAlreadyVotedModalP = $('#tutorialAlreadyVotedModalP');
var voteModalButton = $('#voteModalButton');
var removeFromMyTutorialsModalButton = $('#removeFromMyTutorialsModalButton');
var tutorialIdModalInput = $('#tutorialIdModalInput');
var rating1 = $('#rating1');
var rating2 = $('#rating2');
var rating3 = $('#rating3');
var rating4 = $('#rating4');
var rating5 = $('#rating5');

//button handles
var loginButton = $('#loginButton');
var newAccountButton = $('#newAccountButton');

var signupButton = $('#signupButton');
var backButton = $('#backButton');

var addTagButton = $('#addTagButton');
var addTutorialButton = $('#addTutorialButton');
var closeAddTutorialModalButton = $('#closeAddTutorialModalButton');
var logoutButton = $('#logoutButton');
var searchButton = $('#searchButton');

//display functions
function displayMainPage() {
    loginForm.addClass("hidden");
    signupForm.addClass("hidden");
    mainPageDiv.removeClass("hidden");
    populateWithTutorials(1);
    populateWithMyTutorials();
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

//populate/depopulate stuff
function populateWithTutorials(startPage) {

        mainPageTutorialsDisplayUl.empty();
        
        if ($('#searchInput').val()) {
            var keywords = $('#searchInput').val().split(" ");
        }
        else {
            var keywords = [];
        }

        var writtenTutorial = $('#writtenTutorialCheckbox').is(':checked');
        var videoTutorial = $('#videoTutorialCheckbox').is(':checked');
        var researchPaper = $('#researchPaperCheckbox').is(':checked');
        var universityCourse = $('#universityCourseCheckbox').is(':checked');

        var sortBy = $('#sortBySelect').val();
        var types = [];

        if (!writtenTutorial && !videoTutorial && !researchPaper && !universityCourse) {
            types = ["Written Tutorial", "Video Tutorial", "Research Paper", "University Course"];
        }
        else {
            if (writtenTutorial)
                types.push("Written Tutorial");
            if (videoTutorial)
                types.push("Video Tutorial");
            if (researchPaper)
                types.push("Research Paper");
            if (universityCourse)
                types.push("University Course");
        }

        var query = new Parse.Query(Tutorial);
        query.containedIn("type", types);
        if(sortBy==0){
            query.descending("rating");
        }
        else{
            query.descending("votes");
        }
        query.find(
            {
                success: function (tutorials) {

                    var i = 0;
                    var numTutorials = 0;

                    while(i<tutorials.length) {

                        var score = 0;
                        var tutorialTitle = tutorials[i].get("title");
                        var tutorialDescription = tutorials[i].get("description");
                        var tutorialTags = tutorials[i].get("tags");

                        for (var j = 0; j < keywords.length; j++) {
                            if (tutorialTitle.indexOf(keywords[j]) >= 0) {
                                score = 1;
                            }
                            if (tutorialDescription.indexOf(keywords[j]) >= 0) {
                                score = 1;
                            }
                            if ($.inArray(keywords[j], tutorialTags) >= 0) {
                                score = 1;
                            }
                        }
                        if (score != 0 || keywords.length == 0) {
                            if (numTutorials >= (startPage - 1) * 10 && numTutorials < startPage * 10)
                                mainPageTutorialsDisplayUl.append("<div class='row list-group-item' onclick = 'populateModal(this);' id='" + tutorials[i].id + "'><h4 class='col-md-12'>" + tutorials[i].get('title') + "</h4><h4 class='col-md-12'><small>" + tutorials[i].get('rating') + " (from " + tutorials[i].get('votes') + ")</small></h4></div>");
                            numTutorials = numTutorials + 1;                      
                        }
                        i = i + 1;
                    }

                    var pageUl = $('#pageUl');
                    pageUl.empty();
                    if (startPage <= 6)
                        start = 1;
                    else
                        start = start - 5;
                    for (var i = start; i <= start + 9; i++) {
                        if (numTutorials+10<i*10)
                            pageUl.append('<li class = "disabled"><a href="#">' + i + '</a></li>');
                        else
                            pageUl.append('<li><a href="#" onclick=populateWithTutorials(' + i + ')>' + i + '</a></li>');
                    }
                },
                error: function (tutorials, error) {

                }
            }
        );

}
function populateWithMyTutorials() {

    mainPageMyTutorialsDisplayUl.empty();

    var query = new Parse.Query(Tutorial);
    var currentUser = Parse.User.current();
    var my_tutorials = currentUser.get('my_tutorials');

    query.descending("createdAt");
    query.containedIn("objectId", my_tutorials);
    mainPageMyTutorialsDisplayUl.append("<div class='row list-group-item'><h2 class='col-md-12'><b>My Tutorials</b></h2></div>");

    query.find(
        {
            success: function (tutorials) {
                for (var i = 0; i < tutorials.length; i++) {
                    mainPageMyTutorialsDisplayUl.append("<div class='row list-group-item' onclick = 'populateModal(this);' id='" + tutorials[i].id + "'><h4 class='col-md-12'>" + tutorials[i].get('title') + "</h4></div>");
                }
                $('#activeButton').val('0');
            },
            error: function (tutorials, error) {

            }
        }
    );
}

function populateWithViewedTutorials() {

    mainPageMyTutorialsDisplayUl.empty();

    var query = new Parse.Query(Tutorial);
    var currentUser = Parse.User.current();
    var viewed_tutorials = currentUser.get('viewed_tutorials');

    query.descending("createdAt");
    query.containedIn("objectId", 'viewed_tutorials');
    mainPageMyTutorialsDisplayUl.append("<div class='row list-group-item'><h2 class='col-md-12'><b>Viewed Tutorials</b></h2></div>");

    query.find(
        {
            success: function (tutorials) {
                for (var i = 0; i < tutorials.length; i++) {
                    mainPageMyTutorialsDisplayUl.append("<div class='row list-group-item' onclick = 'populateModal(this);' id='" + tutorials[i].id + "'><h4 class='col-md-12'>" + tutorials[i].get('title') + "</h4></div>");
                }
                $('#activeButton').val('1');
            },
            error: function (tutorials, error) {

            }
        }
    );
}
function populateModal(tutorial) {

    var currentUser = Parse.User.current();
    var clicks_left = currentUser.get("clicks_left");

    if (clicks_left <= 0) {
        return;
    }

    var tutorials_viewed = currentUser.get('tutorials_viewed');
    var my_tutorials = currentUser.get('my_tutorials');

    if ($.inArray($(tutorial).attr("id"), tutorials_viewed) < 0) {
        currentUser.set("clicks_left", currentUser.get("clicks_left") - 1);
        tutorials_viewed.push($(tutorial).attr("id"));
        currentUser.set("tutorials_viewed", tutorials_viewed);
        my_tutorials.push($(tutorial).attr("id"));
        currentUser.set("my_tutorials", my_tutorials);
    }

    currentUser.save(null, {
        success: function (user) {
            updateClicksLeft();
            if ($("#active_button").val('').localeCompare('0'))
                populateWithMyTutorials();
            else
                populateWithViewedTutorials();
        },
        error: function (user, error) {
        }
    });

    var query = new Parse.Query(Tutorial);
    query.get($(tutorial).attr("id"),
        {
            success: function (tutorial) {
                tutorialTitleModalP.html(tutorial.get('title'));
                tutorialTypeModalP.html(tutorial.get('type'));
                tutorialDescriptionModalP.html(tutorial.get('description'));
                tutorialLinkModalP.html(tutorial.get('link'));
                tutorialLinkModalP.attr("href",tutorial.get('link'));
                var tags = tutorial.get('tags');
                for (var i = 0; i < tags.length ; i++) {
                    tutorialTagsModalDiv.append("<span class='label label-primary col-md-2'>" + tags[i] + "</span>");
                }
                tutorialRatingModalP.html(tutorial.get('rating'));
                tutorialVotesModalP.html(tutorial.get('votes'));
                if ($.inArray($(tutorial).attr("id"), currentUser.get('tutorials_voted'))<0) {
                    ratingModalSpan.removeClass("hidden");
                    tutorialAlreadyVotedModalP.addClass("hidden");
                }
                else {
                    ratingModalSpan.addClass("hidden");
                    tutorialAlreadyVotedModalP.removeClass("hidden");
                }
                if ($.inArray($(tutorial).attr("id"), currentUser.get('my_tutorials')) < 0) {
                    removeFromMyTutorialsModalButton.addClass("hidden");
                }
                else {
                    removeFromMyTutorialsModalButton.removeClass("hidden");
                }
                tutorialIdModalInput.val(tutorial.id);
                voteModalButton.addClass("hidden");
                $('#showTutorialModal').modal('toggle');
                $('#showTutorialModal').modal('show');
            },
            error: function (tutorial, error) {

            }
        }
    );
}
function removeTag(tag) {
    $(tag).parent().remove();
}
function updateClicksLeft() {
    var currentUser = Parse.User.current();
    var query = new Parse.Query(Bonus);
    query.equalTo("username", currentUser.get("username"));
    query.find({
            success: function (bonuses) {
                currentUser.set("clicks_left", bonuses.length * 3 + currentUser.get('clicks_left'));
                currentUser.save();
                for (var i = 0; i < bonuses.length; i++) {
                    bonuses[i].destroy();
                    bonuses[i].save();
                }
            },
            error: function (bonuses, error) {

            }
    });
    $('#clicksLeftP').html(currentUser.get("clicks_left"));
}

function clearAddTutorialModal() {
    tutorialTitleInput.val('');
    tutorialDescriptionTextarea.val('');
    tutorialLinkInput.val('');
    tagListDiv.empty();
    addTagInput.val('');
}

function clearShowTutorialModal() {
    tutorialTitleModalP.val('');
    tutorialTypeModalP.val('');
    tutorialDescriptionModalP.val('');
    tutorialLinkModalP.val('');
    tutorialLinkModalP.attr('href','');
    tutorialTagsModalDiv.empty();
    tutorialRatingModalP.val('');
    tutorialVotesModalP.val('');
}

//button functions
loginButton.click(
    function () {
        var username = $("#usernameLoginInput").val();
        var password = $("#passwordLoginInput").val();

        Parse.User.logIn(username, password, {
            success: function (user) {
                location.reload();
            },
            error: function (user, error) {
                $('#usernameLoginInputDiv').addClass('has-error');
                $('#passwordLoginInputDiv').addClass('has-error');
            }
        });
    }
);
newAccountButton.click(displaySignupForm);
signupButton.click(
    function () {
        var username = $("#usernameSignupInput").val();
        var password = $("#passwordSignupInput").val();
        var passwordConfirm = $('#passwordConfirmInput').val();
        var email = $('#emailInput').val();

        if (password.localeCompare(passwordConfirm)) {
            $('#passwordConfirmInputDiv').addClass('has-error');
        }
        else {
            var newUser = new Parse.User();

            newUser.set("username", username);
            newUser.set("password", password);
            newUser.set("email", email);
            newUser.set("tutorials_voted", []);
            newUser.set("tutorials_viewed", []);
            newUser.set("my_tutorials", []);
            newUser.set("clicks_left", 15);

            newUser.signUp(null, {
                success: function (user) {
                    location.reload();
                },
                error: function (user, error) {
                }
            });
        }

    }
);
backButton.click(function () {
    location.reload();
});
addTagButton.click(function () {
    tagListDiv.append("<span class='label label-primary col-md-2'>" + $('#addTagInput').val() + "<button type='button' class='close' onclick = 'removeTag(this);'>&times;</button></span>");
    $('#addTagInput').val('');
})
addTutorialButton.click(function () {

    var newTutorial = new Tutorial();

    newTutorial.set("type",$('#tutorialTypeSelect').val());
    newTutorial.set("title", $('#tutorialTitleInput').val());
    newTutorial.set("description", $('#tutorialDescriptionTextarea').val());
    newTutorial.set("link", $('#tutorialLinkInput').val());
    newTutorial.set("poster", Parse.User.current().get("username"));
    newTutorial.set("rating", 0);
    newTutorial.set("votes", 0);

    var tags = [];
    $('#tagListDiv').children().each(function () {
        tags.push($(this).text().slice(0,-1));
    });
    newTutorial.set("tags", tags);

    newTutorial.save(null,
        {
            success: function (tutorial) {
                populateWithTutorials(1);
                var currentUser = Parse.User.current();
                currentUser.set("clicks_left", currentUser.get("clicks_left") + 10);
                currentUser.save();

                updateClicksLeft();
                clearAddTutorialModal();
            },
            error: function (tutorial, error) {
            }
        }
    );

});
logoutButton.click(
    function () {
        Parse.User.logOut();
        location.reload();
    }
);
ratingModalSpan.click(
    function (event) {
        voteModalButton.removeClass("hidden");
        if (!$(event.target).attr('id').localeCompare('rating1')) {
            rating1.html('1');
            rating2.html('0');
            rating3.html('0');
            rating4.html('0');
            rating5.html('0');
        }
        else if (!$(event.target).attr('id').localeCompare('rating2')){
            rating1.html('0');
            rating2.html('1');
            rating3.html('0');
            rating4.html('0');
            rating5.html('0');
        }
        else if (!$(event.target).attr('id').localeCompare('rating3')){
            rating1.html('0');
            rating2.html('0');
            rating3.html('1');
            rating4.html('0');
            rating5.html('0');
        }
        else if (!$(event.target).attr('id').localeCompare('rating4')){
            rating1.html('0');
            rating2.html('0');
            rating3.html('0');
            rating4.html('1');
            rating5.html('0');
        }
        else if (!$(event.target).attr('id').localeCompare('rating5')) {
            rating1.html('0');
            rating2.html('0');
            rating3.html('0');
            rating4.html('0');
            rating5.html('1');
        }
    }
);

removeFromMyTutorialsModalButton.click( function(){
    
        var query = new Parse.Query(Tutorial);
        query.get(tutorialIdModalInput.attr("value"),
        {
            success: function (tutorial) {

                var currentUser = Parse.User.current();
                var my_tutorials = currentUser.get("my_tutorials");
                my_tutorials.splice($.inArray(tutorialIdModalInput.attr("value"), my_tutorials),1);
                currentUser.set("my_tutorials", my_tutorials);
                currentUser.save();
                if ($("#active_button").val('').localeCompare('0'))
                    populateWithMyTutorials();
                else
                    populateWithViewedTutorials();

            },
            error: function (tutorial, error) {

            }
        });
    }
);


voteModalButton.click(
       function () {
           var rating = 0;
           if (!rating1.html().localeCompare('1')) {
               rating = 1
           }
           else if (!rating2.html().localeCompare('1')) {
               rating = 2;
           }
           else if (!rating3.html().localeCompare('1')) {
               rating = 3;
           }
           else if (!rating4.html().localeCompare('1')) {
               rating = 4;
           }
           else if (!rating5.html().localeCompare('1')) {
               rating = 5;
           }

           var query = new Parse.Query(Tutorial);
           query.get(tutorialIdModalInput.attr("value"),
           {
               success: function (tutorial) {
                   tutorial.set('rating', (tutorial.get('rating') * tutorial.get('votes') + rating) / (tutorial.get('votes') + 1));
                   tutorial.set('votes', tutorial.get('votes') + 1);
                   tutorial.save();

                   var currentUser = Parse.User.current();
                   var tutorials_voted = currentUser.get("tutorials_voted");
                   tutorials_voted.push(tutorialIdModalInput.attr("value"));
                   currentUser.set("tutorials_voted", tutorials_voted);
                   currentUser.save();

                   if (rating >= 3) {

                       var newBonus = new Bonus();
                       newBonus.set("username", tutorial.get("poster"));
                       newBonus.save();

                   }

               },
               error: function (tutorial, error) {

               }
           });
       }
 );

//utility functions
function deleteTutorials(){
    var query = new Parse.Query(Tutorial);
    query.find(
        {
            success: function(tutorials) {
                for (var i = 0; i < tutorials.length; i++) {
                    tutorials[i].destroy();
                    tutorials[i].save();
                }
            },
            error: function (tutorials, error) {

            }
        }
    );
}
function deleteUsers() {
    var query = new Parse.Query(Parse.User);
    query.find(
        {
            success: function (users) {
                for (var i = 0; i < users.length; i++) {
                    users[i].destroy();
                    users[i].save();
                }
            },
            error: function (users, error) {

            }
        }
    );
}

var currentUser = Parse.User.current();

if (currentUser) {
     displayMainPage();
     updateClicksLeft();
}
else {
     displayLoginForm();
}


