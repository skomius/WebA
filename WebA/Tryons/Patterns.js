//The Namespace pattern


function Car() { }
function BMW() { }
var engines = 1;
var features = {
    seats: 6,
    airbags: 6
};
//By convention, the global namespace object name is generally written in all caps

var CARFACTORY = CARFACTORY || {};
CARFACTORY.Car = function () { };
CARFACTORY.BMW = function () { };
CARFACTORY.engines = 1;
CARFACTORY.features = {
    seats: 6,
    airbags: 6
}

//Module pattern
// Single global object. Iskarti vygdoma funkcija tarsi uzkrauna 
var SERVER = SERVER||{};
SERVER.basicServerConfig = (function () {
    var environment = "production";
    startupParams= {
        cacheTimeout: 30,
        locale: "en_US"
    };
    return {
        init: function () {
            console.log( "Initializing the server" );
        },
        updateStartup: function( params ) {
            this.startupParams = params;
            console.log( this.startupParams.cacheTimeout );
            console.log( this.startupParams.locale );
        }
    };
})();
SERVER.basicServerConfig.init(); //"Initializing the server"
SERVER.basicServerConfig.updateStartup({cacheTimeout:60,
    locale: "en_UK"
}); //60, en_UK

//RMP 
var revealingExample = function () {
    var privateOne = 1;
    function privateFn() {
        console.log('privateFn called');
    }
    var publicTwo = 2;
    function publicFn() {
        publicFnTwo();
    }
    function publicFnTwo() {
        privateFn();
    }
    function getCurrentState() {
        return 2;
    }
    // reveal private variables by assigning public pointers
    return {
        setup: publicFn,
        count: publicTwo,
        increaseCount: publicFnTwo,
        current: getCurrentState()
    };
}();
console.log(revealingExample.current); // 2
revealingExample.setup(); //privateFn called

//Factory
// Factory Constructor
function CarFactory() {}
CarFactory.prototype.info = function() {
    console.log("This car has " + this.doors + " doors and a"
        + this.engine_capacity + " liter engine");
};
// the static factory method
CarFactory.make = function (type) {
    var constr = type;
    var car;
    CarFactory[constr].prototype = new CarFactory();
    // create a new instance
    car = new CarFactory[constr]();
    return car;
};
CarFactory.Compact = function () {
    this.doors = 4;
    this.engine_capacity = 2;
};
CarFactory.Sedan = function () {
    this.doors = 2;
    this.engine_capacity = 2;
};
CarFactory.SUV = function () {
    this.doors = 4;
    this.engine_capacity = 6;
};
var golf = CarFactory.make('Compact');
var vento = CarFactory.make('Sedan');
var touareg = CarFactory.make('SUV');
golf.info();
//"This car has 4 doors and a 2 liter engine"
//Decorator partern 

