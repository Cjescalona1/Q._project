import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProviderPageRoutingModule } from './edit-provider-routing.module';

import { EditProviderPage } from './edit-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProviderPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditProviderPage]
})
export class EditProviderPageModule {}
