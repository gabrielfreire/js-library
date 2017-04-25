(function(global) {
    /**
     * Extremely simple and dump mini library for study purposes only
     * Feel free to add features and maybe transform it in something great/useful some day
     */
    "use strict";
    //Global variable declarations
    //---------------------------
    //Default view for the router feature
    var view = document.querySelector('[lib-view]') || '',
        binders = Array.from(document.querySelectorAll('[lib-bind]')),
        //new an Object
        myLib = function(ar) { return new myLib.init(ar); },
        Router = function(routes) { this.routes = routes; };

    //---------------------------
    //General METHODS
    //---------------------------
    //This method will change the browse location path to match with the attribute value of the button
    function _navigate(event) {
        console.log(event.target.attributes);
        //get the current path  global = window
        var currentPath = global.location.pathname,
            //get the attribute value of the current button
            route = event.target.attributes['lib-route'].value,
            //compare it with the array of routes to find
            routeInfo = router.routes.filter(function(r) {
                return r.path === route;
            })[0];

        //if no route was found, 404 page
        if (!routeInfo) {

            window.history.pushState({}, '', '404');
            view.innerHTML = 'No route with this path name';
            view.innerHTML += routeInfo.template;

        } else {
            //else, push state to the browser and render the right template
            window.history.pushState({}, '', routeInfo.path);
            view.innerHTML = 'You clicked ' + routeInfo.name + ' route';
            view.innerHTML += routeInfo.template;

        }
    };
    //this method receives a path and match with the routes array
    function _matchWithPath(currentPath) {
        var route = router.routes.filter(function(r) { return r.path === currentPath; })[0];
        return route;
    }
    //this method will return true if the content in HTML is a string interpolation binder 
    function _isBinder(content) {
        return content.indexOf('{') > -1 && content.lastIndexOf('}') > -1;
    }
    //------------------------

    myLib.prototype = {
        /**
         * Data bind feature: receives an object from the controller and sync its properties with the bind elements
         */
        bind: function(values) {
            for (var properties in values) {
                for (var i = 0; i < binders.length; i++) {
                    var binderValue = _isBinder(binders[i].textContent) ? binders[i].textContent.slice(1, binders[i].textContent.lastIndexOf('}')) : null;
                    if (properties === binderValue) {
                        binders[i].textContent = values[properties];
                    }
                }
            }
        },
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
            var currentPath = global.location.pathname,
                //capture all the buttons with route attributes
                activeRoutes = Array.from(document.querySelectorAll('[lib-route]'));
            //create a new Router object
            global.router = new Router(r);
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
                var route = _matchWithPath(currentPath);
                view.innerHTML += route.template;

            } else {
                //Else look for the right path and render the correct template
                var route = _matchWithPath(currentPath);
                view.innerHTML = '<strong>' + currentPath + ' ' + route.name + ' route</strong>'
                view.innerHTML += route.template;

            }
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
            var max = ar[0],
                //get any element with ID #content
                content = document.getElementById("content");
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
    global.myLib = global.ml = myLib;


})(window);