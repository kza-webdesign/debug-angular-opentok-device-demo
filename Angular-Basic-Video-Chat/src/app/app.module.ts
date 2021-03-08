import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { PublisherComponent } from './publisher/publisher.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { OpentokService } from './opentok.service';
import { CallPageComponent } from './call-page/call-page.component';
import { WhateverComponent } from './whatever/whatever.component';

const routes: Routes = [
  { path: 'app', component: CallPageComponent },
  { path: 'whatever', component: WhateverComponent },
  { path: '', redirectTo: '/app', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    PublisherComponent,
    SubscriberComponent,
    CallPageComponent,
    WhateverComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes)
  ],
  providers: [OpentokService],
  bootstrap: [AppComponent]
})
export class AppModule { }
