import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isCollapsed = false;
  constructor() { }
  title="chat app";

  ngOnInit(): void {
  }
  onActivate(componentReference: { title: any; }) {
    this.title = componentReference.title;
  }

}
