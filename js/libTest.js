/**
 * In this file i use my library to test its features
 */
var users = [];
var user = new User("Bob", "Marley");
var user2 = new User("Maria", 'Jose');
var user3 = new User("John", "McCartney");
var user4 = new User("Claire", "Murray");
users.push(user);
users.push(user2);
users.push(user3);
users.push(user4);
var content = document.getElementById("content");
console.log(user.getFirstName());
console.log(user.getLastName());
console.log(user.getFullName());

var m = M$();
console.log(m);
console.log(m.max([9, 1, 3, 4, 2, 1, 320, 45, 31, 123, 5, 12332, 12, 32, 156, 776, 4]));
m.mapToElement(users, content);
for (var i = 0; i < users.length; i++) {
    m.log(users[i].getFullName());
}
m.log();
m.changeBackgroundColor('red', content);
//Generate routes
m.router([{
        path: '/',
        name: 'Home',
        template: '<h1>This is the Home Page</h1>'
    },
    {
        path: '/about',
        name: 'About',
        template: '<h1>This is the About Page</h1>'
    },
    {
        path: '/contact',
        name: 'Contact',
        template: '<h1>This is the Contact Page</h1>'
    }
]);