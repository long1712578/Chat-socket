import { Component } from '@angular/core';
import { SocketServiceService } from 'src/socket-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  constructor(private socketIOService: SocketServiceService) {
  }
  
}
