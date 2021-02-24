import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppRoutingModule } from '../app-routing.module';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { IconsProviderModule } from '../icons-provider.module';
import { SocketIoConfig } from 'ngx-socket-io';

import { ChatComponent } from './chat/chat.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';


const config: SocketIoConfig = { url: 'http://localhost:9000', options: {"force new connection" : true,
"reconnectionAttempts": "Infinity", 
"timeout" : 10000,                  
"transports" : ["websocket"]} };
@NgModule({
  declarations: [HomeComponent, ChatComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    HomeRoutingModule,
    FormsModule
    
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class HomeModule { }
