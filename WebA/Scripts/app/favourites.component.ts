import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "./post.service";
import { Item } from "./item"
import { Observable } from "rxjs/Observable";
import { forEach } from "@angular/router/src/utils/collection";
import { Console } from "@angular/compiler/src/private_import_core";
import { first } from "rxjs/operators/first";
import { Subscription } from "rxjs/Subscription";
import { Car } from "./object";
 
@Component({
    selector: "favourites",

    template: `
<p *ngIf="item">
<span>{{item.Title}}</span>
</p>`,
    styles: [
    ]
})

export class FavouritesComponent implements OnInit, OnDestroy {

    car: Car;
    item: Item;
    items: Item[];
    sb: Subscription;

    errorMessage: string;

    constructor(private service: PostService) { }

    Title: string = "Favourites"

    ngOnInit() {
        this.getP();
        this.car = new Car("V8");
        this.sb = Observable.timer(5000, 5000).subscribe(() => this.getP());
    }

    ngOnDestroy() {
        this.sb.unsubscribe();
    }

    getP(): void {
        this.service.getPost().subscribe(
            item => {
                this.item = item;
            },
            error => this.errorMessage = <any>error
        );
    }

    private letP(): void {

    }

}