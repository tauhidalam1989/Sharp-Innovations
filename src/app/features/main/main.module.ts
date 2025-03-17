import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceComponent } from './service/service.component';
import { TeamComponent } from './team/team.component';
import { FaqComponent } from './faq/faq.component';
import { FeatureComponent } from './feature/feature.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ProjectsComponent } from './projects/projects.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SharedModule } from '../shared/shared.module';
import { WhyChooseUsComponent } from './why-choose-us/why-choose-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CareersComponent } from './careers/careers.component';
import { ClientsPageComponent } from './clients-page/clients-page.component';
import { CoreServiceComponent } from './core-service/core-service.component';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ServiceComponent,
    TeamComponent,
    FaqComponent,
    FeatureComponent,
    TestimonialComponent,
    ProjectsComponent,
    NewsletterComponent,
    WhyChooseUsComponent,
    CareersComponent,
    ClientsPageComponent,
    CoreServiceComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    NewsletterComponent,
    FormsModule,
    CarouselModule
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class MainModule { }
