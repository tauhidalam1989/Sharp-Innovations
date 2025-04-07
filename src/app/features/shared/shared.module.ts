import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteHeaderComponent } from './layout/components/site-header/site-header.component';
import { SiteFooterComponent } from './layout/components/site-footer/site-footer.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { NewsletterComponent } from '../main/newsletter/newsletter.component';
import { HeroComponent } from './layout/components/hero/hero.component';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TypingEffectComponent } from './components/typing-effect/typing-effect.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    SiteHeaderComponent,
    SiteFooterComponent,
    MainLayoutComponent,
    HeroComponent,
    TypingEffectComponent,
    LoaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    CarouselModule,
    ModalModule.forRoot(),
  ],
  exports:[SiteFooterComponent,TranslateModule,TypingEffectComponent,LoaderComponent,CarouselModule,ModalModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class SharedModule { }
