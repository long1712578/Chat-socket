import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  public userType: string | undefined;
  public caller: any;
  public message = '';
  public idUser='';
  public nameUser='';
  public listMessage: any[] = [];
  public loggedUserName = sessionStorage.getItem("username");
  public isVideoCall=false;
  public isVideoCallAccepted: boolean = false;
  public callingInfo = { name: "", content: "", type: "" };
  constructor(private router: Router, private changeDetector: ChangeDetectorRef,
    private socketServices: SocketServiceService) {

     }

  ngOnInit(): void {
    this.GetListSocket();
    this.OnVideoCallRequest();
    this.OnVideoCallAccepted();
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

  OnVideoCallRequest() {
    this.socketServices.OnVideoCallRequest()
        .subscribe((data:any) => {
        
            this.callingInfo.name = data.fromname;
            this.callingInfo.content = "Calling....";
            this.callingInfo.type = "receiver";
            this.isVideoCall = true;
        });
}
OnVideoCallAccepted() {
  console.log("on video acceft");
    this.socketServices
        .OnVideoCallAccepted()
        .subscribe((data :any)=> {
          console.log("OnVideoCallAccepted",data);
            var calee = this.liveUserList.find(a => a.username == data.fromname);
            this.userType = "dialer";
            this.caller = calee.id;
            this.isVideoCallAccepted = true;
            this.Close();
        });
}

  VideoCall(){
    var toCaller=this.liveUserList.find(a=>a.username==this.nameUser);
    console.log("username : ",this.loggedUserName);
    console.log("call: ",toCaller);
    if(toCaller){
      this.socketServices.VideoCallRequest(this.loggedUserName,this.idUser);
    }
    this.callingInfo.name=toCaller.username;
    this.callingInfo.content = "Dialing....";
    this.callingInfo.type = "dialer";
    this.isVideoCall=true;
    
  }

  Close(){
    this.isVideoCall = false;
  }
  AcceptVideoCall(){
    var caller=this.liveUserList.find(a=>a.username==this.callingInfo.name);
    console.log("receive : ",caller.id);
    console.log("sender: ",this.loggedUserName);
    if(caller){
      this.socketServices.VideoCallAccepted(this.loggedUserName,caller.id);
      this.userType = "receiver";
      this.isVideoCallAccepted = true;
    }
  }
  RejectVideoCall(){

  }
}
