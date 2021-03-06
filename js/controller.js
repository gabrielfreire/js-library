/**
 * In this file i use my library to test its features
 */
var User = require('./User.js'),
    users = [],
    user = new User("Bob", "Marley"),
    user2 = new User("Maria", 'Jose'),
    user3 = new User("John", "McCartney"),
    user4 = new User("Claire", "Murray"),
    content = document.getElementById("content"),
    m = ml();

users.push(user);
users.push(user2);
users.push(user3);
users.push(user4);

console.log(m);
//testing max method
var maxValue = m.max([9, 1, 3, 4, 2, 1, 320, 45, 31, 123, 5, 12332, 12, 32, 156, 776, 4])
console.log(maxValue);
//testing mapToElement
m.mapToElement(users, content);
//testing log
for (var i = 0; i < users.length; i++) {
    m.log(users[i].getFullName());
}
m.log();
//Testing routes
m.router([{
        path: '/',
        name: 'Home',
        templateUrl: '../partials/home.html'
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
//Data Binding object
var values = {
    name: 'Gabriel',
    age: 27,
    surname: 'Freire'
}

m.bind(values);