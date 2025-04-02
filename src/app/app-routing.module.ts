import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './features/shared/layout/main-layout/main-layout/main-layout.component';
import { HomeComponent } from './features/main/home/home.component';
import { AboutComponent } from './features/main/about/about.component';
import { ContactComponent } from './features/main/contact/contact.component';
import { ServiceComponent } from './features/main/service/service.component';
import { FaqComponent } from './features/main/faq/faq.component';
import { TeamComponent } from './features/main/team/team.component';
import { TestimonialComponent } from './features/main/testimonial/testimonial.component';
import { FeatureComponent } from './features/main/feature/feature.component';
import { ProjectsComponent } from './features/main/projects/projects.component';
import { CareersComponent } from './features/main/careers/careers.component';

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "home", // Redirect to 'home'
        pathMatch: "full",
      },
      {
        path: "about",
        component: AboutComponent,
      },
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "contact",
        component: ContactComponent,
      },
      {
        path: "service",
        component: ServiceComponent,
      },
      {
        path: "faq",
        component: FaqComponent,
      },
      {
        path: "team",
        component: TeamComponent,
      },
      {
        path: "testimonial",
        component: TestimonialComponent,
      },
      {
        path:'feature',
        component: FeatureComponent
      },
      {
        path:'project',
        component: ProjectsComponent
      },
      {
        path:'Careers',
        component: CareersComponent
      },
     
    ],
  },
  {
    path: 'services',
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./features/main/services/services.module").then(
        (m) => m.ServicesModule
      ),
  },
  {
    path: 'product',
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./features/main/my-product/my-product.module").then(
        (m) => m.MyProductModule
      ),
  },
 
  // {
  //   path: "**", // Wildcard route for 404 or invalid paths
  //   redirectTo: "about", // Redirect to another valid route
  //   pathMatch: "full",
  // },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
