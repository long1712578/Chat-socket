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
  public listMessage: any[] = [];
  public loggedUserName = sessionStorage.getItem("username");
  constructor(private router: Router, private changeDetector: ChangeDetectorRef,
    private socketServices: SocketServiceService) {

     }

  ngOnInit(): void {
    this.GetListSocket();
    this.ReceiveMessage();
    this.ShowMessage();
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
    this.message=this.loggedUserName+'_'+this.message;

    this.myMessage.push(this.message);
  
    sessionStorage.setItem("myMessage",this.myMessage.toString());
    this.message='';
    
  }

  ReceiveMessage(){
    this.socketServices.GetMessages()
    .subscribe((data: any) =>{
      console.log('dataMess',data);
      this.myMessage.push(data.fromname+'_'+data.message);
      sessionStorage.setItem("myMessage",this.myMessage.toString());
    })
  }

  SelectId(id: string){
    this.idUser=id;
    console.log("id",id);
  }

  ShowMessage(){
    
    var  messages: any[] = [];
    var content='you_long dep trai';
    var local=content.search('_');
    console.log("vi tri: ",local);
    var user=content.slice(0,3);
    if(user=="you"){
      var nd=content.slice(4);
      var ns={user,nd};
      messages.push(ns);
      console.log("mess",messages);
      this.listMessage=messages;
    }
  }

}
