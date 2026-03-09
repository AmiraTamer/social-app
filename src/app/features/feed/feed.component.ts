import { Component } from '@angular/core';
import { LeftSideComponent } from "./components/left-side/left-side.component";
import { MiddleSideComponent } from "./components/middle-side/middle-side.component";
import { RightSideComponent } from "./components/right-side/right-side.component";

@Component({
  selector: 'app-feed',
  imports: [LeftSideComponent, MiddleSideComponent, RightSideComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {

}
