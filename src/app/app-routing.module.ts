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
import { PrivacyComponent } from './features/shared/components/privacy/privacy.component';
import { AuthGuard } from './core/guards/auth.guard';

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
        path: "privacy",
        component: PrivacyComponent,
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
        path: 'feature',
        component: FeatureComponent
      },
      {
        path: 'project',
        component: ProjectsComponent
      },
      {
        path: 'Careers',
        component: CareersComponent
      },

    ],
  },
  {
    path: 'products',
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./features/main/services/services.module").then(
        (m) => m.ServicesModule
      ),
  },
  {
    path: 'service-pages',
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./features/main/service-pages/service-pages.module").then(
        (m) => m.ServicePagesModule
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
  {
    path: 'blogs',
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./features/main/blogs/blogs.module").then(
        (m) => m.BlogsModule
      ),
  },

  {
    path: 'login',
    loadChildren: () => import('../app/dashboard/pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard/products',
    loadChildren: () => import('../app/dashboard/pages/products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/product-categories',
    loadChildren: () => import('../app/dashboard/pages/product-categories/product-categories.module').then(m => m.ProductCategoriesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/services',
    loadChildren: () => import('../app/dashboard/pages/services/services.module').then(m => m.ServicesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/service-categories',
    loadChildren: () => import('../app/dashboard/pages/service-categories/service-categories.module').then(m => m.ServiceCategoriesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/users',
    loadChildren: () => import('../app/dashboard/pages/user-management/user-management.module').then(m => m.UserManagementModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/clients-partners',
    loadChildren: () => import('../app/dashboard/pages/client-partner/client-partner.module').then(m => m.ClientPartnerModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/client-partner',
    redirectTo: 'dashboard/clients-partners',
    pathMatch: 'full'
  },
  {
    path: 'dashboard/clients',
    redirectTo: 'dashboard/clients-partners',
    pathMatch: 'full'
  },
  {
    path: 'dashboard/partners',
    redirectTo: 'dashboard/clients-partners',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app/dashboard/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'blog',
    loadChildren: () => import('../app/dashboard/pages/blog/blog.module').then(m => m.BlogModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('../app/dashboard/pages/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('../app/dashboard/pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home'
  }

  // {
  //   path: "**", // Wildcard route for 404 or invalid paths
  //   redirectTo: "about", // Redirect to another valid route
  //   pathMatch: "full",
  // },

];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
