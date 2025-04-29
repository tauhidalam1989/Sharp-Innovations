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
import { AiProductDevelopmentComponent } from './ai-product-development/ai-product-development.component';
import { AiMlServicesComponent } from './ai-ml-services/ai-ml-services.component';
import { NlpServicesComponent } from './nlp-services/nlp-services.component';
import { ComputerVisionComponent } from './computer-vision/computer-vision.component';
import { AutomationServicesComponent } from './automation-services/automation-services.component';
import { CybersecurityServicesComponent } from './cybersecurity-services/cybersecurity-services.component';
import { AiConsultingComponent } from './ai-consulting/ai-consulting.component';
import { ApplicationConsultingComponent } from './application-consulting/application-consulting.component';
import { ApplicationMaintenanceComponent } from './application-maintenance/application-maintenance.component';
import { ManpowerOutsourcingComponent } from './manpower-outsourcing/manpower-outsourcing.component';
import { ItServerAdminComponent } from './it-server-admin/it-server-admin.component';
import { ItDatabaseAdministrationComponent } from './it-database-administration/it-database-administration.component';
import { PmoServicesComponent } from './pmo-services/pmo-services.component';
import { OracleAutomationComponent } from './oracle-automation/oracle-automation.component';
import { OracleVisualBuilderComponent } from './oracle-visual-builder/oracle-visual-builder.component';
import { ItInfrastructureComponent } from './it-infrastructure/it-infrastructure.component';
import { MyServicesLayoutComponent } from './components/my-services-layout/my-services-layout.component';


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
    NetworkInfrastructureMaintenanceComponent,
    AiProductDevelopmentComponent,
    AiMlServicesComponent,
    NlpServicesComponent,
    ComputerVisionComponent,
    AutomationServicesComponent,
    CybersecurityServicesComponent,
    AiConsultingComponent,
    ApplicationConsultingComponent,
    ApplicationMaintenanceComponent,
    ManpowerOutsourcingComponent,
    ItServerAdminComponent,
    ItDatabaseAdministrationComponent,
    PmoServicesComponent,
    OracleAutomationComponent,
    OracleVisualBuilderComponent,
    ItInfrastructureComponent,
    MyServicesLayoutComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule
  ]
})
export class ServicesModule { }
