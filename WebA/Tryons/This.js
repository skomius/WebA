console.log(this) // {}


//Simple Call
function f1() {
    return this;
}

console.log(f1() === global); // true
//--------------------------------------------
// An object can be passed as the first argument to call or apply and this will be bound to it.
var obj = { a: 'Custom' };

// This property is set on the global object
var a = 'Global';

function whatsThis() {
    return this.a;  // The value of this is dependent on how the function is called
}

console.log(whatsThis());          // 'undefine'
console.log(whatsThis.call(obj));  // 'Custom'
console.log(whatsThis.apply(obj)); // 'Custom'

//--------------------------------------------------------
function add(c, d) {
    return this.a + this.b + c + d;
}

var o = { a: 1, b: 3 };

// The first parameter is the object to use as
// 'this', subsequent parameters are passed as 
// arguments in the function call
console.log(add.call(o, 5, 7)); // 16

// The first parameter is the object to use as
// 'this', the second is an array whose
// members are used as the arguments in the function call
console.log(add.apply(o, [10, 20])); // 34

//---------------------------------------------------
//will convert primitive types to objects
function bar() {
    return Object.prototype.toString.call(this);
}

console.log(bar.call(7));     // [object Number]
console.log(bar.call('foo')); // [object String]

//-------------------------------------------

//ECMAScript 5 introduced Function.prototype.bind.Calling f.bind(someObject)
//creates a new function with the same body and scope as f, but where this occurs
//in the original function, in the new function it is permanently bound
//to the first argument of bind, regardless of how the function is being used.

function f() {
    return this.a;
}

var g = f.bind({ a: 'azerty' });
console.log(g()); // azerty

var h = g.bind({ a: 'yoo' }); // bind only works once!
console.log(h()); // azerty

var o = { a: 37, f: f, g: g, h: h };
console.log(o.a, o.f(), o.g(), o.h());// 37,37, azerty, azerty\

//-------------------------------------------------------------------
//No matter what, foo's this is set to what it was when it was created 
//(in the example above, the global object).The same applies to arrow
//functions created inside other functions: their this remains that of
//the enclosing lexical context.

// Create obj with a method bar that returns a function that
// returns its this. The returned function is created as 
// an arrow function, so its this is permanently bound to the
// this of its enclosing function. The value of bar can be set
// in the call, which in turn sets the value of the 
// returned function.
var obj = {
    bar: function () {
        var x = (() => this);
        return x;
    }
};

// Call bar as a method of obj, setting its this to obj
// Assign a reference to the returned function to fn
var fn = obj.bar();

// Call fn without setting this, would normally default
// to the global object or undefined in strict mode
console.log(fn() === obj); // true

// But caution if you reference the method of obj without calling it
var fn2 = obj.bar;
// Then calling the arrow function this is equals to window because it follows the this from bar.
console.log(fn2()() == global); // true

//------------------------------------------------------
//When a function is called as a method of an object,
//its this is set to the object the method is called on.

var o = {
    prop: 37,
    f: function () {
        return this.prop;
    }
};

function independent() {
    return this.prop;
}

console.log(o.f()); // 37

o.b = { g: independent, prop: 42 };
console.log(o.b.g()); // 42

//-----------------------------------------------
//In this example, the object assigned to the variable p doesn't 
//have its own f property, it inherits it from its prototype.
//But it doesn't matter that the lookup for f eventually finds a 
//member with that name on o; the lookup began as a reference to p.f,
//so this inside the function takes the value of the object referred
//to as p.That is, since f is called as a method of p, its this refers
//to p.This is an interesting feature of JavaScript's prototype inheritance.

var o = { f: function () { return this.a + this.b; } };
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5

//------------------------------------------------------------------
//Again, the same notion holds true when a function is invoked from a getter
//or a setter.A function used as getter or setter has its this bound to the
//object from which the property is being set or gotten.

function sum() {
    return this.a + this.b + this.c;
}

var o = {
    a: 1,
    b: 2,
    c: 3,
    get average() {
        return (this.a + this.b + this.c) / 3;
    }
};

Object.defineProperty(o, 'sum', {
    get: sum, enumerable: true, configurable: true
});

console.log(o.average, o.sum); // 2, 6

//-----------------------------------------
// DOM Event 
