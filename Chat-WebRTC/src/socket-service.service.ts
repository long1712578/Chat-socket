import { Injectable } from '@angular/core';
import { Observable,from } from 'rxjs';
import * as io from 'socket.io-client';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
    private connected = false;
    public connectedusers: any;

    constructor(private socket :Socket) {
       
    }

    SetUserName(username: string | null) {
        this.socket.emit('add user', username);
        return Observable.create((observer:any) => {
            this.socket.on('logged-user', (data:any) => {
                this.connected = true;
                observer.next(data);
            });
        });
    }
    public RemoveUser() {
        this.socket.emit('disconnect');
    }

    public BroadCastMessage(message: any) {
        this.socket.emit('new-broadcast-message', message);
    }

    public SendMessage(message: any, from: any, to: any) {
        //this.socket.emit('new-message', message);
        this.socket.emit('send-message', {
            toid: to,
            message: message,
            fromname: from
        });
    }

    public GetMessages() {
        return Observable.create((observer: { next: (arg0: any) => void; }) => {
            this.socket.on('receive-message', (message: any) => {
                observer.next(message);
            });
        });
    }
    public GetConnectedUsers() {
        return Observable.create((observer: any) => {
            this.socket.on('client-list', (data: any[]) => {
                observer.next(data);
            });
        });
    }
    /***
     * Section Video call
     * following requests are used for video call
     */

    public VideoCallRequest(from: any, to: any) {
        this.socket.emit('video-call', {
            fromname: from,
            toid: to
        });
    }
    public OnVideoCallRequest() {
        return Observable.create((observer: { next: (arg0: any) => void; }) => {
            this.socket.on('video-call', (data: any) => {
                observer.next(data);
            });
        });
    }
    public VideoCallAccepted(from: any, to: any) {
        this.socket.emit('video-call-accept', {
            fromname: from,
            toid: to
        });
    }
    public OnVideoCallAccepted() {
        return Observable.create((observer: { next: (arg0: any) => void; }) => {
            this.socket.on('video-call-accept', (data: any) => {
                observer.next(data);
            });
        });
    }
    public BusyNow() {
        this.socket.emit('busy-user');
    }
    public GetBusyUsers() {
        this.socket.emit('get-busy-user');
        return Observable.create((observer: { next: (arg0: any) => void; }) => {
            this.socket.on('get-busy-user', (data: any) => {
                observer.next(data);
            });
        });
    }
    public EndVideoCall(from: any, to: any, toname: any) {
        this.socket.emit('end-video-call', {
            fromname: from,
            toid: to,
            toname: toname
        });
    }
    public OnVideoCallEnded() {
        this.socket.emit('get-busy-user');
        return Observable.create((observer: { next: (arg0: any) => void; }) => {
            this.socket.on('video-call-ended', (data: any) => {
                observer.next(data);
            });
        });
    }
    public VideoCallRejected(from: any, to: any) {
        this.socket.emit('video-call-reject', {
            fromname: from,
            toid: to
        });
    }
    public OnVideoCallRejected() {
        return Observable.create((observer: { next: (arg0: any) => void; }) => {
            this.socket.on('video-call-reject', (data: any) => {
                observer.next(data);
            });
        });
    }
    /**
     * 
     * @param candidate or @param description for video call
     * need to send remote user id
     */
    public SendCallRequest(val: any, type: string, uid: any) {
        var data;
        if (type == 'desc') {
            data = {
                toid: uid,
                desc: val
            }
        } else {
            data = {
                toid: uid,
                candidate: val
            }
        }
        this.socket.emit('call-request', data);
    }
    public ReceiveCallRequest() {
        return Observable.create((observer: { next: (arg0: any) => void; }) => {
            this.socket.on('call-request', (data: any) => {
                observer.next(data);
            });
        });
    }
}
