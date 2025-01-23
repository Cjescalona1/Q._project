import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProviderPageRoutingModule } from './provider-routing.module';
import { ProviderPage } from './provider.page';
import { FullCalendarModule } from '@fullcalendar/angular'; 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProviderPageRoutingModule,
    FullCalendarModule
  ],
  declarations: [
    ProviderPage, 
  ]
})
export class ProviderPageModule {}
