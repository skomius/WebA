import { Component, OnInit } from "@angular/core";
import { Router, Route, NavigationEnd } from "@angular/router"

@Component({
    selector: "opengamelist",
    template: `
<h1>{{title}}</h1>
<div class="menu">
<a class="home" [routerLink]="['']">Home</a>
| <a class="about" [routerLink]="['about']">About</a>
| <a class="login" [routerLink]="['login']">Login</a>
| <a class="add" [routerLink]="['item/edit', 0]">Add New</a>
| <a class ="test" href="test/demo.html">Test</a> 
</div>
<router-outlet></router-outlet>
`
})

export class AppComponent implements OnInit {

    title = "OpenGameList";

    ngOnInit() {
    }
}