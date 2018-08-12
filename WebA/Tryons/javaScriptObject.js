//funkcija
//Glol variables
//You can create javascirpt objects using object literals
//Class functions and variables declarations is not 
//valid in others functions and variables of that class
//Try using this keyword. Sometimes works
var htmlConsole = {
    className: "htmlConsole",
    properties: {
        isStatic: true,
        isEncapsulating: false
    },
    //scriptTag: document.getElementsByTagName('script'), 
    //ID: this.scriptTag[this.scriptTag.length - 1].parentNode.id, 
    getID: function () {
        var scriptTag = document.getElementsByTagName('script');
        var ID = scriptTag[scriptTag.length - 1].parentNode.id;
        return ID;
    },
    
    print: function (string) {
        //document.getElementById(this.getID())
        var scriptTag = document.getElementsByTagName('p');
        scriptTag.innerHTML += string;
    },
    printLine: function (string) {
        document.getElementById(this.getID()).innerHTML += "<br>" + string;
    }
};


htmlConsole.print(htmlConsole.className, htmlConsole.getID());
//Module. You cant secretKey variable
var superModule = (function () {
    var secretKey = "supersecretkey";
    var passCode = "nuke";
    function getSecret() {
        htmlConsole.printLine(secretKey);
    }
    function getPassCode() {
        htmlConsole.printLine(passCode);
    }
    return {
        getSecret: getSecret,
        getPassCode: getPassCode,
    };
})();
superModule.getSecret();
superModule.getPassCode();

//Prototype
function Player() { };
Player.prototype.usesBatt = function (){
    return true;     
}
var general = new Player();
htmlConsole.printLine(general.usesBatt());

function Player(name, sport, age, country) {

    this.constructor.noOfPlayers++;

    //Private Properties and Functions 
    //Can only be viewed, edited or invoked by privileged
    var retirementAge = 40;
    var available = true;
    var playerAge = age ? age : 18;
    function isAvailable() {
        return available && (playerAge < retirementAge);
    }
    var playerName = name ? name : "Unknown";
    var playerSport = sport ? sport : "Unknown";

    //Privileged Methods
    //Can be invoked from outside and can access private members
    //Can be replaced with public counterparts

    this.book = function () {
        if (!isAvailable()) {
            this.available = false
        } else {
            console.log("Player is unvailable")
        }
    };
    this.getSport = function () {
        return playerSport;
    }
    this.batPreference = "Lefty"
    this.hasCelebGirlfriend = false;
    this.endorses = "Super Brand";
}
//Public methods can be read and written by anyone
//Can only access public and prototype properties
Player.prototype.switchHands = function () {
    this.batPreference="righty"
}
Player.prototype.dateCeleb = function () {
    this.hasCelebGirlfriend = true
}
Player.prototype.fixEyes = function () { this.wearsGlasses = false; };
//Create new public property
Player.prototype.wearsGlasses = true;
// Static properties anyone can read or write
Player.noOfPlayers = 0;

//New instance of the Player object created
(function PlayerTest() {
    var cricketer = new Player("Vivian", "Cricket", 23, "England");
    var golfer = new Player("Pete", "Golf", 32, "USA");
    htmlConsole.printLine("So far there are" + Player.noOfPlayers + " in the guild ");

    //Both these functions share the common 'Player.prototype.
    //wearsGlasses' variable
    cricketer.fixEyes();
    golfer.fixEyes();

    cricketer.endorses = "Other Brand"; //public variable can be updated
    //Both Player's public method is now changed via thier prototype.fixEyes overwriting
    Player.prototype.fixEyes = function () {
        this.wearsGlasses = true;
    }
    // Only cricketer function is changed
    cricketer.switchHands = function(){
        this.batPreference = "undecided"
    }
})();

// inheritance
function Person() { }
Person.prototype.cry = function () {
    console.log("Crying");
}
function Child() { }
Child.prototype = new Person();
var aChild = new Child();
console.log(aChild instanceof Child); //true
console.log(aChild instanceof Person); //true
console.log(aChild instanceof Object);//true

function Employee() {
    this.name = '';
    this.dept = 'None';
    this.salary = 0.00;
}

function Manager() {
    Employee.call(this);//inistalize member of baseclass
    this.salary = 10000 //baseclass contructor variables
    this.reports = [];
}
Manager.prototype = Object.create(Employee.prototype);//make prototype chain

var karen = new Employee();
htmlConsole.printLine(karen.dept);

var Marius = new Manager();
Marius.salary = 5000;
htmlConsole.printLine(Marius.salary);

function TeamLead() {
    Manager.call(this);
    this.dept = "Software";
    this.salary = 100000;
}
TeamLead.prototype = Object.create(Manager.prototype);

function Engineer() {
    TeamLead.call(this);
    this.dept = "JavaScript";
    this.desktop_id = "8822";
    this.salary = 80000;
}
Engineer.prototype = Object.create(TeamLead.prototype);
//Write new methods to existing types
String.prototype.reverse = function () {
    return Array.prototype.reverse.apply(this.split('')).join('');
};
var str = 'JavaScript';

htmlConsole.printLine(str.reverse());

//Setter and getters 
var person = {
    firstname: "Albert",
    lastname: "Einstein",
    setLastName: function (_lastname) {
        this.lastname = _lastname;
    },
    setFirstName: function (_firstname) {
        this.firstname = _firstname;
    },
    getFullName: function () {
        return this.firstname + ' ' + this.lastname;
    }
};
person.setLastName('Newton');
person.setFirstName('Issac');
console.log(person.getFullName());

// 
function Graph() {
    vertices = [];
    edges = [];
   
}

Graph.prototype = {              // add
    addVertex: function (v) {
        this.vertices.push(v);
    }
};

var g = new Graph();
// g is an object with own properties 'vertices' and 'edges'.
// g.[[Prototype]] is the value of Graph.prototype when new Graph() is executed.
