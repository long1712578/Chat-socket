import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketServiceService } from 'src/socket-service.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor(private socketService: SocketServiceService,
    private router: Router,) { }

  ngOnInit(): void {
  }
  EndCall(){
    
  }

}
