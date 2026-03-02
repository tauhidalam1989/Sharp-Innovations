import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';

@NgModule({
    declarations: [
        SettingsPageComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SettingsRoutingModule
    ]
})
export class SettingsModule { }
