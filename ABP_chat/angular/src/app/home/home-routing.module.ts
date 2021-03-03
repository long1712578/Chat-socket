
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

import { HomeComponent } from './home.component';

const routes: Routes=[{
    path: '',
    component: HomeComponent,
    children:[
        {
            path: 'chat',
            component: ChatComponent
        },
        {
            path:'chat1',
            component:ChatComponent
        
        }
    
    ]
   
}]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule{

}