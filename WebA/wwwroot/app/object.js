System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Car;
    return {
        setters: [],
        execute: function () {
            Car = class Car {
                constructor(engine) {
                    this.engine = engine;
                }
                func() {
                    return "ratai";
                }
                disp() {
                    console.log("Engine is : " + this.engine);
                }
            };
            exports_1("Car", Car);
        }
    };
});

//# sourceMappingURL=object.js.map
