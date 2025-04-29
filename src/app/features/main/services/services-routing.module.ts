import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebAppDevelopmentComponent } from './web-app-development/web-app-development.component';
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

const routes: Routes = [
  {
   path: "",
      component: MyServicesLayoutComponent,
      children: [
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
        {
          path:"mssp",
          component:MSSPComponent
        },
        {
          path:"data-security-services",
          component:DataSecurityServicesComponent
        },
        {
          path:"cybersecurity-consulting",
          component:CybersecurityConsultingComponent
        },
        {
          path:"cybersecurity-grc-services.component",
          component:CybersecurityGRCServicesComponent
        },
        {
          path:'application-security',
          component:ApplicationSecurityComponent
        },
        {
          path:"network-security",
          component:NetworkSecurityComponent
        },
        {
          path:"cybersecurity-implementation",
          component:CybersecurityImplementationComponent
        },
        {
          path:"cyber-security-awareness",
          component:CyberSecurityAwarenessComponent
        },
        {
          path:"cyber-security-training",
          component:CyberSecurityTrainingComponent
        },
        {
          path:"cyber-security-manpower-outsourcing",
          component:CyberSecurityManpowerOutsourcingComponent
        },
        {
          path:"network-infrastructure-services",
          component:NetworkInfrastructureServicesComponent
        },
        {
          path:"network-consulting-services",
          component:NetworkConsultingServicesComponent
        },
        {
          path:"noc",
          component:NOCComponent
        },
        {
          path:"network-infrastructure-maintenance",
          component:NetworkInfrastructureMaintenanceComponent
        },
        {
          path:"ai-product-development",
          component: AiProductDevelopmentComponent
        },
        {
          path:"ai-ml-services",
          component: AiMlServicesComponent
        },
        {
          path:"nlp-services",
          component:NlpServicesComponent
        },
        {
          path:"computer-vision",
          component: ComputerVisionComponent
        },
        {
          path:"automation-services",
          component:AutomationServicesComponent
      
        },{
          path:"cybersecurity-services",
          component:CybersecurityServicesComponent
        },
        {
          path:"ai-consulting",
          component:AiConsultingComponent
        },
        {
          path:"application-consulting",
          component:ApplicationConsultingComponent
        },{
          path: "application-maintenance",
          component:ApplicationMaintenanceComponent
        },
        {
          path:"manpower-outsourcing",
          component:ManpowerOutsourcingComponent
        },
        {
          path:"it-server-admin",
          component:ItServerAdminComponent
        },{
          path:"it-database-administration",
          component: ItDatabaseAdministrationComponent
        },
        {
          path:"pmo-services",
          component:PmoServicesComponent
        },
        {
          path:"oracle-automation",
          component:OracleAutomationComponent
        },
        {
          path:"oracle-visual-builder",
          component: OracleVisualBuilderComponent
        },
        {
          path:"it-infrastructure",
          component:ItInfrastructureComponent
        }
      ]
    }
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
