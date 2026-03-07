import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TranslateServerLoader } from './core/loaders/translate-server.loader';

export function translateServerLoaderFactory(): TranslateServerLoader {
  return new TranslateServerLoader();
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory
      }
    })
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
