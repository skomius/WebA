System.register(["@angular/core", "./post.service", "rxjs/Observable", "./object"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, post_service_1, Observable_1, object_1, FavouritesComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (post_service_1_1) {
                post_service_1 = post_service_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (object_1_1) {
                object_1 = object_1_1;
            }
        ],
        execute: function () {
            FavouritesComponent = class FavouritesComponent {
                constructor(service) {
                    this.service = service;
                    this.Title = "Favourites";
                }
                ngOnInit() {
                    this.getP();
                    this.car = new object_1.Car("V8");
                    this.sb = Observable_1.Observable.timer(5000, 5000).subscribe(() => this.getP());
                }
                ngOnDestroy() {
                    this.sb.unsubscribe();
                }
                getP() {
                    this.service.getPost().subscribe(item => {
                        this.item = item;
                    }, error => this.errorMessage = error);
                }
                letP() {
                }
            };
            FavouritesComponent = __decorate([
                core_1.Component({
                    selector: "favourites",
                    template: `
<p *ngIf="item">
<span>{{item.Title}}</span>
</p>`,
                    styles: []
                }),
                __metadata("design:paramtypes", [post_service_1.PostService])
            ], FavouritesComponent);
            exports_1("FavouritesComponent", FavouritesComponent);
        }
    };
});

//# sourceMappingURL=favourites.component.js.map
