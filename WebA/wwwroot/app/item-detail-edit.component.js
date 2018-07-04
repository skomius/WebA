System.register(["@angular/core", "@angular/router", "./item.service", "./item"], function (exports_1, context_1) {
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
    var core_1, router_1, item_service_1, item_1, ItemDetailEditComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            }
        ],
        execute: function () {
            ItemDetailEditComponent = class ItemDetailEditComponent {
                constructor(itemService, router, activatedRoute) {
                    this.itemService = itemService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                }
                ngOnInit() {
                    var id = +this.activatedRoute.snapshot.params["id"];
                    if (id) {
                        this.itemService.get(id).subscribe(item => this.item = item);
                    }
                    else if (id === 0) {
                        console.log("id is 0: adding a new item...");
                        this.item = new item_1.Item(0, "New Item", null);
                    }
                    else {
                        console.log("Invalid id: routing back to home...");
                        this.router.navigate([""]);
                    }
                }
                onInsert(item) {
                    this.itemService.add(item).subscribe((data) => {
                        this.item = data;
                        console.log("Item " + this.item.Id + " has been added.");
                        this.router.navigate([""]);
                    }, (error) => console.log(error));
                }
                onBack() {
                    this.router.navigate([""]);
                }
                onItemDetailView(item) {
                    this.router.navigate(["item/view", item.Id]);
                }
                onUpdate(item) {
                    this.itemService.update(item).subscribe((data) => {
                        this.item = data;
                        console.log("Item " + this.item.Id + " has been updated");
                        this.router.navigate(["item/view", this.item.Id]);
                    }, (bad) => console.log(bad));
                }
                onDelete(item) {
                    var id = item.Id;
                    this.itemService.delete(id).subscribe(() => {
                        console.log("Item " + this.item.Id + " has been deleted");
                        this.router.navigate([""]);
                    }, (bad) => console.log(bad));
                }
            };
            ItemDetailEditComponent = __decorate([
                core_1.Component({
                    selector: "item-detail-edit",
                    templateUrl: "app/item-detail-edit.component.html",
                    styleUrls: ["app/item-detail-edit.component.css"]
                }),
                __metadata("design:paramtypes", [item_service_1.ItemService,
                    router_1.Router,
                    router_1.ActivatedRoute])
            ], ItemDetailEditComponent);
            exports_1("ItemDetailEditComponent", ItemDetailEditComponent);
        }
    };
});

//# sourceMappingURL=item-detail-edit.component.js.map
