import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ItemService } from "./item.service"
import { Item } from "./item"

@Injectable()
export class PostService {
    constructor(private http: Http, private service: ItemService) { }

    private urlBase = "api/items/";

    getPost(): Observable<Item> {
        var url = this.urlBase + "getPost";
        return this.http.get(url)
            .map(response => <Item>response.json())
            .catch(this.service.handleError);
    }
}