//<reference path="../../typings/index.d.ts"/>
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import "rxjs/Rx";
import { AboutComponent } from "./about.component";
import { HomeComponent } from "./home.component";
import { LoginComponent } from "./login.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { AppRouting } from "./app.routing";
import { AppComponent } from "./app.component";
import { ItemListComponent } from "./item-list.component";
import { ItemDetailEditComponent } from "./item-detail-edit.component";
import { ItemDetailViewComponent } from "./item-detail-view.component";
import { ItemService } from "./item.service";
import { FavouritesComponent } from "./favourites.component";
import { PostService } from "./post.service"
@NgModule({
    // directives, components, and pipes
    declarations: [
        FavouritesComponent,
        LoginComponent,
        PageNotFoundComponent,
        HomeComponent,
        AboutComponent,
        AppComponent,
        ItemListComponent,
        ItemDetailEditComponent,
        ItemDetailViewComponent
    ],
    // modules
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AppRouting
    ],
    // providers
    providers: [
        ItemService,
        PostService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }