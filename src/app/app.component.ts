import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  loadedFeature = "recipe";

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDmUNNUA9NM4IPdgrpwYqfxJzzwRQOl9PE",
      authDomain: "ng-recipe-book-b8da4.firebaseapp.com"
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
