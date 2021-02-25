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
  public nameUser='';
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
      });
  }
  SendMessage(){
    this.socketServices.SendMessage(this.message,this.loggedUserName,this.idUser);
    this.message=this.loggedUserName+'_'+this.message;

    this.myMessage.push(this.message);
  
    sessionStorage.setItem("myMessage",this.myMessage.toString());
    this.message='';
    this.ShowMessage();
  }

  ReceiveMessage(){
    this.socketServices.GetMessages()
    .subscribe((data: any) =>{
      console.log('dataMess',data);
      this.myMessage.push(data.fromname+'_'+data.message);
      sessionStorage.setItem("myMessage",this.myMessage.toString());
      this.ShowMessage();
    })
    
  }

  SelectId(id: string,name:string){
    this.idUser=id;
    this.nameUser=name;
    console.log("id",id);
  }

  ShowMessage(){
    
    var  messages: any[] = [];
    var abc=sessionStorage.getItem("myMessage");
    var arr=abc?.split(',');
    arr?.forEach(element=>{
      var local=element.search('_');
      var user=element.slice(0,local);
      var mess=element.slice(local+1);
      var content={user,mess};
      messages.push(content);
      this.listMessage=messages;
      console.log("messcontent",messages);
      
    })
  }

  VideoCall(){

  }

}
