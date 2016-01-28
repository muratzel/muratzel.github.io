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

    initialize: function (attrs, options) {
        this.username = attrs
        this.password = "vladmurad16"
    },

    checkPassword: function (password) {
        return this.password = password;
    }
});

var admin = new User('vlad');
alert(admin.username);



