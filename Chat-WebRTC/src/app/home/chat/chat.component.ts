import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketServiceService } from 'src/socket-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public liveUserList: any[] = [];
  public myMessage:string[]=[];
  public message = '';
  public idUser='';
  messages: string[] = [];
  public loggedUserName = sessionStorage.getItem("username");
  constructor(private router: Router, private changeDetector: ChangeDetectorRef,
    private socketServices: SocketServiceService) {

     }

  ngOnInit(): void {
    this.GetListSocket();
    this.ReceiveMessage();
  }

  //Get listSocket
  GetListSocket() {
    this.socketServices.GetConnectedUsers()
      .subscribe((data: any[]) => {

        var users = data.filter(a => a.username != this.loggedUserName);
        this.liveUserList = users;
        //console.log("use",users);
      });
  }
  SendMessage(){
    this.socketServices.SendMessage(this.message,this.loggedUserName,this.idUser);
    this.message='you_'+this.message;

    this.myMessage.push(this.message);
  
    sessionStorage.setItem("myMessage",this.myMessage.toString());
    this.message='';
    
  }

  ReceiveMessage(){
    console.log("data123");
    this.socketServices.GetMessages()
    .subscribe((data: any) =>{
      console.log('dataMess',data);
    })
  }

  SelectId(id: string){
    this.idUser=id;
    console.log("id",id);
  }

}
