Parse.initialize("EJ3swVy8iVnXKAO6XvT2LhGhYJ4BKLjFqRiuuxyX", "U5KZUB7IOm6JTwhdicpaBGxhVRtcJh2lOpHfH519");

var Monster = Parse.Object.extend("Monster", {
    // Instance methods
    hasSuperHumanStrength: function () {
        return this.get("strength") > 18;
    },
    // Instance properties go in an initialize method
    initialize: function (attrs, options) {
        this.sound = "Rawr"
    }
}, {
    // Class methods
    spawn: function (strength) {
        var monster = new Monster();
        monster.set("strength", strength);
        return monster;
    }
});

var User = Parse.Object.extend("User", {

    initialize: function (username, password) {
        this.username = username
        this.password = password
    },

    checkPassword: function (password) {
        return this.password = password;
    }
});

var admin = new User('admin','vladmurad16');
alert(admin.username);
alert(admin.password);



