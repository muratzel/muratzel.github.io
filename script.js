Parse.initialize("EJ3swVy8iVnXKAO6XvT2LhGhYJ4BKLjFqRiuuxyX", "U5KZUB7IOm6JTwhdicpaBGxhVRtcJh2lOpHfH519");

var User = Parse.Object.Extend("User",{
    
    initialize: function(attrs,options,username,password){
        this.username = username;
        this.password = password;
    },
    
    verifyPassword: function(password){
        return this.password = password;
    }
});

var admin = new User('muratzel','muradvlad16');
alert(admin.get('username'));
alert(admin.get('muradvlad16'));



