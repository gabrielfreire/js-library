/**
 * Extremely simple and dump mini library for study purposes only
 * Feel free to add features and maybe transform it in something great/useful some day
 */
(function(global) {
    "use strict";
    //new an Object
    var myLib = function(ar) {
        return new myLib.init(ar);
    }

    myLib.prototype = {
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