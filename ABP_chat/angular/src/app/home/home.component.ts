import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketServiceService } from 'src/socket-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isCollapsed = false;
  public loggedUserName:any;
  public isChat = false;
  public isVideoCall = false;
  public isAudioCall = false;
  public liveUserList:any[]=[];
  public callee: any;
  public callingInfo = { name: "", content: "", type: "" };
  public isVideoCallAccepted: boolean = false;
  //public userType: string;
  public caller: any;
  constructor(private router :Router, private changeDetector: ChangeDetectorRef,private socketServices :SocketServiceService) 
  { 
    this.loggedUserName=sessionStorage.getItem("username");
    if(!this.loggedUserName){
      this.router.navigate(['/']);
    }else{
      this.AddUser();
    }
  }
  title="chat app";

  ngOnInit(): void {
    
  }

  //Add user in list socket
  AddUser() {
    this.socketServices.SetUserName(this.loggedUserName)
        .subscribe((data:any) => {
            if (data.username) {
                //user added
            }
        })
}

GetBusyUsers() {
  this.socketServices
      .GetBusyUsers()
      .subscribe((data: any[]) => {
          this.liveUserList.forEach(a => { a.busy = false; });
          data.forEach(a => {
              var usr = this.liveUserList.find(b => b.username == a.username);
              if (usr) {
                  usr.busy = true;
              }
          });
      })
}
  onActivate(componentReference: { title: any; }) {
    this.title = componentReference.title;
  }

}
