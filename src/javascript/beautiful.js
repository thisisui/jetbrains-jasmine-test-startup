/*
 * Just write your beautiful JavaScript here
 */
var Beautiful = (function () {
    'use strict';

    return function () {
        this.sayHello = function (name) {
            return 'Hello ' + name;
        };

        this.init =  function () {
            return this;
        };
    };

}());
