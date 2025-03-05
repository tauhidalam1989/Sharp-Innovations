import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebAppDevelopmentComponent } from './web-app-development/web-app-development.component';
import { MobileAppDevelopmentComponent } from './mobile-app-development/mobile-app-development.component';
import { CloudDevelopmentComponent } from './cloud-development/cloud-development.component';
import { ChatbotDevelopmentComponent } from './chatbot-development/chatbot-development.component';
import { DigitalMarketingComponent } from './digital-marketing/digital-marketing.component';
import { UiDevelopmentComponent } from './ui-development/ui-development.component';

const routes: Routes = [
  {
    path:"web-app-development",
    component:WebAppDevelopmentComponent
  },
  {
    path:"mobile-app-development",
    component:MobileAppDevelopmentComponent
  },
  {
    path:"cloud-development",
    component:CloudDevelopmentComponent
  },
  {
    path:"chatbot-development",
    component:ChatbotDevelopmentComponent
  },
  {
    path:"digital-marketing-services",
    component:DigitalMarketingComponent
  },
  {
    path:"ui-development",
    component:UiDevelopmentComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
