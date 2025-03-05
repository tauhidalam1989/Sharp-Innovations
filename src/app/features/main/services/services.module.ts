import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { WebAppDevelopmentComponent } from './web-app-development/web-app-development.component';
import { SharedModule } from '../../shared/shared.module';
import { MobileAppDevelopmentComponent } from './mobile-app-development/mobile-app-development.component';
import { CloudDevelopmentComponent } from './cloud-development/cloud-development.component';
import { ChatbotDevelopmentComponent } from './chatbot-development/chatbot-development.component';
import { DigitalMarketingComponent } from './digital-marketing/digital-marketing.component';
import { UiDevelopmentComponent } from './ui-development/ui-development.component';


@NgModule({
  declarations: [
    WebAppDevelopmentComponent,
    MobileAppDevelopmentComponent,
    CloudDevelopmentComponent,
    ChatbotDevelopmentComponent,
    DigitalMarketingComponent,
    UiDevelopmentComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule
  ]
})
export class ServicesModule { }
