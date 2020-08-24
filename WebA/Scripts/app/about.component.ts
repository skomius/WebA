import { Component } from "@angular/core";
@Component({
    selector: "about",
    template: `
<h2>{{title}}</h2>
<div>
OpenGameList
</div>
`
})
export class AboutComponent {
    title = "About";
}
