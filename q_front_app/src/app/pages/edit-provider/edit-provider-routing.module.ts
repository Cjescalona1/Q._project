import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProviderPage } from './edit-provider.page';

const routes: Routes = [
  {
    path: '',
    component: EditProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProviderPageRoutingModule {}
