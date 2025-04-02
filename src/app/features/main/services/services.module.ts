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
import { MSSPComponent } from './mssp/mssp.component';
import { DataSecurityServicesComponent } from './data-security-services/data-security-services.component';
import { CybersecurityConsultingComponent } from './cybersecurity-consulting/cybersecurity-consulting.component';
import { CybersecurityGRCServicesComponent } from './cybersecurity-grc-services/cybersecurity-grc-services.component';
import { ApplicationSecurityComponent } from './application-security/application-security.component';
import { NetworkSecurityComponent } from './network-security/network-security.component';
import { CybersecurityImplementationComponent } from './cybersecurity-implementation/cybersecurity-implementation.component';
import { CyberSecurityAwarenessComponent } from './cyber-security-awareness/cyber-security-awareness.component';
import { CyberSecurityTrainingComponent } from './cyber-security-training/cyber-security-training.component';
import { CyberSecurityManpowerOutsourcingComponent } from './cyber-security-manpower-outsourcing/cyber-security-manpower-outsourcing.component';
import { NOCComponent } from './noc/noc.component';
import { NetworkInfrastructureServicesComponent } from './network-infrastructure-services/network-infrastructure-services.component';
import { NetworkConsultingServicesComponent } from './network-consulting-services/network-consulting-services.component';
import { NetworkInfrastructureMaintenanceComponent } from './network-infrastructure-maintenance/network-infrastructure-maintenance.component';


@NgModule({
  declarations: [
    WebAppDevelopmentComponent,
    MobileAppDevelopmentComponent,
    CloudDevelopmentComponent,
    ChatbotDevelopmentComponent,
    DigitalMarketingComponent,
    UiDevelopmentComponent,
    MSSPComponent,
    DataSecurityServicesComponent,
    CybersecurityConsultingComponent,
    CybersecurityGRCServicesComponent,
    ApplicationSecurityComponent,
    NetworkSecurityComponent,
    CybersecurityImplementationComponent,
    CyberSecurityAwarenessComponent,
    CyberSecurityTrainingComponent,
    CyberSecurityManpowerOutsourcingComponent,
    NOCComponent,
    NetworkInfrastructureServicesComponent,
    NetworkConsultingServicesComponent,
    NetworkInfrastructureMaintenanceComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule
  ]
})
export class ServicesModule { }
