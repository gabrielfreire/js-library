(function(global) {
    /**
     * Extremely simple and dump mini library for study purposes only
     * Feel free to add features and maybe transform it in something great/useful some day
     */
    "use strict";
    var view = document.querySelector('[libView]') || '';

    //new an Object
    var myLib = function(ar) {
        return new myLib.init(ar);
    }
    var Router = function(routes) {
        this.routes = routes;
    };

    function _navigate(event) {
        var currentPath = global.location.pathname;
        var route = event.target.attributes[0].value;
        console.log(route);
        console.log(currentPath, ' < current Path');
        var routeInfo = router.routes.filter(function(r) {
            return r.path === route;
        })[0];
        console.log(routeInfo);
        if (!routeInfo) {
            window.history.pushState({}, '', '404: error');
            view.innerHTML = 'No route with this path name';
            view.innerHTML += routeInfo.template;
        } else {
            window.history.pushState({}, '', routeInfo.path);
            console.log(window.history);
            view.innerHTML = 'You clicked ' + routeInfo.name + ' route';
            view.innerHTML += routeInfo.template;
        }
    };


    myLib.prototype = {
        /**
         * Method that creates a router
         * @param r: routes array
         * /**
         * Routes structure  
         * [
         *  {
         *     path: '/',
         *     name: 'Home',
         *     template: '<p>Home route</p>'
         *  },
         *  {
         *     path: '/contact',
         *     name: 'Contact',
         *     template: '<p>Home route</p>'
         *  }
         * ]
         */
        router: function(r) {
            //get the current path  global = window
            var currentPath = global.location.pathname;
            //create a new Router object
            global.router = new Router(r);
            //capture all the buttons with route attributes
            var activeRoutes = Array.from(document.querySelectorAll('[route]'));
            //if there are any buttons, add an Event listener to each one of them
            if (activeRoutes.length > 0) {

                activeRoutes.forEach(function(route) {
                    route.addEventListener('click', _navigate, false);
                });

            } else {
                //if not, log for debugging purposes
                myLib.prototype.log('No route attribute found!');

            }
            //If the current path is '/' ... render the Home template
            if (currentPath === '/') {
                //use filter feature to get the current template according to the current path
                var route = router.routes.filter(function(r) {
                    return r.path === currentPath;
                })[0];
                view.innerHTML += route.template;

            } else {
                //Else look for the right path and render the correct template
                var route = router.routes.filter(function(r) {
                    return r.path === currentPath;
                })[0];
                view.innerHTML = '<strong>' + currentPath + ' ' + route + ' route</strong>'
                view.innerHTML += route.template;

            }
        },
        changeBackgroundColor: function(color, el) {
            if (!el) {
                throw 'There is no element selected';
            }
            el.style = 'background-color:' + color;
        },
        /**
         * Map through an array and build an <h3> element for every index
         * @param {array} ar 
         */
        mapToElement: function(ar, element) {
            //If no array is found, throw an error
            if (!ar) {
                throw 'Array does not exist!';
            }
            if (!element) {
                throw 'Element not selected';
            }
            //Traverse array to map
            for (var i = 0; i < ar.length; i++) {
                //check if the actual element is an User object
                if (ar[i] instanceof User)
                //print full name
                    element.innerHTML += '<h3>Hi ' + ar[i].getFullName() + '</h3>';
                else
                //if it isn't an User object, just print the element itself
                    element.innerHTML += '<h3>Hi ' + ar[i] + '</h3>';
            }
        },
        /**
         * Return the maximum value of a given array
         * @param ar : Array Object
         */
        max: function(ar) {
            var max = ar[0];
            //traverse the array to find the maximum value
            for (var i = 0; i < ar.length; i++) {
                //if the index element is not a number, throw an error
                if (typeof ar[i] !== 'number') {
                    throw 'There are non number elements in the array!';
                } else {
                    //check if the maximum value is lower than the actual value
                    if (max < ar[i]) {
                        max = ar[i] //set maximum
                    }
                }
            }
            //get any element with ID #content
            var content = document.getElementById("content");
            //add a representation for the array to the HTML
            content.innerHTML += '<strong>The maximum number from the array: ' + ar + ' is: ' + max + '</strong>'
            return max; // return the value
        },
        /**
         * If an array was set to the object, retrieve it
         */
        getArray: function() {
            //If no array is found, throw an error
            if (!this.ar) {
                throw 'No array was passed to the constructor!';
            }
            return this.ar;
        },
        /**
         * Log a passed array
         */
        log: function(str) {
            var ar = this.ar;
            console.warn('>>');
            if (str) {
                console.log('-> ' + str);
            } else if (ar) {
                for (var i = 0; i < ar.length; i++) {
                    console.log('>> ' + ar[i]);
                }
            } else {
                //If no array or string is found, throw an error
                console.error('No array was passed to the constructor!');
            }
            console.warn('<<');
        }

    };


    //Constructor function for the library
    myLib.init = function(ar) {

        var self = this;
        self.ar = ar || null;

    }

    //Borrowing the myLib prototype for the myLib.init prototype
    myLib.init.prototype = myLib.prototype;
    //Making it global for external use
    global.myLib = global.M$ = myLib;


})(window);